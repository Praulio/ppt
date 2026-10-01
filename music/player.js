/* Música ambiental compartida de todas las presentaciones (repo ppt).
   - Las pistas suenan en orden y en bucle, encadenadas con un cruce de potencia constante (nunca se corta).
   - Al cambiar de página retoma justo donde iba (posición guardada en localStorage) con una entrada suave.
   - Un solo botón discreto de silencio; en las presentaciones se desvanece junto con el cursor (body.idle).
   - Para agregar una pista: copiarla a esta carpeta (mp3, normalizada ~ -19 LUFS) y añadirla a TRACKS.
     t0 = segundo desde el que entra la pista (para saltar una intro larga).
   Se incluye con:  <script src="…/music/player.js"></script>  */
(() => {
  'use strict';
  const BASE = new URL('.', document.currentScript.src).href;
  const TRACKS = [
    { f: '01-deus-vult.mp3', t0: 15.9 },
    { f: '02-deus-vult-2.mp3', t0: 0 },
    { f: '03-kyrie.mp3', t0: 0 },
    { f: '04-kyrie-2.mp3', t0: 0 },
  ];
  const XF = 5, VOL = .5, FIN = 2.6, FRESH = 30000, KEY = 'ppt-music-v1', MUTE = 'ppt-music-muted';
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC || location.protocol === 'file:') return;
  const N = TRACKS.length;
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const ls = { get: (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } }, set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) { /* */ } } };

  let muted = ls.get(MUTE) === '1', started = false, playing = false, leaving = false;
  /* Streaming: dos <audio> (A y B) pasan por un GainNode cada uno. Nada se decodifica completo en memoria
     (decodificar 4 pistas de 3 min tumbaba la pestaña en iPhone). El cruce entre pistas es de potencia constante. */
  const ctx = new AC(), master = ctx.createGain(); master.gain.value = 0; master.connect(ctx.destination);
  const mkVoice = () => { const el = new Audio(); el.preload = 'none'; el.crossOrigin = 'anonymous'; el.setAttribute('playsinline', ''); const g = ctx.createGain(); g.gain.value = 0; ctx.createMediaElementSource(el).connect(g); g.connect(master); return { el, g, i: -1 }; };
  const V = [mkVoice(), mkVoice()]; let cur = 0, crossing = false;
  const urls = new Map();      // el hosting no entrega rangos de bytes y iOS los exige: cada pista se baja entera (≈3 MB) y se reproduce como archivo local
  const getUrl = (i) => { if (!urls.has(i)) urls.set(i, fetch(BASE + TRACKS[i].f).then((r) => r.blob()).then((b) => URL.createObjectURL(b)).catch(() => { urls.delete(i); return null; })); return urls.get(i); };
  const use = async (v, i, pos) => {
    const u = await getUrl(i); if (!u) throw new Error('sin pista');
    v.i = i; v.el.src = u; v.el.preload = 'auto';
    const seek = () => { try { v.el.currentTime = pos; } catch (e) { /* */ } };
    v.el.addEventListener('loadedmetadata', function f() { v.el.removeEventListener('loadedmetadata', f); seek(); });
    getUrl((i + 1) % N);      // la siguiente se adelanta
  };
  function where() { const v = V[cur]; return v.i < 0 || !v.el.currentTime ? null : { i: v.i, pos: v.el.currentTime }; }
  const save = () => { const w = where(); if (w && playing) ls.set(KEY, JSON.stringify({ i: w.i, pos: w.pos, ts: Date.now() })); };
  setInterval(save, 1000); addEventListener('pagehide', save);

  setInterval(() => {      // vigila el final de la pista y hace el cruce con la siguiente
    if (!playing) return;
    const v = V[cur], o = V[1 - cur], d = v.el.duration;
    if (!crossing && isFinite(d) && d > 0 && v.el.currentTime >= d - XF) {
      crossing = true; const n = (v.i + 1) % N;
      use(o, n, TRACKS[n].t0).then(() => { o.el.play().catch(() => {}); const t = ctx.currentTime;
      o.g.gain.cancelScheduledValues(t); o.g.gain.setValueAtTime(0, t); o.g.gain.setValueCurveAtTime(CIN, t + .05, XF);
      v.g.gain.cancelScheduledValues(t); v.g.gain.setValueAtTime(1, t); v.g.gain.setValueCurveAtTime(COUT, t + .05, XF);
      setTimeout(() => { v.el.pause(); cur = 1 - cur; crossing = false; }, XF * 1000 + 400); }).catch(() => { crossing = false; });
    }
  }, 300);
  const CIN = new Float32Array(48).map((_, i) => Math.sin(i / 47 * Math.PI / 2)), COUT = new Float32Array(48).map((_, i) => Math.cos(i / 47 * Math.PI / 2));

  let beginning = false;
  async function begin() {
    if (started || muted || beginning) return;
    let i = 0, pos = TRACKS[0].t0, fade = .45;      // entrada en frío: el coro llega de golpe, justo al hacer clic
    const nav = ((performance.getEntriesByType('navigation')[0] || {}).type) || 'navigate';
    let same = false; try { same = !!document.referrer && new URL(document.referrer).origin === location.origin; } catch (e) { /* */ }
    const resumable = nav === 'back_forward' || (nav === 'navigate' && same);      // al refrescar o entrar de cero, empieza otra vez la primera pista
    try { const st = JSON.parse(ls.get(KEY) || 'null'); if (resumable && st && Date.now() - st.ts < FRESH && st.i < N) { i = st.i; pos = st.pos + (Date.now() - st.ts) / 1000; fade = 1.2; } } catch (e) { /* */ }
    beginning = true;
    const v = V[cur];
    try { await use(v, i, pos); if (ctx.state !== 'running') await ctx.resume(); await v.el.play(); } catch (e) { beginning = false; return; }
    beginning = false;      // bloqueado hasta un gesto: se reintenta en el siguiente
    started = true; playing = true; setIcon();
    const t = ctx.currentTime; v.g.gain.setValueAtTime(1, t);
    master.gain.cancelScheduledValues(t); master.gain.setValueAtTime(0, t); master.gain.linearRampToValueAtTime(muted ? 0 : VOL, t + fade);
  }
  async function wake() { try { await ctx.resume(); } catch (e) { /* */ } begin(); }
  begin();          // por defecto intenta sonar al cargar (el navegador lo permite solo con permiso del sitio)

  /* botón */
  const css = document.createElement('style');
  css.textContent = `.pm-btn{position:fixed;right:16px;top:16px;z-index:2147483000;width:36px;height:36px;border-radius:50%;display:grid;place-items:center;color:#f3dfa0;cursor:pointer;padding:0;
    background:rgba(7,11,44,.55);border:1.2px solid rgba(227,176,75,.55);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);opacity:.5;transition:opacity .5s,transform .25s,background .25s;-webkit-tap-highlight-color:transparent}
    .pm-btn:hover{opacity:1;transform:scale(1.08);background:rgba(15,26,92,.8)}.pm-btn svg{width:18px;height:18px}.pm-btn .x{opacity:0;transition:opacity .2s}.pm-btn.muted .x{opacity:1}.pm-btn.muted .w{opacity:.35}
    body.idle .pm-btn:not(.call){opacity:0;pointer-events:none}
    .pm-btn.call{opacity:.95}.pm-btn.call::after{content:"";position:absolute;inset:-2px;border-radius:50%;border:2px solid #e3b04b;animation:pmring 2.2s ease-out infinite}
    @keyframes pmring{from{transform:scale(1);opacity:.9}to{transform:scale(1.7);opacity:0}}`;
  document.head.appendChild(css);
  const btn = document.createElement('button'); btn.type = 'button'; btn.className = 'pm-btn call'; btn.setAttribute('aria-label', 'Sonido');
  btn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9z" fill="currentColor"/><path class="w" d="M16 8.5a5 5 0 0 1 0 7M18.6 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path class="x" d="M3 3l18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
  const mount = () => document.body.appendChild(btn);
  document.body ? mount() : addEventListener('DOMContentLoaded', mount);
  function setIcon() { btn.classList.toggle('muted', muted || !started); btn.classList.toggle('call', !started && !muted); }
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!started) { muted = false; ls.set(MUTE, '0'); wake(); }
    else { muted = !muted; ls.set(MUTE, muted ? '1' : '0'); master.gain.setTargetAtTime(muted ? 0 : VOL, ctx.currentTime, .18); }
    setIcon();
  });
  ['pointerdown', 'pointerup', 'click', 'keydown', 'touchstart', 'touchend'].forEach((ev) => addEventListener(ev, (e) => { if (e.target.closest && e.target.closest('.pm-btn')) return; wake(); }, { passive: true }));
  document.addEventListener('visibilitychange', () => { if (!playing) return; document.hidden ? ctx.suspend() : (muted || ctx.resume()); });
  setIcon();

  /* botón de inicio (solo en las presentaciones): vuelve al menú de la landing */
  const ROOT = new URL('../', BASE), onLanding = location.pathname.replace(/index\.html$/, '') === ROOT.pathname;
  if (!onLanding) {
    const hs = document.createElement('style');
    hs.textContent = `.pm-home{position:fixed;left:16px;top:16px;z-index:2147483000;width:36px;height:36px;border-radius:50%;display:grid;place-items:center;color:#f3dfa0;text-decoration:none;
      background:rgba(7,11,44,.55);border:1.2px solid rgba(227,176,75,.55);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);opacity:.5;transition:opacity .5s,transform .25s,background .25s;-webkit-tap-highlight-color:transparent}
      .pm-home:hover,.pm-home:focus-visible{opacity:1;transform:scale(1.08);background:rgba(15,26,92,.8)}.pm-home svg{width:18px;height:18px}
      body.idle .pm-home{opacity:0;pointer-events:none}`;
    document.head.appendChild(hs);
    const home = document.createElement('a'); home.className = 'pm-home'; home.href = ROOT.href + '#rack'; home.setAttribute('aria-label', 'Menú');
    home.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 11.2 12 4l8.5 7.2"/><path d="M6 9.8V20h12V9.8"/><path d="M10 20v-5.5h4V20"/></svg>';
    home.addEventListener('click', (e) => { e.stopPropagation(); if (window.PPTMusic) PPTMusic.leave(500); });
    const mountHome = () => document.body.appendChild(home);
    document.body ? mountHome() : addEventListener('DOMContentLoaded', mountHome);
  }

  /* navegación en móvil: barra inferior con ← inicio sonido →. Las presentaciones con motor propio (03 y 02) ganan las flechas;
     00 y 01 ya traen las suyas, solo se les centran inicio y sonido. Mismo clic que en computadora (avanzar / acelerar la pantalla). */
  const touchy = () => matchMedia('(pointer: coarse)').matches || innerWidth < 820;
  const nv = document.createElement('style');
  nv.textContent = `html.pm-dock .pm-home,html.pm-dock .pm-btn{top:auto;bottom:calc(.5rem + env(safe-area-inset-bottom));width:40px;height:40px;opacity:.9;z-index:2147483001}
    html.pm-dock .pm-home{left:calc(50% - 46px);right:auto}html.pm-dock .pm-btn{left:calc(50% + 6px);right:auto}
    html.pm-dock body.idle .pm-home,html.pm-dock body.idle .pm-btn{opacity:.9!important;pointer-events:auto!important}
    .pm-nav{position:fixed;left:0;right:0;bottom:0;height:calc(56px + env(safe-area-inset-bottom));z-index:2147482999;background:linear-gradient(rgba(5,7,26,.0),rgba(5,7,26,.9) 38%,#05071a);border-top:1px solid rgba(227,176,75,.18)}
    .pm-nav button{position:absolute;bottom:calc(.4rem + env(safe-area-inset-bottom));width:44px;height:44px;border-radius:50%;display:grid;place-items:center;padding:0;cursor:pointer;color:#f3dfa0;font:400 1.25rem/1 system-ui,sans-serif;
      background:rgba(7,11,44,.7);border:1.2px solid rgba(227,176,75,.6);-webkit-tap-highlight-color:transparent;touch-action:manipulation}
    .pm-nav button:active{background:rgba(227,176,75,.25)}.pm-nav .pm-prev{left:.75rem}.pm-nav .pm-next{right:.75rem}`;
  document.head.appendChild(nv);
  function setupNav() {
    const on = touchy() && !onLanding, root = document.documentElement;
    root.classList.toggle('pm-dock', on);
    const hasEngine = !!window.DECK;
    root.classList.toggle('pm-bar', on && hasEngine);
    let bar = document.querySelector('.pm-nav');
    if (on && hasEngine && !bar) {
      bar = document.createElement('div'); bar.className = 'pm-nav';
      bar.innerHTML = '<button class="pm-prev" type="button" aria-label="Anterior">←</button><button class="pm-next" type="button" aria-label="Siguiente">→</button>';
      bar.querySelector('.pm-prev').addEventListener('click', (e) => { e.stopPropagation(); window.DECK.prev(); });
      bar.querySelector('.pm-next').addEventListener('click', (e) => { e.stopPropagation(); window.DECK.next(); });
      document.body.appendChild(bar);
    }
    if (bar) bar.style.display = on && hasEngine ? '' : 'none';
    window.dispatchEvent(new Event('resize'));      // el motor recalcula el tamaño de la presentación sin la barra
  }
  const initNav = () => { setupNav(); addEventListener('orientationchange', () => setTimeout(setupNav, 300)); let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { const on = touchy() && !onLanding; if (on !== document.documentElement.classList.contains('pm-dock')) setupNav(); }, 200); }); };
  document.readyState === 'complete' ? initNav() : addEventListener('load', initNav);

  /* al abrir otra página: baja suave (se retoma sola al llegar) */
  window.PPTMusic = {
    leave(ms = 800) { if (!playing || leaving) return; leaving = true; save(); master.gain.cancelScheduledValues(ctx.currentTime); master.gain.setTargetAtTime(0, ctx.currentTime, ms / 3000); },
    state: () => ({ started, muted, ctx: ctx.state, where: where(), gain: master.gain.value }),
    seek: async (i, pos) => { const v = V[cur]; await use(v, i, pos); await v.el.play(); v.g.gain.setValueAtTime(1, ctx.currentTime); },      // para pruebas
  };
})();
