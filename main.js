// Scroll-driven behaviour for the anniversary microsite
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const ramp = (p, a, b) => clamp((p - a) / (b - a));
const smooth = t => t * t * (3 - 2 * t);
const $ = id => document.getElementById(id);
const fmt = n => Math.round(n).toLocaleString('en-US');

/* progress (0..1) of a tall section while its sticky stage is pinned */
function sectionProgress(el) {
  const total = Math.max(1, el.offsetHeight - innerHeight);
  return clamp(-el.getBoundingClientRect().top / total);
}

/* ---------- build floating numbers ---------- */
const canvas = $('canvas');
FLOATING.forEach(([n, x, y, fs, op], i) => {
  const b = document.createElement('button');
  b.className = 'nf';
  b.style.left = (x * 0.55) + 'vw';
  b.style.top = y + '%';
  b.dataset.op = op;
  b.dataset.i = i;
  b.innerHTML = `<small>I AM</small><b style="font-size:${fs}rem">${n.toLocaleString('en-US')}</b>`;
  canvas.appendChild(b);
});

/* hover profile card (first 12 floating numbers map to the 12 overcomers) */
const card = $('profile');
let closeTimer;
function showProfile(btn) {
  const p = OVERCOMERS[+btn.dataset.i];
  if (!p) return;
  clearTimeout(closeTimer);
  $('pfImg').src = p.img; $('pfName').textContent = p.name; $('pfRole').textContent = p.role;
  $('pfDays').textContent = fmt(p.days); $('pfQuote').textContent = '“' + p.quote + '”';
  const r = btn.getBoundingClientRect();
  card.style.left = clamp(r.left, 16, innerWidth - 316) + 'px';
  card.style.top = clamp(r.bottom + 12, 16, innerHeight - 380) + 'px';
  card.classList.add('open');
}
const hideProfile = () => { closeTimer = setTimeout(() => card.classList.remove('open'), 180); };
canvas.addEventListener('mouseover', e => { const b = e.target.closest('.nf'); if (b && visibility > .3) showProfile(b); });
canvas.addEventListener('mouseout', e => { if (e.target.closest('.nf')) hideProfile(); });
card.addEventListener('mouseenter', () => clearTimeout(closeTimer));
card.addEventListener('mouseleave', hideProfile);

/* ---------- hero ---------- */
const hero = $('hero');
let visibility = 0;
function updateHero() {
  const p = sectionProgress(hero);
  const morph = smooth(ramp(p, .04, .26));
  const daysP = ramp(p, .02, .1);
  const subP = ramp(p, .1, .2);
  const bgEase = smooth(ramp(p, .32, .43));
  const mainOpacity = 1 - ramp(p, .41, .49);
  visibility = ramp(p, .46, .5);
  const numbersP = ramp(p, .55, .95);

  $('heroBg').style.transform = `translateY(${-bgEase * 100}%)`;
  $('heroBg').querySelector('img').style.transform = `scale(${1.02 + morph * .025}) translateY(${-morph * 1.5}%)`;
  const c = `rgb(${Math.round(255 - 243 * bgEase)}, ${Math.round(255 - 238 * bgEase)}, ${Math.round(255 - 234 * bgEase)})`;
  $('heroMain').style.opacity = mainOpacity;
  $('heroNum').style.color = c;
  $('heroIam').style.color = c;
  $('heroNum').textContent = morph < .02 ? '40' : morph >= 1 ? '14,600' : fmt(40 + 14560 * morph);
  const d = $('heroDays');
  d.style.opacity = daysP * (1 - bgEase);
  d.style.transform = `translateY(${(1 - daysP) * 8}px)`;
  const s = $('heroSub');
  s.style.opacity = subP * (1 - bgEase);
  s.style.transform = `translateY(${(1 - subP) * 24}px)`;
  s.style.color = '#fff';
  $('heroTop').style.color = bgEase > .5 ? '#0c1115' : '#fff';
  $('heroTop').style.opacity = 1 - ramp(p, .6, .7) * 0;

  // numbers canvas pans left (0 -> -250vw)
  canvas.style.transform = `translate3d(${-numbersP * 250}vw,0,0)`;
  canvas.querySelectorAll('.nf').forEach(b => {
    b.style.opacity = visibility * +b.dataset.op;
    b.style.transform = `translateY(${(1 - visibility) * 24}px)`;
    b.style.pointerEvents = visibility > .3 ? 'auto' : 'none';
  });
  const t = $('numbersText');
  t.style.opacity = ramp(p, .5, .56);
  t.style.transform = `translateY(${(1 - ramp(p, .5, .56)) * 16}px)`;
  $('scrollCue').style.opacity = Math.max(0, 1 - clamp(p / .32) * 6);
}

