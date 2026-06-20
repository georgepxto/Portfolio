# Handoff: Portfólio — George Peixoto (Web Dev)

## Overview
Landing page de portfólio para um desenvolvedor web freelancer (George Peixoto). O público-alvo são **pessoas leigas** (clientes que querem contratar um site/app, não outros devs), então a linguagem é amigável e sem jargão técnico. A página é de rolagem única, com um CTA "Falar comigo" sempre em destaque, e suporta **3 temas de cor** trocáveis ao vivo.

## About the Design Files
O arquivo `reference_portfolio.html` neste pacote é uma **referência de design criada em HTML** — um protótipo que mostra a aparência e o comportamento pretendidos, **não** código de produção para copiar diretamente. Ele foi feito numa ferramenta de prototipagem e usa um runtime próprio (`support.js`, tags `<x-dc>`, classe `DCLogic`) que **não roda sozinho** fora daquele ambiente.

A tarefa é **recriar este design** num projeto real, do zero, usando o stack de sua preferência. Como não existe codebase ainda, a recomendação é:
- **Vite + React** (ou Next.js, se quiser SEO/SSR já que é um site público), ou
- **HTML + CSS + JS puro** se quiser algo leve e sem build.

Tudo aqui é **alta fidelidade (hi-fi)**: cores, tipografia, espaçamentos e interações são finais. Recrie pixel a pixel.

## Fidelity
**High-fidelity.** Cores, fontes, espaçamentos e animações abaixo são definitivos.

## Design Tokens

### Tipografia (Google Fonts)
- **Space Grotesk** (400/500/600/700) — títulos, números, nomes
- **DM Sans** (400/500) — textos corridos / corpo
- **Space Mono** (400/700) — rótulos pequenos, mono, microtexto

Import: `https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:opsz,wght@9..40,400;9..40,500&family=Space+Mono:wght@400;700&display=swap`

### Temas de cor (CSS variables)
A página usa variáveis CSS no elemento raiz e troca todas de uma vez ao mudar de tema. Tema padrão: **Citrus**.

| Token | Citrus (padrão) | Sunset | Midnight |
|---|---|---|---|
| `--bg` | `#f3f2ea` | `#fbf3ea` | `#0d0d12` |
| `--fg` | `#15140f` | `#1a1410` | `#f1f1f4` |
| `--muted` | `#73726a` | `#857669` | `#8d8d99` |
| `--card` | `#ffffff` | `#ffffff` | `#17171f` |
| `--border` | `#e4e3d8` | `#efe3d4` | `#272730` |
| `--accent` | `#6b4bff` | `#ff5a3c` | `#1ee0c2` |
| `--accent2` | `#bff03a` | `#3d4cf5` | `#ff3da6` |
| `--accent-ink` (texto sobre accent) | `#ffffff` | `#ffffff` | `#0d0d12` |

- **Verde WhatsApp** (fixo, não muda com tema): `#25D366`, texto branco.
- Troca de tema deve ser **instantânea** (sem transição no background — uma transição em propriedade alimentada por variável CSS causa bug de render em alguns motores).

### Espaçamento / forma
- Container máximo: `1180px`, centralizado. FAQ usa máx `860px`.
- Padding horizontal de seção: `clamp(20px, 5vw, 72px)`.
- Padding vertical de seção: `clamp(72px, 14vh, 150px)` (varia por seção).
- Raio de borda: cards `20px`, FAQ items `16px`, botões/pílulas/tags `100px` (pílula).
- Borda padrão: `1px solid var(--border)`.
- Sem sombras pesadas; profundidade vem de bordas e do hover (translateY).

