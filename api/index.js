// Serves the site's index.html from the GitHub repo (via jsDelivr CDN) with the right content type.
const SHA = '06716cf1dfff188c3eefaecf23d248c5e6e4dc32';
const SRC = `https://cdn.jsdelivr.net/gh/yashgoswami627/mindsmedia-website@${SHA}/index.html`;
module.exports = async (req, res) => {
  try {
    const r = await fetch(SRC);
    if (!r.ok) throw new Error('upstream ' + r.status);
    const html = await r.text();
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=604800');
    res.status(200).send(html);
  } catch (e) {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.status(502).send('Minds Media is updating. Please refresh in a moment.');
  }
};
