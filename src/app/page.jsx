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

export default async function Home() {
	const cookieStore = await cookies();
	const supabase = createClient(cookieStore);

	return (
		<>
			<NavbarDemo />

			<header className="flex flex-col md:flex-row items-center">
				{/* Texto */}
				<div className="w-full md:w-1/2 mb-8 md:mb-0 px-9 md:px-18 py-8 md:py-16">
					<AnimatedSection delay={0.1}>
						<Typography
							type="h1"
							color="primary"
							className="text-3xl md:text-5xl"
						>
							A ferramenta definitiva para a organização da sua igreja
						</Typography>
						<Typography type="lead" className="text-sm md:text-xl mt-6">
							Simplifique a gestão da sua igreja com um sistema intuitivo para
							eventos, escalas e comunicação interna. Organize tudo em só lugar
						</Typography>
						<Button size="xl" className="mt-8">
							COMECE GRÁTIS
						</Button>
					</AnimatedSection>
				</div>

				{/* Imagem */}
				<div className="w-full md:w-1/2 relative">
					<AnimatedSection delay={0.2}>
						<div className="flex justify-center">
							<Image
								alt="App mockup"
								src="/Mockups.png"
								width={600}
								height={436}
								className="w-full h-auto"
							/>
						</div>
					</AnimatedSection>
				</div>
			</header>

			<AnimatedSection delay={0.4}>
				<LogoCarousel />
			</AnimatedSection>

			<main className="w-full px-18">
				<AnimatedSection delay={0.1}>
					<FeatureCard
						direction="left"
						imageUrl="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2832&q=80"
						altText="Gestão de eventos e escalas de igreja"
						title="Gestão de eventos e escalas sem complicação"
						description="Agende cultos, reuniões e eventos facilmente. Crie escalas de voluntários e mantenha tudo organizado em um só lugar."
						buttonText="GERENCIE SEUS EVENTOS"
						feature_one="Notificações automaticas"
						feature_two="Escalas visiveis para todos"
						feature_three="Menos desencontros"
					/>
				</AnimatedSection>

				<AnimatedSection delay={0.2}>
					<FeatureCard
						direction="right"
						imageUrl="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2832&q=80"
						altText="Gestão de eventos e escalas de igreja"
						title="Comunicação interna facilitada para ministérios"
						description="Conecte líderes e equipes com um sistema de mensagens intuitivo. Diga adeus aos grupos desorganizados!"
						buttonText="Fortaleça a comunicação"
						feature_one="Chats por ministério"
						feature_two="Mensagens Rapidas"
						feature_three="Sem distrações"
					/>
				</AnimatedSection>

				<AnimatedSection delay={0.3}>
					<FeatureCard
						direction="left"
						imageUrl="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2832&q=80"
						altText="Gestão de eventos e escalas de igreja"
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
						altText="Gestão de eventos e escalas de igreja"
						title="Integração com Google Calendar, Drive e muito mais"
						description="Sincronize eventos, armazene documentos e compartilhe materiais com sua equipe de forma simples e rápida." Add commentMore actions
						buttonText="Conecte sua igreja"
						feature_one="Sincronização automática"
						feature_two="Tudo na nuvem"
						feature_three="Acesso de qualquer lugar"
					/>
				</AnimatedSection>
			</main>

			<section>
				<Title
					title="O que dizem sobre o Churchment"
					subtitle="Muitas igrejas já estão organizando melhor seus eventos, escalas e a comunicação. Veja o que líderes e membros dizem sobre a plataforma"
				/>
			</section>
		</>
	);
}
