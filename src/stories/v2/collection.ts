import snapshot from './collection-snapshot.json';
import type {StoryRecord} from '../types';
export const categories=['New Beginnings','Family & Relationships','Work & Purpose','Community & Belonging','Looking Forward'] as const;
export type Category=typeof categories[number];
export type CategorizedStory=StoryRecord&{categories:Category[]};
export const storiesV2=snapshot.stories as CategorizedStory[];
export function filterStories(category:Category|'All Stories',records=storiesV2){return category==='All Stories'?records:records.filter(story=>story.categories.includes(category))}
