import "./Projects.css";

const Projects = () => {
  const projects = [
    {
      title: "Gerador de Códigos",
      description:
        "Gerador de códigos criado em HTML, CSS e JavaScript",
      tech: ["HTML", "CSS", "JavaScript"],
      link: "https://geradoroig.netlify.app/",
    },
    {
      title: "Plataforma de Vídeos",
      description:
        "Plataforma de vídeos desenvolvida em HTML, CSS, JavaScript, Node e Express",
      tech: ["HTML", "CSS", "JavaScript", "Node.js", "Express"],
      link: "https://www.treinamentooig.com.br/",
    },
    {
      title: "Carregando",
      description:
        "Em breve novos projetos...",
      tech: ["Em desenvolvimento"],
      link: "#",
    },
  ];

  return (
    <section id="projects" className="projects">
      <div className="projects-content">
        <h2 className="section-title">Trabalhos Selecionados</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-number">0{index + 1}</div>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="project-tech">
                {project.tech.map((tech, i) => (
                  <span key={i}>{tech}</span>
                ))}
              </div>
              <a href={project.link} className="project-link">
                Ver Projeto →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
