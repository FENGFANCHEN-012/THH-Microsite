import { useEffect, useRef, useState } from "react"

const YEARS = ["1987", "1988", "1990", "1995", "1997", "2006", "2010", "2019", "2020", "2024", "2025", "2027"]

const DECADE_NOTES: Record<string, string> = {
  "1990": "The first years give way to a new decade.",
  "2006": "A new century. The same belief in change.",
  "2020": "The story moves closer to the present.",
}

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
            <span style={{ transform: `translateX(${-progress * 6}vw)` }}>40 YEARS.</span>
            <span className="history-intro__outline" style={{ transform: `translateX(${progress * 6}vw)` }}>ONE JOURNEY.</span>
          </div>
          <p className="history-intro__copy" style={{ opacity: Math.min(1, progress * 4) }}>
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

function MilestoneScene({
  milestone,
  index,
  revealProgress,
  continueDirection,
  onRevealTransitionEnd,
}: {
  milestone: (typeof MILESTONES)[number]
  index: number
  revealProgress: number
  continueDirection: "forward" | "backward" | null
  onRevealTransitionEnd?: () => void
}) {
  const decadeNote = DECADE_NOTES[milestone.year]
  const verticalInset = (1 - revealProgress) * 46
  const horizontalInset = (1 - revealProgress) * 10

  return (
    <section
      className={`history-timeline__milestone history-timeline__milestone--${milestone.layout} is-active`}
      data-year={milestone.year}
      aria-labelledby={`journey-${milestone.year}-title`}
    >
      <div className="history-timeline__milestone-stage">
        <div className="history-timeline__year" aria-hidden="true">{milestone.year}</div>
        <div
          className="history-timeline__image"
          style={{ clipPath: `inset(${verticalInset}% ${horizontalInset}%)` }}
          onTransitionEnd={(event) => {
            if (event.currentTarget === event.target && event.propertyName === "clip-path") {
              onRevealTransitionEnd?.()
            }
          }}
        >
          <img
            src={milestone.image}
            alt="Documentary-style community moment"
            style={{
              filter: `grayscale(${Math.max(0, 100 - index * 11)}%) sepia(${Math.max(0, 24 - index * 2.5)}%)`,
            }}
          />
          <div className="history-milestone__image-wash" />
          <span className="history-milestone__caption">Documentary image / placeholder</span>
        </div>
        <div className="history-timeline__copy">
          <span>{milestone.eyebrow}</span>
          <div className="history-milestone__heading" id={`journey-${milestone.year}-title`}>{milestone.title}</div>
          <p>{milestone.copy}</p>
          <div className="history-timeline__index">
            <span>{String(index + 1).padStart(2, "0")}</span>
            <i />
            <span>{YEARS.length}</span>
          </div>
        </div>
        {decadeNote && (
          <div className="history-timeline__decade-note">
            <span>A threshold in time</span>
            <p>{decadeNote}</p>
          </div>
        )}
        {continueDirection && (
          <div className="history-timeline__continue-cue" aria-live="polite">
            <span>{continueDirection === "forward" ? "Scroll to explore the next chapter" : "Scroll to revisit the previous chapter"}</span>
            <i aria-hidden="true">{continueDirection === "forward" ? "↓" : "↑"}</i>
          </div>
        )}
      </div>
    </section>
  )
}

function HistoryFinale() {
  const ref = useRef<HTMLDivElement>(null)
  const progress = useSectionProgress(ref)
  const first = Math.max(0, 1 - progress * 3.5)
  const second = Math.min(1, Math.max(0, (progress - 0.2) / 0.2)) * Math.max(0, 1 - Math.max(0, progress - 0.58) * 6)
  const third = Math.min(1, Math.max(0, (progress - 0.58) / 0.18))

  return (
    <div className="history-finale" ref={ref}>
      <div className="history-finale__sticky">
        <div className="history-grain" />
        <div className="history-finale__years" style={{ opacity: first }}>
          1987 <i /> 2024
        </div>
        <div className="history-finale__statement" style={{ opacity: second }}>
          <span>ALL THESE YEARS BECAME</span>
          <strong>IAM40</strong>
        </div>
        <div className="history-finale__result" style={{ opacity: third, transform: `scale(${0.9 + third * 0.1})` }}>
          <span>I AM</span>
          <strong>14,600</strong>
          <em>DAYS</em>
          <p>Forty years are made of days.<br />Every day is made of people.</p>
        </div>
        <div className="history-finale__footer">
          <span>The Helping Hand</span>
          <span>1987 → 2024 → 40 years → 14,600 days</span>
          <span>And the journey continues</span>
        </div>
      </div>
    </div>
  )
}

