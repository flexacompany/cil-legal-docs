import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Search, 
  Filter,
  Eye,
  Download,
  Star,
  Clock,
  Users,
  Scale,
  Building,
  Heart
} from "lucide-react";

const Templates = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "Todos", icon: FileText, count: 48 },
    { id: "contratos", name: "Contratos", icon: Building, count: 15 },
    { id: "peticoes", name: "Petições", icon: Scale, count: 12 },
    { id: "procuracoes", name: "Procurações", icon: Users, count: 8 },
    { id: "outros", name: "Outros", icon: FileText, count: 13 }
  ];

  const templates = [
    {
      id: 1,
      title: "Contrato de Prestação de Serviços",
      description: "Template completo para contratos de prestação de serviços com todas as cláusulas essenciais",
      category: "contratos",
      rating: 4.8,
      downloads: 1250,
      lastUpdated: "2 dias atrás",
      isPremium: false,
      tags: ["Serviços", "Comercial", "Padrão"],
      estimatedTime: "15 min"
    },
    {
      id: 2,
      title: "Petição Inicial - Ação de Cobrança",
      description: "Modelo de petição inicial para ações de cobrança com fundamentação jurídica",
      category: "peticoes",
      rating: 4.9,
      downloads: 890,
      lastUpdated: "1 semana atrás",
      isPremium: true,
      tags: ["Cobrança", "Cível", "Processual"],
      estimatedTime: "25 min"
    },
    {
      id: 3,
      title: "Procuração Ad Judicia",
      description: "Procuração específica para representação em processos judiciais",
      category: "procuracoes",
      rating: 4.7,
      downloads: 2100,
      lastUpdated: "3 dias atrás",
      isPremium: false,
      tags: ["Judicial", "Representação", "Padrão"],
      estimatedTime: "10 min"
    },
    {
      id: 4,
      title: "Contrato de Trabalho CLT",
      description: "Template para contrato de trabalho seguindo as normas da CLT",
      category: "contratos",
      rating: 4.6,
      downloads: 1850,
      lastUpdated: "5 dias atrás",
      isPremium: false,
      tags: ["Trabalhista", "CLT", "Emprego"],
      estimatedTime: "20 min"
    },
    {
      id: 5,
      title: "Petição de Divórcio Consensual",
      description: "Modelo para petição de divórcio consensual com partilha de bens",
      category: "peticoes",
      rating: 4.5,
      downloads: 756,
      lastUpdated: "1 semana atrás",
      isPremium: true,
      tags: ["Família", "Divórcio", "Consensual"],
      estimatedTime: "30 min"
    },
    {
      id: 6,
      title: "Termo de Confidencialidade (NDA)",
      description: "Acordo de confidencialidade para proteção de informações sigilosas",
      category: "contratos",
      rating: 4.8,
      downloads: 1456,
      lastUpdated: "4 dias atrás",
      isPremium: false,
      tags: ["Confidencialidade", "Proteção", "Empresarial"],
      estimatedTime: "12 min"
    }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.icon : FileText;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Biblioteca de Templates</h1>
          <p className="text-muted-foreground">
            Explore nossa coleção de templates jurídicos profissionais
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar templates..."
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
              {filteredTemplates.length} templates encontrados
            </p>
            <Tabs defaultValue="grid" className="w-auto">
              <TabsList>
                <TabsTrigger value="grid">Grade</TabsTrigger>
                <TabsTrigger value="list">Lista</TabsTrigger>
              </TabsList>
            </Tabs>
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
                        {template.isPremium && (
                          <Badge variant="secondary" className="bg-gradient-primary text-primary-foreground">
                            Premium
                          </Badge>
                        )}
                      </div>
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <CardTitle className="text-lg leading-tight">
                      {template.title}
                    </CardTitle>
                    
                    <CardDescription className="text-sm line-clamp-2">
                      {template.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {template.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>{template.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Download className="h-3 w-3" />
                          <span>{template.downloads}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{template.estimatedTime}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button variant="professional" size="sm" className="flex-1">
                        <Eye className="h-4 w-4 mr-2" />
                        Visualizar
                      </Button>
                      <Button variant="elegant" size="sm" className="flex-1">
                        Usar Template
                      </Button>
                    </div>

                    <p className="text-xs text-muted-foreground">
                      Atualizado {template.lastUpdated}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredTemplates.length === 0 && (
            <div className="text-center py-12">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Nenhum template encontrado</h3>
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