import {StoryMosaicTile} from './StoryMosaicTile';
import {IntroDaysFree} from './IntroDaysFree';
import {useListingIntro} from './useListingIntro';
import {storyMosaic,progressiveDesktopStoryMosaic} from './listingMosaic';
import {storyDescription} from './listingEditorial';
import {useLayoutEffect,useRef,useState} from 'react';
import {withListingPhotographs} from './listingPhotography';
import {filterStories,storiesV2,categories,type Category} from './collection';
import {STORY_TEMPLATE_PATH} from '../routes';
const initialStoryLimit=()=>typeof window!=='undefined'&&window.matchMedia('(min-width:1024px)').matches?12:6;
export function Listing(){
 const [category,setCategory]=useState<Category|'All Stories'>('All Stories'),[limit,setLimit]=useState(initialStoryLimit),nextCard=useRef<HTMLLIElement|null>(null);const filtered=withListingPhotographs(filterStories(category).filter(story=>story.id!=='nadia')),featured=withListingPhotographs([storiesV2.find(s=>s.id==='nadia')!])[0];
 useLayoutEffect(()=>{
  const media=matchMedia('(min-width:1024px)');
  const adapt=()=>setLimit(current=>Math.max(current,media.matches?12:6));
  adapt();media.addEventListener('change',adapt);return()=>media.removeEventListener('change',adapt);
 },[]);
 const introRef=useRef<HTMLDivElement|null>(null);useListingIntro(introRef);
 const gridRef=useRef<HTMLUListElement|null>(null),[desktopWidth,setDesktopWidth]=useState(1279);
 useLayoutEffect(()=>{
  const grid=gridRef.current;if(!grid)return;
  const media=matchMedia('(min-width:1024px)');
  const measure=()=>{if(media.matches){const width=grid.getBoundingClientRect().width;setDesktopWidth(current=>Math.abs(current-width)>.01?width:current)}};
  measure();const observer=new ResizeObserver(measure);observer.observe(grid);media.addEventListener('change',measure);
  return()=>{observer.disconnect();media.removeEventListener('change',measure)};
 },[filtered.length]);
 const mosaic=storyMosaic(filtered.length),desktopMosaic=progressiveDesktopStoryMosaic(filtered.length,limit,desktopWidth);
 const desktopHeight=Math.max(0,...desktopMosaic.slice(0,limit).map(tile=>tile.top+tile.height));
 const rows:{start:number;items:typeof filtered}[]=[];for(let start=0,row=0;start<filtered.length;row++){const remaining=filtered.length-start;const preferred=[2,3][row%2];const size=remaining<=3?remaining:remaining-preferred===1?(preferred===3?2:3):preferred;rows.push({start,items:filtered.slice(start,start+size)});start+=size;}
 const showMore=()=>{const target=nextCard.current;setLimit(n=>n+6);requestAnimationFrame(()=>(target?.querySelector<HTMLAnchorElement>('a[href]')??target)?.focus({preventScroll:true}))};
 return <><div className="v2-list-opening" ref={introRef}><section className="v2-list-intro"><IntroDaysFree/><div><h1>40 Stories.<br/>40 Lives.</h1><p>Individual journeys, everyday discoveries and possibilities still unfolding. Every story deserves room.</p><a className="v2-discover" href="#featured-story">DISCOVER THEIR STORIES ↓</a></div><p className="v2-note">Prototype: all stories and names are fictional. Three prototype stories and 37 coming-soon entries. Categories are provisional editorial groupings. Photography provides context; pictured people are not the fictional characters.</p></section></div><section className="v2-feature" id="featured-story"><a className="v2-feature-link" href={featured.storyPage?STORY_TEMPLATE_PATH:undefined}><img src={featured.thumbnail.src} width={featured.thumbnail.width} height={featured.thumbnail.height} alt={featured.thumbnail.alt}/><div><span className="v2-feature-label">FEATURED STORY</span><h2>{featured.title}<span className="v2-feature-underline" aria-hidden="true">{featured.title}</span></h2><p>{storyDescription(featured)}</p><span className="v2-feature-cta">Read the story ↗</span></div></a></section><section className="v2-collection" aria-labelledby="v2-collection-title"><h2 id="v2-collection-title">Explore more stories</h2><div className="v2-filters" aria-label="Filter stories by category">{(['All Stories',...categories] as const).map(c=><button key={c} data-filter-label={c} aria-pressed={c===category} onClick={()=>{setCategory(c);setLimit(initialStoryLimit())}}>{c}</button>)}</div>{filtered.length?<ul ref={gridRef} className="v2-story-grid" style={{'--desktop-mosaic-height':`${desktopHeight}px`} as React.CSSProperties}>{rows.map(row=><li className="v2-story-row" data-row-size={row.items.length} key={row.start}><ul>{row.items.map((r,j)=>{const i=row.start+j;return <li key={r.id} ref={i===limit?nextCard:undefined} hidden={i>=limit} className={i>=limit?'v2-mobile-hidden':undefined} style={{flexGrow:(r.thumbnail.width||1)/(r.thumbnail.height||1),flexBasis:0,'--desktop-tile-left':`${desktopMosaic[i].left}px`,'--desktop-tile-top':`${desktopMosaic[i].top}px`,'--desktop-tile-width':`${desktopMosaic[i].width}px`,'--desktop-tile-height':`${desktopMosaic[i].height}px`,'--tile-column':mosaic[i].column,'--tile-row':mosaic[i].row,'--tile-span':mosaic[i].columns,'--tile-rows':mosaic[i].rows,'--tile-tablet-column':mosaic[i].tabletColumn,'--tile-tablet-row':mosaic[i].tabletRow,'--tile-tablet-span':mosaic[i].tabletColumns} as React.CSSProperties} tabIndex={r.storyPage?undefined:0} data-record-id={r.id} data-desktop-size={desktopMosaic[i].size}><StoryMosaicTile record={r}/></li>})}</ul></li>)}</ul>:<p className="v2-empty">No stories in this category yet. Choose All Stories to explore the collection.</p>}{limit<filtered.length&&<button className="v2-show-more" onClick={showMore}>Show 6 more stories</button>}</section></>;
}
