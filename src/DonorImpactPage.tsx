import { useEffect, useRef, useState } from "react"

const THH_WEBSITE = "https://www.thehelpinghand.org.sg/"

const IMPACT = [
  { value: "4,200+", label: "Residents served", note: "Current microsite figure — confirm against the latest Annual Report.", image: "https://images.unsplash.com/photo-1707286380312-ad352aa56cde?w=1200&h=1000&fit=crop&auto=format" },
  { value: "82%", label: "Employment rate", note: "Current microsite figure — confirm reporting period before publication.", image: "https://images.unsplash.com/photo-1513350027966-f016e1adcecd?w=1200&h=1000&fit=crop&auto=format" },
  { value: "847,000+", label: "Days of collective freedom", note: "Current microsite figure — confirm methodology before publication.", image: "https://images.unsplash.com/photo-1624730088819-01a310dbc10b?w=1200&h=1000&fit=crop&auto=format" },
  { value: "Data required", label: "Training opportunities", note: "Insert a verified reporting-period figure.", image: "https://images.unsplash.com/photo-1635214900921-a21e332c48a4?w=1200&h=1000&fit=crop&auto=format" },
]

const SUPPORT_AREAS = [
  { number: "01", title: "Residential rehabilitation", copy: "Residential care, structured programmes and a stable environment for rehabilitation.", outcome: "Enables stability and programme participation.", allocation: "Allocation data to be confirmed", image: "https://images.unsplash.com/photo-1707286380312-ad352aa56cde?w=1000&h=900&fit=crop&auto=format" },
  { number: "02", title: "Skills & training", copy: "Vocational development and practical training that build capability for employment.", outcome: "Enables practical capability and work readiness.", allocation: "Allocation data to be confirmed", image: "https://images.unsplash.com/photo-1513350027966-f016e1adcecd?w=1000&h=900&fit=crop&auto=format" },
  { number: "03", title: "Employment support", copy: "Employment preparation, placement support and guidance for returning to work.", outcome: "Enables pathways towards stable employment.", allocation: "Allocation data to be confirmed", image: "https://images.unsplash.com/photo-1695654396323-71beae8dadb1?w=1000&h=900&fit=crop&auto=format" },
  { number: "04", title: "Mentorship & counselling", copy: "Mentorship, counselling and sustained personal support.", outcome: "Enables continuity, confidence and accountability.", allocation: "Allocation data to be confirmed", image: "https://images.unsplash.com/photo-1721972236553-e29838cf4274?w=1000&h=900&fit=crop&auto=format" },
  { number: "05", title: "Community reintegration", copy: "Family reconciliation, peer support and community relationships.", outcome: "Enables stronger support networks after rehabilitation.", allocation: "Allocation data to be confirmed", image: "https://images.unsplash.com/photo-1614835279903-7f6c0f4f66d8?w=1000&h=900&fit=crop&auto=format" },
  { number: "06", title: "Programme & operations", copy: "The people, facilities and resources required to deliver THH’s work.", outcome: "Enables reliable, sustained programme delivery.", allocation: "Allocation data to be confirmed", image: "https://images.unsplash.com/photo-1706791776776-9078758308ae?w=1000&h=900&fit=crop&auto=format" },
]

const INLINE_OUTCOME_LABELS = new Set(["01", "02", "03", "04", "06"])

const PARTNER_GROUPS = [
  {
    label: "Public & Social Service",
    names: ["Singapore Prison Service", "NCSS", "Ministry of Social & Family Development", "SCORE"],
  },
  {
    label: "Training & Employment",
    names: ["Institute of Technical Education", "Workforce Singapore", "SkillsFuture Singapore", "NTUC LearningHub"],
  },
  {
    label: "Community",
    names: ["Faith Communities", "Employment Partners", "Volunteer Counsellors", "Health & Wellbeing Partners"],
  },
  {
    label: "Fundraising Sponsors",
    names: ["Sponsor information required", "Campaign partner data required", "Verified logos to be supplied"],
  },
]

const PARTNER_QUOTES = [
  {
    quote: "[Placeholder testimonial — insert a verified partner quote about collaboration and shared impact.]",
    organisation: "Partner organisation 01",
    speaker: "Speaker name · Designation placeholder",
  },
  {
    quote: "[Placeholder testimonial — insert a verified partner quote about THH’s programme delivery and community outcomes.]",
    organisation: "Partner organisation 02",
    speaker: "Speaker name · Designation placeholder",
  },
  {
    quote: "[Placeholder testimonial — insert a verified partner quote about the value of supporting THH’s work.]",
    organisation: "Partner organisation 03",
    speaker: "Speaker name · Designation placeholder",
  },
]

