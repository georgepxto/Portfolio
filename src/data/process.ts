export interface ProcessStep {
  title: string;
  description: string;
}

export interface Guarantee {
  label: string;
  value: string;
}

export const processSteps: ProcessStep[] = [
  {
    title: 'Conversa',
    description: 'Você conta pelo WhatsApp o que precisa resolver. Se for preciso, marcamos uma chamada rápida.',
  },
  {
    title: 'Proposta',
    description: 'Envio por escrito o que será feito, o prazo e o valor antes de começar.',
  },
  {
    title: 'Desenvolvimento',
    description: 'Você acompanha versões que já dá para testar e ajusta no caminho.',
  },
  {
    title: 'Entrega',
    description: 'Coloco no ar, mostro como usar e continuo disponível para ajustes e novas funções.',
  },
];

export const guarantees: Guarantee[] = [
  { label: 'Orçamento', value: 'sem custo e sem compromisso' },
  { label: 'Resposta', value: 'em até 1 dia útil' },
  { label: 'Valor', value: 'fechado antes de começar' },
];
