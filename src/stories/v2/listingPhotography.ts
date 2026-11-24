import photographs from './anniversaryPhotos.json';
import type {CategorizedStory} from './collection';
// Listing-only presentation data. Current/reference records stay unchanged.
const people=[11,10,33,1710,2322,2317,2323,1750,2248,20,9,12,14,5,13,21,2247];
export function withListingPhotographs(records:CategorizedStory[]):CategorizedStory[]{
 const recent:string[]=[];
 return records.map((record,index)=>{
  if(record.preserveListingThumbnail){recent.push(record.thumbnail.src);return record;}
  let id=record.id==='journey'?29:record.id==='nadia'?2300:record.id==='sam'?3:people[(Number(record.id.replace('planned-',''))||index)%people.length];
  let offset=0;while(recent.slice(-2).includes(photographs.find(p=>p.id===id)!.src)){id=people[((Number(record.id.replace('planned-',''))||index)+ ++offset)%people.length]}
  const p=photographs.find(p=>p.id===id)!;recent.push(p.src);
  return {...record,thumbnail:{src:p.src,width:p.width,height:p.height,alt:`THH context photograph: ${p.alt} ${record.status==='published'?'Pictured people are not the fictional characters.':'Pictured people are not confirmed contributors to this coming-soon story.'}`}};
 });
}
