import { useState } from "react"
import "./donor.css"

const THH_WEBSITE = "https://www.thehelpinghand.org.sg/"

const IMPACT = [
  { value: "4,200+", label: "Residents served", note: "Current microsite figure — confirm against the latest Annual Report.", image: "https://images.unsplash.com/photo-1707286380312-ad352aa56cde?w=1200&h=1000&fit=crop&auto=format" },
  { value: "82%", label: "Employment rate", note: "Current microsite figure — confirm reporting period before publication.", image: "https://images.unsplash.com/photo-1513350027966-f016e1adcecd?w=1200&h=1000&fit=crop&auto=format" },
  { value: "847,000+", label: "Days of collective freedom", note: "Current microsite figure — confirm methodology before publication.", image: "https://images.unsplash.com/photo-1624730088819-01a310dbc10b?w=1200&h=1000&fit=crop&auto=format" },
  { value: "Data required", label: "Training opportunities", note: "Insert a verified reporting-period figure.", image: "https://images.unsplash.com/photo-1635214900921-a21e332c48a4?w=1200&h=1000&fit=crop&auto=format" },
]

const SUPPORT_AREAS = [
  { number: "01", title: "Residential Rehabilitation", copy: "Residential care, structured programmes and a stable environment for rehabilitation.", outcome: "Enables stability and programme participation.", allocation: "Allocation data to be confirmed", image: "https://images.unsplash.com/photo-1707286380312-ad352aa56cde?w=1000&h=900&fit=crop&auto=format" },
  { number: "02", title: "Social Skills and Professional Development", copy: "Vocational development and practical training that build capability for employment.", outcome: "Enables practical capability and work readiness.", allocation: "Allocation data to be confirmed", image: "https://images.unsplash.com/photo-1513350027966-f016e1adcecd?w=1000&h=900&fit=crop&auto=format" },
  { number: "03", title: "Employment Support", copy: "Employment preparation, placement support and guidance for returning to work.", outcome: "Enables pathways towards stable employment.", allocation: "Allocation data to be confirmed", image: "https://images.unsplash.com/photo-1695654396323-71beae8dadb1?w=1000&h=900&fit=crop&auto=format" },
  { number: "04", title: "Mentorship and Counselling", copy: "Mentorship, counselling and sustained personal support.", outcome: "Enables continuity, confidence and accountability.", allocation: "Allocation data to be confirmed", image: "https://images.unsplash.com/photo-1721972236553-e29838cf4274?w=1000&h=900&fit=crop&auto=format" },
  { number: "05", title: "Community Reintegration", copy: "Family reconciliation, peer support and community relationships.", outcome: "Enables stronger support networks after rehabilitation.", allocation: "Allocation data to be confirmed", image: "https://images.unsplash.com/photo-1614835279903-7f6c0f4f66d8?w=1000&h=900&fit=crop&auto=format" },
  { number: "06", title: "Programme & operations", copy: "The people, facilities and resources required to deliver THH’s work.", outcome: "Enables reliable, sustained programme delivery.", allocation: "Allocation data to be confirmed", image: "https://images.unsplash.com/photo-1706791776776-9078758308ae?w=1000&h=900&fit=crop&auto=format" },
]

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

function ExternalLink({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <a className={className} href={THH_WEBSITE} target="_blank" rel="noreferrer">
      {children}
    </a>
  )
}

// Section heading used by every block: eyebrow + 72px title (Figma "heading", gap 24)
function Heading({ eyebrow, children }: { eyebrow: string; children: React.ReactNode }) {
  return (
    <div className="dn-heading">
      <span className="dn-eyebrow">{eyebrow}</span>
      <div className="dn-title">{children}</div>
    </div>
  )
}

// 01 Hero: copy column on the left (x 80, w 543), photo fills the right half
function DonorHero() {
  return (
    <section className="dn-hero">
      <div className="dn-hero__copy">
        <div className="dn-hero__intro">
          <Heading eyebrow="01 — The case for support">Your support creates<br /><em>lasting impact.</em></Heading>
          <p className="dn-lead">
            THH works with donors, organisations and community partners to fund rehabilitation,
            training and supportive programmes to enable their reintegration into society.
          </p>
          <ExternalLink className="thh-button thh-button--primary">Support THH <i aria-hidden="true">↗</i></ExternalLink>
        </div>
        <div className="dn-hero__metrics">
          <div><strong>40</strong><span>Years of rehabilitation and reintegration work</span></div>
          <div><strong>2</strong><span>Major 2026 fundraising initiatives</span></div>
          <div><strong>30%</strong><span>Maximum fundraising expense threshold</span></div>
        </div>
      </div>
      <div className="dn-hero__image">
        <img
          src="https://images.unsplash.com/photo-1707286380312-ad352aa56cde?w=1400&h=2200&fit=crop&auto=format"
          alt="A community walking forward together"
        />
      </div>
    </section>
  )
}

