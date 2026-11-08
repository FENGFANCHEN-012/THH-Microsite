// Shared footer for every page (Figma "footer" component): wordmark, I AM 40 lockup, credits.
export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__brand">
        <strong>The Helping <em>Hand</em></strong>
        <div className="site-footer__mark" aria-label="I am 40 years">
          <small>I AM</small>
          <span>40</span>
          <small>YEARS</small>
        </div>
        <p>40 Years. 14,600 Days. Countless Stories.</p>
      </div>
      <div className="site-footer__credits">
        <strong>A Better.sg Project</strong>
        <p>Volunteer designers: Amber &amp; Noah · Volunteer developer: Billy</p>
      </div>
    </footer>
  )
}