/* ---------- story ---------- */
const story = $('story');
const scenes = [...document.querySelectorAll('.scene')];
const dots = [...document.querySelectorAll('#dots i')];
const RANGES = [[0, .17], [.17, .40], [.40, .58], [.58, .78], [.78, 1.01]];
const FADE = .035;
function updateStory() {
  const q = sectionProgress(story);
  let active = 0;
  scenes.forEach((el, i) => {
    const [a, b] = RANGES[i];
    const fin = i === 0 ? 1 : ramp(q, a - FADE, a + FADE);
    const fout = i === scenes.length - 1 ? 1 : 1 - ramp(q, b - FADE, b + FADE);
    const o = Math.min(fin, fout);
    el.style.opacity = o;
    el.style.transform = `translateY(${(1 - o) * 12}px)`;
    if (q >= a && q < b) active = i;
  });
  dots.forEach((d, i) => d.classList.toggle('on', i === active));
}

/* ---------- overcomers wall + collage ---------- */
const mosaic = $('mosaic');
OVERCOMERS.forEach(p => {
  const m = Object.fromEntries(p.cell.split(' ').map(t => [t[0], +t.slice(1)]));
  const t = document.createElement('div');
  t.className = 'tile' + (m.w === 2 && m.h === 2 ? ' big2' : '');
  t.style.gridColumn = `${m.c + 1} / span ${m.w || 1}`;
  t.style.gridRow = `${m.r + 1} / span ${m.h || 1}`;
  t.innerHTML = `<img src="${p.img}" alt="${p.name}" loading="lazy"><div class="fade"></div>
    <div class="c"><small>I AM</small><b>${fmt(p.days)}</b></div>
    <div class="meta"><em>${p.name}</em><span>${p.role}</span></div>`;
  mosaic.appendChild(t);
});
mosaic.insertAdjacentHTML('beforeend', '<div class="tile more" style="grid-column:1;grid-row:6"><b>+28</b><small>More Overcomers</small></div>');

const collage = $('collage');
// column 1: Daniel (2 rows), Alvin, Ben ; column 2: Marcus, Raymond, Jason
const col1 = [[0, 2], [3, 1], [5, 1]], col2 = [[1, 1], [2, 1], [4, 1]];
[[col1, 1], [col2, 2]].forEach(([list, col]) => {
  let row = 1;
  list.forEach(([i, span]) => {
    const p = OVERCOMERS[i];
    const t = document.createElement('div');
    t.className = 'tile';
    t.style.gridColumn = col; t.style.gridRow = `${row} / span ${span}`;
    t.innerHTML = `<img src="${p.img}" alt="" loading="lazy"><div class="fade"></div><span class="tag">I AM ${fmt(p.days)}</span>`;
    collage.appendChild(t);
    row += span;
  });
});

/* ---------- impact counters ---------- */
const counters = document.querySelectorAll('.stat');
const io = new IntersectionObserver(entries => entries.forEach(en => {
  if (!en.isIntersecting) return;
  io.unobserve(en.target);
  const el = en.target, to = +el.dataset.to, suf = el.dataset.suffix, t0 = performance.now();
  (function tick(now) {
    const k = clamp((now - t0) / 1800);
    el.textContent = fmt(to * (1 - Math.pow(1 - k, 3))) + suf;
    if (k < 1) requestAnimationFrame(tick);
  })(t0);
}), { threshold: .6 });
counters.forEach(c => io.observe(c));

/* ---------- misc: progress bar, cursor ---------- */
const bar = $('progress');
function onScroll() {
  updateHero(); updateStory();
  bar.style.width = (scrollY / (document.documentElement.scrollHeight - innerHeight) * 100) + '%';
}
addEventListener('scroll', onScroll, { passive: true });
addEventListener('resize', onScroll);
onScroll();

const dot = $('cursor-dot'), ring = $('cursor-ring');
let mx = -200, my = -200, rx = -200, ry = -200, hov = false;
addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  hov = !!e.target.closest('button,a,.tile:not(.more)');
  dot.style.opacity = ring.style.opacity = 1;
});
(function loop() {
  rx += (mx - rx) * .12; ry += (my - ry) * .12;
  const s = hov ? 44 : 22;
  dot.style.transform = `translate(${mx - 5}px,${my - 5}px)`;
  dot.style.opacity = hov ? 0 : (mx < 0 ? 0 : 1);
  ring.style.width = ring.style.height = s + 'px';
  ring.style.transform = `translate(${rx - s / 2}px,${ry - s / 2}px)`;
  requestAnimationFrame(loop);
})();