const TRUST_POINTS = [
  {
    number: "01",
    title: "Fundraising efficiency",
    copy: "Fundraising expenses are managed within the required threshold and should not exceed 30% of gross receipts from fundraising activities.",
  },
  {
    number: "02",
    title: "Allocation of donations",
    copy: "Donations received are channelled to THH’s General Fund to support programmes and operations.",
  },
  {
    number: "03",
    title: "No commercial fundraisers",
    copy: "THH does not engage commercial fundraisers for its fundraising activities.",
  },
  {
    number: "04",
    title: "Financial recording",
    copy: "All donations and fundraising income are properly recorded and accounted for.",
  },
]

function useDonorProgress(ref: React.RefObject<HTMLDivElement | null>) {
  const [progress, setProgress] = useState(0)
  const progressRef = useRef(0)
  const frameRef = useRef<number | null>(null)
  useEffect(() => {
    const update = () => {
      frameRef.current = null
      const element = ref.current
      if (!element) return
      const rect = element.getBoundingClientRect()
      const distance = Math.max(1, element.offsetHeight - window.innerHeight)
      const next = Math.max(0, Math.min(1, -rect.top / distance))
      if (Math.abs(next - progressRef.current) < 0.0005) return
      progressRef.current = next
      setProgress(next)
    }
    const requestUpdate = () => {
      if (frameRef.current !== null) return
      frameRef.current = window.requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", requestUpdate, { passive: true })
    window.addEventListener("resize", requestUpdate)
    return () => {
      window.removeEventListener("scroll", requestUpdate)
      window.removeEventListener("resize", requestUpdate)
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current)
    }
  }, [ref])
  return progress
}

function ExternalLink({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <a className={className} href={THH_WEBSITE} target="_blank" rel="noreferrer">
      {children}
    </a>
  )
}

function DonorHero() {
  return (
    <div className="donor-hero-scroll donor-hero-scroll--static">
      <div className="donor-hero">
        <div
          className="donor-hero__copy"
          aria-hidden={false}
          style={{
            opacity: 1,
            pointerEvents: "auto",
            transform: "translateY(0)",
          }}
        >
          <span className="donor-eyebrow">01 — The case for support</span>
          <div className="donor-hero__title">Your support creates<br /><em>lasting impact.</em></div>
          <p>
            THH works with donors, organisations and community partners to fund rehabilitation,
            reintegration and sustainable second chances.
          </p>
          <ExternalLink className="donor-button donor-button--primary">Support THH <i>↗</i></ExternalLink>
          <div className="donor-hero__proof">
            <div><strong>40</strong><span>Years of rehabilitation and reintegration work</span></div>
            <div><strong>2</strong><span>Major 2025 fundraising initiatives featured</span></div>
            <div><strong>30%</strong><span>Maximum fundraising expense threshold</span></div>
          </div>
        </div>
        <div className="donor-hero__image" style={{ clipPath: "inset(0 0 0 0)" }}>
          <img
            src="https://images.unsplash.com/photo-1707286380312-ad352aa56cde?w=1400&h=1500&fit=crop&auto=format"
            alt="A community walking forward together"
            style={{ transform: "translateY(0) scale(1.05)" }}
          />
          <div className="donor-hero__image-label">
            <span>Support becomes</span>
            <strong>measurable progress.</strong>
          </div>
        </div>
        <div className="donor-hero__scroll" style={{ opacity: 1 }}><span>Scroll to examine the evidence</span><i /></div>
      </div>
    </div>
  )
}

function FundingOverview() {
  return (
    <div className="donor-funding-overview donor-section">
      <div className="donor-business-heading">
        <div>
          <span className="donor-eyebrow">02 — Funding at a glance</span>
          <div className="donor-section__title">Fundraising capability,<br />demonstrated.</div>
        </div>
        <p>Two 2025 initiatives show THH’s ability to mobilise donors, sponsors and the wider community around its work.</p>
      </div>
      <div className="donor-funding-overview__figures">
        <div>
          <span>Charity Golf 2025</span>
          <strong>$618,795</strong>
          <p>Raised through THH’s charity golf initiative.</p>
        </div>
        <div>
          <span>Ride to Restore 2025</span>
          <strong>$168,083</strong>
          <p>Raised through THH’s community cycling initiative.</p>
        </div>
        <div className="donor-data-pending">
          <span>Additional fundraising data</span>
          <strong>Data required</strong>
          <p>Insert reporting period, target and comparative performance when verified.</p>
        </div>
      </div>
      <div className="donor-source-note">Source: figures supplied for Charity Golf 2025 and Ride to Restore 2025.</div>
    </div>
  )
}

