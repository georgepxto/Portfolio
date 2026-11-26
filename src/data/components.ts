export type ComponentCategory = 'tema' | 'dados' | 'navegacao' | 'movimento';

export type ComponentStatus = 'publicado' | 'em-breve';

export type ComponentPreview = 'pull-cord' | 'github-activity' | 'glass-nav' | 'scroll-ring' | 'step-timeline' | 'dot-field';

export interface ShowcaseComponent {
  tag: string;
  folder: string;
  category: ComponentCategory;
  status: ComponentStatus;
  description: string;
  preview?: ComponentPreview;
  home?: boolean;
}

export const componentsRepoUrl = 'https://github.com/georgepxto/web-components';

export const componentCategories: { value: ComponentCategory; label: string }[] = [
  { value: 'tema', label: 'Tema' },
  { value: 'dados', label: 'Dados' },
  { value: 'navegacao', label: 'Navegação' },
  { value: 'movimento', label: 'Movimento' },
];

export const components: ShowcaseComponent[] = [
  {
    tag: 'pull-cord',
    folder: 'pull-cord',
    category: 'tema',
    status: 'publicado',
    description: 'Cordinha que alterna o tema claro e escuro, com física de mola e revelação circular.',
    preview: 'pull-cord',
    home: true,
  },
  {
    tag: 'github-activity',
    folder: 'github-activity',
    category: 'dados',
    status: 'publicado',
    description: 'Calendário de contribuições do GitHub com estatísticas, temas, i18n e coleta no build.',
    preview: 'github-activity',
    home: true,
  },
  {
    tag: 'glass-nav',
    folder: 'glass-nav',
    category: 'navegacao',
    status: 'publicado',
    description: 'Barra de navegação flutuante de vidro, com desfoque e link ativo por seção.',
    preview: 'glass-nav',
  },
  {
    tag: 'scroll-ring',
    folder: 'scroll-ring',
    category: 'navegacao',
    status: 'publicado',
    description: 'Botão de voltar ao topo com anel que mostra o progresso da leitura.',
    preview: 'scroll-ring',
  },
  {
    tag: 'step-timeline',
    folder: 'step-timeline',
    category: 'movimento',
    status: 'publicado',
    description: 'Linha do tempo de etapas que se preenche quando a seção entra na tela.',
    preview: 'step-timeline',
  },
  {
    tag: 'dot-field',
    folder: 'dot-field',
    category: 'movimento',
    status: 'publicado',
    description: 'Fundo de pontos que reage ao cursor. Leve, em canvas, sem WebGL.',
    preview: 'dot-field',
    home: true,
  },
];

export const categoryLabel = (value: ComponentCategory) =>
  componentCategories.find((category) => category.value === value)?.label ?? value;

export const componentUrl = (component: ShowcaseComponent) => `${componentsRepoUrl}/tree/main/${component.folder}`;