// 02 Funding at a glance: title + description row, then two 640px figures
function FundingOverview() {
  return (
    <section className="dn-section dn-section--blue">
      <div className="dn-inner dn-stack-120">
        <div className="dn-row">
          <Heading eyebrow="02 — Funding at a glance">Fundraising capability,<br />demonstrated.</Heading>
          <p className="dn-lead dn-row__aside">Two 2026 initiatives illustrated THH’s donors, sponsors and community partners’ commitment to supporting THH’s mission and goals.</p>
        </div>
        <div className="dn-figures">
          <div>
            <span>Annual Charity Golf 2026</span>
            <div><strong>$375,000</strong><p>Raised through THH’s charity golf initiative.</p></div>
          </div>
          <div>
            <span>Ride and Run to Restore 2026</span>
            <div><strong>$407,060</strong><p>Raised through THH’s community cycling initiative.</p></div>
          </div>
        </div>
      </div>
    </section>
  )
}

// 03 How funds are distributed: General Fund | divider | programme list | portrait image
function SupportFlow() {
  const [active, setActive] = useState(0)
  const area = SUPPORT_AREAS[active]
  return (
    <section className="dn-section">
      <div className="dn-inner dn-stack-80">
        <div className="dn-row">
          <div className="dn-heading dn-heading--inline">
            <span className="dn-eyebrow">03 — How are funds distributed</span>
            <div className="dn-title dn-title--narrow">Fundings are catalyst to change and improvements</div>
          </div>
          <p className="dn-lead dn-row__aside">Scroll through the funding pathways or select a programme area to examine what support enables.</p>
        </div>
        <div className="dn-fund-map">
          <div className="dn-fund-map__source"><strong>General<br />Fund</strong></div>
          <div className="dn-fund-map__divider" aria-hidden="true" />
          <div className="dn-fund-map__list">
            {SUPPORT_AREAS.map((programme, index) => (
              <button
                type="button"
                key={programme.number}
                className={index === active ? "is-active" : ""}
                aria-pressed={index === active}
                onClick={() => setActive(index)}
                onMouseEnter={() => setActive(index)}
              >
                <span>{programme.number}</span>
                <strong>{programme.title}</strong>
                <i aria-hidden="true" />
              </button>
            ))}
          </div>
          <div className="dn-portrait dn-portrait--light">
            <img key={area.image} src={area.image} alt="" />
            <p>{area.copy}</p>
          </div>
        </div>
        <div className="dn-note">
          <strong>Funding is channelled through THH’s General Fund.</strong>
          <p>Donations support programmes and operations. Exact programme allocation percentages and amounts should be inserted when approved financial data is available.</p>
        </div>
      </div>
    </section>
  )
}

// 04 Outcomes: portrait image (dark fade) + list of four outcome rows
function Outcomes() {
  const [selected, setSelected] = useState(0)
  const [hovered, setHovered] = useState<number | null>(null)
  const active = hovered ?? selected
  return (
    <section className="dn-section dn-section--blue">
      <div className="dn-inner dn-stack-80">
        <div className="dn-row">
          <Heading eyebrow="04 — Funding equal positive outcomes">Every dollar leads to<br />meaningful outcomes.</Heading>
          <p className="dn-lead dn-row__aside">Donations support programmes delivery and every programme delivers meaningful and sustainable outcomes.</p>
        </div>
        <div className="dn-outcomes">
          <div className="dn-portrait dn-portrait--dark">
            {IMPACT.map((metric, index) => (
              <img key={metric.label} className={index === active ? "is-active" : ""} src={metric.image} alt="" />
            ))}
            <p>Residential care, structured programmes and a stable environment for rehabilitation.</p>
          </div>
          <div className="dn-outcomes__list">
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
              </button>
            ))}
          </div>
        </div>
        <p className="dn-source">Source: figures supplied for Charity Golf 2025 and Ride to Restore 2025.</p>
      </div>
    </section>
  )
}