function Outcomes() {
  const [selected, setSelected] = useState(0)
  const [hovered, setHovered] = useState<number | null>(null)
  const active = hovered ?? selected
  const item = IMPACT[active]
  return (
    <div className="donor-impact donor-section">
      <div className="donor-section__intro">
        <span className="donor-eyebrow">04 — What the funding achieves</span>
        <div className="donor-section__title">From financial input<br />to measurable outcomes.</div>
        <p>The clearest case for support connects every contribution to delivery and every programme to a measurable result.</p>
      </div>

      <div className="donor-impact-explorer">
        <div className="donor-impact-explorer__visual">
          {IMPACT.map((metric, index) => (
            <img
              key={metric.label}
              className={index === active ? "is-active" : ""}
              src={metric.image}
              alt=""
            />
          ))}
          <div className="donor-impact-explorer__number">
            <span>Selected outcome</span>
            <strong>{item.value}</strong>
            <em>{item.label}</em>
          </div>
        </div>
        <div className="donor-impact-explorer__list">
          {IMPACT.map((metric, index) => (
            <button
              type="button"
              className={index === active ? "is-active" : ""}
              key={metric.label}
              onClick={() => setSelected(index)}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
            >
              <span>0{index + 1}</span>
              <strong>{metric.value}</strong>
              <em>{metric.label}</em>
              <p>{metric.note}</p>
            </button>
          ))}
        </div>
      </div>
      <div className="donor-metric-note">
        <span>Publication note</span>
        <p>These figures are carried over from the current microsite and should be validated against THH’s latest approved reporting before external campaign use.</p>
      </div>

    </div>
  )
}

function SupportFlow() {
  const [active, setActive] = useState(0)
  const area = SUPPORT_AREAS[active]
  return (
    <div className="donor-support-scroll donor-support-scroll--static">
      <div className="donor-support-flow donor-section">
        <div className="donor-support-flow__header">
          <span className="donor-eyebrow">03 — Where the money goes</span>
          <div className="donor-section__title">Funding becomes<br />delivery.</div>
          <p>Scroll through the funding pathways or select a programme area to examine what support enables.</p>
        </div>
        <div className="donor-funding-map">
          <div className="donor-funding-map__source">
            <span>Your support</span>
            <strong>General<br />Fund</strong>
            <small>No allocation percentages shown without approved data</small>
          </div>
          <div className="donor-funding-map__line"><i style={{ height: `${((active + 1) / SUPPORT_AREAS.length) * 100}%` }} /></div>
          <div className="donor-funding-map__nodes">
            {SUPPORT_AREAS.map((programme, index) => (
              <button
                type="button"
                key={programme.number}
                className={index === active ? "is-active" : index < active ? "is-passed" : ""}
                aria-pressed={index === active}
                onClick={() => setActive(index)}
              >
                <span>{programme.number}</span><strong>{programme.title}</strong><i />
              </button>
            ))}
          </div>
          <div className="donor-funding-map__detail" key={area.number}>
            <div className="donor-funding-map__image">
              <img key={area.image} src={area.image} alt="" />
              <span>Illustrative documentary photography</span>
            </div>
            <span>What this funding enables</span>
            <strong>{area.title}</strong>
            <p>{area.copy}</p>
            <div>
              {INLINE_OUTCOME_LABELS.has(area.number)
                ? <span className="fg-inline-italic">Outcome</span>
                : <em>Outcome</em>}
              {area.outcome}
            </div>
            <small>{area.allocation}</small>
          </div>
        </div>
        <div className="donor-support-flow__note">
          <span>Funding is channelled through THH’s General Fund.</span>
          <p>Donations support programmes and operations. Exact programme allocation percentages and amounts should be inserted when approved financial data is available.</p>
        </div>
      </div>
    </div>
  )
}

