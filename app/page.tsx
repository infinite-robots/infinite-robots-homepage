import { FooterSpeechBubble } from "@/components/common/FooterSpeechBubble";
import { FaqSection } from "@/components/homepage/FaqSection";
import { FinalCallToAction } from "@/components/homepage/FinalCallToAction";
import { HarnessSpotlight } from "@/components/homepage/HarnessSpotlight";
import { HeroSection } from "@/components/homepage/HeroSection";
import { IndustriesOverview } from "@/components/homepage/IndustriesOverview";
import { ProcessOverview } from "@/components/homepage/ProcessOverview";
import { ServicesOverview } from "@/components/homepage/ServicesOverview";
import { ValueStripe } from "@/components/homepage/ValueStripe";
import { WhyChoose } from "@/components/homepage/WhyChoose";

export default function Home() {
  return (
    <main className="flex flex-col gap-0 bg-white text-zinc-900 transition-colors duration-300 dark:bg-brand-surface dark:text-zinc-100">
      <HeroSection />
      <ValueStripe />
      <ServicesOverview />
      <HarnessSpotlight />
      <IndustriesOverview />
      <WhyChoose />
      <ProcessOverview />
      <FaqSection />
      <FinalCallToAction />
      <FooterSpeechBubble message="Beep boop. Your agents are ready when you are." />
    </main>
  );
}
