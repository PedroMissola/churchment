// components/AccordionList.jsx
"use client";

import { Accordion, Typography } from "@material-tailwind/react";
import { NavArrowDown } from "iconoir-react";
import AnimatedSection from "../../animatedSection";

/**
 * Props novas:
 * - animateItems?: boolean          // ativa animação por item
 * - baseDelay?: number              // atraso inicial
 * - stagger?: number                // incremento por item (ex.: 0.08 = 80ms)
 */
export default function AccordionList({
  items = [],
  defaultValue,
  value,
  onValueChange,
  showChevron = true,
  className = "",
  animateItems = true,
  baseDelay = 0,
  stagger = 0.08,
}) {
  const resolvedDefaultValue = value !== undefined ? undefined : defaultValue;

  return (
    <Accordion
      type="single"
      value={value}
      onValueChange={onValueChange}
      defaultValue={resolvedDefaultValue}
      className={className}
    >
      {items.map(({ value: v, title, content, icon }, idx) => {
        const d = baseDelay + idx * stagger;
        return (
          <Accordion.Item key={v ?? idx} value={v}>
            <Accordion.Trigger className="group flex w-full items-center justify-between gap-3 py-3" as="h3">
              {animateItems ? (
                <AnimatedSection delay={d}>
                  <div className="flex w-full items-center justify-between gap-3">
                    <Typography className="text-base font-bold text-secondary-dark">{title}</Typography>
                    {icon ? (
                      <span className="shrink-0">{icon}</span>
                    ) : showChevron ? (
                      <NavArrowDown className="h-4 w-4 shrink-0 transition-transform group-data-[open=true]:rotate-180" />
                    ) : null}
                  </div>
                </AnimatedSection>
              ) : (
                <>
                  <Typography className="text-base font-bold text-secondary-dark">{title}</Typography>
                  {icon ? (
                    <span className="shrink-0">{icon}</span>
                  ) : showChevron ? (
                    <NavArrowDown className="h-4 w-4 shrink-0 transition-transform group-data-[open=true]:rotate-180" />
                  ) : null}
                </>
              )}
            </Accordion.Trigger>

            <Accordion.Content className="pb-4 text-base text-neutral-700">
              {animateItems ? (
                <AnimatedSection delay={d + 0.05}>
                  {content}
                </AnimatedSection>
              ) : (
                content
              )}
            </Accordion.Content>
          </Accordion.Item>
        );
      })}
    </Accordion>
  );
}
