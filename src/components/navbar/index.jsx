"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Typography,
  Collapse,
  Navbar,
} from "@material-tailwind/react";
import {
  Menu,
  Xmark,
} from "iconoir-react";

const LINKS = [
  {
    title: "Inicio",
    href: "#",
  },
  {
    title: "Sobre-nós",
    href: "#",
  },
  {
    title: "Planos",
    href: "#",
  },
  {
    title: "Entre em contato",
    href: "#",
  },
];

function NavList({ onLinkClick }) {
  return (
    <ul className="mt-4 flex flex-col gap-x-3 gap-y-1.5 lg:mt-0 lg:flex-row lg:items-center">
      {LINKS.map(({ title, href }) => (
        <li key={title}>
          <Typography
            as="a"
            href={href}
            type="p"
            className="flex items-center gap-x-2 p-1 hover:text-primary"
            onClick={onLinkClick} // Adiciona o manipulador de clique para fechar o menu
          >
            {title}
          </Typography>
        </li>
      ))}
    </ul>
  );
}

export default function NavbarDemo() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null); // Ref para o menu mobile

  // Efeito para fechar o menu mobile ao clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && event.target.closest('button[aria-label="Abrir ou fechar menu móvel"]') === null) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Efeito para fechar o menu mobile ao redimensionar a tela para desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <Navbar className="w-full border-transparent shadow-none px-9 md:px-18 py-4">
      <div className="flex justify-between items-center">
        <Typography
          as="a"
          href="#"
          type="lead"
          className="text-lg ml-2 mr-2 block py-1 font-semibold"
        >
          Churchment
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <div className="space-x-2">
          <Button
            size="sm"
            className="hidden lg:inline-block"
            variant="outline"
          >
            Sign In
          </Button>
          <Button
            size="sm"
            className="hidden lg:inline-block"
            variant="gradient"
          >
            Register
          </Button>
        </div>
        {/* Botão Mobile */}
        <button
          onClick={toggleMobileMenu}
          className="ml-auto grid lg:hidden text-neutral-700"
          aria-label="Abrir ou fechar menu móvel"
        >
          {isMobileMenuOpen ? <Xmark className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>
      {/* Menu Mobile */}
      <Collapse open={isMobileMenuOpen} ref={mobileMenuRef}>
        <NavList onLinkClick={() => setIsMobileMenuOpen(false)} />
        <Button isFullWidth size="sm" className="mt-4">
          Sign In
        </Button>
      </Collapse>
    </Navbar>
  );
}