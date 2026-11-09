import { useEffect, useRef, useState } from "react"
import "./timeline.css"

const YEARS = ["1987", "1988", "1990", "1995", "1997", "2006", "2010", "2019", "2020", "2024", "2025", "2027"]

const MILESTONES = [
  {
    year: "1987",
    eyebrow: "The first chapter",
    title: "A beginning takes shape.",
    copy: "Placeholder milestone — a short account of THH’s earliest chapter will live here.",
    image: "https://images.unsplash.com/photo-1467255937074-5600b010d6db?w=1400&h=1000&fit=crop&auto=format",
    layout: "opening",
  },
  {
    year: "1988",
    eyebrow: "One year on",
    title: "The journey finds its feet.",
    copy: "Placeholder milestone — a quiet moment of early learning, resolve and human connection.",
    image: "https://images.unsplash.com/photo-1561964192-0fdbcaeaa30e?w=900&h=1200&fit=crop&auto=format",
    layout: "portrait",
  },
  {
    year: "1990",
    eyebrow: "A new decade",
    title: "Small steps become shared purpose.",
    copy: "Placeholder milestone — a defining moment from the start of the 1990s will be added here.",
    image: "https://images.unsplash.com/photo-1506093877953-f050840b0876?w=1400&h=950&fit=crop&auto=format",
    layout: "panorama",
  },
  {
    year: "1995",
    eyebrow: "The work continues",
    title: "Change is built one day at a time.",
    copy: "Placeholder milestone — a mid-decade story about people and progress will live here.",
    image: "https://images.unsplash.com/photo-1636979276810-3985c469718a?w=950&h=1250&fit=crop&auto=format",
    layout: "split",
  },
  {
    year: "1997",
    eyebrow: "Ten years",
    title: "A decade carried by many hands.",
    copy: "Placeholder milestone — this expanded chapter marks ten years since 1987.",
    image: "https://images.unsplash.com/photo-1601749990579-c03146da4d0f?w=1400&h=1000&fit=crop&auto=format",
    layout: "anniversary",
  },
  {
    year: "2006",
    eyebrow: "The story widens",
    title: "New people. New possibilities.",
    copy: "Placeholder milestone — a story of continued growth and change will be added here.",
    image: "https://images.unsplash.com/photo-1630509866847-9c007e59a8ce?w=1000&h=1250&fit=crop&auto=format",
    layout: "portrait-reverse",
  },
  {
    year: "2010",
    eyebrow: "Another decade",
    title: "Experience becomes momentum.",
    copy: "Placeholder milestone — a significant moment from 2010 will live here.",
    image: "https://images.unsplash.com/photo-1467255937074-5600b010d6db?w=1400&h=900&fit=crop&auto=format",
    layout: "type-led",
  },
  {
    year: "2019",
    eyebrow: "Moving forward",
    title: "The circle of support grows.",
    copy: "Placeholder milestone — a chapter about community and shared effort will be added here.",
    image: "https://images.unsplash.com/photo-1506093877953-f050840b0876?w=1200&h=1000&fit=crop&auto=format",
    layout: "collage",
  },
  {
    year: "2020",
    eyebrow: "A year of challenge",
    title: "Through change, the work endures.",
    copy: "Placeholder milestone — a careful account of this challenging period will live here.",
    image: "https://images.unsplash.com/photo-1636979276810-3985c469718a?w=1200&h=1000&fit=crop&auto=format",
    layout: "quiet",
  },
  {
    year: "2024",
    eyebrow: "The present chapter",
    title: "Forty years, still moving.",
    copy: "Placeholder milestone — a contemporary reflection will connect this journey to IAM40.",
    image: "https://images.unsplash.com/photo-1601749990579-c03146da4d0f?w=1400&h=1000&fit=crop&auto=format",
    layout: "present",
  },
  {
    year: "2025",
    eyebrow: "Forty years",
    title: "A milestone becomes a new beginning.",
    copy: "Placeholder milestone — a reflection on THH’s 40th anniversary and the lives carried forward.",
    image: "https://images.unsplash.com/photo-1467255937074-5600b010d6db?w=1400&h=1000&fit=crop&auto=format",
    layout: "portrait",
  },
  {
    year: "2027",
    eyebrow: "The journey continues",
    title: "The next chapter takes shape.",
    copy: "Placeholder milestone — a future chapter will document the people, progress and purpose ahead.",
    image: "https://images.unsplash.com/photo-1506093877953-f050840b0876?w=1400&h=950&fit=crop&auto=format",
    layout: "panorama",
  },
]

