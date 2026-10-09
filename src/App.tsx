import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { WhyKosnoraSection } from './components/WhyKosnoraSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { getPricingTiers, PRODUCT_IMAGES } from './data/productData';
import { PricingTier } from './types';
import { redirectToShopifyCheckout } from './utils/shopifyCart';

export default function App() {
  const initialTiers = getPricingTiers();
  const [selectedTier, setSelectedTier] = useState<PricingTier>(initialTiers[0]); // Option 1 (1 Case - $79.90) default

  const handleDirectBuy = async (tier: PricingTier, imageId?: string) => {
    if (tier) setSelectedTier(tier);

    const selectedImage = PRODUCT_IMAGES.find((img) => img.id === imageId) || PRODUCT_IMAGES[0];

    await redirectToShopifyCheckout({
      quantity: tier.quantity,
      model: 'KOSNORA Case',
      color: selectedImage?.name || 'Cinza',
      unitPrice: tier.unitPrice,
      totalPrice: tier.totalPrice,
    });
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-['Montserrat',sans-serif] flex flex-col selection:bg-[#F3E8FF] selection:text-[#6B21A8]">
      {/* Header with Official KNR Logo */}
      <Header
        onShopClick={() => handleDirectBuy(selectedTier)}
        cartCount={selectedTier.quantity}
      />

      <main className="flex-1">
        {/* 1. HERO (Product, Photos, Values & Direct CTA) */}
        <HeroSection
          onCtaClick={(imageId) => handleDirectBuy(selectedTier, imageId)}
          onSelectTierAndBuy={(tier, imageId) => handleDirectBuy(tier, imageId)}
        />

        {/* 2. KEY BENEFITS (Proteção, Design, Encaixe, Durabilidade) */}
        <WhyKosnoraSection />

        {/* 3. FAQ */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
