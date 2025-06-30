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
				<AnimatedSection delay={0.2}>
					<div className="h-32 w-full bg-gray-100 rounded-xl flex items-center justify-center text-gray-800 text-xl font-semibold">
						Seção principal de recursos do Churchment
					</div>
				</AnimatedSection>
			</main>

			<section>
				<Title
					title="O que dizem sobre o Churchment"
					description="Muitas igrejas já estão organizando melhor seus eventos, escalas e a comunicação. Veja o que líderes e membros dizem sobre a plataforma"
				/>
			</section>
		</>
	);
}
