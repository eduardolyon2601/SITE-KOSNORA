import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { WhyKosnoraSection } from './components/WhyKosnoraSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { getPricingTiers, PRODUCT_COLORS } from './data/productData';
import { PricingTier } from './types';
import { checkIsFirstPurchase } from './utils/customerEligibility';
import { redirectToShopifyCheckout } from './utils/shopifyCart';

export default function App() {
  const [isFirstPurchase, setIsFirstPurchase] = useState<boolean>(() => checkIsFirstPurchase());
  const initialTiers = getPricingTiers(isFirstPurchase);

  const [selectedTier, setSelectedTier] = useState<PricingTier>(initialTiers[0]); // Option 1 (1 Case - $79.90) default

  // Subscribe to purchase events and storage updates
  useEffect(() => {
    const handleStatusUpdate = () => {
      const stillFirstPurchase = checkIsFirstPurchase();
      setIsFirstPurchase(stillFirstPurchase);

      // Synchronize selected tier pricing if eligibility changed
      const updatedTiers = getPricingTiers(stillFirstPurchase);
      setSelectedTier((prev) => {
        const matched = updatedTiers.find((t) => t.quantity === prev.quantity);
        return matched || updatedTiers[0];
      });
    };

    window.addEventListener('kosnora:purchase-completed', handleStatusUpdate);
    window.addEventListener('storage', handleStatusUpdate);
    return () => {
      window.removeEventListener('kosnora:purchase-completed', handleStatusUpdate);
      window.removeEventListener('storage', handleStatusUpdate);
    };
  }, []);

  const handleDirectBuy = async (tier: PricingTier, colorId?: string) => {
    if (tier) setSelectedTier(tier);

    const color = PRODUCT_COLORS.find((c) => c.id === colorId) || PRODUCT_COLORS[0];

    await redirectToShopifyCheckout({
      quantity: tier.quantity,
      model: 'KOSNORA Smart Case',
      color: color?.name || 'Cinza',
      unitPrice: tier.unitPrice,
      totalPrice: tier.totalPrice,
      isFirstPurchase,
    });
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-['Montserrat',sans-serif] flex flex-col selection:bg-[#F3E8FF] selection:text-[#6B21A8]">
      {/* Header with Official KNR Logo (No KOSNORA text) */}
      <Header
        onShopClick={() => handleDirectBuy(selectedTier)}
        cartCount={selectedTier.quantity}
      />

      <main className="flex-1">
        {/* 1. HERO (Product, Photos, Values & Direct CTA) */}
        <HeroSection
          onCtaClick={(colorId) => handleDirectBuy(selectedTier, colorId)}
          onSelectTierAndBuy={(tier, colorId) => handleDirectBuy(tier, colorId)}
          isFirstPurchase={isFirstPurchase}
        />

        {/* 2. HOW IT WORKS (3 Steps: Choose, Set, Change) */}
        <HowItWorksSection />

        {/* 3. KEY BENEFITS (Your Style, Change Anytime, Battery-Free, Stand Out) */}
        <WhyKosnoraSection />

        {/* 4. FAQ (Max 5 Objection-Busting Questions) */}
        <FaqSection />
      </main>

      {/* Footer is the absolute end of the page */}
      <Footer />
    </div>
  );
}
