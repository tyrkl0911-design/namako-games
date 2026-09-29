const { loadStats, saveStats, todayJST } = require('./_stats-store');

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  try {
    const url = new URL(req.url, 'http://localhost');
    const path = (url.searchParams.get('path') || '/').slice(0, 200);

    const stats = await loadStats();
    const today = todayJST();

    stats.total += 1;
    stats.byDate[today] = (stats.byDate[today] || 0) + 1;
    stats.byPage[path] = (stats.byPage[path] || 0) + 1;

    await saveStats(stats);
    res.status(204).end();
  } catch (e) {
    res.status(204).end();
  }
};
