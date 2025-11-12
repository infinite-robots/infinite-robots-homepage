import { FooterSpeechBubble } from "@/components/common/FooterSpeechBubble";
import { FinalCallToAction } from "@/components/homepage/FinalCallToAction";
import { HeroSection } from "@/components/homepage/HeroSection";
import { ProcessOverview } from "@/components/homepage/ProcessOverview";
import { ServicesOverview } from "@/components/homepage/ServicesOverview";
import { ValueStripe } from "@/components/homepage/ValueStripe";
import { WhyChoose } from "@/components/homepage/WhyChoose";

export default function Home() {
  return (
    <main className="flex flex-col gap-0 bg-white text-zinc-900 transition-colors duration-300 dark:bg-zinc-950 dark:text-zinc-100">
      <HeroSection />
      <ValueStripe />
      <ServicesOverview />
      <WhyChoose />
      <ProcessOverview />
      <FinalCallToAction />
      <FooterSpeechBubble message="We help you harness the power of Infinite Robots." />
    </main>
  );
}
