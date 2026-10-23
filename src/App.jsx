import { useMemo } from 'react'
import { useReveal, useCountUp, useScrollState, useTheme } from './hooks.js'
import {
  profile, stats, skills, experience, earlier, education, courses, languages, sections,
} from './data.js'

function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const [ref, shown] = useReveal()
  return (
    <Tag ref={ref} className={`reveal ${shown ? 'in' : ''} ${className}`} style={{ '--d': `${delay}ms` }} {...rest}>
      {children}
    </Tag>
  )
}

function LinkedInIcon() {
  return (
    <svg className="btn-ico" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/>
    </svg>
  )
}

function MailIcon() {
  return (
    <svg className="btn-ico" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  )
}

function PdfIcon() {
  return (
    <svg className="btn-ico" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M8 17v-4h1.5a1.2 1.2 0 0 1 0 2.4H8M13 17v-4h1a2 2 0 0 1 0 4h-1M18 13h-2v4M16 15h1.5" />
    </svg>
  )
}

function ContactIcon() {
  return (
    <svg className="btn-ico" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <path d="M8 9h8M8 13h5" />
    </svg>
  )
}

function Stat({ value, suffix, label, delay }) {
  const [ref, shown] = useReveal()
  const n = useCountUp(value, shown)
  return (
    <div ref={ref} className={`stat reveal ${shown ? 'in' : ''}`} style={{ '--d': `${delay}ms` }}>
      <b>{n}{suffix}</b>
      <span>{label}</span>
    </div>
  )
}

function Section({ id, title, children, className = '' }) {
  return (
    <section id={id} className={className}>
      <Reveal as="h2">{title}</Reveal>
      {children}
    </section>
  )
}

export default function App() {
  const ids = useMemo(() => sections.map(s => s[0]), [])
  const { progress, active, scrolled } = useScrollState(ids)
  const [theme, toggleTheme] = useTheme()

  return (
    <>
      <div className="progress" style={{ transform: `scaleX(${progress})` }} />

      <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="wrap">
          <nav>
            {sections.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={active === id ? 'active' : ''}>{label}</a>
            ))}
            <a className="cv" href="./Curriculo_Amaury.pdf" download="Curriculo_Amaury.pdf">Currículo PDF</a>
            <button className="theme" data-mode={theme} onClick={toggleTheme} role="switch" aria-checked={theme === 'dark'} aria-label="Alternar tema claro/escuro" title={theme === 'dark' ? 'Tema claro' : 'Tema escuro'}>
              <span className="ico"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg></span>
              <span className="ico"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/></svg></span>
              <span className="knob" />
            </button>
          </nav>
        </div>
      </header>

      <main className="wrap" id="top">
        <div className="hero">
          <div className="hero-text">
            <p className="eyebrow">Manaus · AM</p>
            <h1>{profile.name}</h1>
            <p className="role">{profile.role}</p>
            <p className="lead">{profile.lead}</p>
            <div className="btns">
              <a className="btn primary with-ico" href="./Curriculo_Amaury.pdf" download>Baixar currículo<PdfIcon /></a>
              <a className="btn with-ico" href="#contato"><ContactIcon />Entre em contato</a>
              <a className="btn with-ico" href={profile.linkedin} target="_blank" rel="noopener noreferrer"><LinkedInIcon />LinkedIn</a>
              <a className="btn with-ico" href={`mailto:${profile.email}`}><MailIcon />E-mail</a>
            </div>
          </div>
          <div className="photo">
            <img src="./amaury.jpeg" alt={`Foto de ${profile.name}`} />
          </div>
        </div>

        <Section id="sobre" title="Sobre mim">
          {profile.about.map((p, i) => <Reveal as="p" key={i} delay={i * 80}>{p}</Reveal>)}
          <div className="stats">
            {stats.map((s, i) => <Stat key={s.label} {...s} delay={i * 90} />)}
          </div>
        </Section>

        <Section id="competencias" title="Competências técnicas">
          <div className="grid">
            {skills.map((s, i) => (
              <Reveal key={s.title} className="card" delay={(i % 4) * 70}>
                <h3>{s.title}</h3>
                {s.text && <p>{s.text}</p>}
                {s.tags && <div className="tags">{s.tags.map(t => <span key={t} className="tag">{t}</span>)}</div>}
              </Reveal>
            ))}
          </div>
        </Section>

        <Section id="experiencia" title="Experiência profissional">
          <ol className="timeline">
            {experience.map((e, i) => (
              <Reveal as="li" key={e.org} delay={i * 50}>
                <h3>{e.role} · <span className="org">{e.org}</span></h3>
                <time>{e.period}</time>
                {e.text && <p>{e.text}</p>}
              </Reveal>
            ))}
          </ol>
          <details>
            <summary>Experiências anteriores (2000–2010)</summary>
            <ul>
              {earlier.map(([org, text]) => <li key={org}><b>{org}</b>, {text}</li>)}
            </ul>
          </details>
        </Section>

        <Section id="formacao" title="Formação e cursos">
          <div className="two">
            <Reveal>
              <h3>Formação acadêmica</h3>
              <ul className="list">
                {education.map(([t, s]) => <li key={t}>{t}<small>{s}</small></li>)}
              </ul>
              <h3 className="mt">Idiomas</h3>
              <ul className="list">
                {languages.map(([t, s]) => <li key={t}>{t}<small>{s}</small></li>)}
              </ul>
            </Reveal>
            <Reveal delay={100}>
              <h3>Cursos complementares</h3>
              <ul className="list">
                {courses.map(([t, s]) => <li key={t}>{t}<small>{s}</small></li>)}
              </ul>
            </Reveal>
          </div>
        </Section>

        <Section id="contato" title="Vamos conversar" className="contact">
          <Reveal as="p">Aberto a conversas sobre desenvolvimento, automação e engenharia de testes. Manaus – AM.</Reveal>
          <Reveal className="btns" delay={80}>
            <a className="btn primary with-ico" href={`mailto:${profile.email}`}><MailIcon />{profile.email}</a>
            <a className="btn with-ico" href={profile.linkedin} target="_blank" rel="noopener noreferrer"><LinkedInIcon />LinkedIn</a>
            <a className="btn with-ico" href="./Curriculo_Amaury.pdf" download="Curriculo_Amaury.pdf">Baixar currículo<PdfIcon /></a>
          </Reveal>
        </Section>
      </main>

      <footer>© {profile.name}</footer>
    </>
  )
}
