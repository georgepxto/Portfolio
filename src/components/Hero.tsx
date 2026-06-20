export default function Hero() {
  return (
    <header id="top" style={{
      position: 'relative',
      padding: 'clamp(64px, 12vh, 140px) clamp(20px, 5vw, 72px) clamp(48px, 9vh, 110px)',
      overflow: 'hidden',
    }}>
      {/* Decorative blobs */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', top: '-12%', right: '4%',
          width: '46vw', height: '46vw', maxWidth: 560, maxHeight: 560,
          background: 'var(--accent)', borderRadius: '50%',
          filter: 'blur(80px)', opacity: .2,
          animation: 'floatA 13s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', bottom: '-18%', left: '-6%',
          width: '42vw', height: '42vw', maxWidth: 520, maxHeight: 520,
          background: 'var(--accent2)', borderRadius: '50%',
          filter: 'blur(82px)', opacity: .22,
          animation: 'floatB 16s ease-in-out infinite',
        }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1180, margin: '0 auto' }}>
        {/* Editorial label */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 14,
          opacity: 0,
          animation: 'heroUp .8s .05s cubic-bezier(.2,.7,.2,1) forwards',
        }}>
          <span style={{ display: 'block', width: 36, height: 2, background: 'var(--accent)', borderRadius: 1 }} />
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, letterSpacing: '.12em', color: 'var(--muted)', textTransform: 'uppercase' }}>
            Desenvolvedor Web
          </span>
        </div>

        {/* Name */}
        <h1 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          lineHeight: .92,
          letterSpacing: '-.03em',
          fontSize: 'clamp(54px, 12vw, 178px)',
          margin: '26px 0 0',
        }}>
          <span style={{ display: 'block', opacity: 0, animation: 'heroUp .9s .12s cubic-bezier(.2,.7,.2,1) forwards' }}>
            George
          </span>
          <span style={{ display: 'block', opacity: 0, animation: 'heroUp .9s .22s cubic-bezier(.2,.7,.2,1) forwards' }}>
            Peixoto<span style={{ color: 'var(--accent)' }}>.</span>
          </span>
        </h1>

        {/* Subtitle + CTA */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end',
          justifyContent: 'space-between', gap: 32,
          marginTop: 'clamp(28px, 5vh, 52px)',
        }}>
          <p style={{
            maxWidth: 520, margin: 0,
            fontSize: 'clamp(17px, 2vw, 22px)', lineHeight: 1.5,
            color: 'var(--fg)',
            opacity: 0,
            animation: 'heroUp .9s .34s cubic-bezier(.2,.7,.2,1) forwards',
          }}>
            <strong style={{ fontWeight: 500 }}>Faço sites e aplicativos que as pessoas adoram usar.</strong>{' '}
            <span style={{ color: 'var(--muted)' }}>
              Cuido de tudo — da aparência ao funcionamento — para que o seu negócio brilhe na internet.
            </span>
          </p>

          <div style={{ opacity: 0, animation: 'heroUp .9s .44s cubic-bezier(.2,.7,.2,1) forwards' }}>
            <a
              href="#contato"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '14px 24px', borderRadius: 100,
                background: 'var(--accent)', color: 'var(--accent-ink)',
                textDecoration: 'none', fontWeight: 500, fontSize: 15,
                transition: 'transform .2s ease, filter .2s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.filter = 'brightness(1.06)' }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.filter = '' }}
            >
              Falar comigo →
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
