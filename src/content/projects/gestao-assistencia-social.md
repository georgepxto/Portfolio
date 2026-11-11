---
title: Gestão de assistência social
slug: gestao-assistencia-social
order: 1
featured: true
meta: Cliente · Instituto OIG · 2026
year: 2026
client: Instituto OIG
role: Desenvolvimento full stack
status: Em produção
stack:
  - NestJS
  - MariaDB
  - React
  - Vite
summary: Plataforma que acompanha cada beneficiário, do cadastro à reforma da casa. Valida CPF, detecta cadastros duplicados, guarda as fotos de cada etapa da obra, mostra mapas de calor por bairro e registra tudo em trilha de auditoria.
---

## O problema

O Instituto OIG precisava acompanhar cada beneficiário do primeiro cadastro até a entrega da reforma da casa. Isso exigia dados confiáveis, sem cadastros duplicados, com o histórico de cada etapa da obra e o registro de quem fez cada alteração.

## Decisões

- **Servidor próprio na Hostinger Cloud**, em vez de Supabase ou Vercel, para ter controle total sobre os dados dos beneficiários.
- **Níveis de acesso N1, N2 e N3**, para que cada pessoa da equipe veja e altere apenas o que precisa.
- **Usuários temporários de 24 horas**, para dar acesso pontual sem deixar contas abertas.
- **Validação de CPF via API** no momento do cadastro, junto com a detecção de cadastros duplicados.
- **Exportação em PDF e planilha**, para relatórios e prestação de contas.

## Resultado

[RESULTADO]
