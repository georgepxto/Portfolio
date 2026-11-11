export interface LabItem {
  name: string;
  description: string;
  stack: string;
  repo?: string;
}

export const lab: LabItem[] = [
  {
    name: 'Caça-Cliente',
    description: 'Encontra empresas locais sem site, para prospecção.',
    stack: 'React · Node · Playwright',
  },
  {
    name: 'MonitorHub',
    description: 'Acompanha as páginas de status de bancos brasileiros e do PIX.',
    stack: 'GitHub',
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
  {
    name: 'AI Calc',
    description: 'Calculadora para desktop.',
    stack: 'Python · PySide6',
  },
];
