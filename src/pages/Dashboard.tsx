
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Plus, 
  Clock, 
  TrendingUp,
  Library,
  Eye,
  Edit3,
  User,
  Search
} from "lucide-react";

export default function Dashboard() {
  // Mock data for the dashboard
  const recentDocuments = [
    {
      id: 1,
      title: "Contrato de Prestação de Serviços",
      type: "Contrato",
      lastModified: "2 horas atrás",
      status: "Rascunho"
    },
    {
      id: 2,
      title: "Petição Inicial - Ação de Cobrança",
      type: "Petição",
      lastModified: "1 dia atrás",
      status: "Finalizado"
    },
    {
      id: 3,
      title: "Procuração Ad Judicia",
      type: "Procuração",
      lastModified: "3 dias atrás",
      status: "Em Revisão"
    }
  ];

  const models = [
    {
      id: 1,
      title: "Contrato de Trabalho",
      category: "Contratos",
      usage: 156
    },
    {
      id: 2,
      title: "Petição de Divórcio",
      category: "Petições",
      usage: 89
    },
    {
      id: 3,
      title: "Procuração Específica",
      category: "Procurações",
      usage: 203
    }
  ];

  const stats = [
    {
      title: "Documentos Criados",
      value: "24",
      description: "Este mês",
      icon: FileText,
      trend: "+12%"
    },
    {
      title: "Modelos Utilizados",
      value: "8",
      description: "Diferentes tipos",
      icon: Library,
      trend: "+25%"
    },
    {
      title: "Tempo Economizado",
      value: "18h",
      description: "Esta semana",
      icon: Clock,
      trend: "+15%"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Finalizado":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Em Revisão":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "Rascunho":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Bem-vindo de volta! Aqui está um resumo da sua atividade jurídica.
        </p>
      </div>

      {/* Quick Actions - Moved to top */}
      <Card className="animate-slide-up">
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
          <CardDescription>
            Comece rapidamente com estas opções
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="professional" className="h-20 flex-col" asChild>
              <a href="/dashboard/documents/new">
                <Plus className="h-6 w-6 mb-2" />
                Novo Documento
              </a>
            </Button>
            <Button variant="elegant" className="h-20 flex-col" asChild>
              <a href="/dashboard/templates">
                <Library className="h-6 w-6 mb-2" />
                Explorar Modelos
              </a>
            </Button>
            <Button variant="elegant" className="h-20 flex-col" asChild>
              <a href="/dashboard/search">
                <Search className="h-6 w-6 mb-2" />
                Buscar Documentos
              </a>
            </Button>
            <Button variant="elegant" className="h-20 flex-col" asChild>
              <a href="/dashboard/settings">
                <User className="h-6 w-6 mb-2" />
                Inserir Dados
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat, index) => (
          <Card key={index} className="animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center space-x-2">
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
                <Badge variant="secondary" className="text-xs">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {stat.trend}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Documents */}
        <Card className="animate-slide-up">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Documentos Recentes</CardTitle>
                <CardDescription>
                  Seus documentos mais recentes e em andamento
                </CardDescription>
              </div>
              <Button variant="elegant" size="sm" asChild>
                <a href="/dashboard/documents">
                  <Eye className="h-4 w-4 mr-2" />
                  Ver Todos
                </a>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{doc.title}</h4>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <span>{doc.type}</span>
                        <span>•</span>
                        <span>{doc.lastModified}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(doc.status)}>
                      {doc.status}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <Edit3 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Popular Models */}
        <Card className="animate-slide-up">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Modelos Populares</CardTitle>
                <CardDescription>
                  Os modelos mais utilizados por você e outros usuários
                </CardDescription>
              </div>
              <Button variant="elegant" size="sm" asChild>
                <a href="/dashboard/templates">
                  <Library className="h-4 w-4 mr-2" />
                  Ver Biblioteca
                </a>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {models.map((model) => (
                <div
                  key={model.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center space-x-4">
                    <div className="bg-accent/50 p-2 rounded-lg">
                      <Library className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{model.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {model.category}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{model.usage}</p>
                    <p className="text-xs text-muted-foreground">usos</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
