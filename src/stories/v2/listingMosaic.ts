import {anniversaryBasicArticle,anniversaryEnhancedArticle} from './anniversaryArticles';
// Prototype-only placeholders, keyed by story ID for stable refreshes/filtering.
// Replace individual entries with confirmed figures as contributor data arrives.
export const listingPlaceholderDaysFree:Readonly<Record<string,number>>={sam:912,'planned-4':365,'planned-5':730,'planned-6':1095,'planned-7':1825,'planned-8':2190,'planned-9':547,'planned-10':3285,'planned-11':1460,'planned-12':2555,'planned-13':438,'planned-14':1278,'planned-15':2920,'planned-16':912,'planned-17':1643,'planned-18':4015,'planned-19':638,'planned-20':2008,'planned-21':3103,'planned-22':1186,'planned-23':2373,'planned-24':821,'planned-25':3650,'planned-26':1552,'planned-27':2738,'planned-28':456,'planned-29':1916,'planned-30':3468,'planned-31':1004,'planned-32':2281,'planned-33':1369,'planned-34':4198,'planned-35':1825,'planned-36':730,'planned-37':2646,'planned-38':1095,'planned-39':3833,'planned-40':547};
// Confirmed article values always take precedence over placeholders.
export const listingDaysFree:Readonly<Record<string,number|undefined>>={...listingPlaceholderDaysFree,journey:anniversaryBasicArticle.daysFree,nadia:anniversaryEnhancedArticle.daysFree};
export type MosaicTile={column:number;row:number;columns:number;rows:number;tabletColumn:number;tabletRow:number;tabletColumns:number};
type DesktopMosaicSlot={column:number;row:number;columns:number;rows:number;size:'L'|'M'|'S'};
export type DesktopMosaicTile=DesktopMosaicSlot&{left:number;top:number;width:number;height:number};
// Ordered, complete modules: the desktop layout never backfills earlier holes.
// Existing tablet/mobile placement and all story presentation data stay separate.
export function desktopStoryMosaic(count:number,containerWidth=1279):DesktopMosaicTile[]{
 const tiles:DesktopMosaicSlot[]=[];
 const columns=Math.min(3,count),gap=24,columnWidth=(containerWidth-Math.max(0,columns-1)*gap)/(columns||1);
 const place=(slots:DesktopMosaicSlot[]):DesktopMosaicTile[]=>{
  const bottoms=Array.from({length:columns},()=>0);
  return slots.map(slot=>{
   const index=slot.column-1,width=slot.columns*columnWidth+(slot.columns-1)*gap;
   const top=Math.max(...bottoms.slice(index,index+slot.columns));
   const height=slot.size==='M'?width*545/410:width*2/3;
   for(let c=index;c<index+slot.columns;c++)bottoms[c]=top+height+gap;
   return {...slot,left:index*(columnWidth+gap),top,width,height};
  }).sort((a,b)=>a.top-b.top||a.left-b.left);
 };
 if(count<3)return place(Array.from({length:count},(_,i)=>({column:i+1,row:1,columns:1,rows:1,size:'S'})));
 let row=1,module=0;
 const add=(slots:number[][])=>{
  slots.sort((a,b)=>a[1]-b[1]||a[0]-b[0]).forEach(([column,offset,columns,rows])=>tiles.push({column,row:row+offset,columns,rows,size:columns===2?'L':rows===2?'M':'S'}));
  row+=Math.max(...slots.map(s=>s[1]+s[3]));
 };
 while(tiles.length<count){
  const remaining=count-tiles.length;
  if(remaining===4){add([[1,0,1,2],[2,0,1,2],[3,0,1,1],[3,1,1,1]]);break;}
  if(remaining===5){add([[1,0,1,2],[2,0,1,1],[3,0,1,1],[2,1,1,1],[3,1,1,1]]);break;}
  let length=module%2===0?3:6;
  if(remaining<length||remaining-length===1||remaining-length===2)length=3;
  const mirrored=module%4>=2;
  // Close the first half of a module at a 12 + 6n loading boundary.
  // Three portraits, then three landscapes, keep the same variant counts and
  // avoid leaving a short centre tile between two portraits until the next tap.
  const closesLoadingStage=length===6&&tiles.length+3>=12&&(tiles.length+3-12)%6===0;
  const slots=length===3?[[1,0,2,2],[3,0,1,1],[3,1,1,1]]:closesLoadingStage?[[1,0,1,2],[2,0,1,2],[3,0,1,2],[1,1,1,1],[2,1,1,1],[3,1,1,1]]:[[1,0,1,2],[2,0,1,1],[3,0,1,2],[2,1,1,2],[1,2,1,1],[3,2,1,1]];
  add(mirrored?slots.map(([column,offset,columns,rows])=>[4-column-columns+1,offset,columns,rows]):slots);
  module++;
 }
 return place(tiles);
}
// Prefer a complete visible ending only when slicing the full layout leaves a
// significantly worse column imbalance. Hidden suffix positions remain unused.
export function progressiveDesktopStoryMosaic(count:number,visibleCount:number,containerWidth=1279):DesktopMosaicTile[]{
 const full=desktopStoryMosaic(count,containerWidth),visible=Math.min(count,visibleCount);
 if(visible<3||visible===count)return full;
 const endingImbalance=(tiles:DesktopMosaicTile[])=>{
  const ends=[0,0,0];for(const tile of tiles)for(let c=tile.column-1;c<tile.column-1+tile.columns;c++)ends[c]=Math.max(ends[c],tile.top+tile.height);
  return Math.max(...ends)-Math.min(...ends);
 };
 const complete=desktopStoryMosaic(visible,containerWidth);
 return endingImbalance(complete)+.1<endingImbalance(full.slice(0,visible))?[...complete,...full.slice(visible)]:full;
}
// Completed, deterministic modules: four-story feature, three equal tiles, two wide tiles.
// Short result sets close their final row rather than leaving an unfinished module.
export function storyMosaic(count:number):MosaicTile[]{
 const tiles=Array.from({length:count},()=>({column:1,row:1,columns:12,rows:1,tabletColumn:1,tabletRow:1,tabletColumns:1}));
 let at=0,row=1,module=0;
 while(at<count){const remaining=count-at;
  if(module%3===0&&remaining>=4&&remaining!==5){
   [[1,row,6,2],[7,row,3,1],[10,row,3,1],[7,row+1,6,1]].forEach(([column,r,columns,rows],j)=>Object.assign(tiles[at+j],{column,row:r,columns,rows}));at+=4;row+=2;
  }else{let n=Math.min(module%3===1?3:2,remaining);if(remaining===3||remaining===5)n=3;if(remaining===4)n=2;const span=12/n;for(let j=0;j<n;j++)Object.assign(tiles[at+j],{column:1+j*span,row,columns:span,rows:1});at+=n;row++;}module++;
 }
 at=0;row=1;module=0;
 while(at<count){const remaining=count-at;if(module%2===0&&remaining>=3){Object.assign(tiles[at],{tabletColumn:1,tabletRow:row,tabletColumns:2});Object.assign(tiles[at+1],{tabletColumn:1,tabletRow:row+1,tabletColumns:1});Object.assign(tiles[at+2],{tabletColumn:2,tabletRow:row+1,tabletColumns:1});at+=3;row+=2;}else{const n=Math.min(2,remaining);for(let j=0;j<n;j++)Object.assign(tiles[at+j],{tabletColumn:j+1,tabletRow:row,tabletColumns:n===1?2:1});at+=n;row++;}module++;}
 return tiles;
}
