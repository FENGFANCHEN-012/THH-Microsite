// "40 stories" section, ported from Amber's Figma Make prototype
// (THH 40th Anniversary - Story Listing / Basic Template, Nov 2026).
// The Make pages sit under our own site header + footer, so this wrapper:
//  - pads the page below the fixed .home-header and exposes its height as
//    --site-header-h (the Make CSS used a 44px review bar for its sticky offsets),
//  - turns clicks on internal <a href="/..."> links into in-app navigation.
import {useEffect, useRef, type MouseEvent} from 'react'
import {Listing} from './v2/Listing'
import {BasicAnniversaryV2} from './basic/BasicAnniversaryPage'
import {STORY_TEMPLATE_PATH} from './routes'
import './stories.css'
import './stories-site.css'

export default function StoriesPages({path, onNavigate}: {path: string; onNavigate: (path: string) => void}) {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.documentElement.classList.add('js-enabled') // Make CSS gates scroll effects on this class
    const header = document.querySelector<HTMLElement>('.home-header')
    const el = root.current
    if (!header || !el) return
    const sync = () => el.style.setProperty('--site-header-h', `${header.offsetHeight}px`)
    sync()
    const observer = new ResizeObserver(sync)
    observer.observe(header)
    return () => observer.disconnect()
  }, [])

  // Internal links (story cards, "All stories") stay inside the single-page app.
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    const link = (event.target as HTMLElement).closest('a')
    const href = link?.getAttribute('href')
    if (!link || !href || !href.startsWith('/') || href.startsWith('/media/') || link.target === '_blank') return
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return
    event.preventDefault()
    onNavigate(href)
  }

  return (
    <div ref={root} className="stories-page" onClick={handleClick}>
      {path === STORY_TEMPLATE_PATH
        ? <BasicAnniversaryV2 />
        : <div className="v2-site"><main id="v2-main"><Listing /></main></div>}
    </div>
  )
}
