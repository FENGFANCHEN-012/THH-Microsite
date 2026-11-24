export type Image = { src: string; alt: string; caption?: string; width?:number; height?:number };
// Image provenance and permission status are recorded in IMAGE-SOURCES.md.
export type Media = {kind:'image';image:Image}|{kind:'video';src:string;poster:Image;captions:string;transcript:string;caption?:string;mimeType?:string};
export type ImagePanel = {image:Image;title?:string;text?:string};
export type StoryModule =
 | {type:'text-media';id:string;eyebrow?:string;title?:string;paragraphs?:string[];media?:Media;placement?:'left'|'right';fullWidth?:boolean}
 | {type:'gallery';id:string;title:string;images:Image[]}
 | {type:'quote';id:string;quote:string;name:string;role?:string;portrait?:Image}
 | {type:'timeline';id:string;title:string;variant?:'horizontal'|'vertical';layout?:'auto'|'compact'|'extended';entries:{year:string;title:string;text:string;image?:Image}[]}
 | {type:'statistics';id:string;title:string;items:{value:string;suffix?:string;label:string;detail?:string}[]}
 | {type:'comparison';id:string;title:string;before:Image;after:Image;beforeLabel?:string;afterLabel?:string;caption?:string;text?:string}
 | {type:'sticky';id:string;title:string;sections:{title:string;text:string;image:Image;foreground?:Image}[]}
 | {type:'reveal';id:string;image:Image;title?:string}
 | {type:'interlude';id:string;media:Media;title?:string;caption?:string;height?:'short'|'medium'|'tall';orientation?:'landscape'|'portrait';reveal?:boolean}
 | {type:'zoom-pan';id:string;image:Image;title:string;text?:string;zoom?:number;focalPoint?:{x:number;y:number};annotations?:{anchor:{x:number;y:number};title:string;text:string;zoom?:number}[]}
 | {type:'panels';id:string;image:Image;title:string;text?:string;panels:[ImagePanel,ImagePanel] | [ImagePanel,ImagePanel,ImagePanel] };

export type Story = {id:string;slug:string;person?:string;number:string;title:string;category:string;summary:string;readTime:string;hero:{variant?:'split'|'full';media:Media;subtitle?:string};introduction:{heading?:string;paragraph:string;image?:Image};modules:StoryModule[];relatedStoryIds:string[]};

export type StoryRecord={id:string;slug:string;displayName:string;title:string;summary:string;thumbnail:Image;theme?:string;relatedStoryIds:string[];status:'published'|'coming-soon';storyPage?:string;storyId?:string;daysFree?:number;milestoneLabel?:string;preserveListingThumbnail?:boolean;internalStoryLink?:boolean};
