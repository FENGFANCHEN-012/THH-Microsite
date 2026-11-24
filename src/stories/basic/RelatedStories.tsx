import type {Image} from '../types';
import {STORIES_PATH} from '../routes';
// "More lives, more stories" strip at the end of the Basic story template (Figma Make: basic/RelatedStories).
// Only the Basic-template variant is kept; the Enhanced variant is hidden for now (Amber, Nov 2026).
export type BasicRecommendation={id:string;title:string;description:string;image:Image;href?:string};
export function RelatedStories({collectionLink=false,basicRecommendations}:{enhanced?:boolean;collectionLink?:boolean;thumbnails?:Image[];basicRecommendations:BasicRecommendation[]}){
 return <section className="v2-related basic-recommendations" aria-labelledby="related-title"><header className="ab2-related-heading"><h2 id="related-title">More lives, more stories</h2>{collectionLink&&<a href={STORIES_PATH}>View all stories <span aria-hidden="true">↗</span></a>}</header><div>{basicRecommendations.map(s=><article key={s.id}>{s.href?<a className="basic-recommendation-link" href={s.href} aria-labelledby={'recommended-'+s.id}><img src={s.image.src} width={s.image.width} height={s.image.height} alt="" loading="lazy"/><div className="basic-recommendation-copy"><h3 id={'recommended-'+s.id}>{s.title}</h3><p>{s.description}</p></div></a>:<><img src={s.image.src} width={s.image.width} height={s.image.height} alt={s.image.alt} loading="lazy"/><div className="basic-recommendation-copy"><h3>{s.title}</h3><p>{s.description}</p></div></>}</article>)}</div></section>;
}
