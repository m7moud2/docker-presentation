import { sections } from '../data/sections'

type Props = {
  open: boolean
  activeId: string
  onNavigate: (id: string) => void
  onClose: () => void
}

export const navItems = [
  ...sections.map((s) => ({ id: s.id, nav: s.nav })),
  { id: 'senior-prep', nav: 'أسئلة السينيور' },
  { id: 'quiz', nav: 'اختبر نفسك' },
]

export function Sidebar({ open, activeId, onNavigate, onClose }: Props) {
  return (
    <aside id="sidebar" className={`sidebar ${open ? 'is-open' : ''}`}>
      <div className="sidebar-head">
        <span>المحتويات</span>
        <button type="button" className="sidebar-close" onClick={onClose} aria-label="إغلاق">
          ×
        </button>
      </div>
      <nav className="sidebar-nav" aria-label="فهرس الشرح">
        {navItems.map((item, i) => (
          <button
            key={item.id}
            type="button"
            className={`nav-item ${activeId === item.id ? 'is-active' : ''} ${
              item.id === 'quiz' || item.id === 'senior-prep' ? 'nav-quiz' : ''
            }`}
            onClick={() => onNavigate(item.id)}
          >
            <span className="nav-index">
              {item.id === 'quiz' ? '★' : item.id === 'senior-prep' ? '◆' : String(i + 1).padStart(2, '0')}
            </span>
            <span>{item.nav}</span>
          </button>
        ))}
      </nav>
    </aside>
  )
}
