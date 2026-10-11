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
      content: 'A KOSNORA valoriza a privacidade e segurança total de seus dados. Todas as informações coletadas em nossa loja Shopify são criptografadas e utilizadas estritamente para o processamento de pedidos, entrega e suporte ao cliente.',
    },
    {
      label: 'Shipping Policy',
      url: '/policies/shipping-policy',
      content: 'Envio rápido e seguro para todo o território nacional. Pedidos são despachados em até 24 a 48 horas úteis após confirmação do pagamento, com código de rastreamento completo.',
    },
    {
      label: 'Refund & Return Policy',
      url: '/policies/refund-policy',
      content: 'Garantia incondicional de 30 dias KOSNORA. Se você não estiver 100% satisfeito com o encaixe ou qualidade da sua capinha, realizamos a troca ou reembolso integral de forma rápida.',
    },
    {
      label: 'Terms of Service',
      url: '/policies/terms-of-service',
      content: 'Termos de Serviço oficiais da KOSNORA regidos pelas diretrizes de comércio eletrônico seguro da Shopify e legislação vigente de proteção ao consumidor.',
    },
    {
      label: 'Contact Information',
      url: '/pages/contato',
      content: 'Atendimento oficial KOSNORA:\nE-mail: support@kosnora.com\nHorário de atendimento: Segunda a Sexta, das 09h às 18h.\nWhatsApp de Suporte disponível para clientes.',
    },
  ];

  return (
    <>
      <footer className="bg-white text-neutral-600 py-10 sm:py-14 border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                Capinhas inteligentes de alta precisão com acabamento premium e proteção avançada contra impactos para o seu iPhone.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-bold text-emerald-700">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Compra 100% Segura</span>
                </span>
                <span className="text-neutral-300">·</span>
                <span className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-emerald-600" />
                  <span>Envio para todo o Brasil</span>
                </span>
              </div>
            </div>

            {/* Quick Navigation Links */}
            <div className="md:col-span-2 space-y-3">
              <div className="text-[11px] font-black uppercase tracking-wider text-neutral-900">
                Navegação
              </div>
              <div className="flex flex-col space-y-2 text-xs font-bold text-neutral-700">
                <a href="#pricing" className="hover:text-[#9333EA] transition-colors">
                  Comprar Capinhas
                </a>
                <a href="#benefits" className="hover:text-[#9333EA] transition-colors">
                  Por Que KOSNORA
                </a>
                <a href="#faq" className="hover:text-[#9333EA] transition-colors">
                  Dúvidas Frequentes
                </a>
              </div>
            </div>

            {/* Policies Column (Direct Shopify Links + Modal Fallback) */}
            <div className="md:col-span-3 space-y-3">
              <div className="text-[11px] font-black uppercase tracking-wider text-neutral-900">
                Políticas & Termos
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
                Canais Oficiais
              </div>
              <div className="flex flex-col space-y-2.5 text-xs text-neutral-700">
                <a
                  href="https://instagram.com/kosnora"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-[#9333EA] transition-colors font-medium"
                >
                  <svg className="w-4 h-4 text-neutral-700 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                  <span>@kosnora</span>
                </a>

                <a
                  href="https://tiktok.com/@kosnora"
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
                  href="https://wa.me/5511999999999?text=Olá!%20Gostaria%20de%20tirar%20uma%20dúvida%20sobre%20a%20capinha%20KOSNORA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-bold transition-colors pt-1"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  <span>WhatsApp Suporte</span>
                </a>

                <span className="text-[10px] text-neutral-400 block pt-0.5">
                  Seg–Sex: 09h às 18h
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-neutral-500">
            <p>© {new Date().getFullYear()} KOSNORA. Todos os direitos reservados.</p>
            <p className="text-[11px] text-neutral-400">
              iPhone é uma marca registrada da Apple Inc. KOSNORA é uma marca de acessórios independente.
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