### Animações
- **Entrada do hero** (`heroUp`): `opacity 0→1` + `translateY(34px→0)`, `cubic-bezier(.2,.7,.2,1)`, com delays escalonados (0.05s a 0.44s) por elemento.
- **Reveal ao rolar**: elementos com `data-reveal` começam `opacity:0; translateY(28px)` e animam para visível quando entram na viewport (IntersectionObserver, threshold ~0.12, `rootMargin: 0px 0px -8% 0px`). Cards têm delays escalonados (0.08s entre cada). Fallback: revelar tudo após 3s.
- **Blobs flutuantes** (decorativos, atrás do hero e do contato): círculos grandes com `filter:blur(80–100px)`, opacidade `.14–.22`, animação de flutuação lenta (`floatA` 13–18s, `floatB` 16s, `ease-in-out infinite`).
- **Marquee**: faixa de texto rolando horizontalmente em loop infinito (`translateX(0 → -50%)`, 26s linear). Conteúdo duplicado para loop contínuo.
- **Hover de botões/cards**: `translateY(-2 a -6px)`, e nos cards a borda muda para `var(--accent)`.

## Screens / Views
Página única, ordem de cima para baixo:

### 1. Nav (sticky)
- Fixa no topo, fundo translúcido com `backdrop-filter: blur(14px)`, borda inferior.
- Esquerda: logo — quadrado `30px` arredondado (`9px`) cor `--accent` com a letra "G" (Space Grotesk 700, cor `--accent-ink`), seguido de "george.dev" (Space Mono 13px; ".dev" em `--muted`).
- Direita: links de navegação (**Sobre, Projetos, Contato**) — só aparecem em telas > 720px; e o **seletor de tema**: rótulo "tema" (Space Mono 11px) + 3 bolinhas de `18px` com gradiente representando cada tema (Citrus: `#6b4bff→#bff03a`; Sunset: `#ff5a3c→#3d4cf5`; Midnight: `#1ee0c2→#ff3da6`). A bolinha ativa ganha um anel (`box-shadow 0 0 0 2px var(--bg), 0 0 0 4px var(--fg)`) e `scale(1.18)`.

### 2. Hero
- Padding vertical generoso. Dois blobs decorativos animados atrás (canto sup. direito `--accent`, canto inf. esquerdo `--accent2`).
- **Badge** (pílula com borda): ponto pulsante `--accent2` + texto "Aberto para novos projetos · 2026" (Space Mono 12px).
- **Título** gigante em duas linhas: "George" / "Peixoto." — Space Grotesk 700, `font-size: clamp(54px, 12vw, 178px)`, `line-height:.92`, `letter-spacing:-.03em`. O "." final é cor `--accent`.
- **Subtítulo**: "**Faço sites e aplicativos que as pessoas adoram usar.** Cuido de tudo — da aparência ao funcionamento — para que o seu negócio brilhe na internet." (primeira frase peso 500, resto em `--muted`). `clamp(17px, 2vw, 22px)`.
- **CTA único**: botão pílula "Falar comigo →" (fundo `--accent`, texto `--accent-ink`), link para `#contato`. **Não há botão secundário.**

### 3. Marquee
- Faixa com borda em cima e embaixo, fundo levemente diferente. Texto rolando: "Sites modernos ✦ Lojas online ✦ Aplicativos web ✦ Dashboards ✦ Landing pages ✦ Animações ✦" (Space Grotesk 600, `clamp(20px,3vw,34px)`, estrelas `✦` em `--accent`).

### 4. Sobre (rótulo "01 — SOBRE")
- Rótulo Space Mono em `--accent`.
- **Título**: "Seu site precisa ser **bonito** e funcionar de verdade." — "bonito" tem fundo `--accent2` com texto escuro `#15140f` (destaque tipo marca-texto), raio 4px. Space Grotesk 600, `clamp(28px,4.4vw,52px)`.
- **Parágrafo** (`--muted`, 17px): "Sou George, desenvolvedor web há mais de um ano. Transformo ideias em sites e aplicativos que encantam quem usa — com design cuidadoso, carregamento rápido e fácil de mexer. Você me conta o que precisa, eu cuido do resto."
- **Dois números** (Space Grotesk 700, `clamp(34px,5vw,52px)`): "**1+** ano de experiência" e "**10** projetos no ar" (legendas em Space Mono 12px `--muted`).

