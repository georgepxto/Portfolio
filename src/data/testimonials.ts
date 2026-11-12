export interface Testimonial {
  company: string;
  project: string;
  text: string;
  name: string;
  role: string;
  href: string;
}

export const testimonials: Testimonial[] = [
  {
    company: 'OIG',
    project: 'Escalas e folgas',
    text: '[DEPOIMENTO: 1–2 FRASES SOBRE O RESULTADO DO APP DE ESCALAS]',
    name: '[NOME]',
    role: 'RH · OIG',
    href: '/trabalhos/escalas-e-folgas/',
  },
  {
    company: 'Lunna Pijama',
    project: 'Site da marca',
    text: '[DEPOIMENTO: 1–2 FRASES SOBRE O RESULTADO DO SITE E PEDIDOS PELO WHATSAPP]',
    name: '[NOME]',
    role: 'Lunna Pijama · Teresina, PI',
    href: '/trabalhos/lunna-pijama/',
  },
  {
    company: 'OIG',
    project: 'Plataforma de vídeos',
    text: '[DEPOIMENTO: 1–2 FRASES SOBRE O RESULTADO DA PLATAFORMA DE TREINAMENTO]',
    name: '[NOME]',
    role: 'OIG',
    href: '/trabalhos/plataforma-de-videos/',
  },
];
