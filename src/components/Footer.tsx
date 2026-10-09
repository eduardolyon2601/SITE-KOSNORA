import React, { useState } from 'react';
import { KosnoraLogo } from './KosnoraLogo';
import { PlaceholderModal } from './PlaceholderModal';

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
      label: 'Contact Support',
      content: 'Email: support@kosnora.com\nHours: Mon–Fri, 9am–5pm EST\nResponse: Within 24 business hours.',
    },
    {
      label: 'Shipping Policy',
      content: 'Orders ship within 24–48 hours. Standard US delivery: 3–7 business days with end-to-end tracking.',
    },
    {
      label: 'Return Policy',
      content: '30-day money-back fit guarantee. Contact support for hassle-free returns or model exchanges.',
    },
    {
      label: 'Privacy Policy',
      content: 'We respect your privacy. Data is used exclusively for order fulfillment and never sold.',
    },
  ];

  return (
    <>
      <footer className="bg-white text-neutral-600 py-10 sm:py-14 border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-neutral-200">
            {/* Brand Column */}
            <div className="md:col-span-6 space-y-2.5">
              <a href="#" className="inline-block" aria-label="KNR">
                <KosnoraLogo size="sm" />
              </a>
              <p className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                Make your phone uniquely yours.
              </p>
              <p className="text-xs text-neutral-500 max-w-sm leading-relaxed">
                Premium phone cases engineered with sleek minimalist design, long-lasting durability, and advanced impact protection.
              </p>
            </div>

            {/* Links Column */}
            <div className="md:col-span-6 flex flex-col md:items-end justify-between space-y-4">
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-black uppercase tracking-wider text-neutral-800">
                <a href="#pricing" className="hover:text-[#9333EA] transition-colors">
                  Shop
                </a>
                <a href="#benefits" className="hover:text-[#9333EA] transition-colors">
                  Why Kosnora
                </a>
                <a href="#faq" className="hover:text-[#9333EA] transition-colors">
                  FAQ
                </a>
              </div>

              {/* Policy Buttons */}
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-neutral-500">
                {policies.map((p) => (
                  <button
                    key={p.label}
                    onClick={() => openPolicy(p.label, p.content)}
                    className="hover:text-neutral-900 transition-colors underline underline-offset-2 cursor-pointer text-left"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-neutral-500">
            <p>© {new Date().getFullYear()} KOSNORA. All rights reserved.</p>
            <p className="text-[11px] text-neutral-400">
              iPhone is a trademark of Apple Inc. KOSNORA is not affiliated with Apple.
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
