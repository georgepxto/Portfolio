export interface BeforeAfter {
  project: string;
  kind: string;
  before: string;
  after: string;
  stack: string[];
  slug: string;
}

export const beforeAfter: BeforeAfter[] = [
  {
    project: 'Escalas e folgas',
    kind: 'App interno de RH',
    before: 'A escala do mês saía numa planilha enviada pelo WhatsApp.',
    after: 'Cada colaborador prevê o seu mês, vê as férias e pede folga ou troca de horário pelo app.',
    stack: ['React 19', 'TypeScript', 'Hono', 'MariaDB', 'PWA'],
    slug: 'escalas-e-folgas',
  },
  {
    project: 'TakeOne',
    kind: 'CRM para audiovisual',
    before: 'Clientes, pacotes, agenda e pagamentos espalhados em planilhas e no WhatsApp.',
    after: 'Clientes, pacotes, valores, gravações, entregas e pagamentos num lugar só.',
    stack: ['React 19', 'Vite', 'Supabase', 'Google Calendar'],
    slug: 'takeone',
  },
  {
    project: 'Lunna Pijama',
    kind: 'Site da marca',
    before: 'A marca só existia no Instagram.',
    after: 'Um site com a identidade da loja que leva a cliente das fotos dos pijamas direto para a conversa no WhatsApp.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Vercel', 'SEO local'],
    slug: 'lunna-pijama',
  },
];
