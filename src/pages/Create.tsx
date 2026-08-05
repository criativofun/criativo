import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Camera,
  ImagePlus,
  Trash2,
  Check,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import Header from "@/components/Header";
import { CharacterStyle, generateCharacterInterpretations } from "@/lib/ai";
import { generateStorybook, Storybook } from "@/lib/story";

const TOTAL_STEPS = 5;
const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png"];

const loadingMessages = [
  "Observando cada detalhe...",
  "Descobrindo formas e cores...",
  "Imaginando quem vive nesse desenho...",
];

const characterStyles: Array<{
  value: CharacterStyle;
  emoji: string;
  label: string;
  description: string;
}> = [
  { value: "3d", emoji: "✨", label: "3D cinematográfico", description: "Volume, luz e magia de animação" },
  { value: "2d", emoji: "🖍️", label: "Ilustração 2D", description: "Acabamento de livro infantil" },
  { value: "vector", emoji: "◆", label: "Vetor moderno", description: "Formas limpas e cores marcantes" },
];

const adventures = [
  { value: "espaco", emoji: "🚀", label: "Espaço", description: "Planetas, foguetes e estrelas" },
  { value: "floresta", emoji: "🌲", label: "Floresta", description: "Árvores gigantes e amigos escondidos" },
  { value: "dinossauros", emoji: "🦕", label: "Dinossauros", description: "Pegadas enormes e muita coragem" },
  { value: "mar", emoji: "🌊", label: "Fundo do mar", description: "Peixes coloridos e tesouros" },
  { value: "surpresa", emoji: "🎁", label: "Surpresa", description: "Deixe a história escolher" },
];

