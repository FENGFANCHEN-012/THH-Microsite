import {useEffect,type RefObject} from 'react';
// Isolated, passive scroll enhancement. CSS supplies a readable no-JS fallback.
export function useListingIntro(ref:RefObject<HTMLDivElement|null>){
 useEffect(()=>{const stage=ref.current;if(!stage)return;
 const media=matchMedia('(min-width:1024px) and (min-height:500px) and (prefers-reduced-motion:no-preference)');
 let frame=0,start=0,distance=1,height=1;
 const draw=()=>{frame=0;const p=media.matches?Math.max(0,Math.min(1,(scrollY-start)/distance)):0;
 const smooth=(value:number)=>{const t=Math.max(0,Math.min(1,value));return t*t*(3-2*t)};
 const drift=smooth((p-.2)/.4);stage.style.setProperty('--number-drift',String(drift));stage.style.setProperty('--number-opacity',String(.12*(1-drift)));
 stage.style.setProperty('--intro-opacity',String(1-smooth((p-.35)/.3)));
 stage.style.setProperty('--intro-scale',String(1-.4*p));stage.style.setProperty('--intro-y',`${-.28*height*p}px`);stage.style.setProperty('--intro-description',String(Math.max(0,1-p*3)));stage.style.setProperty('--intro-label',String(Math.max(0,1-p*3)));stage.style.setProperty('--intro-cue',String(Math.max(0,1-p*6)));
 const feature=stage.nextElementSibling as HTMLElement|null;feature?.style.setProperty('--feature-reveal',String(media.matches?smooth((p-.6)/.4):1));feature?.style.setProperty('--feature-y',`${media.matches?16*(1-p):0}px`);
 };
 const request=()=>{if(!frame)frame=requestAnimationFrame(draw)};
 const measure=()=>{const headerHeight=(document.querySelector('.home-header') as HTMLElement|null)?.offsetHeight??44;const top=stage.getBoundingClientRect().top+scrollY;stage.style.setProperty('--listing-chrome-height',`${top}px`);height=innerHeight-top;distance=innerHeight*.65;start=top-headerHeight;draw()};
 const observer=new ResizeObserver(measure);const header=document.querySelector('.home-header');if(header)observer.observe(header);
 measure();document.fonts.ready.then(()=>{if(stage.isConnected)measure()});addEventListener('scroll',request,{passive:true});addEventListener('resize',measure);addEventListener('pageshow',measure);addEventListener('hashchange',request);media.addEventListener('change',measure);
 return()=>{cancelAnimationFrame(frame);observer.disconnect();removeEventListener('scroll',request);removeEventListener('resize',measure);removeEventListener('pageshow',measure);removeEventListener('hashchange',request);media.removeEventListener('change',measure)};
 },[ref]);
}
