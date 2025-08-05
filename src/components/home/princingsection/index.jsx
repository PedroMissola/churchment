// components/PricingSection.jsx
"use client";

import { useState } from "react";
import PricingCard from "@/components/ui/cards/princingCard"; // Caminho ajustado
import { ToggleSwitch } from "@/components/ui/toggleswitch"; // Caminho ajustado
import Title from "@/components/layout/title"; // Importe se o `Title` for um componente separado
import AnimatedSection from "@/components/layout/animatedSection"; // Importe se o `AnimatedSection` for um componente separado

const PLANS = {
  basic: {
    title: "Básico",
    subtitle: "Gratuito para até 15 membros",
    features: [
      { text: "Agendamento e gestão de eventos", included: true },
      { text: "Notificações automáticas", included: true },
      { text: "Dashboard integrado", included: true },
      { text: "Área ministerial básica", included: true },
      { text: "Personalização do perfil da Igreja", included: true },
      { text: "Relatórios e análises detalhadas", included: false },
    ],
    prices: {
      annual: { price: "Grátis", oldPrice: null, cycleLabel: "" },
      monthly: { price: "Grátis", oldPrice: null, cycleLabel: "" },
    },
    href: "/planos/Básico",
  },
  essential: {
    title: "Essencial",
    subtitle: "Mais controle e comunicação",
    color: "black",
    features: [
      { text: "Todos os recursos do Plano Básico", included: true },
      { text: "Relatórios de presença e eventos", included: true },
      { text: "Conexão com o Google Agenda e Drive", included: true },
      { text: "Chat interno para ministérios", included: true },
      { text: "Formulários para visitantes e feedbacks", included: true },
      { text: "Biblioteca de Conteúdos", included: false },
    ],
    prices: {
      annual: { price: 633, oldPrice: 720, cycleLabel: "/year" },
      monthly: { price: 60, oldPrice: null, cycleLabel: "/month" }, // Exemplo de preço mensal (60 * 12 = 720)
    },
    href: "/planos/essencial",
  },
  advanced: {
    title: "Avançado",
    subtitle: "Gestão completa e profissional",
    features: [
      { text: "Todos os recursos do Plano Essencial", included: true },
      { text: "Integração com o Google Planilhas e Meet", included: true },
      { text: "Relatórios financeiros e do Youtube", included: true },
      { text: "Quadro de tarefas nos ministérios", included: true },
      { text: "Biblioteca de louvores e temas de cultos", included: true },
      { text: "Personalização ilimitada de usuários", included: false },
    ],
    prices: {
      annual: { price: 1056, oldPrice: 1200, cycleLabel: "/year" },
      monthly: { price: 100, oldPrice: null, cycleLabel: "/month" }, // Exemplo de preço mensal (100 * 12 = 1200)
    },
    href: "/planos/avancado",
  },
};

export default function PricingSection() {
  const [cycle, setCycle] = useState("annual");

  const isMonthly = cycle === "monthly";

  const getPriceData = (planKey) => {
    const plan = PLANS[planKey];
    return isMonthly ? plan.prices.monthly : plan.prices.annual;
  };

  return (
    <section className="py-16 md:py-24 flex flex-col items-center gap-24">
      <Title
        title="Escolha o plano ideal para sua igreja"
        color="black"
        subtitle="Soluções escaláveis que acompanham o crescimento da sua igreja, com recursos cada vez mais poderosos para uma gestão eficiente e integrada."
      />
      {/* O ToggleSwitch agora é controlado pelo estado `cycle` e a função `setCycle` */}
      <ToggleSwitch value={cycle} onChange={setCycle} />

      <div className="w-full flex flex-col md:flex-row justify-center items-stretch gap-6 mt-8 px-4 md:px-18">
        {/* Renderiza os cartões com base nos dados e no estado atual */}
        {Object.keys(PLANS).map((planKey, index) => {
          const plan = PLANS[planKey];
          const priceData = getPriceData(planKey);

          return (
            <AnimatedSection key={planKey} delay={0.1 * (index + 1)}>
              <PricingCard
                title={plan.title}
                subtitle={plan.subtitle}
                features={plan.features}
                color={plan.color}
                href={plan.href}
                price={priceData.price}
                oldPrice={priceData.oldPrice}
                cycleLabel={priceData.cycleLabel}
              />
            </AnimatedSection>
          );
        })}
      </div>
    </section>
  );
}