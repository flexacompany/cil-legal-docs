
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Building, 
  Car, 
  Scale, 
  Users,
  ArrowRight,
  ArrowLeft
} from "lucide-react";

interface DocumentOption {
  id: string;
  title: string;
  description: string;
  category: string;
  subcategory?: string;
  variant?: string;
  icon: React.ComponentType<any>;
}

const DocumentSelection = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

  const categories = [
    {
      id: "contrato_aluguel",
      title: "Contrato de Aluguel",
      description: "Contratos para locação de imóveis e veículos",
      icon: Building,
      color: "bg-blue-500"
    },
    {
      id: "contrato_compra_venda",
      title: "Contrato de Compra e Venda", 
      description: "Contratos para compra e venda de bens",
      icon: FileText,
      color: "bg-green-500"
    },
    {
      id: "contrato_prestacao_servico",
      title: "Contrato de Prestação de Serviço",
      description: "Contratos para prestação de serviços diversos",
      icon: Users,
      color: "bg-purple-500"
    },
    {
      id: "procuracao",
      title: "Procuração",
      description: "Procurações particulares para diversos fins",
      icon: Scale,
      color: "bg-orange-500"
    }
  ];

  const subcategories = {
    contrato_aluguel: [
      {
        id: "residencial",
        title: "Residencial",
        description: "Para aluguel de casas, apartamentos e imóveis residenciais",
        variants: [
          { id: "com_fiador", title: "Com Fiador", description: "Contrato com fiador como garantia" },
          { id: "sem_fiador", title: "Sem Fiador", description: "Contrato sem fiador" }
        ]
      },
      {
        id: "comercial", 
        title: "Comercial",
        description: "Para aluguel de estabelecimentos comerciais",
        variants: [
          { id: "com_fiador", title: "Com Fiador", description: "Contrato com fiador como garantia" },
          { id: "sem_fiador", title: "Sem Fiador", description: "Contrato sem fiador" }
        ]
      },
      {
        id: "veiculo",
        title: "Veículo", 
        description: "Para aluguel de veículos",
        variants: [
          { id: "uso_aplicativos", title: "Uso em Aplicativos", description: "Para uso em aplicativos de transporte" },
          { id: "uso_convencional", title: "Uso Convencional", description: "Para uso pessoal ou comercial comum" }
        ]
      }
    ],
    contrato_compra_venda: [
      {
        id: "imovel",
        title: "Imóvel",
        description: "Para compra e venda de imóveis",
        variants: [
          { id: "convencional", title: "Convencional", description: "Contrato padrão de compra e venda" },
          { id: "rural", title: "Rural", description: "Para imóveis rurais" },
          { id: "compromisso_particular", title: "Instrumento Particular de Compromisso", description: "Compromisso de venda e compra" }
        ]
      },
      {
        id: "veiculo",
        title: "Veículo",
        description: "Para compra e venda de veículos",
        variants: [
          { id: "convencional", title: "Convencional", description: "Contrato padrão" },
          { id: "reserva_dominio", title: "Com Reserva de Domínio", description: "Com cláusula de reserva de domínio" },
          { id: "alienacao_fiduciaria", title: "Com Gravame de Alienação Fiduciária", description: "Com alienação fiduciária" }
        ]
      }
    ],
    contrato_prestacao_servico: [
      {
        id: "advogado",
        title: "Advocatícios",
        description: "Para prestação de serviços advocatícios",
        variants: [
          { id: "escritorio", title: "Escritório", description: "Para escritórios de advocacia" },
          { id: "particular", title: "Particular", description: "Para advogado particular" }
        ]
      },
      {
        id: "educacional",
        title: "Educacionais",
        description: "Para prestação de serviços educacionais",
        variants: [
          { id: "instituicao", title: "Instituição", description: "Para instituições de ensino" },
          { id: "particular", title: "Particular", description: "Para professores particulares" }
        ]
      },
      {
        id: "diversos",
        title: "Diversos",
        description: "Para outros tipos de serviços",
        variants: [
          { id: "geral", title: "Geral", description: "Contrato geral de prestação de serviços" }
        ]
      }
    ],
    procuracao: [
      {
        id: "particular",
        title: "Procuração Particular",
        description: "Procurações particulares sem necessidade de cartório",
        variants: [
          { id: "fins_especificos", title: "Fins Específicos", description: "Para finalidades específicas" },
          { id: "geral", title: "Geral", description: "Procuração com poderes gerais" },
          { id: "ad_judicia", title: "Ad Judicia", description: "Para representação em processos judiciais" },
          { id: "poderes_especiais", title: "Com Poderes Especiais", description: "Com poderes especiais definidos" }
        ]
      }
    ]
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedSubcategory(null);
  };

  const handleSubcategorySelect = (subcategoryId: string) => {
    setSelectedSubcategory(subcategoryId);
  };

  const handleVariantSelect = (variant: any) => {
    // Navegar para o editor com os parâmetros selecionados
    navigate(`/dashboard/documents/editor?category=${selectedCategory}&subcategory=${selectedSubcategory}&variant=${variant.id}`);
  };

  const handleBack = () => {
    if (selectedSubcategory) {
      setSelectedSubcategory(null);
    } else if (selectedCategory) {
      setSelectedCategory(null);
    } else {
      navigate("/dashboard");
    }
  };

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);
  const selectedSubcategoryData = selectedCategory ? 
    subcategories[selectedCategory as keyof typeof subcategories]?.find(sub => sub.id === selectedSubcategory) 
    : null;

  return (
    <div className="space-y-6">
      {/* Header with breadcrumb */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={handleBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {!selectedCategory ? "Selecionar Tipo de Documento" : 
             !selectedSubcategory ? selectedCategoryData?.title :
             selectedSubcategoryData?.title}
          </h1>
          <p className="text-muted-foreground">
            {!selectedCategory ? "Escolha o tipo de documento que deseja criar" :
             !selectedSubcategory ? "Selecione a subcategoria" :
             "Escolha a variação do documento"}
          </p>
        </div>
      </div>

      {/* Categories */}
      {!selectedCategory && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Card 
                key={category.id} 
                className="group cursor-pointer hover:shadow-elegant transition-all duration-300 animate-fade-in"
                onClick={() => handleCategorySelect(category.id)}
              >
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg ${category.color} bg-opacity-10`}>
                      <Icon className={`h-6 w-6 text-primary`} />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {category.title}
                      </CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      )}

      {/* Subcategories */}
      {selectedCategory && !selectedSubcategory && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {subcategories[selectedCategory as keyof typeof subcategories]?.map((subcategory) => (
            <Card 
              key={subcategory.id}
              className="group cursor-pointer hover:shadow-elegant transition-all duration-300 animate-fade-in"
              onClick={() => handleSubcategorySelect(subcategory.id)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {subcategory.title}
                    </CardTitle>
                    <CardDescription>{subcategory.description}</CardDescription>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}

      {/* Variants */}
      {selectedCategory && selectedSubcategory && selectedSubcategoryData && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {selectedSubcategoryData.variants.map((variant) => (
            <Card 
              key={variant.id}
              className="group cursor-pointer hover:shadow-elegant transition-all duration-300 animate-fade-in"
              onClick={() => handleVariantSelect(variant)}
            >
              <CardHeader>
                <div className="space-y-2">
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {variant.title}
                  </CardTitle>
                  <CardDescription>{variant.description}</CardDescription>
                  <Button variant="professional" size="sm" className="w-full gap-2">
                    Usar este Modelo
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default DocumentSelection;
