import { useScrollAnimation } from "../hooks/useScrollAnimation";
import "./Hero.css";

const Hero = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="hero" ref={ref}>
      <div className={`hero-content ${isVisible ? "fade-in" : ""}`}>
        <h1 className="hero-title">
          <span className="hero-subtitle">Olá, eu sou</span>
          George Peixoto
        </h1>
        <p className="hero-description">Desenvolvedor Front-end / FullStack</p>
        <div className="hero-cta">
          <a href="#projects" className="btn-primary">
            Ver Trabalhos
          </a>
          <a href="#contact" className="btn-secondary">
            Entre em Contato
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
