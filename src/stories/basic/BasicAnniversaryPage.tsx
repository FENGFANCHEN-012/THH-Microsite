import {useEffect,useRef} from 'react';
import {useMotion} from './motion';
import {ContentBlocks} from './ContentBlocks';
import {BasicGalleryContext} from './Media';
import {RelatedStories} from './RelatedStories';
import snapshot from './basicArticle.snapshot.json';
import {AnniversaryHero} from './AnniversaryHero';
import type {Article,ContentBlock} from './schema';
import {STORIES_PATH} from '../routes';
const basicArticle={...snapshot.article,hero:{src:'/media/anniversary/thh-29.webp',width:2000,height:1125,alt:'Hands shaping dough on a work surface with trays of baked goods.'}} as Article;
const anniversaryRelatedPhotos=snapshot.relatedPhotos;
const basicRecommendations=[
 {id:'nadia',title:'Making room for a different tomorrow.',description:'Nadia discovers the room that smaller promises and honest conversations can leave for tomorrow.',image:{src:'/media/anniversary/thh-20.webp',width:1701,height:733,alt:'People talking around a table during a community activity.'}},
 {id:'jason',title:'A journey of change.',description:'Jason reflects on his journey of recovery, finding purpose through his work and building a new chapter in life.',image:{src:'/media/anniversary/thh-14.webp',width:1165,height:776,alt:'Two people behind a striped stall canopy at an outdoor event.'}},
 {id:'belonging',title:'Finding a place to belong.',description:'Through friendship, support and shared experiences, a new sense of belonging begins to take shape.',image:{src:'/media/anniversary/thh-11.webp',width:1145,height:697,alt:'People seated together around a red table at a gathering.'}}
];
export type Composition={mode:'quiet'|'photographic'|'reflective';width?:'reading'|'wide'|'immersive'};
export type FlexibleArticle=Omit<Article,'hero'>&{hero?:Article['hero']};
const danielComposition:Record<string,Composition>={
 'notebook-image':{mode:'photographic',width:'wide'},
 'uncertainty-photo':{mode:'photographic',width:'immersive'},
 'table-image':{mode:'photographic',width:'wide'},
 'daniel-pair':{mode:'photographic',width:'wide'},
 'pastry-image':{mode:'photographic',width:'wide'},
 'quiet-portrait':{mode:'photographic',width:'reading'}
};
const nativeTypes=new Set(['scrollTimeline','scrollGallery','imageReveal']);
export function composeArticle(blocks:ContentBlock[],choices:Record<string,Composition>={}){
 const runs:{key:string;mode:Composition['mode'];width:NonNullable<Composition['width']>;blocks:ContentBlock[]}[]=[];
 for(const block of blocks){const fallback:Composition=['paragraph','linkedParagraph','subheadline'].includes(block.type)?{mode:'quiet',width:'reading'}:block.type==='quoteReveal'?{mode:'reflective',width:'reading'}:{mode:'photographic',width:block.type==='photoPair'||block.type==='gallery'||(block.type==='image'&&block.presentation==='gallery')?'wide':'reading'};const choice=choices[block.id]||fallback,last=runs.at(-1);if(choice.mode==='quiet'&&last?.mode==='quiet')last.blocks.push(block);else runs.push({key:block.id,mode:choice.mode,width:choice.width||'reading',blocks:[block]})}
 return runs;
}
export function AnniversaryArticleV2({article,choices={},related,edition='basic',viewportHero=false}:{article:FlexibleArticle;choices?:Record<string,Composition>;related?:React.ReactNode;edition?:'basic'|'enhanced';viewportHero?:boolean}){
 const hasVideo=article.blocks.some(b=>b.type==='video'),hasPhotography=!!article.hero||article.blocks.some(b=>['image','photoPair','gallery','imageReveal','scrollGallery'].includes(b.type));
 return <><div className="ab2-review-row"><a href={STORIES_PATH}>← All stories</a><span>{edition.toUpperCase()+' — ANNIVERSARY EDITION V2'}</span></div><aside className="v2-review-note"><details><summary>Reviewer content note</summary><p>{article.person} and the narrative are fictional prototype content, not a real THH participant or testimonial.{hasPhotography&&<> Images provide context.</>}{hasVideo&&<> THH organisational footage does not depict {article.person} or document their experiences.</>}</p></details></aside><article className="ab2-article" data-protagonist={article.person} data-fictional={article.fictional!==false}><AnniversaryHero viewportHero={viewportHero} heroImage={article.hero} storyTitle={article.title} storyIntroduction={article.introduction} alignment={article.heroAlignment} daysFree={article.daysFree} numberLabel={edition==='basic'?'DAYS DRUG FREE':'days free'}/><div className="ab2-story-content">{composeArticle(article.blocks,choices).map(run=><section key={run.key} className={`ab2-run ab2-${run.mode}-run ab2-width-${run.width} ${nativeTypes.has(run.blocks[0].type)?'ab2-native-run':''}`} data-native-interaction={nativeTypes.has(run.blocks[0].type)?'true':undefined} data-composition={run.mode} data-module={run.blocks[0].type}>{<ContentBlocks blocks={run.blocks}/>}</section>)}</div><details className="v2-source-notes"><summary>About the story and photographs</summary><p>{article.person}, every event, and any quoted reflection are fictional.{hasPhotography&&<> THH photographs are used with the project owner’s permission. Official source URLs and full-frame image details are recorded in the <a href="/media/anniversary/sources.json">THH photography inventory</a>. People shown in organisational photographs are not the fictional characters, and the photographs do not document the events in this story.</>}{hasVideo&&<> The linked video is official THH organisational footage and does not document {article.person} or their fictional experiences.</>}</p></details></article>{related}</>
}
function AnniversaryEditionV2(){
 const enhanced=false;
 const root=useRef<HTMLDivElement>(null),motion=useMotion(),article=basicArticle;
 useEffect(()=>{document.title=`${enhanced?'Enhanced':'Basic'} — Anniversary Edition V2 · The Helping Hand`},[enhanced]);
 useEffect(()=>{const el=root.current!;el.dataset.motion=motion?'on':'off';const targets=[...el.querySelectorAll<HTMLElement>('.ab2-photographic-run:not(.ab2-native-run),.ab2-reflective-run')];if(!motion){targets.forEach(node=>node.dataset.ab2Reveal='visible');return}const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){(entry.target as HTMLElement).dataset.ab2Reveal='visible';observer.unobserve(entry.target)}})},{threshold:.08});targets.forEach(node=>{node.dataset.ab2Reveal=node.getBoundingClientRect().top>innerHeight*.94?'waiting':'visible';if(node.dataset.ab2Reveal==='waiting')observer.observe(node)});return()=>observer.disconnect()},[motion]);
 return <div ref={root} className={`v2-site anniversary-article-v2 ${enhanced?'anniversary-enhanced-v2':'anniversary-basic-v2'}`}><main id="v2-main"><BasicGalleryContext.Provider value={true}><AnniversaryArticleV2 viewportHero article={article} choices={danielComposition} edition={enhanced?'enhanced':'basic'} related={<RelatedStories enhanced={enhanced} collectionLink thumbnails={anniversaryRelatedPhotos} basicRecommendations={basicRecommendations}/>}/></BasicGalleryContext.Provider></main></div>
}

export function BasicAnniversaryV2(){return <AnniversaryEditionV2/>}
