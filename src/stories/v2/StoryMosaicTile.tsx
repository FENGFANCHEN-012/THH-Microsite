import type {CategorizedStory} from './collection';
import {storyDescription} from './listingEditorial';
import {listingDaysFree} from './listingMosaic';
import {STORY_TEMPLATE_PATH} from '../routes';
// Approved fallback presentation assignments; story data and order remain unchanged.
const listingFallbackThemes:Readonly<Record<string,'dark'|'light'>>={"planned-4":"dark","planned-7":"dark","planned-10":"light","planned-15":"light","planned-21":"dark","planned-24":"light","planned-30":"light","planned-36":"dark","planned-38":"dark"};
export function StoryMosaicTile({record}:{record:CategorizedStory}){
 const fallbackTheme=record.id==='journey'?undefined:listingFallbackThemes[record.id];
 const days=record.daysFree??listingDaysFree[record.id],titleId=`tile-title-${record.id}`,descriptionId=`tile-description-${record.id}`,milestoneId=`tile-milestone-${record.id}`;
 return <article className={record.storyPage?'v2-linked-card':undefined} data-fallback-theme={fallbackTheme}>{!fallbackTheme&&<img src={record.thumbnail.src} width={record.thumbnail.width} height={record.thumbnail.height} alt={record.thumbnail.alt} loading="lazy"/>}<div className="v2-tile-milestone" id={milestoneId} aria-hidden="true">{days!==undefined?<><span className="v2-tile-i-am">I AM</span><strong>{new Intl.NumberFormat('en-SG').format(days)}</strong><span className="v2-tile-days-label"><span className="v2-tile-days-mobile">{record.milestoneLabel??(fallbackTheme?'DAYS DRUG FREE':'DAYS OF FREEDOM')}</span><span className="v2-tile-days-desktop">{record.milestoneLabel??'DAYS DRUG FREE'}</span></span></>:<strong className="v2-tile-fallback">One life.<br/>One story.</strong>}</div><div className="v2-card-copy"><h3 id={titleId}>{record.title}</h3><p id={descriptionId}>{storyDescription(record)}</p></div>{record.storyPage&&<a className="v2-card-link v2-tile-link" href={STORY_TEMPLATE_PATH} aria-labelledby={titleId} aria-describedby={`${descriptionId}${days!==undefined?' '+milestoneId:''}`}><span className="sr-only">Read story</span></a>}</article>;
}