function useSectionProgress(ref: React.RefObject<HTMLDivElement | null>) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const element = ref.current
      if (!element) return
      const bounds = element.getBoundingClientRect()
      const distance = element.offsetHeight - window.innerHeight
      setProgress(Math.max(0, Math.min(1, -bounds.top / Math.max(distance, 1))))
    }

    update()
    window.addEventListener("scroll", update, { passive: true })
    return () => window.removeEventListener("scroll", update)
  }, [ref])

  return progress
}

function TimelineNavigation({
  activeIndex,
  onSelect,
}: {
  activeIndex: number
  onSelect: (year: string) => void
}) {
  const yearsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = yearsRef.current
    if (!container || container.scrollWidth <= container.clientWidth) return
    const activeYear = container.querySelectorAll<HTMLButtonElement>("button")[activeIndex]
    if (!activeYear) return
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    container.scrollTo({
      left: activeYear.offsetLeft - (container.clientWidth - activeYear.offsetWidth) / 2,
      behavior: reducedMotion ? "auto" : "smooth",
    })
  }, [activeIndex])

  return (
    <nav className="history-timeline__nav" aria-label="Journey timeline">
      <div className="history-timeline__nav-heading">
        <span>Our journey</span>
        <strong>{YEARS[activeIndex]}</strong>
      </div>
      <div className="history-timeline__years" ref={yearsRef}>
        <div className="history-timeline__line" aria-hidden="true">
          <i style={{ height: `${(activeIndex / (YEARS.length - 1)) * 100}%` }} />
        </div>
        {YEARS.map((year, index) => (
          <button
            type="button"
            className={index === activeIndex ? "is-active" : ""}
            aria-current={index === activeIndex ? "step" : undefined}
            onClick={() => onSelect(year)}
            key={year}
          >
            <i aria-hidden="true" />
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{year}</strong>
          </button>
        ))}
      </div>
      <span className="history-timeline__nav-count">{String(activeIndex + 1).padStart(2, "0")} / {YEARS.length}</span>
    </nav>
  )
}

function HistoryIntro() {
  const ref = useRef<HTMLDivElement>(null)
  const progress = useSectionProgress(ref)
  const yearProgress = Math.min(1, Math.max(0, (progress - 0.35) / 0.45))
  const currentYear = Math.round(1987 + (2024 - 1987) * yearProgress)

  return (
    <div className="history-intro" ref={ref}>
      <div className="history-intro__sticky">
        <div className="history-grain" />
        <div className="history-intro__topline">
          <span>The Helping Hand</span>
          <span>IAM40 / Our history</span>
        </div>
        <div className="history-intro__center">
          <div className="history-kicker">From 1987 to today</div>
          <div className="history-intro__title">
            <span>40 YEARS.</span>
            <span className="history-intro__outline">ONE JOURNEY.</span>
          </div>
          <p className="history-intro__copy">
            Not simply a sequence of dates, but years of people, change, growth, challenge and lives transformed.
          </p>
        </div>
        <div className="history-intro__count" style={{ opacity: yearProgress }}>
          <span>Passing through</span>
          <strong>{currentYear}</strong>
        </div>
        <div className="history-scroll-cue" style={{ opacity: Math.max(0, 1 - progress * 5) }}>
          <span>Enter the journey</span>
          <i />
        </div>
      </div>
    </div>
  )
}

