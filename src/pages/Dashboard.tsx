
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
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

interface Document {
  id: string;
  title: string;
  type: string;
  subtype: string | null;
  variant: string | null;
  status: string | null;
  created_at: string;
  updated_at: string;
}

interface DocumentTemplate {
  id: string;
  name: string;
  category: string;
  subcategory: string | null;
  variant: string | null;
}

export default function Dashboard() {
  const [recentDocuments, setRecentDocuments] = useState<Document[]>([]);
  const [popularTemplates, setPopularTemplates] = useState<DocumentTemplate[]>([]);
  const [stats, setStats] = useState({
    documentsCreated: 0,
    templatesUsed: 0,
    documentsThisMonth: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return;

      // Load recent documents
      const { data: documents } = await supabase
        .from("documents")
        .select("*")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false })
        .limit(3);

      // Load popular templates (first 3 for now)
      const { data: templates } = await supabase
        .from("document_templates")
        .select("*")
        .order("name")
        .limit(3);

      // Calculate stats
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      
      const { data: monthlyDocs } = await supabase
        .from("documents")
        .select("id")
        .eq("user_id", user.id)
        .gte("created_at", startOfMonth.toISOString());

      const uniqueTypes = new Set(documents?.map(doc => doc.type) || []);

      setRecentDocuments(documents || []);
      setPopularTemplates(templates || []);
      setStats({
        documentsCreated: documents?.length || 0,
        templatesUsed: uniqueTypes.size,
        documentsThisMonth: monthlyDocs?.length || 0
      });

    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

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

  const getDocumentTypeName = (type: string) => {
    switch (type) {
      case "contrato_aluguel":
        return "Contrato de Aluguel";
      case "contrato_compra_venda":
        return "Contrato de Compra e Venda";
      case "contrato_prestacao_servico":
        return "Contrato de Prestação de Serviço";
      case "procuracao":
        return "Procuração";
      default:
        return "Documento";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

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
              <a href="/dashboard/documents">
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
        <Card className="animate-fade-in">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Documentos Criados
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.documentsCreated}</div>
            <div className="flex items-center space-x-2">
              <p className="text-xs text-muted-foreground">
                Total de documentos
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fade-in">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Modelos Utilizados
            </CardTitle>
            <Library className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.templatesUsed}</div>
            <div className="flex items-center space-x-2">
              <p className="text-xs text-muted-foreground">
                Diferentes tipos
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fade-in">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Este Mês
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.documentsThisMonth}</div>
            <div className="flex items-center space-x-2">
              <p className="text-xs text-muted-foreground">
                Documentos criados
              </p>
            </div>
          </CardContent>
        </Card>
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
              {recentDocuments.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Nenhum documento criado ainda
                  </p>
                  <Button variant="professional" size="sm" className="mt-2" asChild>
                    <a href="/dashboard/documents/new">
                      Criar Primeiro Documento
                    </a>
                  </Button>
                </div>
              ) : (
                recentDocuments.map((doc) => (
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
                          <span>{getDocumentTypeName(doc.type)}</span>
                          <span>•</span>
                          <span>{new Date(doc.updated_at).toLocaleDateString('pt-BR')}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(doc.status)}>
                        {getStatusText(doc.status)}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Edit3 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
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
                  Os modelos mais utilizados na plataforma
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
              {popularTemplates.map((template) => (
                <div
                  key={template.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center space-x-4">
                    <div className="bg-accent/50 p-2 rounded-lg">
                      <Library className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{template.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {getDocumentTypeName(template.category)}
                      </p>
                    </div>
                  </div>
                  <Button variant="professional" size="sm" asChild>
                    <a href={`/dashboard/documents/editor?category=${template.category}&subcategory=${template.subcategory}&variant=${template.variant}`}>
                      Usar
                    </a>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
