import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  FileText, 
  Search, 
  Plus,
  MoreVertical,
  Edit3,
  Trash2,
  Share2,
  Download,
  Clock,
  Users,
  Filter,
  Grid3X3,
  List
} from "lucide-react";

const Documents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filterStatus, setFilterStatus] = useState("all");

  const documents = [
    {
      id: 1,
      title: "Contrato de Prestação de Serviços - Cliente ABC",
      type: "Contrato",
      status: "Rascunho",
      lastModified: "2 horas atrás",
      createdAt: "15/07/2024",
      collaborators: ["João Silva", "Maria Santos"],
      size: "2.4 MB",
      description: "Contrato de prestação de serviços para desenvolvimento de software"
    },
    {
      id: 2,
      title: "Petição Inicial - Ação de Cobrança Empresa XYZ",
      type: "Petição",
      status: "Em Revisão",
      lastModified: "1 dia atrás",
      createdAt: "14/07/2024",
      collaborators: ["Ana Costa"],
      size: "1.8 MB",
      description: "Petição inicial para ação de cobrança contra inadimplência"
    },
    {
      id: 3,
      title: "Procuração Ad Judicia - Processo 123456",
      type: "Procuração",
      status: "Finalizado",
      lastModified: "3 dias atrás",
      createdAt: "12/07/2024",
      collaborators: [],
      size: "856 KB",
      description: "Procuração para representação judicial em processo trabalhista"
    },
    {
      id: 4,
      title: "Contrato de Trabalho - Novo Funcionário",
      type: "Contrato",
      status: "Finalizado",
      lastModified: "1 semana atrás",
      createdAt: "08/07/2024",
      collaborators: ["Pedro Lima"],
      size: "1.2 MB",
      description: "Contrato de trabalho CLT para admissão de novo colaborador"
    },
    {
      id: 5,
      title: "Termo de Confidencialidade - Projeto Beta",
      type: "Contrato",
      status: "Aguardando Assinatura",
      lastModified: "2 dias atrás",
      createdAt: "13/07/2024",
      collaborators: ["Carlos Mendes", "Lucia Oliveira"],
      size: "945 KB",
      description: "NDA para proteção de informações confidenciais do projeto"
    },
    {
      id: 6,
      title: "Contestação - Processo Civil 789012",
      type: "Petição",
      status: "Rascunho",
      lastModified: "4 horas atrás",
      createdAt: "15/07/2024",
      collaborators: ["Roberto Silva"],
      size: "3.1 MB",
      description: "Contestação em processo de indenização por danos morais"
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
      case "Aguardando Assinatura":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getTypeIcon = (type: string) => {
    return FileText; // You could expand this to have different icons per type
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === "all" || doc.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const statusOptions = [
    { value: "all", label: "Todos" },
    { value: "Rascunho", label: "Rascunho" },
    { value: "Em Revisão", label: "Em Revisão" },
    { value: "Finalizado", label: "Finalizado" },
    { value: "Aguardando Assinatura", label: "Aguardando Assinatura" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Meus Documentos</h1>
            <p className="text-muted-foreground">
              Gerencie e organize todos os seus documentos jurídicos
            </p>
          </div>
          <Button variant="professional" className="gap-2" asChild>
            <a href="/dashboard/documents/new">
              <Plus className="h-4 w-4" />
              Novo Documento
            </a>
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
          
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Status: {statusOptions.find(opt => opt.value === filterStatus)?.label}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {statusOptions.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() => setFilterStatus(option.value)}
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex border border-border rounded-md">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Documents Display */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {filteredDocuments.length} documentos encontrados
          </p>
        </div>

        {viewMode === "grid" ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredDocuments.map((doc) => {
              const TypeIcon = getTypeIcon(doc.type);
              
              return (
                <Card key={doc.id} className="group hover:shadow-elegant transition-all duration-300 animate-fade-in">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="bg-primary/10 p-2 rounded-lg">
                          <TypeIcon className="h-4 w-4 text-primary" />
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {doc.type}
                        </Badge>
                      </div>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit3 className="h-4 w-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Share2 className="h-4 w-4 mr-2" />
                            Compartilhar
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    
                    <CardTitle className="text-lg leading-tight line-clamp-2">
                      {doc.title}
                    </CardTitle>
                    
                    <CardDescription className="text-sm line-clamp-2">
                      {doc.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <Badge className={getStatusColor(doc.status)}>
                      {doc.status}
                    </Badge>

                    <div className="space-y-2 text-xs text-muted-foreground">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{doc.lastModified}</span>
                        </div>
                        <span>{doc.size}</span>
                      </div>
                      
                      {doc.collaborators.length > 0 && (
                        <div className="flex items-center space-x-1">
                          <Users className="h-3 w-3" />
                          <span>{doc.collaborators.length} colaborador(es)</span>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button variant="professional" size="sm" className="flex-1">
                        <Edit3 className="h-4 w-4 mr-2" />
                        Editar
                      </Button>
                      <Button variant="elegant" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredDocuments.map((doc) => {
              const TypeIcon = getTypeIcon(doc.type);
              
              return (
                <Card key={doc.id} className="group hover:shadow-soft transition-all duration-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="bg-primary/10 p-2 rounded-lg">
                          <TypeIcon className="h-4 w-4 text-primary" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium truncate">{doc.title}</h3>
                          <p className="text-sm text-muted-foreground truncate">{doc.description}</p>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <Badge variant="outline">{doc.type}</Badge>
                          <Badge className={getStatusColor(doc.status)}>{doc.status}</Badge>
                          <span>{doc.lastModified}</span>
                          <span>{doc.size}</span>
                          {doc.collaborators.length > 0 && (
                            <div className="flex items-center space-x-1">
                              <Users className="h-3 w-3" />
                              <span>{doc.collaborators.length}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit3 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {filteredDocuments.length === 0 && (
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Nenhum documento encontrado</h3>
            <p className="text-muted-foreground mb-4">
              Tente ajustar seus filtros ou criar um novo documento.
            </p>
            <Button variant="professional" asChild>
              <a href="/dashboard/documents/new">
                <Plus className="h-4 w-4 mr-2" />
                Criar Primeiro Documento
              </a>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Documents;