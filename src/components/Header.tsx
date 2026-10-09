import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { KosnoraLogo } from './KosnoraLogo';

interface HeaderProps {
  onShopClick: () => void;
  cartCount?: number;
}

export const Header: React.FC<HeaderProps> = ({ onShopClick, cartCount = 1 }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { label: 'SHOP', href: '#pricing' },
    { label: 'WHY KOSNORA', href: '#benefits' },
    { label: 'FAQ', href: '#faq' },
  ];

  const ctaPhrases = [
    { text: 'GET YOUR KOSNORA', icon: '🔥' },
    { text: 'FREE SHIPPING', icon: '🚚' },
    { text: '1 FOR $79.90 · 2 FOR 139.90 · 3 FOR 194.90', icon: '⚡' },
    { text: 'BUY 2 OR MORE & SAVE', icon: '✨' },
    { text: '30-DAY MONEY-BACK GUARANTEE', icon: '🛡️' },
    { text: '100% SECURE CHECKOUT', icon: '🔒' },
  ];

  // Close dropdown menu if user clicks outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md shadow-xs transition-colors">
      {/* 1. Infinite CTA Carousel ON TOP OF THE HEADER (linha pequena em tom roxo, sempre em movimento) */}
      <div
        onClick={onShopClick}
        className="w-full bg-gradient-to-r from-[#7E22CE] via-[#9333EA] to-[#6B21A8] text-white overflow-hidden py-1.5 sm:py-2 text-[10px] sm:text-[11px] font-black tracking-widest uppercase border-b border-purple-900/40 select-none cursor-pointer hover:brightness-105 transition-all shadow-xs"
        title="Click to view offers"
      >
        <div className="flex w-max animate-marquee">
          {/* Loop 1 */}
          <div className="flex items-center shrink-0">
            {ctaPhrases.map((item, idx) => (
              <span key={`loop1-${idx}`} className="inline-flex items-center gap-1.5 mx-4 sm:mx-6">
                <span>{item.icon}</span>
                <span>{item.text}</span>
                <span className="text-purple-300 ml-3 sm:ml-4">•</span>
              </span>
            ))}
          </div>

          {/* Loop 2 (duplication for seamless continuous infinite marquee) */}
          <div className="flex items-center shrink-0" aria-hidden="true">
            {ctaPhrases.map((item, idx) => (
              <span key={`loop2-${idx}`} className="inline-flex items-center gap-1.5 mx-4 sm:mx-6">
                <span>{item.icon}</span>
                <span>{item.text}</span>
                <span className="text-purple-300 ml-3 sm:ml-4">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 grid grid-cols-3 items-center">
        {/* LEFT COLUMN: Three Horizontal Lines (Pure Underlines, No Border/Box) */}
        <div className="flex items-center justify-start relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 -ml-2 flex flex-col items-start justify-center gap-1.25 transition-opacity hover:opacity-70 cursor-pointer bg-transparent border-0 outline-none"
            aria-label="Menu"
            title="Menu"
          >
            {/* 3 underlines / horizontal lines one above the other */}
            <span
              className={`w-5 h-0.5 rounded-full transition-transform duration-200 bg-neutral-950 ${
                menuOpen ? 'rotate-45 translate-y-1.75' : ''
              }`}
            />
            <span
              className={`w-5 h-0.5 rounded-full transition-opacity duration-200 bg-neutral-950 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`w-5 h-0.5 rounded-full transition-transform duration-200 bg-neutral-950 ${
                menuOpen ? '-rotate-45 -translate-y-1.75' : ''
              }`}
            />
          </button>

          {/* DROPDOWN MENU BOX */}
          {menuOpen && (
            <div className="absolute top-full left-0 mt-2.5 w-64 bg-white border border-neutral-200 rounded-2xl shadow-xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-2 border-b border-neutral-100 mb-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#9333EA]">
                  NAVIGATION
                </span>
              </div>

              <nav className="flex flex-col space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-black tracking-wider text-neutral-800 hover:bg-neutral-50 hover:text-[#9333EA] transition-colors uppercase group"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-[#9333EA] transition-colors" />
                  </a>
                ))}
              </nav>

              <div className="pt-2 mt-1 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    onShopClick();
                  }}
                  className="w-full py-2.5 bg-gradient-to-r from-[#9333EA] via-[#8015F5] to-[#6B21A8] text-white font-black text-xs tracking-wider uppercase rounded-xl text-center cursor-pointer shadow-xs hover:brightness-110 active:scale-95 transition-all"
                >
                  GET YOUR KOSNORA
                </button>
              </div>
            </div>
          )}
        </div>

        {/* CENTER COLUMN: Official Brand Logo perfectly centered */}
        <div className="flex items-center justify-center">
          <a href="#" className="flex items-center justify-center cursor-pointer" aria-label="KOSNORA">
            <KosnoraLogo size="sm" />
          </a>
        </div>

        {/* RIGHT COLUMN: Only the Cart Bag ("sacolinha"), NO "BUY NOW" */}
        <div className="flex items-center justify-end">
          <button
            onClick={onShopClick}
            className="relative p-2.5 rounded-xl bg-white border border-neutral-200 text-neutral-800 hover:text-[#9333EA] hover:border-[#9333EA]/40 hover:bg-neutral-50 transition-all active:scale-95 flex items-center justify-center cursor-pointer shadow-2xs"
            title="Open Cart"
            aria-label="View Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-[#9333EA] text-white text-[10px] font-black flex items-center justify-center shadow-xs">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
