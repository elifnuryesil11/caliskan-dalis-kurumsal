# ÇALIŞKAN DALIŞ — GÜNCEL KURUMSAL WEB SİTESİ

Bu paket, bu sohbette geliştirilen lacivert–mat altın kurumsal sitedir. İlk 3D animasyonlu referans sitenin dosyaları değildir.

Doğrulanan site: https://caliskan-dalis-kurumsal.abloomgrass2048.chatgpt.site
Kaydedilmiş en güncel sürüm: 1
Kaynak commit: 8a4d1fd3d712f9f9d53370b106de7abe2db20695

## Paketin içeriği
- `source/`: Yayındaki kurumsal projenin Git commit'inden alınan, değiştirilmemiş gerçek kaynak dosyaları. React sayfaları, Tailwind/CSS, görseller, yerel galeri, orijinal sunucu kodu, bağımlılık listesi ve pnpm kilit dosyası dahil.
- `dist/`: Ek kurulum gerektirmeyen, hazır yayın çıktısı. React ve kullanılan istemci bağımlılıkları JS paketinde, Tailwind stilleri CSS paketinde dahildir. Beş sayfa HTML olarak da üretilir.
- `export/` ve `vite.config.mjs`: Aynı sayfa bileşenlerini kullanan taşınabilir yayın katmanı. Yeni tasarım veya yeni içerik oluşturmaz. GitHub repo alt dizinleri için yalnızca yerel bağlantı/görsel yollarını derleme sırasında uyarlar.
- `package.json`, `package-lock.json`: Taşınabilir yayın katmanının sabitlenmiş geliştirme bağımlılıkları. `node_modules` arşivlenmez; hazır site çalışması için gerekmez. Kaynağı yeniden derlemek için `npm ci` kullanılır.
- `.github/workflows/pages.yml`: GitHub Pages otomatik yayın iş akışı.
- `wrangler.toml`, `functions/api/instagram.ts`, `dist/_worker.js`, `dist/_routes.json`: Cloudflare Pages yayını ve isteğe bağlı güvenli Instagram sunucu bağlantısı.
- `EXPORT-MANIFEST.json`: Orijinal kaynak dosyaların SHA-256 ve boyut listesi.
- `EXPORT-CHECKS.json`: Yapılan doğrulamalar ve sınırları.

## Korunanlar
Ana Sayfa, Hakkımızda, Hizmetlerimiz, Galeri ve İletişim. Logo, lacivert–altın tasarım, metinler, menü, mobil CSS, tüm üç yerel fotoğraf, galeri filtreleri, büyütme/önceki/sonraki kontrolleri, telefon/e-posta/Instagram/harita bağlantıları ve WhatsApp mesaj hazırlama formu aynı kaynak bileşenlerinden çalışır.

Yayındaki proje değiştirilmedi, yeniden yayımlanmadı ve eski sürüme döndürülmedi. Bu işlem ayrı bir dışa aktarım kopyası üzerinde yapıldı. Orijinal Sites altyapısı yalnızca `source/` içinde saklanır; harici yayında Sites oturumu veya platform bağlantısı gerekmez.

## GitHub Pages — önerilen yol
1. ZIP'i açın. İçindeki `Caliskan-Dalis-Kurumsal` klasörünün İÇERİĞİNİ yeni GitHub reposunun köküne yükleyin. `.github` klasörü dahil olsun. Git ile yüklemek gizli dosyaları korur.
2. Ücretsiz GitHub Pages için public repo kullanın. Ana dal `main` olsun.
3. Settings → Pages → Build and deployment → Source: **GitHub Actions**.
4. Actions → Kurumsal Site - GitHub Pages → Run workflow. Sonraki main push işlemlerinde otomatik yayımlanır.
5. Yayın URL'si Settings → Pages'te görünür.

İş akışı reponun alt yolunu otomatik alır. Elle derlemede:

```sh
npm ci
SITE_BASE_PATH=/REPO-ADI/ npm run build
```

Kullanıcı sitesi (`kullanici.github.io`) veya özel alan adı için `SITE_BASE_PATH=/` kullanın. ZIP'teki hazır dist/ çıktısı alan adı kökü içindir; `/REPO-ADI/` altında yayın için workflow ile yeniden derleyin.

## Cloudflare Pages
GitHub reposunu Pages'e bağlayın:
- Framework preset: **None**
- Production branch: **main**
- Build command: **npm ci && npm run build**
- Build output directory: **dist**
- Root directory: repo kökü
- Node: **22** (`NODE_VERSION=22`)
- `SITE_BASE_PATH` tanımlamayın; varsayılan `/`.

Hazır çıktıyı CLI ile yayınlamak için: `npx wrangler pages deploy dist --project-name caliskan-dalis-kurumsal`.
`dist/_worker.js` yalnızca `/api/instagram` için çalışır; diğer sayfalar statik sunulur. Bu dosya sunucu kodudur, tarayıcıya API anahtarı taşımaz. Cloudflare projesinde uygun Meta hesabı yetkisi varsa `INSTAGRAM_ACCESS_TOKEN` değişkenini secret olarak tanımlayın. Gerçek token pakette yoktur.

## Instagram ve formun mevcut durumu
Kaynak sitede Instagram otomatik bağlantısı henüz yetkilendirilmemişti; galeri üç temsilî yerel görsel kullanıyordu. Bu durum aynen korunur.
- GitHub Pages sunucu sırrı/API çalıştırmaz. Yerel galeri, filtre ve büyütme çalışır. Otomatik Instagram akışı için ayrı sunucu gerekir; istemciye token koymayın.
- Cloudflare Pages'te mevcut sunucu bağlantısı taşınmıştır. Token yoksa veya Meta hatası varsa yerel galeri gösterilir. Canlı Meta entegrasyonu hesap yetkisi sağlanmadan doğrulanamaz.
- Form, doldurulan mesajı WhatsApp'ta hazırlar. Kullanıcı göndermeyi onaylar. Kaynak sitede de otomatik e-posta veya veritabanı kaydı yoktur.

Yerel galeri düzenlemesi: `source/public/gallery.json` ve `source/public/images/`. Değişiklik sonrası yeniden derleyip yayımlayın.

## Bilgisayarda çalıştırma
Hazır çıktıyı sunmak için:

```sh
python3 -m http.server 8000 --directory dist
```

Tarayıcıda `http://localhost:8000/` açın. Sayfayı `file://` ile çift tıklayarak açmayın.
Geliştirme: Node 22.13+ ile `npm ci`, ardından `npm run dev`.

## Doğrulama
Kaynak snapshot dosyaları yayındaki sürümün commit'iyle byte/SHA-256 düzeyinde karşılaştırılır. Kök ve repo alt yolu derlemeleri kontrol edilir. Tarayıcı kontrolü dışa aktarımın alt dizinli statik çıktısında yapılır. GitHub veya Cloudflare hesabında gerçek yayın yapılmamıştır. Test ayrıntıları EXPORT-CHECKS.json içindedir.

Resmî belgeler:
- https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
- https://developers.cloudflare.com/pages/framework-guides/deploy-anything/
