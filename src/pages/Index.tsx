
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  FileText, 
  Scale, 
  Zap, 
  Shield, 
  Clock,
  CheckCircle,
  Star
} from "lucide-react";
import logoImage from "@/assets/docfacil-logo.png";

const Index = () => {
  const features = [
    {
      icon: FileText,
      title: "Modelos Profissionais",
      description: "Biblioteca completa com centenas de modelos jurídicos validados por especialistas"
    },
    {
      icon: Scale,
      title: "Editor Avançado",
      description: "Interface intuitiva para personalizar documentos com todas as funcionalidades necessárias"
    },
    {
      icon: Shield,
      title: "Segurança Garantida",
      description: "Armazenamento criptografado e backup automático para proteger seus documentos"
    },
    {
      icon: Zap,
      title: "Automação Inteligente",
      description: "IA integrada para sugerir cláusulas e otimizar a criação de documentos"
    },
    {
      icon: Clock,
      title: "Economize Tempo",
      description: "Reduza em até 80% o tempo gasto na criação de documentos jurídicos"
    }
  ];

  const testimonials = [
    {
      name: "Dr. Ana Silva",
      role: "Sócia - Silva & Associados",
      content: "O DocFácil revolucionou nosso escritório. Conseguimos criar documentos em minutos.",
      rating: 5
    },
    {
      name: "Dr. Carlos Mendes",
      role: "Advogado Autônomo",
      content: "Interface intuitiva e modelos de alta qualidade. Recomendo para todos os colegas.",
      rating: 5
    },
    {
      name: "Dra. Paula Santos",
      role: "Departamento Jurídico - TechCorp",
      content: "A facilidade de criação de documentos agilizou muito o trabalho da nossa equipe.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center animate-fade-in">
            <div className="flex justify-center mb-6">
              <img 
                src={logoImage} 
                alt="DocFácil" 
                className="h-20 w-20"
              />
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                DocFácil
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-3xl mx-auto">
              Simplifique a criação de documentos jurídicos com nossa plataforma inteligente
            </p>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Modelos profissionais, editor avançado para advogados e escritórios modernos
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button variant="professional" size="lg" className="text-lg px-8 py-4" asChild>
                <a href="/auth">
                  Teste Gratuito
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button variant="elegant" size="lg" className="text-lg px-8 py-4" asChild>
                <a href="/auth">
                  Login
                </a>
              </Button>
            </div>
            
            <div className="mt-8 flex justify-center items-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                Teste grátis por tempo limitado
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                Assinaturas mensais e trimestrais
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                Biblioteca com centenas de documentos
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Tudo que você precisa para criar documentos jurídicos
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Uma plataforma completa desenvolvida especificamente para as necessidades do setor jurídico
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-elegant transition-all duration-300 animate-slide-up border-0 shadow-soft">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <feature.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4 text-center">
            {[
              { number: "10,000+", label: "Documentos Criados" },
              { number: "500+", label: "Escritórios Atendidos" },
              { number: "80%", label: "Redução de Tempo" },
              { number: "99.9%", label: "Uptime Garantido" }
            ].map((stat, index) => (
              <div key={index} className="animate-fade-in">
                <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Confiado por profissionais do direito
            </h2>
            <p className="text-xl text-muted-foreground">
              Veja o que nossos usuários falam sobre o DocFácil
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-soft animate-slide-up">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-primary">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-primary-foreground mb-4">
            Pronto para simplificar sua prática jurídica?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de advogados que já revolucionaram sua forma de criar documentos
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="text-lg px-8 py-4" asChild>
              <a href="/auth">
                Iniciar Teste Gratuito
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-foreground/5 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <img src={logoImage} alt="DocFácil" className="h-8 w-8" />
              <span className="text-xl font-bold">DocFácil</span>
            </div>
            
            <div className="text-muted-foreground text-center md:text-right">
              <p>&copy; 2024 DocFácil. Todos os direitos reservados.</p>
              <div className="flex space-x-4 mt-2 justify-center md:justify-end">
                <a href="#" className="hover:text-primary transition-colors">Termos de Uso</a>
                <a href="#" className="hover:text-primary transition-colors">Política de Privacidade</a>
                <a href="#" className="hover:text-primary transition-colors">Suporte</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
