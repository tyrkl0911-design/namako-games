const { get, put } = require('@vercel/blob');

const STATS_PATH = 'analytics/stats.json';
const KEEP_DAYS = 90;

function todayJST() {
  return new Date().toLocaleDateString('sv-SE', { timeZone: 'Asia/Tokyo' });
}

async function loadStats() {
  const result = await get(STATS_PATH, { access: 'private', useCache: false });
  if (!result) return { total: 0, byDate: {}, byPage: {} };
  const text = await new Response(result.stream).text();
  try {
    const data = JSON.parse(text);
    return {
      total: data.total || 0,
      byDate: data.byDate || {},
      byPage: data.byPage || {},
    };
  } catch (e) {
    return { total: 0, byDate: {}, byPage: {} };
  }
}

async function saveStats(stats) {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - KEEP_DAYS);
  for (const d of Object.keys(stats.byDate)) {
    if (new Date(d + 'T00:00:00+09:00') < cutoff) delete stats.byDate[d];
  }
  await put(STATS_PATH, JSON.stringify(stats), {
    access: 'private',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/json',
    cacheControlMaxAge: 0,
  });
}

module.exports = { loadStats, saveStats, todayJST };
