import { ResponsiveHeader } from "@/components/common/ResponsiveHeader";
import { FinalCallToAction } from "@/components/homepage/FinalCallToAction";
import { HeroSection } from "@/components/homepage/HeroSection";
import { ProcessOverview } from "@/components/homepage/ProcessOverview";
import { ServicesOverview } from "@/components/homepage/ServicesOverview";
import { ValueStripe } from "@/components/homepage/ValueStripe";
import { WhyChoose } from "@/components/homepage/WhyChoose";

export default function Home() {
  return (
    <div className="bg-white text-zinc-900">
      <ResponsiveHeader />
      <main className="flex flex-col gap-0">
        <HeroSection />
        <ValueStripe />
        <ServicesOverview />
        <WhyChoose />
        <ProcessOverview />
        <FinalCallToAction />
      </main>
    </div>
  );
}
