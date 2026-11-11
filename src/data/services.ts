export interface Service {
  title: string;
  description: string;
  example: string;
}

export const services: Service[] = [
  {
    title: 'Sites para empresas',
    description: 'Landing pages e sites institucionais rápidos, prontos para aparecer no Google.',
    example: 'Exemplo: Lunna Pijama',
  },
  {
    title: 'Sistemas sob medida',
    description: 'Plataformas de gestão com níveis de acesso, relatórios e auditoria.',
    example: 'Exemplo: Instituto OIG',
  },
  {
    title: 'Manutenção e evolução',
    description: 'Contratos recorrentes para manter no ar e evoluir o que já foi entregue.',
    example: 'Exemplo: plataforma de vídeos',
  },
];
