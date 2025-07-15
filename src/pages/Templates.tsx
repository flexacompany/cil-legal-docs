
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Search, 
  Filter,
  Eye,
  Building,
  Car,
  Scale,
  Users
} from "lucide-react";

interface DocumentTemplate {
  id: string;
  name: string;
  category: string;
  subcategory: string | null;
  variant: string | null;
  template_content: any;
  fields: any;
  created_at: string;
  updated_at: string;
}

const Templates = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [templates, setTemplates] = useState<DocumentTemplate[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: "all", name: "Todos", icon: FileText, count: 0 },
    { id: "contrato_aluguel", name: "Contratos de Aluguel", icon: Building, count: 0 },
    { id: "contrato_compra_venda", name: "Compra e Venda", icon: FileText, count: 0 },
    { id: "contrato_prestacao_servico", name: "Prestação de Serviço", icon: Users, count: 0 },
    { id: "procuracao", name: "Procurações", icon: Scale, count: 0 }
  ];

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      const { data, error } = await supabase
        .from("document_templates")
        .select("*")
        .order("name");

      if (error) throw error;

      setTemplates(data || []);
      
      // Update category counts
      categories.forEach(category => {
        if (category.id === "all") {
          category.count = data?.length || 0;
        } else {
          category.count = data?.filter(template => template.category === category.id).length || 0;
        }
      });
      
    } catch (error) {
      console.error("Error loading templates:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.icon : FileText;
  };

  const getCategoryName = (categoryId: string) => {
    switch (categoryId) {
      case "contrato_aluguel":
        return "Contrato de Aluguel";
      case "contrato_compra_venda":
        return "Compra e Venda";
      case "contrato_prestacao_servico":
        return "Prestação de Serviço";
      case "procuracao":
        return "Procuração";
      default:
        return "Outros";
    }
  };

  const getSubcategoryName = (subcategory: string | null) => {
    if (!subcategory) return "";
    
    switch (subcategory) {
      case "residencial":
        return "Residencial";
      case "comercial":
        return "Comercial";
      case "veiculo":
        return "Veículo";
      case "imovel":
        return "Imóvel";
      case "advogado":
        return "Advocatícios";
      case "educacional":
        return "Educacionais";
      case "diversos":
        return "Diversos";
      case "particular":
        return "Particular";
      default:
        return subcategory;
    }
  };

  const getVariantName = (variant: string | null) => {
    if (!variant) return "";
    
    switch (variant) {
      case "com_fiador":
        return "Com Fiador";
      case "sem_fiador":
        return "Sem Fiador";
      case "uso_aplicativos":
        return "Uso em Aplicativos";
      case "uso_convencional":
        return "Uso Convencional";
      case "convencional":
        return "Convencional";
      case "rural":
        return "Rural";
      case "compromisso_particular":
        return "Compromisso Particular";
      case "reserva_dominio":
        return "Reserva de Domínio";
      case "alienacao_fiduciaria":
        return "Alienação Fiduciária";
      case "escritorio":
        return "Escritório";
      case "instituicao":
        return "Instituição";
      case "geral":
        return "Geral";
      case "fins_especificos":
        return "Fins Específicos";
      case "ad_judicia":
        return "Ad Judicia";
      case "poderes_especiais":
        return "Poderes Especiais";
      default:
        return variant;
    }
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
        <div>
          <h1 className="text-3xl font-bold text-foreground">Biblioteca de Modelos</h1>
          <p className="text-muted-foreground">
            Explore nossa coleção de modelos jurídicos profissionais
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar modelos..."
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

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Categories Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Categorias</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {categories.map((category) => {
                  const Icon = category.icon;
                  const isSelected = selectedCategory === category.id;
                  
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                        isSelected 
                          ? "bg-primary/10 text-primary border-2 border-primary/20" 
                          : "hover:bg-muted/50"
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <Icon className="h-4 w-4" />
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {category.count}
                      </Badge>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Templates Grid */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">
              {filteredTemplates.length} modelos encontrados
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredTemplates.map((template) => {
              const CategoryIcon = getCategoryIcon(template.category);
              
              return (
                <Card key={template.id} className="group hover:shadow-elegant transition-all duration-300 animate-fade-in">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="bg-primary/10 p-2 rounded-lg">
                          <CategoryIcon className="h-4 w-4 text-primary" />
                        </div>
                      </div>
                    </div>
                    
                    <CardTitle className="text-lg leading-tight">
                      {template.name}
                    </CardTitle>
                    
                    <CardDescription className="text-sm">
                      {getCategoryName(template.category)}
                      {template.subcategory && ` • ${getSubcategoryName(template.subcategory)}`}
                      {template.variant && ` • ${getVariantName(template.variant)}`}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button variant="professional" size="sm" className="flex-1">
                        <Eye className="h-4 w-4 mr-2" />
                        Visualizar
                      </Button>
                      <Button variant="elegant" size="sm" className="flex-1">
                        Usar Modelo
                      </Button>
                    </div>

                    <p className="text-xs text-muted-foreground">
                      Atualizado {new Date(template.updated_at).toLocaleDateString('pt-BR')}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredTemplates.length === 0 && (
            <div className="text-center py-12">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Nenhum modelo encontrado</h3>
              <p className="text-muted-foreground">
                Tente ajustar seus filtros ou termos de busca.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Templates;
