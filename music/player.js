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
  const ctx = new AC(), master = ctx.createGain(); master.gain.value = 0; master.connect(ctx.destination);
  const bufs = new Map();
  const load = (i) => { i = ((i % N) + N) % N; if (!bufs.has(i)) bufs.set(i, fetch(BASE + TRACKS[i].f).then((r) => r.arrayBuffer()).then((ab) => new Promise((ok, no) => ctx.decodeAudioData(ab, ok, no))).catch(() => null)); return bufs.get(i); };
  const CIN = new Float32Array(64).map((_, i) => Math.sin(i / 63 * Math.PI / 2)), COUT = new Float32Array(64).map((_, i) => Math.cos(i / 63 * Math.PI / 2));
  const voices = [];      // {i, at, offset} de las pasadas programadas (para saber dónde va la música)

  async function voice(i, offset, at, fadeIn) {
    i = ((i % N) + N) % N;
    const b = await load(i); if (!b || !playing) return;
    at = Math.max(at, ctx.currentTime + .02);
    const len = b.duration - offset, src = ctx.createBufferSource(), g = ctx.createGain();
    src.buffer = b; src.connect(g); g.connect(master);
    if (fadeIn > 0) { g.gain.setValueAtTime(0, at); g.gain.setValueCurveAtTime(CIN, at, fadeIn); } else g.gain.setValueAtTime(1, at);
    g.gain.setValueAtTime(1, at + fadeIn + .01);
    const nxt = (i + 1) % N, nextAt = at + len - XF;
    if (nextAt - at > XF + 1) g.gain.setValueCurveAtTime(COUT, nextAt, XF);
    src.start(at, offset); src.stop(at + len + .2);
    voices.push({ i, at, offset }); if (voices.length > 6) voices.shift();
    load(nxt);          // se prepara la siguiente pista con tiempo
    setTimeout(() => { if (playing) voice(nxt, TRACKS[nxt].t0, nextAt, XF); }, Math.max(0, (nextAt - ctx.currentTime - 12) * 1000));
  }

  function where() {      // pista y segundo actuales
    const now = ctx.currentTime; let v = null;
    for (const x of voices) if (x.at <= now) v = x;
    return v ? { i: v.i, pos: v.offset + (now - v.at) } : null;
  }
  const save = () => { const w = where(); if (w && playing) ls.set(KEY, JSON.stringify({ i: w.i, pos: w.pos, ts: Date.now() })); };
  setInterval(save, 1000); addEventListener('pagehide', save);

  async function begin() {
    if (started || muted || ctx.state !== 'running') return;
    started = true; playing = true; setIcon();
    let i = 0, pos = TRACKS[0].t0, fade = FIN;
    const nav = ((performance.getEntriesByType('navigation')[0] || {}).type) || 'navigate';
    let same = false; try { same = !!document.referrer && new URL(document.referrer).origin === location.origin; } catch (e) { /* */ }
    const resumable = nav === 'back_forward' || (nav === 'navigate' && same);      // al refrescar o entrar de cero, empieza otra vez la primera pista
    try { const s = JSON.parse(ls.get(KEY) || 'null'); if (resumable && s && Date.now() - s.ts < FRESH && s.i < N) { i = s.i; pos = s.pos + (Date.now() - s.ts) / 1000; fade = 1.2; } } catch (e) { /* */ }
    const b = await load(i); if (!b) { started = playing = false; setIcon(); return; }
    if (pos >= b.duration - XF - 1) { i = (i + 1) % N; pos = TRACKS[i].t0; }
    master.gain.cancelScheduledValues(ctx.currentTime); master.gain.setValueAtTime(0, ctx.currentTime);
    master.gain.linearRampToValueAtTime(muted ? 0 : VOL, ctx.currentTime + fade);
    voice(i, pos, ctx.currentTime + .05, 0);
  }
  async function wake() { try { await ctx.resume(); } catch (e) { /* */ } begin(); }
  ctx.onstatechange = begin;
  load(0).then(() => { ctx.resume().catch(() => {}); begin(); });          // por defecto intenta sonar al cargar

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

  /* al abrir otra página: baja suave (se retoma sola al llegar) */
  window.PPTMusic = {
    leave(ms = 800) { if (!playing || leaving) return; leaving = true; save(); master.gain.cancelScheduledValues(ctx.currentTime); master.gain.setTargetAtTime(0, ctx.currentTime, ms / 3000); },
    state: () => ({ started, muted, ctx: ctx.state, where: where(), gain: master.gain.value }),
  };
})();
