import NavbarDemo from "@/components/navbar/index.jsx";
import { Button, Typography } from "@material-tailwind/react";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <NavbarDemo />
      <main>
        <div>
          <div>
            <Typography type="h1">
              A ferramenta definitiva para a organização da sua igreja
            </Typography>
            <Typography type="lead">
              Simplifique a gestão da sua igreja com um sistema intuitivo para
              eventos, escalas e comunicação interna. Organize tudo em só lugar
            </Typography>
          </div>
          <Button size="xl">COMECE GRÁTIS</Button>
        </div>
        <Image alt="" src="/Mockup.jpg" width="1420" height="1032"/>
      </main>
    </>
  );
}
