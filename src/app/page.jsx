// app/page.jsx — SERVER COMPONENT (sem 'use client')
import LogoCarousel from "@/components/home/carousel";
import FeatureCard from "@/components/home/featureContent";
import NavbarDemo from "@/components/navbar";
import { Button, Typography } from "@material-tailwind/react";
import Image from "next/image";
import Title from "@/components/title";
import AnimatedSection from "@/components/animatedSection";
import TestimonialCard from "@/components/ui/cards/card";
import AccordionList from "@/components/home/AccordionList";
import Cta from "@/components/cta";
import Footer from "@/components/footer";
import PricingSection from "@/components/home/princingsection";

export const metadata = {
    title: 'Churchment - A ferramenta definitiva para a organização da sua igreja',
    description: 'Simplifique a gestão da sua igreja com um sistema intuitivo para eventos, escalas e comunicação interna. Organize tudo em um só lugar.',
    keywords: ['igreja', 'organização', 'gestão', 'eventos', 'escalas', 'comunicação', 'membros', 'finanças', 'software para igreja', 'plataforma para igreja'],
    openGraph: {
        title: 'Churchment - Organize sua Igreja com Facilidade',
        description: 'A plataforma completa para gerenciar eventos, escalas, comunicação e muito mais na sua igreja.',
        url: 'https://www.churchment.com.br/',
        siteName: 'Churchment',
        images: [
            {
                url: 'opengraph-image.jpg', // Next.js handles relative paths from public dir
                width: 1200,
                height: 630,
                alt: 'Churchment - Organização de Igrejas',
            },
        ],
        locale: 'pt_BR',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Churchment - A ferramenta definitiva para a organização da sua igreja',
        description: 'Simplifique a gestão da sua igreja com um sistema intuitivo para eventos, escalas e comunicação interna.',
        creator: '@churchment',
        images: ['https://www.churchment.com.br/twitter-image.jpg'],
    },
};

