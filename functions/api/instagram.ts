import localGallery from '../../source/public/gallery.json';
interface Env {INSTAGRAM_ACCESS_TOKEN?:string}
export const onRequestGet:PagesFunction<Env>=async ({env})=>{
 const token=env.INSTAGRAM_ACCESS_TOKEN;
 if(token){try{const endpoint=new URL('https://graph.instagram.com/me/media');endpoint.searchParams.set('fields','id,caption,media_type,media_url,thumbnail_url,permalink');endpoint.searchParams.set('limit','30');const response=await fetch(endpoint,{headers:{Authorization:`Bearer ${token}`},signal:AbortSignal.timeout(8000)});if(response.ok){const payload=await response.json() as {data?:Array<Record<string,string>>};const items=(payload.data||[]).filter(m=>m.media_url||m.thumbnail_url).map(m=>({id:m.id,url:m.media_type==='VIDEO'?m.thumbnail_url:m.media_url,alt:(m.caption||'Instagram paylaşımı').slice(0,200),permalink:m.permalink,category:'Sualtı'})).filter(m=>m.url?.startsWith('https://'));if(items.length)return Response.json({items,source:'instagram'},{headers:{'Cache-Control':'public,max-age=900'}})}}catch{}}
 return Response.json(localGallery);
};