### 5. O que faço (rótulo "02 — O QUE FAÇO")
- Rótulo + linha divisória horizontal.
- **Pílulas** (borda, fundo `--card`, 15px), com reveal escalonado: Sites institucionais · Lojas online · Aplicativos web · Landing pages · Painéis e dashboards · Animações e efeitos · Design de interfaces · Sites rápidos e leves · Integração com sistemas.

### 6. Projetos (rótulo "03 — PROJETOS")
- Cabeçalho: rótulo + título "Trabalhos selecionados" (Space Grotesk 600, `clamp(30px,5vw,58px)`) + "(2023 — 2026)" à direita (Space Mono `--muted`).
- Fundo da seção levemente diferente (`color-mix` do card), bordas em cima e embaixo.
- **Grid de 4 cards** (`repeat(auto-fit, minmax(290px, 1fr))`). Cada card:
  - **Placeholder de imagem** topo (aspect-ratio 4/3) com fundo listrado diagonal (`repeating-linear-gradient(45deg, ...)`) e um chip "project shot — Nome". → Substituir por screenshots reais dos projetos.
  - Título (Space Grotesk 600, 22px) + seta "↗".
  - Descrição (`--muted`, 15px).
  - Tags-categoria (Space Mono 11px, fundo `--accent` translúcido, cor `--accent`).
  - Hover: `translateY(-6px)` + borda `--accent`.
  - **Cards:**
    - **Nimbus** — "Painel de controle para uma startup acompanhar métricas em tempo real, com visual moderno e fácil de ler." Tags: Painel, Métricas.
    - **Folio** — "Loja online completa com carrinho, pagamento e entrega — tudo funcionando de forma simples para o cliente." Tags: Loja online, Pagamentos.
    - **Pulse** — "Aplicativo de música com visual animado e playlists compartilhadas entre amigos em tempo real." Tags: App web, Animações.
    - **Atlas** — "Site para agência com animações suaves ao rolar — da identidade visual à publicação no ar." Tags: Site institucional, Animações.

### 7. Como funciona (rótulo "04 — COMO FUNCIONA")
- Cabeçalho: título "Simples do início ao fim" + subtítulo "Sem termos complicados. Você acompanha cada etapa e participa das decisões."
- **Grid de 4 cards** numerados (`minmax(240px, 1fr)`). Cada card: badge quadrado `42px` raio `12px` com número (01–03 em `--accent` sobre fundo accent translúcido; **04 usa fundo `--accent2` com texto escuro**), título (Space Grotesk 600, 20px), parágrafo (`--muted`, 15px).
  - **01 Conversa** — "A gente bate um papo sobre sua ideia, seu público e o que você quer alcançar. Sem compromisso."
  - **02 Proposta** — "Te mostro o que será feito, o prazo e o valor — tudo claro e por escrito, antes de começar."
  - **03 Desenvolvimento** — "Crio seu site mostrando o progresso no caminho. Você dá sua opinião e ajustamos juntos."
  - **04 Site no ar** — "Publico tudo funcionando e te ensino a mexer. E continuo por perto para o que precisar."

