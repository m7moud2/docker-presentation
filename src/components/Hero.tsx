import { motion } from 'framer-motion'

type Props = {
  onStart: () => void
  onQuiz: () => void
}

const features = [
  { label: 'رسومات توضيحية', hint: '11 رسمة' },
  { label: 'تفصيلة بالتفصيل', hint: 'كل مفهوم' },
  { label: 'اختبار بمستويات', hint: '48 سؤال' },
]

export function Hero({ onStart, onQuiz }: Props) {
  return (
    <section className="hero" id="top">
      <div className="hero-copy">
        <p className="hero-kicker">شرح احترافي · رسومات · اختبار بمستويات</p>
        <h1 className="hero-brand">Docker</h1>
        <p className="hero-lead">
          كل تفصيلة بالعربي: إيه هي، فايدتها، بتعمل إيه، بنستخدمها إزاي ومع إيه — مع رسومات وأمثلة ومصادر، وأسئلة كتير، وقسم اختبار عالي المستوى.
        </p>

        <ul className="hero-features">
          {features.map((f) => (
            <li key={f.label}>
              <strong>{f.label}</strong>
              <span>{f.hint}</span>
            </li>
          ))}
        </ul>

        <div className="hero-actions">
          <button type="button" className="btn-primary" onClick={onStart}>
            ابدأ الشرح
          </button>
          <button type="button" className="btn-ghost" onClick={onQuiz}>
            اختبر نفسك
          </button>
        </div>
      </div>

      <motion.div
        className="hero-visual"
        aria-hidden
        initial={{ opacity: 0.85, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
      >
        <div className="ship">
          <div className="whale">
            <svg viewBox="0 0 420 280" className="whale-svg">
              <defs>
                <linearGradient id="sea" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#0693E3" />
                  <stop offset="100%" stopColor="#0A4D68" />
                </linearGradient>
                <linearGradient id="glow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7FCFEF" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#0693E3" stopOpacity="0" />
                </linearGradient>
              </defs>
              <ellipse cx="210" cy="120" rx="160" ry="90" fill="url(#glow)" />
              <path
                className="wave wave-a"
                d="M0 210 C70 180 120 240 190 210 C260 180 310 240 420 200 L420 280 L0 280 Z"
                fill="url(#sea)"
                opacity="0.35"
              />
              <path
                className="wave wave-b"
                d="M0 230 C80 200 140 250 210 225 C290 195 340 250 420 220 L420 280 L0 280 Z"
                fill="url(#sea)"
                opacity="0.55"
              />
              <g className="crates">
                <rect x="150" y="118" width="42" height="34" rx="4" fill="#E8F6FF" />
                <rect x="198" y="118" width="42" height="34" rx="4" fill="#B8E3FF" />
                <rect x="246" y="118" width="42" height="34" rx="4" fill="#E8F6FF" />
                <rect x="198" y="78" width="42" height="34" rx="4" fill="#7FCFEF" />
              </g>
              <ellipse cx="230" cy="168" rx="118" ry="46" fill="#0B6E99" />
              <path d="M320 150 C360 145 390 160 400 175 C370 185 340 180 320 170 Z" fill="#0B6E99" />
              <circle cx="318" cy="155" r="5" fill="#E8F6FF" />
            </svg>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
