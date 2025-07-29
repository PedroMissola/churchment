"use client";

import * as React from "react";
import {
  Button,
  IconButton,
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

function NavList() {
  return (
    <ul className="mt-4 flex flex-col gap-x-3 gap-y-1.5 lg:mt-0 lg:flex-row lg:items-center">
      {LINKS.map(({ title, href }) => (
        <li key={title}>
          <Typography
            as="a"
            href={href}
            type="p"
            className="flex items-center gap-x-2 p-1 hover:text-primary"
          >
            {title}
          </Typography>
        </li>
      ))}
    </ul>
  );
}

export default function NavbarDemo() {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

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
        <IconButton
          size="sm"
          variant="ghost"
          color="secondary"
          onClick={() => setOpenNav(!openNav)}
          className="ml-auto grid lg:hidden"
        >
          {openNav ? (
            <Xmark className="h-4 w-4" />
          ) : (
            <Menu className="h-4 w-4" />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
        <Button isFullWidth size="sm" className="mt-4">
          Sign In
        </Button>
      </Collapse>
    </Navbar>
  );
}
