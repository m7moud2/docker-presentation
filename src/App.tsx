import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { sections } from './data/sections'
import { Hero } from './components/Hero'
import { Sidebar, navItems } from './components/Sidebar'
import { ContentSection } from './components/ContentSection'
import { Quiz } from './components/Quiz'
import { quiz } from './data/quiz'
import './App.css'

const quizQuestionCount = quiz.length

export default function App() {
  const [activeId, setActiveId] = useState(sections[0].id)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrollPct, setScrollPct] = useState(0)
  const [showTop, setShowTop] = useState(false)

  const activeIndex = useMemo(
    () => Math.max(0, navItems.findIndex((n) => n.id === activeId)),
    [activeId],
  )

  useEffect(() => {
    const nodes = navItems
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[]

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target.id) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-20% 0px -55% 0px', threshold: [0.1, 0.35, 0.6] },
    )

    nodes.forEach((n) => observer.observe(n))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      const max = el.scrollHeight - el.clientHeight
      const pct = max > 0 ? (el.scrollTop / max) * 100 : 0
      setScrollPct(pct)
      setShowTop(el.scrollTop > 600)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const goTo = (id: string) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="app">
      <div className="bg-grid" aria-hidden />
      <div className="bg-wash" aria-hidden />
      <div className="scroll-progress" style={{ width: `${scrollPct}%` }} aria-hidden />

      <header className="topbar">
        <a
          className="brand"
          href="#top"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        >
          <span className="brand-mark" aria-hidden />
          <span className="brand-text">Docker</span>
        </a>

        <div className="topbar-meta">
          <span className="chapter-pill">
            {activeId === 'quiz' ? 'اختبار' : `${String(activeIndex + 1).padStart(2, '0')} / ${navItems.length}`}
          </span>
          <button type="button" className="top-quiz" onClick={() => goTo('quiz')}>
            اختبر نفسك
          </button>
          <button
            className="menu-btn"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="sidebar"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? 'إغلاق' : 'الفهرس'}
          </button>
        </div>
      </header>

      <div className="shell">
        <Sidebar
          open={menuOpen}
          activeId={activeId}
          onNavigate={goTo}
          onClose={() => setMenuOpen(false)}
        />

        <main className="main">
          <Hero onStart={() => goTo(sections[0].id)} onQuiz={() => goTo('quiz')} />
          {sections.map((section, i) => (
            <ContentSection key={section.id} section={section} index={i} />
          ))}

          <section className="content-section quiz-section" id="quiz">
            <header className="section-head">
              <span className="section-index">اختبار</span>
              <h2>اختبر نفسك — بنك أسئلة بمستويات</h2>
              <p className="section-lead">
                {quizQuestionCount} سؤال مقسّمين على أربع مستويات، وكل سؤال بعد إجابته بيشرحلك السبب.
                ابدأ بالمستوى اللي يريحك، وبعدين جرّب مستوى السينيور.
              </p>
            </header>
            <div className="section-body">
              <Quiz />
            </div>
          </section>

          <footer className="site-footer">
            <p>شرح حواري: مدرّس يشرح كل تفصيلة، طالب يسأل، وأسئلة سينيور بالعربي مع الصياغة الإنجليزية.</p>
            <p className="muted">اقرأ · طبّق الأوامر بيدك · اشرحها بصوت عالي · بعدين اختبر نفسك.</p>
            <a
              className="footer-link"
              href="https://github.com/m7moud2/docker-presentation"
              target="_blank"
              rel="noreferrer"
            >
              المشروع على GitHub
            </a>
          </footer>
        </main>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.button
            type="button"
            className="backdrop"
            aria-label="إغلاق القائمة"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showTop && (
          <motion.button
            type="button"
            className="back-top"
            aria-label="الرجوع للأعلى"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            ↑
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
