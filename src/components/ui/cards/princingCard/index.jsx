"use client";

import { Card, Typography, Button } from "@material-tailwind/react";
import { CheckCircleSolid, MinusCircle } from "iconoir-react";

/**
 * PricingCard
 * Props:
 * - title?: string
 * - subtitle?: string
 * - price?: number | string           (ex.: 1056 ou "Grátis")
 * - isFree?: boolean                  (força o modo grátis)
 * - freeLabel?: string                (padrão "Grátis")
 * - currency?: string                 (ex.: "R$")
 * - cycleLabel?: string               (ex.: "/year", "/mês", "/anual")
 * - oldPrice?: number | string        (opcional; ignorado se grátis)
 * - oldCycleLabel?: string            (ex.: "/Anual")
 * - features?: Array<{ text: string, included?: boolean }>
 * - ctaText?: string
 * - onCtaClick?: () => void
 * - href?: string
 * - color?: "white" | "black"         (tema do card; padrão "white")
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
  const normalize = (s) => String(s).toLowerCase();
  const showFree = isFree || normalize(price) === normalize(freeLabel);

  // Classes condicionais para cores
  const cardBgClass = isDark ? "bg-neutral-950" : "bg-neutral-50";
  const cardBorderClass = isDark ? "border-transparent" : "border-neutral-200";
  const titleClass = isDark ? "text-surface-light" : "text-surface-dark";
  const subtitleClass = isDark ? "text-neutral-300" : "text-neutral-700";
  const priceClass = isDark ? "text-primary" : "text-secondary-dark";
  const cycleClass = isDark ? "text-primary-light" : "text-neutral-600";
  const oldText = isDark ? "text-neutral-400 line-through" : "text-neutral-500 line-through";
  const includedIconColor = isDark ? "text-neutral-300" : "text-secondary-dark";
  const excludedIconColor = isDark ? "text-neutral-600" : "text-neutral-500";
  const btnClass = isDark ? "bg-primary-dark text-white border-primary-dark hover:bg-orange-500 hover:border-orange-500" : "bg-secondary-dark border-secondary-dark hover:bg-neutral-700 hover:border-neutral-700";
  const btnPropsColor = isDark ? { color: "white" } : { color: "primary" };

  return (
    <Card
      className={`w-full flex flex-col p-4 md:p-6 gap-6 rounded-lg border shadow-sm ${cardBgClass} ${cardBorderClass}`} // Ajustado padding e gap para responsividade
      data-dark={isDark} // Adicionado para estilização mais flexível com data attributes
    >
      {/* Cabeçalho do Card */}
      <div className="flex flex-col gap-2">
        <Typography type="h5" className={`font-semibold ${titleClass}`}>
          {title}
        </Typography>
        <Typography type="p" className={`text-sm ${subtitleClass}`}>
          {subtitle}
        </Typography>
      </div>

      {/* Preço */}
      <div className="flex items-baseline gap-2">
        <Typography type="h3" className={`font-bold ${priceClass}`}>
          {showFree ? freeLabel : `${currency}${price}`}
        </Typography>
        {!showFree && cycleLabel && (
          <Typography type="p" className={`text-sm ${cycleClass}`}>
            {cycleLabel}
          </Typography>
        )}
      </div>

      {/* Preço Antigo (se houver e não for grátis) */}
      {!showFree && oldPrice && (
        <div className="text-sm">
          <span className={`text-base ${oldText}`}>
            De: {currency}{oldPrice}
            <span className={`ml-1 align-middle text-xs ${oldText}`}>
              {oldCycleLabel}
            </span>
          </span>
        </div>
      )}

      {/* Lista de features */}
      <ul className="mb-4 space-y-3 md:mb-6 md:space-y-4"> {/* Ajustado mb e space-y para responsividade */}
        {features
          .filter((f) => f && f.text)
          .map((item, idx) => {
            const included = item.included !== false;
            return (
              <li key={idx} className="flex items-start gap-3">
                {included ? (
                  <CheckCircleSolid className={`mt-0.5 h-6 w-6 shrink-0 ${includedIconColor}`} />
                ) : (
                  <MinusCircle className={`mt-0.5 h-6 w-6 shrink-0 ${excludedIconColor}`} />
                )}
                <Typography className={included ? (isDark ? "text-white" : "text-[#171717]") : (isDark ? "text-neutral-600" : "text-neutral-500")}>
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
          variant="solid"
          className={btnClass}
          {...btnPropsColor}
        >
          {ctaText}
        </Button>
      ) : (
        <Button
          isFullWidth
          size="lg"
          variant="solid"
          className={btnClass}
          onClick={onCtaClick}
          {...btnPropsColor}
        >
          {ctaText}
        </Button>
      )}
    </Card>
  );
}