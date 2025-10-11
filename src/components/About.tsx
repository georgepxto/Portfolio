import { useScrollAnimation } from "../hooks/useScrollAnimation";
import "./About.css";

const About = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="about" className="about" ref={ref}>
      <div className={`about-content ${isVisible ? "fade-in" : ""}`}>
        <h2 className="section-title">Sobre Mim</h2>
        <div className="about-grid">
          <div className="about-text">
            <p>
              Sou um desenvolvedor apaixonado focado em criar experiências
              digitais limpas, funcionais e esteticamente agradáveis. Com
              expertise em tecnologias web modernas, trago ideias à vida através
              do código.
            </p>
            <p>
              Minha abordagem combina princípios de design minimalista com
              implementação técnica robusta, garantindo que cada projeto seja
              bonito e performático.
            </p>
          </div>
          <div className="about-skills">
            <h3>Habilidades</h3>
            <div className="skills-list">
              <span>React</span>
              <span>JavaScript</span>
              <span>PHP/Laravel</span>
              <span>HTML/CSS</span>
              <span>Node.js</span>
              <span>Git/Github</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
