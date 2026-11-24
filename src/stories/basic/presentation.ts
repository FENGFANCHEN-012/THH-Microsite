// Rendering-only cleanup; provisional source data and original alt text stay intact.
export function editorialText(text?:string){
 return (text||'').replace(/\s*(?:THH context photograph|Context photograph|Objects are shown as context|Contextual (?:organisational )?photograph|Contextual organisational imagery|Illustrative stock photograph|This video (?:does not|provides context)|The organisational film below provides wider context)[\s\S]*/i,'').replace(/\s*[·—]\s*fictional reflection[^.]*[.]?/gi,'').replace(/\s*[·—]\s*fictional story/gi,'').replace(/Beyond this fictional individual story, explore /g,'Explore ').replace(/\s*not a location from [^.]*fictional life[.]?/gi,'').replace(/^(?:fictional reflection|fictional contributor|fictional character|demonstration contributor)[\s\S]*/i,'').replace(/In this fictional account, /g,'').replace(/His fictional story/g,'His story').replace(/To learn more about the organisation behind the contextual photographs, visit/g,'To learn more about The Helping Hand, visit').replace(/ accompanies a fictional reflection[^.]*[.]/g,'.').replace(/; not a photograph of a fictional [^.]*[.]/g,'.').replace(/ Daniel and every event in this story are fictional placeholders[^.]*[.]/g,'').replace(/ In Daniel’s fictional story,[^.]*[.]/g,'').replace(/ They echo the manageable steps in this fictional story[^.]*[.]/g,'').replace(/fictional Mei/g,'Mei').replace(/ Mei is not an actual THH participant[.]/g,'').replace(/; this photograph does not depict Aaron[.]/g,'.').replace(/\s*·\s*FICTIONAL FIGURES/gi,'').replace(/^A fictional personal milestone[^.]*[.]/i,'').trim();
}

const presentationCache=new WeakMap<object,unknown>();
export function presentationRecord<T>(value:T):T{
 if(!value||typeof value!=='object')return value;
 if(presentationCache.has(value))return presentationCache.get(value) as T;
 const result=Array.isArray(value)?value.map(item=>typeof item==='string'?editorialText(item):presentationRecord(item)):Object.fromEntries(Object.entries(value).map(([key,item])=>[key,key==='alt'?item:typeof item==='string'?editorialText(item):presentationRecord(item)]));
 presentationCache.set(value,result);return result as T;
}
