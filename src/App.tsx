import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { WhyKosnoraSection } from './components/WhyKosnoraSection';
import { OfferSection } from './components/OfferSection';
import { FaqSection } from './components/FaqSection';
import { FinalCtaSection } from './components/FinalCtaSection';
import { Footer } from './components/Footer';
import { OrderDrawer } from './components/OrderDrawer';
import { PRICING_TIERS } from './data/productData';
import { PricingTier } from './types';

export default function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<PricingTier>(PRICING_TIERS[2]); // 3 units best value default
  const [selectedModelId, setSelectedModelId] = useState<string | undefined>(undefined);
  const [selectedColorId, setSelectedColorId] = useState<string | undefined>(undefined);

  const handleOpenCheckout = (tier?: PricingTier, modelId?: string, colorId?: string) => {
    if (tier) setSelectedTier(tier);
    if (modelId) setSelectedModelId(modelId);
    if (colorId) setSelectedColorId(colorId);
    setIsDrawerOpen(true);
  };

  const handleCloseCheckout = () => {
    setIsDrawerOpen(false);
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-['Montserrat',sans-serif] flex flex-col selection:bg-[#F3E8FF] selection:text-[#6B21A8]">
      {/* Header with Official KNR Logo (No KOSNORA text) */}
      <Header onShopClick={() => handleOpenCheckout(selectedTier)} />

      <main className="flex-1">
        {/* 1. HERO */}
        <HeroSection onCtaClick={() => handleOpenCheckout(selectedTier)} />

        {/* 2. HOW IT WORKS (3 Steps: Choose, Set, Change) */}
        <HowItWorksSection />

        {/* 3. KEY BENEFITS (Your Style, Change Anytime, Battery-Free, Stand Out) */}
        <WhyKosnoraSection />

        {/* 4. PRODUCT + OFFER (1 Unit $79.90, 2 Units $69.90 ea, 3 Units $59.90 ea, Add to Cart & Buy Now) */}
        <OfferSection
          onSelectTier={(tier, mId, cId) => handleOpenCheckout(tier, mId, cId)}
          onBuyNow={(tier, mId, cId) => handleOpenCheckout(tier, mId, cId)}
        />

        {/* 5. FAQ (Max 5 Objection-Busting Questions) */}
        <FaqSection />

        {/* 6. FINAL CTA ("MAKE YOUR PHONE YOURS.") */}
        <FinalCtaSection onCtaClick={() => handleOpenCheckout(selectedTier)} />
      </main>

      {/* Footer is the absolute end of the page */}
      <Footer />

      {/* Order & Checkout Configuration Drawer (Modal overlay) */}
      <OrderDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseCheckout}
        initialTier={selectedTier}
        initialModelId={selectedModelId}
        initialColorId={selectedColorId}
      />
    </div>
  );
}
