import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProcessSection from "@/components/ProcessSection";
import ServiceSection from "@/components/ServiceSection";
import { Roadmap } from "@/components/Roadmap";
import Portfolio from "@/components/Portfolio";
import { WhyRevaya } from "@/components/WhyRevaya";
import ArchitectureLayers from "@/components/ArchitectureLayers";
import TestimonialsSection from "@/components/TestimonialsSection";
import { FaqSection } from "@/components/FaqSection";
import { ContactSection } from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ProcessSection />
      <ServiceSection />
      <Roadmap />
      <Portfolio />
      <WhyRevaya />
      <ArchitectureLayers />
      <TestimonialsSection />
      <FaqSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
