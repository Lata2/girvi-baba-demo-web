import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingContact } from '@/components/layout/FloatingContact';
import { Hero } from '@/components/sections/Hero';
import { TrustBar } from '@/components/sections/TrustBar';
import { ItemTicker } from '@/components/sections/ItemTicker';
import { LoanCalculator } from '@/components/sections/LoanCalculator';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { Invest } from '@/components/sections/Invest';
import { LegalAdvice } from '@/components/sections/LegalAdvice';
import { Benefits } from '@/components/sections/Benefits';
import { Documentation } from '@/components/sections/Documentation';
import { Transparency } from '@/components/sections/Transparency';
import { Faq } from '@/components/sections/Faq';
import { ContactCta } from '@/components/sections/ContactCta';
import { Enquiry } from '@/components/sections/Enquiry';

export default function App() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <ItemTicker />
        <TrustBar />
        <LoanCalculator />
        <HowItWorks />
        <Invest />
        <LegalAdvice />
        <Benefits />
        <Documentation />
        <Transparency />
        <Faq />
        <ContactCta />
        <Enquiry />
      </main>
      <Footer />
      <FloatingContact />
    </>
  );
}
