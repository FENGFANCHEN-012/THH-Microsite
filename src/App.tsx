import { useState, useEffect, useRef } from 'react'
import HistoryPage from "./HistoryPage"
import SiteFooter from "./SiteFooter"
import DonorImpactPage from "./DonorImpactPage"
import thhBuilding from "./assets/thh-building.png"

// ─────────────────────────────────────────────────────────────────────────────
// THH EDITORIAL PALETTE
//
//  page bg       #ffffff   white
//  section alt   #eaf0f8   very light blue
//  card / cell   #ffffff   white
//  grid gap      #eaf0f8   light blue divider
//
//  ink           #282828   dark charcoal
//  muted inks    rgba(12,17,21,…) at decreasing emphasis
//
//  border        #eaf0f8   hairline
//  border-2      #31599e   stronger
//
//  brand         #31599e   THH medium blue
//  brand-light   rgba(49, 89, 158, 0.10)  tinted wash
// ─────────────────────────────────────────────────────────────────────────────

const BG     = '#ffffff'
const BG2    = '#eaf0f8'
const BG3    = '#ffffff'
const GAP    = '#eaf0f8'
const INK    = '#282828'
const INK2   = '#282828'
const INK3   = '#282828'
const INK4   = 'rgba(40, 40, 40, 0.68)'
const INK5   = 'rgba(40, 40, 40, 0.58)'
const BORDER = '#eaf0f8'
const BORD2  = '#31599e'
const GOLD   = '#31599e'
const GOLDA  = 'rgba(49, 89, 158, 0.10)'

// ── Hooks ─────────────────────────────────────────────────────────────────

function useScrollProgress(ref: React.RefObject<HTMLDivElement | null>) {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onScroll = () => {
      const rect = el.getBoundingClientRect()
      const total = Math.max(1, el.offsetHeight - window.innerHeight)
      setProgress(Math.max(0, Math.min(1, -rect.top / total)))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [ref])
  return progress
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true) },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

function useCounter(target: number, duration = 2400, active = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) { setCount(0); return }
    let frame: number
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
      setCount(Math.round(eased * target))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, duration, active])
  return count
}

// ── Data ─────────────────────────────────────────────────────────────────

