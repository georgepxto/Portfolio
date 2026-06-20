import { useState, useEffect } from 'react'

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [wide, setWide] = useState(() => window.innerWidth > 720)

  useEffect(() => {
    const handler = () => {
      const isWide = window.innerWidth > 720
      setWide(isWide)
      if (isWide) setMenuOpen(false)
    }
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  const close = () => setMenuOpen(false)

  const navLinks = [
    { href: '#sobre', label: 'Sobre' },
    { href: '#projetos', label: 'Projetos' },
    { href: '#contato', label: 'Contato' },
  ]

  return (
    <>
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '18px clamp(20px, 5vw, 72px)',
        WebkitBackdropFilter: 'saturate(1.4) blur(14px)',
        backdropFilter: 'saturate(1.4) blur(14px)',
        background: 'color-mix(in srgb, var(--bg) 78%, transparent)',
        borderBottom: '1px solid var(--border)',
      }}>
        {/* Logo */}
        <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: 11, textDecoration: 'none', color: 'var(--fg)' }}>
          <span style={{
            width: 30, height: 30, borderRadius: 9,
            background: 'var(--accent)',
            display: 'grid', placeItems: 'center',
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700, color: 'var(--accent-ink)', fontSize: 16,
            flexShrink: 0,
          }}>G</span>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, letterSpacing: '.02em' }}>
            george<span style={{ color: 'var(--muted)' }}>.dev</span>
          </span>
        </a>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(12px, 2.4vw, 32px)' }}>
          {/* Desktop nav links */}
          {wide && (
            <div style={{ display: 'flex', gap: 'clamp(14px, 2vw, 30px)' }}>
              {navLinks.map(({ href, label }) => (
                <NavLink key={href} href={href}>{label}</NavLink>
              ))}
            </div>
          )}

          {/* Hamburger (mobile only) */}
          {!wide && (
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
              style={{
                display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 5,
                background: 'none', border: 'none', cursor: 'pointer', padding: 4,
                width: 30, height: 30,
              }}
            >
              <Bar style={{ transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none' }} />
              <Bar style={{ opacity: menuOpen ? 0 : 1 }} />
              <Bar style={{ transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none' }} />
            </button>
          )}
        </div>
      </nav>

      {/* Mobile overlay menu */}
      {!wide && menuOpen && (
        <div className="mobile-menu">
          {navLinks.map(({ href, label }) => (
            <a key={href} href={href} onClick={close}>{label}</a>
          ))}
        </div>
      )}
    </>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      style={{ color: 'var(--fg)', textDecoration: 'none', opacity: .78, fontSize: 14, transition: 'opacity .15s' }}
      onMouseEnter={(e) => { e.currentTarget.style.opacity = '1' }}
      onMouseLeave={(e) => { e.currentTarget.style.opacity = '.78' }}
    >
      {children}
    </a>
  )
}

function Bar({ style }: { style?: React.CSSProperties }) {
  return (
    <span style={{
      display: 'block', width: 22, height: 2,
      background: 'var(--fg)', borderRadius: 1,
      transition: 'transform .22s ease, opacity .22s ease',
      ...style,
    }} />
  )
}
