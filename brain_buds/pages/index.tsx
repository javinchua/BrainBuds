import Image from "next/image";
import { Inter } from "next/font/google";
import Hero from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import Head
 from "next/head";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
    <main>
     <Hero heading="Brainbuds" message="Your personal instagram assistant"></Hero>
    </main>
    </>
  );
}
