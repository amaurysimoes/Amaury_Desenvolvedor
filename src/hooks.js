import { useEffect, useRef, useState } from 'react'

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Marca o elemento como visível quando entra na viewport (fade + subida suave). */
export function useReveal() {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    if (reduced()) return setShown(true)
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShown(true); io.disconnect() }
    }, { threshold: 0.12 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  return [ref, shown]
}

/** Contagem animada até `target` quando visível. */
export function useCountUp(target, shown, ms = 1200) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!shown) return
    if (reduced()) return setN(target)
    let raf, t0
    const tick = (t) => {
      t0 ??= t
      const p = Math.min((t - t0) / ms, 1)
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [shown, target, ms])
  return n
}

/** Progresso de rolagem (0–1), seção ativa e se a página já rolou. */
export function useScrollState(ids) {
  const [progress, setProgress] = useState(0)
  const [active, setActive] = useState(ids[0])
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      setProgress(h.scrollTop / Math.max(h.scrollHeight - h.clientHeight, 1))
      setScrolled(h.scrollTop > 8)
      let cur = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.35) cur = id
      }
      setActive(cur)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [ids])
  return { progress, active, scrolled }
}

/** Tema claro/escuro com preferência salva. */
export function useTheme() {
  const [theme, setTheme] = useState(() => {
    try { const s = localStorage.getItem('theme'); if (s) return s } catch { /* sem storage */ }
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  })
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try { localStorage.setItem('theme', theme) } catch { /* sem storage */ }
  }, [theme])
  return [theme, () => setTheme(t => (t === 'dark' ? 'light' : 'dark'))]
}
