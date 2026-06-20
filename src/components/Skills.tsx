const SKILLS = [
  'Sites institucionais',
  'Lojas online',
  'Aplicativos web',
  'Landing pages',
  'Links personalizados',
  'Painéis e dashboards',
  'Animações e efeitos',
  'Design de interfaces',
  'Sites rápidos e leves',
  'Integração com sistemas',
]

export default function Skills() {
  return (
    <section id="skills" style={{
      padding: '0 clamp(20px, 5vw, 72px) clamp(72px, 14vh, 150px)',
      maxWidth: 1180,
      margin: '0 auto',
    }}>
      <div
        data-reveal=""
        style={{
          opacity: 0, transform: 'translateY(28px)',
          transition: 'opacity .8s cubic-bezier(.2,.7,.2,1), transform .8s cubic-bezier(.2,.7,.2,1)',
          display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 34,
        }}
      >
        <span style={{
          fontFamily: "'Space Mono', monospace", fontSize: 12,
          color: 'var(--accent)', letterSpacing: '.08em', whiteSpace: 'nowrap',
        }}>
          02 — O QUE FAÇO
        </span>
        <span style={{ height: 1, flex: 1, background: 'var(--border)', display: 'block' }} />
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
        {SKILLS.map((skill, i) => (
          <span
            key={skill}
            data-reveal=""
            style={{
              opacity: 0,
              transform: 'translateY(20px)',
              transition: `opacity .6s ${i * 0.04}s cubic-bezier(.2,.7,.2,1), transform .6s ${i * 0.04}s cubic-bezier(.2,.7,.2,1)`,
              display: 'inline-flex', alignItems: 'center',
              padding: '12px 20px',
              border: '1px solid var(--border)',
              borderRadius: 100,
              fontSize: 15,
              background: 'var(--card)',
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  )
}
