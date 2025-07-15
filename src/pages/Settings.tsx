import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  Bell, 
  Shield, 
  CreditCard,
  Download,
  Upload,
  Save,
  AlertTriangle,
  Check
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();
  const [profileData, setProfileData] = useState({
    fullName: "João Silva",
    email: "joao.silva@email.com",
    phone: "(11) 99999-9999",
    oab: "SP 123.456",
    company: "Silva & Associados"
  });

  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    documentReminders: true,
    collaborationAlerts: true,
    systemAnnouncements: false,
    marketingEmails: false
  });

  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    sessionTimeout: "4",
    loginAlerts: true
  });

  const handleProfileSave = () => {
    toast({
      title: "Perfil atualizado",
      description: "Suas informações foram salvas com sucesso.",
    });
  };

  const handleNotificationSave = () => {
    toast({
      title: "Preferências salvas",
      description: "Suas configurações de notificação foram atualizadas.",
    });
  };

  const handleSecuritySave = () => {
    toast({
      title: "Configurações de segurança atualizadas",
      description: "Suas preferências de segurança foram salvas.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
        <p className="text-muted-foreground">
          Gerencie suas preferências e configurações da conta
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
          <TabsTrigger value="billing">Assinatura</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações do Perfil</CardTitle>
              <CardDescription>
                Atualize suas informações pessoais e profissionais
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback className="text-lg bg-primary/10 text-primary">
                    JS
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Alterar Foto
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    JPG, PNG ou GIF. Máximo 2MB.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Nome Completo</Label>
                  <Input
                    id="fullName"
                    value={profileData.fullName}
                    onChange={(e) => setProfileData(prev => ({ ...prev, fullName: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="oab">OAB</Label>
                  <Input
                    id="oab"
                    value={profileData.oab}
                    onChange={(e) => setProfileData(prev => ({ ...prev, oab: e.target.value }))}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="company">Escritório/Empresa</Label>
                  <Input
                    id="company"
                    value={profileData.company}
                    onChange={(e) => setProfileData(prev => ({ ...prev, company: e.target.value }))}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button variant="professional" onClick={handleProfileSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Alterações
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Preferências de Notificação</CardTitle>
              <CardDescription>
                Configure como e quando você quer receber notificações
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {[
                  {
                    key: "emailUpdates",
                    title: "Atualizações por E-mail",
                    description: "Receba resumos semanais e atualizações importantes"
                  },
                  {
                    key: "documentReminders",
                    title: "Lembretes de Documentos",
                    description: "Alertas sobre prazos e documentos pendentes"
                  },
                  {
                    key: "collaborationAlerts",
                    title: "Alertas de Colaboração",
                    description: "Notificações quando alguém compartilhar ou comentar em documentos"
                  },
                  {
                    key: "systemAnnouncements",
                    title: "Anúncios do Sistema",
                    description: "Informações sobre novas funcionalidades e manutenções"
                  },
                  {
                    key: "marketingEmails",
                    title: "E-mails de Marketing",
                    description: "Dicas, tutoriais e ofertas especiais"
                  }
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between space-x-2">
                    <div className="space-y-0.5">
                      <Label htmlFor={item.key} className="text-base font-medium">
                        {item.title}
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                    <Switch
                      id={item.key}
                      checked={notifications[item.key as keyof typeof notifications]}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, [item.key]: checked }))
                      }
                    />
                  </div>
                ))}
              </div>

              <div className="flex justify-end">
                <Button variant="professional" onClick={handleNotificationSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Preferências
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Segurança</CardTitle>
              <CardDescription>
                Proteja sua conta com configurações avançadas de segurança
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base font-medium">
                      Autenticação de Dois Fatores
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Adicione uma camada extra de segurança à sua conta
                    </p>
                  </div>
                  <Switch
                    checked={security.twoFactorAuth}
                    onCheckedChange={(checked) => 
                      setSecurity(prev => ({ ...prev, twoFactorAuth: checked }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Timeout da Sessão (horas)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    min="1"
                    max="24"
                    value={security.sessionTimeout}
                    onChange={(e) => setSecurity(prev => ({ ...prev, sessionTimeout: e.target.value }))}
                    className="w-32"
                  />
                  <p className="text-sm text-muted-foreground">
                    Tempo até deslogar automaticamente por inatividade
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base font-medium">
                      Alertas de Login
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Receba notificações quando alguém acessar sua conta
                    </p>
                  </div>
                  <Switch
                    checked={security.loginAlerts}
                    onCheckedChange={(checked) => 
                      setSecurity(prev => ({ ...prev, loginAlerts: checked }))
                    }
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Ações de Segurança</h4>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    Alterar Senha
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Revisar Sessões Ativas
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Baixar Dados da Conta
                  </Button>
                </div>
              </div>

              <div className="flex justify-end">
                <Button variant="professional" onClick={handleSecuritySave}>
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Configurações
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Plano Atual</CardTitle>
                <CardDescription>
                  Gerencie sua assinatura e faturamento
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Plano Professional</h3>
                    <p className="text-sm text-muted-foreground">
                      R$ 89,90/mês
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-600">Ativo</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm"><strong>Próxima cobrança:</strong> 15 de agosto, 2024</p>
                  <p className="text-sm"><strong>Método de pagamento:</strong> Cartão terminado em 1234</p>
                </div>

                <div className="space-y-2">
                  <Button variant="outline" className="w-full">
                    Alterar Plano
                  </Button>
                  <Button variant="outline" className="w-full">
                    Gerenciar Pagamento
                  </Button>
                  <Button variant="outline" className="w-full text-destructive hover:text-destructive">
                    Cancelar Assinatura
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Uso do Plano</CardTitle>
                <CardDescription>
                  Acompanhe o uso dos recursos do seu plano
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    { label: "Documentos criados", used: 24, limit: 100 },
                    { label: "Armazenamento", used: 2.1, limit: 10, unit: "GB" },
                    { label: "Colaboradores", used: 3, limit: 10 },
                    { label: "Templates premium", used: 8, limit: "Ilimitado" }
                  ].map((item, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{item.label}</span>
                        <span>
                          {item.used} {item.unit || ""} / {item.limit} {item.unit || ""}
                        </span>
                      </div>
                      {typeof item.limit === "number" && (
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${(item.used / item.limit) * 100}%` }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <span>Zona de Perigo</span>
              </CardTitle>
              <CardDescription>
                Ações irreversíveis que afetam permanentemente sua conta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="destructive" className="w-full">
                Excluir Conta Permanentemente
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                Esta ação não pode ser desfeita. Todos os seus dados serão perdidos permanentemente.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;