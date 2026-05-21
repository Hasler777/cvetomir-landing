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

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Trust />
        <WhyFlowers />
        <WhatsIncluded />
        <Economics />
        <Audience />
        <Steps />
        <Founder />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
