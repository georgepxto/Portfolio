---
title: Plataforma de vídeos
slug: plataforma-de-videos
order: 2
featured: true
meta: Cliente · OIG
year: 2025
client: OIG
role: Idealização, desenvolvimento e manutenção
status: Em produção
stack:
  - Node.js
  - Express
  - MySQL
  - JavaScript
summary: Plataforma de vídeos de treinamento. Treina os colaboradores com cursos em vídeo e PDFs organizados em módulos, acompanha o progresso de cada pessoa e reúne escalas de RH, mentorias e relatórios.
cover: ../../assets/projects/plataforma-de-videos.png
---

## O problema

Conforme a empresa foi crescendo, percebemos que não havia um treinamento padronizado. A ideia de criar um sistema para reunir tudo em um só lugar foi minha: videoaulas, manuais e a gestão de RH na mesma plataforma.

## Decisões

- **Vídeos no Google Drive, em vez de hospedados na plataforma**, porque a empresa já guardava os vídeos lá e assim não há custo de armazenamento nem de banda.
- **Front-end em HTML, CSS e JavaScript puros, sem framework nem build**, porque o Express serve os arquivos como estão e o deploy no Plesk fica simples.
- **Treinamento e RH no mesmo sistema**, com setores, escalas, folgas, pausas e mentorias, porque a equipe já entra na plataforma todo dia e tudo fica num lugar só.
- **Permissões por página definidas pelo owner**, para dar a cada administrador só as telas de que ele precisa, sem acesso total.
- **O curso reabre na aula em que a pessoa parou**, para que ela não precise procurar onde estava.
- **Relatórios de progresso em PDF e planilha gerados no servidor**, para a RH acompanhar quem concluiu cada treinamento.

## O sistema

Cada curso tem o player, a lista de aulas e os materiais em PDF. A plataforma reabre o curso na aula em que a pessoa parou.

![Página de curso com o player de vídeo e a lista de aulas marcadas como assistidas, em andamento e pendentes](../../assets/projects/plataforma-de-videos/curso.png)

A administração acompanha o progresso de cada pessoa em cada curso, com filtros e relatórios.

![Estatísticas com total de usuários, cursos ativos, aulas concluídas, progresso médio e progresso detalhado por usuário](../../assets/projects/plataforma-de-videos/estatisticas.png)

O RH organiza as pessoas por setor em um kanban de arrastar e soltar, com escalas, folgas e pausas.

![Kanban de setores com as pessoas de cada equipe, a escala e quem está presente no dia](../../assets/projects/plataforma-de-videos/rh-setores.png)

O owner define, por conta, quais páginas cada administrador pode acessar.

![Modal de criação de usuário com as permissões por página para administradores restritos](../../assets/projects/plataforma-de-videos/permissoes.png)

Telas com dados fictícios do ambiente de demonstração.

## Resultado

O problema foi resolvido com a padronização: o treinamento passou a ser o mesmo para todos, com as videoaulas e os manuais reunidos na plataforma.
