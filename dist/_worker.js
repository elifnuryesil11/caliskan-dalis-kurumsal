var e = {
	items: [
		{
			id: "1",
			url: "/images/underwater.jpg",
			alt: "Su altında dalgıç ve mavi derinlik",
			category: "Sualtı"
		},
		{
			id: "2",
			url: "/images/hero.jpg",
			alt: "Balık sürüsü yanında dalgıç",
			category: "Sualtı"
		},
		{
			id: "3",
			url: "/images/sea.jpg",
			alt: "Deniz ve kıyının doğal dokusu",
			category: "Deniz"
		}
	],
	source: "local",
	note: "Temsilî fotoğraflar · Firma faaliyet arşivi değildir."
}, t = async ({ env: t }) => {
	let n = t.INSTAGRAM_ACCESS_TOKEN;
	if (n) try {
		let e = new URL("https://graph.instagram.com/me/media");
		e.searchParams.set("fields", "id,caption,media_type,media_url,thumbnail_url,permalink"), e.searchParams.set("limit", "30");
		let t = await fetch(e, {
			headers: { Authorization: `Bearer ${n}` },
			signal: AbortSignal.timeout(8e3)
		});
		if (t.ok) {
			let e = ((await t.json()).data || []).filter((e) => e.media_url || e.thumbnail_url).map((e) => ({
				id: e.id,
				url: e.media_type === "VIDEO" ? e.thumbnail_url : e.media_url,
				alt: (e.caption || "Instagram paylaşımı").slice(0, 200),
				permalink: e.permalink,
				category: "Sualtı"
			})).filter((e) => e.url?.startsWith("https://"));
			if (e.length) return Response.json({
				items: e,
				source: "instagram"
			}, { headers: { "Cache-Control": "public,max-age=900" } });
		}
	} catch {}
	return Response.json(e);
}, n = { async fetch(e, n, r) {
	return new URL(e.url).pathname === "/api/instagram" ? e.method === "GET" ? t({ env: n }) : new Response("Method not allowed", { status: 405 }) : n.ASSETS.fetch(e);
} };
//#endregion
export { n as default };
