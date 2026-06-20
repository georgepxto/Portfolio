const FAQS = [
  {
    q: 'Quanto custa um site?',
    a: 'Depende do tamanho e do que você precisa. Um site simples tem um valor; uma loja online ou um sistema mais completo, outro. Na nossa conversa eu te passo um orçamento claro e sem surpresas.',
    delay: 0,
  },
  {
    q: 'Quanto tempo leva para ficar pronto?',
    a: 'Um site institucional costuma ficar pronto em 1 mês, ou 1 mês e meio. Projetos maiores levam mais tempo — mas você sempre saberá o prazo antes de começarmos.',
    delay: 0.06,
  },
  {
    q: 'Preciso ter o conteúdo pronto?',
    a: 'Ajuda bastante ter textos e fotos, mas não se preocupe se ainda não tiver tudo. Eu te oriento sobre o que reunir e organizo as informações junto com você.',
    delay: 0.12,
  },
  {
    q: 'Consigo atualizar o site depois sozinho?',
    a: 'Sim! Entrego tudo funcionando e te ensino a fazer as alterações do dia a dia. E se precisar de uma mão, é só me chamar.',
    delay: 0.18,
  },
]

export default function FAQ() {
  return (
    <section id="faq" style={{
      padding: '0 clamp(20px, 5vw, 72px) clamp(72px, 14vh, 150px)',
      maxWidth: 860,
      margin: '0 auto',
    }}>
      <div
        data-reveal=""
        style={{
          opacity: 0, transform: 'translateY(28px)',
          transition: 'opacity .8s cubic-bezier(.2,.7,.2,1), transform .8s cubic-bezier(.2,.7,.2,1)',
          marginBottom: 'clamp(28px, 4vw, 44px)',
        }}
      >
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: 'var(--accent)', letterSpacing: '.08em' }}>
          05 — PERGUNTAS FREQUENTES
        </span>
        <h2 style={{
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600,
          fontSize: 'clamp(30px, 5vw, 58px)', lineHeight: 1.04,
          letterSpacing: '-.02em', margin: '14px 0 0',
        }}>
          Dúvidas comuns
        </h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {FAQS.map(({ q, a, delay }) => (
          <details
            key={q}
            data-reveal=""
            style={{
              opacity: 0, transform: 'translateY(20px)',
              transition: `opacity .7s ${delay}s cubic-bezier(.2,.7,.2,1), transform .7s ${delay}s cubic-bezier(.2,.7,.2,1)`,
              border: '1px solid var(--border)',
              borderRadius: 16,
              background: 'var(--card)',
              overflow: 'hidden',
            }}
          >
            <summary style={{
              cursor: 'pointer',
              padding: '22px 24px',
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600,
              fontSize: 'clamp(17px, 2.2vw, 20px)',
              display: 'flex', alignItems: 'center',
              justifyContent: 'space-between', gap: 16,
              userSelect: 'none',
            }}>
              {q}
              {/* +/− toggled via CSS: .faq-toggle::after in index.css */}
              <span className="faq-toggle" />
            </summary>
            <div style={{ padding: '0 24px 24px', color: 'var(--muted)', fontSize: 16, lineHeight: 1.6 }}>
              {a}
            </div>
          </details>
        ))}
      </div>
    </section>
  )
}
