export interface StackGroup {
  label: string;
  items: string[];
}

export const stack: StackGroup[] = [
  { label: 'Front-end', items: ['React', 'Vite'] },
  { label: 'Back-end', items: ['NestJS', 'Node', 'Express'] },
  { label: 'Dados', items: ['MariaDB', 'Supabase', 'SQLite'] },
  { label: 'Infraestrutura', items: ['Vercel', 'Hostinger Cloud'] },
  { label: 'Outros', items: ['Rust', 'Python', 'Playwright'] },
];
