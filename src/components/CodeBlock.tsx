import { useState } from 'react'

type Props = {
  code: string
  title?: string
  lang?: string
}

export function CodeBlock({ code, title, lang }: Props) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="code-block">
      <div className="code-toolbar">
        <div className="code-meta">
          {title && <span className="code-title">{title}</span>}
          {lang && <span className="code-lang">{lang}</span>}
        </div>
        <button type="button" className="copy-btn" onClick={copy}>
          {copied ? 'تم النسخ' : 'نسخ'}
        </button>
      </div>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  )
}
