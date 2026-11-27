export interface LabItem {
  name: string;
  description: string;
  stack: string;
  href?: string;
  linkLabel?: 'repositório' | 'site';
  status?: 'privado' | 'em andamento';
}

export const lab: LabItem[] = [
  {
    name: 'Wireless Battery',
    description: 'Mostra na barra de tarefas do Windows a bateria do mouse, teclado, fone e controle sem fio, sem o software de cada marca.',
    stack: 'Rust · Win32',
    href: 'https://github.com/georgepxto/wireless-battery-rust',
    linkLabel: 'repositório',
  },
  {
    name: 'Caça-Cliente',
    description: 'Encontra empresas locais sem site no Google Maps, para prospecção.',
    stack: 'React · Node · Playwright',
    status: 'privado',
  },
  {
    name: 'MonitorHub',
    description: 'Acompanha as páginas de status de bancos brasileiros e do PIX em tempo real.',
    stack: 'Node · React',
    href: 'https://github.com/georgepxto/Monitor',
    linkLabel: 'repositório',
  },
  {
    name: 'FilaKaraokê',
    description: 'Fila de karaokê em tempo real: cada convidado entra pelo celular e avisa quando terminou de cantar.',
    stack: 'React · Supabase',
    status: 'privado',
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
    status: 'privado',
  },
  {
    name: 'MCHOSE V9',
    description: 'App portátil para controlar o headset MCHOSE V9 Pro sem o software oficial.',
    stack: 'Rust',
    status: 'em andamento',
  },
  {
    name: 'MercadoSystem',
    description: 'Gestão de feiras de alimentos: vendedores, boxes, horários, check-in, produtos e pedidos.',
    stack: 'Laravel · PHP · MySQL',
    href: 'https://github.com/georgepxto/MercadoSytem',
    linkLabel: 'repositório',
  },
  {
    name: 'Gerador de Códigos',
    description: 'Gera os códigos internos que eu usava no trabalho e copia com um clique, com histórico.',
    stack: 'HTML · CSS · JavaScript',
    href: 'https://github.com/georgepxto/Gerador-de-Codigos',
    linkLabel: 'repositório',
  },
];
