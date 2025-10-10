import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <a href="#" className="logo">
          PORTFÓLIO
        </a>
        <nav className="nav">
          <a href="#about">Sobre</a>
          <a href="#projects">Projetos</a>
          <a href="#contact">Contato</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
