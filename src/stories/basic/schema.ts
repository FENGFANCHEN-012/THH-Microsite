import type {Image} from '../types';
export type Inline={text:string;href?:string;emphasis?:'strong'|'em'};
export type NarrativeImage=Image&{narrativeHeading?:string;narrativeText?:string;overlayPosition?:'top'|'bottom'|'top-left'|'top-right'|'bottom-left'|'bottom-right';overlayTone?:'light'|'dark';editorialStyle?:'statement'|'reflection'|'aside'};
export type ArticleImage=Omit<Image,'alt'>&{alt?:string};
export type BasicBlock=
 |{id:string;type:'paragraph';paragraphs:(string|Inline[])[]}
 |{id:string;type:'linkedParagraph';content:Inline[]}
 |{id:string;type:'subheadline';text:string}
 |{id:string;type:'image';image:ArticleImage;presentation?:'standalone'|'carousel'|'gallery';images?:NarrativeImage[];title?:string;cleanCarousel?:boolean;layout?:'reading'|'wide'|'offset-left'|'offset-right'}
 |{id:string;type:'textPhoto';image:Image;paragraphs:string[];imageSide?:'left'|'right'}
 |{id:string;type:'photoPair';images:[Image,Image];caption?:string}
 |{id:string;type:'video';title:string;poster:Image;src?:string;embedUrl?:string;captions?:string;caption?:string;watchUrl?:string}
 |{id:string;type:'quoteReveal';quote:string;name:string};
export type EnhancedBlock=
 |{id:string;type:'scrollGallery';title:string;images:Image[]}
 |{id:string;type:'scrollTimeline';title:string;entries:{period:string;title:string;text:string;image?:Image}[]}
 |{id:string;type:'gallery';title:string;images:Image[]}

 |{id:string;type:'timeline';title:string;entries:{period:string;title:string;text:string;image?:Image}[]}
 |{id:string;type:'imageReveal';image:Image};
export type ContentBlock=BasicBlock|EnhancedBlock;
export type Article={daysFree?:number;fictional?:boolean;title:string;person:string;introduction:string;hero:Image;heroAlignment?:'left'|'right';heroFocalPosition?:string;blocks:ContentBlock[]};
