import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Trust from "@/components/Trust";
import WhyFlowers from "@/components/WhyFlowers";
import WhatsIncluded from "@/components/WhatsIncluded";
import Economics from "@/components/Economics";
import Audience from "@/components/Audience";
import Steps from "@/components/Steps";
import Founder from "@/components/Founder";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Reveal><Trust /></Reveal>
        <Reveal><WhyFlowers /></Reveal>
        <Reveal><WhatsIncluded /></Reveal>
        <Reveal><Economics /></Reveal>
        <Reveal><Audience /></Reveal>
        <Reveal><Steps /></Reveal>
        <Reveal><Founder /></Reveal>
        <Reveal><FinalCTA /></Reveal>
      </main>
      <Footer />
    </>
  );
}
