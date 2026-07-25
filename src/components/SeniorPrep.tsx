import { useMemo, useState } from 'react'
import { prepTopics, seniorPrep, type PrepTopic, type SeniorQA } from '../data/senior-prep'

type Filter = PrepTopic | 'all'

function PrepCard({ item, index }: { item: SeniorQA; index: number }) {
  const [open, setOpen] = useState(false)
  const topicLabel = prepTopics.find((t) => t.id === item.topic)?.label ?? ''
  return (
    <article className={`prep-card ${open ? 'is-open' : ''}`}>
      <button type="button" className="prep-q" onClick={() => setOpen((v) => !v)}>
        <span className="prep-num">Q{String(index + 1).padStart(2, '0')}</span>
        <span className="prep-q-body">
          <span className="prep-topic">{topicLabel}</span>
          <span className="prep-q-text">{item.q}</span>
        </span>
        <span className="prep-caret" aria-hidden>
          {open ? '−' : '+'}
        </span>
      </button>

      {open && (
        <div className="prep-a">
          <div className="prep-radar">
            <span className="prep-tag radar">السينيور بيقيس فيك إيه</span>
            <p>{item.radar}</p>
          </div>

          <div className="prep-answer">
            <span className="prep-tag answer">الجواب — عربي + تقني إنجليزي</span>
            <p>{item.answerAr}</p>
          </div>

          <div className="prep-say">
            <span className="prep-tag say">جملة جاهزة تقولها (English)</span>
            <p dir="ltr">{item.sayEn}</p>
          </div>

          <div className="prep-split">
            <div className="prep-trap">
              <span className="prep-tag trap">الفخ اللي تتجنبه</span>
              <p>{item.trap}</p>
            </div>
            <div className="prep-next">
              <span className="prep-tag next">السؤال اللي بعده متوقع</span>
              <p>{item.next}</p>
            </div>
          </div>
        </div>
      )}
    </article>
  )
}

export function SeniorPrep() {
  const [filter, setFilter] = useState<Filter>('all')
  const [openAll, setOpenAll] = useState(false)

  const filters: { id: Filter; label: string }[] = [
    { id: 'all', label: 'الكل' },
    ...prepTopics,
  ]

  const list = useMemo(
    () => (filter === 'all' ? seniorPrep : seniorPrep.filter((q) => q.topic === filter)),
    [filter],
  )

  return (
    <div className="prep">
      <div className="prep-intro">
        <p className="prep-hint">
          دي أسئلة السينيور المتوقّعة بصياغة واقعية زي ما بتتسأل في الشغل والإنترفيو. كل سؤال بيوريك
          <strong> نيّة السؤال</strong>، وجواب <strong>عربي بمصطلحات إنجليزية تقنية</strong>، وجملة
          إنجليزية جاهزة، والفخ، والسؤال اللي غالبًا هييجي بعده. اقرأها بصوت عالي كأنك بترد فعلاً.
        </p>
        <div className="prep-controls">
          <div className="prep-filters">
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
          <button type="button" className="prep-expand" onClick={() => setOpenAll((v) => !v)}>
            {openAll ? 'اطوِ الكل' : 'افتح الكل'}
          </button>
        </div>
        <p className="prep-count">{list.length} سؤال في العرض الحالي</p>
      </div>

      <div className="prep-list" key={openAll ? 'all-open' : `list-${filter}`}>
        {list.map((item, i) =>
          openAll ? (
            <PrepCardStatic item={item} index={i} key={item.id} />
          ) : (
            <PrepCard item={item} index={i} key={item.id} />
          ),
        )}
      </div>
    </div>
  )
}

function PrepCardStatic({ item, index }: { item: SeniorQA; index: number }) {
  const topicLabel = prepTopics.find((t) => t.id === item.topic)?.label ?? ''
  return (
    <article className="prep-card is-open">
      <div className="prep-q as-static">
        <span className="prep-num">Q{String(index + 1).padStart(2, '0')}</span>
        <span className="prep-q-body">
          <span className="prep-topic">{topicLabel}</span>
          <span className="prep-q-text">{item.q}</span>
        </span>
      </div>
      <div className="prep-a">
        <div className="prep-radar">
          <span className="prep-tag radar">السينيور بيقيس فيك إيه</span>
          <p>{item.radar}</p>
        </div>
        <div className="prep-answer">
          <span className="prep-tag answer">الجواب — عربي + تقني إنجليزي</span>
          <p>{item.answerAr}</p>
        </div>
        <div className="prep-say">
          <span className="prep-tag say">جملة جاهزة تقولها (English)</span>
          <p dir="ltr">{item.sayEn}</p>
        </div>
        <div className="prep-split">
          <div className="prep-trap">
            <span className="prep-tag trap">الفخ اللي تتجنبه</span>
            <p>{item.trap}</p>
          </div>
          <div className="prep-next">
            <span className="prep-tag next">السؤال اللي بعده متوقع</span>
            <p>{item.next}</p>
          </div>
        </div>
      </div>
    </article>
  )
}
