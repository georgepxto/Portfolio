export interface LabItem {
  name: string;
  description: string;
  stack: string;
  href?: string;
  linkLabel?: 'repositório' | 'site';
}

export const lab: LabItem[] = [
  {
    name: 'Caça-Cliente',
    description: 'Encontra empresas locais sem site no Google Maps, para prospecção.',
    stack: 'React · Node · Playwright',
  },
  {
    name: 'MonitorHub',
    description: 'Acompanha as páginas de status de bancos brasileiros e do PIX em tempo real.',
    stack: 'Node · React',
    href: 'https://github.com/georgepxto/Monitor',
    linkLabel: 'repositório',
  },
  {
    name: 'Giz',
    description: 'Agenda e controle financeiro para professoras particulares, com o valor a receber de cada ciclo.',
    stack: 'React · Firebase',
  },
  {
    name: 'FilaKaraokê',
    description: 'Fila de karaokê em tempo real: cada convidado entra pelo celular e avisa quando terminou de cantar.',
    stack: 'React · Supabase',
  },
  {
    name: 'Bots do Diário Oficial',
    description: 'Avisam no Telegram quando o Diário Oficial do Piauí, o dos municípios ou o TCE-PI publicam os termos escolhidos.',
    stack: 'Python · Node · Telegram',
    href: 'https://github.com/georgepxto/BOT_DIARIOOFICIAL',
    linkLabel: 'repositório',
  },
  {
    name: 'Bot de Figurinhas',
    description: 'Transforma fotos e vídeos em figurinhas, normais e animadas, direto no WhatsApp.',
    stack: 'Node · ffmpeg',
    href: 'https://github.com/georgepxto/botfigurinhawpp',
    linkLabel: 'repositório',
  },
  {
    name: 'Início',
    description: 'Launcher leve para Google TV, feito para a TCL C6K.',
    stack: 'Google TV',
  },
  {
    name: 'MCHOSE V9',
    description: 'App portátil para controlar o headset MCHOSE V9 Pro sem o software oficial.',
    stack: 'Rust · em desenvolvimento',
  },
];
