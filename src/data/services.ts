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
    example: 'ex.: Instituto OIG',
    href: '/trabalhos/gestao-assistencia-social/',
  },
  {
    title: 'Manutenção e evolução',
    description: 'Contratos recorrentes para manter no ar e evoluir o que já foi entregue.',
    example: 'ex.: plataforma de vídeos',
    href: '/trabalhos/plataforma-de-videos/',
  },
];
