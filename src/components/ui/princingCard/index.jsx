"use client";

import { Card, Typography, Button } from "@material-tailwind/react";
import { CheckCircleSolid, MinusCircle } from "iconoir-react";

/**
 * PricingCard
 * Props:
 *  - title?: string
 *  - subtitle?: string
 *  - price?: number | string           (ex.: 1056 ou "Grátis")
 *  - isFree?: boolean                  (força o modo grátis)
 *  - freeLabel?: string                (padrão "Grátis")
 *  - currency?: string                 (ex.: "R$")
 *  - cycleLabel?: string               (ex.: "/year", "/mês", "/anual")
 *  - oldPrice?: number | string        (opcional; ignorado se grátis)
 *  - oldCycleLabel?: string            (ex.: "/Anual")
 *  - features?: Array<{ text: string, included?: boolean }>
 *  - ctaText?: string
 *  - onCtaClick?: () => void
 *  - href?: string
 *  - color?: "white" | "black"         (tema do card; padrão "white")
 */
export default function PricingCard({
  title = "Avançado",
  subtitle = "Gestão completa e profissional",
  price = 1056,
  isFree,
  freeLabel = "Grátis",
  currency = "R$",
  cycleLabel = "/year",
  oldPrice,
  oldCycleLabel = "/Anual",
  features = [
    { text: "Todos os recursos do Plano Essencial", included: true },
    { text: "Integração com o Google Planilhas e Meet", included: true },
    { text: "Relatórios financeiros e do Youtube", included: true },
    { text: "Quadro de tarefas nos ministérios", included: true },
    { text: "Biblioteca de louvores e temas de cultos", included: true },
    { text: "Personalização ilimitada de usuários", included: false },
  ],
  ctaText = "SAIBA MAIS",
  onCtaClick,
  href,
  color = "white",
}) {
  const isDark = color === "black";

  // Detecta "Grátis" automaticamente quando price é string
  const normalize = (s) =>
    String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  const autoGratis = typeof price === "string" && normalize(price) === "gratis";
  const isGratis = Boolean(isFree ?? autoGratis);

  const priceStr = String(price);
  const oldPriceStr = !isGratis && oldPrice !== undefined ? String(oldPrice) : undefined;

  // Paleta condicional (apenas cores; mantém estrutura e espaçamentos)
  const cardBg = isDark ? "bg-primary" : "bg-white";
  const cardBorder = isDark ? "border-primary" : "border-[#E4E4E4]";
  const titleColor = isDark ? "text-white" : "text-[#171717]";
  const subtitleColor = isDark ? "text-neutral-400" : "text-[#525252]";
  const secondaryText = "text-secondary";
  const oldText = isDark ? "text-neutral-400" : "text-primary-light";

  // Ícones condicionais
  const includedIconColor = isDark ? "text-white" : "text-primary";
  const excludedIconColor = isDark ? "text-neutral-500" : "text-neutral-400";

  // Botão condicional (cores apenas)
  const btnClass = isDark
    ? "rounded-xl bg-white text-black hover:bg-white"
    : "rounded-xl";
  const btnPropsColor = isDark ? {} : { color: "primary" }; // no claro usa primary

  return (
    <Card
      className={`
        w-full max-w-sm rounded-xl border ${cardBorder} ${cardBg}
        shadow-md p-6 h-fit
      `}
    >
      {/* Cabeçalho */}
      <div className="mb-4">
        <Typography className={`text-xl font-semibold ${titleColor}`}>
          {title}
        </Typography>
        <Typography className={`mt-1 text-sm ${subtitleColor}`}>
          {subtitle}
        </Typography>
      </div>

      {/* Preço atual / Grátis */}
      <div className="mb-2">
        <span
          className={`text-3xl font-bold leading-none ${
            isGratis ? "text-primary" : secondaryText
          }`}
        >
          {isGratis ? (
            freeLabel
          ) : (
            <>
              {currency}
              {priceStr}
            </>
          )}
        </span>

        {!isGratis && (
          <span className={`ml-1 align-middle text-lg font-semibold ${secondaryText}`}>
            {cycleLabel}
          </span>
        )}
      </div>

      {/* Preço antigo (não mostra quando é grátis) */}
      {oldPriceStr && (
        <div className="mb-4">
          <span className={`text-lg line-through ${oldText}`}>
            {currency}
            {oldPriceStr}
            <span className={`ml-1 align-middle text-xs ${oldText}`}>
              {oldCycleLabel}
            </span>
          </span>
        </div>
      )}

      {/* Lista de features */}
      <ul className="mb-6 space-y-4">
        {features
          .filter((f) => f && f.text)
          .map((item, idx) => {
            const included = item.included !== false;
            return (
              <li key={idx} className="flex items-start gap-3">
                {included ? (
                  <CheckCircleSolid className={`mt-0.5 h-6 w-6 ${includedIconColor}`} />
                ) : (
                  <MinusCircle className={`mt-0.5 h-6 w-6 ${excludedIconColor}`} />
                )}
                <Typography className={included ? (isDark ? "text-white" : "text-[#171717]") : (isDark ? "text-neutral-400" : "text-neutral-600")}>
                  {item.text}
                </Typography>
              </li>
            );
          })}
      </ul>

      {/* CTA */}
      {href ? (
        <Button
          as="a"
          href={href}
          isFullWidth
          size="lg"
          className={btnClass}
          {...btnPropsColor}
        >
          {ctaText}
        </Button>
      ) : (
        <Button
          onClick={onCtaClick}
          isFullWidth
          size="lg"
          className={btnClass}
          {...btnPropsColor}
        >
          {ctaText}
        </Button>
      )}
    </Card>
  );
}
