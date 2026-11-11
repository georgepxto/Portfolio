---
title: Giz
slug: giz
order: 5
featured: true
meta: Produto próprio · 2026
year: 2026
client: Produto próprio, feito para uma professora
role: Design e desenvolvimento full stack
status: Em uso todos os dias
stack:
  - React 19
  - Vite
  - Firebase
  - React Router
  - Vercel
summary: Agenda e controle financeiro feito com carinho e sob medida para uma professora particular. Registra as aulas de cada turma, marca o que já foi dado e calcula quanto ela tem a receber no ciclo de pagamento.
cover: ../../assets/projects/giz.png
---

## O problema

Uma professora particular dá aula para várias turmas, em horários que mudam ao longo da semana, e recebe por hora/aula num ciclo que não fecha no fim do mês: vai do dia 21 de um mês ao dia 20 do seguinte. Fechar o ciclo exige saber quantas aulas foram dadas de fato, quais caíram em feriado e quanto isso dá em reais.

O Giz foi feito exclusivamente para ela: uma pessoa só, usando todo dia, no computador e às vezes no celular.

## Decisões

- **Só conta o que foi dado.** Toda aula nasce pendente e passa a valer quando é marcada como realizada. O valor a receber é o número de aulas realizadas vezes o valor da hora/aula.
- **Ciclo de pagamento configurável**, por mês calendário ou por dia fixo, como do dia 21 ao dia 20. O painel e o relatório seguem o ciclo, não o mês.
- **Lançamento em lote** com recorrência semanal, porque a grade se repete toda semana.
- **Feriados e eventos fora da conta.** Feriados ficam marcados no calendário, e atividades que não são aula, como reunião de pais, aparecem na agenda e no relatório sem entrar no valor a receber.
- **Firebase em tempo real**, com login pelo Firebase Auth e os dados de cada conta guardados separados no Firestore.
- **CSS próprio, sem framework**, com tema claro e escuro e contraste AA nas cores de texto e de status.

## O sistema

A semana é a tela do dia a dia: cada aula mostra o horário, a turma e se já foi dada, e um clique numa aula pendente marca como realizada.

No mês, os pontos de cada dia mostram as aulas realizadas em verde e as pendentes em amarelo, e os feriados aparecem em vermelho. Ao escolher um dia, o painel ao lado lista as aulas e os eventos.

![Calendário de novembro com as aulas de cada dia, os feriados de Finados e Consciência Negra e o painel do dia 12 com três aulas e uma reunião de pais](../../assets/projects/giz/mes.png)

O relatório já vem com as datas do ciclo atual. Agrupa por turma ou por semana, pode esconder as pendentes e mostra as horas em sala e os feriados do período, pronto para copiar ou imprimir em PDF.

![Relatório do ciclo de 21/10 a 20/11 com o total a receber, as aulas realizadas, as horas em sala, os feriados e as aulas de cada turma](../../assets/projects/giz/relatorio.png)

Em Turmas, cada turma mostra as aulas do mês, quantas já foram dadas e quanto rendeu.

![Turmas com as aulas do mês, o progresso de cada uma e o valor faturado](../../assets/projects/giz/turmas.png)

No celular, o menu vira uma gaveta e as telas se reorganizam numa coluna só.

![Calendário do mês, relatório e turmas no celular, lado a lado](../../assets/projects/giz/celular.png)

Telas com dados fictícios de uma conta de teste.

## Resultado

O Giz está em uso todos os dias pela professora para quem foi feito. Por ser um app pessoal, com login, não tem link público.
