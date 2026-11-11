---
title: Escalas e folgas
slug: escalas-e-folgas
order: 3
featured: true
meta: Cliente · OIG · 2026
year: 2026
client: OIG
role: Desenvolvimento full stack
status: "[STATUS]"
stack:
  - React 19
  - TypeScript
  - Hono
  - MariaDB
  - PWA
summary: App de escalas e folgas que substituiu a planilha mensal enviada pelo WhatsApp. A RH monta e publica a escala do mês, e cada colaborador acompanha a sua pelo celular, pede folga ou troca de horário e recebe os avisos da empresa.
cover: ../../assets/projects/escalas-e-folgas.png
---

## O problema

A escala do mês era uma planilha que a RH montava e mandava no WhatsApp. [COMO ERA LIDAR COM PEDIDOS DE FOLGA E MUDANÇAS NA ESCALA ANTES DO APP]

## Decisões

- **Escalas que se calculam sozinhas.** As escalas por regra, como 12x36 e 5x2 com folga no fim de semana, saem prontas. As que dependem de escolha ganham um rascunho gerado, que a RH ajusta clicando ou arrastando as folgas.
- **Publicação controlada.** Até a RH publicar o mês, o colaborador vê "Em montagem". Mudanças feitas depois ficam guardadas até a RH salvar, e só então o colaborador é avisado.
- **Pedidos dentro de regras.** Folga, entrada mais cedo e mudança de pausa seguem prazos e limites por cidade, e a RH vê a cobertura do dia antes de aprovar.
- **App instalável (PWA)**, com notificações no celular e exportação da escala para o calendário do aparelho.
- **Acesso por página e por cidade**, para que cada admin veja só o que lhe cabe.

## O sistema

No Quadro de escala, a RH vê o mês inteiro de uma cidade, com as folgas de cada pessoa, o limite de folgas por dia e os alertas.

![Quadro de escala do mês com as folgas de cada colaborador, agrupadas por tipo de escala](../../assets/projects/escalas-e-folgas/quadro.png)

Antes de aprovar um pedido, a RH vê quantas pessoas trabalham e quantas folgam no dia pedido e nos dias ao lado.

![Detalhe de um pedido de folga com a cobertura do dia e os botões para aprovar, recusar ou sugerir outra data](../../assets/projects/escalas-e-folgas/solicitacao.png)

O colaborador acompanha a própria escala num calendário, com os plantões, as folgas e os feriados do mês.

![Calendário do colaborador com os dias de plantão noturno e de folga do mês](../../assets/projects/escalas-e-folgas/escala.png)

Telas com dados fictícios do ambiente de demonstração.

## Resultado

[RESULTADO]
