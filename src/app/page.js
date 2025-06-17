import NavbarDemo from "@/components/navbar/index.jsx";
import { Button, Typography } from "@material-tailwind/react";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <NavbarDemo />
      <main className="flex flex-col-reverse md:flex-row px-4 md:px-18 items-center">
        <div className="w-full md:w-2/5 py-8 md:py-0">
          <div className="mb-8">
            <Typography variant="h1" color="primary">
              A ferramenta definitiva para a organização da sua igreja
            </Typography>
            <Typography variant="lead">
              Simplifique a gestão da sua igreja com um sistema intuitivo para
              eventos, escalas e comunicação interna. Organize tudo em só lugar
            </Typography>
          </div>
          <Button size="xl" color="blue">COMECE GRÁTIS</Button>
        </div>

        <div className="w-full md:w-3/5 relative overflow-hidden">
          <div className="w-[160%] md:w-full">
            <Image 
              alt="App mockup" 
              src="/Mockups.png" 
              width="1420" 
              height="1032"
              className="w-full object-contain"
            />
          </div>
        </div>
      </main>
    </>
  );
}