function SupportToImpact() {
  const ref = useRef<HTMLDivElement>(null)
  const progress = useDonorProgress(ref)
  const stages = ["YOUR SUPPORT", "FUNDS THE WORK", "SUPPORTS PEOPLE", "CREATES OUTCOMES", "BUILDS SECOND CHANCES"]
  const active = Math.min(stages.length - 1, Math.floor(progress * stages.length))
  return (
    <div className="donor-model-scroll" ref={ref}>
      <div className="donor-model">
        <div className="donor-model__image" style={{ clipPath: `inset(${22 - active * 4}% ${28 - active * 5}% ${22 - active * 4}% ${28 - active * 5}%)` }}>
          <img src="https://images.unsplash.com/photo-1624730088819-01a310dbc10b?w=1400&h=1000&fit=crop&auto=format" alt="A family moving forward together" />
        </div>
        <span>THH’s funding model in one view</span>
        <div className="donor-model__words">
          {stages.map((stage, index) => (
            <strong className={index === active ? "is-active" : ""} key={stage}>{stage}</strong>
          ))}
        </div>
        <div className="donor-model__steps">
          {stages.map((stage, index) => <i className={index <= active ? "is-active" : ""} key={stage} />)}
        </div>
      </div>
    </div>
  )
}

function FundraisingStories() {
  const campaigns = [
    {
      name: "Charity Golf",
      amount: "$618,795",
      image: "https://images.unsplash.com/photo-1775326420892-a233ed95ec58?w=1400&h=1100&fit=crop&auto=format",
      alt: "Golfers taking part in an outdoor event",
      description: "Raised through a donor and sponsor-facing golf initiative.",
      participants: "Data required",
    },
    {
      name: "Ride to Restore",
      amount: "$168,083",
      image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1400&h=1100&fit=crop&auto=format",
      alt: "A community cycling together on an open road",
      description: "Raised through a community-focused cycling initiative.",
      participants: "Data required",
    },
  ]
  const [selected, setSelected] = useState(0)
  const [hovered, setHovered] = useState<number | null>(null)
  const active = hovered ?? selected
  const campaign = campaigns[active]
  return (
    <div className="donor-fundraising donor-section">
      <div className="donor-section__intro donor-section__intro--wide">
        <span className="donor-eyebrow">05 — Fundraising track record</span>
        <div className="donor-section__title">Selected fundraising<br />highlights</div>
        <p>These initiatives demonstrate THH’s ability to convene supporters and deliver credible fundraising activity. Additional campaign data is clearly marked where required.</p>
      </div>

      <div className="donor-campaign-explorer">
        <div className="donor-campaign-explorer__tabs">
          {campaigns.map((item, index) => (
            <button
              type="button"
              className={index === active ? "is-active" : ""}
              onClick={() => setSelected(index)}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              key={item.name}
            >
              <span>0{index + 1} / 2025</span><strong>{item.name}</strong><em>{item.amount}</em>
            </button>
          ))}
        </div>
        <div className="donor-campaign-explorer__stage">
          <img key={campaign.image} src={campaign.image} alt={campaign.alt} />
          <span>Illustrative event photography</span>
          <div className="donor-campaign-explorer__amount">
            <small>Amount raised</small><strong>{campaign.amount}</strong>
          </div>
        </div>
        <div className="donor-campaign-explorer__evidence">
          <span>Selected case study</span>
          <strong>{campaign.name} 2025</strong>
          <p>{campaign.description}</p>
          <dl>
            <div><dt>Campaign objective</dt><dd>To be confirmed</dd></div>
            <div><dt>Sponsors & participants</dt><dd>{campaign.participants}</dd></div>
            <div><dt>Funded outcome</dt><dd>Data required</dd></div>
          </dl>
        </div>
      </div>
    </div>
  )
}

