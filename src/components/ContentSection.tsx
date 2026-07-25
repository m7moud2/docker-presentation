import { useState } from 'react'
import type { Block, Section } from '../data/sections'
import { CodeBlock } from './CodeBlock'
import { Diagram } from './Diagram'

type Props = {
  section: Section
  index: number
}

function AskBlock({ q, a, why }: { q: string; a: string; why?: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`qa-card ask ${open ? 'is-open' : ''}`}>
      <button type="button" className="qa-q" onClick={() => setOpen((v) => !v)}>
        <span className="qa-role">سؤال الطالب</span>
        <span className="qa-text">{q}</span>
        <span className="qa-toggle">{open ? 'إخفاء الإجابة' : 'اعرض إجابة المدرّس'}</span>
      </button>
      {open && (
        <div className="qa-a">
          <span className="qa-role answer">إجابة المدرّس</span>
          <p>{a}</p>
          {why && <p className="qa-why">{why}</p>}
        </div>
      )}
    </div>
  )
}

function SeniorBlock({
  q,
  answerAr,
  sayEn,
  followUp,
}: {
  q: string
  answerAr: string
  sayEn: string
  followUp?: string
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`qa-card senior ${open ? 'is-open' : ''}`}>
      <button type="button" className="qa-q" onClick={() => setOpen((v) => !v)}>
        <span className="qa-role senior-role">سؤال سينيور</span>
        <span className="qa-text">{q}</span>
        <span className="qa-toggle">{open ? 'إخفاء الإجابة' : 'اعرض الإجابة والصياغة الإنجليزية'}</span>
      </button>
      {open && (
        <div className="qa-a">
          <span className="qa-role answer">الإجابة بالعربي</span>
          <p>{answerAr}</p>
          <span className="qa-role answer">الصياغة الإنجليزية لو الحوار إنجليزي</span>
          <p className="say-en" dir="ltr">
            {sayEn}
          </p>
          {followUp && <p className="qa-why">{followUp}</p>}
        </div>
      )}
    </div>
  )
}

function DeepBlock({
  term,
  en,
  what,
  why,
  how,
  use,
  withWhat,
  example,
  gotcha,
}: Extract<Block, { type: 'deep' }>) {
  const rows: { label: string; text: string }[] = [
    { label: 'إيه هي بالظبط', text: what },
    { label: 'فايدتها — بنستفاد منها إيه', text: why },
    { label: 'بتعمل إيه / بتشتغل إزاي', text: how },
    { label: 'بنستخدمها إزاي وإمتى', text: use },
    { label: 'بتتجمع مع إيه', text: withWhat },
  ]
  return (
    <section className="deep">
      <header className="deep-head">
        <span className="deep-badge">تفصيلة بالتفصيل</span>
        <h4>
          {term}
          {en && (
            <span className="deep-en" dir="ltr">
              {en}
            </span>
          )}
        </h4>
      </header>
      <dl className="deep-grid">
        {rows.map((r) => (
          <div key={r.label}>
            <dt>{r.label}</dt>
            <dd>{r.text}</dd>
          </div>
        ))}
      </dl>
      {example && <CodeBlock title={example.title} lang={example.lang} code={example.code} />}
      {gotcha && (
        <p className="deep-gotcha">
          <strong>غلطة شائعة:</strong> {gotcha}
        </p>
      )}
    </section>
  )
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case 'p':
      return <p className="prose">{block.text}</p>
    case 'h3':
      return <h3 className="section-h3">{block.text}</h3>
    case 'ul':
      return (
        <ul className="list">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )
    case 'ol':
      return (
        <ol className="list numbered">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      )
    case 'code':
      return <CodeBlock title={block.title} code={block.code} lang={block.lang} />
    case 'callout':
      return (
        <aside className={`callout tone-${block.tone ?? 'info'}`}>
          <strong>{block.title}</strong>
          <p>{block.text}</p>
        </aside>
      )
    case 'compare':
      return (
        <div className="compare">
          <div>
            <h4>{block.left.title}</h4>
            <ul>
              {block.left.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4>{block.right.title}</h4>
            <ul>
              {block.right.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )
    case 'table':
      return (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                {block.headers.map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row.join('|')}>
                  {row.map((cell) => (
                    <td key={cell}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    case 'steps':
      return (
        <ol className="steps">
          {block.items.map((item, i) => (
            <li key={item.title}>
              <span className="step-num">{i + 1}</span>
              <div>
                <h4>{item.title}</h4>
                <p>{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      )
    case 'teach':
      return (
        <aside className="teach">
          {block.title && <span className="teach-label">{block.title}</span>}
          <p>{block.text}</p>
        </aside>
      )
    case 'ask':
      return <AskBlock q={block.q} a={block.a} why={block.why} />
    case 'senior':
      return (
        <SeniorBlock
          q={block.q}
          answerAr={block.answerAr}
          sayEn={block.sayEn}
          followUp={block.followUp}
        />
      )
    case 'deep':
      return <DeepBlock {...block} />
    case 'diagram':
      return <Diagram kind={block.kind} caption={block.caption} />
    case 'resources':
      return (
        <ul className="resources">
          {block.items.map((r) => (
            <li key={r.url}>
              <span className="res-kind">{r.kind}</span>
              <a href={r.url} target="_blank" rel="noreferrer">
                {r.title}
              </a>
              <p>{r.note}</p>
            </li>
          ))}
        </ul>
      )
    case 'terms':
      return (
        <div className="terms">
          <div className="terms-head">مصطلحات EN ↔ AR</div>
          <ul>
            {block.items.map((t) => (
              <li key={t.en}>
                <span className="term-en" dir="ltr">
                  {t.en}
                </span>
                <span className="term-ar">{t.ar}</span>
                <span className="term-meaning">{t.meaning}</span>
              </li>
            ))}
          </ul>
        </div>
      )
    default:
      return null
  }
}

export function ContentSection({ section, index }: Props) {
  return (
    <section className="content-section reveal" id={section.id}>
      <header className="section-head">
        <span className="section-index">الفصل {String(index + 1).padStart(2, '0')}</span>
        <h2>{section.title}</h2>
        <p className="section-lead">{section.lead}</p>
      </header>
      <div className="section-body">
        {section.blocks.map((block, i) => (
          <BlockView key={`${section.id}-${i}`} block={block} />
        ))}
      </div>
    </section>
  )
}
