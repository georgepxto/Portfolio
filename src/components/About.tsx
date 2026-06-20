export default function About() {
  return (
    <section id="sobre" style={{
      padding: 'clamp(72px, 14vh, 150px) clamp(20px, 5vw, 72px)',
      maxWidth: 1180,
      margin: '0 auto',
    }}>
      <div
        data-reveal=""
        style={{
          opacity: 0, transform: 'translateY(28px)',
          transition: 'opacity .8s cubic-bezier(.2,.7,.2,1), transform .8s cubic-bezier(.2,.7,.2,1)',
          marginBottom: 'clamp(32px, 5vw, 72px)',
        }}
      >
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: 'var(--accent)', letterSpacing: '.08em' }}>
          01 — SOBRE
        </span>
      </div>

      <div
        data-reveal=""
        style={{
          opacity: 0, transform: 'translateY(28px)',
          transition: 'opacity .8s .08s cubic-bezier(.2,.7,.2,1), transform .8s .08s cubic-bezier(.2,.7,.2,1)',
        }}
      >
        <h2 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 600,
          fontSize: 'clamp(28px, 4.4vw, 52px)',
          lineHeight: 1.1, letterSpacing: '-.02em',
          margin: '0 0 28px', maxWidth: '18ch',
        }}>
          Seu site precisa ser{' '}
          <span style={{ background: 'var(--accent2)', color: '#15140f', padding: '0 .12em', borderRadius: 4 }}>
            bonito
          </span>
          {' '}e funcionar de verdade.
        </h2>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(28px, 4vw, 64px)', alignItems: 'flex-start' }}>
          <p style={{ maxWidth: '46ch', margin: 0, fontSize: 17, lineHeight: 1.65, color: 'var(--muted)' }}>
            Sou George, desenvolvedor web há mais de um ano. Transformo ideias em sites e aplicativos que encantam
            quem usa — com design cuidadoso, carregamento rápido e fácil de mexer. Você me conta o que precisa,
            eu cuido do resto.
          </p>

          <div style={{ display: 'flex', gap: 'clamp(28px, 4vw, 56px)' }}>
            <div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(34px, 5vw, 52px)', letterSpacing: '-.02em' }}>
                1+
              </div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>
                ano de<br />experiência
              </div>
            </div>
            <div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(34px, 5vw, 52px)', letterSpacing: '-.02em' }}>
                10
              </div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>
                projetos<br />no ar
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
