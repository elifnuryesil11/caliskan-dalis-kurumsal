import {onRequestGet} from '../functions/api/instagram';
export default {async fetch(request,env,ctx){const url=new URL(request.url);if(url.pathname==='/api/instagram'){if(request.method!=='GET')return new Response('Method not allowed',{status:405});return onRequestGet({env});}return env.ASSETS.fetch(request);}};
