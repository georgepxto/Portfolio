import "./Experience.css";

const Experience = () => {
  const experiences = [
    {
      period: "2024 - Presente",
      role: "Desenvolvedor FullStack",
      company: "Freelancer",
      description:
        "Desenvolvimento de soluções web completas utilizando React, Node.js e outras tecnologias modernas. Foco em criar aplicações escaláveis e performáticas.",
      tech: ["React", "Node.js", "JavaScript", "Express"],
    },
    {
      period: "2023 - 2024",
      role: "Desenvolvedor Front-end",
      company: "Projetos Pessoais",
      description:
        "Criação de interfaces modernas e responsivas. Desenvolvimento de plataformas web interativas com foco em experiência do usuário.",
      tech: ["HTML", "CSS", "JavaScript", "React"],
    },
  ];

  return (
    <section id="experience" className="experience">
      <div className="experience-content">
        <h2 className="section-title">Experiência</h2>
        <div className="timeline">
          {experiences.map((exp, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <span className="timeline-period">{exp.period}</span>
                <h3 className="timeline-role">{exp.role}</h3>
                <h4 className="timeline-company">{exp.company}</h4>
                <p className="timeline-description">{exp.description}</p>
                <div className="timeline-tech">
                  {exp.tech.map((tech, i) => (
                    <span key={i}>{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
