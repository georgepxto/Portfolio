import type { MouseEvent } from 'react'

function hoverIn(e: MouseEvent<HTMLAnchorElement>) {
  e.currentTarget.style.transform = 'translateY(-3px)'
  e.currentTarget.style.filter = 'brightness(1.07)'
}
function hoverOut(e: MouseEvent<HTMLAnchorElement>) {
  e.currentTarget.style.transform = ''
  e.currentTarget.style.filter = ''
}

export default function Contact() {
  return (
    <section id="contato" style={{
      padding: 'clamp(80px, 16vh, 180px) clamp(20px, 5vw, 72px)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Decorative blob */}
      <div style={{
        position: 'absolute',
        bottom: '-30%', left: '50%', transform: 'translateX(-50%)',
        width: '60vw', height: '60vw', maxWidth: 680, maxHeight: 680,
        background: 'var(--accent)', borderRadius: '50%',
        filter: 'blur(100px)', opacity: .14,
        pointerEvents: 'none',
        animation: 'floatA 18s ease-in-out infinite',
      }} />

      <div
        data-reveal=""
        style={{
          opacity: 0, transform: 'translateY(28px)',
          transition: 'opacity .9s cubic-bezier(.2,.7,.2,1), transform .9s cubic-bezier(.2,.7,.2,1)',
          position: 'relative', zIndex: 1,
          maxWidth: 1180, margin: '0 auto', textAlign: 'center',
        }}
      >
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: 'var(--accent)', letterSpacing: '.08em' }}>
          06 — CONTATO
        </span>

        <h2 style={{
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
          fontSize: 'clamp(38px, 9vw, 118px)', lineHeight: .98,
          letterSpacing: '-.03em', margin: '18px 0 0',
        }}>
          Vamos construir<br />algo{' '}
          <span style={{ color: 'var(--accent)' }}>juntos?</span>
        </h2>

        <p style={{ maxWidth: '42ch', margin: '26px auto 36px', fontSize: 18, lineHeight: 1.55, color: 'var(--muted)' }}>
          Tem uma ideia? Quer renovar seu site? Só quer tirar uma dúvida? Me manda uma mensagem — respondo rapidinho.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center' }}>
          {/* TODO: Confirm email address */}
          <a
            href="mailto:georgepxto@gmail.com"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '18px 34px', borderRadius: 100,
              background: 'var(--accent)', color: 'var(--accent-ink)',
              textDecoration: 'none', fontWeight: 600,
              fontSize: 'clamp(15px, 2vw, 18px)',
              transition: 'transform .2s ease, filter .2s ease',
            }}
            onMouseEnter={hoverIn}
            onMouseLeave={hoverOut}
          >
            georgepxto@gmail.com →
          </a>

          {/* TODO: Replace with real WhatsApp number — currently using placeholder 5511999999999 */}
          <a
            href="https://wa.me/5586994767818"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '18px 34px', borderRadius: 100,
              background: '#25D366', color: '#ffffff',
              textDecoration: 'none', fontWeight: 600,
              fontSize: 'clamp(15px, 2vw, 18px)',
              transition: 'transform .2s ease, filter .2s ease',
            }}
            onMouseEnter={hoverIn}
            onMouseLeave={hoverOut}
          >
            WhatsApp →
          </a>
        </div>
      </div>
    </section>
  )
}