// 05 Community support highlights: event tabs | photo | case-study details
function FundraisingStories() {
  const campaigns = [
    {
      name: "Charity Golf",
      year: "01 / 2025",
      amount: "$618,795",
      image: "https://images.unsplash.com/photo-1775326420892-a233ed95ec58?w=1100&h=1650&fit=crop&auto=format",
      alt: "Golfers taking part in an outdoor event",
      description: "Raised through a donor and sponsor-facing golf initiative.",
    },
    {
      name: "Ride to Restore",
      year: "02 / 2025",
      amount: "$168,083",
      image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1100&h=1650&fit=crop&auto=format",
      alt: "A community cycling together on an open road",
      description: "Raised through a community-focused cycling initiative.",
    },
  ]
  const [selected, setSelected] = useState(0)
  const [hovered, setHovered] = useState<number | null>(null)
  const active = hovered ?? selected
  const campaign = campaigns[active]
  return (
    <section className="dn-section">
      <div className="dn-inner dn-stack-80">
        <div className="dn-row">
          <div className="dn-heading dn-heading--inline">
            <span className="dn-eyebrow">05 — Fundraising track record</span>
            <div className="dn-title dn-title--narrow">Community Support Highlights</div>
          </div>
          <p className="dn-lead dn-row__aside">These initiatives demonstrate THH’s ability to convene supporters and deliver credible fundraising activity. Additional campaign data is clearly marked where required.</p>
        </div>
        <div className="dn-events">
          <div className="dn-events__tabs">
            {campaigns.map((item, index) => (
              <button
                type="button"
                className={index === active ? "is-active" : ""}
                onClick={() => setSelected(index)}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                key={item.name}
              >
                <span>{item.year}</span>
                <strong>{item.name}</strong>
                <small>{item.amount} raised</small>
              </button>
            ))}
          </div>
          <div className="dn-portrait dn-portrait--light">
            <img key={campaign.image} src={campaign.image} alt={campaign.alt} />
            <p>Amount raised: {campaign.amount}</p>
          </div>
          <div className="dn-events__detail">
            <div className="dn-events__title">
              <strong>{campaign.name}</strong>
              <p>{campaign.description}</p>
            </div>
            <dl>
              <div><dt>Campaign objective</dt><dd>To be confirmed</dd></div>
              <div><dt>Sponsors &amp; participants</dt><dd>Data required</dd></div>
              <div><dt>Funded outcome</dt><dd>Data required</dd></div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}

// 06 Partners: scrolling partner cards + quote panel
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
  const quote = PARTNER_QUOTES[activeQuote]

  return (
    <section className="dn-section dn-section--blue">
      <div className="dn-inner dn-stack-120">
        <div className="dn-row">
          <div className="dn-heading dn-heading--inline">
            <span className="dn-eyebrow">06 — Partners &amp; supporters</span>
            <div className="dn-title dn-title--narrow">An established partnership network.</div>
          </div>
          <p className="dn-lead dn-row__aside">THH works across public service, education, employment, faith and community. Names below are drawn from the current microsite and should be confirmed before publication.</p>
        </div>
      </div>
      <div className="dn-marquee" aria-label="THH partners and supporters">
        <div className="dn-marquee__track">
          {[false, true].map((duplicate) => (
            <div className="dn-marquee__set" aria-hidden={duplicate || undefined} key={duplicate ? "duplicate" : "primary"}>
              {partners.map((partner) => (
                <article className="dn-partner" key={`${duplicate ? "d-" : ""}${partner.category}-${partner.name}`}>
                  <div className="dn-partner__mark" aria-hidden="true">{partnerInitials(partner.name)}</div>
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
      <div className="dn-inner">
        <div className="dn-quote">
          <span className="dn-eyebrow dn-eyebrow--plain">Partner quotes</span>
          <div className="dn-quote__body" aria-live="polite">
            <blockquote>{quote.quote}</blockquote>
            <div className="dn-quote__by">
              <strong>{quote.organisation}</strong>
              <span>{quote.speaker}</span>
            </div>
            <div className="dn-quote__dots" aria-label="Choose a partner quote">
              {PARTNER_QUOTES.map((item, index) => (
                <button
                  type="button"
                  className={index === activeQuote ? "is-active" : ""}
                  aria-label={`Show quote ${index + 1} from ${item.organisation}`}
                  aria-pressed={index === activeQuote}
                  onClick={() => setActiveQuote(index)}
                  key={item.organisation}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// 07 Financial accountability: copy column + accordion (Figma "accordion")
function Transparency() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section className="dn-section">
      <div className="dn-inner dn-trust">
        <div className="dn-trust__intro">
          <Heading eyebrow="07 — Financial accountability">Funding,<br /><em>responsibly managed.</em></Heading>
          <p className="dn-lead">THH’s fundraising practices are designed to support careful stewardship and transparent accounting.</p>
          <div className="dn-trust__links">
            <ExternalLink className="donor-text-link">View full financial statements <i aria-hidden="true">↗</i></ExternalLink>
            <ExternalLink className="donor-text-link">View Annual Report <i aria-hidden="true">↗</i></ExternalLink>
          </div>
        </div>
        <div className="dn-accordion">
          {TRUST_POINTS.map((point, index) => (
            <button type="button" aria-expanded={index === open} className={index === open ? "is-open" : ""} key={point.number} onClick={() => setOpen(open === index ? null : index)}>
              <span>{point.number}</span>
              <div>
                <strong>{point.title}</strong>
                <p>{point.copy}</p>
              </div>
              <i aria-hidden="true"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6 9l6 6 6-6" /></svg></i>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

// Next step: centred 846px block on the checker background
function DonorFinale() {
  return (
    <section className="dn-finale">
      <div className="dn-finale__inner">
        <div className="dn-finale__heading">
          <span className="dn-finale__eyebrow">Next step</span>
          <div className="dn-finale__text">
            <div className="dn-finale__title">Create the next<br /><em>impact with us.</em></div>
            <p className="dn-lead">Join the organisations and individuals supporting rehabilitation, reintegration and sustainable second chances.</p>
          </div>
        </div>
        <div className="dn-finale__actions">
          <ExternalLink className="thh-button thh-button--primary">Visit THH Main Website <i aria-hidden="true">↗</i></ExternalLink>
          <ExternalLink className="thh-button thh-button--secondary">Support THH <i aria-hidden="true">↗</i></ExternalLink>
        </div>
      </div>
    </section>
  )
}

export default function DonorImpactPage(_props: {
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
      <DonorFinale />
    </div>
  )
}
