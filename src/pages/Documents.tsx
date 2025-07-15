
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  FileText, 
  Search, 
  Plus,
  Eye,
  Edit3,
  Trash2,
  Download,
  Filter
} from "lucide-react";

interface Document {
  id: string;
  title: string;
  type: string;
  subtype: string | null;
  variant: string | null;
  content: any;
  status: string | null;
  created_at: string;
  updated_at: string;
  user_id: string;
}

const Documents = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
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

      const { data, error } = await supabase
        .from("documents")
        .select("*")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false });

      if (error) throw error;

      setDocuments(data || []);
      
    } catch (error) {
      console.error("Error loading documents:", error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os documentos.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDocument = async (documentId: string) => {
    try {
      const { error } = await supabase
        .from("documents")
        .delete()
        .eq("id", documentId);

      if (error) throw error;

      setDocuments(prev => prev.filter(doc => doc.id !== documentId));
      
      toast({
        title: "Sucesso",
        description: "Documento excluído com sucesso.",
      });
      
    } catch (error) {
      console.error("Error deleting document:", error);
      toast({
        title: "Erro",
        description: "Não foi possível excluir o documento.",
        variant: "destructive",
      });
    }
  };

  const filteredDocuments = documents.filter(document => {
    const matchesSearch = document.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || document.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "draft":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "archived":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getStatusText = (status: string | null) => {
    switch (status) {
      case "completed":
        return "Finalizado";
      case "draft":
        return "Rascunho";
      case "archived":
        return "Arquivado";
      default:
        return "Desconhecido";
    }
  };

  const getDocumentTypeName = (type: string, subtype: string | null, variant: string | null) => {
    let name = "";
    
    switch (type) {
      case "contrato_aluguel":
        name = "Contrato de Aluguel";
        break;
      case "contrato_compra_venda":
        name = "Contrato de Compra e Venda";
        break;
      case "contrato_prestacao_servico":
        name = "Contrato de Prestação de Serviço";
        break;
      case "procuracao":
        name = "Procuração";
        break;
      default:
        name = "Documento";
    }

    if (subtype) {
      switch (subtype) {
        case "residencial":
          name += " Residencial";
          break;
        case "comercial":
          name += " Comercial";
          break;
        case "veiculo":
          name += " de Veículo";
          break;
        case "imovel":
          name += " de Imóvel";
          break;
        case "advogado":
          name += " Advocatícios";
          break;
        case "educacional":
          name += " Educacionais";
          break;
        case "particular":
          name += " Particular";
          break;
      }
    }

    return name;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Meus Documentos</h1>
            <p className="text-muted-foreground">
              Gerencie todos os seus documentos jurídicos
            </p>
          </div>
          <Button variant="professional" onClick={() => navigate("/dashboard/documents/new")} className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Documento
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar documentos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filtros
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={selectedStatus} onValueChange={setSelectedStatus}>
        <TabsList>
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="draft">Rascunhos</TabsTrigger>
          <TabsTrigger value="completed">Finalizados</TabsTrigger>
          <TabsTrigger value="archived">Arquivados</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedStatus} className="mt-6">
          {filteredDocuments.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">
                {documents.length === 0 ? "Nenhum documento criado" : "Nenhum documento encontrado"}
              </h3>
              <p className="text-muted-foreground mb-4">
                {documents.length === 0 
                  ? "Comece criando seu primeiro documento jurídico."
                  : "Tente ajustar seus filtros ou termos de busca."
                }
              </p>
              {documents.length === 0 && (
                <Button variant="professional" onClick={() => navigate("/dashboard/documents/new")} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Criar Primeiro Documento
                </Button>
              )}
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredDocuments.map((document) => (
                <Card key={document.id} className="group hover:shadow-elegant transition-all duration-300 animate-fade-in">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <Badge className={getStatusColor(document.status)}>
                        {getStatusText(document.status)}
                      </Badge>
                    </div>
                    
                    <CardTitle className="text-lg leading-tight">
                      {document.title}
                    </CardTitle>
                    
                    <CardDescription className="text-sm">
                      {getDocumentTypeName(document.type, document.subtype, document.variant)}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="text-xs text-muted-foreground">
                      <p>Criado: {new Date(document.created_at).toLocaleDateString('pt-BR')}</p>
                      <p>Modificado: {new Date(document.updated_at).toLocaleDateString('pt-BR')}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-4 w-4 mr-2" />
                        Ver
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit3 className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteDocument(document.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Documents;
