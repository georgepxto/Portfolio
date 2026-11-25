export interface Service {
  title: string;
  description: string;
  example: string;
  href: string;
}

export const services: Service[] = [
  {
    title: 'Sites para empresas',
    description: 'Landing pages e sites institucionais rápidos, prontos para aparecer no Google.',
    example: 'ex.: Lunna Pijama',
    href: '/trabalhos/lunna-pijama/',
  },
  {
    title: 'Sistemas sob medida',
    description: 'Plataformas de gestão com níveis de acesso, relatórios e auditoria.',
    example: 'ex.: gestão de assistência social',
    href: '/trabalhos/gestao-assistencia-social/',
  },
  {
    title: 'Ajustes e evolução',
    description: 'Correções, melhorias e novas funções em sistemas e sites que já estão no ar.',
    example: 'ex.: Escalas e folgas',
    href: '/trabalhos/escalas-e-folgas/',
  },
];
