import type {CSSProperties} from 'react';
import {anniversaryBasicArticle,anniversaryEnhancedArticle} from './anniversaryArticles';
// Preserve the established tablet/desktop figures and composition.
const confirmed=[anniversaryBasicArticle.daysFree,anniversaryEnhancedArticle.daysFree].filter((value):value is number=>value!==undefined);
const groups=Array.from({length:7},(_,index)=>confirmed[index%confirmed.length]);
// Existing group indices/vectors retained: top-left, middle-left, top-right, middle-right, left, bottom-left, bottom-right.
const desktopValues=[2456,1460,3674,162,912,1345,4380];
// Approved component bounds relative to the 375 × 730 Intro frame (not the viewport).
const mobileGroups=[
 {name:'Top Left',size:'M',days:1420,x:24,y:50},
 {name:'Middle Left',size:'S',days:1843,x:-10,y:275},
 {name:'Bottom Left',size:'S',days:93,x:20,y:515},
 {name:'Bottom Middle',size:'S',days:183,x:200,y:578},
 {name:'Top Right',size:'S',days:93,x:270,y:79.85},
 {name:'Middle Right',size:'S',days:623,x:243.75,y:184.25},
 {name:'Bottom Right',size:'M',days:1675,x:275,y:450}
] as const;
function NumberGroup({days,index,mobile}:{days:number;index:number;mobile?:typeof mobileGroups[number]}){
 return <div className={`v2-intro-number v2-intro-number-${index+1}`} data-number-name={mobile?'Number - '+mobile.name:undefined} data-number-size={mobile?.size} data-number-state={mobile?'default':undefined} style={mobile?{'--mobile-number-x':mobile.x,'--mobile-number-y':mobile.y} as CSSProperties:undefined}><span>I AM</span><strong data-desktop-value={mobile?undefined:desktopValues[index].toLocaleString('en-SG')}>{days.toLocaleString('en-SG')}</strong><span>{mobile?'DAYS DRUG FREE':'DAYS OF FREEDOM'}</span></div>;
}
export function IntroDaysFree(){return <><div className="v2-intro-numbers v2-intro-numbers-desktop" aria-hidden="true">{groups.map((days,index)=><NumberGroup days={days} index={index} key={index}/>)}</div><div className="v2-intro-numbers v2-intro-numbers-mobile" aria-hidden="true">{mobileGroups.map((group,index)=><NumberGroup days={group.days} index={index} mobile={group} key={group.name}/>)}</div></>}
