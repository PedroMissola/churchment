'use client'

import Link from "next/link"; // se estiver usando Next.js
import { Typography, IconButton } from "@material-tailwind/react";
import { Twitter, Youtube, Instagram, } from "iconoir-react";

// função para manter o ano sempre atualizado
const getYear = () => new Date().getFullYear();

const LINKS = [
  {
    title: "Empresa",
    items: [
      { title: "Sobre nós", href: "#" },
      { title: "Gratuitos", href: "#" },            // Freebies
      { title: "Ferramentas Premium", href: "#" },  // Premium Tools
      { title: "Blog", href: "#" },
    ],
  },
  {
    title: "Jurídico",
    items: [
      { title: "Termos", href: "#" },
      { title: "Sobre nós", href: "#" },
      { title: "Equipe", href: "#" },
      { title: "Privacidade", href: "#" },
    ],
  },
  {
    title: "Recursos",
    items: [
      { title: "Blog", href: "#" },
      { title: "Serviço", href: "#" },
      { title: "Produto", href: "#" },
      { title: "Preços", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="w-full bg-surface-dark text-white" role="contentinfo">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 py-16">
        {/* Topo */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Esquerda: título + descrição */}
          <div>
            {/* heading semântico */}
            <Typography as="h2" type="h6" className="mb-2">
              Churchment
            </Typography>
            <Typography as="p" className="max-w-xs opacity-70">
              A próxima geração de
              <br />
              sistemas de design.
            </Typography>
          </div>

          {/* Direita: 3 colunas de links (2 colunas no mobile) */}
          <nav aria-label="Links do rodapé" className="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3">
            {LINKS.map(({ title, items }) => (
              <ul key={title} aria-labelledby={title.replace(/\s+/g, "-").toLowerCase()}>
                <Typography
                  as="h3"
                  id={title.replace(/\s+/g, "-").toLowerCase()}
                  className="mb-2 font-semibold"
                  color="primary-foreground"
                >
                  {title}
                </Typography>
                {items.map(({ title, href }) => (
                  <li key={title}>
                    {/* Se for link interno de Next.js, troque por <Link> */}
                    {/* <Link href={href} className="py-1 text-sm opacity-80 transition-opacity hover:opacity-100">{title}</Link> */}
                    <Typography
                      as="a"
                      href={href}
                      className="py-1 text-sm transition-opacity hover:opacity-110 text-neutral-400"
                    >
                      {title}
                    </Typography>
                  </li>
                ))}
              </ul>
            ))}
          </nav>
        </div>

        {/* Base */}
        <div className="mt-12 flex w-full flex-col items-center justify-center gap-4 border-t border-white/10 py-4 md:flex-row md:justify-between">
          <Typography as="p" type="small" className="text-center text-neutral-200">
            Todos os direitos reservados. Copyright © {getYear()} Churchment
          </Typography>

          <div className="flex gap-1 sm:justify-center">
            <IconButton
              as="a"
              href="#"
              color="secondary"
              variant="ghost"
              size="md"
              aria-label="Twitter"
              target="_blank"
              rel="noopener noreferrer"
              title="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </IconButton>

            <IconButton
              as="a"
              href="#"
              color="secondary"
              variant="ghost"
              size="md"
              aria-label="YouTube"
              target="_blank"
              rel="noopener noreferrer"
              title="YouTube"
            >
              <Youtube className="h-5 w-5" />
            </IconButton>

            <IconButton
              as="a"
              href="#"
              color="secondary"
              variant="ghost"
              size="md"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
              title="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </IconButton>

          </div>
        </div>
      </div>
    </footer>
  );
}
