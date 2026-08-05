import { Button } from "@/components/ui/button";
import { ArrowRight, Pencil, Heart, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import DrawingShowcase from "./DrawingShowcase";

const benefits = [
  {
    icon: Pencil,
    title: "Desenhe",
    description: "Feito pela criança",
    iconClass: "text-primary",
    bgClass: "bg-primary/15",
  },
  {
    icon: Sparkles,
    title: "O personagem ganha vida",
    description: "Sem perder sua identidade",
    iconClass: "text-accent",
    bgClass: "bg-accent/15",
  },
  {
    icon: Heart,
    title: "Vivam uma aventura",
    description: "Em um livro só de vocês",
    iconClass: "text-secondary-dark",
    bgClass: "bg-secondary/25",
  },
];

const Hero = () => {
  return (
    <section className="relative overflow-hidden hero-gradient">
      <div className="container mx-auto px-4 pt-12 pb-16 md:pt-16 md:pb-24">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/30 text-secondary-foreground text-sm font-bold">
            <Sparkles className="w-4 h-4" />
            Uma aventura para criar em família
          </span>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-[1.1]">
            Veja o desenho do seu filho{" "}
            <span className="text-primary">ganhar vida</span>.
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            O crIAtivo revela o personagem que já existe na imaginação da criança
            e o transforma em uma história ilustrada para vocês guardarem juntos.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link to="/create" className="w-full sm:w-auto">
              <Button size="xl" variant="playful" className="w-full sm:w-auto rounded-full group">
                Dar vida a um desenho
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <a href="#como-funciona" className="w-full sm:w-auto">
              <Button size="xl" variant="outline" className="w-full sm:w-auto rounded-full border-2">
                Ver como funciona
              </Button>
            </a>
          </div>
        </div>

        {/* Demonstração visual: desenho → personagem → livro */}
        <div className="mt-12 md:mt-16 max-w-5xl mx-auto">
          <DrawingShowcase />
        </div>

        {/* Benefícios rápidos */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="flex items-center gap-3 bg-card rounded-2xl border border-border p-4 shadow-sm"
              >
                <div className={`p-3 rounded-full shrink-0 ${benefit.bgClass}`}>
                  <Icon className={`w-6 h-6 ${benefit.iconClass}`} />
                </div>
                <div className="text-left">
                  <h2 className="font-display font-bold text-foreground leading-tight">
                    {benefit.title}
                  </h2>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Hero;
