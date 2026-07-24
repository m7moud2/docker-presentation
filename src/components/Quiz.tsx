import { useMemo, useState } from 'react'
import { levelMeta, quiz, type QuizLevel, type QuizQuestion } from '../data/quiz'

type Filter = QuizLevel | 'all'

const filters: { id: Filter; label: string }[] = [
  { id: 'all', label: 'كل المستويات' },
  { id: 'basic', label: levelMeta.basic.label },
  { id: 'mid', label: levelMeta.mid.label },
  { id: 'advanced', label: levelMeta.advanced.label },
  { id: 'senior', label: levelMeta.senior.label },
]

const optionMarks = ['أ', 'ب', 'ج', 'د', 'هـ']

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr]
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

function verdict(pct: number) {
  if (pct >= 90) return { title: 'مستوى ممتاز', text: 'إجاباتك على مستوى حد بيشتغل بالفعل بـ Docker. جاهز للأسئلة الصعبة.' }
  if (pct >= 75) return { title: 'مستوى قوي', text: 'الأساس متين. راجع الأسئلة اللي غلطت فيها وهتوصل لمستوى ممتاز.' }
  if (pct >= 50) return { title: 'مستوى متوسط', text: 'فاهم الأساسيات لكن التفاصيل محتاجة تثبيت. ارجع لفصول الكاش والشبكات والتخزين.' }
  return { title: 'محتاج مراجعة', text: 'ابدأ من فصول ما هو Docker والصور والحاويات، وطبّق الأوامر بيدك قبل الاختبار تاني.' }
}

export function Quiz() {
  const [filter, setFilter] = useState<Filter>('all')
  const [started, setStarted] = useState(false)
  const [pool, setPool] = useState<QuizQuestion[]>([])
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [done, setDone] = useState(false)

  const available = useMemo(
    () => (filter === 'all' ? quiz : quiz.filter((q) => q.level === filter)),
    [filter],
  )

  const start = (questions: QuizQuestion[]) => {
    setPool(shuffle(questions))
    setIndex(0)
    setPicked(null)
    setAnswers({})
    setDone(false)
    setStarted(true)
  }

  const current = pool[index]

  const choose = (i: number) => {
    if (picked !== null) return
    setPicked(i)
    setAnswers((prev) => ({ ...prev, [current.id]: i }))
  }

  const next = () => {
    if (index + 1 >= pool.length) {
      setDone(true)
      return
    }
    setIndex((v) => v + 1)
    setPicked(null)
  }

  const correctCount = pool.filter((q) => answers[q.id] === q.correct).length
  const wrong = pool.filter((q) => answers[q.id] !== undefined && answers[q.id] !== q.correct)
  const pct = pool.length ? Math.round((correctCount / pool.length) * 100) : 0

  if (!started) {
    return (
      <div className="quiz-intro">
        <p className="quiz-hint">
          اختر المستوى وابدأ. كل سؤال بعد إجابته بيوريك الصح والسبب — عشان الاختبار يبقى تعلّم مش تقييم بس.
        </p>
        <div className="quiz-filters">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              className={`chip ${filter === f.id ? 'is-on' : ''}`}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
        {filter !== 'all' && <p className="quiz-level-desc">{levelMeta[filter].desc}</p>}
        <div className="quiz-actions">
          <button type="button" className="btn-primary" onClick={() => start(available)}>
            ابدأ الاختبار ({available.length} سؤال)
          </button>
          <button type="button" className="btn-ghost" onClick={() => start(shuffle(quiz).slice(0, 10))}>
            اختبار سريع — 10 أسئلة
          </button>
        </div>
        <div className="quiz-stats">
          {(['basic', 'mid', 'advanced', 'senior'] as QuizLevel[]).map((lv) => (
            <div key={lv}>
              <span className="qs-num">{quiz.filter((q) => q.level === lv).length}</span>
              <span className="qs-label">{levelMeta[lv].label}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (done) {
    const v = verdict(pct)
    return (
      <div className="quiz-result">
        <div className="score-ring" style={{ ['--pct' as string]: `${pct}` }}>
          <span>{pct}%</span>
        </div>
        <h3>{v.title}</h3>
        <p className="quiz-score-line">
          إجابات صحيحة: {correctCount} من {pool.length}
        </p>
        <p className="quiz-hint">{v.text}</p>

        {wrong.length > 0 && (
          <div className="review">
            <h4>مراجعة اللي غلطت فيه ({wrong.length})</h4>
            {wrong.map((q) => (
              <div className="review-card" key={q.id}>
                <span className="review-topic">
                  {levelMeta[q.level].label} · {q.topic}
                </span>
                <p className="review-q">{q.q}</p>
                <p className="review-bad">اختيارك: {q.options[answers[q.id]]}</p>
                <p className="review-good">الصح: {q.options[q.correct]}</p>
                <p className="review-why">{q.explain}</p>
              </div>
            ))}
          </div>
        )}

        <div className="quiz-actions">
          {wrong.length > 0 && (
            <button type="button" className="btn-primary" onClick={() => start(wrong)}>
              أعِد اختبار الغلط فقط
            </button>
          )}
          <button type="button" className="btn-ghost" onClick={() => setStarted(false)}>
            رجوع لاختيار المستوى
          </button>
        </div>
      </div>
    )
  }

  const isRight = picked === current.correct

  return (
    <div className="quiz-run">
      <div className="quiz-top">
        <span className="quiz-progress-text">
          سؤال {index + 1} من {pool.length}
        </span>
        <span className="quiz-badge">
          {levelMeta[current.level].label} · {current.topic}
        </span>
      </div>
      <div className="quiz-bar">
        <div style={{ width: `${((index + (picked !== null ? 1 : 0)) / pool.length) * 100}%` }} />
      </div>

      <p className="quiz-q">{current.q}</p>

      <div className="quiz-options">
        {current.options.map((opt, i) => {
          const state =
            picked === null
              ? ''
              : i === current.correct
                ? 'is-correct'
                : i === picked
                  ? 'is-wrong'
                  : 'is-dim'
          return (
            <button key={opt} type="button" className={`quiz-opt ${state}`} onClick={() => choose(i)}>
              <span className="opt-mark">{optionMarks[i] ?? i + 1}</span>
              <span>{opt}</span>
            </button>
          )
        })}
      </div>

      {picked !== null && (
        <div className={`quiz-feedback ${isRight ? 'good' : 'bad'}`}>
          <strong>{isRight ? 'إجابة صحيحة' : 'إجابة غير صحيحة'}</strong>
          <p>{current.explain}</p>
          <button type="button" className="btn-primary" onClick={next}>
            {index + 1 >= pool.length ? 'اعرض النتيجة' : 'السؤال اللي بعده'}
          </button>
        </div>
      )}
    </div>
  )
}
