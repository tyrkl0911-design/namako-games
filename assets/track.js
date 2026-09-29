(function () {
  try {
    var url = '/api/track?path=' + encodeURIComponent(location.pathname);
    if (navigator.sendBeacon) {
      navigator.sendBeacon(url);
    } else {
      fetch(url, { method: 'POST', keepalive: true }).catch(function () {});
    }
  } catch (e) {}
})();
