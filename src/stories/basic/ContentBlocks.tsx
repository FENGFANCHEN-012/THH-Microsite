import {editorialText} from './presentation';
import {ContextVideo} from './ContextVideo';
import {MediaPresentation,StoryImage,SimpleGallery,BasicGalleryContext} from './Media';
import {useContext,useEffect,useRef,useState} from 'react';
import type {ContentBlock,Inline,ArticleImage} from './schema';
import type {Image} from '../types';
function Entrance({children,kind}:{children:React.ReactNode;kind:'quote'|'image'}){
 const root=useRef<HTMLDivElement>(null);
 useEffect(()=>{const el=root.current!,media=matchMedia('(prefers-reduced-motion: reduce)');if(media.matches)return;if(el.getBoundingClientRect().top>innerHeight)el.dataset.enter='waiting';const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){el.dataset.enter='visible';observer.disconnect()}},{threshold:.15});observer.observe(el);const stop=()=>{if(media.matches){el.dataset.enter='visible';observer.disconnect()}};media.addEventListener('change',stop);return()=>{observer.disconnect();media.removeEventListener('change',stop)}},[]);
 return <div ref={root} className={`v2-entrance v2-entrance-${kind}`}>{children}</div>;
}
function inlineContent(content:Inline[],preserveSpacing=false){return content.map((part,i)=>{const cleaned=editorialText(part.text),rendered=preserveSpacing?(part.text.match(/^\s+/)?.[0]||'')+cleaned+(part.text.match(/\s+$/)?.[0]||''):cleaned;const text=part.emphasis==='strong'?<strong>{rendered}</strong>:part.emphasis==='em'?<em>{rendered}</em>:rendered;return part.href?<a key={i} href={part.href} {...(part.href.startsWith('https://')?{target:'_blank',rel:'noopener noreferrer'}:{})}>{text}{part.href.startsWith('https://')&&<span className="sr-only"> (opens in a new tab)</span>}</a>:<span key={i}>{text}</span>})}
export function ContentBlocks({blocks}:{blocks:ContentBlock[]}){const basic=useContext(BasicGalleryContext);return <>{blocks.map(block=><div className={`v2-block v2-block-${block.type} ${block.type==='image'&&block.layout?'v2-layout-'+block.layout:''}`} data-content-block={block.type} id={block.id} key={block.id}>{(()=>{switch(block.type){
 case 'paragraph':return block.paragraphs.map((p,i)=><p key={i}>{typeof p==='string'?editorialText(p):inlineContent(p,basic)}</p>);
 case 'linkedParagraph':return <p>{inlineContent(block.content,basic)}</p>;
 case 'subheadline':return <h2>{block.text}</h2>;
 case 'image':return <MediaPresentation image={block.image} images={block.images} presentation={block.presentation} title={block.title} cleanCarousel={block.cleanCarousel}/>;
 case 'textPhoto':return <>{block.paragraphs.map((p,i)=><p key={i}>{p}</p>)}<StoryImage image={block.image}/></>;
 case 'photoPair':return <figure className="v2-photo-pair"><div>{block.images.map(im=><img key={im.src} src={im.src} width={im.width} height={im.height} alt={im.alt} loading="lazy"/>)}</div>{block.caption&&<figcaption>{editorialText(block.caption)}</figcaption>}</figure>;
 case 'video':return block.watchUrl&&block.embedUrl?<ContextVideo title={block.title} poster={block.poster} embedUrl={block.embedUrl} watchUrl={block.watchUrl} caption={editorialText(block.caption)}/>:<figure className="v2-video">{block.src?<video controls preload="metadata" poster={block.poster.src}><source src={block.src}/>{block.captions&&<track kind="captions" src={block.captions} srcLang="en" default/>}</video>:block.embedUrl?<iframe src={block.embedUrl} title={block.title} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allow="encrypted-media; picture-in-picture; web-share" allowFullScreen/>:<div className="v2-video-demo"><img src={block.poster.src} width={block.poster.width} height={block.poster.height} alt="Context photograph for the optional video slot" loading="lazy"/><div><span>Optional video</span><h2>{block.title}</h2><p>Demonstration slot · awaiting an approved film</p></div></div>}{(block.caption||block.watchUrl)&&<figcaption>{editorialText(block.caption)}{block.watchUrl&&<> <a href={block.watchUrl} target="_blank" rel="noopener noreferrer">Watch on YouTube (opens in a new tab)</a></>}</figcaption>}</figure>;
 case 'quoteReveal':return <Entrance kind="quote"><blockquote><p>“{block.quote}”</p>{!basic&&<footer>{editorialText(block.name)}</footer>}</blockquote></Entrance>;
 }})()}</div>)}</>}
