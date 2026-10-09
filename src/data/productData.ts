import { ProductImage, PricingTier, FaqItem } from '../types';

export const BRAND_NAME = "KOSNORA";
export const PRODUCT_NAME = "KOSNORA Premium Phone Case";

// The 5 official product images
export const PRODUCT_IMAGES: ProductImage[] = [
  {
    id: 'cinza',
    name: 'Cinza',
    url: 'https://i.postimg.cc/m24tHsKv/Whats-App-Image-2026-10-09-at-02-56-11.jpg',
  },
  {
    id: 'preta',
    name: 'Preta',
    url: 'https://i.postimg.cc/CMqq8J51/Whats-App-Image-2026-10-07-at-00-11-55.jpg',
  },
  {
    id: 'rosa',
    name: 'Rosa',
    url: 'https://i.postimg.cc/pVFFjkrr/Whats-App-Image-2026-10-09-at-02-44-27.jpg',
  },
  {
    id: 'branca',
    name: 'Branca',
    url: 'https://i.postimg.cc/kGKRdML9/Whats-App-Image-2026-10-09-at-02-47-31.jpg',
  },
  {
    id: 'laranja',
    name: 'Laranja',
    url: 'https://i.postimg.cc/66vvZzqT/Whats-App-Image-2026-10-09-at-02-52-19.jpg',
  },
];

// Pricing Tiers (1 por $79,90, 2 por 139,90 e 3 por 194,90)
export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'single',
    quantity: 1,
    label: '1 CAPINHA',
    unitPrice: 79.90,
    totalPrice: 79.90,
    savingsTotal: 0,
    tagline: '1x Capinha KOSNORA',
  },
  {
    id: 'double',
    quantity: 2,
    label: '2 CAPINHAS',
    unitPrice: 69.95,
    totalPrice: 139.90,
    savingsTotal: 19.90,
    savingsPerUnit: 9.95,
    popular: true,
    tagline: '2x Capinhas KOSNORA',
  },
  {
    id: 'triple',
    quantity: 3,
    label: '3 CAPINHAS',
    unitPrice: 64.97,
    totalPrice: 194.90,
    savingsTotal: 44.80,
    savingsPerUnit: 14.93,
    bestValue: true,
    tagline: '3x Capinhas KOSNORA',
  },
];

export function getPricingTiers(): PricingTier[] {
  return PRICING_TIERS;
}

export const WHATS_INCLUDED = [
  'Capinha KOSNORA Original',
  'Proteção antichoque com bordas elevadas',
  'Acabamento premium toque suave',
  'Garantia incondicional de 30 dias',
];

export const FAQ_LIST: FaqItem[] = [
  {
    question: 'Como escolher a minha oferta e finalizar a compra?',
    answer: 'Você pode selecionar a foto desejada no catálogo e escolher a opção de 1 por $79,90, 2 por 139,90 ou 3 por 194,90. Em seguida, basta clicar em GET YOUR KOSNORA ou Comprar para ir direto ao checkout seguro.',
  },
  {
    question: 'A capinha protege a câmera e a tela contra quedas?',
    answer: 'Sim! A capinha KOSNORA foi desenvolvida com materiais de alta absorção de impacto, além de bordas estrategicamente elevadas para proteger tanto a lente da câmera quanto a tela contra riscos e quedas acidentais.',
  },
  {
    question: 'Qual é o prazo de envio e entrega?',
    answer: 'Os pedidos são processados e enviados rapidamente em até 24 a 48 horas úteis. Você receberá um código de rastreamento completo para acompanhar a entrega até o seu endereço.',
  },
  {
    question: 'Qual é a garantia?',
    answer: 'Oferecemos Garantia Incondicional de 30 dias. Se por qualquer motivo você não ficar 100% satisfeito, efetuamos a troca ou reembolso total do seu valor.',
  },
  {
    question: 'Como entro em contato com o suporte?',
    answer: 'Nosso atendimento é dedicado e está disponível pelo e-mail oficial support@kosnora.com de segunda a sexta-feira para tirar qualquer dúvida.',
  },
];
