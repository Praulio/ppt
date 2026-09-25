/* Motor de escenas · Confiar sin controlar (dirección A)
   - Escenario fijo 1920×1080 escalado sin deformar.
   - Cada escena = plantilla HTML + init + beats. Cada beat construye dos timelines:
     k.tl (contenido: texto, diagramas; un clic lo completa) y k.ctl (cámara lenta, continúa sola).
   - Retroceder / deep link: se reconstruye la escena desde cero y se aplican los beats 0..n al instante. */
(() => {
  'use strict';
  const W = 1920, H = 1080;
  const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const S = window.SCENES;
  const stage = document.getElementById('stage');
  const scenesEl = document.getElementById('scenes');
  const progress = document.getElementById('progress');
  const notesEl = document.getElementById('notes');
  gsap.defaults({ overwrite: false });

  /* ---------- escala ---------- */
  function fit() {
    const s = Math.min(innerWidth / W, innerHeight / H);
    stage.style.transform = `translate(${(innerWidth - W * s) / 2}px,${(innerHeight - H * s) / 2}px) scale(${s})`;
  }
  addEventListener('resize', fit); fit();

  /* ---------- grano de película ---------- */
  const grain = document.getElementById('grain');
  const gctx = grain.getContext('2d');
  const gframes = [];
  (function makeGrain() {
    grain.width = 640; grain.height = 360;
    for (let f = 0; f < 6; f++) {
      const c = document.createElement('canvas'); c.width = 640; c.height = 360;
      const x = c.getContext('2d'); const id = x.createImageData(640, 360);
      for (let i = 0; i < id.data.length; i += 4) {
        const v = 128 + (Math.random() - .5) * 255;
        id.data[i] = id.data[i + 1] = id.data[i + 2] = v; id.data[i + 3] = 255;
      }
      x.putImageData(id, 0, 0); gframes.push(c);
    }
    gctx.drawImage(gframes[0], 0, 0);
  })();

  /* ---------- partículas (polvo en la luz, lluvia, brasas, estrellas) ---------- */
  const systems = new Set();
  function makeParticles(canvas, type, o = {}) {
    canvas.width = 960; canvas.height = 540;
    const ctx = canvas.getContext('2d');
    const p = Object.assign({ alpha: 1, n: 90, x0: 0, y0: 0, x1: 960, y1: 540, color: '255,214,160', speed: 1 }, o);
    const parts = [];
    const rnd = (a, b) => a + Math.random() * (b - a);
    const spawn = (init) => {
      const q = { x: rnd(p.x0, p.x1), y: init ? rnd(p.y0, p.y1) : (type === 'rain' ? rnd(-60, 0) : type === 'embers' ? p.y1 + 5 : rnd(p.y0, p.y1)),
        r: type === 'rain' ? rnd(9, 22) : type === 'stars' ? rnd(.5, 1.6) : rnd(.5, 2.1),
        vx: 0, vy: 0, a: rnd(.2, 1), ph: rnd(0, 6.28), tw: rnd(.5, 2.2) };
      if (type === 'dust') { q.vx = rnd(-.12, .12); q.vy = rnd(-.10, .06); }
      if (type === 'rain') { q.vx = rnd(-2.6, -1.8); q.vy = rnd(9, 14); }
      if (type === 'embers') { q.vx = rnd(-.15, .15); q.vy = rnd(-.55, -.2); q.life = rnd(0, 1); }
      return q;
    };
    for (let i = 0; i < p.n; i++) parts.push(spawn(true));
    const sys = {
      p, draw(t) {
        ctx.clearRect(0, 0, 960, 540);
        if (p.alpha <= 0.01) return;
        for (let i = 0; i < parts.length; i++) {
          const q = parts[i];
          q.x += q.vx * p.speed; q.y += q.vy * p.speed;
          if (type === 'dust') { q.x += Math.sin(t * .0003 + q.ph) * .05; }
          if (type === 'embers') { q.life += .003 * p.speed; q.x += Math.sin(t * .001 + q.ph) * .12; }
          const out = q.y > p.y1 + 30 || q.y < p.y0 - 30 || q.x < p.x0 - 40 || q.x > p.x1 + 40 || (type === 'embers' && q.life > 1);
          if (out) Object.assign(q, spawn(false));
          let a = q.a * p.alpha;
          if (type === 'dust' || type === 'stars') a *= .55 + .45 * Math.sin(t * .001 * q.tw + q.ph);
          if (type === 'embers') a *= Math.sin(Math.PI * Math.min(1, q.life));
          if (type === 'rain') {
            ctx.strokeStyle = `rgba(${p.color},${a * .32})`; ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(q.x, q.y); ctx.lineTo(q.x - q.vx * q.r * .12, q.y - q.r); ctx.stroke();
          } else {
            const g = ctx.createRadialGradient(q.x, q.y, 0, q.x, q.y, q.r * 3);
            g.addColorStop(0, `rgba(${p.color},${a})`); g.addColorStop(1, `rgba(${p.color},0)`);
            ctx.fillStyle = g; ctx.beginPath(); ctx.arc(q.x, q.y, q.r * 3, 0, 6.283); ctx.fill();
          }
        }
      }
    };
    systems.add(sys);
    return sys;
  }
  let gi = 0, lastG = 0;
  function loop(t) {
    if (!RM && t - lastG > 70) { gi = (gi + 1) % gframes.length; gctx.drawImage(gframes[gi], 0, 0); lastG = t; }
    systems.forEach(s => s.draw(t));
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  /* ---------- utilidades por escena (kit) ---------- */
  function splitWords(el) {
    if (el.dataset.split) return el.querySelectorAll('.w');
    const walk = (node) => {
      [...node.childNodes].forEach(n => {
        if (n.nodeType === 3) {
          const parts = n.textContent.split(/(\s+)/);
          const frag = document.createDocumentFragment();
          parts.forEach(s => {
            if (!s) return;
            if (/^\s+$/.test(s)) { frag.appendChild(document.createTextNode(' ')); return; }
            const sp = document.createElement('span'); sp.className = 'w'; sp.textContent = s; frag.appendChild(sp);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && !n.classList.contains('w')) walk(n);
      });
    };
    walk(el); el.dataset.split = '1';
    return el.querySelectorAll('.w');
  }

  function kit(el, sc) {
    const k = { el, sc, RM, fx: [], amb: [] };
    k.q = (sel) => (typeof sel === 'string' ? [...el.querySelectorAll(sel)] : Array.isArray(sel) ? sel.flatMap(s => typeof s === 'string' ? [...el.querySelectorAll(s)] : [s]) : [sel]);
    k.$ = (sel) => (typeof sel === 'string' ? el.querySelector(sel) : sel);
    k.set = (sel, v) => gsap.set(k.q(sel), v);
    /* revela: opacidad + desenfoque que se enfoca (rack focus tipográfico) */
    k.in = (sel, at = 0, o = {}) => {
      const t = k.q(sel); if (!t.length) return;
      const d = RM ? .5 : (o.d ?? 1.3);
      const from = { autoAlpha: 0 }, to = { autoAlpha: 1, duration: d, ease: o.ease || 'power2.out', stagger: o.st || 0 };
      if (!RM) {
        from.y = o.y ?? 22; to.y = 0;
        if (o.x != null) { from.x = o.x; to.x = 0; }
        if (o.blur !== 0) { from.filter = `blur(${o.blur ?? 10}px)`; to.filter = 'blur(0px)'; to.clearProps = 'filter'; }
        if (o.scale != null) { from.scale = o.scale; to.scale = 1; }
      }
      k.tl.fromTo(t, from, to, at);
    };
    k.out = (sel, at = 0, d = .8) => { const t = k.q(sel); if (t.length) k.tl.to(t, { autoAlpha: 0, duration: RM ? .3 : d, ease: 'power1.inOut' }, at); };
    k.to = (sel, v, at = 0) => { const t = k.q(sel); if (t.length) k.tl.to(t, RM && v.duration > .6 ? Object.assign({}, v, { duration: .5 }) : v, at); };
    k.fromTo = (sel, a, b, at = 0) => { const t = k.q(sel); if (t.length) k.tl.fromTo(t, a, RM && b.duration > .6 ? Object.assign({}, b, { duration: .5 }) : b, at); };
    /* palabras que aparecen una a una, como un susurro */
    k.words = (sel, at = 0, o = {}) => {
      const t = k.$(sel); if (!t) return;
      const ws = splitWords(t);
      k.tl.set(t, { autoAlpha: 1 }, at);
      k.tl.fromTo(ws, RM ? { opacity: 0 } : { opacity: 0, y: 14, filter: 'blur(8px)' },
        Object.assign({ opacity: 1, duration: RM ? .3 : (o.d ?? .9), ease: 'power2.out', stagger: RM ? .01 : (o.st ?? .085) }, RM ? {} : { y: 0, filter: 'blur(0px)', clearProps: 'filter' }), at);
    };
    /* trazo SVG que se dibuja */
    k.draw = (sel, at = 0, d = 1.4, ease = 'power2.inOut') => {
      k.q(sel).forEach((p, i) => {
        const len = p.getTotalLength ? Math.ceil(p.getTotalLength()) + 2 : 1000;
        k.tl.fromTo(p, { strokeDasharray: len, strokeDashoffset: len, autoAlpha: 1 }, { strokeDashoffset: 0, duration: RM ? .3 : d, ease }, at + i * .12);
      });
    };
    /* cámara: lleva el punto (px,py) de la pintura (coords 1920×1080) al punto (sx,sy) de pantalla con escala s */
    k.camVars = (s, px, py, sx = 960, sy = 540) => {
      let x = sx - px * s, y = sy - py * s;
      x = Math.min(0, Math.max(W - W * s, x)); y = Math.min(0, Math.max(H - H * s, y));
      return { scale: s, x, y };
    };
    k.cam = (sel, s, px, py, o = {}, at = 0) => {
      const v = k.camVars(s, px, py, o.sx, o.sy);
      k.ctl.to(k.q(sel), Object.assign(v, { duration: RM ? 0 : (o.d ?? 7), ease: o.ease || 'sine.inOut', overwrite: 'auto' }), at);
    };
    k.camSet = (sel, s, px, py, o = {}) => gsap.set(k.q(sel), k.camVars(s, px, py, o.sx, o.sy));
    /* efectos ambientales: se destruyen al salir de la escena */
    k.particles = (sel, type, o) => { const c = k.$(sel); if (!c || RM && type !== 'stars') return { p: {} }; const s = makeParticles(c, type, o); k.fx.push(s); return s; };
    k.drift = (sel, amt = 1) => {
      if (RM) return; const t = k.q(sel); if (!t.length) return;
      k.amb.push(gsap.to(t, { scale: 1 + .022 * amt, x: 10 * amt, y: -6 * amt, duration: 16, ease: 'sine.inOut', yoyo: true, repeat: -1 }));
    };
    k.flicker = (sel, lo = .82, hi = 1) => {
      if (RM) return; const t = k.q(sel); if (!t.length) return;
      const tw = () => gsap.to(t, { opacity: lo + Math.random() * (hi - lo), duration: .08 + Math.random() * .22, ease: 'none', onComplete: () => { if (k.alive) tw(); } });
      k.alive = true; k.amb.push({ kill: () => { k.alive = false; gsap.killTweensOf(t, 'opacity'); } }); tw();
    };
    return k;
  }

  /* ---------- montaje ---------- */
  function mount(i) {
    const sc = S[i];
    const el = document.createElement('section');
    el.className = 'scene s-' + sc.id; el.dataset.scene = i;
    el.innerHTML = sc.html;
    scenesEl.appendChild(el);
    const k = kit(el, sc);
    k.tl = gsap.timeline({ paused: true }); k.ctl = gsap.timeline({ paused: true });
    if (sc.init) sc.init(k);
    if (sc.ambient) sc.ambient(k);
    el._k = k;
    return { el, k };
  }
  function unmount(el) {
    if (!el || !el.parentNode) return;
    const k = el._k;
    if (k) { k.fx.forEach(s => systems.delete(s)); k.amb.forEach(a => a.kill && a.kill()); k.alive = false; }
    gsap.killTweensOf(el.querySelectorAll('*')); gsap.killTweensOf(el);
    el.remove();
  }

  /* ---------- navegación ---------- */
  const flat = []; S.forEach((sc, i) => sc.beats.forEach((_, b) => flat.push([i, b])));
  const total = flat.length;
  const cur = { i: -1, b: -1, el: null, k: null, tl: null, ctl: null };
  const idx = (i, b) => flat.findIndex(f => f[0] === i && f[1] === b);

  function runBeat(k, b, instant) {
    const tl = gsap.timeline({ paused: true }), ctl = gsap.timeline({ paused: true });
    k.tl = tl; k.ctl = ctl;
    S[k.el.dataset.scene].beats[b](k);
    if (instant) { tl.progress(1); ctl.progress(1); tl.kill(); ctl.kill(); return { tl: null, ctl: null }; }
    if (RM) tl.timeScale(2.5);
    return { tl, ctl };
  }
  function killCur() {
    if (cur.tl) { cur.tl.progress(1); cur.tl.kill(); }
    if (cur.ctl) cur.ctl.kill();
    cur.tl = cur.ctl = null;
  }
  function playNextBeat(b) {
    if (cur.ctl) { /* la cámara anterior sigue; la nueva la sobrescribe con overwrite:auto */ }
    const r = runBeat(cur.k, b, false);
    cur.b = b; cur.tl = r.tl; cur.ctl = r.ctl;
    r.tl.play(); r.ctl.play();
    update();
  }
  function enterScene(i) {
    const old = cur.el;
    if (cur.tl) { cur.tl.progress(1); cur.tl.kill(); }
    const { el, k } = mount(i);
    gsap.set(el, { autoAlpha: 0 });
    const tr = gsap.timeline({ paused: true });
    const off = RM ? .3 : (S[i].enter ?? 1.1);
    if (old) {
      if (old._k && old._k.ctl) { /* congelar su cámara */ }
      tr.to(old, { autoAlpha: 0, duration: RM ? .4 : 1.0, ease: 'power1.inOut', onComplete: () => unmount(old) }, 0);
    }
    tr.to(el, { autoAlpha: 1, duration: RM ? .4 : 1.3, ease: 'power1.inOut' }, old ? (RM ? .2 : .55) : 0);
    const r = runBeat(k, 0, false);
    tr.add(r.tl.play(), old ? off : .2);
    cur.i = i; cur.b = 0; cur.el = el; cur.k = k; cur.tl = tr; cur.ctl = r.ctl;
    r.ctl.play();
    tr.play();
    update();
  }
  function jump(i, b, fade = true) {
    killCur();
    [...scenesEl.children].forEach(unmount);
    const { el, k } = mount(i);
    for (let j = 0; j <= b; j++) runBeat(k, j, true);
    cur.i = i; cur.b = b; cur.el = el; cur.k = k;
    if (fade && !RM) gsap.fromTo(scenesEl, { autoAlpha: 0 }, { autoAlpha: 1, duration: .45, ease: 'power1.out' });
    else gsap.set(scenesEl, { autoAlpha: 1 });
    update();
  }
  function next() {
    if (cur.tl && cur.tl.isActive()) { cur.tl.progress(1); return; }
    const n = idx(cur.i, cur.b) + 1; if (n >= total) return;
    const [i, b] = flat[n];
    if (i === cur.i) playNextBeat(b); else enterScene(i);
  }
  function prev() {
    const n = idx(cur.i, cur.b) - 1; if (n < 0) return;
    const [i, b] = flat[n]; jump(i, b, true);
  }
  function go(i, b = 0) { i = Math.max(0, Math.min(S.length - 1, i)); b = Math.max(0, Math.min(S[i].beats.length - 1, b)); jump(i, b, false); }

  /* ---------- estado, hash, notas ---------- */
  const bc = ('BroadcastChannel' in window) ? new BroadcastChannel('confiar-02-a') : null;
  function update() {
    const n = idx(cur.i, cur.b);
    progress.style.width = ((n + 1) / total * 100).toFixed(2) + '%';
    const hash = `#${cur.i + 1}.${cur.b + 1}`;
    if (location.hash !== hash) history.replaceState(null, '', hash);
    const sc = S[cur.i];
    const nx = flat[n + 1] ? S[flat[n + 1][0]] : null;
    notesEl.innerHTML = `<h4>${cur.i + 1}/${S.length} · ${sc.title} — beat ${cur.b + 1}/${sc.beats.length}</h4>` +
      `<div class="nb">${sc.notes || ''}</div>` +
      (nx ? `<div class="nx">Siguiente: ${flat[n + 1][0] === cur.i ? 'beat ' + (flat[n + 1][1] + 1) : nx.title}</div>` : '');
    if (bc) bc.postMessage({ i: cur.i, b: cur.b, n, total, title: sc.title, notes: sc.notes, beats: sc.beats.length, scenes: S.length, next: nx && nx.title });
  }
  if (bc) bc.onmessage = (e) => { const m = e.data || {}; if (m.cmd === 'next') next(); if (m.cmd === 'prev') prev(); if (m.cmd === 'hello') update(); };

  function parseHash() {
    const h = decodeURIComponent(location.hash.replace(/^#/, ''));
    if (!h) return null;
    const [a, bb] = h.split('.');
    let i = /^\d+$/.test(a) ? parseInt(a, 10) - 1 : S.findIndex(s => s.id === a);
    if (i < 0 || i >= S.length) return null;
    const b = bb ? parseInt(bb, 10) - 1 : 0;
    return [i, isNaN(b) ? 0 : b];
  }
  addEventListener('hashchange', () => { const p = parseHash(); if (p && (p[0] !== cur.i || p[1] !== cur.b)) go(p[0], p[1]); });

  /* ---------- entrada ---------- */
  addEventListener('keydown', (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const key = e.key;
    if (['ArrowRight', 'PageDown', ' ', 'Enter', 'ArrowDown'].includes(key)) { e.preventDefault(); next(); }
    else if (['ArrowLeft', 'PageUp', 'Backspace', 'ArrowUp'].includes(key)) { e.preventDefault(); prev(); }
    else if (key === 'f' || key === 'F') { if (!document.fullscreenElement) document.documentElement.requestFullscreen?.(); else document.exitFullscreen?.(); }
    else if (key === 'n' || key === 'N') document.body.classList.toggle('notes');
    else if (key === 'p' || key === 'P') window.open('notes.html', 'notas-02a', 'width=980,height=720');
    else if (key === 'b' || key === 'B' || key === '.') document.body.classList.toggle('black');
    else if (key === 'Home') go(0, 0);
    else if (key === 'End') go(S.length - 1, S[S.length - 1].beats.length - 1);
  });
  addEventListener('click', (e) => { if (e.target.closest('#notes')) return; if (e.shiftKey) prev(); else next(); });
  addEventListener('contextmenu', (e) => { e.preventDefault(); prev(); });
  let idleT; const wake = () => { document.body.classList.remove('idle'); clearTimeout(idleT); idleT = setTimeout(() => document.body.classList.add('idle'), 1800); };
  addEventListener('mousemove', wake); wake();

  /* ---------- precarga ---------- */
  const srcs = new Set(); S.forEach(sc => (sc.html.match(/src="([^"]+)"/g) || []).forEach(m => srcs.add(m.slice(5, -1))));
  const loads = [...srcs].map(src => new Promise(res => { const im = new Image(); im.onload = () => (im.decode ? im.decode().catch(() => {}) : Promise.resolve()).then(res); im.onerror = res; im.src = src; }));
  const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
  Promise.race([Promise.all([...loads, fontsReady]), new Promise(r => setTimeout(r, 12000))]).then(() => {
    document.getElementById('loader').classList.add('done');
    const p = parseHash();
    if (p) go(p[0], p[1]); else enterScene(0);
    window.__deckReady = true;
  });

  window.DECK = { go, next, prev, total, scenes: S.length, beats: S.map(s => s.beats.length), ids: S.map(s => s.id), state: () => ({ i: cur.i, b: cur.b, active: !!(cur.tl && cur.tl.isActive()) }) };
})();