type TimelinePhase = "COLLAPSED" | "EXPANDED" | "PAUSED" | "TRANSITIONING"
type ScrollDirection = "forward" | "backward"

export default function HistoryPage() {
  const [displayedIndex, setDisplayedIndex] = useState(0)
  const [displayedReveal, setDisplayedReveal] = useState(0)
  const [phase, setPhase] = useState<TimelinePhase>("COLLAPSED")
  const [outgoingIndex, setOutgoingIndex] = useState<number | null>(null)
  const [outgoingReveal, setOutgoingReveal] = useState(0)
  const [continueDirection, setContinueDirection] = useState<ScrollDirection | null>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const displayedIndexRef = useRef(0)
  const displayedRevealRef = useRef(0)
  const phaseRef = useRef<TimelinePhase>("COLLAPSED")
  const interactionLockedRef = useRef(false)
  const transitionTargetRef = useRef<{ phase: TimelinePhase; direction: ScrollDirection } | null>(null)
  const handleGestureRef = useRef<(direction: ScrollDirection) => void>(() => {})

  const setTimelinePhase = (nextPhase: TimelinePhase) => {
    phaseRef.current = nextPhase
    setPhase(nextPhase)
  }

  const setReveal = (nextReveal: number) => {
    displayedRevealRef.current = nextReveal
    setDisplayedReveal(nextReveal)
  }

  const beginYearTransition = (
    nextIndex: number,
    nextPhase: TimelinePhase,
    direction: ScrollDirection,
  ) => {
    if (interactionLockedRef.current || nextIndex < 0 || nextIndex >= YEARS.length) return
    interactionLockedRef.current = true
    setOutgoingIndex(displayedIndexRef.current)
    setOutgoingReveal(displayedRevealRef.current)
    displayedIndexRef.current = nextIndex
    setDisplayedIndex(nextIndex)
    setReveal(nextPhase === "COLLAPSED" ? 0 : 1)
    transitionTargetRef.current = { phase: nextPhase, direction }
    setContinueDirection(null)
    setTimelinePhase("TRANSITIONING")
  }

  handleGestureRef.current = (direction) => {
    if (interactionLockedRef.current) return
    const currentPhase = phaseRef.current
    const currentIndex = displayedIndexRef.current

    if (direction === "forward") {
      if (currentPhase === "COLLAPSED") {
        interactionLockedRef.current = true
        setContinueDirection(null)
        setReveal(1)
        setTimelinePhase("EXPANDED")
      } else if (currentPhase === "EXPANDED") {
        setContinueDirection("forward")
        setTimelinePhase("PAUSED")
      } else if (currentPhase === "PAUSED" && currentIndex < YEARS.length - 1) {
        beginYearTransition(currentIndex + 1, "COLLAPSED", "forward")
      }
      return
    }

    if (currentPhase === "PAUSED") {
      setContinueDirection("backward")
      setTimelinePhase("EXPANDED")
    } else if (currentPhase === "EXPANDED") {
      interactionLockedRef.current = true
      setContinueDirection(null)
      setReveal(0)
      setTimelinePhase("COLLAPSED")
    } else if (currentPhase === "COLLAPSED" && currentIndex > 0) {
      beginYearTransition(currentIndex - 1, "PAUSED", "backward")
    }
  }

  useEffect(() => {
    const wheelGestureGap = 220
    let lastWheelTimestamp = Number.NEGATIVE_INFINITY
    let touchStartedInTimeline = false
    let touchGestureHandled = false
    let touchLastY = 0

    const timelineIsActive = () => {
      const timeline = timelineRef.current
      if (!timeline) return false
      const bounds = timeline.getBoundingClientRect()
      return bounds.top <= 1 && bounds.bottom >= window.innerHeight - 1
    }

    const canExitTimeline = (direction: ScrollDirection) => {
      if (interactionLockedRef.current) return false
      if (direction === "backward") {
        return displayedIndexRef.current === 0 && phaseRef.current === "COLLAPSED"
      }
      return displayedIndexRef.current === YEARS.length - 1 && phaseRef.current === "PAUSED"
    }

    const exitTimeline = (direction: ScrollDirection) => {
      const timeline = timelineRef.current
      if (!timeline) return
      const top = window.scrollY + timeline.getBoundingClientRect().top
      window.scrollTo({
        top: direction === "forward" ? top + timeline.offsetHeight : top - 1,
        behavior: "auto",
      })
    }

    const onWheel = (event: WheelEvent) => {
      const isNewGesture = event.timeStamp - lastWheelTimestamp > wheelGestureGap
      lastWheelTimestamp = event.timeStamp
      if (!timelineIsActive()) return

      const direction: ScrollDirection = event.deltaY >= 0 ? "forward" : "backward"
      event.preventDefault()
      if (canExitTimeline(direction)) {
        if (isNewGesture) exitTimeline(direction)
        return
      }
      if (!isNewGesture || interactionLockedRef.current || event.deltaY === 0) return
      handleGestureRef.current(direction)
    }

    const onTouchStart = (event: TouchEvent) => {
      touchLastY = event.touches[0]?.clientY ?? 0
      touchStartedInTimeline = timelineIsActive()
      touchGestureHandled = false
    }

    const onTouchMove = (event: TouchEvent) => {
      const currentY = event.touches[0]?.clientY
      if (currentY === undefined) return
      const delta = touchLastY - currentY
      touchLastY = currentY
      const isActive = timelineIsActive()
      if (!isActive) return

      if (!touchStartedInTimeline) {
        event.preventDefault()
        return
      }

      const direction: ScrollDirection = delta >= 0 ? "forward" : "backward"
      if (Math.abs(delta) < 8) {
        event.preventDefault()
        return
      }
      event.preventDefault()
      if (canExitTimeline(direction)) {
        if (!touchGestureHandled) {
          touchGestureHandled = true
          exitTimeline(direction)
        }
        return
      }
      if (touchGestureHandled || interactionLockedRef.current) return
      touchGestureHandled = true
      handleGestureRef.current(direction)
    }

    const onTouchEnd = () => {
      touchStartedInTimeline = false
      touchGestureHandled = false
    }

    window.addEventListener("wheel", onWheel, { passive: false })
    window.addEventListener("touchstart", onTouchStart, { passive: true })
    window.addEventListener("touchmove", onTouchMove, { passive: false })
    window.addEventListener("touchend", onTouchEnd, { passive: true })
    return () => {
      window.removeEventListener("wheel", onWheel)
      window.removeEventListener("touchstart", onTouchStart)
      window.removeEventListener("touchmove", onTouchMove)
      window.removeEventListener("touchend", onTouchEnd)
    }
  }, [])

  const completeRevealTransition = () => {
    if (!interactionLockedRef.current || phaseRef.current === "TRANSITIONING") return
    interactionLockedRef.current = false
    setContinueDirection(phaseRef.current === "EXPANDED" ? "forward" : "backward")
  }

  const completeYearTransition = () => {
    const target = transitionTargetRef.current
    if (!target || phaseRef.current !== "TRANSITIONING") return
    setOutgoingIndex(null)
    transitionTargetRef.current = null
    interactionLockedRef.current = false
    setTimelinePhase(target.phase)
    setContinueDirection(target.direction === "backward" ? "backward" : null)
  }

  const displayYear = (year: string) => {
    const index = YEARS.indexOf(year)
    if (index < 0) return
    setOutgoingIndex(null)
    transitionTargetRef.current = null
    interactionLockedRef.current = false
    displayedIndexRef.current = index
    setDisplayedIndex(index)
    setReveal(0)
    setContinueDirection(null)
    setTimelinePhase("COLLAPSED")
  }

  const displayedMilestone = MILESTONES[displayedIndex]
  const outgoingMilestone = outgoingIndex === null ? null : MILESTONES[outgoingIndex]

  return (
    <div className="history-page">
      <HistoryIntro />
      <div className="history-opening-note">
        <span>Forty years cannot be held in a straight line.</span>
        <p>So we remember them as moments — some loud, some quiet, all carried forward.</p>
      </div>
      <div className="history-timeline" ref={timelineRef} data-phase={phase}>
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
                onRevealTransitionEnd={completeRevealTransition}
              />
            </div>
            {outgoingMilestone && outgoingIndex !== null && (
              <div
                className="history-timeline__layer is-leaving"
                key={`outgoing-${outgoingMilestone.year}`}
                onAnimationEnd={(event) => {
                  if (event.currentTarget === event.target) completeYearTransition()
                }}
              >
                <MilestoneScene
                  milestone={outgoingMilestone}
                  index={outgoingIndex}
                  revealProgress={outgoingReveal}
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
