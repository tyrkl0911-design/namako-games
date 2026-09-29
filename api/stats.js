const { loadStats } = require('./_stats-store');

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');

  const url = new URL(req.url, 'http://localhost');
  const token = url.searchParams.get('token');
  if (!process.env.DASHBOARD_TOKEN || token !== process.env.DASHBOARD_TOKEN) {
    res.status(401).json({ error: 'unauthorized' });
    return;
  }

  try {
    const stats = await loadStats();
    res.status(200).json(stats);
  } catch (e) {
    res.status(500).json({ error: 'failed' });
  }
};
