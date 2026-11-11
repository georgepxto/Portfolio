export const site = {
  name: 'George',
  surname: '[SOBRENOME]',
  role: 'Desenvolvedor web',
  city: 'Parnaíba',
  state: 'PI',
  stateName: 'Piauí',
  country: 'BR',
  whatsapp: '[PREENCHER]',
  email: '[PREENCHER]',
  github: 'georgepxto',
  siteUrl: '[PREENCHER]',
} as const;

export const fullName = `${site.name} ${site.surname}`;
export const whatsappUrl = `https://wa.me/${site.whatsapp}`;
export const githubUrl = `https://github.com/${site.github}`;
export const emailUrl = `mailto:${site.email}`;

export function formatPhone(value: string): string {
  const match = value.match(/^55(\d{2})(\d{4,5})(\d{4})$/);
  return match ? `(${match[1]}) ${match[2]}-${match[3]}` : value;
}
