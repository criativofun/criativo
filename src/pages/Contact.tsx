import { useState } from "react";
import { Mail, MessageSquare, Phone, MapPin, Send, Heart } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você implementaria o envio do formulário
    toast.success("Mensagem enviada com sucesso! Responderemos em breve.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "contato@criativo.com.br",
      description: "Respondemos em até 24 horas"
    },
    {
      icon: MessageSquare,
      title: "WhatsApp",
      content: "+55 (11) 99999-9999",
      description: "Atendimento de segunda a sexta"
    },
    {
      icon: Phone,
      title: "Telefone",
      content: "+55 (11) 3333-4444",
      description: "Das 9h às 18h"
    },
    {
      icon: MapPin,
      title: "Localização",
      content: "São Paulo, Brasil",
      description: "Atendimento online"
    }
  ];

  const faqs = [
    {
      question: "O crIAtivo é seguro para crianças?",
      answer: "Sim! Levamos a segurança infantil muito a sério. Não armazenamos dados pessoais das crianças e nossa IA é treinada para criar conteúdo 100% apropriado para a idade."
    },
    {
      question: "Posso usar desenhos feitos no tablet?",
      answer: "Claro! Aceitamos desenhos de qualquer origem: papel escaneado, fotos de desenhos ou criações digitais."
    },
    {
      question: "As histórias criadas ficam salvas?",
      answer: "Sim, você pode salvar suas histórias no formato PDF e compartilhar com família e amigos quando quiser."
    },
    {
      question: "Existe limite de histórias por mês?",
      answer: "Temos diferentes planos para atender todas as famílias. Entre em contato para conhecer as opções disponíveis."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Vamos Conversar!
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Tem dúvidas, sugestões ou quer saber mais sobre o crIAtivo? 
            Estamos aqui para ajudar você e sua família!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Contact Form */}
          <Card className="shadow-xl border-2 border-primary/10">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-2">
                <MessageSquare className="text-primary" />
                Envie sua Mensagem
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Seu nome"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Assunto</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Como podemos ajudar?"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Mensagem</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Conte-nos mais detalhes..."
                    className="min-h-32"
                    required
                  />
                </div>
                
                <Button type="submit" size="lg" className="w-full">
                  <Send className="mr-2" size={20} />
                  Enviar Mensagem
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Outras Formas de Contato
              </h2>
              <div className="grid gap-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <CardContent className="p-6 flex items-center space-x-4">
                        <div className="p-3 bg-primary/20 rounded-full">
                          <Icon size={24} className="text-primary" />
                        </div>
                        <div>
                          <h3 className="font-bold text-foreground">{info.title}</h3>
                          <p className="text-lg text-primary font-semibold">{info.content}</p>
                          <p className="text-sm text-muted-foreground">{info.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Support Hours */}
            <Card className="bg-gradient-to-r from-primary/10 to-accent/10">
              <CardContent className="p-6 text-center">
                <Heart className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Horários de Atendimento
                </h3>
                <div className="space-y-1 text-muted-foreground">
                  <p><strong>Segunda a Sexta:</strong> 9h às 18h</p>
                  <p><strong>Sábados:</strong> 9h às 14h</p>
                  <p><strong>Domingos:</strong> Apenas emergências</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Perguntas Frequentes
          </h2>
          <div className="grid gap-6 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-primary via-secondary to-accent rounded-3xl p-8 md:p-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ainda tem dúvidas?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Nossa equipe está sempre pronta para ajudar você e sua família a criar histórias incríveis!
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            className="bg-white text-primary hover:bg-white/90"
          >
            <MessageSquare className="mr-2" />
            Falar no WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Contact;