const Create = () => {
  const [step, setStep] = useState(1);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState("");
  const [generationError, setGenerationError] = useState("");
  const [consent, setConsent] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);
  const [generatedCharacters, setGeneratedCharacters] = useState<string[]>([]);
  const [characterStyle, setCharacterStyle] = useState<CharacterStyle>("3d");
  const [characterData, setCharacterData] = useState({
    name: "",
    personality: "",
    likes: "",
    dreams: "",
    details: "",
  });
  const [selectedAdventure, setSelectedAdventure] = useState("");
  const [story, setStory] = useState<Storybook | null>(null);
  const [isWritingStory, setIsWritingStory] = useState(false);
  const [storyError, setStoryError] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isThinking) return;
    setMessageIndex(0);
    const interval = window.setInterval(() => {
      setMessageIndex((i) => Math.min(i + 1, loadingMessages.length - 1));
    }, 1400);
    return () => {
      window.clearInterval(interval);
    };
  }, [isThinking]);

  const generateCharacters = async () => {
    if (!uploadedImage) return;
    setGenerationError("");
    setSelectedCharacter(null);
    setIsThinking(true);

    try {
      const images = await generateCharacterInterpretations(uploadedImage, characterStyle);
      setGeneratedCharacters(images);
      setSelectedCharacter("0");
      setStep(2);
    } catch (error) {
      setGenerationError(
        error instanceof Error ? error.message : "Não foi possível dar vida ao desenho agora.",
      );
    } finally {
      setIsThinking(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadError("");
    setGenerationError("");

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      setUploadError("Escolha uma imagem no formato JPG ou PNG.");
      event.target.value = "";
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      setUploadError("A imagem precisa ter no máximo 10 MB.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => setUploadedImage(e.target?.result as string);
    reader.readAsDataURL(file);
    event.target.value = "";
  };

  const removeDrawing = () => {
    setUploadedImage(null);
    setUploadError("");
    setSelectedCharacter(null);
    setGeneratedCharacters([]);
  };

  const goBack = () => setStep((s) => Math.max(1, s - 1));

  const createStory = async () => {
    if (!selectedAdventure) return;
    setStoryError("");
    setIsWritingStory(true);

    try {
      const adventure = adventures.find((item) => item.value === selectedAdventure)?.label
        ?? selectedAdventure;
      const result = await generateStorybook({ character: characterData, adventure });
      setStory(result);
      setStep(5);
    } catch (error) {
      setStoryError(error instanceof Error ? error.message : "Não foi possível escrever a história.");
    } finally {
      setIsWritingStory(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 via-background to-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex justify-between items-center mb-3">
            <Button variant="ghost" onClick={goBack} className="gap-2 font-bold" disabled={step === 1}>
              <ArrowLeft size={18} />
              Voltar
            </Button>
            <span className="text-sm font-bold text-muted-foreground">
              Passo {step} de {TOTAL_STEPS}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-primary to-accent h-3 rounded-full transition-all duration-500"
              style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
            />
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Passo 1 — Envie o desenho */}
          {step === 1 && !isThinking && (
            <Card className="border-2 border-primary/20 shadow-xl rounded-3xl">
              <CardHeader className="text-center">
                <CardTitle className="font-display text-2xl md:text-3xl font-extrabold">
                  Envie o desenho
                </CardTitle>
                <p className="text-muted-foreground">
                  Tire uma foto ou escolha uma imagem do desenho.
                </p>
              </CardHeader>
              <CardContent className="space-y-5">
                {uploadedImage ? (
                  <div className="space-y-4">
                    <div className="rounded-2xl border-2 border-primary/30 bg-muted/40 p-3">
                      <img
                        src={uploadedImage}
                        alt="Pré-visualização do desenho enviado"
                        className="max-h-72 w-full object-contain rounded-xl"
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        variant="outline"
                        size="lg"
                        className="flex-1 gap-2"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <RefreshCw size={18} />
                        Trocar desenho
                      </Button>
                      <Button variant="ghost" size="lg" className="gap-2 text-destructive" onClick={removeDrawing}>
                        <Trash2 size={18} />
                        Remover
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => cameraInputRef.current?.click()}
                      className="flex flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-primary/40 p-8 hover:border-primary hover:bg-primary/5 transition-colors"
                    >
                      <Camera className="w-9 h-9 text-primary" />
                      <span className="font-bold text-foreground">Usar a câmera</span>
                      <span className="text-sm text-muted-foreground">Direto do celular</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-accent/40 p-8 hover:border-accent hover:bg-accent/5 transition-colors"
                    >
                      <ImagePlus className="w-9 h-9 text-accent" />
                      <span className="font-bold text-foreground">Escolher imagem</span>
                      <span className="text-sm text-muted-foreground">JPG ou PNG até 10MB</span>
                    </button>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <input
                  ref={cameraInputRef}
                  type="file"
                  accept="image/jpeg,image/png"
                  capture="environment"
                  className="hidden"
                  onChange={handleImageUpload}
                />

                {uploadError && (
                  <p
                    role="alert"
                    className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm font-bold text-destructive"
                  >
                    {uploadError}
                  </p>
                )}

                <label className="flex items-start gap-3 rounded-2xl bg-muted/60 p-4 cursor-pointer">
                  <Checkbox
                    checked={consent}
                    onCheckedChange={(value) => setConsent(value === true)}
                    className="mt-0.5"
                  />
                  <span className="text-sm text-muted-foreground">
                    Sou o responsável e autorizo o uso deste desenho para criar o personagem e o livro.
                  </span>
                </label>

                <p className="flex items-start gap-2 text-xs text-muted-foreground">
                  <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-primary" />
                  Uso acompanhado por um adulto. O desenho só será utilizado após o consentimento do responsável.
                </p>

                <fieldset className="space-y-3">
                  <legend className="font-display text-lg font-extrabold text-foreground">
                    Como ele deve ganhar vida?
                  </legend>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {characterStyles.map((style) => (
                      <button
                        key={style.value}
                        type="button"
                        aria-pressed={characterStyle === style.value}
                        onClick={() => setCharacterStyle(style.value)}
                        className={`rounded-2xl border-2 p-4 text-left transition-all ${
                          characterStyle === style.value
                            ? "border-primary bg-primary/10 shadow-md"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <span className="block text-2xl mb-2" aria-hidden="true">{style.emoji}</span>
                        <span className="block font-bold text-sm text-foreground">{style.label}</span>
                        <span className="block text-xs text-muted-foreground mt-1">{style.description}</span>
                      </button>
                    ))}
                  </div>
                </fieldset>

                <Button
                  onClick={generateCharacters}
                  disabled={!uploadedImage || !consent}
                  size="xl"
                  variant="playful"
                  className="w-full"
                >
                  Dar vida a este desenho
                </Button>
                {generationError && (
                  <p
                    role="alert"
                    className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm font-bold text-destructive"
                  >
                    {generationError}
                  </p>
                )}
              </CardContent>
            </Card>
          )}

          {/* Processando */}
          {isThinking && (
            <Card className="border-2 border-primary/20 shadow-xl rounded-3xl">
              <CardContent className="py-16 text-center space-y-6">
                <div className="mx-auto w-20 h-20 rounded-full bg-primary/15 flex items-center justify-center">
                  <Sparkles className="w-10 h-10 text-primary animate-bounce-gentle" />
                </div>
                <p className="font-display text-xl md:text-2xl font-bold text-foreground">
                  {loadingMessages[messageIndex]}
                </p>
                <p className="text-muted-foreground">Isso leva só alguns segundos.</p>
              </CardContent>
            </Card>
          )}

          {/* Passo 2 — Conheça o personagem */}
          {step === 2 && !isThinking && (
            <Card className="border-2 border-accent/20 shadow-xl rounded-3xl">
              <CardHeader className="text-center">
                <CardTitle className="font-display text-2xl md:text-3xl font-extrabold">
                  Seu desenho ganhou vida!
                </CardTitle>
                <p className="text-muted-foreground">
                  Confira o resultado. Se quiser, você pode criar outra versão.
                </p>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="mx-auto max-w-sm">
                  {generatedCharacters.slice(0, 1).map((image, index) => (
                    <div
                      key={`personagem-${index}`}
                      className="relative rounded-3xl border-2 border-primary bg-primary/5 p-3 shadow-lg"
                    >
                      <img
                        src={image}
                        alt="Personagem criado a partir do desenho"
                        width={512}
                        height={512}
                        loading="lazy"
                        className="w-full aspect-square object-cover rounded-2xl"
                      />
                      <span className="absolute top-5 right-5 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md">
                        <Check size={18} />
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="outline" size="lg" className="gap-2" onClick={generateCharacters}>
                    <RefreshCw size={18} />
                    Criar outra versão
                  </Button>
                  <Button
                    size="lg"
                    className="flex-1"
                    disabled={!selectedCharacter}
                    onClick={() => setStep(3)}
                  >
                    Continuar
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Passo 3 — Conte quem ele é */}
          {step === 3 && (
            <Card className="border-2 border-secondary/30 shadow-xl rounded-3xl">
              <CardHeader className="text-center">
                <CardTitle className="font-display text-2xl md:text-3xl font-extrabold">
                  Conte quem ele é
                </CardTitle>
                <p className="text-muted-foreground">
                  Nome, personalidade, gostos, sonhos e detalhes importantes.
                </p>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-bold">Nome</Label>
                  <Input
                    id="name"
                    placeholder="Ex: Pipoca, Luna, Dragãozinho..."
                    value={characterData.name}
                    onChange={(e) => setCharacterData({ ...characterData, name: e.target.value })}
                    className="h-14 text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="personality" className="font-bold">Personalidade</Label>
                  <Textarea
                    id="personality"
                    placeholder="Ex: corajoso, brincalhão, adora ajudar os amigos"
                    value={characterData.personality}
                    onChange={(e) => setCharacterData({ ...characterData, personality: e.target.value })}
                    className="min-h-20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="likes" className="font-bold">Do que ele mais gosta</Label>
                  <Textarea
                    id="likes"
                    placeholder="Ex: sorvete de morango, correr no parque"
                    value={characterData.likes}
                    onChange={(e) => setCharacterData({ ...characterData, likes: e.target.value })}
                    className="min-h-20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dreams" className="font-bold">Sonhos</Label>
                  <Textarea
                    id="dreams"
                    placeholder="Ex: aprender a voar mais alto que as nuvens"
                    value={characterData.dreams}
                    onChange={(e) => setCharacterData({ ...characterData, dreams: e.target.value })}
                    className="min-h-20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="details" className="font-bold">Detalhes importantes (opcional)</Label>
                  <Textarea
                    id="details"
                    placeholder="Ex: tem uma asa azul e outra verde, nunca sai sem o chapéu"
                    value={characterData.details}
                    onChange={(e) => setCharacterData({ ...characterData, details: e.target.value })}
                    className="min-h-20"
                  />
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" size="lg" className="flex-1" onClick={goBack}>
                    Voltar
                  </Button>
                  <Button
                    size="lg"
                    className="flex-1"
                    disabled={!characterData.name || !characterData.personality}
                    onClick={() => setStep(4)}
                  >
                    Continuar
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Passo 4 — Escolha a aventura */}
          {step === 4 && (
            <Card className="border-2 border-primary/20 shadow-xl rounded-3xl">
              <CardHeader className="text-center">
                <CardTitle className="font-display text-2xl md:text-3xl font-extrabold">
                  Escolha a aventura
                </CardTitle>
                <p className="text-muted-foreground">
                  Espaço, floresta, dinossauros, fundo do mar ou surpresa.
                </p>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {adventures.map((adventure) => (
                    <button
                      key={adventure.value}
                      type="button"
                      onClick={() => setSelectedAdventure(adventure.value)}
                      className={`flex items-center gap-3 rounded-2xl border-2 p-4 text-left transition-all ${
                        selectedAdventure === adventure.value
                          ? "border-primary bg-primary/5 shadow-md"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <span className="text-3xl" aria-hidden="true">{adventure.emoji}</span>
                      <span>
                        <span className="block font-bold text-foreground">{adventure.label}</span>
                        <span className="block text-sm text-muted-foreground">{adventure.description}</span>
                      </span>
                    </button>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" size="lg" className="flex-1" onClick={goBack}>
                    Voltar
                  </Button>
                  <Button
                    size="lg"
                    variant="playful"
                    className="flex-1"
                    disabled={!selectedAdventure || isWritingStory}
                    onClick={createStory}
                  >
                    {isWritingStory ? "Escrevendo a aventura..." : "Criar a história"}
                  </Button>
                </div>
                {storyError && (
                  <p role="alert" className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm font-bold text-destructive">
                    {storyError}
                  </p>
                )}
              </CardContent>
            </Card>
          )}

          {/* Passo 5 — História */}
          {step === 5 && story && (
            <Card className="border-2 border-accent/20 shadow-xl rounded-3xl">
              <CardHeader className="text-center">
                <CardTitle className="font-display text-2xl md:text-3xl font-extrabold">
                  {story.title}
                </CardTitle>
                <p className="text-muted-foreground">
                  {story.summary}
                </p>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="rounded-3xl border-2 border-primary/20 bg-gradient-to-br from-primary/10 to-accent/10 p-6 text-center">
                  {selectedCharacter !== null && generatedCharacters[Number(selectedCharacter)] && (
                    <img
                      src={generatedCharacters[Number(selectedCharacter)]}
                      alt={`Personagem ${characterData.name}`}
                      className="mx-auto mb-4 aspect-square w-44 rounded-2xl object-cover shadow-lg"
                    />
                  )}
                  <p className="text-sm font-bold uppercase tracking-wide text-primary">Mensagem da aventura</p>
                  <p className="mt-2 font-display text-lg font-bold text-foreground">{story.message}</p>
                </div>

                <div className="space-y-4">
                  {story.pages.map((page) => (
                    <article key={page.page} className="rounded-2xl border-2 border-border bg-background p-5 shadow-sm">
                      <p className="mb-2 text-sm font-extrabold text-primary">Página {page.page}</p>
                      <p className="leading-relaxed text-foreground">{page.text}</p>
                    </article>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="outline" size="lg" className="gap-2" onClick={() => setStep(4)}>
                    <RefreshCw size={18} />
                    Criar outra história
                  </Button>
                  <Button size="lg" variant="playful" className="flex-1 gap-2" disabled>
                    <BookOpen size={18} />
                    Ilustrações em breve
                  </Button>
                </div>

                <Button variant="ghost" className="w-full text-destructive gap-2" onClick={() => { removeDrawing(); setStep(1); }}>
                  <Trash2 size={16} />
                  Remover o desenho e começar de novo
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Create;
