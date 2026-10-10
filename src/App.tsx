import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { WhyKosnoraSection } from './components/WhyKosnoraSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { getPricingTiers, PRODUCT_IMAGES } from './data/productData';
import { PricingTier } from './types';

export default function App() {
  const initialTiers = getPricingTiers();
  const [selectedTier, setSelectedTier] = useState<PricingTier>(initialTiers[0]); // Option 1 (1 Case - $79.90) default
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('Gray');
  const [selectedModel, setSelectedModel] = useState('iPhone 16 Pro Max');

  const handleOpenCart = (tier?: PricingTier, imageId?: string) => {
    if (tier) {
      setSelectedTier(tier);
      setCartQuantity(tier.quantity);
    }
    if (imageId) {
      const match = PRODUCT_IMAGES.find((img) => img.id === imageId);
      if (match) setSelectedColor(match.name);
    }
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-['Montserrat',sans-serif] flex flex-col selection:bg-[#F3E8FF] selection:text-[#6B21A8]">
      {/* Header with Official KNR Logo */}
      <Header
        onShopClick={() => setIsCartOpen(true)}
        cartCount={cartQuantity}
      />

      <main className="flex-1">
        {/* 1. HERO (Product, Photos, Values & Direct CTA) */}
        <HeroSection
          selectedModel={selectedModel}
          onModelChange={setSelectedModel}
          selectedColor={selectedColor}
          onColorChange={setSelectedColor}
          onCtaClick={(imageId) => handleOpenCart(selectedTier, imageId)}
          onSelectTierAndBuy={(tier, imageId) => handleOpenCart(tier, imageId)}
        />

        {/* 2. KEY BENEFITS (Proteção, Design, Encaixe, Durabilidade) */}
        <WhyKosnoraSection />

        {/* 3. FAQ */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Minimalist, Conversion-Optimized Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        quantity={cartQuantity}
        onQuantityChange={setCartQuantity}
        selectedColor={selectedColor}
        selectedModel={selectedModel}
      />
    </div>
  );
}
