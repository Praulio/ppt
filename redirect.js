(function () {
  var NEW = 'https://deusvult.pages.dev';
  var p = location.pathname.replace(/^\/ppt/, '') || '/';
  if (!/\.[a-z0-9]+$/i.test(p) && p.slice(-1) !== '/') p += '/';
  // versiones de prueba que ya no existen → la versión vigente de la 02
  if (/^\/02\//.test(p) && !/^\/02\/motion-b2\//.test(p)) p = '/02/motion-b2/';
  if (p === '/index.html') p = '/';
  location.replace(NEW + p + location.search + location.hash);
})();
