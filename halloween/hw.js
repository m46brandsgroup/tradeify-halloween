/* Tradeify Halloween edition, v2.
 *
 * Sits on top of an untouched copy of tradeify.co. Everything is driven by the
 * SLOTS manifest below: each slot names an element on the live page and the
 * Halloween asset that replaces or decorates it. To ship in Webflow, swap the
 * listed image in the Designer (same size), add the overlay, or paste the new
 * section. Removing html.hw-on restores the live page exactly.
 */
(function () {
  'use strict';
  const A = 'halloween/assets/';
  const SND = A + 'audio/';
  // Live promo, read from the site's own couponInfo: code GEMS, 30% off, ends 31 Oct 11:59PM New York time.
  const DEADLINE = Date.parse('2026-10-31T23:59:00-04:00');

  // ---------- Swap manifest ----------
  // kind: img = replace <img> src, overlay = decorative layer, text = copy swap, section = new block.
  const SLOTS = [
    { id: 'promo-bar', kind: 'overlay', label: 'Promo bar', find: () => findText('GET 30% OFF WITH CODE', 'div'),
      note: 'Candle-lit "Trick or Trade" tag and a pumpkin glow on the GEMS chip. Code and deadline unchanged.' },
    { id: 'hero-moon', kind: 'img', label: 'Hero moon halo', find: () => qa('img.travis-bnr-glow-img.for-dsk, img[src*="travis-img-glow"]').find(i => i.offsetParent),
      asset: A + 'hero-glow.webp', note: 'The green grid glow behind the athlete becomes a harvest moon with the same halo and grid. Same 957x772 transparent frame. The athlete image is not touched.' },
    { id: 'hero-scene', kind: 'overlay', label: 'Hero graveyard and fog', find: () => q('.home-banner'),
      asset: A + 'hero-sky.webp', note: 'Graveyard skyline loop (hero-sky.mp4) along the hero floor plus a foreground fog bank (fog-still.mp4), both blend mode screen. One-time intro: fog curtain, lightning, bats leave the moon.' },
    { id: 'hero-eyebrow', kind: 'text', copy: 'copy', label: 'Hero eyebrow', find: () => q('.travis-banner-tag-txt'),
      text: 'HALLOWEEN EDITION · THE BEST FUTURES PROP FIRM', note: 'Copy only. Keeps the existing claim.' },
    { id: 'band', kind: 'section', label: 'Trick or Trade countdown', find: () => q('.hw-band'),
      asset: A + 'band.webp', note: 'New section after the stats row. Live countdown to the GEMS deadline, existing CTA and code. Art: candlestick tombstones climbing toward the moon.' },
    { id: 'how-bg', kind: 'img', label: 'How it works backdrop', find: () => q('.home-v2-how-it-work-bg'),
      asset: A + 'how-bg.webp', note: 'Same 1440x684 frame, graveyard fog and moonlight instead of the green haze.' },
    { id: 'how-1', kind: 'img', label: 'How it works card 1', find: () => qa('.travis-work-card-img')[0],
      asset: A + 'how-1.webp', note: 'Same shot, room redressed with a jack-o-lantern, candles and a cobweb. The "Account funded" card is unchanged. 2:1.' },
    { id: 'how-2', kind: 'img', label: 'How it works card 2', find: () => qa('.travis-work-card-img')[1],
      asset: A + 'how-2.webp', note: 'Phone shot redressed with candles and a jack-o-lantern. Chart unchanged. 2:1.' },
    { id: 'pricing-bg', kind: 'img', label: 'Pricing backdrop', find: () => q('.prt-back-shadow'),
      asset: A + 'pricing-bg.webp', note: 'Wide misty graveyard plate behind the price cards, blend mode screen.' },
    { id: 'pricing-cards', kind: 'overlay', label: 'Price cards', find: () => q('.prt-pp-tag-v2'),
      asset: A + 'web-corner.webp', note: 'Real cobweb sprites on card corners, orange Most Popular badge, a neon rim on the featured card.' },
    { id: 'firms-head', kind: 'text', copy: 'compare', label: 'Firms headline', find: () => findText('We are not like other futures prop firms', 'h2,h3,div'),
      text: 'Other prop firms have skeletons in the closet...', note: 'Comparative copy. Off by default; needs compliance sign-off.' },
    { id: 'firms-other', kind: 'text', copy: 'compare', label: 'Other firms card', find: () => findText('What you get with other firms', 'h3'),
      asset: A + 'ghost.webp', text: 'What haunts you at other firms', note: 'A ghost drifts out of the red card. The copy swap is comparative: off by default.' },
    { id: 'elite-lock', kind: 'img', label: 'Tradeify Elite lock', find: () => q('img[src*="lock-img"]'),
      asset: A + 'elite-lock.webp', note: 'Padlock wrapped in cobweb and chains. Click it: the chains break and the clean lock returns ("We move you to live").' },
    { id: 'mindset-arc', kind: 'img', label: 'Athletes arc', find: () => q('.mindset-bg-img'),
      asset: A + 'mindset-arc.webp', note: 'The green-to-violet swoosh becomes a ribbon of spectral mist with faint ghost faces. Same 1440x801 transparent frame. Athletes untouched.' },
    { id: 'support-headset', kind: 'img', label: '24/7 Support headset', find: () => qa('.get-funded-card-img')[1],
      asset: A + 'support-headset.webp', note: 'Headset resting on a green-lit jack-o-lantern, transparent.' },
    { id: 'discord', kind: 'overlay', label: 'Discord card', find: () => qa('.get-funded-card-img')[2],
      asset: A + 'spider.webp', note: 'Discord logo not altered (their brand rules). A spider drops in on hover.' },
    { id: 'map', kind: 'overlay', label: 'Support map', find: () => q('.map-left-img'),
      asset: A + 'fog-still.webp', note: 'Fog drifts across the dotted map. Language chips unchanged.' },
    { id: 'final-cta', kind: 'overlay', label: 'Final CTA scene', find: () => q('.strategy-sec-main'),
      asset: A + 'hero-sky.webp', note: 'The closing CTA gets the graveyard skyline loop and fog so the page ends on a scene.' },
    { id: 'deals-head', kind: 'text', copy: 'copy', label: 'Newsletter headline', find: () => q('.home-v1-before-ftr-head'),
      text: 'Be the first to get treats, not tricks', note: 'Copy only.' },
    { id: 'footer-sky', kind: 'img', label: 'Footer skyline', find: () => q('.ftr-top-bg'),
      asset: A + 'footer-sky.webp', note: 'Graveyard and dead-tree silhouette strip, 1080x276.' },
  ];

  // ---------- helpers ----------
  function q(s, r) { return (r || document).querySelector(s); }
  function qa(s, r) { return [...(r || document).querySelectorAll(s)]; }
  function findText(start, sel) {
    const lo = start.toLowerCase();
    const hits = qa(sel || '*').filter(e => e.textContent.trim().toLowerCase().startsWith(lo) && e.textContent.length < start.length + 80);
    return hits.sort((a, b) => a.querySelectorAll('*').length - b.querySelectorAll('*').length)[0] || null;
  }
  function el(tag, cls, html) { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function rel(node) { if (node && getComputedStyle(node).position === 'static') node.style.position = 'relative'; return node; }
  function loopVideo(src, cls) {
    const v = el('video', cls); v.muted = true; v.loop = true; v.playsInline = true; v.setAttribute('playsinline', ''); v.preload = 'auto';
    v.addEventListener('error', () => v.remove());
    v.src = src; if (!reduce) v.play().catch(() => {});
    return v;
  }
  const store = {
    get(k, d) { try { const v = localStorage.getItem('hw2.' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('hw2.' + k, JSON.stringify(v)); } catch (e) {} },
  };
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;

  // ---------- state ----------
  const LAYERS = [
    ['fog', 'Fog', 'Fog banks in the hero, band, map and final CTA'],
    ['bats', 'Bats', 'Bats leave the moon, burst on fast scroll and CTA hover'],
    ['webs', 'Cobwebs', 'Real cobwebs on card corners'],
    ['ghost', 'Ghost cursor', 'A small ghost trails your pointer'],
    ['flicker', 'Candle flicker', 'Candle flicker on the promo tag and eyebrow'],
    ['copy', 'Spooky copy', 'Safe copy swaps: eyebrow, newsletter'],
    ['compare', 'Comparative copy', 'Firms-section copy. Needs compliance sign-off'],
    ['sound', 'Sound', 'Night ambience and effects'],
  ];
  const MOODS = {
    subtle: { fog: true, bats: false, webs: true, ghost: false, flicker: false, copy: true, compare: false },
    haunted: { fog: true, bats: true, webs: true, ghost: true, flicker: true, copy: true, compare: false },
    lights: { fog: true, bats: true, webs: true, ghost: false, flicker: true, copy: true, compare: false },
  };
  const params = new URLSearchParams(location.search);
  const state = {
    on: params.get('edition') === 'original' ? false : store.get('on', true),
    mood: store.get('mood', 'haunted'),
    layers: Object.assign({ sound: false }, MOODS.haunted, store.get('layers', {})),
    map: false,
    found: store.get('found', []),
    chrome: true,
  };
  if (!MOODS[state.mood]) state.mood = 'haunted';
  state.layers.sound = false; // browsers need a click before audio; never start loud

  // ---------- slots ----------
  const resolved = [];
  function resolveSlots() {
    resolved.length = 0;
    for (const s of SLOTS) {
      const node = s.find();
      if (!node) continue;
      const r = { slot: s, node };
      if (s.kind === 'img') {
        r.orig = node.getAttribute('src');
        node.removeAttribute('srcset');
        const probe = new Image();
        probe.onload = () => { r.ready = true; applySlot(r); };
        probe.src = s.asset;
      }
      if (s.kind === 'text') r.orig = node.innerHTML;
      node.dataset.hwSlot = s.id;
      resolved.push(r);
    }
  }
  // Some site scripts replace nodes after load (the hero picks an athlete by
  // country; pricing re-renders). Re-find any slot whose node went away.
  function refreshSlots() {
    let changed = false;
    for (const s of SLOTS) {
      const r = resolved.find(x => x.slot === s);
      if (r && r.node.isConnected && (s.kind !== 'img' || r.node.offsetParent)) continue;
      const node = s.find(); if (!node) continue;
      if (r) { if (s.kind === 'img') r.node.src = r.orig; r.node = node; node.dataset.hwSlot = s.id; if (s.kind === 'img') { r.orig = node.getAttribute('src'); node.removeAttribute('srcset'); } applySlot(r); changed = true; continue; }
      const nr = { slot: s, node }; node.dataset.hwSlot = s.id;
      if (s.kind === 'img') { nr.orig = node.getAttribute('src'); node.removeAttribute('srcset'); const p = new Image(); p.onload = () => { nr.ready = true; applySlot(nr); }; p.src = s.asset; }
      if (s.kind === 'text') nr.orig = node.innerHTML;
      resolved.push(nr); changed = true;
    }
    if (changed && state.map) renderMap();
  }
  function applySlot(r) {
    const on = state.on;
    if (r.slot.kind === 'img' && r.ready && !r.hold) {
      r.node.src = on ? r.slot.asset : r.orig;
      r.node.classList.toggle('hw-swapped', on);
    }
    if (r.slot.kind === 'text') r.node.innerHTML = on && state.layers[r.slot.copy] ? r.slot.text : r.orig;
  }
  function applyAll() {
    root.classList.toggle('hw-on', state.on);
    root.classList.toggle('hw-chrome-off', !state.chrome);
    root.dataset.hwMood = state.mood;
    for (const [k] of LAYERS) root.classList.toggle('hw-l-' + k, state.on && !!state.layers[k]);
    resolved.forEach(applySlot);
    lights.toggle(state.on && state.mood === 'lights');
    sound.toggle(state.on && state.layers.sound);
    renderDock();
    if (state.map) placeMap();
    store.set('on', state.on); store.set('mood', state.mood); store.set('layers', Object.assign({}, state.layers, { sound: false }));
  }

  // ---------- decorative DOM ----------
  function decorate() {
    // Hero: graveyard skyline on the floor, fog bank in front, bats leave the moon.
    const hero = q('.home-banner');
    if (hero) {
      hero.classList.add('hw-hero');
      const floor = el('div', 'hw-hero-floor');
      floor.appendChild(loopVideo(A + 'hero-sky.mp4', 'hw-floor-vid'));
      hero.appendChild(floor);
      // Phones: the glow is baked into the athlete photo, so a small moon sits in the corner instead.
      hero.appendChild(el('img', 'hw-mb-moon')).src = A + 'moon.webp';
      const fog = el('div', 'hw-hero-fogbank');
      fog.appendChild(loopVideo(A + 'fog-still.mp4', 'hw-fog-vid'));
      hero.appendChild(fog);
    }
    // Promo bar: candle-lit tag, GEMS chip glows.
    const promo = findText('GET 30% OFF WITH CODE', 'div');
    if (promo) promo.prepend(el('span', 'hw-promo-tag', '<i class="hw-candle"></i>Trick or Trade'));
    // Trick or Trade band after the stats row.
    buildBand();
    // Cobwebs: how-it-works cards, support grid, firms cards.
    addWebs([...qa('.travis-work-card'), ...qa('.get-funded-card'), ...qa('.firm-right-lft-card')]);
    decoratePricing();
    const pricing = q('.tdfy-pricing-section-v2');
    if (pricing) {
      let t;
      new MutationObserver(() => { clearTimeout(t); t = setTimeout(decoratePricing, 120); })
        .observe(pricing, { childList: true, subtree: true });
    }
    // One ghost drifts out of the "other firms" card.
    const other = q('.firm-right-lft-card');
    if (other) { rel(other).classList.add('hw-haunt'); other.appendChild(el('img', 'hw-ghost-out')).src = A + 'ghost.webp'; }
    // Elite lock: click to break the chains.
    const lock = resolved.find(r => r.slot.id === 'elite-lock');
    if (lock) {
      lock.node.classList.add('hw-lock');
      lock.node.addEventListener('click', () => breakLock(lock));
    }
    // Spider on the Discord card.
    const disc = qa('.get-funded-card-img')[2];
    const discCard = disc && disc.closest('[class*=get-funded-card]:not(img)');
    if (discCard) rel(discCard).appendChild(el('div', 'hw-spider', `<i></i><img src="${A}spider.webp" alt="">`));
    // Map: fog drifting across the dots.
    const map = q('.map-left-img');
    if (map) rel(map.parentElement).appendChild(el('div', 'hw-map-fog'));
    // Final CTA: moon, skyline and fog.
    const fin = q('.strategy-sec-main');
    if (fin) {
      rel(fin).classList.add('hw-final');
      const sc = el('div', 'hw-final-scene');
      sc.appendChild(loopVideo(A + 'hero-sky.mp4', 'hw-final-sky'));
      sc.appendChild(loopVideo(A + 'fog-still.mp4', 'hw-final-fog'));
      fin.prepend(sc);
    }
    // Bats burst from every CTA on hover.
    qa('a.tdfy-style-btn').forEach(a => a.addEventListener('mouseenter', () => {
      if (!(state.on && state.layers.bats)) return;
      const r = a.getBoundingClientRect();
      bats.burst(r.left + r.width / 2, r.top + r.height / 2, 5);
    }));
  }

  function addWebs(targets) {
    targets.forEach((t, i) => {
      if (t.querySelector(':scope > .hw-web')) return;
      rel(t).appendChild(el('img', 'hw-web ' + (i % 2 ? 'hw-web-r' : 'hw-web-l'))).src = A + 'web-corner.webp';
    });
  }
  // Pricing is rendered by the site's own script after load and on every tab
  // change, so its decorations are re-applied whenever that DOM changes.
  function decoratePricing() {
    addWebs(qa('.prt-card-faces'));
    qa('.prt-pp-tag-v2').forEach(b => { const c = b.closest('.prt-card-faces'); if (c) c.classList.add('hw-featured'); });
    const s = SLOTS.find(x => x.id === 'pricing-cards'), node = s.find();
    const r = resolved.find(x => x.slot === s);
    if (node && (!r || r.node !== node)) {
      node.dataset.hwSlot = s.id;
      if (r) r.node = node; else resolved.push({ slot: s, node });
      if (state.map) renderMap();
    }
    placePumpkins();
  }

  // ---------- Trick or Trade band ----------
  function buildBand() {
    const after = q('.travis-works-sec-main');
    if (!after) return;
    const cta = qa('a.tdfy-style-btn').find(a => /Get funded/i.test(a.textContent) && !a.classList.contains('header-btn'));
    const band = el('section', 'hw-band');
    band.innerHTML = `
      <div class="hw-band-art"><img src="${A}band.webp" alt=""></div>
      <div class="hw-band-in">
        <div class="hw-band-copy">
          <span class="hw-band-eyebrow"><i class="hw-candle"></i>Halloween sale</span>
          <h2>Trick or Trade.</h2>
          <p>Get 30% off with code <b>GEMS</b>. Ends 31 October, 11:59PM EST.</p>
          <div class="hw-count" aria-label="Time left in the sale">
            ${['Days', 'Hours', 'Min', 'Sec'].map(u => `<div class="hw-cd"><b data-u="${u}">00</b><small>${u}</small></div>`).join('')}
          </div>
          <div class="hw-band-cta"></div>
        </div>
      </div>`;
    band.querySelector('.hw-band-art').appendChild(loopVideo(A + 'fog-still.mp4', 'hw-band-fog'));
    const slot = band.querySelector('.hw-band-cta');
    // The site fills in "- 30% OFF" after load, so re-copy the live button a few times.
    const copyCta = () => {
      const live = qa('a.tdfy-style-btn').find(a => /30%/.test(a.textContent) && !band.contains(a)) || cta;
      if (!live) return; const c = live.cloneNode(true), cur = slot.querySelector('a'); cur ? cur.replaceWith(c) : slot.prepend(c);
    };
    copyCta(); [1200, 3000, 6000].forEach(t => setTimeout(copyCta, t));
    const chip = el('button', 'hw-code-chip', 'Code <b>GEMS</b><span>copy</span>');
    chip.type = 'button';
    chip.addEventListener('click', () => { try { navigator.clipboard.writeText('GEMS'); } catch (e) {} chip.querySelector('span').textContent = 'copied'; sound.play('pop'); });
    slot.appendChild(chip);
    after.after(band);
    const cells = Object.fromEntries(qa('[data-u]', band).map(b => [b.dataset.u, b]));
    const tick = () => {
      let s = Math.max(0, Math.floor((DEADLINE - Date.now()) / 1000));
      const v = { Days: Math.floor(s / 86400), Hours: Math.floor(s % 86400 / 3600), Min: Math.floor(s % 3600 / 60), Sec: s % 60 };
      for (const k in v) {
        const t = String(v[k]).padStart(2, '0');
        if (cells[k].textContent !== t) { cells[k].textContent = t; cells[k].classList.remove('flip'); void cells[k].offsetWidth; cells[k].classList.add('flip'); }
      }
    };
    tick(); setInterval(tick, 1000);
  }

  // ---------- Elite lock: break the chains ----------
  function breakLock(r) {
    if (!state.on || r.busy) return;
    r.busy = true;
    const n = r.node;
    n.classList.add('hw-shake');
    sound.play('creak');
    setTimeout(() => {
      n.classList.remove('hw-shake');
      const b = n.getBoundingClientRect();
      const burst = el('div', 'hw-lock-burst'); burst.style.left = (b.left + b.width * .38) + 'px'; burst.style.top = (b.top + b.height * .55) + 'px';
      document.body.appendChild(burst); setTimeout(() => burst.remove(), 1200);
      sound.play('thunder');
      r.hold = true; n.src = r.orig; n.classList.add('hw-unlocked');
      toast('Unlocked. We move you to live.');
      setTimeout(() => { r.hold = false; n.classList.remove('hw-unlocked'); applySlot(r); r.busy = false; }, 6000);
    }, 650);
  }

  // ---------- intro: fog curtain, lightning, bats leave the moon ----------
  function intro(force) {
    if (!state.on || reduce) return;
    let seen = false; try { seen = sessionStorage.getItem('hw2.intro') === '1'; } catch (e) {}
    if (seen && !force) return;
    try { sessionStorage.setItem('hw2.intro', '1'); } catch (e) {}
    scrollTo({ top: 0 });
    const c = el('div', 'hw-curtain', `<video muted playsinline autoplay loop src="${A}fog-still.mp4"></video>`);
    document.body.appendChild(c);
    setTimeout(() => { flash(); sound.play('thunder'); }, 700);
    setTimeout(() => c.classList.add('lift'), 950);
    setTimeout(() => {
      const moon = q('[data-hw-slot=hero-moon]');
      const m = moon ? moon.getBoundingClientRect() : { left: innerWidth * .65, top: 120, width: 300, height: 200 };
      for (let i = 0; i < 3; i++) setTimeout(() => bats.burst(m.left + m.width / 2, m.top + m.height * .35, 7), i * 160);
      sound.play('bats');
    }, 1300);
    setTimeout(() => c.remove(), 2600);
  }
  function flash() { if (reduce) return; const f = el('div', 'hw-flash'); document.body.appendChild(f); setTimeout(() => f.remove(), 900); }

  // ---------- bats (canvas) ----------
  const bats = (() => {
    const c = el('canvas', 'hw-bats'); const ctx = c.getContext('2d');
    let list = [], raf = 0, dpr = 1;
    function size() { dpr = Math.min(2, devicePixelRatio || 1); c.width = innerWidth * dpr; c.height = innerHeight * dpr; }
    function burst(x, y, n) {
      if (reduce) return;
      for (let i = 0; i < n; i++) {
        const a = -Math.PI / 2 + (Math.random() - .5) * 2.6;
        const sp = 3 + Math.random() * 4.5;
        list.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, s: 9 + Math.random() * 12, t: Math.random() * 6, life: 0 });
      }
      if (!raf) raf = requestAnimationFrame(tick);
    }
    function drawBat(b) {
      const flap = Math.sin(b.t) * .9;
      ctx.save(); ctx.translate(b.x * dpr, b.y * dpr); ctx.scale(b.s * dpr / 10, b.s * dpr / 10);
      ctx.rotate(Math.atan2(b.vy, b.vx) * .25);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(-4, -4 * flap - 2, -10, -6 * flap);
      ctx.quadraticCurveTo(-7, -1, -6, 1); ctx.quadraticCurveTo(-4, 0, -3, 2);
      ctx.quadraticCurveTo(-1, 1, 0, 3);
      ctx.quadraticCurveTo(1, 1, 3, 2); ctx.quadraticCurveTo(4, 0, 6, 1);
      ctx.quadraticCurveTo(7, -1, 10, -6 * flap);
      ctx.quadraticCurveTo(4, -4 * flap - 2, 0, 0);
      ctx.fillStyle = '#040505'; ctx.fill();
      ctx.strokeStyle = 'rgba(57,255,124,.5)'; ctx.lineWidth = .5; ctx.stroke();
      ctx.restore();
    }
    function tick() {
      ctx.clearRect(0, 0, c.width, c.height);
      list = list.filter(b => b.life < 170 && b.y > -40 && b.x > -40 && b.x < innerWidth + 40);
      for (const b of list) {
        b.life++; b.t += .55; b.vx += (Math.random() - .5) * .5; b.vy += (Math.random() - .5) * .4 - .03;
        b.x += b.vx; b.y += b.vy; drawBat(b);
      }
      raf = list.length ? requestAnimationFrame(tick) : 0;
    }
    addEventListener('resize', size); size();
    document.body.appendChild(c);
    let lastY = scrollY, lastT = performance.now(), cool = 0;
    addEventListener('scroll', () => {
      const now = performance.now(), v = Math.abs(scrollY - lastY) / Math.max(1, now - lastT);
      lastY = scrollY; lastT = now;
      if (state.on && state.layers.bats && v > 2.2 && now > cool) {
        cool = now + 1600;
        burst(Math.random() < .5 ? 40 : innerWidth - 40, innerHeight - 30, 9);
        sound.play('bats', .5);
      }
    }, { passive: true });
    return { burst };
  })();

  // ---------- ghost cursor ----------
  (() => {
    const g = el('img', 'hw-cursor-ghost'); g.src = A + 'ghost.webp'; g.alt = '';
    document.body.appendChild(g);
    let x = -100, y = -100, gx = -100, gy = -100, idle = 0;
    addEventListener('pointermove', e => { x = e.clientX; y = e.clientY; idle = 0; }, { passive: true });
    (function loop() {
      gx += (x - gx) * .07; gy += (y - gy) * .07; idle++;
      g.style.transform = `translate(${gx + 16}px, ${gy + 10}px) rotate(${(x - gx) * .12}deg)`;
      g.style.opacity = idle > 120 ? .12 : .8;
      requestAnimationFrame(loop);
    })();
  })();

  // ---------- lights out (lantern) ----------
  const lights = (() => {
    const d = el('div', 'hw-lights');
    document.body.appendChild(d);
    const move = e => { const p = e.touches ? e.touches[0] : e; d.style.setProperty('--mx', p.clientX + 'px'); d.style.setProperty('--my', p.clientY + 'px'); };
    addEventListener('pointermove', move, { passive: true });
    addEventListener('touchmove', move, { passive: true });
    d.style.setProperty('--mx', '50vw'); d.style.setProperty('--my', '40vh');
    return { toggle(v) { d.classList.toggle('on', v); } };
  })();

  // ---------- sound (Mirelo-generated files) ----------
  const sound = (() => {
    const amb = new Audio(SND + 'ambience.mp3'); amb.loop = true; amb.volume = 0; amb.preload = 'none';
    let on = false, fade;
    const fx = {};
    function play(name, vol) {
      if (!on) return;
      try { const a = (fx[name] = fx[name] || new Audio(SND + name + '.mp3')).cloneNode(); a.volume = vol || .6; a.play().catch(() => {}); } catch (e) {}
    }
    return {
      play,
      toggle(v) {
        if (v === on) return; on = v; clearInterval(fade);
        if (v) amb.play().catch(() => {});
        fade = setInterval(() => {
          amb.volume = Math.max(0, Math.min(.45, amb.volume + (v ? .03 : -.05)));
          if ((v && amb.volume >= .45) || (!v && amb.volume <= 0)) { clearInterval(fade); if (!v) amb.pause(); }
        }, 60);
      },
    };
  })();

  // ---------- pumpkin hunt (tucked into the content) ----------
  // Each pumpkin sits inside a real element so it reads as part of the scene.
  const HIDES = [
    { name: 'Hero', host: () => q('.home-banner'), css: 'left:40%;bottom:7%;--r:-8deg' },
    { name: 'Payout certificates', host: () => q('.crt-outer'), css: 'right:6%;top:-22px;--r:10deg' },
    { name: 'Pricing', host: () => qa('.prt-card-faces.front').slice(-1)[0], css: 'right:12px;top:12px;--r:12deg;--s:.75' },
    { name: 'Tradeify Elite', host: () => { const l = q('img.hw-lock'); return l && l.parentElement; }, css: 'left:12%;bottom:6%;--r:6deg' },
    { name: 'Support map', host: () => q('.map-left-img') && q('.map-left-img').parentElement, css: 'left:58%;top:38%;--s:.75' },
    { name: 'Blog', host: () => q('.new-blog-sec img.cmn-img') && q('.new-blog-sec img.cmn-img').parentElement, css: 'right:10px;bottom:10px;--r:-10deg;--s:.85' },
    { name: 'Footer', host: () => q('.ftr-top-bg') && q('.ftr-top-bg').parentElement, css: 'right:18%;bottom:8px;--s:.9' },
  ];
  const pumpkins = new Map();
  function placePumpkins() {
    HIDES.forEach((h, i) => {
      const host = h.host(); if (!host) return;
      const old = pumpkins.get(i);
      if (old && old.isConnected && old.parentElement === host) return;
      const p = el('button', 'hw-pumpkin' + (state.found.includes(i) ? ' found' : ''), `<img src="${A}pumpkin.webp" alt="">`);
      p.type = 'button'; p.setAttribute('aria-label', 'Hidden pumpkin: ' + h.name); p.style.cssText = h.css;
      p.addEventListener('click', e => {
        e.preventDefault(); e.stopPropagation();
        if (state.found.includes(i)) return;
        state.found.push(i); store.set('found', state.found);
        p.classList.add('found', 'pop');
        const r = p.getBoundingClientRect();
        bats.burst(r.left + r.width / 2, r.top, 4); sound.play('pop');
        renderDock();
        if (state.found.length === HIDES.length) setTimeout(reward, 500); else toast(`Pumpkin ${state.found.length} of ${HIDES.length}`);
      });
      rel(host).appendChild(p); pumpkins.set(i, p);
    });
  }
  function reward() {
    const m = el('div', 'hw-modal');
    m.innerHTML = `<div class="hw-modal-card hw-reward">
      <div class="hw-reward-row">${HIDES.map((_, i) => `<img src="${A}pumpkin.webp" alt="" style="animation-delay:${i * 90}ms">`).join('')}</div>
      <h3>All ${HIDES.length} pumpkins found</h3>
      <p>Your treat: the Halloween code.</p>
      <button class="hw-code" type="button">GEMS <span>copy</span></button>
      <p class="hw-small">30% off. Same code as the live promo. Ends 31 October, 11:59PM EST.</p>
      <button class="hw-close" type="button" aria-label="Close">×</button></div>`;
    m.addEventListener('click', e => { if (e.target === m || e.target.closest('.hw-close')) m.remove(); });
    m.querySelector('.hw-code').addEventListener('click', ev => {
      try { navigator.clipboard.writeText('GEMS'); } catch (e) {}
      ev.currentTarget.querySelector('span').textContent = 'copied';
    });
    document.body.appendChild(m);
    sound.play('thunder', .4);
    for (let i = 0; i < 4; i++) setTimeout(() => bats.burst(innerWidth / 2, innerHeight / 2, 6), i * 180);
  }
  let toastT;
  function toast(msg) {
    let t = q('.hw-toast'); if (!t) { t = el('div', 'hw-toast'); document.body.appendChild(t); }
    t.textContent = msg; t.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 2200);
  }

  // ---------- swap map + compare ----------
  let mapLayer;
  function renderMap() {
    if (mapLayer) mapLayer.remove(); mapLayer = null;
    root.classList.toggle('hw-mapping', state.map);
    resolved.forEach(r => r.node.classList.toggle('hw-outline', state.map));
    if (!state.map) return;
    mapLayer = el('div', 'hw-map');
    resolved.forEach((r, i) => {
      const tag = el('button', 'hw-map-tag k-' + r.slot.kind, `<b>${i + 1}</b>${r.slot.label}<em>${r.slot.kind}</em>`);
      tag.type = 'button';
      tag.addEventListener('click', e => { e.stopPropagation(); compare(r); });
      tag._r = r; mapLayer.appendChild(tag);
    });
    document.body.appendChild(mapLayer);
    placeMap();
  }
  function placeMap() {
    if (!mapLayer) return;
    [...mapLayer.children].forEach(t => {
      const b = t._r.node.getBoundingClientRect();
      t.style.transform = `translate(${Math.max(6, b.left + scrollX)}px, ${b.top + scrollY}px)`;
      t.style.display = b.width || b.height ? '' : 'none';
    });
  }
  addEventListener('resize', placeMap); addEventListener('load', placeMap);
  function compare(r) {
    const s = r.slot;
    const m = el('div', 'hw-modal');
    let body = '';
    if (s.kind === 'img') {
      body = `<div class="hw-cmp"><img src="${r.orig}" alt="Original"><div class="hw-cmp-top"><img src="${s.asset}" alt="Halloween"></div><i class="hw-cmp-bar"></i>
        <input type="range" min="0" max="100" value="50" aria-label="Before and after"><span class="hw-cmp-l">Original</span><span class="hw-cmp-r">Halloween</span></div>`;
    } else if (s.kind === 'text') {
      body = `<div class="hw-txt"><div><small>Original</small><p>${r.orig}</p></div><div><small>Halloween</small><p>${s.text}</p></div></div>`;
    } else if (s.asset) {
      body = `<div class="hw-ov"><img src="${s.asset}" alt=""></div>`;
    }
    m.innerHTML = `<div class="hw-modal-card hw-cmp-card"><div class="hw-cmp-head"><span class="hw-kind k-${s.kind}">${s.kind}</span><h3>${s.label}</h3></div>
      ${body}<p class="hw-note">${s.note}</p>
      <div class="hw-meta"><code>slot: ${s.id}</code>${s.asset ? `<code>${s.asset}</code>` : ''}${r.orig && s.kind === 'img' ? `<code>replaces ${r.orig.split('/').pop()}</code>` : ''}</div>
      <button class="hw-close" type="button" aria-label="Close">×</button></div>`;
    m.addEventListener('click', e => { if (e.target === m || e.target.closest('.hw-close')) m.remove(); });
    const rng = m.querySelector('input[type=range]');
    if (rng) {
      const top = m.querySelector('.hw-cmp-top'), bar = m.querySelector('.hw-cmp-bar');
      const upd = () => { top.style.clipPath = `inset(0 0 0 ${rng.value}%)`; bar.style.left = rng.value + '%'; };
      rng.addEventListener('input', upd); upd();
    }
    document.body.appendChild(m);
  }

  // ---------- dock ----------
  let dock;
  function buildDock() {
    dock = el('aside', 'hw-dock' + (store.get('dockOpen', innerWidth > 767) ? ' open' : ''));
    dock.setAttribute('aria-label', 'Halloween edition controls');
    document.body.appendChild(dock);
    dock.addEventListener('click', e => {
      const b = e.target.closest('[data-act]'); if (!b) return;
      const act = b.dataset.act, v = b.dataset.v;
      if (act === 'fab') { dock.classList.toggle('open'); store.set('dockOpen', dock.classList.contains('open')); return; }
      if (act === 'edition') { state.on = v === 'on'; if (state.on) { flash(); sound.play('thunder', .4); } }
      if (act === 'mood') { state.mood = v; Object.assign(state.layers, MOODS[v]); state.on = true; if (v === 'lights') toast('Lights out. Your pointer is the lantern. Pumpkins glow in the dark.'); }
      if (act === 'layer') state.layers[v] = !state.layers[v];
      if (act === 'map') { state.map = !state.map; renderMap(); }
      if (act === 'reset') { state.found = []; store.set('found', []); pumpkins.forEach(p => p.classList.remove('found', 'pop')); }
      if (act === 'intro') { state.on = true; applyAll(); intro(true); return; }
      if (act === 'hide') { state.chrome = false; state.map = false; renderMap(); toast('Controls hidden. Press H to bring them back.'); }
      applyAll();
    });
    addEventListener('keydown', e => {
      if (e.key.toLowerCase() !== 'h' || /input|textarea/i.test(e.target.tagName)) return;
      state.chrome = !state.chrome; if (!state.chrome) { state.map = false; renderMap(); } applyAll();
    });
  }
  function renderDock() {
    if (!dock) return;
    const n = state.found.length;
    dock.innerHTML = `
      <button class="hw-fab" data-act="fab" type="button" aria-label="Toggle controls"><img src="${A}pumpkin.webp" alt=""><span class="hw-fab-count">${n}/${HIDES.length}</span></button>
      <div class="hw-panel">
        <div class="hw-h">Halloween edition <span>v2 review</span></div>
        <div class="hw-seg">
          <button data-act="edition" data-v="off" class="${!state.on ? 'is' : ''}" type="button">Original</button>
          <button data-act="edition" data-v="on" class="${state.on ? 'is' : ''}" type="button">Halloween</button>
        </div>
        <div class="hw-lbl">Mood</div>
        <div class="hw-seg hw-seg3">
          ${[['subtle', 'Subtle'], ['haunted', 'Haunted'], ['lights', 'Lights out']].map(([k, t]) => `<button data-act="mood" data-v="${k}" class="${state.on && state.mood === k ? 'is' : ''}" type="button">${t}</button>`).join('')}
        </div>
        <div class="hw-lbl">Layers</div>
        <div class="hw-chips">${LAYERS.map(([k, t, d]) => `<button data-act="layer" data-v="${k}" title="${d}" class="${state.layers[k] ? 'is' : ''}${k === 'compare' ? ' warn' : ''}${k === 'sound' ? ' snd' : ''}" ${state.on ? '' : 'disabled'} type="button">${k === 'sound' ? (state.layers.sound ? 'Sound on' : 'Sound off') : t}</button>`).join('')}</div>
        <div class="hw-row2">
          <button class="hw-map-btn ${state.map ? 'is' : ''}" data-act="map" type="button">Swap map <small>${resolved.length}</small></button>
          <button class="hw-mini" data-act="intro" type="button">Replay intro</button>
        </div>
        <div class="hw-hunt"><div><img src="${A}pumpkin.webp" alt=""> Pumpkin hunt <b>${n} of ${HIDES.length}</b></div>
          <div class="hw-bar"><i style="width:${n / HIDES.length * 100}%"></i></div>
          ${n ? '<button data-act="reset" type="button">reset</button>' : '<small>Tucked into the page. Try Lights out.</small>'}</div>
        <button class="hw-hide" data-act="hide" type="button">Hide controls (H)</button>
      </div>`;
  }

  // ---------- boot ----------
  function boot() {
    resolveSlots(); decorate(); refreshSlots(); placePumpkins(); buildDock(); applyAll();
    [800, 2000, 4500].forEach(t => setTimeout(() => { refreshSlots(); placePumpkins(); }, t));
    setTimeout(() => intro(false), 400);
    addEventListener('scroll', () => { if (state.map) placeMap(); }, { passive: true });
    window.TradeifyHalloween = { SLOTS, state, setEdition: v => { state.on = !!v; applyAll(); } };
  }
  if (document.readyState === 'complete') boot(); else addEventListener('load', boot);
})();
