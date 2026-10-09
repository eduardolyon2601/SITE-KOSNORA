import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { WhyKosnoraSection } from './components/WhyKosnoraSection';
import { OfferSection } from './components/OfferSection';
import { FaqSection } from './components/FaqSection';
import { FinalCtaSection } from './components/FinalCtaSection';
import { Footer } from './components/Footer';
import { OrderDrawer } from './components/OrderDrawer';
import { getPricingTiers, COMPATIBLE_IPHONE_MODELS, PRODUCT_COLORS } from './data/productData';
import { PricingTier } from './types';
import { checkIsFirstPurchase } from './utils/customerEligibility';
import { redirectToShopifyCheckout } from './utils/shopifyCart';

export default function App() {
  const [isFirstPurchase, setIsFirstPurchase] = useState<boolean>(() => checkIsFirstPurchase());
  const initialTiers = getPricingTiers(isFirstPurchase);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<PricingTier>(initialTiers[0]); // Option 1 (1 Case - $79.90) default
  const [selectedModelId, setSelectedModelId] = useState<string | undefined>(undefined);
  const [selectedColorId, setSelectedColorId] = useState<string | undefined>(undefined);

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

  const handleOpenCheckout = (tier?: PricingTier, modelId?: string, colorId?: string) => {
    if (tier) setSelectedTier(tier);
    if (modelId) setSelectedModelId(modelId);
    if (colorId) setSelectedColorId(colorId);
    setIsDrawerOpen(true);
  };

  const handleDirectBuy = async (tier: PricingTier, modelId?: string, colorId?: string) => {
    if (tier) setSelectedTier(tier);
    if (modelId) setSelectedModelId(modelId);
    if (colorId) setSelectedColorId(colorId);

    const model = COMPATIBLE_IPHONE_MODELS.find((m) => m.id === modelId) || COMPATIBLE_IPHONE_MODELS[0];
    const color = PRODUCT_COLORS.find((c) => c.id === colorId) || PRODUCT_COLORS[0];

    await redirectToShopifyCheckout({
      quantity: tier.quantity,
      model: model.name,
      color: color.name,
      unitPrice: tier.unitPrice,
      totalPrice: tier.totalPrice,
      isFirstPurchase,
    });
  };

  const handleCloseCheckout = () => {
    setIsDrawerOpen(false);
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-['Montserrat',sans-serif] flex flex-col selection:bg-[#F3E8FF] selection:text-[#6B21A8]">
      {/* Header with Official KNR Logo (No KOSNORA text) */}
      <Header
        onShopClick={() => handleOpenCheckout(selectedTier)}
        cartCount={selectedTier.quantity}
      />

      <main className="flex-1">
        {/* 1. HERO */}
        <HeroSection
          onCtaClick={() => handleOpenCheckout(selectedTier)}
          onSelectTierAndBuy={(tier, colorId) => handleOpenCheckout(tier, undefined, colorId)}
          isFirstPurchase={isFirstPurchase}
        />

        {/* 2. HOW IT WORKS (3 Steps: Choose, Set, Change) */}
        <HowItWorksSection />

        {/* 3. KEY BENEFITS (Your Style, Change Anytime, Battery-Free, Stand Out) */}
        <WhyKosnoraSection />

        {/* 4. PRODUCT + OFFER (1 Unit $79.90, 2 Units $69.90 ea, 3 Units $59.90 ea, Add to Cart & Buy Now) */}
        <OfferSection
          selectedTier={selectedTier}
          isFirstPurchase={isFirstPurchase}
          onSelectTier={(tier, mId, cId) => handleOpenCheckout(tier, mId, cId)}
          onBuyNow={(tier, mId, cId) => handleDirectBuy(tier, mId, cId)}
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
        isFirstPurchase={isFirstPurchase}
        onTierChange={(tier) => setSelectedTier(tier)}
      />
    </div>
  );
}