// Figma "timeline" year panels (1440 x 1080): white / light-blue alternate, photo on the right
// except 2006 and 2024 (photo left); 1997 and 2027 are grey checker panels without a photo.
const PANEL_STYLE: Record<string, { tone: "white" | "light" | "dark"; reverse?: boolean }> = {
  "1987": { tone: "white" },
  "1988": { tone: "light" },
  "1990": { tone: "white" },
  "1995": { tone: "light" },
  "1997": { tone: "dark" },
  "2006": { tone: "white", reverse: true },
  "2010": { tone: "white" },
  "2019": { tone: "light" },
  "2020": { tone: "light" },
  "2024": { tone: "white", reverse: true },
  "2025": { tone: "light" },
  "2027": { tone: "dark" },
}

function MilestoneScene({
  milestone,
  revealProgress,
  continueDirection,
}: {
  milestone: (typeof MILESTONES)[number]
  index: number
  revealProgress: number
  continueDirection: "forward" | "backward" | null
}) {
  const style = PANEL_STYLE[milestone.year] ?? { tone: "white" }
  const verticalInset = (1 - revealProgress) * 46
  const horizontalInset = (1 - revealProgress) * 10

  return (
    <section
      className={`tl-panel tl-panel--${style.tone}${style.reverse ? " tl-panel--reverse" : ""}`}
      data-year={milestone.year}
      aria-labelledby={`journey-${milestone.year}-title`}
    >
      <div className="tl-panel__stage">
        <div className="tl-panel__year" aria-hidden="true">{milestone.year}</div>
        <div className="tl-panel__content">
          <div className="tl-panel__copy">
            <div className="tl-panel__heading">
              <span>{milestone.eyebrow}</span>
              <div id={`journey-${milestone.year}-title`}>{milestone.title}</div>
            </div>
            <p>{milestone.copy}</p>
          </div>
          {style.tone !== "dark" && (
            <div className="tl-panel__image" style={{ clipPath: `inset(${verticalInset}% ${horizontalInset}%)` }}>
              <img src={milestone.image} alt="Documentary-style community moment" />
              <span>Residential care, structured programmes and a stable environment for rehabilitation.</span>
            </div>
          )}
        </div>
      </div>
      {continueDirection && (
        <div className="history-timeline__continue-cue" aria-live="polite">
          <span>{continueDirection === "forward" ? "Scroll to explore the next chapter" : "Scroll to revisit the previous chapter"}</span>
          <i aria-hidden="true">{continueDirection === "forward" ? "↓" : "↑"}</i>
        </div>
      )}
    </section>
  )
}

function HistoryFinale() {
  const ref = useRef<HTMLDivElement>(null)
  const progress = useSectionProgress(ref)
  const first = Math.max(0, 1 - progress / 0.25)
  const second = Math.min(1, Math.max(0, (progress - 0.3) / 0.12)) * Math.max(0, 1 - Math.max(0, progress - 0.55) / 0.07)
  const third = Math.min(1, Math.max(0, (progress - 0.64) / 0.14))

  return (
    <div className="history-finale" ref={ref}>
      <div className="history-finale__sticky">
        <div className="history-grain" />
        <div className="history-finale__years" style={{ opacity: first }}>
          1987 <i /> 2027
        </div>
        <div className="history-finale__statement" style={{ opacity: second }}>
          <span>ALL THESE YEARS BECAME</span>
          <strong>I AM 40</strong>
        </div>
        <div className="history-finale__result" style={{ opacity: third, transform: `scale(${0.9 + third * 0.1})` }}>
          <span>I AM</span>
          <strong>14,600</strong>
          <em>DAYS</em>
          <p>Forty years are made of days.<br />Every day is made of people.</p>
        </div>
      </div>
    </div>
  )
}

type ScrollDirection = "forward" | "backward"

