// app/page.jsx — SERVER COMPONENT (sem 'use client')
import LogoCarousel from "@/components/carousel";
import FeatureCard from "@/components/featureContent";
import NavbarDemo from "@/components/navbar";
import { Button, Typography } from "@material-tailwind/react";
import Image from "next/image";
import { cookies } from "next/headers";
import Title from "@/components/title";
import { createClient } from "@/utils/supabase/server";
import AnimatedSection from "@/components/animatedSection";
import TestimonialCard from "@/components/ui/card";
import { ToggleSwitch } from "@/components/ui/toggleswitch";
import PricingCard from "@/components/ui/princingCard";

// Você pode adicionar uma função para gerar metadados dinamicamente ou estaticamente
// dependendo do que for mais adequado para a sua aplicação.
// Este é um exemplo de como seria, se você quiser centralizar as metatags aqui.

export const metadata = {
    title: 'Churchment - A ferramenta definitiva para a organização da sua igreja',
    description: 'Simplifique a gestão da sua igreja com um sistema intuitivo para eventos, escalas e comunicação interna. Organize tudo em um só lugar.',
    keywords: ['igreja', 'organização', 'gestão', 'eventos', 'escalas', 'comunicação', 'membros', 'finanças', 'software para igreja', 'plataforma para igreja'],
    openGraph: {
        title: 'Churchment - Organize sua Igreja com Facilidade',
        description: 'A plataforma completa para gerenciar eventos, escalas, comunicação e muito mais na sua igreja.',
        url: 'https://www.churchment.com.br/', // Substitua pela URL real do seu site
        siteName: 'Churchment',
        images: [
            {
                url: 'opengraph-image.jpg', // Substitua pela URL da sua imagem OG
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
        creator: '@churchment', // Substitua pelo seu handle do Twitter
        images: ['https://www.churchment.com.br/twitter-image.jpg'], // Substitua pela URL da sua imagem do Twitter
    },
};

export default async function Home() {
    // CORREÇÃO AQUI: Awaite a chamada de cookies()
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    // Exemplo de como você poderia usar o supabase para buscar dados,
    // embora não seja estritamente necessário para este exemplo de página inicial
    // const { data: someData, error } = await supabase.from('your_table').select('*');

    return (
        <>
            <NavbarDemo />
            <header className="flex flex-col md:flex-row items-center py-12 md:py-24">
                {/* Texto */}
                <div className="w-full md:w-1/2 mb-8 md:mb-0 gap-8 flex flex-col justify-center pl-18">
                    <AnimatedSection delay={0.1}>
                        <Typography
                            type="h1"
                            color="primary"
                            className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight"
                        >
                            A ferramenta definitiva para a organização da sua igreja
                        </Typography>
                        <Typography type="lead" className="text-base md:text-xl mt-6 text-gray-700">
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
                            />
                        </div>
                    </AnimatedSection>
                </div>
            </header>

            <AnimatedSection delay={0.3}>
                <LogoCarousel />
            </AnimatedSection>

            <main className="w-full px-18"> {/* Adjusted padding here */}
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

            <section className="bg-gradient-to-b from-[#F4511E] to-[#FF7043] py-16 md:py-24 flex flex-col gap-18">
                <Title
                    title="O que dizem sobre o Churchment"
                    color="white"
                    subtitle="Muitas igrejas já estão organizando melhor seus eventos, escalas e a comunicação. Veja o que líderes e membros dizem sobre a plataforma."
                />
                <div className="px-18 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"> {/* Adjusted padding here */}
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

            <section className="px-18 py-16 md:py-24 flex flex-col gap-18">
                <Title
                    title="Escolha o plano ideal para sua igreja"
                    color="black"
                    subtitle="Soluções escaláveis que acompanham o crescimento da sua igreja, com recursos cada vez mais poderosos para uma gestão eficiente e integrada."
                />
                <ToggleSwitch />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <PricingCard
                        title="Basico"
                        subtitle="Gratuito para até 15 membros"
                        price="Gratis"
                        currency=""
                        cycleLabel=""
                        oldPrice=""
                        oldCycleLabel=""
                        features={[
                            { text: "Agendamento e gestão de eventos", included: true },
                            { text: "Notificações automáticas", included: true },
                            { text: "Dashboard integrado", included: true },
                            { text: "Área ministerial básica", included: true },
                            { text: "Personalização do perfil da Igreja", included: true },
                            { text: "Relatórios e análises detalhadas", included: false },
                        ]}
                        ctaText="SAIBA MAIS"
                        href="/planos/Básico"
                    />
                    <PricingCard
                        title="Essencial"
                        subtitle="Mais controle e comunicação"
                        price={633}
                        currency="R$"
                        cycleLabel="/year"
                        oldPrice={720}
                        oldCycleLabel="/Anual"
                        color="black"
                        features={[
                            { text: "Todos os recursos do Plano Básico", included: true },
                            { text: "Relatórios de presença e eventos", included: true },
                            { text: "Conexão com o Google Agenda e Drive", included: true },
                            { text: "Chat interno para ministérios", included: true },
                            { text: "Formulários para visitantes e feedbacks", included: true },
                            { text: "Biblioteca de Conteúdos", included: false },
                        ]}
                        ctaText="SAIBA MAIS"
                        href="/planos/essencial"
                    />
                    <PricingCard
                        title="Avançado"
                        subtitle="Gestão completa e profissional"
                        price={1056}
                        currency="R$"
                        cycleLabel="/year"
                        oldPrice={1056}
                        oldCycleLabel="/Anual"
                        features={[
                            { text: "Todos os recursos do Plano Essencial", included: true },
                            { text: "Integração com o Google Planilhas e Meet", included: true },
                            { text: "Relatórios financeiros e do Youtube", included: true },
                            { text: "Quadro de tarefas nos ministérios", included: true },
                            { text: "Biblioteca de louvores e temas de cultos", included: true },
                            { text: "Personalização ilimitada de usuários", included: false },
                        ]}
                        ctaText="SAIBA MAIS"
                        href="/planos/avancado"
                    />
                </div>
            </section>
        </>
    );
}