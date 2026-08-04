import { Camera, MessageCircleHeart, Users, Compass, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const steps = [
  {
    icon: Camera,
    title: "Envie o desenho",
    description: "Tire uma foto ou escolha uma imagem do desenho.",
    accent: "bg-primary/15 text-primary",
    dot: "bg-primary",
  },
  {
    icon: MessageCircleHeart,
    title: "Conte quem ele é",
    description: "Nome, personalidade, gostos, sonhos e detalhes importantes.",
    accent: "bg-accent/15 text-accent-dark",
    dot: "bg-accent",
  },
  {
    icon: Users,
    title: "Escolha o personagem",
    description: "Veja três interpretações e escolha a que mais respeita o desenho.",
    accent: "bg-secondary/25 text-secondary-dark",
    dot: "bg-secondary",
  },
  {
    icon: Compass,
    title: "Escolha a aventura",
    description: "Espaço, floresta, dinossauros, fundo do mar ou surpresa.",
    accent: "bg-primary/15 text-primary",
    dot: "bg-primary",
  },
  {
    icon: BookOpen,
    title: "Leia o livro",
    description: "O personagem protagoniza uma história ilustrada criada para a família.",
    accent: "bg-accent/15 text-accent-dark",
    dot: "bg-accent",
  },
];

const HowItWorks = () => {
  return (
    <section id="como-funciona" className="py-16 md:py-24 bg-muted/40">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground">
            Como funciona
          </h2>
          <p className="text-lg text-muted-foreground mt-4">
            Cinco passos simples, feitos junto com a criança — do papel ao livro.
          </p>
        </div>

        <ol className="relative max-w-3xl mx-auto">
          {/* linha da jornada */}
          <span
            className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-primary/40 via-accent/40 to-secondary/50"
            aria-hidden="true"
          />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <li
                key={step.title}
                className="relative flex items-start gap-4 md:gap-6 pb-8 last:pb-0 group"
              >
                <div
                  className={`relative z-10 shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center ${step.accent} bg-card border-2 border-border shadow-sm transition-transform duration-300 group-hover:-translate-y-1`}
                >
                  <Icon size={26} />
                  <span
                    className={`absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full ${step.dot} text-[11px] font-extrabold text-white flex items-center justify-center`}
                  >
                    {index + 1}
                  </span>
                </div>

                <div className="pt-1.5">
                  <h3 className="font-display text-xl md:text-2xl font-bold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground mt-1 max-w-xl">{step.description}</p>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="text-center mt-12">
          <Link to="/create">
            <Button size="xl" variant="playful" className="rounded-full">
              Dar vida a um desenho
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
