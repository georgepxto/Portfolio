const STEPS = [
  {
    num: '01',
    title: 'Conversa',
    desc: 'A gente bate um papo sobre sua ideia, seu público e o que você quer alcançar. Sem compromisso.',
    special: false,
    delay: 0,
  },
  {
    num: '02',
    title: 'Proposta',
    desc: 'Te mostro o que será feito, o prazo e o valor — tudo claro e por escrito, antes de começar.',
    special: false,
    delay: 0.08,
  },
  {
    num: '03',
    title: 'Desenvolvimento',
    desc: 'Crio seu site mostrando o progresso no caminho. Você dá sua opinião e ajustamos juntos.',
    special: false,
    delay: 0.16,
  },
  {
    num: '04',
    title: 'Site no ar',
    desc: 'Publico tudo funcionando e te ensino a mexer. E continuo por perto para o que precisar.',
    special: true,
    delay: 0.24,
  },
]

export default function HowItWorks() {
  return (
    <section id="como" style={{
      padding: 'clamp(72px, 14vh, 150px) clamp(20px, 5vw, 72px)',
      maxWidth: 1180,
      margin: '0 auto',
    }}>
      <div
        data-reveal=""
        style={{
          opacity: 0, transform: 'translateY(28px)',
          transition: 'opacity .8s cubic-bezier(.2,.7,.2,1), transform .8s cubic-bezier(.2,.7,.2,1)',
          display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end',
          justifyContent: 'space-between', gap: 18,
          marginBottom: 'clamp(34px, 5vw, 56px)',
        }}
      >
        <div>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: 'var(--accent)', letterSpacing: '.08em' }}>
            04 — COMO FUNCIONA
          </span>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600,
            fontSize: 'clamp(30px, 5vw, 58px)', lineHeight: 1.04,
            letterSpacing: '-.02em', margin: '14px 0 0',
          }}>
            Simples do início ao fim
          </h2>
        </div>
        <p style={{ maxWidth: '34ch', margin: 0, fontSize: 16, lineHeight: 1.55, color: 'var(--muted)' }}>
          Sem termos complicados. Você acompanha cada etapa e participa das decisões.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: 'clamp(18px, 2.2vw, 30px)',
      }}>
        {STEPS.map(({ num, title, desc, special, delay }) => (
          <div
            key={num}
            data-reveal=""
            style={{
              opacity: 0, transform: 'translateY(28px)',
              transition: `opacity .8s ${delay}s cubic-bezier(.2,.7,.2,1), transform .8s ${delay}s cubic-bezier(.2,.7,.2,1)`,
              padding: '28px 26px',
              border: '1px solid var(--border)',
              borderRadius: 20,
              background: 'var(--card)',
            }}
          >
            <div style={{
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 18,
              width: 42, height: 42, borderRadius: 12,
              display: 'grid', placeItems: 'center',
              background: special ? 'var(--accent2)' : 'color-mix(in srgb, var(--accent) 14%, transparent)',
              color: special ? '#15140f' : 'var(--accent)',
              marginBottom: 18,
            }}>
              {num}
            </div>
            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 20, margin: '0 0 8px' }}>
              {title}
            </h3>
            <p style={{ margin: 0, color: 'var(--muted)', fontSize: 15, lineHeight: 1.6 }}>{desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
