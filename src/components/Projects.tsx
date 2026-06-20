import type { CSSProperties, MouseEvent } from 'react'

const PROJECTS = [
  {
    name: 'Hedge',
    desc: 'App de finanças pessoais gratuito: registre gastos, veja para onde vai cada real e construa hábitos financeiros — sem anúncios, sem mensalidade.',
    tags: ['App web', 'Finanças'],
    image: '/hedge.png',
    imagePosition: 'top',
    stripeColor: 'var(--accent)',
    stripeOpacity: '14%',
    url: 'https://gethedge.vercel.app/',
    delay: 0,
  },
  {
    name: 'Lunna Pijama',
    desc: 'Link page personalizada para marca de pijamas de Teresina — um cartão digital com todos os contatos e redes sociais num só lugar, no estilo da marca.',
    tags: ['Link page', 'Identidade visual'],
    image: '/lunnapijama.png',
    imagePosition: 'top',
    stripeColor: 'var(--accent2)',
    stripeOpacity: '22%',
    url: 'https://www.lunnapijama.com.br/',
    delay: 0.08,
  },
  {
    name: 'Take One',
    desc: 'Dashboard completo para filmmakers: centralize clientes, projetos, calendário, valores e contratos em um só lugar.',
    tags: ['Dashboard', 'Gestão'],
    image: '/takeone.png',
    imagePosition: 'center',
    stripeColor: 'var(--accent)',
    stripeOpacity: '14%',
    url: null,
    delay: 0.16,
  },
  {
    name: 'Atlas',
    desc: 'Site para agência com animações suaves ao rolar — da identidade visual à publicação no ar.',
    tags: ['Site institucional', 'Animações'],
    image: undefined,
    imagePosition: 'top',
    stripeColor: 'var(--accent2)',
    stripeOpacity: '22%',
    url: null,
    delay: 0.24,
  },
]

export default function Projects() {
  return (
    <section id="projetos" style={{
      padding: 'clamp(64px, 12vh, 120px) clamp(20px, 5vw, 72px)',
      background: 'color-mix(in srgb, var(--card) 50%, transparent)',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
    }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
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
              03 — PROJETOS
            </span>
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600,
              fontSize: 'clamp(30px, 5vw, 58px)', lineHeight: 1.04,
              letterSpacing: '-.02em', margin: '14px 0 0',
            }}>
              Trabalhos selecionados
            </h2>
          </div>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: 'var(--muted)' }}>
            (2023 — 2026)
          </span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
          gap: 'clamp(18px, 2.2vw, 30px)',
        }}>
          {PROJECTS.map((p) => (
            <ProjectCard key={p.name} {...p} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({
  name, desc, tags, image, imagePosition, stripeColor, stripeOpacity, url, delay,
}: typeof PROJECTS[0]) {
  const enter = (e: MouseEvent<HTMLElement>) => {
    e.currentTarget.style.transform = 'translateY(-6px)'
    e.currentTarget.style.borderColor = 'var(--accent)'
  }
  const leave = (e: MouseEvent<HTMLElement>) => {
    e.currentTarget.style.transform = ''
    e.currentTarget.style.borderColor = 'var(--border)'
  }

  const revealStyle: CSSProperties = {
    opacity: 0, transform: 'translateY(30px)',
    transition: `opacity .8s ${delay}s cubic-bezier(.2,.7,.2,1), transform .8s ${delay}s cubic-bezier(.2,.7,.2,1), border-color .2s ease`,
    background: 'var(--bg)',
    border: '1px solid var(--border)',
    borderRadius: 20, overflow: 'hidden',
    cursor: url ? 'pointer' : 'default',
    textDecoration: 'none',
    color: 'inherit',
    display: 'block',
  }

  const inner = (
    <>
      <div style={{ aspectRatio: '4/3', position: 'relative', overflow: 'hidden' }}>
        {image ? (
          <img
            src={image}
            alt={`Screenshot do projeto ${name}`}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: imagePosition, display: 'block' }}
          />
        ) : (
          /* TODO: Replace placeholder with real project screenshot */
          <div style={{
            width: '100%', height: '100%',
            background: `repeating-linear-gradient(45deg, color-mix(in srgb, ${stripeColor} ${stripeOpacity}, var(--card)) 0 11px, var(--card) 11px 22px)`,
            display: 'grid', placeItems: 'center',
          }}>
            <span style={{
              fontFamily: "'Space Mono', monospace", fontSize: 11, color: 'var(--muted)',
              background: 'var(--bg)', padding: '5px 10px',
              borderRadius: 6, border: '1px solid var(--border)',
            }}>
              project shot — {name}
            </span>
          </div>
        )}
      </div>

      <div style={{ padding: '22px 22px 26px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 22, margin: 0 }}>
            {name}
          </h3>
          <span style={{ fontSize: 20, flexShrink: 0 }}>↗</span>
        </div>
        <p style={{ margin: '8px 0 16px', color: 'var(--muted)', fontSize: 15, lineHeight: 1.55 }}>{desc}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
          {tags.map((tag) => (
            <span key={tag} style={{
              fontFamily: "'Space Mono', monospace", fontSize: 11,
              padding: '5px 10px', borderRadius: 100,
              background: 'color-mix(in srgb, var(--accent) 14%, transparent)',
              color: 'var(--accent)',
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </>
  )

  return url ? (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      data-reveal=""
      style={revealStyle}
      onMouseEnter={enter}
      onMouseLeave={leave}
    >
      {inner}
    </a>
  ) : (
    <article data-reveal="" style={revealStyle} onMouseEnter={enter} onMouseLeave={leave}>
      {inner}
    </article>
  )
}
