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
import Seam from "@/components/Seam";

// Финальные «плоские» цвета фонов секций (alpha заранее смешаны с белым)
const BG = {
  white: "#ffffff",
  ice: "#f1f8f2",         // bg-brand-ice
  mint40: "#eff7f1",      // bg-brand-mint/40 на белом
  mint50: "#ebf4ed",      // bg-brand-mint/50 на белом
  yellow: "#fbd068",      // bg-brand-yellow/85 на белом
  green: "#2d5f4b",       // bg-brand-green
  ink: "#1d1d1b",         // bg-brand-ink (footer)
};

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Seam from={BG.white} to={BG.green} />
        <Trust />
        <Seam from={BG.green} to={BG.mint40} />
        <WhyFlowers />
        <Seam from={BG.mint40} to={BG.ice} />
        <WhatsIncluded />
        <Seam from={BG.ice} to={BG.yellow} />
        <Economics />
        <Seam from={BG.yellow} to={BG.mint50} />
        <Audience />
        <Seam from={BG.mint50} to={BG.ice} />
        <Steps />
        <Seam from={BG.ice} to={BG.green} />
        <Founder />
        <Seam from={BG.green} to={BG.ice} />
        <FinalCTA />
        <Seam from={BG.ice} to={BG.ink} />
      </main>
      <Footer />
    </>
  );
}
