import React, { useState } from 'react';
import { KosnoraLogo } from './KosnoraLogo';
import { PlaceholderModal } from './PlaceholderModal';
import { ShieldCheck, Truck, MessageCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    title: string;
    content: string;
  }>({
    isOpen: false,
    title: '',
    content: '',
  });

  const openPolicy = (title: string, content: string) => {
    setModalState({ isOpen: true, title, content });
  };

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  const policies = [
    {
      label: 'Privacy Policy',
      url: '/policies/privacy-policy',
      content: 'KOSNORA values your privacy and data security. All personal and order information collected through our official Shopify store is 256-bit encrypted and utilized exclusively for order fulfillment, delivery, and customer service.',
    },
    {
      label: 'Shipping Policy',
      url: '/policies/shipping-policy',
      content: 'Fast and reliable shipping across the United States. Orders are processed and dispatched within 24–48 business hours with end-to-end tracking provided immediately upon shipment.',
    },
    {
      label: 'Refund & Return Policy',
      url: '/policies/refund-policy',
      content: '30-Day Unconditional Money-Back Guarantee. If you are not 100% satisfied with the fit or quality of your KOSNORA case, our customer care team will arrange an exchange or immediate full refund.',
    },
    {
      label: 'Terms of Service',
      url: '/policies/terms-of-service',
      content: 'Official Terms of Service for KOSNORA, governed by standard e-commerce consumer guidelines and Shopify secure merchant protocols.',
    },
    {
      label: 'Contact Information',
      url: '/pages/contact',
      content: 'KOSNORA Official Support:\nEmail: support@kosnora.com\nPhone / WhatsApp: +1 (970) 996-2930\nSupport Hours: Monday – Friday, 9:00 AM – 6:00 PM EST.',
    },
  ];

  return (
    <>
      <footer className="bg-white text-neutral-600 pt-10 sm:pt-14 pb-24 sm:pb-14 border-t border-neutral-200 w-full max-w-full min-w-0 box-border">
        <div className="kosnora-page-container w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 min-w-0 box-border">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-neutral-200">
            {/* Brand Column */}
            <div className="md:col-span-5 space-y-3">
              <a href="#" className="inline-block" aria-label="KOSNORA">
                <KosnoraLogo size="sm" />
              </a>
              <p className="text-xs font-black text-neutral-900 uppercase tracking-wider">
                Engineered for Everyday Protection
              </p>
              <p className="text-xs text-neutral-500 max-w-sm leading-relaxed">
                Smart precision cases engineered with premium finishes and advanced impact protection for your iPhone.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-bold text-emerald-700">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>100% Secure Checkout</span>
                </span>
                <span className="text-neutral-300">·</span>
                <span className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-emerald-600" />
                  <span>Fast US Shipping</span>
                </span>
              </div>
            </div>

            {/* Quick Navigation Links */}
            <div className="md:col-span-2 space-y-3">
              <div className="text-[11px] font-black uppercase tracking-wider text-neutral-900">
                Navigation
              </div>
              <div className="flex flex-col space-y-2 text-xs font-bold text-neutral-700">
                <a href="#pricing" className="hover:text-[#9333EA] transition-colors">
                  Shop Cases
                </a>
                <a href="#benefits" className="hover:text-[#9333EA] transition-colors">
                  Why KOSNORA
                </a>
                <a href="#faq" className="hover:text-[#9333EA] transition-colors">
                  Frequently Asked Questions
                </a>
              </div>
            </div>

            {/* Policies Column (Direct Shopify Links + Modal Fallback) */}
            <div className="md:col-span-3 space-y-3">
              <div className="text-[11px] font-black uppercase tracking-wider text-neutral-900">
                Policies & Terms
              </div>
              <div className="flex flex-col space-y-2 text-xs text-neutral-600">
                {policies.map((p) => (
                  <a
                    key={p.label}
                    href={p.url}
                    onClick={(e) => {
                      // In local/preview environment where Shopify sub-routes don't exist yet, open seamless modal view
                      if (window.location.hostname.includes('localhost') || window.location.hostname.includes('webcontainer') || window.location.hostname.includes('run.app')) {
                        e.preventDefault();
                        openPolicy(p.label, p.content);
                      }
                    }}
                    className="hover:text-[#9333EA] transition-colors text-left"
                  >
                    {p.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Social & Contact Channels */}
            <div className="md:col-span-2 space-y-3">
              <div className="text-[11px] font-black uppercase tracking-wider text-neutral-900">
                Customer Care
              </div>
              <div className="flex flex-col space-y-2.5 text-xs text-neutral-700">
                <a
                  href="https://www.instagram.com/kosnora.us/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-[#9333EA] transition-colors font-medium"
                >
                  <svg className="w-4 h-4 text-neutral-700 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                  <span>@kosnora.us</span>
                </a>

                <a
                  href="https://www.tiktok.com/@kosnora"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-[#9333EA] transition-colors font-medium"
                >
                  <svg className="w-4 h-4 text-neutral-700 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.4a6.33 6.33 0 0 0-.86-.06 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.28 8.28 0 0 0 4.77 1.48V6.75a4.83 4.83 0 0 1-1-.06z"/>
                  </svg>
                  <span>@kosnora</span>
                </a>

                <a
                  href="https://wa.me/19709962930"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-bold transition-colors pt-1"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  <span>WhatsApp: +1 (970) 996-2930</span>
                </a>

                <span className="text-[10px] text-neutral-400 block pt-0.5">
                  Mon–Fri: 9:00 AM – 6:00 PM EST
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-neutral-500">
            <p>© {new Date().getFullYear()} KOSNORA. All rights reserved.</p>
            <p className="text-[11px] text-neutral-400">
              iPhone is a registered trademark of Apple Inc. KOSNORA is an independent accessories brand.
            </p>
          </div>
        </div>
      </footer>

      <PlaceholderModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        title={modalState.title}
        content={modalState.content}
      />
    </>
  );
};
