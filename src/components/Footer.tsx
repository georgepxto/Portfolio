export default function Footer() {
  const linkStyle: React.CSSProperties = {
    color: 'var(--fg)', textDecoration: 'none',
    opacity: .78, fontSize: 14,
    transition: 'opacity .15s',
  }

  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '32px clamp(20px, 5vw, 72px)',
      display: 'flex', flexWrap: 'wrap',
      alignItems: 'center', justifyContent: 'space-between',
      gap: 16, maxWidth: 1180, margin: '0 auto',
    }}>
      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: 'var(--muted)' }}>
        © 2026 George Peixoto
      </span>

      <div style={{ display: 'flex', gap: 22 }}>
        <a
          href="https://github.com/georgepxto"
          target="_blank"
          rel="noopener noreferrer"
          style={linkStyle}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '1' }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '.78' }}
        >
          GitHub
        </a>
        <a
          href="https://www.instagram.com/georgepxto"
          target="_blank"
          rel="noopener noreferrer"
          style={linkStyle}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '1' }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '.78' }}
        >
          Instagram
        </a>
      </div>
    </footer>
  )
}
