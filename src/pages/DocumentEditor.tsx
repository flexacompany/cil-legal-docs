
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Save, 
  Download, 
  Print, 
  ArrowLeft,
  FileText,
  User,
  Building,
  Car,
  Scale
} from "lucide-react";

interface DocumentTemplate {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  variant: string;
  template_content: any;
  fields: any;
}

const DocumentEditor = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  
  const [template, setTemplate] = useState<DocumentTemplate | null>(null);
  const [documentTitle, setDocumentTitle] = useState("");
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const category = searchParams.get("category");
  const subcategory = searchParams.get("subcategory");
  const variant = searchParams.get("variant");

  useEffect(() => {
    if (category && subcategory && variant) {
      loadTemplate();
    }
  }, [category, subcategory, variant]);

  const loadTemplate = async () => {
    try {
      const { data, error } = await supabase
        .from("document_templates")
        .select("*")
        .eq("category", category)
        .eq("subcategory", subcategory)
        .eq("variant", variant)
        .single();

      if (error) throw error;

      setTemplate(data);
      setDocumentTitle(data.name);
      
      // Initialize form data with empty values
      const initialData: Record<string, any> = {};
      Object.keys(data.fields).forEach(key => {
        initialData[key] = {};
      });
      setFormData(initialData);
      
    } catch (error) {
      console.error("Error loading template:", error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar o modelo do documento.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (section: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Erro",
          description: "Usuário não autenticado.",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from("documents")
        .insert({
          user_id: user.id,
          title: documentTitle,
          type: category || "",
          subtype: subcategory || "",
          variant: variant || "",
          content: {
            template_id: template?.id,
            form_data: formData,
            template_content: template?.template_content
          },
          status: "draft"
        });

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Documento salvo como rascunho.",
      });

      navigate("/dashboard/documents");
      
    } catch (error) {
      console.error("Error saving document:", error);
      toast({
        title: "Erro", 
        description: "Não foi possível salvar o documento.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleComplete = async () => {
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Erro",
          description: "Usuário não autenticado.",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from("documents")
        .insert({
          user_id: user.id,
          title: documentTitle,
          type: category || "",
          subtype: subcategory || "",
          variant: variant || "",
          content: {
            template_id: template?.id,
            form_data: formData,
            template_content: template?.template_content
          },
          status: "completed"
        });

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Documento finalizado com sucesso.",
      });

      navigate("/dashboard/documents");
      
    } catch (error) {
      console.error("Error completing document:", error);
      toast({
        title: "Erro",
        description: "Não foi possível finalizar o documento.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const renderFormFields = (section: string, fields: any) => {
    if (!fields || typeof fields !== "object") return null;

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold capitalize">{section.replace("_", " ")}</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {section === "locador" || section === "locatario" || section === "vendedor" || section === "comprador" || section === "contratante" || section === "contratado" || section === "outorgante" || section === "outorgado" ? (
            <>
              <div>
                <Label htmlFor={`${section}_nome`}>Nome Completo</Label>
                <Input
                  id={`${section}_nome`}
                  value={formData[section]?.nome || ""}
                  onChange={(e) => handleInputChange(section, "nome", e.target.value)}
                  placeholder="Nome completo"
                />
              </div>
              <div>
                <Label htmlFor={`${section}_cpf`}>CPF</Label>
                <Input
                  id={`${section}_cpf`}
                  value={formData[section]?.cpf || ""}
                  onChange={(e) => handleInputChange(section, "cpf", e.target.value)}
                  placeholder="000.000.000-00"
                />
              </div>
              <div>
                <Label htmlFor={`${section}_endereco`}>Endereço</Label>
                <Input
                  id={`${section}_endereco`}
                  value={formData[section]?.endereco || ""}
                  onChange={(e) => handleInputChange(section, "endereco", e.target.value)}
                  placeholder="Endereço completo"
                />
              </div>
              <div>
                <Label htmlFor={`${section}_telefone`}>Telefone</Label>
                <Input
                  id={`${section}_telefone`}
                  value={formData[section]?.telefone || ""}
                  onChange={(e) => handleInputChange(section, "telefone", e.target.value)}
                  placeholder="(00) 00000-0000"
                />
              </div>
            </>
          ) : section === "imovel" ? (
            <>
              <div>
                <Label htmlFor={`${section}_endereco`}>Endereço do Imóvel</Label>
                <Input
                  id={`${section}_endereco`}
                  value={formData[section]?.endereco || ""}
                  onChange={(e) => handleInputChange(section, "endereco", e.target.value)}
                  placeholder="Endereço completo do imóvel"
                />
              </div>
              <div>
                <Label htmlFor={`${section}_valor`}>Valor</Label>
                <Input
                  id={`${section}_valor`}
                  value={formData[section]?.valor || ""}
                  onChange={(e) => handleInputChange(section, "valor", e.target.value)}
                  placeholder="R$ 0,00"
                />
              </div>
              <div>
                <Label htmlFor={`${section}_descricao`}>Descrição</Label>
                <Textarea
                  id={`${section}_descricao`}
                  value={formData[section]?.descricao || ""}
                  onChange={(e) => handleInputChange(section, "descricao", e.target.value)}
                  placeholder="Descrição detalhada do imóvel"
                />
              </div>
            </>
          ) : section === "veiculo" ? (
            <>
              <div>
                <Label htmlFor={`${section}_marca`}>Marca/Modelo</Label>
                <Input
                  id={`${section}_marca`}
                  value={formData[section]?.marca || ""}
                  onChange={(e) => handleInputChange(section, "marca", e.target.value)}
                  placeholder="Marca e modelo do veículo"
                />
              </div>
              <div>
                <Label htmlFor={`${section}_placa`}>Placa</Label>
                <Input
                  id={`${section}_placa`}
                  value={formData[section]?.placa || ""}
                  onChange={(e) => handleInputChange(section, "placa", e.target.value)}
                  placeholder="ABC-1234"
                />
              </div>
              <div>
                <Label htmlFor={`${section}_ano`}>Ano</Label>
                <Input
                  id={`${section}_ano`}
                  value={formData[section]?.ano || ""}
                  onChange={(e) => handleInputChange(section, "ano", e.target.value)}
                  placeholder="2020"
                />
              </div>
              <div>
                <Label htmlFor={`${section}_valor`}>Valor</Label>
                <Input
                  id={`${section}_valor`}
                  value={formData[section]?.valor || ""}
                  onChange={(e) => handleInputChange(section, "valor", e.target.value)}
                  placeholder="R$ 0,00"
                />
              </div>
            </>
          ) : section === "servicos" ? (
            <>
              <div className="md:col-span-2">
                <Label htmlFor={`${section}_descricao`}>Descrição dos Serviços</Label>
                <Textarea
                  id={`${section}_descricao`}
                  value={formData[section]?.descricao || ""}
                  onChange={(e) => handleInputChange(section, "descricao", e.target.value)}
                  placeholder="Descrição detalhada dos serviços a serem prestados"
                  rows={4}
                />
              </div>
              <div>
                <Label htmlFor={`${section}_valor`}>Valor</Label>
                <Input
                  id={`${section}_valor`}
                  value={formData[section]?.valor || ""}
                  onChange={(e) => handleInputChange(section, "valor", e.target.value)}
                  placeholder="R$ 0,00"
                />
              </div>
              <div>
                <Label htmlFor={`${section}_prazo`}>Prazo</Label>
                <Input
                  id={`${section}_prazo`}
                  value={formData[section]?.prazo || ""}
                  onChange={(e) => handleInputChange(section, "prazo", e.target.value)}
                  placeholder="Prazo para execução"
                />
              </div>
            </>
          ) : section === "poderes" ? (
            <>
              <div className="md:col-span-2">
                <Label htmlFor={`${section}_descricao`}>Poderes Outorgados</Label>
                <Textarea
                  id={`${section}_descricao`}
                  value={formData[section]?.descricao || ""}
                  onChange={(e) => handleInputChange(section, "descricao", e.target.value)}
                  placeholder="Descreva os poderes concedidos"
                  rows={4}
                />
              </div>
            </>
          ) : section === "fiador" ? (
            <>
              <div>
                <Label htmlFor={`${section}_nome`}>Nome Completo</Label>
                <Input
                  id={`${section}_nome`}
                  value={formData[section]?.nome || ""}
                  onChange={(e) => handleInputChange(section, "nome", e.target.value)}
                  placeholder="Nome completo do fiador"
                />
              </div>
              <div>
                <Label htmlFor={`${section}_cpf`}>CPF</Label>
                <Input
                  id={`${section}_cpf`}
                  value={formData[section]?.cpf || ""}
                  onChange={(e) => handleInputChange(section, "cpf", e.target.value)}
                  placeholder="000.000.000-00"
                />
              </div>
              <div>
                <Label htmlFor={`${section}_endereco`}>Endereço</Label>
                <Input
                  id={`${section}_endereco`}
                  value={formData[section]?.endereco || ""}
                  onChange={(e) => handleInputChange(section, "endereco", e.target.value)}
                  placeholder="Endereço completo"
                />
              </div>
              <div>
                <Label htmlFor={`${section}_telefone`}>Telefone</Label>
                <Input
                  id={`${section}_telefone`}
                  value={formData[section]?.telefone || ""}
                  onChange={(e) => handleInputChange(section, "telefone", e.target.value)}
                  placeholder="(00) 00000-0000"
                />
              </div>
            </>
          ) : null}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!template) {
    return (
      <div className="text-center py-12">
        <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">Modelo não encontrado</h3>
        <p className="text-muted-foreground mb-4">
          O modelo solicitado não foi encontrado.
        </p>
        <Button onClick={() => navigate("/dashboard/documents/new")}>
          Voltar à Seleção
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => navigate("/dashboard/documents/new")} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Editor de Documento</h1>
            <p className="text-muted-foreground">
              {template.name}
            </p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleSave} disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            Salvar Rascunho
          </Button>
          <Button variant="professional" onClick={handleComplete} disabled={saving}>
            <FileText className="h-4 w-4 mr-2" />
            Finalizar Documento
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>Informações do Documento</CardTitle>
            <CardDescription>
              Preencha as informações necessárias para gerar o documento
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="title">Título do Documento</Label>
              <Input
                id="title"
                value={documentTitle}
                onChange={(e) => setDocumentTitle(e.target.value)}
                placeholder="Digite um título para o documento"
              />
            </div>

            {template.fields && Object.keys(template.fields).map((section) => (
              <Card key={section} className="p-4">
                {renderFormFields(section, template.fields[section])}
              </Card>
            ))}
          </CardContent>
        </Card>

        {/* Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Visualização</CardTitle>
            <CardDescription>
              Prévia do documento que será gerado
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-white p-6 border rounded-lg min-h-96 text-black">
              <h2 className="text-xl font-bold text-center mb-6">
                {documentTitle || template.name}
              </h2>
              
              {template.template_content?.sections?.map((section: any, index: number) => (
                <div key={index} className="mb-4">
                  <h3 className="font-semibold mb-2">{section.title}</h3>
                  <p className="text-sm leading-relaxed">{section.content}</p>
                </div>
              ))}

              <div className="mt-6 space-y-4 text-sm">
                {Object.keys(formData).map((section) => {
                  const data = formData[section];
                  if (!data || Object.keys(data).length === 0) return null;
                  
                  return (
                    <div key={section} className="border-t pt-4">
                      <h4 className="font-semibold capitalize mb-2">{section.replace("_", " ")}</h4>
                      {Object.entries(data).map(([key, value]) => (
                        value && (
                          <p key={key} className="mb-1">
                            <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value as string}
                          </p>
                        )
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DocumentEditor;
