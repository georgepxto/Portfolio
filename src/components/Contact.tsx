import "./Contact.css";

const Contact = () => {
  // Substitua pelo seu número de WhatsApp (com código do país, ex: 5511999999999)
  const whatsappNumber = "5586994767818";
  const whatsappMessage = "Olá! Vim através do seu portfólio.";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <section id="contact" className="contact">
      <div className="contact-content">
        <h2 className="section-title">Entre em Contato</h2>
        <div className="contact-info">
          <p className="contact-text">
            Estou sempre interessado em ouvir sobre novos projetos e
            oportunidades. Se você tem alguma pergunta ou só quer dizer oi,
            sinta-se à vontade para entrar em contato através das redes sociais.
          </p>
          <div className="contact-links">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
            <a
              href="https://instagram.com/georgepxto"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            <a
              href="https://github.com/georgepxto"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/george-peixoto-1a7004360/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
      <footer className="footer">
        <p>© 2025 George Peixoto. Todos os direitos reservados.</p>
      </footer>
    </section>
  );
};

export default Contact;