function Partners() {
  const [activeQuote, setActiveQuote] = useState(0)
  const partners = PARTNER_GROUPS.flatMap((group) =>
    group.names.map((name) => ({ name, category: group.label }))
  )
  const partnerInitials = (name: string) =>
    name
      .split(/\s+/)
      .filter((word) => !["&", "of"].includes(word.toLowerCase()))
      .slice(0, 2)
      .map((word) => word[0])
      .join("")

  return (
    <div className="donor-partners donor-section">
      <div className="donor-section__intro">
        <span className="donor-eyebrow">06 — Partners & supporters</span>
        <div className="donor-section__title">An established<br />partnership network.</div>
        <p>THH works across public service, education, employment, faith and community. Names below are drawn from the current microsite and should be confirmed before publication.</p>
      </div>
      <div className="donor-partner-marquee" aria-label="THH partners and supporters">
        <div className="donor-partner-marquee__track">
          {[false, true].map((duplicate) => (
            <div className="donor-partner-marquee__set" aria-hidden={duplicate || undefined} key={duplicate ? "duplicate" : "primary"}>
              {partners.map((partner) => (
                <article className="donor-partner-marquee__item" key={`${duplicate ? "duplicate-" : ""}${partner.category}-${partner.name}`}>
                  <div className="donor-partner-marquee__mark" aria-hidden="true">{partnerInitials(partner.name)}</div>
                  <div>
                    <strong>{partner.name}</strong>
                    <span>{partner.category} · Logo placeholder</span>
                  </div>
                </article>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="donor-partners__statement">
        <span>Partner Quotes</span>
        <div className="donor-partner-quotes" aria-label="Partner testimonials">
          <div className="donor-partner-quotes__stage" aria-live="polite">
            {PARTNER_QUOTES.map((quote, index) => (
              <figure
                className={`donor-partner-quotes__quote${index === activeQuote ? " is-active" : ""}`}
                aria-hidden={index !== activeQuote}
                key={quote.organisation}
              >
                <blockquote>{quote.quote}</blockquote>
                <figcaption>
                  <strong>{quote.organisation}</strong>
                  <span>{quote.speaker}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="donor-partner-quotes__dots" aria-label="Choose a partner quote">
            {PARTNER_QUOTES.map((quote, index) => (
              <button
                type="button"
                className={index === activeQuote ? "is-active" : ""}
                aria-label={`Show quote ${index + 1} from ${quote.organisation}`}
                aria-pressed={index === activeQuote}
                onClick={() => setActiveQuote(index)}
                key={quote.organisation}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function Transparency() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="donor-trust donor-section">
      <div className="donor-trust__intro">
        <span className="donor-eyebrow">07 — Financial accountability</span>
        <div className="donor-section__title">Funding,<br /><em>responsibly managed.</em></div>
        <p>THH’s fundraising practices are designed to support careful stewardship and transparent accounting.</p>
        <div className="donor-trust__links">
          <ExternalLink className="donor-text-link">View full financial statements <i>↗</i></ExternalLink>
          <ExternalLink className="donor-text-link">View Annual Report <i>↗</i></ExternalLink>
        </div>
      </div>
      <div className="donor-trust__points">
        {TRUST_POINTS.map((point, index) => (
          <button type="button" className={index === open ? "is-open" : ""} key={point.number} onClick={() => setOpen(open === index ? null : index)}>
            <span>{point.number}</span>
            <strong>{point.title}</strong>
            <i>{index === open ? "−" : "+"}</i>
            <p>{point.copy}</p>
          </button>
        ))}
      </div>
    </div>
  )
}

function DonorFinale({ onHome }: { onHome: () => void }) {
  return (
    <div className="donor-finale donor-section">
      <div className="donor-finale__glow" />
      <div className="donor-finale__image"><img src="https://images.unsplash.com/photo-1707286380312-ad352aa56cde?w=1400&h=1000&fit=crop&auto=format" alt="" /></div>
      <div className="donor-finale__proof"><span>IMPACT</span><i>+</i><span>PARTNERS</span><i>+</i><span>ACCOUNTABILITY</span></div>
      <span className="donor-eyebrow">09 — Next step</span>
      <div className="donor-finale__title">Create the next<br /><em>impact with us.</em></div>
      <p>Join the organisations and individuals supporting rehabilitation, reintegration and sustainable second chances.</p>
      <div className="donor-finale__actions">
        <ExternalLink className="donor-button donor-button--primary">Visit THH Main Website <i>↗</i></ExternalLink>
        <ExternalLink className="donor-button donor-button--secondary">Support THH <i>↗</i></ExternalLink>
      </div>
      <div className="donor-finale__links">
        {["Donate", "Get involved", "Partnership", "Contact"].map((label) => (
          <ExternalLink key={label}>{label} <i>↗</i></ExternalLink>
        ))}
      </div>
      <div className="donor-finale__footer">
        <button type="button" onClick={onHome}>The Helping Hand</button>
        <span>Restoration · Reintegration · Second chances</span>
        <span>Singapore</span>
      </div>
    </div>
  )
}

export default function DonorImpactPage({
  onHome,
}: {
  onHome: () => void
}) {
  return (
    <div className="donor-page">
      <DonorHero />
      <FundingOverview />
      <SupportFlow />
      <Outcomes />
      <FundraisingStories />
      <Partners />
      <Transparency />
      <DonorFinale onHome={onHome} />
    </div>
  )
}