const OVERCOMERS = [
  { id: 1, days: 2456, name: 'Daniel T.', role: 'Head Chef, 38', quote: 'Every morning I wake up is another day I choose freedom.', img: 'https://images.unsplash.com/photo-1542207342-464d0c94c21c?w=700&h=900&fit=crop&auto=format' },
  { id: 2, days: 365, name: 'Marcus L.', role: 'Barber, 29', quote: 'One year felt impossible. Then it happened.', img: 'https://images.unsplash.com/photo-1576510004509-1fcc964b7927?w=400&h=550&fit=crop&auto=format' },
  { id: 3, days: 1825, name: 'Raymond K.', role: 'Carpenter, 44', quote: 'I built furniture. Then I learned to build a life.', img: 'https://images.unsplash.com/photo-1635214961752-160496fd3145?w=500&h=650&fit=crop&auto=format' },
  { id: 4, days: 4380, name: 'Alvin S.', role: 'Social Worker, 52', quote: 'Twelve years. I still count every single one.', img: 'https://images.unsplash.com/photo-1498490724692-0de80895f8d1?w=600&h=750&fit=crop&auto=format' },
  { id: 5, days: 730, name: 'Jason W.', role: 'Deliveryman, 31', quote: 'Two years. Every package I deliver is a gift to myself.', img: 'https://images.unsplash.com/photo-1513350027966-f016e1adcecd?w=400&h=500&fit=crop&auto=format' },
  { id: 6, days: 1095, name: 'Ben H.', role: 'Kitchen Staff, 36', quote: 'Three years ago I had nothing. Now I have purpose.', img: 'https://images.unsplash.com/photo-1676733591527-bacc1adb0d78?w=500&h=600&fit=crop&auto=format' },
  { id: 7, days: 547, name: 'Wei Liang', role: 'Student, 24', quote: 'I am not my past. I proved that every single day.', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&auto=format' },
  { id: 8, days: 3285, name: 'Henry C.', role: 'Restaurant Owner, 47', quote: 'Nine years on. Now I give others the same chance.', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=650&fit=crop&auto=format' },
  { id: 9, days: 182, name: 'Kelvin P.', role: 'Factory Worker, 27', quote: 'Six months. God is not finished with me yet.', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop&auto=format' },
  { id: 10, days: 2190, name: 'Samuel T.', role: 'Security Officer, 41', quote: 'I used to run from authority. Now I protect my community.', img: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=500&h=600&fit=crop&auto=format' },
  { id: 11, days: 912, name: 'David O.', role: 'Plumber, 33', quote: 'Two and a half years fixing pipes. And fixing myself.', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&auto=format' },
  { id: 12, days: 1460, name: 'Ernest G.', role: 'Driver, 39', quote: 'Four years on the right road. Not looking back.', img: 'https://images.unsplash.com/photo-1534958532666-e04de78db3b4?w=400&h=500&fit=crop&auto=format' },
]

function getOvercomerProfile(index: number) {
  return OVERCOMERS[index] ?? null
}

const FLOATING_NUMS = [
  { n: 365,   x: 0,   y: 8,  fs: '4.4rem', mfs: '2.6rem', op: 0.18 },
  { n: 2456,  x: 14,  y: 72, fs: '5.8rem', mfs: '3rem',   op: 0.15 },
  { n: 1825,  x: 29,  y: 22, fs: '3.8rem', mfs: '2.3rem', op: 0.14 },
  { n: 4380,  x: 41,  y: 84, fs: '4.7rem', mfs: '2.6rem', op: 0.18 },
  { n: 730,   x: 58,  y: 13, fs: '3.4rem', mfs: '2.2rem', op: 0.12 },
  { n: 1095,  x: 72,  y: 68, fs: '4.3rem', mfs: '2.4rem', op: 0.16 },
  { n: 547,   x: 87,  y: 27, fs: '3.2rem', mfs: '2.2rem', op: 0.11 },
  { n: 3285,  x: 103, y: 78, fs: '4rem',   mfs: '2.5rem', op: 0.14 },
  { n: 182,   x: 116, y: 6,  fs: '2.8rem', mfs: '2rem',   op: 0.10 },
  { n: 2190,  x: 132, y: 88, fs: '3.6rem', mfs: '2.3rem', op: 0.13 },
  { n: 912,   x: 147, y: 18, fs: '3.1rem', mfs: '2rem',   op: 0.11 },
  { n: 1460,  x: 160, y: 70, fs: '3.8rem', mfs: '2.3rem', op: 0.15 },
  { n: 1240,  x: 176, y: 29, fs: '4.1rem', mfs: '2.5rem', op: 0.13 },
  { n: 2856,  x: 190, y: 81, fs: '3.2rem', mfs: '2.1rem', op: 0.11 },
  { n: 93,    x: 207, y: 10, fs: '5rem',   mfs: '2.8rem', op: 0.16 },
  { n: 1678,  x: 221, y: 74, fs: '3.7rem', mfs: '2.3rem', op: 0.12 },
  { n: 421,   x: 235, y: 24, fs: '3rem',   mfs: '2rem',   op: 0.10 },
  { n: 3065,  x: 252, y: 86, fs: '4.5rem', mfs: '2.6rem', op: 0.15 },
  { n: 804,   x: 266, y: 7,  fs: '3.6rem', mfs: '2.2rem', op: 0.12 },
  { n: 1987,  x: 281, y: 69, fs: '4.2rem', mfs: '2.5rem', op: 0.14 },
  { n: 275,   x: 297, y: 26, fs: '3.3rem', mfs: '2.1rem', op: 0.11 },
  { n: 3520,  x: 310, y: 79, fs: '5.2rem', mfs: '2.8rem', op: 0.17 },
  { n: 118,   x: 326, y: 12, fs: '3rem',   mfs: '2rem',   op: 0.10 },
  { n: 2334,  x: 340, y: 88, fs: '4rem',   mfs: '2.4rem', op: 0.13 },
  { n: 679,   x: 356, y: 20, fs: '4.6rem', mfs: '2.6rem', op: 0.15 },
  { n: 1542,  x: 371, y: 72, fs: '3.4rem', mfs: '2.2rem', op: 0.11 },
  { n: 398,   x: 385, y: 5,  fs: '3.8rem', mfs: '2.3rem', op: 0.13 },
  { n: 2711,  x: 402, y: 83, fs: '4.8rem', mfs: '2.7rem', op: 0.16 },
  { n: 1045,  x: 416, y: 28, fs: '3.1rem', mfs: '2rem',   op: 0.10 },
  { n: 326,   x: 431, y: 68, fs: '4.1rem', mfs: '2.5rem', op: 0.14 },
  { n: 1888,  x: 448, y: 14, fs: '3.5rem', mfs: '2.2rem', op: 0.12 },
  { n: 4520,  x: 461, y: 87, fs: '5rem',   mfs: '2.8rem', op: 0.17 },
  { n: 756,   x: 476, y: 23, fs: '3.2rem', mfs: '2.1rem', op: 0.11 },
  { n: 213,   x: 492, y: 76, fs: '4.3rem', mfs: '2.5rem', op: 0.14 },
  { n: 1347,  x: 506, y: 8,  fs: '3.7rem', mfs: '2.3rem', op: 0.12 },
  { n: 2999,  x: 523, y: 84, fs: '4.7rem', mfs: '2.7rem', op: 0.16 },
  { n: 582,   x: 537, y: 18, fs: '3rem',   mfs: '2rem',   op: 0.10 },
  { n: 1724,  x: 551, y: 70, fs: '4rem',   mfs: '2.4rem', op: 0.13 },
  { n: 943,   x: 568, y: 27, fs: '3.4rem', mfs: '2.2rem', op: 0.11 },
  { n: 3611,  x: 584, y: 80, fs: '5.1rem', mfs: '2.8rem', op: 0.17 },
]

const WALL_LAYOUT = [
  'col-span-2 row-span-2', 'col-span-1 row-span-1', 'col-span-1 row-span-1',
  'col-span-1 row-span-2', 'col-span-2 row-span-1', 'col-span-1 row-span-1',
  'col-span-1 row-span-1', 'col-span-2 row-span-1', 'col-span-1 row-span-2',
  'col-span-1 row-span-1', 'col-span-1 row-span-1', 'col-span-1 row-span-1',
]

const STAGES = [
  { n: '01', title: 'Arrival',    sub: 'Intake & Assessment',       desc: 'Every journey begins with arrival. Each man is welcomed, assessed, and heard — his story matters before his record does.' },
  { n: '02', title: 'Foundation', sub: 'Counselling & Spiritual Care', desc: 'Stability comes before progress. Life skills, counselling, and a community of faith create the ground on which rebuilding begins.' },
  { n: '03', title: 'Capability', sub: 'Vocational Training',          desc: 'Skills become identity. Through ITE-recognised programmes, each man discovers what he is capable of building.' },
  { n: '04', title: 'Transition', sub: 'Employment & Reconciliation',  desc: 'Work is more than income — it is return. Job placement, family mediation, and mentorship mark the passage back.' },
  { n: '05', title: 'Belonging',  sub: 'Community Integration',        desc: 'Freedom requires belonging. Alumni networks, peer support, and ongoing care mean no man walks forward alone.' },
]

const PARTNERS = [
  { cat: 'Government Agencies',   items: ['Singapore Prison Service', 'Ministry of Social & Family Development', 'Singapore Corporation of Rehabilitative Enterprises (SCORE)', 'National Council of Social Service (NCSS)'] },
  { cat: 'Training & Education',  items: ['Institute of Technical Education (ITE)', 'NTUC LearningHub', 'Workforce Singapore (WSG)', 'SkillsFuture Singapore'] },
  { cat: 'Faith Communities',     items: ['50+ Churches & Congregations', 'Singapore Council of Christian Churches', 'Anglican Community Services', 'Catholic Welfare Services'] },
  { cat: 'Corporate Partners',    items: ['30+ Employment Partners', 'F&B Industry Networks', 'Construction & Facilities Sector', 'Logistics & Delivery Networks'] },
  { cat: 'Health & Wellbeing',    items: ['Institute of Mental Health (IMH)', 'National Addictions Management Service', 'Community Health Centres', 'Volunteer Counsellors Network'] },
]

const LEADERSHIP = [
  { name: 'Mr George Lim',  role: 'Board Chairman',        note: 'Senior Partner, Lim & Lee LLP',  img: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=500&fit=crop&auto=format', featured: false, quote: '' },
  { name: 'Ms Joyce Tan',   role: 'Executive Director',    note: '22 years with THH',               img: 'https://images.unsplash.com/photo-1607529378676-a20456ee2f6b?w=600&h=750&fit=crop&auto=format', featured: true,  quote: 'We do not measure our work in years. We measure it in the moment a man looks his son in the eye and knows — for the first time in years — that he is truly free.' },
  { name: 'Mr David Ng',    role: 'Deputy Director',       note: 'Programmes & Residential',        img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&auto=format', featured: false, quote: '' },
  { name: 'Ms Rachel Chow', role: 'Director of Finance',   note: 'CA (Singapore)',                  img: 'https://images.unsplash.com/photo-1534958532666-e04de78db3b4?w=400&h=500&fit=crop&auto=format', featured: false, quote: '' },
  { name: 'Mr Kenneth Woo', role: 'Head of Residential Care', note: '15 years with THH',           img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop&auto=format', featured: false, quote: '' },
]

const BOARD = [
  { name: 'Mr George Lim',   designation: 'Chairman',      profession: 'Senior Legal Partner',      since: '2015' },
  { name: 'Dr Susan Yeo',    designation: 'Vice-Chairman', profession: 'Consultant Physician',       since: '2018' },
  { name: 'Mr Patrick Chen', designation: 'Treasurer',     profession: 'Chartered Accountant',      since: '2012' },
  { name: 'Rev James Ho',    designation: 'Member',        profession: 'Senior Pastor',             since: '2010' },
  { name: 'Ms Linda Tan',    designation: 'Member',        profession: 'HR Director, MNC',          since: '2020' },
  { name: 'Mr Raymond Ong',  designation: 'Member',        profession: 'Director, Social Service',  since: '2019' },
]

const COMMITTEES = [
  { name: 'Finance & Audit',          chair: 'Mr Patrick Chen', members: 4, meets: 'Quarterly',  desc: 'Oversees financial controls, audit processes, and ensures prudent stewardship of all resources.' },
  { name: 'Programme & Evaluation',   chair: 'Dr Susan Yeo',    members: 5, meets: 'Bi-monthly', desc: 'Reviews programme outcomes, resident welfare, and the effectiveness of rehabilitation approaches.' },
  { name: 'Human Resources',          chair: 'Ms Linda Tan',    members: 3, meets: 'Quarterly',  desc: 'Governs staff policies, compensation, and organisational culture across all departments.' },
  { name: 'Fundraising & Partnerships', chair: 'Mr Raymond Ong', members: 5, meets: 'Monthly',   desc: 'Develops donor relationships, community partnerships, and income diversification strategies.' },
]

const GOVERNANCE = [
  { title: 'Charity Registration',          content: 'Registered with the Commissioner of Charities since 1985. Charity No. THH1985-001. Governed under the Charities Act (Cap. 37, Singapore).' },
  { title: 'Institution of Public Character', content: 'IPC status approved. Qualifying donors may claim 250% tax deductions on eligible donations made to THH.' },
  { title: 'Governance Framework Rating',   content: 'Rated Enhanced Tier under the Charity Governance Framework — the highest governance standard for charities in Singapore.' },
  { title: 'Financial Accountability',      content: 'Annual accounts independently audited by KPMG LLP. Financial statements filed with the Commissioner of Charities within 6 months of each financial year-end.' },
  { title: 'Reserves Policy',               content: 'THH maintains operating reserves equivalent to 6 months of annual expenditure. FY2024 total income: $4.6M. Programme expenditure: 85% of total costs.' },
]

// ── Custom Cursor ─────────────────────────────────────────────────────────

function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const pos     = useRef({ x: -200, y: -200 })
  const ring    = useRef({ x: -200, y: -200 })
  const raf     = useRef<number>(0)
  const hov     = useRef(false)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
      hov.current = (e.target as HTMLElement).closest('button,a,[data-cursor]') !== null
    }
    window.addEventListener('mousemove', onMove)
    const tick = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12
      ring.current.y += (pos.current.y - ring.current.y) * 0.12
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 5}px,${pos.current.y - 5}px)`
        dotRef.current.style.opacity = hov.current ? '0' : '1'
      }
      if (ringRef.current) {
        const s = hov.current ? 44 : 22
        ringRef.current.style.transform = `translate(${ring.current.x - s / 2}px,${ring.current.y - s / 2}px)`
        ringRef.current.style.width  = `${s}px`
        ringRef.current.style.height = `${s}px`
      }
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf.current) }
  }, [])

  return (
    <>
      <div ref={dotRef}  className="fixed top-0 left-0 w-[10px] h-[10px] rounded-full pointer-events-none z-[9999]" style={{ background: GOLD, transition: 'opacity 0.2s' }} />
      <div ref={ringRef} className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] transition-[width,height] duration-300" style={{ border: `1px solid ${GOLD}` }} />
    </>
  )
}

// ── Page Progress Bar ─────────────────────────────────────────────────────

function PageProgressBar() {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    const fn = () => {
      const tot = document.documentElement.scrollHeight - window.innerHeight
      setPct(tot > 0 ? (window.scrollY / tot) * 100 : 0)
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <div className="fixed top-0 left-0 right-0 h-px z-[9990]" style={{ background: BORDER }}>
      <div className="h-full transition-none" style={{ width: `${pct}%`, background: GOLD }} />
    </div>
  )
}

// ── Homepage navigation ───────────────────────────────────────────────────

function HomeHeader({
  currentPath,
  onNavigate,
}: {
  currentPath: string
  onNavigate: (path: string) => void
}) {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!menuOpen) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])

  const goHome = () => {
    setMenuOpen(false)
    if (currentPath !== '/') {
      onNavigate('/')
      return
    }
    window.scrollTo({ top: 0, behavior: 'auto' })
  }

  const goToPage = (path: string) => {
    setMenuOpen(false)
    onNavigate(path)
  }

  return (
    <header className="home-header">
      <div className="home-header__inner">
        <button type="button" className="home-header__brand" onClick={goHome} data-cursor="true" aria-label="THH 40th anniversary home">
          <span className="home-header__anniversary" aria-hidden="true">
            <small>I AM</small>
            <strong>40</strong>
            <em>Years</em>
          </span>
          <span className="home-header__identity">
            <strong>The Helping <em>Hand</em></strong>
            <small>40 Years. 14,600 Days. Countless Stories.</small>
          </span>
        </button>

        <nav className="home-header__nav" aria-label="Main navigation">
          <button type="button" className={currentPath === '/' ? 'is-active' : ''} aria-current={currentPath === '/' ? 'page' : undefined} onClick={goHome} data-cursor="true">Home</button>
          <button type="button" className={currentPath === '/journey' ? 'is-active' : ''} aria-current={currentPath === '/journey' ? 'page' : undefined} onClick={() => goToPage('/journey')} data-cursor="true">Timeline</button>
          <button type="button" aria-disabled="true" data-cursor="true">40 stories</button>
          <button type="button" className={currentPath === '/impact' ? 'is-active' : ''} aria-current={currentPath === '/impact' ? 'page' : undefined} onClick={() => goToPage('/impact')} data-cursor="true">Donor impact</button>
        </nav>

        <a
          className="home-header__external"
          href="https://thehelpinghand.org.sg"
          target="_blank"
          rel="noreferrer"
          data-cursor="true"
        >
          Back to THH website
          <span aria-hidden="true">↗</span>
        </a>

        <button
          type="button"
          className="home-header__menu-toggle"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="home-mobile-menu"
          onClick={() => setMenuOpen((current) => !current)}
          data-cursor="true"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div id="home-mobile-menu" className={`home-header__mobile-menu${menuOpen ? ' is-open' : ''}`}>
        <button type="button" className={currentPath === '/' ? 'is-active' : ''} aria-current={currentPath === '/' ? 'page' : undefined} onClick={goHome}>Home</button>
        <button type="button" className={currentPath === '/journey' ? 'is-active' : ''} aria-current={currentPath === '/journey' ? 'page' : undefined} onClick={() => goToPage('/journey')}>Timeline</button>
        <button type="button" aria-disabled="true">40 stories</button>
        <button type="button" className={currentPath === '/impact' ? 'is-active' : ''} aria-current={currentPath === '/impact' ? 'page' : undefined} onClick={() => goToPage('/impact')}>Donor impact</button>
        <a href="https://thehelpinghand.org.sg" target="_blank" rel="noreferrer">
          Back to THH website <span aria-hidden="true">↗</span>
        </a>
      </div>
    </header>
  )
}

// ── Drug-free day counter ─────────────────────────────────────────────────

const DAY_MS = 24 * 60 * 60 * 1000

function toDateInputValue(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function dateValueToUtc(value: string) {
  const [year, month, day] = value.split('-').map(Number)
  return Date.UTC(year, month - 1, day)
}

function formatDateValue(value: string) {
  if (!value) return 'Select date'
  const [year, month, day] = value.split('-').map(Number)
  return new Intl.DateTimeFormat('en-SG', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(year, month - 1, day))
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 3v3M17 3v3M4.5 9h15M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
    </svg>
  )
}

type DatePickerView = 'summary' | 'edit'
const CALENDAR_WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

function parseDateValue(value: string) {
  const [year, month, day] = value.split('-').map(Number)
  return new Date(year, month - 1, day)
}

function ChevronIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}

// Remember the chosen start date in this browser only (never sent anywhere)
const DRUG_FREE_STORAGE_KEY = 'thh-drug-free-start'
const YEARS_PER_PAGE = 12

function readStoredStartDate() {
  try {
    const value = window.localStorage.getItem(DRUG_FREE_STORAGE_KEY) ?? ''
    return /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : ''
  } catch {
    return ''
  }
}

// Figma "date picker": compact pill -> Edit date (Year grid -> Month/Day calendar) -> pill with day count.
function DrugFreeDatePicker() {
  const today = new Date()
  const todayValue = toDateInputValue(today)
  const currentYear = today.getFullYear()
  const oldestYear = currentYear - 99
  const pickerRef = useRef<HTMLDivElement>(null)
  const [view, setView] = useState<DatePickerView>('summary')
  const [startDate, setStartDate] = useState(readStoredStartDate)
  const [selectedYear, setSelectedYear] = useState<number | null>(() => {
    const stored = readStoredStartDate()
    return stored ? Number(stored.slice(0, 4)) : null
  })
  const [yearPanelOpen, setYearPanelOpen] = useState(false)
  const [yearPage, setYearPage] = useState(0)
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [calendarMonth, setCalendarMonth] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1))
  const daysDrugFree = startDate && dateValueToUtc(todayValue) >= dateValueToUtc(startDate)
    ? Math.floor((dateValueToUtc(todayValue) - dateValueToUtc(startDate)) / DAY_MS)
    : null

  useEffect(() => {
    try {
      if (startDate) window.localStorage.setItem(DRUG_FREE_STORAGE_KEY, startDate)
      else window.localStorage.removeItem(DRUG_FREE_STORAGE_KEY)
    } catch {
      // storage blocked (private mode etc.) - the picker still works for this visit
    }
  }, [startDate])

  const closeEditor = () => {
    setYearPanelOpen(false)
    setCalendarOpen(false)
    setView('summary')
  }

  useEffect(() => {
    if (view === 'summary') return
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!pickerRef.current?.contains(event.target as Node)) closeEditor()
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      if (yearPanelOpen || calendarOpen) {
        setYearPanelOpen(false)
        setCalendarOpen(false)
      } else {
        closeEditor()
      }
    }
    document.addEventListener('pointerdown', closeOnOutsideClick)
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick)
      window.removeEventListener('keydown', closeOnEscape)
    }
  })

  const openEditor = () => {
    setYearPage(selectedYear === null ? 0 : Math.floor((currentYear - selectedYear) / YEARS_PER_PAGE))
    setYearPanelOpen(false)
    setCalendarOpen(false)
    setView('edit')
  }

  const toggleYearPanel = () => {
    setCalendarOpen(false)
    setYearPanelOpen((open) => !open)
  }

  const chooseYear = (year: number) => {
    if (year !== selectedYear) setStartDate('')
    setSelectedYear(year)
    setYearPanelOpen(false)
    // Step 2 of the flow: go straight to the month/day calendar
    setCalendarMonth(new Date(year, year === currentYear ? today.getMonth() : 0, 1))
    setCalendarOpen(true)
  }

  const toggleCalendar = () => {
    if (selectedYear === null) {
      setYearPanelOpen(true)
      return
    }
    const reference = startDate ? parseDateValue(startDate) : new Date(selectedYear, selectedYear === currentYear ? today.getMonth() : 0, 1)
    setCalendarMonth(new Date(reference.getFullYear(), reference.getMonth(), 1))
    setYearPanelOpen(false)
    setCalendarOpen((open) => !open)
  }

  const pageYears = Array.from({ length: YEARS_PER_PAGE }, (_, index) => currentYear - yearPage * YEARS_PER_PAGE - index)
    .filter((year) => year >= oldestYear)
  const lastYearPage = Math.floor((currentYear - oldestYear) / YEARS_PER_PAGE)

  const calendarYear = selectedYear ?? currentYear
  const calendarMonthIndex = calendarMonth.getMonth()
  const firstWeekday = new Date(calendarYear, calendarMonthIndex, 1).getDay()
  const daysInMonth = new Date(calendarYear, calendarMonthIndex + 1, 0).getDate()
  const calendarDays = Array.from({ length: 42 }, (_, index) => {
    const day = index - firstWeekday + 1
    return day > 0 && day <= daysInMonth ? day : null
  })
  const previousMonthDisabled = calendarMonthIndex === 0
  const nextMonthDisabled = calendarMonthIndex === 11 || (calendarYear === currentYear && calendarMonthIndex >= today.getMonth())

  const sinceLabel = startDate
    ? new Intl.DateTimeFormat('en-SG', { day: 'numeric', month: 'short', year: 'numeric' }).format(parseDateValue(startDate))
    : ''
  const monthDayLabel = startDate
    ? new Intl.DateTimeFormat('en-SG', { day: 'numeric', month: 'short' }).format(parseDateValue(startDate))
    : '-'

  return (
    <aside ref={pickerRef} className="drug-free-picker" data-view={view} aria-label="Drug-free day calculator">
      {view === 'summary' && (
        <div className="drug-free-picker__view">
          {daysDrugFree === null ? (
            <div className="drug-free-picker__pill">
              <span>I am</span>
              <button type="button" className="drug-free-picker__link" data-cursor="true" onClick={openEditor}>
                Select date <CalendarIcon />
              </button>
              <span>Days drug free</span>
            </div>
          ) : (
            <>
              <div className="drug-free-picker__pill" aria-live="polite">
                <span>I am</span>
                <strong>{daysDrugFree.toLocaleString()}</strong>
                <span>Days drug free</span>
              </div>
              <button type="button" className="drug-free-picker__link drug-free-picker__since" data-cursor="true" onClick={openEditor}>
                Since {sinceLabel} <CalendarIcon />
              </button>
            </>
          )}
        </div>
      )}

      {view === 'edit' && (
        <div className="drug-free-picker__view" aria-label="Edit date">
          <div className="drug-free-picker__view-header">
            <strong>Edit date</strong>
            <button type="button" aria-label="Close date editor" data-cursor="true" onClick={closeEditor}>×</button>
          </div>
          <p className="drug-free-picker__instruction">Select the date you began your drug-free journey.</p>
          <div className="drug-free-picker__field-list">
            <button type="button" aria-expanded={yearPanelOpen} data-cursor="true" onClick={toggleYearPanel}>
              <span>Year</span>
              <strong>{selectedYear ?? '-'}</strong>
              <ChevronIcon />
            </button>
            <div className={`drug-free-picker__inline-calendar${yearPanelOpen ? ' is-open' : ''}`} aria-hidden={!yearPanelOpen}>
              <div>
                <div className="drug-free-picker__calendar-heading">
                  <button type="button" aria-label="Earlier years" disabled={yearPage >= lastYearPage} tabIndex={yearPanelOpen ? 0 : -1} data-cursor="true" onClick={() => setYearPage((page) => page + 1)}>‹</button>
                  <strong>{selectedYear ?? `${pageYears[pageYears.length - 1]}–${pageYears[0]}`}</strong>
                  <button type="button" aria-label="Later years" disabled={yearPage === 0} tabIndex={yearPanelOpen ? 0 : -1} data-cursor="true" onClick={() => setYearPage((page) => page - 1)}>›</button>
                </div>
                <div className="drug-free-picker__year-grid">
                  {pageYears.map((year) => (
                    <button
                      key={year}
                      type="button"
                      className={year === selectedYear ? 'is-selected' : ''}
                      aria-pressed={year === selectedYear}
                      tabIndex={yearPanelOpen ? 0 : -1}
                      data-cursor="true"
                      onClick={() => chooseYear(year)}
                    >{year}</button>
                  ))}
                </div>
              </div>
            </div>

            <button type="button" aria-expanded={calendarOpen} data-cursor="true" onClick={toggleCalendar}>
              <span>Month / Day</span>
              <strong>{monthDayLabel}</strong>
              <ChevronIcon />
            </button>
            <div className={`drug-free-picker__inline-calendar${calendarOpen ? ' is-open' : ''}`} aria-hidden={!calendarOpen}>
              <div>
                <div className="drug-free-picker__calendar-heading">
                  <button type="button" aria-label="Previous month" disabled={previousMonthDisabled} tabIndex={calendarOpen ? 0 : -1} data-cursor="true" onClick={() => setCalendarMonth(new Date(calendarYear, calendarMonthIndex - 1, 1))}>‹</button>
                  <strong>{new Intl.DateTimeFormat('en-SG', { month: 'long' }).format(calendarMonth)}</strong>
                  <button type="button" aria-label="Next month" disabled={nextMonthDisabled} tabIndex={calendarOpen ? 0 : -1} data-cursor="true" onClick={() => setCalendarMonth(new Date(calendarYear, calendarMonthIndex + 1, 1))}>›</button>
                </div>
                <div className="drug-free-picker__weekdays" aria-hidden="true">
                  {CALENDAR_WEEKDAYS.map((day, index) => <span key={`${day}-${index}`}>{day}</span>)}
                </div>
                <div className="drug-free-picker__calendar-grid">
                  {calendarDays.map((day, index) => {
                    if (day === null) return <span key={`empty-${index}`} />
                    const value = toDateInputValue(new Date(calendarYear, calendarMonthIndex, day))
                    return (
                      <button
                        key={day}
                        type="button"
                        className={value === startDate ? 'is-selected' : ''}
                        disabled={value > todayValue}
                        tabIndex={calendarOpen ? 0 : -1}
                        aria-label={formatDateValue(value)}
                        aria-pressed={value === startDate}
                        data-cursor="true"
                        onClick={() => {
                          setStartDate(value)
                          setCalendarOpen(false)
                        }}
                      >{day}</button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
          <p className="drug-free-picker__edit-note">Your milestone updates automatically through today.</p>
          <button type="button" className="drug-free-picker__done" data-cursor="true" onClick={closeEditor}>Done</button>
        </div>
      )}
    </aside>
  )
}

// ── Section 1: Hero ── I AM 40 → I AM 14,600 ─────────────────────────────

function HeroSection({ progress }: { progress: number }) {
  const heroP = Math.min(1, progress / 0.32)
  const morphP = Math.max(0, Math.min(1, (heroP - 0.3) / 0.35))
  const subtitleP = Math.max(0, Math.min(1, (heroP - 0.7) / 0.2))
  const daysP = Math.max(0, Math.min(1, (heroP - 0.6) / 0.15))
  const backgroundP = Math.max(0, Math.min(1, (progress - 0.32) / 0.11))
  const backgroundEase = backgroundP * backgroundP * (3 - 2 * backgroundP)
  const centralColor = `rgb(${Math.round(255 - 243 * backgroundEase)}, ${Math.round(255 - 238 * backgroundEase)}, ${Math.round(255 - 234 * backgroundEase)})`
  const mainOpacity = 1 - Math.max(0, Math.min(1, (progress - 0.41) / 0.08))
  const displayNum = morphP < 0.02 ? '40' : morphP >= 1 ? '14,600' : Math.round(40 + (14600 - 40) * morphP).toLocaleString()

  return (
    <>
        <div className="absolute inset-0" style={{ transform: `translateY(${-backgroundEase * 100}%)`, willChange: 'transform' }}>
          <img
            src={thhBuilding}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              filter: 'grayscale(35%) saturate(70%) contrast(0.94) brightness(0.84)',
              objectPosition: 'center center',
              transform: `scale(${1.02 + morphP * 0.025}) translateY(${-morphP * 1.2}%)`,
              willChange: 'transform',
            }}
          />
          <div className="absolute inset-0" style={{ background: GOLD, opacity: 0.62, mixBlendMode: 'multiply' }} />
        </div>

        {/* Main type */}
        <div className="relative z-30 text-center select-none pointer-events-none" style={{ opacity: mainOpacity }}>
          <p className="font-mono mb-5 leading-[1.33] uppercase" style={{ color: centralColor, fontSize: 'clamp(1rem, 1.8vw, 1.5rem)', opacity: 1 - morphP * 0.4 }}>
            I AM
          </p>
          <div className="font-display font-bold leading-[1.28] tracking-[-0.00769em]" style={{ fontSize: 'clamp(7.5rem, 18vw, 19.5rem)', color: centralColor, transform: `scale(${1 + morphP * 0.1})`, willChange: 'transform' }}>
            {displayNum}
          </div>
          <p className="font-mono mt-5 leading-[1.44] uppercase" style={{ color: BG, fontSize: 'clamp(0.875rem, 1.5vw, 1.125rem)', opacity: daysP > 0.05 ? daysP * (1 - backgroundEase) : Math.max(0, 1 - morphP * 3), transform: `translateY(${(1 - daysP) * 8}px)` }}>
            {daysP > 0.05 ? 'Days' : 'Years of restoring lives'}
          </p>
          <div className="mt-16 text-center" style={{ opacity: subtitleP * (1 - backgroundEase), transform: `translateY(${(1 - subtitleP) * 24}px)` }}>
            <p className="font-body font-normal leading-[1.33]" style={{ color: BG, fontSize: '1.5rem' }}>
              40 years of restoration.<br />14,600 days of lives being transformed.
            </p>
          </div>
        </div>

    </>
  )
}

// ── Section 2: Numbers ────────────────────────────────────────────────────

function NumberSection({ progress }: { progress: number }) {
  const closeTimer = useRef<number | null>(null)
  const [profileIndex, setProfileIndex] = useState<number | null>(null)
  const [profileOpen, setProfileOpen] = useState(false)
  const numbersP = Math.max(0, Math.min(1, (progress - 0.55) / 0.4))
  const numbersVisibility = Math.max(0, Math.min(1, (progress - 0.46) / 0.04))
  const mainOpacity = 1 - Math.max(0, Math.min(1, (progress - 0.41) / 0.08))
  const canvasX = -5 - numbersP * 220
  const progressEnter = Math.max(0, Math.min(1, (progress - 0.48) / 0.03))
  const progressExit = 1 - Math.max(0, Math.min(1, (progress - 0.97) / 0.02))
  const progressOpacity = progressEnter * progressExit
  const resolvedProfile = profileIndex === null ? null : getOvercomerProfile(profileIndex)
  const activeProfile = profileIndex === null
    ? null
    : resolvedProfile ?? {
        name: `Sample profile ${String(profileIndex + 1).padStart(2, '0')}`,
        role: 'Sample content — not verified',
        img: '',
      }
  const activeItem = profileIndex === null ? null : FLOATING_NUMS[profileIndex]
  const activeScreenX = activeItem ? -5 + activeItem.x * 0.55 - numbersP * 220 : 0

  useEffect(() => {
    return () => {
      if (closeTimer.current !== null) window.clearTimeout(closeTimer.current)
    }
  }, [])

  useEffect(() => {
    if (!profileOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setProfileOpen(false)
      closeTimer.current = window.setTimeout(() => setProfileIndex(null), 220)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [profileOpen])

  const showProfile = (index: number) => {
    if (closeTimer.current !== null) window.clearTimeout(closeTimer.current)
    setProfileIndex(index)
    setProfileOpen(true)
  }

  const hideProfile = () => {
    setProfileOpen(false)
    if (closeTimer.current !== null) window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setProfileIndex(null), 220)
  }

  return (
    <>
        <div
          className="absolute inset-y-0 left-0 z-10"
          style={{ width: '350vw', transform: `translate3d(${canvasX}vw, 0, 0)`, willChange: 'transform' }}
        >
          {FLOATING_NUMS.map((item, i) => {
            const isActive = profileIndex === i && profileOpen
            const profile = getOvercomerProfile(i)
            const profileName = profile ? profile.name : `sample profile ${i + 1}`
            return (
              <button
                key={i}
                type="button"
                className="numbers-float absolute z-10 p-0 border-0 bg-transparent text-left"
                style={{
                  '--number-x': `${item.x * 0.55}vw`,
                  '--number-y': `${item.y}%`,
                  '--number-size': item.fs,
                  '--number-mobile-size': item.mfs,
                  opacity: numbersVisibility * (isActive ? 1 : item.op),
                  transform: `translateY(${(1 - numbersVisibility) * 24}px)`,
                  pointerEvents: numbersVisibility > 0.01 ? 'auto' : 'none',
                  transition: 'opacity 0.25s ease',
                  willChange: 'opacity, transform',
                } as React.CSSProperties}
                aria-label={`View profile for ${profileName}`}
                aria-expanded={isActive}
                aria-controls="numbers-profile-card"
                data-cursor="true"
                onPointerEnter={(event) => {
                  if (event.pointerType !== 'touch') showProfile(i)
                }}
                onPointerLeave={(event) => {
                  if (event.pointerType !== 'touch') hideProfile()
                }}
                onFocus={() => showProfile(i)}
                onBlur={hideProfile}
                onPointerUp={(event) => {
                  if (event.pointerType !== 'touch') return
                  if (isActive) hideProfile()
                  else showProfile(i)
                }}
                onClick={(event) => {
                  if (event.detail !== 0) return
                  if (isActive) hideProfile()
                  else showProfile(i)
                }}
              >
                <span className="block font-mono mb-1 leading-[1.67] uppercase" style={{ fontSize: '0.75rem', color: GOLD }}>I AM</span>
                <div className="font-display font-bold leading-none" style={{ fontSize: 'var(--number-size)', letterSpacing: '-0.04em', color: INK }}>{item.n.toLocaleString()}</div>
              </button>
            )
          })}
        </div>

        {activeProfile && activeItem && (
          <div
            id="numbers-profile-card"
            className="numbers-profile-card"
            role="dialog"
            aria-label={`Overcomer profile: ${activeProfile.name}`}
            aria-live="polite"
            style={{
              '--profile-left': activeScreenX > 55 ? 'clamp(1rem, 5vw, 5rem)' : 'auto',
              '--profile-right': activeScreenX > 55 ? 'auto' : 'clamp(1rem, 5vw, 5rem)',
              '--profile-top': parseFloat(activeItem.y) > 55 ? 'clamp(5rem, 10vh, 7rem)' : 'auto',
              '--profile-bottom': parseFloat(activeItem.y) > 55 ? 'auto' : 'clamp(2rem, 7vh, 5rem)',
              opacity: profileOpen ? 1 : 0,
              transform: profileOpen ? 'scale(1) translateY(0)' : 'scale(0.97) translateY(0.75rem)',
              pointerEvents: profileOpen ? 'auto' : 'none',
            } as React.CSSProperties}
            onMouseEnter={() => {
              if (closeTimer.current !== null) window.clearTimeout(closeTimer.current)
              setProfileOpen(true)
            }}
            onMouseLeave={hideProfile}
          >
            {activeProfile.img
              ? <img src={activeProfile.img} alt={`Portrait of ${activeProfile.name}`} />
              : <div className="numbers-profile-card__portrait-placeholder">Portrait pending</div>}
            <div className="numbers-profile-card__content">
              <div className="numbers-profile-card__header">
                <div>
                  <span>Overcomer profile</span>
                  <strong>{activeProfile.name}</strong>
                  <small>{activeProfile.role}</small>
                </div>
                <button type="button" onClick={hideProfile} aria-label="Close profile card">Close</button>
              </div>
              <div className="numbers-profile-card__stat">
                <span>I AM</span>
                <strong>{activeItem.n.toLocaleString()}</strong>
                <em>days</em>
              </div>
              <dl>
                <div>
                  <dt>Their past</dt>
                  <dd>Placeholder — personal background and journey before joining THH to be provided.</dd>
                </div>
                <div>
                  <dt>Time incarcerated</dt>
                  <dd>Placeholder — duration to be confirmed.</dd>
                </div>
                <div>
                  <dt>Testimony</dt>
                  <dd>Placeholder — testimony of God&apos;s work in their life to be provided.</dd>
                </div>
              </dl>
            </div>
          </div>
        )}

        <div className="absolute inset-0 z-20 flex items-center justify-center px-6 text-center pointer-events-none" style={{ opacity: 1 - mainOpacity }}>
          <div className="max-w-2xl">
            <p className="font-body font-normal leading-[1.33]" style={{ color: INK3, fontSize: 'clamp(1rem, 1.5vw, 1.5rem)' }}>14,600 days tell the story of overcoming odds and prejudices</p>
            <p className="font-display font-bold mt-1 leading-[1.5] tracking-[-0.025em]" style={{ fontSize: '2rem', color: INK }}>Every single day brings possibilities to our residents&apos; lives.</p>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 z-30 h-px w-[min(22rem,70vw)] -translate-x-1/2 pointer-events-none" style={{ background: BORDER, opacity: progressOpacity }}>
          <div className="h-full" style={{ width: `${numbersP * 100}%`, background: GOLD }} />
        </div>

    </>
  )
}

function AnniversarySequence() {
  const ref = useRef<HTMLDivElement>(null)
  const progress = useScrollProgress(ref)
  const heroP = Math.min(1, progress / 0.32)

  return (
    <div ref={ref} style={{ height: '850vh' }}>
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden" style={{ background: BG }}>
        <HeroSection progress={progress} />
        <NumberSection progress={progress} />

        {/* Scroll nudge */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3" style={{ opacity: Math.max(0, 1 - heroP * 6) }}>
          <span className="font-mono leading-[1.67] uppercase" style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.72)' }}>Scroll</span>
          <div className="w-px h-10" style={{ background: 'rgba(255,255,255,0.5)' }} />
        </div>
      </div>
    </div>
  )
}

// ── Section 3: Mission & Vision ───────────────────────────────────────────

function MissionVisionSection() {
  const ref  = useRef<HTMLDivElement>(null)
  const prog = useScrollProgress(ref)

  const qP  = Math.min(1, prog / 0.22)
  const mP  = Math.min(1, Math.max(0, (prog - 0.25) / 0.32))
  const vP  = Math.min(1, Math.max(0, (prog - 0.65) / 0.25))
  const dot = prog < 0.25 ? 0 : prog < 0.65 ? 1 : 2

  return (
    <div ref={ref} style={{ height: '320vh' }}>
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden" style={{ background: BG2 }}>
        <div className="max-w-[1440px] mx-auto px-20 w-full">
          <div className="mb-10" style={{ opacity: qP, transform: `translateY(${(1 - qP) * 12}px)` }}>
            <p className="font-mono text-[0.75rem] leading-[1.67] uppercase" style={{ color: INK5 }}>The reason for 40 years</p>
          </div>

          <div style={{ opacity: mP, transform: `translateY(${(1 - mP) * 28}px)` }}>
            <p className="font-mono text-[0.75rem] mb-6 leading-[1.67] uppercase" style={{ color: GOLD }}>Mission</p>
            <h2 className="font-display font-bold leading-[1.25] tracking-[-0.0375em]" style={{ fontSize: 'clamp(2rem, 4.2vw, 4rem)', maxWidth: '900px', color: INK }}>
              To restore lives and rebuild futures — through community, compassion, and the conviction that every man deserves a second chance.
            </h2>
          </div>

          <div className="mt-16 pl-16" style={{ borderLeft: `2px solid ${GOLD}`, opacity: vP, transform: `translateY(${(1 - vP) * 24}px)` }}>
            <p className="font-mono text-[0.75rem] mb-5 leading-[1.67] uppercase" style={{ color: INK4 }}>Vision</p>
            <h3 className="font-display font-normal leading-[1.4] tracking-[-0.04em]" style={{ fontSize: 'clamp(1.125rem, 2.8vw, 2.5rem)', maxWidth: '720px', color: INK2 }}>
              A Singapore where every former offender can walk free — not just from prison walls, but from the weight of the past.
            </h3>
          </div>
        </div>

        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
          {[0, 1, 2].map(i => (
            <div key={i} className="rounded-full transition-all duration-500" style={{ width: dot === i ? '20px' : '4px', height: '4px', background: dot === i ? GOLD : BORDER }} />
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Section 4: The Reveal ─────────────────────────────────────────────────

function RevealSection() {
  const { ref, inView } = useInView(0.08)
  const [hovId, setHovId] = useState<number | null>(null)
  const cells = OVERCOMERS.slice(0, 9)

  return (
    <div ref={ref} className="py-30 px-16" style={{ background: BG2 }}>
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-16 max-w-lg">
          <p className="font-mono text-[0.75rem] mb-5 leading-[1.67] uppercase" style={{ color: GOLD, opacity: inView ? 1 : 0, transition: 'opacity 1s' }}>The Numbers</p>
          <h2 className="font-display font-bold leading-[1.17] tracking-[-0.025em]" style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', color: INK, opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 1s 0.1s, transform 1s 0.1s' }}>
            These are not<br />statistics.
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-px" style={{ background: GAP }}>
          {cells.map((person, i) => (
            <div key={person.id} className="relative overflow-hidden cursor-pointer" style={{ aspectRatio: '4/5', background: BG3 }} data-cursor="true" onMouseEnter={() => setHovId(person.id)} onMouseLeave={() => setHovId(null)}>
              {/* Portrait — visible at rest on ivory; deepens on hover */}
              <img
                src={person.img} alt={person.name}
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  filter: hovId === person.id ? 'grayscale(20%) contrast(1.0) brightness(0.88)' : 'grayscale(100%) contrast(0.85) brightness(1.05)',
                  opacity: hovId === person.id ? 0.75 : 0.22,
                  transform: hovId === person.id ? 'scale(1.04)' : 'scale(1)',
                  transition: 'filter 0.8s, opacity 0.8s, transform 0.8s',
                }}
              />
              {/* Bottom fade for hover text */}
              <div className="absolute inset-0" style={{ background: hovId === person.id ? `linear-gradient(to top, ${BG3} 0%, rgba(255,255,255,0.5) 40%, transparent 65%)` : 'none', transition: 'background 0.6s' }} />

              {/* I AM + number */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-mono block mb-2 leading-[1.67] uppercase" style={{ fontSize: '0.75rem', color: GOLD, opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(10px)', transition: `opacity 0.8s ${i * 0.07}s, transform 0.8s ${i * 0.07}s` }}>I AM</span>
                <div className="font-display font-bold text-center leading-[1.33] tracking-[-0.0667em]" style={{ fontSize: 'clamp(3rem, 5.5vw, 4.5rem)', color: INK, opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(18px)', transition: `opacity 0.9s ${i * 0.07 + 0.1}s, transform 0.9s ${i * 0.07 + 0.1}s` }}>
                  {person.days.toLocaleString()}
                </div>
              </div>

              {/* Hover name + quote */}
              <div className="absolute bottom-0 left-0 right-0 p-6" style={{ opacity: hovId === person.id ? 1 : 0, transform: hovId === person.id ? 'translateY(0)' : 'translateY(12px)', transition: 'all 0.5s ease' }}>
                <p className="font-mono text-[0.75rem] mb-2 leading-[1.67] uppercase" style={{ color: GOLD }}>{person.name}</p>
                <p className="font-body text-[0.875rem] italic leading-[1.57]" style={{ color: INK2 }}>&ldquo;{person.quote}&rdquo;</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center" style={{ opacity: inView ? 1 : 0, transition: 'opacity 1.2s 0.5s' }}>
          <p className="font-body text-[0.875rem] font-normal mb-8 italic leading-[1.57]" style={{ color: INK5 }}>Hover a number to meet the person.</p>
          <p className="font-display font-bold leading-[1.33] tracking-[-0.0333em]" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: INK }}>
            They are days of freedom.<br /><span style={{ color: GOLD }}>They are lives being restored.</span>
          </p>
        </div>
      </div>
    </div>
  )
}

// ── Section 5: Transformation ─────────────────────────────────────────────

function TransformationSection() {
  const ref  = useRef<HTMLDivElement>(null)
  const prog = useScrollProgress(ref)
  const stagePs = STAGES.map((_, i) => Math.min(1, Math.max(0, (prog - i * 0.16) / 0.22)))
  const lineP   = Math.min(1, prog / 0.85)

  return (
    <div ref={ref} style={{ height: '420vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center px-20 py-16" style={{ background: BG }}>
        <div style={{ opacity: stagePs[0] }}>
          <p className="font-mono text-[0.75rem] mb-3 leading-[1.67] uppercase" style={{ color: GOLD }}>Training & Development</p>
          <h2 className="font-display font-bold mb-12 leading-[1.33] tracking-[-0.0333em]" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: INK }}>
            The path of transformation.
          </h2>
        </div>

        {/* Progress track */}
        <div className="relative mb-16" style={{ opacity: stagePs[0] }}>
          <div className="h-px w-full" style={{ background: BORDER }} />
          <div className="absolute top-0 left-0 h-px" style={{ width: `${lineP * 100}%`, background: GOLD, transition: 'none' }} />
          {STAGES.map((_, i) => (
            <div key={i} className="absolute top-0 -translate-y-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full transition-colors duration-500" style={{ left: `${(i / 4) * 100}%`, background: lineP > (i / 4) - 0.05 ? GOLD : BORDER, border: `2px solid ${BG}` }} />
          ))}
        </div>

        {/* Stage columns */}
        <div className="grid gap-8" style={{ gridTemplateColumns: '1.2fr 1fr 1fr 1fr 1.2fr' }}>
          {STAGES.map((stage, i) => (
            <div key={i} style={{ opacity: stagePs[i], transform: `translateY(${(1 - stagePs[i]) * 24}px)` }}>
              <div className="font-display font-bold mb-4 leading-[1.33] tracking-[-0.0333em]" style={{ fontSize: '3rem', color: GOLD }}>{stage.n}</div>
              <p className="font-display font-bold text-[1.125rem] mb-1 leading-[1.78]" style={{ color: INK }}>{stage.title}</p>
              <p className="font-mono mb-4 leading-[1.67] uppercase" style={{ fontSize: '0.75rem', color: INK4 }}>{stage.sub}</p>
              <p className="font-body text-[0.875rem] leading-[1.57]" style={{ color: INK3 }}>{stage.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-right" style={{ opacity: lineP > 0.9 ? 1 : 0, transition: 'opacity 0.8s' }}>
          <p className="font-body text-[0.875rem] font-normal italic leading-[1.57]" style={{ color: INK4 }}>Every overcomer walks this path — at their own pace, in their own time.</p>
        </div>
      </div>
    </div>
  )
}

// ── Section 6: Overcomers Wall ────────────────────────────────────────────

function OvercomersWall() {
  const { ref, inView } = useInView(0.05)
  const [hovId, setHovId] = useState<number | null>(null)

  return (
    <div id="home-stories" ref={ref} className="py-20 px-16 home-stories-section" style={{ background: BG2 }}>
      <div className="max-w-[1440px] mx-auto">
        <div className="flex justify-between items-end mb-16">
          <div>
            <p className="font-mono text-[0.75rem] mb-4 leading-[1.67] uppercase" style={{ color: GOLD, opacity: inView ? 1 : 0, transition: 'opacity 0.8s' }}>The Overcomers</p>
            <h2 className="font-display font-bold leading-[1.2] tracking-[-0.02em]" style={{ fontSize: 'clamp(3.5rem, 8vw, 7.5rem)', color: INK, opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity 0.9s 0.1s, transform 0.9s 0.1s' }}>
              40 lives.<br />40 stories.
            </h2>
          </div>
          <p className="font-body text-[0.875rem] max-w-xs text-right leading-[1.57]" style={{ color: INK3 }}>Each number represents the number of days a resident successfully lives drug free.</p>
        </div>

        <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gridAutoRows: '190px', background: GAP }}>
          {OVERCOMERS.map((person, i) => {
            const layout = WALL_LAYOUT[i] ?? 'col-span-1 row-span-1'
            const isLarge = layout.includes('col-span-2')
            const isHov   = hovId === person.id
            return (
              <div key={person.id} className={`${layout} relative overflow-hidden cursor-pointer`} style={{ background: BG3, opacity: inView ? 1 : 0, transform: isHov ? 'scale(1.01)' : 'scale(1)', transition: `opacity 0.7s ${i * 0.035}s, transform 0.4s ease` }} data-cursor="true" onMouseEnter={() => setHovId(person.id)} onMouseLeave={() => setHovId(null)}>
                <img
                  src={person.img} alt={person.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    filter: isHov ? 'grayscale(0%) contrast(1.0) brightness(0.95)' : 'grayscale(100%) contrast(0.85) brightness(1.05)',
                    opacity: isHov ? 0.85 : 0.3,
                    transform: isHov ? 'scale(1.06)' : 'scale(1)',
                    transition: 'filter 0.7s ease, opacity 0.7s ease, transform 0.7s ease',
                  }}
                />
                {/* Bottom gradient for text on hover */}
                <div className="absolute inset-0" style={{ background: isHov ? 'linear-gradient(to top, #ffffff 0%, rgba(255,255,255,0.75) 30%, transparent 60%)' : 'none', transition: 'background 0.5s' }} />

                {/* Default: I AM / days / DAYS OF FREEDOM (fades out on hover) */}
                <div className="absolute inset-0 flex flex-col items-start justify-center px-8" style={{ opacity: isHov ? 0 : 1, transition: 'opacity 0.4s ease' }}>
                  <span className="font-mono block leading-[1.67] uppercase" style={{ fontSize: '0.75rem', color: GOLD }}>I AM</span>
                  <div className="font-display font-bold leading-[1.33]" style={{ fontSize: isLarge ? '4.5rem' : '2rem', letterSpacing: isLarge ? '-0.0667em' : '-0.025em', color: INK }}>
                    {person.days.toLocaleString()}
                  </div>
                  <span className="font-mono block leading-[1.67] uppercase" style={{ fontSize: '0.75rem', color: GOLD }}>Days of freedom</span>
                </div>

                {/* Hover: name + role over the clear photo */}
                <div className="absolute bottom-0 left-0 right-0 p-6" style={{ opacity: isHov ? 1 : 0, transform: isHov ? 'translateY(0)' : 'translateY(10px)', transition: 'all 0.4s ease' }}>
                  <p className="font-mono text-[0.875rem] leading-[1.57] uppercase" style={{ color: GOLD }}>{person.name}</p>
                  <p className="font-body text-[1rem] mt-1 leading-[1.5]" style={{ color: INK }}>{person.role}</p>
                </div>
              </div>
            )
          })}

          {/* +33 more */}
          <div className="col-span-1 row-span-1 relative flex items-center justify-center cursor-pointer" style={{ background: BG, border: `1px solid ${BORDER}`, transition: 'border-color 0.3s' }} data-cursor="true"
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = GOLD)}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = BORDER)}>
            <div className="text-center">
              <div className="font-display font-bold leading-[1.4] tracking-[-0.04em]" style={{ fontSize: '2.5rem', color: GOLD }}>+33</div>
              <p className="font-mono mt-2 leading-[1.67] uppercase" style={{ fontSize: '0.75rem', color: INK4 }}>More Overcomers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Section 7: Ecosystem ──────────────────────────────────────────────────

function EcosystemSection() {
  const { ref, inView } = useInView(0.08)
  const [activeIdx, setActiveIdx] = useState<number | null>(null)

  return (
    <div ref={ref} className="py-30 px-20" style={{ background: BG }}>
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-16">
          <p className="font-mono text-[0.75rem] mb-4 leading-[1.67] uppercase" style={{ color: GOLD, opacity: inView ? 1 : 0, transition: 'opacity 0.8s' }}>Community Partners</p>
          <h2 className="font-display font-bold leading-[1.33] tracking-[-0.0667em]" style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)', color: INK, opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity 0.9s 0.1s, transform 0.9s 0.1s' }}>
            No one walks alone.
          </h2>
          <p className="font-body text-[1rem] mt-5 font-normal max-w-lg leading-[1.5]" style={{ color: INK3, opacity: inView ? 1 : 0, transition: 'opacity 1s 0.2s' }}>
            Behind every overcomer is a web of support — organisations, communities, and individuals who believe the same thing THH does.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-6 items-start">
          {/* Portrait */}
          <div className="col-span-2" style={{ opacity: inView ? 1 : 0, transition: 'opacity 1s 0.3s' }}>
            <div className="relative" style={{ aspectRatio: '3/4' }}>
              <img src="https://images.unsplash.com/photo-1542207342-464d0c94c21c?w=300&h=400&fit=crop&auto=format" alt="Overcomer" className="w-full h-full object-cover" style={{ filter: 'grayscale(100%) contrast(0.85) brightness(1.05)' }} />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${BG2} 0%, transparent 55%)` }} />
              <div className="absolute bottom-4 left-4">
                <span className="font-mono leading-[1.67]" style={{ fontSize: '0.75rem', color: GOLD }}>I AM</span>
                <div className="font-display font-bold text-[2rem] leading-[1.5] tracking-[-0.025em]" style={{ color: INK }}>2,456</div>
              </div>
            </div>
            <p className="font-mono mt-3 text-center leading-[1.67] uppercase" style={{ fontSize: '0.75rem', color: INK5 }}>One person</p>
          </div>

          {/* Arrow */}
          <div className="col-span-1 flex items-center justify-center" style={{ paddingTop: '7.5rem', opacity: inView ? 1 : 0, transition: 'opacity 1s 0.45s' }}>
            <div className="h-px w-full relative" style={{ background: `${GOLD}55` }}>
              <div className="absolute right-0 top-0 w-1.5 h-1.5" style={{ borderRight: `1px solid ${GOLD}88`, borderTop: `1px solid ${GOLD}88`, transform: 'translateY(-50%) rotate(45deg)' }} />
            </div>
          </div>

          {/* THH hub */}
          <div className="col-span-2" style={{ opacity: inView ? 1 : 0, transition: 'opacity 1s 0.5s' }}>
            <div className="p-5 text-center flex flex-col justify-center min-h-[200px]" style={{ border: `1px solid ${GOLD}55`, background: GOLDA }}>
              <p className="font-mono mb-4 leading-[1.67] uppercase" style={{ fontSize: '0.75rem', color: GOLD }}>The Helping Hand</p>
              {['Residential Care', 'Caseworkers', 'Counsellors', 'Chaplains', 'Life Skills'].map(s => (
                <p key={s} className="font-body text-[0.75rem] mb-2 leading-[1.67]" style={{ color: INK3 }}>{s}</p>
              ))}
            </div>
          </div>

          {/* Arrow */}
          <div className="col-span-1 flex items-center justify-center" style={{ paddingTop: '4rem', opacity: inView ? 1 : 0, transition: 'opacity 1s 0.6s' }}>
            <div className="h-px w-full relative" style={{ background: `${GOLD}55` }}>
              <div className="absolute right-0 top-0 w-1.5 h-1.5" style={{ borderRight: `1px solid ${GOLD}88`, borderTop: `1px solid ${GOLD}88`, transform: 'translateY(-50%) rotate(45deg)' }} />
            </div>
          </div>

          {/* Partner tiles */}
          <div className="col-span-6 grid grid-cols-2 gap-2">
            {PARTNERS.map((partner, i) => (
              <div key={i} className="p-5 cursor-pointer" style={{ border: `1px solid ${activeIdx === i ? GOLD : BORDER}`, background: activeIdx === i ? GOLDA : BG2, opacity: inView ? 1 : 0, transition: `opacity 0.8s ${0.6 + i * 0.08}s, border-color 0.3s, background 0.3s` }} data-cursor="true" onMouseEnter={() => setActiveIdx(i)} onMouseLeave={() => setActiveIdx(null)}>
                <p className="font-mono mb-3 leading-[1.67] uppercase" style={{ fontSize: '0.75rem', color: GOLD }}>{partner.cat}</p>
                <div className="overflow-hidden" style={{ maxHeight: activeIdx === i ? '120px' : '0px', transition: 'max-height 0.4s ease' }}>
                  {partner.items.map((item, j) => <p key={j} className="font-body text-[0.75rem] mb-2 leading-[1.67]" style={{ color: INK3 }}>{item}</p>)}
                </div>
                {activeIdx !== i && <p className="font-body text-[0.75rem] leading-[1.67]" style={{ color: INK5 }}>{partner.items.length} partners — hover to see</p>}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 pt-10 text-center" style={{ borderTop: `1px solid ${BORDER}`, opacity: inView ? 1 : 0, transition: 'opacity 1s 0.8s' }}>
          <p className="font-display font-bold text-[2rem] leading-[1.5] tracking-[-0.025em]" style={{ color: INK }}>
            One man&apos;s support network is built by <span style={{ color: GOLD }}>hundreds</span>.
          </p>
        </div>
      </div>
    </div>
  )
}

// ── Section 8: Featured Story ─────────────────────────────────────────────
// The PAST phase uses a warm sepia-dark tone. The visual journey from
// warm-dark → bright ivory communicates restoration through colour.

function FeaturedStory() {
  const ref  = useRef<HTMLDivElement>(null)
  const prog = useScrollProgress(ref)

  const phase  = prog < 0.18 ? 0 : prog < 0.36 ? 1 : prog < 0.54 ? 2 : prog < 0.74 ? 3 : 4
  const phaseP = phase === 0 ? prog / 0.18 : phase === 1 ? (prog - 0.18) / 0.18 : phase === 2 ? (prog - 0.36) / 0.18 : phase === 3 ? (prog - 0.54) / 0.2 : (prog - 0.74) / 0.26
  const pOp    = (ph: number) => phase === ph ? 1 : phase === ph + 1 ? Math.max(0, 1 - phaseP * 3) : 0

  return (
    <div ref={ref} style={{ height: '520vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden" style={{ background: BG }}>

        {/* Phase 0 — Opening: portrait on right, text on left */}
        <div className="absolute inset-0 flex" style={{ opacity: phase === 0 ? 1 : phase === 1 ? Math.max(0, 1 - phaseP * 4) : 0 }}>
          <div className="w-1/2 flex items-center justify-start" style={{ background: BG, padding: '0 5rem' }}>
            <div>
              <p className="font-mono text-[0.75rem] mb-4 leading-[1.67] uppercase" style={{ color: GOLD }}>Featured Story</p>
              <div className="font-display font-bold leading-[1] tracking-[-0.0115em]" style={{ fontSize: 'clamp(4.5rem, 13vw, 13rem)', color: INK }}>9,490</div>
              <div className="font-mono text-[0.875rem] mt-3 mb-8 leading-[1.57] uppercase" style={{ color: GOLD }}>DAYS FREE</div>
              <p className="font-body text-[1.125rem] font-normal leading-[1.44]" style={{ maxWidth: '380px', color: INK3 }}>
                Moses was fifteen when he began taking cannabis. Heroin followed. By his mid-twenties, both he and his twin brother were struggling with drug addiction.
              </p>
            </div>
          </div>
          <div className="w-1/2 relative">
            <img src="https://images.unsplash.com/photo-1542207342-464d0c94c21c?w=720&h=900&fit=crop&auto=format" alt="Daniel" className="w-full h-full object-cover" style={{ filter: 'grayscale(40%) contrast(0.95) brightness(0.88)' }} />
            <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${BG} 0%, transparent 35%)` }} />
          </div>
        </div>

        {/* Phase 1 — Past: intentionally warm-dark for emotional contrast */}
        <div className="absolute inset-0 flex" style={{ opacity: pOp(1) }}>
          <div className="w-1/2 flex items-center justify-center p-20" style={{ background: BG2 }}>
            <div>
              <p className="font-mono text-[0.75rem] mb-6 leading-[1.67] uppercase" style={{ color: GOLD }}>Past</p>
              <div className="font-display font-bold mb-3 leading-[1.2] tracking-[-0.02em]" style={{ fontSize: 'clamp(3.5rem, 9vw, 7.5rem)', color: INK }}>1,825</div>
              <div className="font-mono text-[0.75rem] mb-10 leading-[1.67] uppercase" style={{ color: GOLD }}>DAYS INCARCERATED</div>
              <p className="font-body text-[1rem] font-normal max-w-xs leading-[1.5]" style={{ color: INK3 }}>Five years behind walls. Every day the same. He counted not in hope, but in habit.</p>
            </div>
          </div>
          <div className="w-1/2 relative">
            <img src="https://images.unsplash.com/photo-1635214961752-160496fd3145?w=720&h=900&fit=crop&auto=format" alt="Past" className="w-full h-full object-cover" style={{ filter: 'grayscale(100%) contrast(1.0) brightness(0.45)' }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(40, 40, 40, 0.7) 0%, transparent 40%)' }} />
          </div>
        </div>

        {/* Phase 2 — Turning Point: open ivory */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ opacity: pOp(2), background: BG }}>
          <div className="text-center max-w-3xl px-12">
            <p className="font-mono text-[0.75rem] mb-10 leading-[1.67] uppercase" style={{ color: GOLD }}>The recovery journey at The Helping Hand</p>
            <blockquote className="font-display font-bold leading-[1.25] tracking-[-0.0375em]" style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)', color: INK }}>
              &ldquo;I met men who had nothing to gain from being kind to me. But they were. That was God.&rdquo;
            </blockquote>
            <p className="font-body text-[0.875rem] mt-8 font-normal leading-[1.57]" style={{ color: GOLD }}>— Daniel T., resident since 2018</p>
            <p className="font-body text-[0.875rem] mt-5 max-w-md mx-auto leading-[1.57]" style={{ color: INK3 }}>The Helping Hand offered Daniel a room, a community, and the slow work of becoming someone new.</p>
          </div>
        </div>

        {/* Phase 3 — Present: warm and open */}
        <div className="absolute inset-0 flex" style={{ opacity: pOp(3) }}>
          <div className="w-1/2 relative">
            <img src="https://images.unsplash.com/photo-1542207342-464d0c94c21c?w=720&h=900&fit=crop&auto=format" alt="Present" className="w-full h-full object-cover" style={{ filter: 'grayscale(10%) contrast(1.0) brightness(0.92)' }} />
            <div className="absolute inset-0" style={{ background: `linear-gradient(to right, transparent, ${BG2}55)` }} />
          </div>
          <div className="w-1/2 flex items-center justify-center p-20" style={{ background: BG2 }}>
            <div>
              <p className="font-mono text-[0.75rem] mb-6 leading-[1.67] uppercase" style={{ color: GOLD }}>Present</p>
              <div className="font-display font-bold mb-3 leading-[1.2] tracking-[-0.02em]" style={{ fontSize: 'clamp(3.5rem, 9vw, 7.5rem)', color: INK }}>9,490</div>
              <div className="font-mono text-[0.75rem] mb-10 leading-[1.67] uppercase" style={{ color: GOLD }}>DAYS FREE</div>
              <p className="font-body text-[1rem] font-normal max-w-xs leading-[1.5]" style={{ color: INK3 }}>Through perseverance and in god&apos;s grace, Clement is deepening his professional skills in Facilities Management.</p>
            </div>
          </div>
        </div>

        {/* Phase 4 — And Counting */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ opacity: phase === 4 ? 1 : 0, transition: 'opacity 1s', background: BG }}>
          <div className="text-center">
            <p className="font-mono text-[0.75rem] mb-5 leading-[1.67] uppercase" style={{ color: GOLD }}>I AM</p>
            <div className="font-display font-bold leading-[1] tracking-[-0.0115em]" style={{ fontSize: 'clamp(6rem, 17vw, 13rem)', color: INK }}>2,456</div>
            <div className="font-display font-normal mt-4 leading-[1.33] tracking-[-0.0333em]" style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: GOLD }}>AND COUNTING.</div>
            <p className="font-body text-[1rem] mt-10 font-normal leading-[1.5]" style={{ color: INK4 }}>Tomorrow, he will be 2,457.</p>
          </div>
        </div>

        {/* Phase dots */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
          {[0, 1, 2, 3, 4].map(i => (
            <div key={i} className="rounded-full transition-all duration-500" style={{ width: phase === i ? '20px' : '4px', height: '4px', background: phase === i ? GOLD : BORDER }} />
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Section 9: Leadership ─────────────────────────────────────────────────

function LeadershipSection() {
  const { ref, inView } = useInView(0.08)
  const [hovIdx, setHovIdx] = useState<number | null>(null)

  const featured = LEADERSHIP.find(l => l.featured)!
  const others   = LEADERSHIP.filter(l => !l.featured)

  return (
    <div ref={ref} className="py-30 px-20" style={{ background: BG2 }}>
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-16" style={{ opacity: inView ? 1 : 0, transition: 'opacity 0.8s' }}>
          <p className="font-mono text-[0.75rem] mb-4 leading-[1.67] uppercase" style={{ color: GOLD }}>People Behind THH</p>
          <h2 className="font-display font-bold leading-[1.33] tracking-[-0.0667em]" style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)', color: INK }}>
            40 years made by<br />the people who stayed.
          </h2>
        </div>

        {/* Featured ED */}
        <div className="grid grid-cols-12 gap-8 mb-16">
          <div className="col-span-4 relative" style={{ opacity: inView ? 1 : 0, transition: 'opacity 1s 0.2s' }}>
            <div className="relative" style={{ aspectRatio: '3/4' }}>
              <img src={featured.img} alt={featured.name} className="w-full h-full object-cover" style={{ filter: 'grayscale(20%) contrast(1.0) brightness(0.92)' }} />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${BG2} 0%, rgba(234, 240, 248, 0.2) 40%, transparent 65%)` }} />
              <div className="absolute bottom-6 left-6">
                <p className="font-mono text-[0.75rem] leading-[1.67]" style={{ color: GOLD }}>{featured.role}</p>
                <p className="font-display font-bold text-[1.125rem] mt-1 leading-[1.78]" style={{ color: INK }}>{featured.name}</p>
                <p className="font-mono text-[0.75rem] mt-1 leading-[1.67]" style={{ color: INK3 }}>{featured.note}</p>
              </div>
            </div>
          </div>
          <div className="col-span-8 flex items-center" style={{ opacity: inView ? 1 : 0, transition: 'opacity 1s 0.4s' }}>
            <div className="pl-12">
              <div className="font-display font-bold mb-2 leading-[1.33] tracking-[-0.0667em]" style={{ fontSize: '4.5rem', color: GOLD, opacity: 0.22 }}>&ldquo;</div>
              <blockquote className="font-display font-bold leading-[1.4] tracking-[-0.04em]" style={{ fontSize: 'clamp(2rem, 2.8vw, 2.5rem)', color: INK, marginTop: '-1.5rem' }}>
                {featured.quote}
              </blockquote>
              <p className="font-mono text-[0.75rem] mt-8 leading-[1.67] uppercase" style={{ color: GOLD }}>— {featured.name}, {featured.role}</p>
            </div>
          </div>
        </div>

        {/* Others */}
        <div className="pt-12" style={{ borderTop: `1px solid ${BORDER}` }}>
          <p className="font-mono text-[0.75rem] mb-8 leading-[1.67] uppercase" style={{ color: INK5 }}>Leadership Team</p>
          <div className="grid grid-cols-4 gap-4">
            {others.map((person, i) => (
              <div key={i} className="relative overflow-hidden cursor-pointer" style={{ opacity: inView ? 1 : 0, transition: `opacity 0.8s ${0.4 + i * 0.1}s`, aspectRatio: '3/4' }} data-cursor="true" onMouseEnter={() => setHovIdx(i)} onMouseLeave={() => setHovIdx(null)}>
                <img src={person.img} alt={person.name} className="w-full h-full object-cover" style={{ filter: hovIdx === i ? 'grayscale(15%) contrast(1.0) brightness(0.9)' : 'grayscale(100%) contrast(0.85) brightness(1.05)', transform: hovIdx === i ? 'scale(1.04)' : 'scale(1)', transition: 'filter 0.6s, transform 0.6s' }} />
                <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${BG2} 0%, rgba(234, 240, 248, 0.25) 45%, transparent 70%)` }} />
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="font-mono mb-1 leading-[1.67]" style={{ fontSize: '0.75rem', color: GOLD }}>{person.role}</p>
                  <p className="font-display font-bold text-[1.125rem] leading-[1.78]" style={{ color: INK }}>{person.name}</p>
                  <p className="font-body text-[0.75rem] mt-1 leading-[1.67]" style={{ color: INK3, opacity: hovIdx === i ? 1 : 0, transition: 'opacity 0.4s' }}>{person.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Section 10: Collective Impact ─────────────────────────────────────────

function ImpactStat({ label, value, suffix = '', prefix = '' }: { label: string; value: number; suffix?: string; prefix?: string }) {
  const { ref, inView } = useInView()
  const count = useCounter(value, 2600, inView)
  return (
    <div ref={ref} className="pt-8" style={{ borderTop: `1px solid ${BORDER}` }}>
      <div className="font-display font-bold mb-2 leading-[1.33] tracking-[-0.0667em]" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: INK }}>
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <p className="font-body leading-[1.57]" style={{ fontSize: '0.875rem', color: GOLD }}>{label}</p>
    </div>
  )
}

function CollectiveImpact() {
  const { ref, inView } = useInView(0.1)
  return (
    <div ref={ref} className="py-32 px-16" style={{ background: BG }}>
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-12 gap-8 items-center">
          {/* Portrait mosaic */}
          <div className="col-span-5 grid grid-cols-2 gap-1" style={{ gridAutoRows: '200px', background: GAP }}>
            {OVERCOMERS.slice(0, 6).map((p, i) => (
              <div key={p.id} className={`relative overflow-hidden ${i === 0 ? 'row-span-2' : ''}`} style={{ background: BG3 }}>
                <img src={p.img} alt={p.name} className="w-full h-full object-cover" style={{ filter: 'grayscale(50%) contrast(0.9) brightness(1.0)', opacity: inView ? 0.65 : 0, transform: inView ? 'scale(1)' : 'scale(1.05)', transition: `opacity 1s ${i * 0.1}s, transform 1s ${i * 0.1}s` }} />
                <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${BG3}cc 0%, transparent 50%)` }} />
                <div className="absolute bottom-2 left-3">
                  <span className="font-mono leading-[1.67]" style={{ fontSize: '0.75rem', color: GOLD }}>I AM {p.days.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="col-span-7 pl-12">
            <p className="font-mono text-[0.75rem] mb-6 leading-[1.67] uppercase" style={{ color: GOLD }}>Collective Impact</p>
            <h2 className="font-display font-bold mb-16 leading-[1.33] tracking-[-0.0667em]" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: INK }}>
              One day.<br />One life.<br /><span style={{ color: GOLD }}>40 years of<br />second chances.</span>
            </h2>
            <div className="grid grid-cols-2 gap-10">
              <ImpactStat label="Residents Served"        value={3100}  suffix="+" />
              <ImpactStat label="Hours of Work Therapy"   value={95040} />
              <ImpactStat label="Counselling Sessions"    value={1301} />
              <ImpactStat label="Spiritual Sessions"      value={1296} />
            </div>
          </div>
        </div>

        <div className="mt-20 pt-16 text-center" style={{ borderTop: `1px solid ${BORDER}` }}>
          <p className="font-display font-bold leading-[1.29] tracking-[-0.0286em]" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: INK, opacity: inView ? 1 : 0, transition: 'opacity 1.2s 0.4s' }}>
            The Helping Hand&apos;s story is about <span style={{ color: GOLD }}>lives, powered by individuals&apos; faith, commitments to change, and community support.</span>
          </p>
        </div>
      </div>
    </div>
  )
}

