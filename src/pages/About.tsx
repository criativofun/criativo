import { Heart, Users, Lightbulb, Target } from "lucide-react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import mascotImage from "@/assets/mascot-character.jpg";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Conexão Familiar",
      description: "Fortalecemos os laços entre pais e filhos através da criatividade compartilhada",
      color: "text-accent"
    },
    {
      icon: Lightbulb,
      title: "Criatividade",
      description: "Estimulamos a imaginação das crianças e valorizamos suas ideias únicas",
      color: "text-secondary"
    },
    {
      icon: Users,
      title: "Inclusão",
      description: "Acreditamos que toda criança tem histórias incríveis para contar",
      color: "text-primary"
    },
    {
      icon: Target,
      title: "Educação Lúdica",
      description: "Aprendizado através da diversão e da descoberta do mundo da narrativa",
      color: "text-accent"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Sobre o{" "}
            <span className="text-primary">cr</span>
            <span className="text-accent">IA</span>
            <span className="text-primary">tivo</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Uma plataforma criada com amor para transformar a imaginação das crianças em histórias inesquecíveis
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Story */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground">Nossa História</h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                O <strong className="text-primary">crIAtivo</strong> nasceu da observação de que as crianças têm uma 
                capacidade incrível de criar mundos fantásticos através de seus desenhos e imaginação.
              </p>
              <p>
                Queremos que cada rabisco, cada ideia maluca e cada personagem criado pela mente infantil 
                se transforme em uma história completa e ilustrada, que pode ser compartilhada e guardada 
                para sempre.
              </p>
              <p>
                Utilizamos inteligência artificial não para substituir a criatividade, mas para 
                <strong className="text-accent"> amplificá-la</strong> e dar vida às ideias das crianças de uma forma 
                que elas nunca imaginaram ser possível.
              </p>
            </div>
          </div>

          {/* Mascot */}
          <div className="text-center">
            <img 
              src={mascotImage} 
              alt="Mascote do crIAtivo" 
              className="w-80 h-80 object-cover rounded-full mx-auto shadow-2xl animate-float"
            />
            <p className="mt-6 text-lg font-semibold text-foreground">
              Conheça nosso mascote! 🌟
            </p>
          </div>
        </div>

        {/* Mission */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl p-8 md:p-12 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Nossa Missão</h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Conectar pais e filhos através da magia da narrativa, transformando cada desenho em uma ponte 
              para momentos especiais de criatividade compartilhada.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="text-center border-0 bg-background/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                  <CardContent className="p-6 space-y-4">
                    <div className={`${value.color} w-16 h-16 rounded-full bg-current/20 flex items-center justify-center mx-auto`}>
                      <Icon size={32} className={value.color} />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Team */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Como Funciona a Magia?</h2>
          <div className="max-w-4xl mx-auto space-y-6 text-lg text-muted-foreground">
            <p>
              Nossa plataforma combina tecnologia de ponta com a sensibilidade necessária para trabalhar 
              com o universo infantil. Utilizamos inteligência artificial especializada em:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="bg-primary/5 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-primary mb-3">Análise de Desenhos</h3>
                <p className="text-muted-foreground">
                  Reconhecemos personagens, formas e elementos nos desenhos das crianças para criar 
                  ilustrações digitais que respeitam a criação original.
                </p>
              </div>
              <div className="bg-secondary/5 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-secondary mb-3">Narrativa Criativa</h3>
                <p className="text-muted-foreground">
                  Transformamos as ideias das crianças em histórias estruturadas, mantendo a 
                  essência e magia das ideias originais.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-primary via-secondary to-accent rounded-3xl p-8 md:p-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pronto para Começar a Magia?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Junte-se a milhares de famílias que já descobriram a alegria de criar histórias juntas!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/create"
              className="bg-white text-primary font-bold py-4 px-8 rounded-full text-lg hover:bg-white/90 transition-all duration-300 hover:scale-105 inline-block"
            >
              Criar Primeira História
            </a>
            <a 
              href="/contato"
              className="border-2 border-white text-white font-bold py-4 px-8 rounded-full text-lg hover:bg-white/10 transition-all duration-300 hover:scale-105 inline-block"
            >
              Falar Conosco
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;