export default async function Home() {

    return (
        <>
            <NavbarDemo />
            <header className="flex flex-col md:flex-row items-center py-12 md:py-24">
                {/* Texto */}
                <div className="w-full md:w-1/2 mb-8 md:mb-0 gap-8 flex flex-col justify-center px-4 md:px-18"> {/* Changed md:pl-18 to md:px-18 for consistency */}
                    <AnimatedSection delay={0.1}>
                        <Typography
                            type="h1"
                            color="primary"
                            className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight"
                        >
                            A ferramenta definitiva para a organização da sua igreja
                        </Typography>
                        <Typography type="lead" className="text-base md:text-xl my-6 text-gray-700">
                            Simplifique a gestão da sua igreja com um sistema intuitivo para
                            eventos, escalas e comunicação interna. Organize tudo em um só lugar.
                        </Typography>
                        <Button size="lg">
                            COMECE GRÁTIS
                        </Button>
                    </AnimatedSection>
                </div>

                <div className="w-full md:w-1/2 relative">
                    <AnimatedSection delay={0.2}>
                        <div className="flex justify-center">
                            <Image
                                alt="App mockup"
                                src="/Mockups.png"
                                width={700}
                                height={500}
                                className="w-full h-auto"
                                priority
                                loading="eager" // Adicionado para priorizar o carregamento da imagem
                            />
                        </div>
                    </AnimatedSection>
                </div>
            </header>

            <AnimatedSection delay={0.3}>
                <LogoCarousel />
            </AnimatedSection>

            <main className="w-full px-4 md:px-18" role="main" aria-label="Conteúdo Principal">
                <AnimatedSection delay={0.1}>
                    <FeatureCard
                        direction="left"
                        imageUrl="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2832&q=80"
                        altText="Gestão de eventos e escalas de igreja"
                        title="Gestão de eventos e escalas sem complicação"
                        description="Agende cultos, reuniões e eventos facilmente. Crie escalas de voluntários e mantenha tudo organizado em um só lugar."
                        buttonText="GERENCIE SEUS EVENTOS"
                        feature_one="Notificações automáticas"
                        feature_two="Escalas visíveis para todos"
                        feature_three="Menos desencontros"
                    />
                </AnimatedSection>

                <AnimatedSection delay={0.2}>
                    <FeatureCard
                        direction="right"
                        imageUrl="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2832&q=80"
                        altText="Comunicação interna para ministérios"
                        title="Comunicação interna facilitada para ministérios"
                        description="Conecte líderes e equipes com um sistema de mensagens intuitivo. Diga adeus aos grupos desorganizados!"
                        buttonText="Fortaleça a comunicação"
                        feature_one="Chats por ministério"
                        feature_two="Mensagens rápidas"
                        feature_three="Sem distrações"
                    />
                </AnimatedSection>

                <AnimatedSection delay={0.3}>
                    <FeatureCard
                        direction="left"
                        imageUrl="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2832&q=80"
                        altText="Relatórios de presença, visitantes e finanças da igreja"
                        title="Relatórios de presença, visitantes e finanças"
                        description="Acompanhe o crescimento da igreja com relatórios detalhados. Monitore visitantes, membros e doações em tempo real."
                        buttonText="Veja os relatórios"
                        feature_one="Dados em tempo real"
                        feature_two="Exportação fácil"
                        feature_three="Insights para decisões"
                    />
                </AnimatedSection>

                <AnimatedSection delay={0.4}>
                    <FeatureCard
                        direction="right"
                        imageUrl="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2832&q=80"
                        altText="Integração com Google Calendar e Drive para igrejas"
                        title="Integração com Google Calendar, Drive e muito mais"
                        description="Sincronize eventos, armazene documentos e compartilhe materiais com sua equipe de forma simples e rápida."
                        buttonText="Conecte sua igreja"
                        feature_one="Sincronização automática"
                        feature_two="Tudo na nuvem"
                        feature_three="Acesso de qualquer lugar"
                    />
                </AnimatedSection>
            </main>

            <section className="bg-gradient-to-b from-[#F4511E] to-[#FF7043] py-16 md:py-24 flex flex-col gap-24"> {/* Changed gap-18 to gap-24 */}
                <Title
                    title="O que dizem sobre o Churchment"
                    color="white"
                    subtitle="Muitas igrejas já estão organizando melhor seus eventos, escalas e a comunicação. Veja o que líderes e membros dizem sobre a plataforma."
                />
                <div className="px-4 md:px-18 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <AnimatedSection delay={0.1}>
                        <TestimonialCard
                            title="Facilitou a nossa gestão de eventos!"
                            description="O Churchment transformou a forma como gerenciamos nossos eventos. Simples e eficiente!"
                            avatarSrc="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                            authorName="Pr. Marcos Silva"
                            authorRole="Igreja Vida Nova"
                            rating={5}
                        />
                    </AnimatedSection>

                    <AnimatedSection delay={0.2}>
                        <TestimonialCard
                            title="Comunicação mais clara e rápida!"
                            description="Finalmente um sistema que nos ajuda a manter todos na mesma página, sem bagunça de grupos. Essencial!"
                            avatarSrc="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                            authorName="Ana Paula Mendes"
                            authorRole="Líder de Ministério"
                            rating={5}
                        />
                    </AnimatedSection>

                    <AnimatedSection delay={0.3}>
                        <TestimonialCard
                            title="Relatórios que realmente ajudam!"
                            description="Os relatórios de presença e finanças nos dão uma visão clara do crescimento e das necessidades. Muito prático!"
                            avatarSrc="https://images.unsplash.com/photo-1535713875002-d1d0cfd72fee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                            authorName="Pastor João Batista"
                            authorRole="Igreja da Graça"
                            rating={4}
                        />
                    </AnimatedSection>

                    <AnimatedSection delay={0.4}>
                        <TestimonialCard
                            title="Integração perfeita com nossas ferramentas!"
                            description="Poder sincronizar com Google Calendar e Drive é um divisor de águas. Tudo em um só lugar, sem estresse!"
                            avatarSrc="https://images.unsplash.com/photo-1494790108377-be9c29b29329?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                            authorName="Fernanda Costa"
                            authorRole="Secretária da Igreja"
                            rating={5}
                        />
                    </AnimatedSection>
                </div>
            </section>

            <PricingSection />

            <section className="py-16 md:py-24 flex flex-col items-center gap-24"> {/* Changed gap-18 to gap-24 */}
                <Title
                    title="Perguntas Frequentes"
                    color="black"
                    subtitle="Tire suas dúvidas e saiba mais sobre como a plataforma pode transformar a gestão da sua igreja."
                />
                <div className="w-full flex flex-col md:flex-row justify-center items-start gap-24 mt-8 px-4 md:px-18">
                    <div className="w-full flex flex-col justify-center items-center gap-6">
                        <AccordionList
                            defaultValue="plano gratuito" // Changed default value to match an existing item
                            baseDelay={0.1}  // primeiro item entra após 200ms
                            stagger={0.05}    // cada próximo item atrasa +100ms
                            items={[
                                { value: "plano gratuito", title: "O que está incluído no plano gratuito?", content: "O plano gratuito oferece funcionalidades essenciais para até 60 membros, incluindo agendamento de eventos, notificações automáticas e uma visão geral dos ministérios e escalas." },
                                { value: "alterar plano", title: "Posso alterar meu plano depois de assinar?", content: "Sim, você pode mudar de plano a qualquer momento. Basta acessar sua área de configurações e escolher o plano que melhor atende às necessidades da sua igreja." },
                                { value: "membros por plano", title: "Quantos membros posso ter em cada plano?", content: "No Plano Básico, você pode adicionar até 60 membros. O Plano Essencial permite até 200 membros, e o Plano Avançado suporta até 600 membros, com possibilidade de expansão personalizada." },
                                { value: "suporte tecnico", title: "Sim, todos os planos têm suporte técnico. O suporte prioritário é exclusivo para os planos Essencial e Avançado.", content: "Sim, todos os planos têm suporte técnico. O suporte prioritário é exclusivo para os planos Essencial e Avançado." },
                            ]}
                        />
                    </div>

                    <div className="w-full flex flex-col justify-center items-center gap-6">
                        <AccordionList
                            defaultValue="integracoes" // Changed default value to match an existing item
                            baseDelay={0.2}  // primeiro item entra após 200ms
                            stagger={0.1}    // cada próximo item atrasa +100ms
                            items={[
                                { value: "integracoes", title: "Posso integrar a plataforma com outras ferramentas?", content: "Sim, a plataforma oferece integrações com Google Calendar, Google Drive, Google Sheets, Google Forms, Google Meet e muito mais nos planos Essencial e Avançado." },
                                { value: "mobile", title: "A plataforma tem uma versão móvel?", content: "Sim, a plataforma está disponível em versão mobile, garantindo acesso fácil e rápido de qualquer lugar." },
                                { value: "limite de eventos", title: "Há um limite de eventos que posso criar por mês?", content: "Sim. No Plano Básico, o limite é de 24 eventos mensais. No Plano Essencial, você pode criar até 64 eventos, e no Plano Avançado, até 128 eventos mensais." },
                                { value: "plano vitalicio", title: "O que é o Plano Vitalício?", content: "O Plano Vitalício oferece acesso completo à plataforma com pagamento único e sem mensalidades. Ele inclui todos os recursos dos planos pagos, além de suporte exclusivo e personalização da plataforma." },
                            ]}
                        />
                    </div>
                </div>
            </section>
            <Cta
                title="Pronto para organizar sua igreja de forma simples e eficiente?"
                subtitle="Experimente o Churchment gratuitamente e descubra como podemos ajudar sua igreja a crescer com organização e comunicação eficaz."
                cta="Criar Conta grátis"
            />
            <Footer />
        </>
    );
}