// ── Section 11: Organisation ──────────────────────────────────────────────

function OrganisationSection() {
  const { ref, inView } = useInView(0.05)
  const [showBoard,     setShowBoard]     = useState(false)
  const [expandedComm,  setExpandedComm]  = useState<number | null>(null)
  const [expandedGov,   setExpandedGov]   = useState<number | null>(null)
  const [orgNodes, setOrgNodes] = useState<Record<string, boolean>>({ exec: false, programmes: false, finance: false, community: false })
  const toggleNode = (k: string) => setOrgNodes(p => ({ ...p, [k]: !p[k] }))

  const row = { border: `1px solid ${BORDER}` }
  const hBg = (e: React.MouseEvent) => ((e.currentTarget as HTMLElement).style.background = BG3)
  const uBg = (e: React.MouseEvent) => ((e.currentTarget as HTMLElement).style.background = BG)
  const hBrd = (e: React.MouseEvent) => ((e.currentTarget as HTMLElement).style.borderColor = BORD2)
  const uBrd = (e: React.MouseEvent) => ((e.currentTarget as HTMLElement).style.borderColor = BORDER)

  return (
    <div ref={ref} className="py-30 px-20" style={{ background: BG2 }}>
      <div className="max-w-[1440px] mx-auto">

        {/* Intro */}
        <div className="mb-20 max-w-2xl" style={{ opacity: inView ? 1 : 0, transition: 'opacity 0.8s' }}>
          <p className="font-mono text-[0.75rem] mb-4 leading-[1.67] uppercase" style={{ color: GOLD }}>How THH Works</p>
          <h2 className="font-display font-bold leading-[1.33] tracking-[-0.0667em]" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: INK }}>The structure that<br />sustains the work.</h2>
          <p className="font-body text-[1rem] mt-6 leading-[1.5]" style={{ color: INK3 }}>Behind every overcomer is not just a person — but an organisation built over 40 years to make transformation possible.</p>
        </div>

        {/* Org Chart */}
        <div className="mb-20" style={{ opacity: inView ? 1 : 0, transition: 'opacity 0.9s 0.2s' }}>
          <p className="font-mono text-[0.75rem] mb-8 leading-[1.67] uppercase" style={{ color: INK5 }}>Organisation Chart</p>

          <button className="w-full text-left px-6 py-5 flex justify-between items-center mb-1" style={{ ...row, background: BG, transition: 'background 0.2s, border-color 0.2s' }} data-cursor="true" onMouseEnter={hBg} onMouseLeave={uBg} onClick={() => setShowBoard(!showBoard)}>
            <div>
              <span className="font-mono text-[0.75rem] leading-[1.67] uppercase" style={{ color: GOLD }}>Governing Level</span>
              <div className="font-display font-bold text-[1.125rem] mt-1 leading-[1.78]" style={{ color: INK }}>Board of Directors</div>
            </div>
            <span className="font-mono text-[0.875rem] shrink-0 ml-4 leading-[1.57]" style={{ color: INK4 }}>{showBoard ? '−' : '+'} {BOARD.length} members</span>
          </button>

          {showBoard && (
            <div className="mb-1" style={{ borderLeft: `1px solid ${BORDER}`, borderRight: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
              {BOARD.map((m, i) => (
                <div key={i} className="px-8 py-4 grid grid-cols-12 items-center" style={{ borderTop: i > 0 ? `1px solid ${BORDER}` : undefined, background: BG }}>
                  <div className="col-span-7 flex items-center gap-4">
                    <span className="font-mono text-[0.75rem] w-28 shrink-0 leading-[1.67] uppercase" style={{ color: GOLD }}>{m.designation}</span>
                    <span className="font-display font-bold text-[1rem] leading-[1.5]" style={{ color: INK }}>{m.name}</span>
                  </div>
                  <div className="col-span-4 text-right"><p className="font-body text-[0.875rem] leading-[1.57]" style={{ color: INK3 }}>{m.profession}</p></div>
                  <div className="col-span-1 text-right"><p className="font-mono text-[0.75rem] leading-[1.67]" style={{ color: INK5 }}>Since {m.since}</p></div>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-center my-1"><div className="w-px h-5" style={{ background: BORDER }} /></div>

          <div className="mx-16">
            <button className="w-full text-left px-6 py-5 flex justify-between items-center" style={{ ...row, background: BG, transition: 'background 0.2s, border-color 0.2s' }} data-cursor="true" onMouseEnter={hBg} onMouseLeave={uBg} onClick={() => toggleNode('exec')}>
              <div>
                <span className="font-mono text-[0.75rem] leading-[1.67] uppercase" style={{ color: INK4 }}>Executive</span>
                <div className="font-display font-bold text-[1.125rem] mt-1 leading-[1.78]" style={{ color: INK }}>Ms Joyce Tan — Executive Director</div>
              </div>
              <span className="font-mono text-[0.875rem] shrink-0 ml-4 leading-[1.57]" style={{ color: INK4 }}>{orgNodes.exec ? '−' : '+ Expand'}</span>
            </button>
          </div>

          {orgNodes.exec && (
            <>
              <div className="flex justify-center my-1"><div className="w-px h-5" style={{ background: BORDER }} /></div>
              <div className="grid grid-cols-3 gap-2 mx-30">
                {[
                  { title: 'Deputy Director', name: 'Mr David Ng', sub: 'Programmes & Residential', key: 'programmes', detail: ['Residential Care Team (12)', 'Programme Officers (8)', 'Chaplaincy Services (4)'] },
                  { title: 'Director of Finance', name: 'Ms Rachel Chow', sub: 'Finance & Administration', key: 'finance', detail: ['Finance Officers (2)', 'Admin Team (3)', 'IT & Systems (1)'] },
                  { title: 'Head of Employment', name: 'Ms Grace Chen', sub: 'Employment & Community', key: 'community', detail: ['Employment Officers (4)', 'Community Liaison (2)', 'Volunteer Coordinator (1)'] },
                ].map((dept, i) => (
                  <button key={i} className="text-left px-5 py-4" style={{ ...row, background: BG, transition: 'background 0.2s, border-color 0.2s' }} data-cursor="true" onMouseEnter={hBg} onMouseLeave={uBg} onClick={() => toggleNode(dept.key)}>
                    <span className="font-mono leading-[1.67] uppercase" style={{ fontSize: '0.75rem', color: INK4 }}>{dept.title}</span>
                    <div className="font-display font-bold text-[1rem] mt-1 leading-[1.5]" style={{ color: INK }}>{dept.name}</div>
                    {orgNodes[dept.key] && (
                      <div className="mt-3 pt-3 space-y-1" style={{ borderTop: `1px solid ${BORDER}` }}>
                        {dept.detail.map((d, j) => <p key={j} className="font-body text-[0.75rem] leading-[1.67]" style={{ color: INK3 }}>{d}</p>)}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Committees */}
        <div className="mb-16 pt-16" style={{ borderTop: `1px solid ${BORDER}`, opacity: inView ? 1 : 0, transition: 'opacity 0.9s 0.4s' }}>
          <p className="font-mono text-[0.75rem] mb-8 leading-[1.67] uppercase" style={{ color: INK5 }}>Committee Members</p>
          <div className="grid grid-cols-2 gap-2">
            {COMMITTEES.map((comm, i) => (
              <div key={i} style={row}>
                <button className="w-full text-left px-6 py-5 flex justify-between items-center" style={{ background: BG, transition: 'background 0.2s' }} data-cursor="true" onMouseEnter={hBg} onMouseLeave={uBg} onClick={() => setExpandedComm(expandedComm === i ? null : i)}>
                  <div>
                    <div className="font-display font-bold text-[1.125rem] leading-[1.78]" style={{ color: INK }}>{comm.name}</div>
                    <p className="font-mono text-[0.75rem] mt-1 leading-[1.67]" style={{ color: INK4 }}>Chair: {comm.chair}</p>
                  </div>
                  <span className="font-mono text-[1.125rem] shrink-0 ml-4 leading-[1.44]" style={{ color: GOLD }}>{expandedComm === i ? '−' : '+'}</span>
                </button>
                {expandedComm === i && (
                  <div className="px-6 pb-5 pt-4" style={{ borderTop: `1px solid ${BORDER}`, background: BG }}>
                    <p className="font-body text-[0.875rem] mb-4 leading-[1.57]" style={{ color: INK3 }}>{comm.desc}</p>
                    <div className="flex gap-10">
                      <div>
                        <p className="font-mono mb-1 leading-[1.67] uppercase" style={{ fontSize: '0.75rem', color: INK5 }}>Members</p>
                        <p className="font-body text-[0.875rem] leading-[1.57]" style={{ color: INK2 }}>{comm.members} committee members</p>
                      </div>
                      <div>
                        <p className="font-mono mb-1 leading-[1.67] uppercase" style={{ fontSize: '0.75rem', color: INK5 }}>Frequency</p>
                        <p className="font-body text-[0.875rem] leading-[1.57]" style={{ color: INK2 }}>{comm.meets}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Governance */}
        <div className="pt-16" style={{ borderTop: `1px solid ${BORDER}`, opacity: inView ? 1 : 0, transition: 'opacity 0.9s 0.6s' }}>
          <div className="flex justify-between items-end mb-10">
            <div>
              <p className="font-mono text-[0.75rem] mb-3 leading-[1.67] uppercase" style={{ color: INK5 }}>Corporate Governance</p>
              <h3 className="font-display font-bold leading-[1.33] tracking-[-0.0333em]" style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: INK }}>Trust is the foundation<br />of 40 years.</h3>
            </div>
            <div className="px-5 py-3" style={{ border: `1px solid ${GOLD}66` }}>
              <span className="font-mono text-[0.75rem] block leading-[1.67]" style={{ color: GOLD }}>Enhanced Tier</span>
              <div className="font-body text-[0.75rem] mt-1 leading-[1.67]" style={{ color: INK4 }}>Charity Governance Framework</div>
            </div>
          </div>

          <div className="space-y-1 mb-8">
            {GOVERNANCE.map((item, i) => (
              <div key={i} style={row}>
                <button className="w-full text-left px-6 py-4 flex justify-between items-center" style={{ background: BG, transition: 'background 0.2s' }} data-cursor="true" onMouseEnter={hBg} onMouseLeave={uBg} onClick={() => setExpandedGov(expandedGov === i ? null : i)}>
                  <span className="font-display font-bold text-[1rem] leading-[1.5]" style={{ color: INK }}>{item.title}</span>
                  <span className="font-mono text-[1.125rem] shrink-0 ml-4 leading-[1.44]" style={{ color: GOLD }}>{expandedGov === i ? '−' : '+'}</span>
                </button>
                {expandedGov === i && (
                  <div className="px-6 pb-5 pt-4" style={{ borderTop: `1px solid ${BORDER}`, background: BG }}>
                    <p className="font-body text-[0.875rem] leading-[1.57]" style={{ color: INK3 }}>{item.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            {['Annual Report 2024', 'Financial Statements', 'Governance Policy'].map(label => (
              <button key={label} className="font-mono text-[0.75rem] px-5 py-3 leading-[1.67] uppercase" style={{ border: `1px solid ${BORDER}`, color: INK3, background: BG, transition: 'all 0.3s' }} data-cursor="true"
                onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = GOLD; el.style.color = GOLD }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = BORDER; el.style.color = INK3 }}
              >{label}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Section 12: The Next Day ──────────────────────────────────────────────

function NextDay() {
  const { ref, inView } = useInView(0.2)
  const [showPlus,   setShowPlus]   = useState(false)
  const [showLine,   setShowLine]   = useState(false)
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    if (!inView) return
    const t1 = setTimeout(() => setShowPlus(true),   900)
    const t2 = setTimeout(() => setShowLine(true),  1700)
    const t3 = setTimeout(() => setShowResult(true), 2400)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [inView])

  return (
    <div ref={ref} className="min-h-screen flex flex-col items-center justify-center py-32 px-16 relative overflow-hidden" style={{ background: BG }}>
      {/* Warm ambient glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 65% 65% at 50% 50%, ${GOLDA} 0%, transparent 70%)` }} />

      <div className="max-w-[1440px] mx-auto w-full relative">
        <div className="text-center mb-30">
          <p className="font-mono text-[0.75rem] mb-16 leading-[1.67] uppercase" style={{ color: GOLD }}>Beyond 40</p>

          <div className="font-display font-bold leading-[1] tracking-[-0.0115em]" style={{ fontSize: 'clamp(4.5rem, 14vw, 13rem)', color: INK }}>14,600</div>

          <div className="font-display font-bold mt-1 leading-[1.2] tracking-[-0.02em]" style={{ fontSize: 'clamp(3rem, 9vw, 7.5rem)', color: GOLD, opacity: showPlus ? 1 : 0, transform: showPlus ? 'translateY(0)' : 'translateY(16px)', transition: 'opacity 0.7s, transform 0.7s' }}>+1</div>

          <div className="mx-auto my-4" style={{ width: showLine ? '360px' : '0px', height: '1px', background: `${GOLD}66`, transition: 'width 1s ease' }} />

          <div className="font-display font-bold leading-[1] tracking-[-0.0115em]" style={{ fontSize: 'clamp(4.5rem, 14vw, 13rem)', background: `linear-gradient(135deg, ${INK} 0%, ${GOLD} 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', opacity: showResult ? 1 : 0, transform: showResult ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 1s, transform 1s' }}>14,601</div>

          <p className="font-body text-[1.125rem] font-normal mt-16 leading-[1.44]" style={{ color: INK3 }}>
            40 years is a long journey. We thank all our partners, donors and community for helping us restore and renew lives.
          </p>
          <p className="font-body text-[1.125rem] font-normal mt-4 leading-[1.44] max-w-[640px] mx-auto" style={{ color: INK3 }}>
            It is on the shoulders of all who came before us that we continue to stand tall as we strive towards a better tomorrow for all who came through our door! Join us today!
          </p>
        </div>

        {/* CTAs */}
        <div className="text-center mb-20">
          <p className="font-mono text-[0.75rem] mb-10 leading-[1.67] uppercase" style={{ color: GOLD }}>Be Part of the Next Chapter</p>
          <div className="flex gap-4 justify-center flex-wrap">
            {[{ label: 'Donate', primary: true }, { label: 'Volunteer With Us', primary: false }, { label: 'Partner With THH', primary: false }].map(({ label, primary }) => (
              <button key={label} className="font-mono text-[0.875rem] leading-[1.57]" data-cursor="true"
                style={{ padding: '1rem 2.5rem', background: primary ? GOLD : 'transparent', color: primary ? BG : INK, border: primary ? 'none' : `1px solid ${BORD2}`, transition: 'all 0.3s ease' }}
                onMouseEnter={e => { const el = e.currentTarget; if (primary) el.style.background = INK; else { el.style.borderColor = GOLD; el.style.color = GOLD } }}
                onMouseLeave={e => { const el = e.currentTarget; if (primary) el.style.background = GOLD; else { el.style.borderColor = BORD2; el.style.color = INK } }}
              >{label}</button>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

// ── Donor Impact Teaser ────────────────────────────────────────────────────

function DonorImpactTeaser({ onExplore }: { onExplore: () => void }) {
  const { ref, inView } = useInView(0.16)
  return (
    <div ref={ref} className="home-donor-teaser">
      <div className="home-donor-teaser__image">
        <img
          src="https://images.unsplash.com/photo-1707286380312-ad352aa56cde?w=1200&h=1200&fit=crop&auto=format"
          alt="A community walking forward together"
        />
      </div>
      <div className="home-donor-teaser__content" style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)' }}>
        <span>Impact made possible together</span>
        <div>See what support<br /><em>makes possible.</em></div>
        <p>Discover how donors and partners have supported THH’s work — and how funding is translated into programmes, outcomes and lasting impact.</p>
        <button type="button" onClick={onExplore} data-cursor="true">
          Explore our impact <i>→</i>
        </button>
      </div>
      <div className="home-donor-teaser__number" aria-hidden="true">+1</div>
    </div>
  )
}

// ── App ───────────────────────────────────────────────────────────────────

export default function App() {
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname)
      window.scrollTo(0, 0)
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = (nextPath: string) => {
    if (window.location.pathname !== nextPath) {
      window.history.pushState({}, '', nextPath)
      setPath(nextPath)
    }
    window.scrollTo(0, 0)
  }


  const page = path === '/journey'
    ? <HistoryPage />
    : path === '/impact'
      ? <DonorImpactPage onHome={() => navigate('/')} />
      : (
        <div className="home-page" style={{ background: BG, color: INK }}>
          <CustomCursor />
          <PageProgressBar />
          <DrugFreeDatePicker />
          <AnniversarySequence />
          <FeaturedStory />
          <OvercomersWall />
          <CollectiveImpact />
          <DonorImpactTeaser onExplore={() => navigate('/impact')} />
          <NextDay />
        </div>
      )

  return (
    <>
      <HomeHeader currentPath={path} onNavigate={navigate} />
      {page}
      <SiteFooter />
    </>
  )
}
