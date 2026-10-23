import {build} from 'vite';
import {readFile,writeFile,mkdir,rm} from 'node:fs/promises';
import {resolve} from 'node:path';
const base=process.env.SITE_BASE_PATH||'/';
if(!base.startsWith('/')||!base.endsWith('/'))throw new Error('SITE_BASE_PATH must start/end with /.');
await build();
await build({build:{ssr:'export/ssr.tsx',outDir:'.export-ssr',emptyOutDir:true,rollupOptions:{output:{entryFileNames:'render.mjs'}}}});
const {render}=await import(resolve('.export-ssr/render.mjs'));
await build({build:{lib:{entry:'export/cloudflare-worker.js',formats:['es'],fileName:()=>'_worker.js'},outDir:'.worker-output',emptyOutDir:true,copyPublicDir:false}});
await writeFile('dist/_worker.js',await readFile('.worker-output/_worker.js'));
await writeFile('dist/_routes.json',JSON.stringify({version:1,include:['/api/instagram'],exclude:[]}));
await rm('.worker-output',{recursive:true,force:true});
const template=await readFile('dist/index.html','utf8');
const pages=[['/','Çalışkan Dalış | Ayvalık','Çalışkan Dalış. Ayvalık’ta dalış hakkında bilgi, iletişim ve su altından kareler.'],['/hakkimizda','Hakkımızda | Çalışkan Dalış','Çalışkan Dalış — Ayvalık, Ege Denizi.'],['/hizmetlerimiz','Hizmetlerimiz | Çalışkan Dalış','Ayvalık’ta dalış ve program bilgileri için Çalışkan Dalış ile iletişime geçin.'],['/galeri','Galeri | Çalışkan Dalış','Çalışkan Dalış galeri ve @dalisnoktam Instagram bağlantısı.'],['/iletisim','İletişim | Çalışkan Dalış','Çalışkan Dalış — +90 506 425 79 94, dalisnoktam@gmail.com. Ayvalık, Türkiye.']];
for(const [path,title,description]of pages){const dir=path==='/'?'dist':`dist${path}`;await mkdir(dir,{recursive:true});await writeFile(`${dir}/index.html`,template.replace('<!--app-->',render(path)).replace(/<title>.*?<\/title>/,`<title>${title}</title>`).replace(/name="description" content="[^"]*"/,`name="description" content="${description}"`));}
const gallery=JSON.parse(await readFile('source/public/gallery.json','utf8'));
for(const item of gallery.items){if(item.url.startsWith('/'))item.url=base+item.url.slice(1)}
await writeFile('dist/gallery.json',base==='/'?await readFile('source/public/gallery.json'):JSON.stringify(gallery));
await writeFile('dist/.nojekyll','');
await writeFile('dist/robots.txt','User-agent: *\nAllow: /\n');
await rm('.export-ssr',{recursive:true,force:true});
console.log(`Prepared five static pages. Base: ${base}`);
