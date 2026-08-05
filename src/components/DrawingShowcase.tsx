import { ArrowRight } from "lucide-react";
import drawing from "@/assets/demo-1-drawing.jpg";
import character from "@/assets/demo-2-character.jpg";
import book from "@/assets/demo-3-book.jpg";

const moments = [
  {
    src: drawing,
    label: "O desenho",
    caption: "Feito à mão, do jeitinho dele",
    ring: "border-primary/30",
    chip: "bg-primary text-primary-foreground",
  },
  {
    src: character,
    label: "O personagem",
    caption: "Mesmas formas, mesmas cores",
    ring: "border-accent/40",
    chip: "bg-accent text-accent-foreground",
  },
  {
    src: book,
    label: "O livro",
    caption: "Uma aventura só de vocês",
    ring: "border-secondary/50",
    chip: "bg-secondary text-secondary-foreground",
  },
];

const DrawingShowcase = () => {
  return (
    <div className="relative">
      <div className="absolute -top-6 -left-4 w-16 h-16 rounded-full bg-secondary/40 blur-xl" aria-hidden="true" />
      <div className="absolute -bottom-8 -right-6 w-24 h-24 rounded-full bg-accent/30 blur-2xl" aria-hidden="true" />

      <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-3 lg:gap-4">
        {moments.map((moment, index) => (
          <figure
            key={moment.label}
            className={`group relative bg-card rounded-3xl border-2 ${moment.ring} p-3 shadow-lg transition-transform duration-300 hover:-translate-y-1 ${
              index === 1 ? "sm:mt-6" : ""
            }`}
          >
            <span
              className={`absolute -top-3 left-4 z-10 px-3 py-1 rounded-full text-xs font-bold ${moment.chip}`}
            >
              {index + 1}. {moment.label}
            </span>

            <img
              src={moment.src}
              alt={
                index === 0
                  ? "Desenho infantil original de um gato-dragão laranja com asas azuis"
                  : index === 1
                  ? "Personagem ilustrado a partir do desenho, preservando formas e cores"
                  : "Capa do livro ilustrado com o mesmo personagem"
              }
              width={912}
              height={912}
              loading={index === 0 ? "eager" : "lazy"}
              className="w-full aspect-square object-cover rounded-2xl bg-muted"
            />

            <figcaption className="pt-3 pb-1 px-1 text-sm font-semibold text-muted-foreground">
              {moment.caption}
            </figcaption>

            {index < moments.length - 1 && (
              <ArrowRight
                className="hidden sm:block absolute top-1/2 -right-5 lg:-right-6 -translate-y-1/2 w-6 h-6 text-primary/40"
                aria-hidden="true"
              />
            )}
          </figure>
        ))}
      </div>
    </div>
  );
};

export default DrawingShowcase;
