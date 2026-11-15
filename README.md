# Portfólio

Site pessoal em Astro, com saída estática para a Vercel.

## Comandos

- `npm install`
- `npm run dev` (http://localhost:4321)
- `npm run build` (gera `dist/`)
- `npm run check`
- `npm run capture` (gera as capas dos projetos em `src/assets/projects/`)

## Variáveis de ambiente

Copie `.env.example` para `.env` e preencha:

- `GITHUB_TOKEN`: lê as contribuições do GitHub no build. A contagem de atualizações do site também usa o token, se ele existir.
- `KV_REST_API_URL` e `KV_REST_API_TOKEN`: Upstash Redis do contador de puxadas da cordinha (`src/pages/api/pulls.ts`).

## Onde editar

- Dados pessoais e links: `src/config/site.ts`
- Repositório usado na contagem de atualizações: `site.repo` em `src/config/site.ts`
- Projetos e estudos de caso: `src/content/projects/*.md` (capas em `src/assets/projects/`)
- Laboratório, serviços e stack: `src/data/`
- Foto da seção Sobre: salve como `src/assets/photo.jpg` (ou .png/.webp)
- Tokens de design: `src/styles/global.css`

## Seção Atividade

Os dados vêm do GitHub no momento do build (`src/lib/github.ts`), nada é buscado no navegador:

- Gráfico e estatísticas: contribuições dos últimos 12 meses, via API GraphQL.
- Faixa "Este site": total de commits da branch padrão deste repositório, via API REST.

Cada busca salva o resultado em `src/data/` (`contributions.json` e `repo-commits.json`). Se a API falhar, o build usa o último valor salvo; sem nenhum valor salvo, a parte correspondente não aparece.

## Rebuild diário

`.github/workflows/rebuild.yml` dispara o Deploy Hook da Vercel todo dia às 06:00 UTC, para manter os números do GitHub atualizados. Configure a URL do hook no secret `VERCEL_DEPLOY_HOOK` do repositório.
