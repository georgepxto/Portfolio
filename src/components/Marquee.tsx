const ITEMS = ['Sites modernos', 'Lojas online', 'Aplicativos web', 'Dashboards', 'Landing pages', 'Animações']

function Track({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <div aria-hidden={ariaHidden} style={{ display: 'flex', alignItems: 'center', gap: 38, paddingRight: 38 }}>
      {ITEMS.map((item, i) => (
        <span key={i} style={{ display: 'contents' }}>
          <span style={{ whiteSpace: 'nowrap' }}>{item}</span>
          <span style={{ color: 'var(--accent)' }}>✦</span>
        </span>
      ))}
    </div>
  )
}

export default function Marquee() {
  return (
    <div style={{
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      overflow: 'hidden',
      padding: '16px 0',
      background: 'color-mix(in srgb, var(--card) 40%, transparent)',
    }}>
      <div style={{
        display: 'flex',
        width: 'max-content',
        animation: 'marquee 26s linear infinite',
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 600,
        fontSize: 'clamp(20px, 3vw, 34px)',
        letterSpacing: '-.01em',
      }}>
        <Track />
        <Track ariaHidden />
      </div>
    </div>
  )
}
