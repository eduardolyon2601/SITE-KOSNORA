import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { WhyKosnoraSection } from './components/WhyKosnoraSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { getPricingTiers } from './data/productData';
import { PricingTier, CartItemUnit } from './types';

export default function App() {
  const initialTiers = getPricingTiers();
  const [selectedTier, setSelectedTier] = useState<PricingTier>(initialTiers[0]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Multi-unit state: each unit in the order can have its own distinct phone model and color
  const [cartUnits, setCartUnits] = useState<CartItemUnit[]>([
    { id: 'unit-1', model: 'iPhone 16 Pro Max', color: 'Gray' },
  ]);
  const [activeUnitIndex, setActiveUnitIndex] = useState(0);

  // Synchronize tier and units count
  const handleSelectTier = (tier: PricingTier) => {
    setSelectedTier(tier);
    setCartUnits((prev) => {
      const targetQty = tier.quantity;
      if (prev.length === targetQty) return prev;

      if (prev.length < targetQty) {
        const next = [...prev];
        const defaultModels = ['iPhone 16 Pro Max', 'iPhone 15 Pro Max', 'iPhone 14 Pro', 'iPhone 13 Pro', 'iPhone 16 Pro'];
        const defaultColors = ['Gray', 'Black', 'White', 'Pink', 'Orange'];

        while (next.length < targetQty) {
          const idx = next.length;
          next.push({
            id: `unit-${Date.now()}-${idx + 1}`,
            model: defaultModels[idx % defaultModels.length],
            color: defaultColors[idx % defaultColors.length],
          });
        }
        return next;
      } else {
        return prev.slice(0, targetQty);
      }
    });

    if (activeUnitIndex >= tier.quantity) {
      setActiveUnitIndex(0);
    }
  };

  const handleUpdateUnit = (index: number, partial: Partial<CartItemUnit>) => {
    setCartUnits((prev) => {
      const next = [...prev];
      if (next[index]) {
        next[index] = { ...next[index], ...partial };
      }
      return next;
    });
  };

  const handleAddUnit = () => {
    setCartUnits((prev) => {
      const next = [...prev];
      const idx = next.length;
      const defaultModels = ['iPhone 16 Pro Max', 'iPhone 15 Pro Max', 'iPhone 14 Pro', 'iPhone 13 Pro'];
      const defaultColors = ['Black', 'White', 'Gray', 'Pink'];
      next.push({
        id: `unit-${Date.now()}-${idx + 1}`,
        model: defaultModels[idx % defaultModels.length],
        color: defaultColors[idx % defaultColors.length],
      });

      // Update selected tier based on new count
      const allTiers = getPricingTiers();
      if (next.length === 2) {
        setSelectedTier(allTiers.find((t) => t.quantity === 2) || allTiers[1]);
      } else if (next.length >= 3) {
        setSelectedTier(allTiers.find((t) => t.quantity === 3) || allTiers[2]);
      }

      return next;
    });
  };

  const handleRemoveUnit = (index: number) => {
    setCartUnits((prev) => {
      if (prev.length <= 1) return prev;
      const next = prev.filter((_, i) => i !== index);

      // Update selected tier based on new count
      const allTiers = getPricingTiers();
      if (next.length === 1) {
        setSelectedTier(allTiers[0]);
      } else if (next.length === 2) {
        setSelectedTier(allTiers.find((t) => t.quantity === 2) || allTiers[1]);
      }

      if (activeUnitIndex >= next.length) {
        setActiveUnitIndex(Math.max(0, next.length - 1));
      }

      return next;
    });
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-['Montserrat',sans-serif] flex flex-col selection:bg-[#F3E8FF] selection:text-[#6B21A8]">
      {/* Header with Official KNR Logo */}
      <Header
        onShopClick={() => setIsCartOpen(true)}
        cartCount={cartUnits.length}
      />

      <main className="flex-1">
        {/* 1. HERO (Multi-Unit Phone Case Customization & Bundle Tiers) */}
        <HeroSection
          units={cartUnits}
          activeUnitIndex={activeUnitIndex}
          onActiveUnitIndexChange={setActiveUnitIndex}
          onUpdateUnit={handleUpdateUnit}
          selectedTier={selectedTier}
          onSelectTier={handleSelectTier}
          onCtaClick={() => setIsCartOpen(true)}
        />

        {/* 2. KEY BENEFITS */}
        <WhyKosnoraSection />

        {/* 3. FAQ */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Multi-Unit Customized Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        units={cartUnits}
        onUpdateUnit={handleUpdateUnit}
        onAddUnit={handleAddUnit}
        onRemoveUnit={handleRemoveUnit}
      />
    </div>
  );
}