### 8. Perguntas frequentes (rótulo "05 — PERGUNTAS FREQUENTES")
- Container estreito (máx 860px). Título "Dúvidas comuns".
- **Acordeão** (`<details>/<summary>` nativo): cada item é um card (borda, raio 16px, fundo `--card`). Summary com pergunta (Space Grotesk 600, `clamp(17px,2.2vw,20px)`) + "+" em `--accent` à direita. Conteúdo expandido em `--muted` 16px.
  - **Quanto custa um site?** — "Depende do tamanho e do que você precisa. Um site simples tem um valor; uma loja online ou um sistema mais completo, outro. Na nossa conversa eu te passo um orçamento claro e sem surpresas."
  - **Quanto tempo leva para ficar pronto?** — "Um site institucional costuma ficar pronto em 1 a 3 semanas. Projetos maiores levam mais tempo — mas você sempre saberá o prazo antes de começarmos."
  - **Preciso ter o conteúdo pronto?** — "Ajuda bastante ter textos e fotos, mas não se preocupe se ainda não tiver tudo. Eu te oriento sobre o que reunir e organizo as informações junto com você."
  - **Consigo atualizar o site depois sozinho?** — "Sim! Entrego tudo funcionando e te ensino a fazer as alterações do dia a dia. E se precisar de uma mão, é só me chamar."
- Sugestão de melhoria: animar a abertura e trocar "+" por "−" quando aberto.

### 9. Contato (rótulo "06 — CONTATO")
- Centralizado, com um blob decorativo atrás. 
- **Título** enorme: "Vamos construir algo **juntos?**" ("juntos?" em `--accent`). Space Grotesk 700, `clamp(38px,9vw,118px)`.
- Parágrafo: "Tem uma ideia? Quer renovar seu site? Só quer tirar uma dúvida? Me manda uma mensagem — respondo rapidinho."
- **Dois botões** pílula lado a lado:
  - **E-mail** (primário, fundo `--accent`): "hello@georgepeixoto.dev →" → `mailto:`.
  - **WhatsApp** (verde `#25D366`, texto branco): "WhatsApp →" → `https://wa.me/<número>` (substituir o número).

### 10. Footer
- Borda superior. Esquerda: "© 2026 George Peixoto" (Space Mono 13px `--muted`). Direita: links **GitHub** e **Instagram**.

## Interactions & Behavior
- **Troca de tema**: clicar nas bolinhas troca todas as variáveis CSS de cor de uma vez (instantâneo). Marcar a bolinha ativa. Persistir a escolha em `localStorage` é uma boa melhoria.
- **Reveal ao rolar**: IntersectionObserver revela elementos `data-reveal` ao entrar na tela, uma vez (unobserve depois). Fallback de 3s.
- **Smooth scroll**: `html { scroll-behavior: smooth }`; CTAs apontam para âncoras (`#contato`, `#projetos`).
- **Nav responsiva**: links some abaixo de 720px (só logo + seletor de tema). Considerar menu hamburguer no mobile.
- **FAQ**: acordeão nativo `<details>`.
- **Hover**: botões e cards sobem levemente; cards mudam cor da borda.

## State Management
Mínimo. Só:
- **Tema atual** (`'citrus' | 'sunset' | 'midnight'`, padrão `citrus`) — idealmente persistido em `localStorage`.
- Visibilidade do menu mobile (se implementar hamburguer).
Nenhuma busca de dados; conteúdo é estático.

## Assets
- **Sem imagens reais ainda.** Os cards de projeto usam placeholders listrados. O cliente vai fornecer **screenshots dos projetos** (Nimbus, Folio, Pulse, Atlas) e possivelmente uma foto pessoal.
- Ícones: nenhum por enquanto (setas são caracteres "→" / "↗" / "✦" / "+"). Se quiser ícones de redes sociais (GitHub, Instagram, WhatsApp), usar uma lib leve (ex: Lucide / Simple Icons).
- Fontes: Google Fonts (links acima).

## Dados a substituir (placeholders)
- Número do **WhatsApp**: atualmente `5511999999999` em `https://wa.me/...`.
- **E-mail**: `hello@georgepeixoto.dev`.
- Links **GitHub** e **Instagram** no footer.
- **Screenshots** reais dos 4 projetos.

## Files
- `reference_portfolio.html` — protótipo HTML completo (referência visual e de comportamento). Abre no navegador para ver a animação e os 3 temas (clicando nas bolinhas do topo).