// Page scroll drives the timeline. The section gets SCROLL_PER_YEAR vh of scroll per year while its
// stage stays sticky; the scroll position inside the section picks the year, and the position inside
// that year's slice controls how far its image is revealed (REVEAL_START..REVEAL_END of the slice).
const SCROLL_PER_YEAR = 100
const REVEAL_START = 0.1
const REVEAL_END = 0.6

export default function HistoryPage() {
  const [displayedIndex, setDisplayedIndex] = useState(0)
  const [displayedReveal, setDisplayedReveal] = useState(0)
  const [outgoing, setOutgoing] = useState<{ index: number; reveal: number; key: number } | null>(null)
  const [continueDirection, setContinueDirection] = useState<ScrollDirection | null>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const stateRef = useRef({ index: 0, reveal: 0 })
  const transitionKeyRef = useRef(0)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const timeline = timelineRef.current
      if (!timeline) return
      const travel = Math.max(timeline.offsetHeight - window.innerHeight, 1)
      const progress = Math.min(0.99999, Math.max(0, -timeline.getBoundingClientRect().top / travel))
      const position = progress * YEARS.length
      const index = Math.floor(position)
      const withinYear = position - index
      const rawReveal = (withinYear - REVEAL_START) / (REVEAL_END - REVEAL_START)
      const reveal = Math.round(Math.min(1, Math.max(0, rawReveal)) * 1000) / 1000
      const previous = stateRef.current

      if (index !== previous.index) {
        // Cross-fade: keep the old year as an outgoing layer until its fade-out animation ends
        transitionKeyRef.current += 1
        setOutgoing({ index: previous.index, reveal: previous.reveal, key: transitionKeyRef.current })
        setDisplayedIndex(index)
      }
      if (index !== previous.index || reveal !== previous.reveal) setDisplayedReveal(reveal)
      stateRef.current = { index, reveal }
      setContinueDirection(reveal >= 1 && index < YEARS.length - 1 ? "forward" : null)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  // Clicking a year scrolls the page to the point where that year's image is fully revealed
  const displayYear = (year: string) => {
    const index = YEARS.indexOf(year)
    const timeline = timelineRef.current
    if (index < 0 || !timeline) return
    const travel = timeline.offsetHeight - window.innerHeight
    const top = window.scrollY + timeline.getBoundingClientRect().top
    window.scrollTo({ top: top + travel * ((index + REVEAL_END + 0.05) / YEARS.length), behavior: "auto" })
  }

  const displayedMilestone = MILESTONES[displayedIndex]
  const outgoingMilestone = outgoing === null ? null : MILESTONES[outgoing.index]

  return (
    <div className="history-page">
      <HistoryIntro />
      <div className="history-opening-note">
        <span>Forty years cannot be held in a straight line.</span>
        <p>So we remember them as moments — some loud, some quiet, all carried forward.</p>
      </div>
      <div
        className="history-timeline"
        ref={timelineRef}
        style={{ height: `${YEARS.length * SCROLL_PER_YEAR + 100}vh` }}
      >
        <div className="history-timeline__viewport">
          <TimelineNavigation activeIndex={displayedIndex} onSelect={displayYear} />
          <div className="history-timeline__content">
            <div
              className={`history-timeline__layer${outgoingMilestone ? " is-entering" : ""}`}
              key={`current-${displayedMilestone.year}`}
            >
              <MilestoneScene
                milestone={displayedMilestone}
                index={displayedIndex}
                revealProgress={displayedReveal}
                continueDirection={continueDirection}
              />
            </div>
            {outgoingMilestone && outgoing && (
              <div
                className="history-timeline__layer is-leaving"
                key={`outgoing-${outgoing.key}`}
                onAnimationEnd={(event) => {
                  if (event.currentTarget !== event.target) return
                  const finishedKey = outgoing.key
                  setOutgoing((current) => (current?.key === finishedKey ? null : current))
                }}
              >
                <MilestoneScene
                  milestone={outgoingMilestone}
                  index={outgoing.index}
                  revealProgress={outgoing.reveal}
                  continueDirection={null}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <HistoryFinale />
    </div>
  )
}
