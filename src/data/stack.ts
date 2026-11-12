export interface StackGroup {
  label: string;
  items: string[];
}

export const stack: StackGroup[] = [
  { label: 'Linguagens', items: ['TypeScript', 'JavaScript', 'Python', 'Rust'] },
  { label: 'Front-end', items: ['React', 'Vite', 'React Router', 'Tailwind', 'HTML', 'CSS', 'PWA'] },
  { label: 'Back-end', items: ['Node.js', 'NestJS', 'Express', 'Hono'] },
  { label: 'Dados', items: ['MariaDB', 'MySQL', 'Supabase', 'Firebase', 'SQLite'] },
  { label: 'Infraestrutura', items: ['VPS', 'Hostinger Cloud', 'Vercel'] },
  { label: 'Integrações', items: ['Google Calendar', 'Telegram', 'WhatsApp'] },
  { label: 'Outros', items: ['Playwright', 'ffmpeg', 'Google TV', 'SEO local'] },
];
