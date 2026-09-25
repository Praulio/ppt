/* Escenas · Confiar sin controlar · Dirección A «Claroscuro cinematográfico»
   Coordenadas en px del escenario 1920×1080. Las pinturas cubren el escenario completo,
   así que un punto de la pintura se expresa en esas mismas coordenadas. */
(() => {
const IMG = (n) => `assets/img/${n}.jpg`;
const paint = (n, cls = '', pos = '') => `<div class="cam ${cls}"><div class="drift"><img class="paint" src="${IMG(n)}" style="${pos}" alt=""></div></div>`;
const obj = (n, cls, style) => `<img class="obj ${cls}" src="${IMG(n)}" style="${style}" alt="">`;
const T = (cls, style, html) => `<div class="abs rv ${cls}" style="${style}">${html}</div>`;
const K = (txt) => `<span class="sep"></span>${txt}`;
const DARK = (o = 0) => `<div class="fill dark" style="background:#000;opacity:${o}"></div>`;
const LB = `<div class="lb top"></div><div class="lb bot"></div>`;
const VIG = `<div class="fill vig"></div>`;
const SVG = (inner, cls = '') => `<svg class="abs ${cls}" style="left:0;top:0;overflow:visible" width="1920" height="1080" viewBox="0 0 1920 1080">${inner}</svg>`;
const GLOW = 'filter:drop-shadow(0 0 8px rgba(232,198,126,.8)) drop-shadow(0 0 22px rgba(232,198,126,.35))';

const S = [];

/* ============================ ACTO I · LA SOSPECHA ============================ */

/* 1 · Tormenta: el afán de control */
S.push({
  id: 'tormenta', title: 'Confiar sin controlar',
  notes: 'Hay algo profundamente humano en querer saber que todo va a salir bien. Buscamos una explicación, una práctica, una promesa que nos quite la incertidumbre. A veces llamo confianza a un intento más sofisticado de controlar mi vida. Recorreremos dos jardines y la historia de una joven que perdió hasta el consuelo de su fe. La tormenta es alegoría del afán de control. Dejar respirar la imagen.',
  html: paint('p01-tormenta') + `<canvas class="fx rain"></canvas><div class="fill shade-l sh" style="opacity:0"></div>` + DARK(1) +
    `<div class="fill flash"></div>` + VIG + LB +
    T('kicker k1', 'left:132px;top:214px', K('Encuentro · nº 02')) +
    T('h0 t1', 'left:122px;top:262px;width:980px', 'Confiar<br>sin controlar') +
    T('rule r1', 'left:132px;top:585px;width:560px', '') +
    T('tag s1', 'left:132px;top:612px;font-size:34px', 'Dos jardines y una noche de fe') +
    T('q md qq', 'left:132px;top:600px;width:860px', '¿Busco a Dios… o una manera espiritual de garantizar lo que deseo?') +
    T('body sm b3', 'left:132px;top:800px;width:900px', 'A veces llamo <b>«confianza»</b> a un intento más sofisticado de <b>controlar</b> mi vida.'),
  init(k) { k.camSet('.cam', 1.45, 1440, 470, { sx: 1300, sy: 520 }); },
  ambient(k) { k.rain = k.particles('.rain', 'rain', { n: 240, color: '215,225,238', alpha: 0, x0: -40, x1: 1000 }); k.drift('.drift'); },
  beats: [
    (k) => {
      k.to('.lb', { height: 118, duration: 1.8, ease: 'power2.inOut' }, 0);
      k.tl.to(k.rain.p, { alpha: 1, duration: 2.5 }, .3);
      k.fromTo('.flash', { opacity: 0 }, { opacity: .9, duration: .07, yoyo: true, repeat: 1, ease: 'none' }, .5);
      k.to('.dark', { opacity: .55, duration: .05 }, .5);
      k.fromTo('.flash', { opacity: 0 }, { opacity: .55, duration: .06, yoyo: true, repeat: 3, ease: 'none' }, 1.1);
      k.to('.dark', { opacity: 0, duration: 2.6, ease: 'power2.out' }, 1.15);
      k.to('.sh', { opacity: .75, duration: 3 }, 1.5);
      k.cam('.cam', 1.1, 1250, 520, { d: 13, sx: 1180 }, .4);
    },
    (k) => {
      k.in('.k1', 0, { y: 0 });
      k.in('.t1', .25, { d: 1.8, blur: 16, y: 30 });
      k.fromTo('.r1', { autoAlpha: 0, scaleX: 0 }, { autoAlpha: 1, scaleX: 1, duration: 1.6, ease: 'power3.inOut' }, 1.1);
      k.in('.s1', 1.6);
      k.to('.sh', { opacity: 1, duration: 2 }, 0);
    },
    (k) => {
      k.out('.s1', 0, .6);
      k.words('.qq', .5, { st: .07 });
      k.cam('.cam', 1.32, 1520, 500, { d: 9, sx: 1420 }, 0);
    },
    (k) => {
      k.to('.lb', { height: 0, duration: 1.6, ease: 'power2.inOut' }, 0);
      k.in('.b3', .4);
    }
  ]
});

/* 2 · Lo que todos queremos → la clave */
{
  const cx = [330, 750, 1170, 1590], wds = ['Salud', 'Amor', 'Seguridad', 'Sentido'];
  S.push({
    id: 'deseo', title: 'Una promesa atractiva',
    notes: 'La promesa seduce porque toca deseos legítimos: salud, amor, seguridad, sentido. No caricaturizar a quienes buscan respuestas. Aquí Rogelio puede compartir, en primera persona y breve, algo de su camino por el New Age. Punto de partida: la necesidad humana de no sentirse a merced de todo.',
    html: `<div class="fill" style="background:radial-gradient(ellipse at 50% 55%,#1c130c 0%,#0a0706 45%,#050407 75%)"></div><canvas class="fx dust"></canvas>` +
      T('kicker hk', 'left:0;right:0;top:120px;text-align:center', 'Lo que todos queremos') +
      cx.map((x, i) => `<div class="abs rv cd cd${i}" style="left:${x - 170}px;top:250px;width:340px;height:340px">${obj('o-vela', 'flame', 'left:0;top:0;width:340px;height:340px')}</div>` +
        T(`h2 wd wd${i}`, `left:${x - 210}px;top:600px;width:420px;text-align:center`, wds[i])).join('') +
      T('body l1', 'left:0;right:0;top:790px;text-align:center', 'Queremos saber que <b>todo va a salir bien.</b>') +
      T('body l2 dimt', 'left:0;right:0;top:860px;text-align:center', 'No sentirnos a merced de todo.') +
      `<div class="abs rv keyw" style="left:690px;top:90px;width:540px;height:540px">${obj('o-llave', '', 'left:0;top:0;width:540px;height:540px;-webkit-mask-image:none;mask-image:none')}</div>` +
      T('q md pq', 'left:260px;right:260px;top:650px;text-align:center', '«Si conozco la clave, quizá pueda asegurar mi vida.»') +
      T('tag pt', 'left:0;right:0;top:820px;text-align:center', 'La promesa, en paráfrasis'),
    ambient(k) { k.particles('.dust', 'dust', { n: 70, alpha: .7 }); k.flicker('.flame', .8, 1); },
    beats: [
      (k) => {
        k.in('.hk', 0, { y: 0 });
        cx.forEach((_, i) => { k.in(`.cd${i}`, .5 + i * .55, { y: 0, scale: .92, blur: 14, d: 1.6 }); k.in(`.wd${i}`, .8 + i * .55); });
      },
      (k) => { k.in('.l1', 0); k.in('.l2', .7); },
      (k) => {
        k.to(['.cd0', '.cd1', '.cd2', '.cd3'], { opacity: .16, y: -40, duration: 1.8, ease: 'power2.inOut' }, 0);
        k.to(['.wd0', '.wd1', '.wd2', '.wd3', '.hk', '.l1', '.l2'], { autoAlpha: 0, duration: .8 }, 0);
        k.fromTo('.keyw', { autoAlpha: 0, y: -160, rotation: -18, scale: .9 }, { autoAlpha: 1, y: 0, rotation: 0, scale: 1, duration: 2.6, ease: 'power3.out' }, .5);
        k.in('.pq', 1.8, { d: 1.6 });
        k.in('.pt', 2.6);
      }
    ]
  });
}

/* 3 · El primer jardín */
S.push({
  id: 'eden', title: 'El primer jardín',
  notes: 'En Génesis 3,1–6 la serpiente no empieza ofreciendo destrucción: pone en duda la palabra y las intenciones de Dios. El árbol parece deseable para alcanzar sabiduría. La frase susurrada es paráfrasis de esa insinuación, no texto bíblico. La tentación se vuelve poderosa cuando el don de Dios empieza a parecer una prohibición celosa.',
  html: paint('p02-eden') + `<canvas class="fx dust"></canvas><div class="fill shade-l sh"></div>` + DARK(0) + VIG +
    T('kicker k0', 'left:132px;top:190px', K('Acto I · La sospecha')) +
    T('h1 h', 'left:124px;top:236px;width:900px', 'El primer<br>jardín') +
    T('src g31s', 'left:132px;top:500px', 'Génesis 3,1–6') +
    T('q md g31', 'left:132px;top:300px;width:820px', '«¿Conque Dios os ha dicho que no comáis de ningún árbol del jardín?»') +
    T('src g31r', 'left:132px;top:525px', 'Génesis 3,1') +
    T('body sm g31b', 'left:132px;top:610px;width:800px', 'No empieza ofreciendo destrucción: <b>pone en duda la palabra y las intenciones de Dios.</b>') +
    T('q lg wh', 'left:132px;top:330px;width:800px', '¿Y si Dios te está ocultando algo bueno?') +
    T('tag wht', 'left:132px;top:590px;width:800px', 'Paráfrasis de la insinuación · no es texto bíblico') +
    T('h0 don warm', 'left:126px;top:300px;width:900px', 'el don') +
    T('h1 proh cold', 'left:126px;top:280px;width:860px', '¿una prohibición celosa?') +
    `<div class="abs sweep" style="left:-900px;top:0;width:900px;height:1080px;background:linear-gradient(90deg,rgba(0,0,0,0),rgba(0,0,0,.94) 40%,rgba(0,0,0,.94) 60%,rgba(0,0,0,0));-webkit-mask-image:linear-gradient(180deg,transparent 0,#000 22%,#000 70%,transparent 100%);mask-image:linear-gradient(180deg,transparent 0,#000 22%,#000 70%,transparent 100%);opacity:0"></div>` +
    T('body sm dnb', 'left:132px;top:640px;width:840px', 'La tentación se vuelve poderosa cuando el don de Dios empieza a parecer una <b>prohibición celosa.</b>'),
  init(k) { k.camSet('.cam', 1.3, 1100, 640, { sx: 1150, sy: 600 }); k.set('.paint', { filter: 'blur(18px)' }); },
  ambient(k) { k.particles('.dust', 'dust', { n: 80, alpha: .9, x0: 560, x1: 960, y0: 0, y1: 300 }); k.drift('.drift', .8); },
  beats: [
    (k) => {
      k.to('.paint', { filter: 'blur(0px)', duration: 3.2, ease: 'power2.inOut', clearProps: 'filter' }, .2);
      k.cam('.cam', 1.0, 960, 540, { d: 10 }, 0);
      k.in('.k0', 1.4, { y: 0 }); k.in('.h', 1.7, { d: 1.8, blur: 14 }); k.in('.g31s', 2.4);
    },
    (k) => {
      k.out(['.k0', '.h', '.g31s'], 0, .7);
      k.cam('.cam', 1.3, 1200, 420, { d: 8, sx: 1320, sy: 470 }, 0);
      k.words('.g31', .5, { st: .06 }); k.in('.g31r', 1.6); k.in('.g31b', 2.2);
    },
    (k) => {
      k.out(['.g31', '.g31r', '.g31b'], 0, .7);
      k.cam('.cam', 1.62, 1400, 420, { d: 9, sx: 1400, sy: 480 }, 0);
      k.to('.dark', { opacity: .18, duration: 3 }, 0);
      k.words('.wh', .6, { st: .16, d: 1.3 }); k.in('.wht', 2.4);
    },
    (k) => {
      k.out(['.wh', '.wht'], 0, .6);
      k.cam('.cam', 1.12, 1100, 500, { d: 8 }, 0);
      k.to('.dark', { opacity: .3, duration: 2 }, 0);
      k.in('.don', .5, { d: 1.2 });
      k.fromTo('.sweep', { x: 0 }, { x: 1500, duration: 2.6, ease: 'power1.inOut' }, 1.7);
      k.to('.sweep', { opacity: 1, duration: .6 }, 1.7); k.to('.sweep', { opacity: 0, duration: 1.0 }, 3.3);
      k.to('.don', { autoAlpha: 0, duration: .5 }, 2.3);
      k.fromTo('.proh', { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.2, ease: 'power1.out' }, 2.5);
      k.in('.dnb', 3.4);
    }
  ]
});

/* 4 · La grieta (Catecismo 397–398) */
S.push({
  id: 'grieta', title: 'La grieta',
  notes: 'El Catecismo 397–398 identifica el quiebre con una pérdida de confianza. El deseo de sabiduría no es malo en sí; la ruptura aparece cuando el ser humano intenta alcanzar su plenitud sin Dios, antes que Dios y no según Dios. Idea que debe quedar: el fruto viene después; la sospecha llegó primero. Cuando dejo de confiar en su bondad, busco asegurar mi bien por mi cuenta.',
  html: paint('p02-eden') + `<div class="fill shade-l"></div>` + DARK(.5) + VIG +
    T('kicker k', 'left:132px;top:190px', K('Catecismo de la Iglesia Católica, 397')) +
    T('q md cic', 'left:132px;top:240px;width:900px', '«El hombre, tentado por el diablo, <b>dejó morir en su corazón la confianza</b> hacia su creador»') +
    SVG(`<path class="rv crack" d="M130 520 L205 511 L262 531 L330 514 L400 528 L455 509 L540 526 L610 512 L672 531 L750 515 L820 527 L900 511 L965 526 L1040 516" fill="none" stroke="#e8c67e" stroke-width="3" style="${GLOW}"/>` +
      `<circle class="rv n1" cx="262" cy="531" r="15" fill="#e8c67e" style="${GLOW}"/><circle class="rv n2" cx="900" cy="511" r="13" fill="none" stroke="#bfae92" stroke-width="3"/>`) +
    T('kicker a1', 'left:200px;top:420px', 'primero') + T('h2 a2 warm', 'left:190px;top:562px', 'la sospecha') +
    T('kicker b1 dimt', 'left:840px;top:400px', 'después') + T('h2 b2 dimt', 'left:830px;top:545px', 'el fruto') +
    T('body cap', 'left:132px;top:760px;width:960px', 'El fruto vino después. <b>La sospecha llegó primero.</b>') +
    T('body sm w0', 'left:132px;top:200px;width:900px', 'Desear la sabiduría no es malo en sí. El quiebre fue quererla así:') +
    T('h1 w1', 'left:124px;top:330px', 'sin Dios,') + T('h1 w2', 'left:124px;top:460px', 'antes que Dios') + T('h1 w3 warm', 'left:124px;top:590px', 'y no según Dios.') +
    T('src ws', 'left:132px;top:760px;width:900px', 'Catecismo 398, citando a san Máximo el Confesor') +
    `<div class="abs rv fistw" style="left:1060px;top:170px;width:760px;height:760px">${obj('o-puno', '', 'left:0;top:0;width:760px;height:760px')}</div>` +
    T('body end', 'left:132px;top:360px;width:860px', 'Cuando dejo de confiar en su bondad, busco asegurar mi bien <b>por mi cuenta.</b>') +
    T('tag endt', 'left:132px;top:560px;width:820px', '«En adelante, todo pecado será una desobediencia a Dios y una falta de confianza en su bondad» (Catecismo 397).'),
  init(k) { k.camSet('.cam', 2.0, 1252, 462, { sx: 1450, sy: 520 }); },
  ambient(k) { k.drift('.drift', .6); },
  beats: [
    (k) => { k.cam('.cam', 2.2, 1252, 462, { d: 12, sx: 1450, sy: 520 }, 0); k.in('.k', .2, { y: 0 }); k.words('.cic', .6, { st: .07 }); },
    (k) => {
      k.out(['.k', '.cic'], 0, .6);
      k.to('.dark', { opacity: .62, duration: 1.5 }, 0);
      k.draw('.crack', .6, 1.8, 'power2.inOut');
      k.fromTo('.n1', { autoAlpha: 0, scale: 0, transformOrigin: '50% 50%' }, { autoAlpha: 1, scale: 1, duration: .6, ease: 'back.out(2)' }, .9);
      k.in(['.a1', '.a2'], 1.0, { st: .15 });
      k.fromTo('.n2', { autoAlpha: 0, scale: 0, transformOrigin: '50% 50%' }, { autoAlpha: 1, scale: 1, duration: .6, ease: 'back.out(2)' }, 2.0);
      k.in(['.b1', '.b2'], 2.1, { st: .15 });
      k.in('.cap', 3.0);
    },
    (k) => {
      k.out(['.crack', '.n1', '.n2', '.a1', '.a2', '.b1', '.b2', '.cap'], 0, .6);
      k.in('.w0', .4); k.in('.w1', 1.0, { d: 1.4 }); k.in('.w2', 1.8, { d: 1.4 }); k.in('.w3', 2.6, { d: 1.4 }); k.in('.ws', 3.4);
    },
    (k) => {
      k.out(['.w0', '.w1', '.w2', '.w3', '.ws'], 0, .6);
      k.to('.dark', { opacity: .86, duration: 1.8 }, 0);
      k.fromTo('.fistw', { autoAlpha: 0, scale: 1.08 }, { autoAlpha: 1, scale: 1, duration: 2.4, ease: 'power2.out' }, .6);
      k.in('.end', 1.0); k.in('.endt', 2.2);
    }
  ]
});

/* 5 · La historia al revés (relectura gnóstica) */
S.push({
  id: 'inversa', title: 'La historia al revés',
  notes: 'Algunos relatos antiguos toman ese mismo jardín y cambian la lectura de los personajes. En La hipóstasis de los arcontes la serpiente aparece como instructora. Ireneo, Contra las herejías I,30, describe doctrinas en que la serpiente ayuda a obtener un conocimiento que el creador inferior ocultaba. Ireneo es adversario de esos grupos: contrastarlo con el texto gnóstico mismo. No todo gnosticismo contó el jardín igual. El creador aparece como obstáculo en la interpretación, no como personaje en la pintura.',
  html: `<div class="fill la">${paint('p02-eden', 'ca')}</div><div class="fill lb2" style="opacity:0">${paint('p03-eden-inversa', 'cb')}</div>` +
    `<canvas class="fx dust"></canvas><div class="fill shade-r"></div>` + DARK(0) + VIG +
    T('kicker k', 'left:1000px;top:150px', K('Una relectura antigua')) +
    T('h1 h', 'left:994px;top:196px;width:860px', 'La historia<br>al revés') +
    `<div class="abs rv card c1" style="left:1000px;top:300px;width:800px"><span class="src">La hipóstasis de los arcontes · Nag Hammadi</span>` +
    `<div class="q sm">«la serpiente, la instructora»</div><div class="body sm" style="margin-top:10px">le dice a la mujer que la prohibición fue <b>«por celos»</b>.</div>` +
    `<div class="tag" style="margin-top:12px">Trad. libre de la versión inglesa de Bentley Layton</div></div>` +
    `<div class="abs rv card c2" style="left:1000px;top:640px;width:800px"><span class="src">Ireneo de Lyon · Contra las herejías I,30</span>` +
    `<div class="body sm">Describe grupos en que la serpiente ayuda a obtener un conocimiento que <b>el creador inferior ocultaba.</b></div>` +
    `<div class="tag" style="margin-top:12px">Ireneo escribe como adversario de esos grupos.</div></div>` +
    T('stamp st', 'left:1000px;top:960px;padding:12px 26px;font-size:30px', 'Ciertos textos gnósticos · no todo el gnosticismo'),
  init(k) { k.camSet('.ca', 1.05, 1300, 480); k.camSet('.cb', 1.12, 500, 480, { sx: 560 }); },
  ambient(k) { k.particles('.dust', 'dust', { n: 60, alpha: .8, x0: 150, x1: 700, y0: 100, y1: 450 }); k.drift('.drift', .6); },
  beats: [
    (k) => {
      /* travelling lateral: salimos del Edén por la derecha y entramos al mismo jardín visto al revés */
      k.fromTo('.la', { x: 0, opacity: 1 }, { x: 900, opacity: 0, duration: 3.2, ease: 'power2.inOut' }, .3);
      k.fromTo('.lb2', { x: -700, opacity: 0 }, { x: 0, opacity: 1, duration: 3.4, ease: 'power2.inOut' }, .5);
      k.cam('.cb', 1.0, 960, 540, { d: 10 }, 1.5);
      k.in('.k', 2.8, { y: 0 }); k.in('.h', 3.1, { d: 1.6, blur: 14 });
    },
    (k) => {
      k.to('.h', { autoAlpha: 0, duration: .5 }, 0); k.to('.k', { y: -40, duration: .8 }, 0);
      k.in('.c1', .3, { x: 30, y: 0 });
    },
    (k) => { k.in('.c2', 0, { x: 30, y: 0 }); },
    (k) => { k.to('.dark', { opacity: .15, duration: 1 }, 0); k.fromTo('.st', { autoAlpha: 0, scale: 1.25 }, { autoAlpha: 1, scale: 1, duration: .5, ease: 'power4.in' }, .2); }
  ]
});

/* 6 · Un mismo jardín, dos lecturas */
S.push({
  id: 'lecturas', title: 'Un mismo jardín, dos lecturas',
  notes: 'La diferencia es más profunda que una opinión sobre un animal. En Génesis, la sospecha sobre Dios abre el camino a la desobediencia. En esos otros textos, la sospecha recae sobre el creador y la transgresión puede parecer liberación. Se conserva la escena, pero cambia quién parece digno de confianza. ¿Necesito recibir mi vida de Dios o descubrir una clave que Él no me dio?',
  html: `<div class="abs pl" style="left:0;top:0;width:958px;height:1080px;overflow:hidden"><img class="paint" src="${IMG('p02-eden')}" style="object-position:68% 40%" alt=""></div>` +
    `<div class="abs pr" style="left:962px;top:0;width:958px;height:1080px;overflow:hidden"><img class="paint" src="${IMG('p03-eden-inversa')}" style="object-position:18% 40%" alt=""></div>` +
    `<div class="fill" style="background:linear-gradient(0deg,rgba(5,4,7,.97) 0%,rgba(5,4,7,.9) 36%,rgba(5,4,7,.25) 60%,rgba(5,4,7,0) 70%)"></div><div class="fill" style="background:linear-gradient(180deg,rgba(5,4,7,.9),rgba(5,4,7,0) 26%)"></div>` + DARK(0) +
    SVG(`<line class="rv seam" x1="960" y1="40" x2="960" y2="1040" stroke="#e8c67e" stroke-width="2" style="${GLOW}"/>`) +
    T('h2 hl warm', 'left:0;width:960px;top:70px;text-align:center', 'Génesis') +
    T('h2 hr cold', 'left:960px;width:960px;top:70px;text-align:center', 'Cierta relectura gnóstica') +
    [['La serpiente', 'siembra desconfianza', 'despierta conocimiento'],
     ['La sospecha', 'abre paso a la desobediencia', 'recae sobre el creador'],
     ['Comer del fruto', 'ruptura', 'parece liberación']].map((r, i) => {
      const y = 610 + i * 135;
      return T(`kicker rl rl${i}`, `left:660px;width:600px;top:${y}px;text-align:center`, `<span class="lbl">${r[0]}</span>`) +
        T(`body rv rx${i}`, `left:80px;width:800px;top:${y + 38}px;text-align:right;font-size:44px`, r[1]) +
        T(`body rv ry${i} cold`, `left:1040px;width:800px;top:${y + 38}px;font-size:44px`, r[2]);
    }).join('') +
    T('h2 fin', 'left:160px;right:160px;top:330px;text-align:center', 'Se conserva la escena.<br><b>Cambia quién parece digno de confianza.</b>') +
    `<div class="abs rv keyw" style="left:810px;top:120px;width:300px;height:300px">${obj('o-llave', '', 'left:0;top:0;width:300px;height:300px;-webkit-mask-image:none;mask-image:none')}</div>` +
    T('q md fq', 'left:200px;right:200px;top:470px;text-align:center', '¿Recibir mi vida de Dios… o descubrir una clave que Él no me dio?'),
  beats: [
    (k) => {
      k.fromTo('.pl', { x: -300, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 2, ease: 'power3.out' }, 0);
      k.fromTo('.pr', { x: 300, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 2, ease: 'power3.out' }, .15);
      k.draw('.seam', .8, 1.4); k.in('.hl', 1.2); k.in('.hr', 1.4);
    },
    (k) => { k.in('.rl0', 0); k.in('.rx0', .3, { x: -30, y: 0 }); k.in('.ry0', .7, { x: 30, y: 0 }); },
    (k) => { k.in('.rl1', 0); k.in('.rx1', .3, { x: -30, y: 0 }); k.in('.ry1', .7, { x: 30, y: 0 }); },
    (k) => { k.in('.rl2', 0); k.in('.rx2', .3, { x: -30, y: 0 }); k.in('.ry2', .7, { x: 30, y: 0 }); },
    (k) => {
      k.to('.dark', { opacity: .82, duration: 1.4 }, 0);
      k.out(['.rl', '.rx0', '.rx1', '.rx2', '.ry0', '.ry1', '.ry2', '.hl', '.hr', '.seam'], 0, .7);
      k.in('.fin', .8, { d: 1.6 });
    },
    (k) => {
      k.to('.fin', { autoAlpha: 0, duration: .6 }, 0);
      k.to('.dark', { opacity: .92, duration: 1 }, 0);
      k.fromTo('.keyw', { autoAlpha: 0, y: -80, rotation: -30 }, { autoAlpha: 1, y: 0, rotation: 0, duration: 2, ease: 'power3.out' }, .4);
      k.words('.fq', 1.0, { st: .07 });
    }
  ]
});

/* ============================ ACTO II · LA CLAVE ============================ */

/* 7 · Una promesa que cambia de idioma (travelling por una galería de bodegones) */
{
  const st = [
    ['o-codice', 'Siglos II–III', 'Gnosis', '«conocimiento oculto»', 'Salvarse al conocer un saber reservado a unos pocos.'],
    ['o-teosofia', '1875 · Nueva York', 'Teosofía', '«leyes espirituales»', 'Helena Blavatsky y Henry Olcott fundan la Sociedad Teosófica.'],
    ['o-nuevaera', 'Siglo XX', 'Nueva Era', '«conciencia y energía»', 'Un documento vaticano de 2003 describe sus raíces esotéricas y gnósticas.'],
    ['o-pantalla', '2006', 'The Secret', '«pensamientos que atraen»', 'Película y libro que popularizan la «ley de la atracción».']
  ];
  const lab = ['Gnosis', 'Teosofía · 1875', 'Nueva Era', 'The Secret · 2006'];
  S.push({
    id: 'idiomas', title: 'Una promesa que cambia de idioma',
    notes: 'No hay una única línea recta desde un manuscrito antiguo hasta una aplicación moderna; sí una familia de motivos que reaparece. El documento vaticano Jesucristo, portador del agua de la vida describe raíces esotéricas y gnósticas de la Nueva Era y menciona la teosofía de Helena Blavatsky, fundada con Henry Olcott en 1875. Cambia el vocabulario: sabiduría secreta, leyes del pensamiento, energía, despertar. Escuchar qué promete cada propuesta, no sólo qué palabras usa.',
    html: `<div class="fill" style="background:radial-gradient(ellipse at 70% 55%,#1a120c 0%,#070506 60%,#050407 100%)"></div>` +
      `<div class="abs haze" style="left:0;top:0;width:5000px;height:1080px">` +
      st.map((_, i) => `<div class="abs" style="left:${i * 960 + 350}px;top:120px;width:900px;height:900px;background:radial-gradient(closest-side,rgba(200,150,80,.10),rgba(200,150,80,0));"></div>`).join('') + `</div>` +
      `<div class="abs strip" style="left:0;top:0;width:7680px;height:1080px;transform-origin:0 0">` +
      st.map((s, i) => `<div class="abs sto sto${i}" style="left:${i * 1920 + 1000}px;top:190px;width:780px;height:780px">${obj(s[0], '', 'left:0;top:0;width:780px;height:780px')}</div>` +
        `<div class="abs rv cap cap${i}" style="left:${i * 1920 + 140}px;top:390px;width:820px">` +
        `<div class="kicker">${K(s[1])}</div><div class="h1" style="margin-top:14px">${s[2]}</div>` +
        `<div class="q sm warm" style="margin-top:8px">${s[3]}</div><div class="body sm" style="margin-top:22px;color:var(--dim)">${s[4]}</div></div>`).join('') +
      `</div>` +
      `<canvas class="fx dust"></canvas>` +
      T('kicker hk', 'left:140px;top:120px', K('Acto II · La clave')) +
      T('h2 hh', 'left:134px;top:165px;width:1300px', 'Una promesa que cambia de idioma') +
      `<div class="abs rv ov" style="left:0;top:0;width:1920px;height:1080px">` +
      st.map((s, i) => `<div class="abs" style="left:${150 + i * 420}px;top:330px;width:360px;height:360px">${obj(s[0], '', 'left:0;top:0;width:360px;height:360px')}</div>` +
        `<div class="abs h2" style="left:${120 + i * 420}px;top:690px;width:420px;text-align:center;font-size:52px">${lab[i]}</div>`).join('') +
      SVG(`<path d="M330 520 C 450 470, 610 470, 750 520 S 1050 570, 1170 520 S 1470 470, 1590 520" fill="none" stroke="#c89b4f" stroke-width="2" stroke-dasharray="4 14" opacity=".8"/>`) +
      `</div>` +
      T('body ovt', 'left:150px;right:150px;top:130px;text-align:center', 'No es una línea recta única: <b>es una familia de motivos que reaparece.</b>') +
      T('src ovs', 'left:0;right:0;top:810px;text-align:center', 'Cf. Pontificio Consejo de la Cultura y Pontificio Consejo para el Diálogo Interreligioso, <i>Jesucristo, portador del agua de la vida</i> (2003)') +
      T('q md ovq', 'left:150px;right:150px;top:880px;text-align:center', 'Cambia el vocabulario. Escucha qué promete, no sólo qué palabras usa.'),
    init(k) { k.set('.sto', { opacity: 0 }); },
    ambient(k) { k.particles('.dust', 'dust', { n: 60, alpha: .6 }); },
    beats: [
      (k) => {
        k.in('.hk', 0, { y: 0 }); k.in('.hh', .3, { d: 1.6 });
        k.fromTo('.sto0', { opacity: 0, scale: 1.06 }, { opacity: 1, scale: 1, duration: 2.4, ease: 'power2.out' }, .6);
        k.in('.cap0', 1.4);
      },
      ...[1, 2, 3].map((i) => (k) => {
        k.to('.hh', { autoAlpha: 0, duration: .5 }, 0);
        k.to(`.cap${i - 1}`, { autoAlpha: 0, duration: .6 }, 0);
        k.to('.strip', { x: -1920 * i, duration: 2.6, ease: 'power3.inOut' }, 0);
        k.to('.haze', { x: -960 * i, duration: 2.6, ease: 'power3.inOut' }, 0);
        k.fromTo(`.sto${i}`, { opacity: 0 }, { opacity: 1, duration: 1.6 }, .6);
        k.in(`.cap${i}`, 1.8);
      }),
      (k) => {
        k.to(['.cap3', '.hk'], { autoAlpha: 0, duration: .5 }, 0);
        k.to('.strip', { scale: .25, x: 0, y: 405, opacity: 0, duration: 2.4, ease: 'power3.inOut' }, 0);
        k.to('.haze', { opacity: 0, duration: 1 }, 0);
        k.fromTo('.ov', { autoAlpha: 0, scale: 1.12, transformOrigin: '50% 50%' }, { autoAlpha: 1, scale: 1, duration: 2, ease: 'power2.out' }, 1.0);
        k.in('.ovt', 2.2); k.in('.ovs', 2.8);
      },
      (k) => { k.in('.ovq', 0); }
    ]
  });
}

/* 8 · La receta espiritual */
S.push({
  id: 'receta', title: 'La promesa actual',
  notes: 'A veces la búsqueda espiritual adopta la forma de un procedimiento: si conozco suficiente y practico correctamente, podré influir en el desenlace. No describe toda meditación ni toda búsqueda de bienestar: hablo de propuestas que atribuyen al estado interior una capacidad para atraer o producir acontecimientos externos. ¿Estoy escuchando a Alguien o aplicando una técnica para conseguir algo?',
  html: paint('p04-puerta') + `<canvas class="fx dust"></canvas><div class="fill glow" style="opacity:0;mix-blend-mode:screen;background:radial-gradient(circle at 1649px 495px,rgba(255,210,130,.75),rgba(255,190,110,.25) 12%,rgba(255,180,100,0) 32%),linear-gradient(90deg,rgba(0,0,0,0) 62%,rgba(255,196,120,.18) 66%,rgba(0,0,0,0) 94%)"></div>` +
    `<div class="fill shade-l"></div>` + DARK(0) + VIG +
    T('kicker k', 'left:132px;top:150px', K('La promesa actual · en paráfrasis')) +
    T('h1 h', 'left:124px;top:196px;width:1000px', 'La receta espiritual') +
    [['I', 'Aprende la clave'], ['II', 'Practica'], ['III', 'Obtén el futuro deseado']].map((s, i) =>
      `<div class="abs rv stp stp${i}" style="left:132px;top:${395 + i * 165}px;width:980px;display:flex;align-items:baseline;gap:28px">` +
      `<span style="font:600 88px/1 var(--serif-d);color:var(--ochre);width:130px;text-align:right">${s[0]}</span><span class="h2" style="font-size:76px">${s[1]}</span></div>`).join('') +
    SVG(`<path class="rv ar ar0" d="M198 505 L198 548" stroke="#c89b4f" stroke-width="2" fill="none"/><path class="rv ar ar1" d="M198 670 L198 713" stroke="#c89b4f" stroke-width="2" fill="none"/>`) +
    `<div class="abs rv keyw" style="left:790px;top:300px;width:300px;height:300px">${obj('o-llave', '', 'left:0;top:0;width:300px;height:300px;-webkit-mask-image:none;mask-image:none')}</div>` +
    `<div class="abs rv card cav" style="left:132px;top:858px;width:1060px"><div class="body sm">No describe toda meditación ni toda búsqueda de bienestar. Hablo de propuestas que atribuyen al estado interior <b>el poder de atraer o producir acontecimientos externos.</b></div></div>` +
    T('q lg fq', 'left:132px;top:340px;width:1000px', '¿Escucho a <b>Alguien</b>…<br>o aplico una técnica<br>para conseguir <span class="cold">algo</span>?'),
  init(k) { k.camSet('.cam', 1.15, 1500, 520, { sx: 1560 }); },
  ambient(k) { k.particles('.dust', 'dust', { n: 90, alpha: .9, x0: 560, x1: 900, y0: 150, y1: 420 }); k.drift('.drift', .5); },
  beats: [
    (k) => {
      k.cam('.cam', 1.0, 960, 540, { d: 10 }, 0);
      k.in('.k', .6, { y: 0 }); k.in('.h', .9, { d: 1.6 });
      k.in('.stp0', 1.8, { x: -20, y: 0 });
      k.fromTo('.keyw', { autoAlpha: 0, rotation: -40, scale: .8 }, { autoAlpha: 1, rotation: -10, scale: 1, duration: 2, ease: 'power3.out' }, 2.0);
    },
    (k) => {
      k.draw('.ar0', 0, .6); k.in('.stp1', .3, { x: -20, y: 0 });
      k.to('.keyw', { x: 1649 - 940, y: 495 - 450, rotation: 90, scale: .32, duration: 2.6, ease: 'power2.inOut' }, .6);
      k.to('.keyw', { autoAlpha: 0, duration: .5 }, 3.0);
    },
    (k) => {
      k.draw('.ar1', 0, .6); k.in('.stp2', .3, { x: -20, y: 0 });
      k.to('.glow', { opacity: 1, duration: 2.4, ease: 'power2.in' }, .6);
      k.cam('.cam', 1.18, 1560, 500, { d: 6, sx: 1500 }, .4);
    },
    (k) => {
      k.to(['.stp0', '.stp1', '.stp2', '.ar0', '.ar1'], { opacity: .3, duration: 1 }, 0);
      k.in('.cav', .4, { y: 20 });
    },
    (k) => {
      k.out(['.k', '.h', '.stp0', '.stp1', '.stp2', '.ar0', '.ar1', '.cav'], 0, .7);
      k.to('.glow', { opacity: .35, duration: 2 }, 0); k.to('.dark', { opacity: .35, duration: 2 }, 0);
      k.words('.fq', .7, { st: .09 });
    }
  ]
});

/* 9 · The Secret */
S.push({
  id: 'secret', title: 'The Secret',
  notes: 'La página oficial de The Secret sostiene que el pensamiento atrae lo semejante: objetos, personas, experiencias. No se limita a decir que pensar distinto cambia nuestras decisiones; propone una relación entre pensamiento y circunstancias externas. Por qué atrae a quien teme por dinero, enfermedad o futuro. Y la presión posible: si cada temor puede atraerse, hay que vigilarlo. Consecuencia posible, no experiencia de todos sus lectores. La pintura es alegoría, no una práctica del libro.',
  html: paint('p05-espejo') + `<div class="abs flood" style="left:0;right:0;bottom:0;height:0;background:linear-gradient(0deg,rgba(6,12,18,.92),rgba(8,16,24,.55) 70%,rgba(8,16,24,0))"></div><div class="fill shade-l"></div>` + DARK(0) + VIG +
    T('kicker k', 'left:132px;top:140px', K('The Secret · 2006')) +
    T('h1 h', 'left:124px;top:186px;width:900px', 'La promesa<br>de atraer') +
    T('tag ht', 'left:132px;top:430px;width:760px', 'Alegoría pintada · no es una práctica descrita por el libro') +
    T('src s1', 'left:132px;top:260px', 'Página oficial de The Secret') +
    T('q lg q1', 'left:132px;top:302px;width:860px', '«Lo que piensas, lo atraes.»') +
    T('tag t1', 'left:132px;top:410px;width:800px', 'Trad. libre de «What you think about, you bring about.»') +
    T('body sm b1', 'left:132px;top:500px;width:820px', 'Según esa página, el pensamiento «irradia» y <b>atrae pensamientos, objetos e incluso personas semejantes.</b>') +
    T('src d0', 'left:132px;top:270px', 'No se limita a decir esto:') +
    T('body d1 dimt', 'left:132px;top:315px', 'pensar distinto') + T('body d2 dimt', 'left:560px;top:315px', 'cambia mis decisiones') +
    T('src d3', 'left:132px;top:470px', 'Propone esto:') +
    T('body d4 warm', 'left:132px;top:515px', 'mi pensamiento') + T('body d5 warm', 'left:560px;top:515px;width:460px', 'atrae circunstancias externas') +
    SVG(`<path class="rv da" d="M430 345 L535 345 M520 335 L535 345 L520 355" stroke="#bfae92" stroke-width="2.5" fill="none"/>` +
      `<path class="rv db" d="M450 545 L535 545 M518 533 L535 545 L518 557" stroke="#e8c67e" stroke-width="3" fill="none" style="${GLOW}"/>`) +
    T('body f1', 'left:132px;top:270px;width:860px', 'Atrae a quien teme por <b>el dinero, la salud o el futuro.</b>') +
    T('body f2', 'left:132px;top:430px;width:860px', 'Pero si cada temor puede «atraerse», <b>cada temor habrá que vigilarlo.</b>') +
    T('tag f3', 'left:132px;top:610px;width:800px', 'Una consecuencia posible · no la experiencia de todos sus lectores'),
  init(k) { k.camSet('.cam', 1.25, 1250, 460, { sx: 1300 }); },
  ambient(k) { k.drift('.drift', .6); },
  beats: [
    (k) => { k.cam('.cam', 1.05, 1100, 540, { d: 11 }, 0); k.in('.k', .5, { y: 0 }); k.in('.h', .8, { d: 1.6 }); k.in('.ht', 1.8); },
    (k) => { k.out(['.ht', '.h'], 0, .5); k.in('.s1', .3); k.words('.q1', .5, { st: .12 }); k.in('.t1', 1.6); k.in('.b1', 2.2); },
    (k) => {
      k.out(['.s1', '.q1', '.t1', '.b1'], 0, .6);
      k.in('.d0', .5); k.in('.d1', .8); k.draw('.da', 1.2, .6); k.in('.d2', 1.5);
      k.in('.d3', 2.3); k.in('.d4', 2.6); k.draw('.db', 3.0, .6); k.in('.d5', 3.3);
    },
    (k) => {
      k.out(['.d0', '.d1', '.d2', '.d3', '.d4', '.d5', '.da', '.db'], 0, .6);
      k.to('.flood', { height: 560, duration: 5, ease: 'power1.inOut' }, 0);
      k.cam('.cam', 1.12, 1200, 600, { d: 8 }, 0);
      k.in('.f1', .6); k.in('.f2', 1.8); k.in('.f3', 2.8);
    }
  ]
});

/* 10 · Tres lenguajes de una búsqueda */
{
  const cols = [
    ['Rhonda Byrne · <i>The Secret</i>', 'Atracción', 'El pensamiento atrae lo semejante: objetos e incluso personas.'],
    ['Joe Dispenza · <i>Deja de ser tú</i>', 'Intención y emoción', 'Su editorial habla de crear la realidad que uno elige, con lenguaje de física cuántica y neurociencia.'],
    ['Conny Méndez · <i>Metafísica 4 en 1</i>', 'Leyes mentales', 'Leyes mentales y espirituales, con vocabulario cristiano reinterpretado.']
  ];
  S.push({
    id: 'lenguajes', title: 'Tres lenguajes de una búsqueda',
    notes: 'La editorial de Deja de ser tú presenta la idea de crear una realidad elegida combinando física cuántica, neurociencia y cambio personal: una propuesta editorial, no una demostración científica. La tradición de Conny Méndez, Metafísica 4 en 1, emplea leyes mentales y vocabulario religioso. No son autores idénticos. La pregunta que los pone en diálogo: ¿qué espero que produzca mi práctica interior?',
    html: `<div class="fill" style="background:radial-gradient(ellipse at 50% 30%,#1b130c 0%,#080607 55%,#050407 100%)"></div><canvas class="fx dust"></canvas>` +
      T('kicker hk', 'left:150px;top:86px', K('Tres lenguajes de una búsqueda')) +
      T('tag ht', 'left:150px;top:128px', 'Lo que sus autores proponen · no mecanismos comprobados') +
      cols.map((c, i) => {
        const x = 110 + i * 580;
        return `<div class="abs rv fl fl${i}" style="left:${x + 170}px;top:170px;width:200px;height:200px">${obj('o-vela', 'flame', 'left:0;top:0;width:200px;height:200px')}</div>` +
          `<div class="abs rv col col${i}" style="left:${x}px;top:380px;width:540px;text-align:center">` +
          `<div class="src" style="font-size:28px">${c[0]}</div><div class="h2" style="font-size:62px;margin:14px 0 18px">${c[1]}</div>` +
          `<div class="body sm" style="font-size:35px;color:#e2d5bd">${c[2]}</div></div>`;
      }).join('') +
      T('body sm bq', 'left:0;right:0;top:810px;text-align:center;color:var(--dim)', 'No son autores idénticos. La pregunta que los reúne aquí:') +
      T('q md bq2', 'left:150px;right:150px;top:870px;text-align:center', '¿Qué espero que produzca mi práctica interior?'),
    ambient(k) { k.particles('.dust', 'dust', { n: 50, alpha: .5 }); k.flicker('.flame', .78, 1); },
    beats: [
      (k) => { k.in('.hk', 0, { y: 0 }); k.in('.ht', .5); },
      ...[0, 1, 2].map((i) => (k) => {
        if (i) k.to(`.col${i - 1}`, { opacity: .55, duration: .8 }, 0);
        k.fromTo(`.fl${i}`, { autoAlpha: 0, scale: .6 }, { autoAlpha: 1, scale: 1, duration: 1.2, ease: 'power2.out' }, 0);
        k.in(`.col${i}`, .5);
      }),
      (k) => { k.to(['.col0', '.col1', '.col2'], { opacity: .45, duration: .8 }, 0); k.in('.bq', .3); k.words('.bq2', .9); }
    ]
  });
}

/* 11 · También dicen «suelta» */
S.push({
  id: 'suelta', title: 'También dicen «suelta»',
  notes: 'La parte más sutil. En The Balance Between Intention and Surrender, Dispenza propone una intención clara, una emoción elevada y luego entregar el «cómo». Habla de confiar y de no forzar los medios. Sería una mala comparación decir «ellos controlan, nosotros soltamos». La pregunta precisa: cuando suelto el método, ¿también entrego el desenlace, o la práctica sigue orientada a que ocurra el futuro que imaginé? La escena es interpretación visual, no ilustración literal de Dispenza.',
  html: paint('p04-puerta') + `<div class="fill glow" style="opacity:.55;mix-blend-mode:screen;background:radial-gradient(circle at 1649px 495px,rgba(255,210,130,.7),rgba(255,190,110,.2) 12%,rgba(255,180,100,0) 30%)"></div>` +
    `<div class="fill shade-l"></div>` + DARK(.15) + VIG +
    `<div class="abs rv hand" style="left:40px;top:560px;width:560px;height:560px">${obj('o-mano-abierta', '', 'left:0;top:0;width:560px;height:560px')}</div>` +
    SVG(`<path class="rv thread" d="M330 800 C 620 900, 900 700, 1180 600 S 1560 505, 1646 497" fill="none" stroke="#c9412b" stroke-width="4" stroke-linecap="round" style="filter:drop-shadow(0 0 6px rgba(220,70,40,.9)) drop-shadow(0 0 18px rgba(220,70,40,.4))"/>`) +
    T('kicker k', 'left:132px;top:130px;width:1300px', K('Joe Dispenza · blog oficial')) +
    T('h1 h', 'left:124px;top:176px;width:1400px;font-size:96px', 'También dicen «suelta»') +
    T('body f1', 'left:132px;top:330px;width:1300px', 'Intención clara + emoción elevada → <b>«entregar el cómo»</b>') +
    T('tag f1t', 'left:132px;top:400px;width:1000px', '«The Balance Between Intention and Surrender» · trad. libre de «we surrender the how»') +
    T('body sm f2', 'left:132px;top:330px;width:940px', 'Habla de confiar y de no forzar, controlar ni manipular los resultados.') +
    T('body sm f3', 'left:132px;top:440px;width:940px', 'Por eso no basta decir: <b>«ellos controlan, nosotros soltamos».</b>') +
    T('body l1', 'left:132px;top:420px;width:620px', 'Suelto:<br><b>el cómo</b>') +
    T('body l2', 'left:1000px;top:250px;width:640px;text-align:right', 'Conservo:<br><b>el resultado imaginado</b>') +
    T('tag l3', 'left:1000px;top:385px;width:640px;text-align:right', 'Interpretación visual de la tensión') +
    T('q md fq', 'left:132px;top:200px;width:1000px', 'Cuando suelto el método,<br>¿entrego también <b>el desenlace</b>?'),
  init(k) { k.camSet('.cam', 1.0, 960, 540); },
  ambient(k) { k.drift('.drift', .5); },
  beats: [
    (k) => { k.in('.k', .3, { y: 0 }); k.in('.h', .6, { d: 1.6 }); k.in('.f1', 1.6); k.in('.f1t', 2.2); k.in('.hand', .8, { y: 40, d: 2 }); },
    (k) => { k.out(['.f1', '.f1t'], 0, .5); k.in('.f2', .4); k.in('.f3', 1.2); },
    (k) => {
      k.out(['.k', '.h', '.f2', '.f3'], 0, .6);
      k.draw('.thread', .6, 2.8, 'power1.inOut');
      k.in('.l1', 1.0); k.in('.l2', 3.0); k.in('.l3', 3.6);
      k.to('.glow', { opacity: 1, duration: 2 }, 2.6);
    },
    (k) => { k.out(['.l1', '.l2', '.l3'], 0, .6); k.to('.dark', { opacity: .3, duration: 1.2 }, 0); k.words('.fq', .6, { st: .09 }); }
  ]
});

/* 12 · ¿Qué entrego realmente? */
S.push({
  id: 'entrego', title: '¿Qué entrego realmente?',
  notes: 'Puedo dejar de controlar los detalles y seguir convencido de que mi vida espiritual debe producir un resultado específico. Vale examinarlo en nosotros, aunque nunca hayamos leído The Secret. La oración cristiana también puede deformarse en un trato implícito: «haré todo correctamente y entonces Dios me dará lo que pido». Llevemos esa pregunta al segundo jardín.',
  html: `<div class="fill" style="background:radial-gradient(ellipse at 70% 50%,#1b120b 0%,#070506 55%,#050407 100%)"></div>` +
    `<div class="fill moon" style="opacity:0;background:radial-gradient(ellipse at 50% 30%,rgba(120,150,180,.22),rgba(40,55,75,.08) 45%,rgba(0,0,0,0) 70%)"></div>` +
    `<div class="abs rv fistw" style="left:1080px;top:190px;width:740px;height:740px">${obj('o-puno', '', 'left:0;top:0;width:740px;height:740px')}</div>` +
    T('h1 h', 'left:124px;top:150px;width:1000px', '¿Qué entrego<br>realmente?') +
    T('h2 lc cold', 'left:720px;top:470px;width:420px;text-align:right;font-size:72px', 'el cómo') +
    T('h2 ld warm', 'left:640px;top:600px;width:500px;text-align:right;font-size:72px', 'el desenlace') +
    T('q md qa', 'left:132px;top:790px;width:1100px', '¿Mi futuro… o sólo la manera de conseguirlo?') +
    T('body sm p0', 'left:132px;top:420px;width:900px', 'También la oración puede volverse un trato:') +
    T('q md p1', 'left:132px;top:490px;width:920px', '«Haré todo correctamente y entonces Dios me dará lo que pido.»') +
    T('tag p2', 'left:132px;top:720px;width:900px', 'Una deformación posible, en paráfrasis') +
    T('q md tr', 'left:0;right:0;top:470px;text-align:center', 'Llevemos esa pregunta al <b>segundo jardín.</b>'),
  beats: [
    (k) => {
      k.fromTo('.fistw', { autoAlpha: 0, scale: 1.1 }, { autoAlpha: 1, scale: 1, duration: 2.2, ease: 'power2.out' }, 0);
      k.in('.h', .5, { d: 1.6 }); k.in('.lc', 1.6, { x: -20, y: 0 }); k.in('.ld', 2.0, { x: -20, y: 0 });
    },
    (k) => {
      k.to('.lc', { y: -300, x: 60, autoAlpha: 0, filter: 'blur(10px)', duration: 3.2, ease: 'power1.in' }, 0);
      k.to('.fistw', { scale: .97, duration: .6, ease: 'power2.in' }, 1.0);
      k.to('.ld', { textShadow: '0 0 30px rgba(232,198,126,.7)', duration: 1 }, 1.2);
      k.words('.qa', 1.6, { st: .08 });
    },
    (k) => {
      k.out(['.lc', '.ld', '.qa', '.h'], 0, .6);
      k.to('.fistw', { opacity: .35, duration: 1.2 }, 0);
      k.in('.p0', .5); k.words('.p1', 1.0, { st: .07 }); k.in('.p2', 2.4);
    },
    (k) => {
      k.out(['.p0', '.p1', '.p2', '.fistw'], 0, .8);
      k.to('.moon', { opacity: 1, duration: 2.5 }, .4);
      k.in('.tr', 1.0, { d: 1.8 });
    }
  ]
});

/* ============================ ACTO III · EL SEGUNDO JARDÍN ============================ */

/* 13 · Getsemaní */
S.push({
  id: 'getsemani', title: 'El segundo jardín',
  notes: 'En Marcos 14,32–42 Jesús no es alguien imperturbable. Pide compañía. Siente pavor y angustia. Ruega que pase la hora. La pintura muestra una soledad concreta: sus amigos no logran mantenerse despiertos. Aquí la confianza empieza dentro del miedo, no después de haberlo eliminado.',
  html: paint('p07-getsemani') + `<div class="fill ml" style="opacity:0;mix-blend-mode:screen;background:radial-gradient(ellipse 640px 320px at 380px 760px,rgba(160,190,230,.5),rgba(0,0,0,0))"></div><canvas class="fx dust"></canvas><div class="fill shade-l sh" style="opacity:.8"></div><div class="fill shade-t"></div>` + DARK(.05) + VIG + LB +
    T('kicker k', 'left:132px;top:170px', K('Acto III · Marcos 14,32–42')) +
    T('h1 h', 'left:124px;top:216px;width:1000px', 'El segundo jardín') +
    T('q md v1', 'left:132px;top:380px;width:860px', '«Quedaos aquí y velad»') +
    T('src v1s', 'left:132px;top:460px', 'Marcos 14,34') +
    T('body sm v1b', 'left:132px;top:530px;width:760px', 'Pide compañía. <b>Sus amigos no logran mantenerse despiertos.</b>') +
    T('q md v2', 'left:132px;top:360px;width:820px', '«…empezó a sentir espanto y angustia»') +
    T('src v2s', 'left:132px;top:520px', 'Marcos 14,33') +
    T('q md v3', 'left:132px;top:590px;width:820px', '«Mi alma está triste hasta la muerte»') +
    T('src v3s', 'left:132px;top:675px', 'Marcos 14,34') +
    T('body v4', 'left:132px;top:360px;width:860px', 'Aquí la confianza empieza <b>dentro del miedo</b>, no después de haberlo eliminado.'),
  init(k) { k.camSet('.cam', 1.4, 700, 520, { sx: 820, sy: 560 }); },
  ambient(k) { k.particles('.dust', 'dust', { n: 70, alpha: .6, color: '190,210,235' }); k.drift('.drift', .6); },
  beats: [
    (k) => {
      k.to('.lb', { height: 110, duration: 1.8, ease: 'power2.inOut' }, 0);
      k.cam('.cam', 1.02, 960, 540, { d: 12 }, 0);
      k.in('.k', 1.2, { y: 0 }); k.in('.h', 1.5, { d: 1.8, blur: 14 });
    },
    (k) => {
      k.out(['.h'], 0, .6); k.to('.k', { autoAlpha: 0, duration: .5 }, 0);
      k.cam('.cam', 1.55, 380, 760, { d: 7, sx: 1200, sy: 760 }, 0);
      k.to('.ml', { opacity: 1, duration: 3 }, .4); k.words('.v1', .6); k.in('.v1s', 1.3); k.in('.v1b', 1.9);
    },
    (k) => {
      k.out(['.v1', '.v1s', '.v1b'], 0, .6);
      k.cam('.cam', 1.45, 1440, 380, { d: 8, sx: 1420, sy: 470 }, 0);
      k.to('.sh', { opacity: 1, duration: 2 }, 0); k.to('.ml', { opacity: 0, duration: 2 }, 0);
      k.words('.v2', 1.4, { st: .1 }); k.in('.v2s', 2.4); k.words('.v3', 2.9, { st: .1 }); k.in('.v3s', 3.8);
    },
    (k) => {
      k.out(['.v2', '.v2s', '.v3', '.v3s'], 0, .6);
      k.to('.lb', { height: 0, duration: 1.8, ease: 'power2.inOut' }, 0);
      k.cam('.cam', 1.08, 1100, 540, { d: 9 }, 0);
      k.in('.v4', .8, { d: 1.6 });
    }
  ]
});

/* 14 · El deseo y la entrega */
S.push({
  id: 'entrega', title: 'El deseo y la entrega',
  notes: 'Jesús no niega su deseo: pide que el cáliz se aparte. La frase decisiva no borra lo que acaba de decir: lo entrega al Padre. Al final se levanta y camina hacia lo que llega: confiar no es inmovilidad ni fingir calma. Benedicto XVI vio en Getsemaní el «sí» del Hijo allí donde Adán y Eva buscaron la libertad en el «no» a Dios.',
  html: `<div class="fill" style="background:radial-gradient(ellipse at 72% 50%,#121822 0%,#07080b 55%,#050407 100%)"></div><canvas class="fx dust"></canvas>` +
    `<div class="abs rv cupw" style="left:1180px;top:230px;width:640px;height:640px">${obj('o-caliz', '', 'left:0;top:0;width:640px;height:640px')}</div>` +
    T('h0 no cold', 'left:120px;top:60px;font-size:420px;opacity:0', 'no') +
    T('h0 si warm', 'left:1380px;top:60px;font-size:420px;opacity:0', 'sí') +
    T('kicker a0', 'left:132px;top:150px', 'El deseo, dicho con verdad') +
    T('q md a1', 'left:132px;top:196px;width:1000px', '«¡Abba!, Padre: tú lo puedes todo, aparta de mí este cáliz.»') +
    T('kicker b0', 'left:132px;top:470px', 'El deseo, entregado') +
    T('q lg b1', 'left:132px;top:516px;width:1020px', '«Pero no sea como yo quiero, sino como tú quieres.»') +
    T('src b2', 'left:132px;top:790px', 'Marcos 14,36') +
    T('q lg c1', 'left:132px;top:300px;width:1000px', '«¡Levantaos, vamos!»') +
    T('src c2', 'left:132px;top:410px', 'Marcos 14,42') +
    T('body c3', 'left:132px;top:500px;width:960px', 'Confiar no es inmovilidad ni fingir calma: <b>se levanta y camina hacia lo que llega.</b>') +
    T('q sm d1', 'left:230px;right:230px;top:500px;text-align:center', '«Adán y Eva pensaron que el “no” a Dios sería la cumbre de la libertad […]. Jesús, en el monte de los Olivos, reconduce la voluntad humana al “sí” pleno a Dios.»') +
    T('src d2', 'left:0;right:0;top:800px;text-align:center', 'Benedicto XVI, audiencia general, 1 de febrero de 2012'),
  ambient(k) { k.particles('.dust', 'dust', { n: 50, alpha: .5, color: '190,210,235' }); },
  beats: [
    (k) => {
      k.fromTo('.cupw', { autoAlpha: 0, scale: 1.08 }, { autoAlpha: 1, scale: 1, duration: 2.6, ease: 'power2.out' }, 0);
      k.in('.a0', .6, { y: 0 }); k.words('.a1', 1.0, { st: .08 });
    },
    (k) => { k.to('.a1', { opacity: .5, duration: 1 }, 0); k.in('.b0', .3, { y: 0 }); k.words('.b1', .7, { st: .11, d: 1.1 }); k.in('.b2', 2.4); },
    (k) => {
      k.out(['.a0', '.a1', '.b0', '.b1', '.b2'], 0, .6);
      k.to('.cupw', { opacity: .45, duration: 1.2 }, 0);
      k.in('.c1', .6, { y: 30, d: 1.2 }); k.in('.c2', 1.2); k.in('.c3', 1.8);
    },
    (k) => {
      k.out(['.c1', '.c2', '.c3'], 0, .6);
      k.to('.cupw', { opacity: .18, duration: 1.2 }, 0);
      k.fromTo('.no', { autoAlpha: 0, y: 30 }, { autoAlpha: .22, y: 0, duration: 1.6 }, .4);
      k.fromTo('.si', { autoAlpha: 0, y: 30 }, { autoAlpha: .3, y: 0, duration: 1.6 }, 1.4);
      k.in('.d1', 1.0, { d: 1.6 }); k.in('.d2', 2.2);
    }
  ]
});

/* 15 · Dos jardines */
S.push({
  id: 'jardines', title: 'Dos jardines',
  notes: 'El contraste para recordar. La comodidad no garantiza que yo confíe; la angustia tampoco demuestra que no confío. En un jardín, la abundancia no impide sospechar de Dios; en el otro, la angustia no impide entregarse a Él. Mi estado emocional no es la medida completa de mi relación con Dios.',
  html: `<div class="abs pl" style="left:0;top:0;width:958px;height:1080px;overflow:hidden"><img class="paint" src="${IMG('p02-eden')}" style="object-position:74% 35%" alt=""></div>` +
    `<div class="abs pr" style="left:962px;top:0;width:958px;height:1080px;overflow:hidden"><img class="paint" src="${IMG('p07-getsemani')}" style="object-position:82% 30%" alt=""></div>` +
    `<div class="fill" style="background:linear-gradient(0deg,rgba(5,4,7,.97) 0%,rgba(5,4,7,.9) 36%,rgba(5,4,7,.25) 60%,rgba(5,4,7,0) 70%)"></div><div class="fill" style="background:linear-gradient(180deg,rgba(5,4,7,.9),rgba(5,4,7,0) 26%)"></div>` + DARK(0) +
    SVG(`<line class="rv seam" x1="960" y1="40" x2="960" y2="1040" stroke="#e8c67e" stroke-width="2" style="${GLOW}"/>`) +
    T('h1 hl warm', 'left:0;width:960px;top:56px;text-align:center', 'Edén') +
    T('h1 hr cold', 'left:960px;width:960px;top:56px;text-align:center', 'Getsemaní') +
    [['Alrededor', 'abundancia', 'angustia'], ['En el corazón', 'desconfianza', 'confianza']].map((r, i) => {
      const y = 620 + i * 170;
      return T(`kicker rl rl${i}`, `left:660px;width:600px;top:${y}px;text-align:center`, `<span class="lbl">${r[0]}</span>`) +
        T(`h2 rx${i}`, `left:80px;width:800px;top:${y + 34}px;text-align:right`, r[1]) +
        T(`h2 ry${i}`, `left:1040px;width:800px;top:${y + 34}px`, r[2]);
    }).join('') +
    T('body fa', 'left:200px;right:200px;top:330px;text-align:center', 'La comodidad no garantiza que yo confíe.<br>La angustia no demuestra que no confío.') +
    T('h2 fb', 'left:220px;right:220px;top:540px;text-align:center', 'Mi estado emocional no es la medida completa de <b>mi relación con Dios.</b>'),
  beats: [
    (k) => {
      k.fromTo('.pl', { x: -300, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 2, ease: 'power3.out' }, 0);
      k.fromTo('.pr', { x: 300, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 2, ease: 'power3.out' }, .15);
      k.draw('.seam', .8, 1.4); k.in('.hl', 1.2); k.in('.hr', 1.4);
    },
    (k) => { k.in('.rl0', 0); k.in('.rx0', .3, { x: -30, y: 0 }); k.in('.ry0', .7, { x: 30, y: 0 }); },
    (k) => { k.in('.rl1', 0); k.in('.rx1', .3, { x: -30, y: 0 }); k.in('.ry1', .7, { x: 30, y: 0 }); k.to('.rx1', { color: '#aebfd0', duration: 1 }, 1.2); k.to('.ry1', { color: '#e8c67e', duration: 1 }, 1.4); },
    (k) => {
      k.to('.dark', { opacity: .82, duration: 1.4 }, 0);
      k.out(['.rl0', '.rl1', '.rx0', '.rx1', '.ry0', '.ry1', '.seam'], 0, .7);
      k.in('.fa', .8, { d: 1.4 });
    },
    (k) => { k.to('.fa', { opacity: .5, y: -40, duration: 1 }, 0); k.in('.fb', .5, { d: 1.6 }); }
  ]
});

/* ============================ ACTO IV · LA NOCHE DE TERESITA ============================ */

/* 16 · Teresita, 1896 */
S.push({
  id: 'teresita', title: 'Teresita, 1896',
  notes: 'Teresita de Lisieux había entrado muy joven al Carmelo. En la noche del Jueves al Viernes Santo de 1896 apareció sangre: signo de la enfermedad que terminaría con su vida. En su relato, al principio imaginó con alegría que se acercaba el encuentro con Jesús. Lo que vino después fue más desconcertante: una gran prueba de la fe. Fuente: archivos del Carmelo de Lisieux.',
  enter: 1.0,
  html: paint('p08-teresita') + `<div class="fill cglow" style="mix-blend-mode:screen;background:radial-gradient(circle at 1731px 470px,rgba(255,200,120,.35),rgba(255,180,100,.1) 14%,rgba(0,0,0,0) 30%)"></div>` +
    `<canvas class="fx emb"></canvas><div class="fill shade-l"></div>` + DARK(1) + VIG +
    T('h0 yr', 'left:0;right:0;top:420px;text-align:center;font-weight:500;letter-spacing:.06em', 'Lisieux · 1896') +
    T('kicker k', 'left:132px;top:170px', K('Acto IV · La noche de Teresita')) +
    T('h1 h', 'left:124px;top:216px;width:900px', 'Teresita, 1896') +
    T('body b1', 'left:132px;top:400px;width:820px', 'Entró muy joven al Carmelo de Lisieux: <b>tenía 15 años.</b>') +
    T('body b2', 'left:132px;top:560px;width:820px', 'Jueves Santo, 2 de abril de 1896, de noche: <b class="red">aparece sangre.</b>') +
    T('body c1', 'left:132px;top:400px;width:820px', 'Era el primer signo de la <b>tuberculosis</b> que acabaría con su vida.') +
    T('body c2', 'left:132px;top:560px;width:820px', 'Al principio lo recibió con alegría: pensó que <b>se acercaba el encuentro con Jesús.</b>') +
    T('body d0', 'left:132px;top:380px;width:840px', 'Lo que vino después fue más desconcertante:') + T('q lg d1', 'left:132px;top:450px;width:900px', '<b>una gran prueba de la fe.</b>') +
    T('src d2', 'left:132px;top:580px;width:840px', 'Archivos del Carmelo de Lisieux · «Último año de la vida de Teresa»'),
  init(k) { k.camSet('.cam', 1.12, 1400, 420, { sx: 1300 }); },
  ambient(k) { k.particles('.emb', 'embers', { n: 26, alpha: .8, x0: 855, x1: 880, y0: 180, y1: 235 }); k.flicker('.cglow', .6, 1); k.drift('.drift', .5); },
  beats: [
    (k) => {
      k.in('.yr', .2, { d: 2, blur: 18, y: 0 });
      k.to('.yr', { autoAlpha: 0, duration: 1.2 }, 3.0);
      k.to('.dark', { opacity: 0, duration: 3.5, ease: 'power1.inOut' }, 3.4);
      k.in('.k', 5.0, { y: 0 }); k.in('.h', 5.3, { d: 1.6 });
      k.cam('.cam', 1.0, 960, 540, { d: 12 }, 3.0);
    },
    (k) => {
      k.out(['.h'], 0, .6); k.to('.k', { autoAlpha: 0, duration: .5 }, 0);
      k.cam('.cam', 1.55, 1452, 640, { d: 8, sx: 1400, sy: 600 }, 0);
      k.in('.b1', .5); k.in('.b2', 1.6);
    },
    (k) => { k.out(['.b1', '.b2'], 0, .6); k.cam('.cam', 1.4, 1360, 330, { d: 8, sx: 1380, sy: 420 }, 0); k.in('.c1', .5); k.in('.c2', 1.6); },
    (k) => {
      k.out(['.c1', '.c2'], 0, .6);
      k.cam('.cam', 1.05, 1200, 500, { d: 9 }, 0);
      k.to('.dark', { opacity: .3, duration: 3 }, .4);
      k.in('.d0', .5); k.words('.d1', 1.2, { st: .12 }); k.in('.d2', 2.4);
    }
  ]
});

/* 17 · Cuando el cielo se oscurece (el muro de Manuscrito C) */
S.push({
  id: 'oscuridad', title: 'Cuando el cielo se oscurece',
  notes: 'Teresita había hablado del cielo con amor. En la prueba iniciada en Pascua de 1896, la idea de la muerte se encontró con una oscuridad interior y la tentación de que no hubiera nada. No decidió abandonar la fe: describió un combate. C’est la confiance, 25, lo llama «prueba contra la fe». No reducirlo a un día en que la oración no produjo una emoción agradable. El muro es imagen de la propia Teresita en el Manuscrito C.',
  html: paint('p11-firmamento') + `<canvas class="fx stars"></canvas>` +
    `<div class="abs wall" style="left:0;top:0;width:1920px;height:1180px;transform:translateY(1100px);` +
    `-webkit-mask-image:linear-gradient(180deg,transparent 0,#000 110px);mask-image:linear-gradient(180deg,transparent 0,#000 110px)">` +
    `<img src="${IMG('p04-puerta')}" style="position:absolute;left:0;top:0;width:3400px;height:1180px;object-fit:cover;object-position:0% 50%;filter:brightness(.78) contrast(1.08)" alt=""></div>` +
    `<div class="fill shade-l" style="opacity:.8"></div>` + DARK(0) + VIG +
    T('h1 h', 'left:124px;top:170px;width:1000px', 'Cuando el cielo<br>se oscurece') +
    T('body b0', 'left:132px;top:440px;width:820px', 'No sólo perdía la salud.<br><b>Dejaba de sentir cercano el cielo.</b>') +
    T('q md m1', 'left:132px;top:300px;width:1000px', '«Ya no es un velo para mí: es un muro que se eleva hasta los cielos y cubre el firmamento estrellado.»') +
    T('src m2', 'left:132px;top:600px', 'Manuscrito C · trad. libre') +
    T('body t1', 'left:132px;top:300px;width:960px', 'La tentación: que después de esta vida <b>no hubiera nada.</b>') +
    T('body t2', 'left:132px;top:460px;width:960px', 'No decidió abandonar la fe: <b>describió un combate.</b>') +
    T('src u0', 'left:132px;top:290px', 'Francisco · <i>C’est la confiance</i>, 25') +
    T('q md u1', 'left:132px;top:340px;width:1080px', '«…la gran “prueba contra la fe”, que comenzó en la Pascua de 1896.»') +
    T('tag u2', 'left:132px;top:560px;width:960px', 'No fue un día en que la oración no produjo una emoción agradable.'),
  init(k) { k.camSet('.cam', 1.7, 960, 0, { sx: 960, sy: 0 }); },
  ambient(k) { k.particles('.stars', 'stars', { n: 160, alpha: 1, color: '230,235,255', y1: 420 }); k.drift('.drift', .4); },
  beats: [
    (k) => { k.in('.h', .6, { d: 1.8 }); k.in('.b0', 1.8); },
    (k) => {
      k.out(['.h', '.b0'], 0, .6);
      k.to('.wall', { y: 0, duration: 6, ease: 'power1.inOut' }, .3);
      k.words('.m1', 2.2, { st: .07 }); k.in('.m2', 4.4);
    },
    (k) => { k.out(['.m1', '.m2'], 0, .6); k.in('.t1', .5); k.in('.t2', 1.6); },
    (k) => { k.out(['.t1', '.t2'], 0, .6); k.in('.u0', .4); k.words('.u1', .8, { st: .08 }); k.in('.u2', 2.4); }
  ]
});

/* 18 · Creer sin sentir consuelo */
S.push({
  id: 'canto', title: 'Creer sin sentir consuelo',
  notes: 'En el Manuscrito C, Teresita explica que puede cantar sobre la alegría del cielo sin sentirla: canta lo que quiere creer. La frase en pantalla traduce ese sentido; no es edición crítica. Su fe no funciona como técnica para recuperar de inmediato el consuelo: permanece en medio de una ausencia que no controla.',
  html: `<div class="fill"><img class="paint" src="${IMG('p04-puerta')}" style="object-position:0% 50%;width:3400px;max-width:none;filter:brightness(.72) contrast(1.08)" alt=""></div>` +
    `<div class="fill" style="background:radial-gradient(ellipse at 76% 45%,rgba(255,190,110,.20),rgba(0,0,0,0) 40%)"></div><div class="fill shade-l" style="opacity:.85"></div>` + DARK(0) + VIG +
    `<div class="abs rv cd" style="left:1240px;top:170px;width:620px;height:620px">${obj('o-vela', 'flame', 'left:0;top:0;width:620px;height:620px')}</div>` +
    T('q lg c1', 'left:132px;top:300px;width:1000px;font-size:96px', 'Canto lo que quiero creer.') +
    T('tag c2', 'left:132px;top:540px;width:960px', 'Síntesis del Manuscrito C · no es cita literal') +
    T('src c3', 'left:132px;top:600px;width:960px', 'Original: «…je chante simplement ce que JE VEUX CROIRE» (Ms C, 7v°)') +
    T('kicker d0', 'left:132px;top:330px', 'Lo que siente') + T('h2 d1 dimt', 'left:132px;top:375px;width:960px', 'ninguna alegría') +
    T('kicker d2', 'left:132px;top:560px', 'Lo que canta') + T('h2 d3 warm', 'left:132px;top:605px;width:960px', 'el cielo que quiere creer') +
    T('body e1', 'left:132px;top:330px;width:960px', 'Su fe no es una técnica para recuperar el consuelo.') +
    T('body e2', 'left:132px;top:470px;width:960px', '<b>Permanece en una ausencia que no controla.</b>'),
  ambient(k) { k.flicker('.flame', .75, 1); },
  beats: [
    (k) => { k.fromTo('.cd', { autoAlpha: 0 }, { autoAlpha: 1, duration: 2.2 }, 0); k.words('.c1', .8, { st: .16, d: 1.3 }); k.in('.c2', 2.6); k.in('.c3', 3.1); },
    (k) => {
      k.out(['.c1', '.c2', '.c3'], 0, .6);
      k.in('.d0', .4, { y: 0 }); k.in('.d1', .6); k.to('.cd', { opacity: .45, duration: 1.2 }, .8);
      k.in('.d2', 1.8, { y: 0 }); k.in('.d3', 2.0); k.to('.cd', { opacity: 1, duration: 1.2 }, 2.2);
    },
    (k) => { k.out(['.d0', '.d1', '.d2', '.d3'], 0, .6); k.in('.e1', .5); k.in('.e2', 1.6, { d: 1.6 }); }
  ]
});

/* 19 · El cáliz de Teresita */
S.push({
  id: 'caliz', title: 'El cáliz de Teresita',
  notes: 'En la carta del 17 de septiembre de 1896 a su hermana María, Teresita dice que sus grandes deseos espirituales no son el fundamento de su confianza. Recuerda a Jesús pidiendo que se aparte el cáliz: la conexión con Getsemaní aparece en su propia voz. No obtiene salud como premio por sentir correctamente. Puede amar y confiar con fragilidad, enfermedad y noche interior.',
  html: paint('p08-teresita') + `<div class="fill shade-l"></div>` + DARK(.35) + VIG +
    `<div class="abs rv cupw" style="left:60px;top:560px;width:480px;height:480px">${obj('o-caliz', '', 'left:0;top:0;width:480px;height:480px')}</div>` +
    T('kicker k', 'left:132px;top:150px;width:1100px', K('Carta 197 · 17 de septiembre de 1896')) +
    T('q md a1', 'left:132px;top:210px;width:900px', '«Mis deseos de martirio no son nada; no son ellos los que me dan la confianza ilimitada que siento en mi corazón.»') +
    T('tag a2', 'left:132px;top:520px;width:900px', 'A su hermana María del Sagrado Corazón · trad. libre') +
    T('q md b1', 'left:132px;top:600px;width:900px', '«La confianza, y nada más que la confianza, puede conducirnos al Amor.»') +
    T('src b2', 'left:132px;top:790px;width:960px', 'La misma carta, en la traducción de <i>C’est la confiance</i>, 1') +
    T('body c1', 'left:520px;top:640px;width:760px', 'En esa carta recuerda a Jesús pidiendo que se aparte el cáliz:') +
    T('h2 c2 warm', 'left:520px;top:790px;width:1100px;font-size:72px', 'Getsemaní, en su propia voz.') +
    T('h2 e1', 'left:124px;top:300px;width:940px', 'La confianza no exige <b>entusiasmo por sufrir.</b>') +
    T('body sm e2', 'left:132px;top:520px;width:900px', 'No recibe la salud como premio por sentir correctamente: <b>ama y confía con fragilidad, enfermedad y noche interior.</b>'),
  init(k) { k.camSet('.cam', 1.15, 1300, 480, { sx: 1400 }); },
  ambient(k) { k.drift('.drift', .5); },
  beats: [
    (k) => { k.cam('.cam', 1.25, 1360, 420, { d: 12, sx: 1450 }, 0); k.in('.k', .5, { y: 0 }); k.words('.a1', 1.0, { st: .06 }); k.in('.a2', 2.8); },
    (k) => { k.to(['.a1', '.a2'], { opacity: .4, duration: .8 }, 0); k.words('.b1', .5, { st: .08 }); k.in('.b2', 2.0); },
    (k) => {
      k.out(['.k', '.a1', '.a2', '.b1', '.b2'], 0, .6);
      k.to('.dark', { opacity: .6, duration: 1.4 }, 0);
      k.fromTo('.cupw', { autoAlpha: 0, scale: 1.1 }, { autoAlpha: 1, scale: 1, duration: 2.2, ease: 'power2.out' }, .5);
      k.in('.c1', 1.2); k.in('.c2', 2.2, { d: 1.6 });
    },
    (k) => {
      k.out(['.c1', '.c2'], 0, .6); k.to('.cupw', { opacity: .35, duration: 1 }, 0);
      k.to('.dark', { opacity: .45, duration: 1.4 }, 0);
      k.in('.e1', .5, { d: 1.6 }); k.in('.e2', 1.8);
    }
  ]
});

/* ============================ ACTO V · NOSOTROS ============================ */

/* 20 · La pregunta para nosotros */
S.push({
  id: 'pregunta', title: 'La pregunta para nosotros',
  notes: 'Volvamos a nosotros. ¿Hay algo que le pido a Dios y, en el fondo, considero que no debería negarme? ¿Cuando digo «hágase tu voluntad», estoy confiando en su bondad o suponiendo que esa frase será el modo de conseguir lo que quiero? Silencio. Escuchar sin convertirlo en examen sobre prácticas ajenas.',
  html: paint('p10-cuerda') + `<div class="fill dawn" style="opacity:0;mix-blend-mode:screen;background:radial-gradient(ellipse at 70% 62%,rgba(255,170,90,.35),rgba(0,0,0,0) 45%)"></div>` +
    `<div class="fill" style="background:linear-gradient(200deg,rgba(5,4,7,.9) 0%,rgba(5,4,7,.72) 34%,rgba(5,4,7,0) 58%)"></div>` + DARK(.25) + VIG +
    T('kicker k', 'left:900px;top:130px;width:880px;text-align:right', 'Acto V · Nosotros') +
    T('h1 h', 'left:860px;top:176px;width:920px;text-align:right;font-size:96px', '¿Qué espero que Dios me garantice?') +
    T('body q1', 'left:900px;top:430px;width:880px;text-align:right', '¿Hay algo que le pido y, en el fondo, <b>creo que no debería negarme?</b>') +
    T('body q2', 'left:860px;top:430px;width:920px;text-align:right', 'Cuando digo <b>«hágase tu voluntad»</b>, ¿confío en su bondad… o espero que esa frase me consiga lo que quiero?'),
  init(k) { k.camSet('.cam', 1.3, 700, 300, { sx: 700, sy: 250 }); },
  ambient(k) { k.drift('.drift', .6); },
  beats: [
    (k) => { k.cam('.cam', 1.2, 700, 300, { d: 14, sx: 640, sy: 280 }, 0); k.in('.k', .6, { y: 0 }); k.words('.h', 1.0, { st: .1, d: 1.2 }); },
    (k) => { k.in('.q1', .3); k.to('.dawn', { opacity: .5, duration: 4 }, 0); },
    (k) => { k.out('.q1', 0, .6); k.in('.q2', .6); k.to('.dawn', { opacity: 1, duration: 5 }, 0); k.to('.dark', { opacity: 0, duration: 5 }, 0); }
  ]
});

/* 21 · Cierre y oración */
S.push({
  id: 'cierre', title: 'Confiar sin controlar',
  notes: 'Confiar en Dios no es aprender la fórmula que garantiza un desenlace. Es pedir con sinceridad, actuar con responsabilidad y seguir viviendo como hijo cuando el final no está en mis manos. Edén: la sospecha. Getsemaní: la entrega en medio de la angustia. Teresita: la fidelidad en la oscuridad. Si encaja con el grupo, cerrar con la oración.',
  html: `<div class="fill" style="background:radial-gradient(ellipse at 50% 45%,#1a120b 0%,#080607 55%,#050407 100%)"></div><canvas class="fx emb"></canvas>` +
    [['p02-eden', '74% 38%', 'Edén', 'la sospecha'], ['p07-getsemani', '84% 30%', 'Getsemaní', 'la entrega en la angustia'], ['p08-teresita', '80% 30%', 'Teresita', 'la fidelidad en la oscuridad']].map((p, i) =>
      `<div class="abs rv tp tp${i}" style="left:${120 + i * 570}px;top:170px;width:540px;height:400px;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.7)"><img class="paint" src="${IMG(p[0])}" style="object-position:${p[1]}" alt=""></div>` +
      `<div class="abs rv tc tc${i}" style="left:${120 + i * 570}px;top:600px;width:540px;text-align:center"><div class="kicker">${p[2]}</div><div class="h2" style="font-size:62px;margin-top:10px">${p[3]}</div></div>`).join('') +
    `<div class="abs rv keyw" style="left:760px;top:110px;width:400px;height:400px">${obj('o-llave', '', 'left:0;top:0;width:400px;height:400px;-webkit-mask-image:none;mask-image:none')}</div>` +
    T('h2 a1', 'left:200px;right:200px;top:560px;text-align:center', 'Confiar en Dios no es aprender la fórmula<br>que garantiza un desenlace.') +
    `<div class="abs rv handw" style="left:710px;top:40px;width:500px;height:500px">${obj('o-mano-abierta', '', 'left:0;top:0;width:500px;height:500px')}</div>` +
    T('body b1', 'left:220px;right:220px;top:590px;text-align:center', 'Es pedir con sinceridad, actuar con responsabilidad<br>y seguir viviendo como hijo<br><b>cuando el final no está en mis manos.</b>') +
    T('h0 c1', 'left:100px;right:100px;top:560px;text-align:center;font-size:118px', 'Vivir como hijo,<br><b>aun sin controlar el final.</b>') +
    `<div class="abs rv cd" style="left:760px;top:40px;width:400px;height:400px">${obj('o-vela', 'flame', 'left:0;top:0;width:400px;height:400px')}</div>` +
    T('q md d1', 'left:200px;right:200px;top:520px;text-align:center', 'Señor, enséñame a pedir con verdad<br>y a confiar sin exigirte el desenlace.') +
    T('h2 d2 warm', 'left:0;right:0;top:720px;text-align:center', 'Amén.'),
  ambient(k) { k.emb = k.particles('.emb', 'embers', { n: 24, alpha: 0, x0: 470, x1: 490, y0: 40, y1: 95 }); k.flicker('.flame', .78, 1); },
  beats: [
    (k) => { [0, 1, 2].forEach(i => { k.in(`.tp${i}`, .2 + i * .5, { d: 1.6, scale: 1.04 }); k.in(`.tc${i}`, .8 + i * .5); }); },
    (k) => {
      k.to(['.tp0', '.tp1', '.tp2', '.tc0', '.tc1', '.tc2'], { autoAlpha: 0, y: -30, duration: 1, stagger: .05 }, 0);
      k.fromTo('.keyw', { autoAlpha: 0, rotation: -25 }, { autoAlpha: 1, rotation: 0, duration: 1.6 }, .8);
      k.in('.a1', 1.2, { d: 1.6 });
      k.to('.keyw', { y: 380, rotation: 40, autoAlpha: 0, duration: 2.4, ease: 'power2.in' }, 3.2);
    },
    (k) => {
      k.out('.a1', 0, .6);
      k.fromTo('.handw', { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 2.2, ease: 'power2.out' }, .4);
      k.in('.b1', 1.2, { d: 1.6 });
    },
    (k) => { k.out('.b1', 0, .6); k.to('.handw', { opacity: .5, duration: 1.2 }, 0); k.in('.c1', .6, { d: 2, blur: 16 }); },
    (k) => {
      k.out(['.c1', '.handw'], 0, .8);
      k.fromTo('.cd', { autoAlpha: 0, scale: .9 }, { autoAlpha: 1, scale: 1, duration: 2.4, ease: 'power2.out' }, .6);
      k.in('.d1', 1.6, { d: 1.8 }); k.in('.d2', 3.2, { d: 1.6 }); k.tl.to(k.emb.p, { alpha: .8, duration: 2 }, 1.2);
    }
  ]
});

window.SCENES = S;
})();
