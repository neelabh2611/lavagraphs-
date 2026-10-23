/* ============================================================================
   TRANCE LAB — PARTY MODE UI: trance stack, macro bank, rhythm, variation
   Every control in this file writes a key that core.js reads as a uniform.
   ========================================================================= */

/* ========================================================== LEFT — TRANCE */
function buildTrancePane(){
  const frag = document.createDocumentFragment();

  let s = section('Trance Mode', true);
  const mast = document.createElement('div');
  mast.className = 'mast';
  mast.innerHTML =
    '<div class="mastrow"><span>TRANCE MODE</span><div class="tg" id="tranceTg"></div></div>' +
    '<div class="mastsub" id="tranceSub">PSYCHEDELIC STACK</div>';
  s.body.appendChild(mast);
  const tg = mast.querySelector('#tranceTg');
  const paintTg = () => {
    tg.classList.toggle('on', !!state.trance);
    mast.classList.toggle('live', !!state.trance);
    const sub = mast.querySelector('#tranceSub');
    if (sub) sub.textContent = state.trance
      ? 'ACTIVE · ' + tranceActiveCount() + ' EFFECTS · ' +
        Math.round(state.tranceIntensity*100) + '%'
      : 'DISABLED · CLICK TO ENGAGE';
  };
  tg.addEventListener('click', () => { set('trance', !state.trance); paintTg(); });
  syncers.push(paintTg); paintTg();

  s.body.appendChild(mkSlider('Intensity', 'tranceIntensity', 0, 1, 0.01, pct));
  frag.appendChild(s.sec);

  s = section('Kaleidoscope & Symmetry', true);
  s.body.appendChild(mkSlider('Amount', 'kaleido', 0, 1, 0.01, pct));
  s.body.appendChild(mkSlider('Segments', 'kaleidoSeg', 2, 24, 1, f0));
  s.body.appendChild(mkSlider('Axis rotation', 'kaleidoRotate', 0, 1, 0.01, f2));
  frag.appendChild(s.sec);

  s = section('Recursive Tunnel', true);
  s.body.appendChild(mkSlider('Amount', 'tunnel', 0, 0.96, 0.01, pct));
  s.body.appendChild(mkSlider('Depth', 'tunnelDepth', 0, 1, 0.01, f2));
  s.body.appendChild(mkSlider('Speed', 'tunnelSpeed', 0, 1, 0.01, f2));
  s.body.appendChild(mkSlider('Warp', 'tunnelWarp', 0, 1, 0.01, f2));
  frag.appendChild(s.sec);

  s = section('Fractal & Contours', true);
  s.body.appendChild(mkSlider('Fractal fill', 'fractal', 0, 1, 0.01, pct));
  s.body.appendChild(mkSlider('Topographic lines', 'contourLine', 0, 1.5, 0.01, f2));
  s.body.appendChild(mkSlider('Scale', 'fractalScale', 0.5, 8, 0.05, f2));
  frag.appendChild(s.sec);

  s = section('GPU Feedback', true);
  s.body.appendChild(mkSlider('Feedback', 'feedback', 0, 1, 0.01, pct));
  s.body.appendChild(mkSlider('Trail length', 'trailLength', 0, 1, 0.01, pct));
  s.body.appendChild(mkSlider('Zoom', 'feedbackZoom', -1, 1, 0.01, f2));
  s.body.appendChild(mkSlider('Rotate', 'feedbackRotate', -1, 1, 0.01, f2));
  const fbBtn = document.createElement('button');
  fbBtn.className = 'btn';
  fbBtn.style.cssText = 'width:100%;margin-top:8px';
  fbBtn.textContent = 'RESET FEEDBACK BUFFER';
  fbBtn.addEventListener('click', () => {
    Renderer.resetFeedback();
    toast('FEEDBACK BUFFER CLEARED');
  });
  s.body.appendChild(fbBtn);
  frag.appendChild(s.sec);

  s = section('Liquid Optics', false);
  s.body.appendChild(mkSlider('Lens distortion', 'lens', 0, 1, 0.01, pct));
  s.body.appendChild(mkSlider('Pinch / bulge', 'lensPinch', 0, 1, 0.01, f2));
  s.body.appendChild(mkSlider('Wave interference', 'waveInterf', 0, 1, 0.01, pct));
  frag.appendChild(s.sec);

  s = section('Psychedelic Typography', true);
  s.body.appendChild(mkSlider('Elastic stretch', 'elastic', 0, 1, 0.01, pct));
  s.body.appendChild(mkSlider('Melt / drip', 'meltRise', 0, 1, 0.01, pct));
  s.body.appendChild(mkSlider('Spiral warp', 'spiral', 0, 1, 0.01, pct));
  s.body.appendChild(mkSlider('Perspective', 'perspective', 0, 1, 0.01, pct));
  s.body.appendChild(mkSlider('Fragmentation', 'fragment', 0, 1, 0.01, pct));
  s.body.appendChild(mkSlider('Line stagger', 'lineStagger', 0, 1, 0.01, pct));
  s.body.appendChild(mkSlider('Char animation', 'charAnim', 0, 1, 0.01, pct));
  frag.appendChild(s.sec);

  s = section('Colour & Finish', false);
  s.body.appendChild(mkSlider('Chromatic split', 'chromaSplit', 0, 2, 0.01, f2));
  s.body.appendChild(mkSlider('Hue cycle', 'colorCycle', 0, 3, 0.01, f2));
  s.body.appendChild(mkSlider('Hue offset', 'hueShift', -3.14, 3.14, 0.01, f2));
  s.body.appendChild(mkSlider('Saturation', 'saturation', 0, 3, 0.01, f2));
  s.body.appendChild(mkSlider('Contrast', 'contrast', 0.2, 2.5, 0.01, f2));
  s.body.appendChild(mkSlider('Posterize', 'posterize', 0, 1, 0.01, pct));
  s.body.appendChild(mkSlider('Scanlines', 'scanline', 0, 1, 0.01, pct));
  s.body.appendChild(mkSlider('Halation', 'halation', 0, 1.5, 0.01, f2));
  s.body.appendChild(mkSlider('Grain', 'grain', 0, 1, 0.01, pct));
  s.body.appendChild(mkToggle('Invert', 'invert'));
  frag.appendChild(s.sec);

  s = section('Safety', false);
  s.body.appendChild(mkToggle('Reduced flashing', 'reducedFlash'));
  s.body.appendChild(mkToggle('Reduce motion', 'reduceMotion'));
  const pn = document.createElement('div');
  pn.className = 'note';
  pn.innerHTML = 'Reduced flashing soft-clips bright transient pulses. Reduce motion ' +
    'damps every animated band. Press <b>ESC</b> for an immediate freeze.';
  s.body.appendChild(pn);
  frag.appendChild(s.sec);

  return frag;
}

function tranceActiveCount(){
  const k = ['kaleido','tunnel','fractal','contourLine','feedback','lens','waveInterf',
             'chromaSplit','posterize','scanline','halation','colorCycle'];
  let n = 0;
  for (const x of k) if ((state[x]||0) > 0.002) n++;
  if (state.invert) n++;
  return n;
}

/* ====================================================== RIGHT — PARTY MODE */
function buildPartyPane(){
  const frag = document.createDocumentFragment();

  let s = section('Party Mode', true);
  const mast = document.createElement('div');
  mast.className = 'mast party';
  mast.innerHTML =
    '<div class="mastrow"><span>PARTY MODE</span><div class="tg" id="partyTg"></div></div>' +
    '<div class="mastsub" id="partySub">MACRO CONTROL SURFACE</div>';
  s.body.appendChild(mast);
  const tg = mast.querySelector('#partyTg');
  const paintTg = () => {
    tg.classList.toggle('on', !!state.party);
    mast.classList.toggle('live', !!state.party);
    const sub = mast.querySelector('#partySub');
    if (sub) sub.textContent = state.party
      ? 'LIVE · ENERGY ' + Math.round(state.energy*100) +
        ' · CHAOS ' + Math.round(state.chaos*100)
      : 'DISABLED · MACROS BYPASSED';
  };
  tg.addEventListener('click', () => { set('party', !state.party); paintTg(); });
  syncers.push(paintTg); paintTg();

  const insane = document.createElement('button');
  insane.className = 'btn pri insane';
  insane.style.cssText = 'width:100%;margin-top:9px;letter-spacing:.16em';
  insane.textContent = 'GENERATE SOMETHING INSANE';
  insane.addEventListener('click', () => generateInsane());
  s.body.appendChild(insane);
  frag.appendChild(s.sec);

  s = section('Macro Bank', true);
  const grid = document.createElement('div');
  grid.className = 'macroGrid';
  const MACROS = [
    ['energy','ENERGY'], ['chaos','CHAOS'], ['beatResponse','BEAT RESP'],
    ['liquidity','LIQUIDITY'], ['geometry','GEOMETRY'], ['distortion','DISTORT'],
    ['glowMacro','GLOW'], ['colorMadness','COLOR'], ['typeForce','TYPE FORCE'],
    ['feedbackMacro','FEEDBACK'], ['depth','DEPTH'], ['motionSpeed','MOTION'],
    ['trailMacro','TRAIL'],
  ];
  MACROS.forEach(([k, label]) => grid.appendChild(macroDial(label, k)));
  s.body.appendChild(grid);
  const mn = document.createElement('div');
  mn.className = 'note';
  mn.innerHTML = 'Each macro multiplies a whole group of shader parameters, so it ' +
    'stacks with the individual sliders instead of overriding them.';
  s.body.appendChild(mn);
  frag.appendChild(s.sec);

  s = section('Lasers & Geometry', true);
  s.body.appendChild(mkSlider('Neon beams', 'lasers', 0, 1.6, 0.01, f2));
  s.body.appendChild(mkSlider('Beam count', 'laserCount', 2, 24, 1, f0));
  s.body.appendChild(mkSlider('Beam width', 'laserWidth', 0, 1, 0.01, f2));
  s.body.appendChild(mkSlider('Beam speed', 'laserSpeed', 0, 1, 0.01, f2));
  s.body.appendChild(subLabel('CATHEDRAL RINGS'));
  s.body.appendChild(mkSlider('Rings', 'rings', 0, 1.6, 0.01, f2));
  s.body.appendChild(mkSlider('Ring count', 'ringCount', 1, 24, 1, f0));
  s.body.appendChild(mkSlider('Ring thickness', 'ringThickness', 0, 1, 0.01, f2));
  s.body.appendChild(subLabel('WIREFRAME / BURSTS'));
  s.body.appendChild(mkSlider('Grid', 'gridLines', 0, 1.6, 0.01, f2));
  s.body.appendChild(mkSlider('Grid scale', 'gridScale', 1, 30, 0.1, f1));
  s.body.appendChild(mkSlider('Radial bursts', 'bursts', 0, 1.8, 0.01, f2));
  frag.appendChild(s.sec);

  s = section('Typography Behaviour', true);
  s.body.appendChild(mkSeg('Behaviour', 'typeBehaviour', [
    {value:'monumental', label:'MONUMENT'}, {value:'liquid', label:'LIQUID'},
    {value:'glitch', label:'GLITCH'}, {value:'explosive', label:'EXPLODE'},
    {value:'chrome', label:'CHROME'}, {value:'hypnotic', label:'HYPNOTIC'},
  ]));
  s.body.appendChild(mkSlider('Type force', 'typeForce', 0, 1, 0.01, pct));
  s.body.appendChild(subLabel('DIMENSION'));
  s.body.appendChild(mkSlider('Extrusion', 'extrude', 0, 1, 0.01, pct));
  s.body.appendChild(mkSlider('Neon outline', 'neonOutline', 0, 1, 0.01, pct));
  s.body.appendChild(subLabel('MOTION'));
  s.body.appendChild(mkSlider('Elastic', 'elastic', 0, 1, 0.01, pct));
  s.body.appendChild(mkSlider('Fragmentation', 'fragment', 0, 1, 0.01, pct));
  s.body.appendChild(mkSlider('Perspective', 'perspective', 0, 1, 0.01, pct));
  s.body.appendChild(mkSlider('Spiral', 'spiral', 0, 1, 0.01, pct));
  s.body.appendChild(mkSlider('Line stagger', 'lineStagger', 0, 1, 0.01, pct));
  s.body.appendChild(mkSlider('Char animation', 'charAnim', 0, 1, 0.01, pct));
  s.body.appendChild(mkSlider('Melt / drip', 'meltRise', 0, 1, 0.01, pct));
  frag.appendChild(s.sec);

  s = section('Rhythm / Audio', true);
  s.body.appendChild(mkSeg('Source', 'rhythmMode', [
    {value:'off', label:'OFF'}, {value:'manual', label:'MANUAL'},
    {value:'audio', label:'FILE'}, {value:'mic', label:'MIC'},
  ]));
  const audioRow = document.createElement('div');
  audioRow.style.cssText = 'display:flex;gap:6px;margin:8px 0';
  const mkA = (label, fn) => {
    const b = document.createElement('button');
    b.className = 'btn'; b.style.flex = '1';
    b.style.padding = '7px 0'; b.style.fontSize = '8px';
    b.textContent = label;
    b.addEventListener('click', fn);
    return b;
  };
  audioRow.append(
    mkA('LOAD', () => $q('#fileAudio').click()),
    mkA('MIC', async () => {
      try {
        await Beat.useMic();
        set('rhythmMode', 'mic');
        toast('MICROPHONE LIVE');
      } catch(e){
        toast('MIC FAILED — ' + String(e.message||'').slice(0,40).toUpperCase(), 3600);
      }
    }),
    mkA('STOP', () => { Beat.stop(); set('rhythmMode', 'off'); toast('AUDIO STOPPED'); })
  );
  s.body.appendChild(audioRow);

  const meter = document.createElement('div');
  meter.className = 'meterWrap';
  meter.innerHTML =
    '<div class="mrow"><span>BASS</span><i id="mBass"></i></div>' +
    '<div class="mrow"><span>MID</span><i id="mMid"></i></div>' +
    '<div class="mrow"><span>HIGH</span><i id="mHigh"></i></div>' +
    '<div class="mrow"><span>BEAT</span><i id="mBeat"></i></div>';
  s.body.appendChild(meter);

  s.body.appendChild(mkSlider('Sensitivity', 'audioSens', 0.1, 3, 0.01, f2));
  s.body.appendChild(mkSlider('Smoothing', 'audioSmooth', 0, 0.98, 0.01, f2));
  s.body.appendChild(mkSlider('Audio offset', 'audioOffset', -0.5, 0.5, 0.01, f2));
  s.body.appendChild(subLabel('MANUAL CLOCK'));
  s.body.appendChild(mkSlider('BPM', 'bpm', 40, 220, 1, f0));
  s.body.appendChild(mkSlider('Beat subdivision', 'beatSub', 1, 8, 1, f0));
  s.body.appendChild(subLabel('MAPPING'));
  s.body.appendChild(mkSlider('Bass → liquid / zoom', 'bassAmt', 0, 1, 0.01, pct));
  s.body.appendChild(mkSlider('Mid → elasticity', 'midAmt', 0, 1, 0.01, pct));
  s.body.appendChild(mkSlider('High → glow / sparks', 'trebleAmt', 0, 1, 0.01, pct));
  s.body.appendChild(mkSlider('Beat → bursts', 'beatAmt', 0, 1, 0.01, pct));
  frag.appendChild(s.sec);

  s = section('Variation & Locks', false);
  const varBtn = document.createElement('button');
  varBtn.className = 'btn';
  varBtn.style.cssText = 'width:100%;margin-bottom:7px';
  varBtn.textContent = 'GENERATE VARIATION';
  varBtn.addEventListener('click', () => generateVariation());
  s.body.appendChild(varBtn);

  const lockWrap = document.createElement('div');
  lockWrap.className = 'locks';
  lockWrap.innerHTML = '<div class="lockTitle">PRESERVE DURING VARIATION</div>';
  [['lockText','TEXT & LAYOUT'], ['lockPalette','PALETTE'], ['lockSeed','SEED'],
   ['lockGeometry','GEOMETRY'], ['lockTypo','TYPOGRAPHY'], ['lockMotion','MOTION']]
    .forEach(function(pair){
      const row = document.createElement('label');
      row.className = 'lockRow';
      row.innerHTML = '<input type="checkbox" data-lock="' + pair[0] + '"> <span>' +
                      pair[1] + '</span>';
      lockWrap.appendChild(row);
    });
  s.body.appendChild(lockWrap);
  frag.appendChild(s.sec);

  return frag;
}

/* a compact vertical macro dial */
function macroDial(label, key){
  const d = document.createElement('div');
  d.className = 'macro';
  d.innerHTML = '<div class="macroFill"></div><div class="macroIn">' +
                '<b>' + label + '</b><s></s></div>';
  const fill = d.querySelector('.macroFill');
  const val = d.querySelector('s');
  let drag = false, startY = 0, startV = 0;
  const isMotion = () => key === 'motionSpeed';

  const paint = () => {
    const p = isMotion()
      ? clamp((state[key]-0.1)/2.4, 0, 1)
      : clamp(state[key], 0, 1);
    fill.style.height = (p*100)+'%';
    val.textContent = isMotion() ? state[key].toFixed(2) : String(Math.round(state[key]*100));
  };

  d.addEventListener('pointerdown', e => {
    drag = true; startY = e.clientY; startV = state[key];
    try { d.setPointerCapture(e.pointerId); } catch(_){}
    d.classList.add('drag');
    e.preventDefault();
  });
  d.addEventListener('pointermove', e => {
    if (!drag) return;
    const span = isMotion() ? 2.4 : 1;
    let v = startV + (startY - e.clientY)/160 * span;
    v = isMotion() ? clamp(+v.toFixed(2), 0.1, 2.5) : clamp(+v.toFixed(3), 0, 1);
    set(key, v);
    paint();
  });
  const up = e => {
    if (!drag) return;
    drag = false;
    d.classList.remove('drag');
    try { d.releasePointerCapture(e.pointerId); } catch(_){}
  };
  d.addEventListener('pointerup', up);
  d.addEventListener('pointercancel', up);

  syncers.push(paint);
  paint();
  return d;
}

/* rhythm meters, driven from the render loop */
function paintMeters(){
  const setBar = (id, v) => {
    const e = document.getElementById(id);
    if (e) e.style.width = Math.round(clamp(v,0,1)*100) + '%';
  };
  setBar('mBass', Beat.bass);
  setBar('mMid', Beat.mid);
  setBar('mHigh', Beat.treble);
  setBar('mBeat', Beat.value);
}


/* ------------------------------------------------------------ PRESET BROWSER
   Cards render through the real WebGL pipeline via Renderer.renderThumb(),
   so what you see on the card is what the engine actually produces. */
let presetBrowserEl = null;
let presetFilter = 'all';

const PRESET_GROUPS = [
  { id:'all',     label:'ALL' },
  { id:'hardcore',label:'HARDCORE' },
  { id:'liquid',  label:'LIQUID' },
  { id:'neon',    label:'NEON' },
  { id:'disco',   label:'DISCO' },
  { id:'classic', label:'CLASSIC' },
];

function buildPresetBrowser(){
  const frag = document.createDocumentFragment();

  let s = section('Preset Browser', true);
  s.body.appendChild(mkSeg('', 'presetFilterSeg', PRESET_GROUPS.map(g => ({
    value: g.id, label: g.label
  }))));
  /* the seg writes to state; mirror it into our local filter instead */
  const seg = s.body.querySelector('.seg');
  if (seg) seg.addEventListener('click', e => {
    const b = e.target.closest('button');
    if (!b) return;
    presetFilter = b.dataset.v;
    renderPresetCards();
  });

  const grid = document.createElement('div');
  grid.className = 'presets';
  grid.id = 'presetGrid';
  s.body.appendChild(grid);
  presetBrowserEl = grid;

  const row = document.createElement('div');
  row.style.cssText = 'display:flex;gap:5px;margin-top:8px';
  const mkB = (l, fn) => {
    const b = document.createElement('button');
    b.className = 'btn'; b.style.flex = '1'; b.textContent = l;
    b.addEventListener('click', fn);
    return b;
  };
  row.append(
    mkB('RANDOM', () => generateVariation()),
    mkB('INSANE', () => generateInsane()),
    mkB('SAVE', () => saveCustomPreset())
  );
  s.body.appendChild(row);
  frag.appendChild(s.sec);

  return frag;
}

function renderPresetCards(){
  if (!presetBrowserEl) return;
  presetBrowserEl.innerHTML = '';
  const ids = Object.keys(PARTY_PRESETS).filter(id => {
    const p = PARTY_PRESETS[id];
    return presetFilter === 'all' || p.group === presetFilter;
  });

  ids.forEach(id => {
    const p = PARTY_PRESETS[id];
    const btn = document.createElement('button');
    btn.className = 'prCard' + (activePreset === id ? ' on' : '');
    btn.dataset.preset = id;
    btn.title = p.name + ' — ' + p.sub;

    const cv = document.createElement('canvas');
    const CW = 108, CH = 108;
    cv.width = CW; cv.height = CH;
    btn.appendChild(cv);

    const nom = document.createElement('div');
    nom.className = 'prn';
    nom.textContent = p.name;
    btn.appendChild(nom);

    btn.addEventListener('click', () => {
      applyPartyPreset(id);
      renderPresetCards();
    });
    presetBrowserEl.appendChild(btn);

    /* paint the real render a moment later so the panel opens instantly */
    setTimeout(() => paintCard(cv, p), 16);
  });
}

function paintCard(cv, p){
  const px = Renderer.renderThumb(cv.width, cv.height, p.s, 0.34);
  const ctx = cv.getContext('2d');
  if (!px){
    ctx.fillStyle = '#0a0a0c';
    ctx.fillRect(0,0,cv.width,cv.height);
    ctx.fillStyle = '#8e8e9c';
    ctx.font = '8px monospace';
    ctx.fillText(p.name, 6, cv.height-6);
    return;
  }
  /* readPixels gives bottom-up rows; flip while uploading */
  const img = ctx.createImageData(cv.width, cv.height);
  const rowB = cv.width*4;
  for (let y=0;y<cv.height;y++){
    const src = (cv.height-1-y)*rowB;
    img.data.set(px.subarray(src, src+rowB), y*rowB);
  }
  ctx.putImageData(img, 0, 0);
}

/* ---------------------------------------------- CUSTOM PRESET PERSISTENCE */
const CUSTOM_KEY = 'trancelab.custom.v1';

function loadCustomPresets(){
  try {
    const raw = localStorage.getItem(CUSTOM_KEY);
    if (!raw) return;
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return;
    arr.forEach(p => {
      if (!p || !p.id || !p.s) return;
      const clean = validateProject(p.s);
      if (!clean.text) clean.text = DEFAULTS.text;
      PARTY_PRESETS[p.id] = { name: p.name || p.id, sub: p.sub || 'custom', group: 'custom', s: clean };
    });
  } catch(e){ /* corrupt storage should never block boot */ }
}

function saveCustomPreset(){
  const name = (prompt('Preset name', state.projectName || 'MY PRESET') || '').trim();
  if (!name) return;
  const id = 'custom-' + slug(name) + '-' + (Object.keys(PARTY_PRESETS).length);
  const snap = {};
  Object.keys(DEFAULTS).forEach(k => { snap[k] = state[k]; });
  PARTY_PRESETS[id] = { name: name.toUpperCase(), sub: 'custom preset', group: 'custom', s: snap };
  try {
    const store = [];
    Object.keys(PARTY_PRESETS).forEach(k => {
      const p = PARTY_PRESETS[k];
      if (p.group === 'custom') store.push({ id: k, name: p.name, sub: p.sub, s: p.s });
    });
    localStorage.setItem(CUSTOM_KEY, JSON.stringify(store));
  } catch(e){
    toast('COULD NOT PERSIST — STORAGE FULL');
  }
  renderPresetCards();
  toast('PRESET SAVED — ' + name.toUpperCase());
}

/* -------------------------------------------------------- SCOPE VISUALISER */
let scopeEl = null;
function buildScope(){
  const cv = document.createElement('canvas');
  cv.id = 'scope';
  scopeEl = cv;
  return cv;
}

function paintScope(){
  if (!scopeEl) return;
  const cv = scopeEl;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = cv.clientWidth, h = cv.clientHeight;
  if (!w || !h) return;
  if (cv.width !== w*dpr || cv.height !== h*dpr){
    cv.width = w*dpr; cv.height = h*dpr;
  }
  const c = cv.getContext('2d');
  c.clearRect(0,0,cv.width,cv.height);
  c.fillStyle = '#070709';
  c.fillRect(0,0,cv.width,cv.height);

  const spec = Beat.spectrum;
  const wave = Beat.wave;

  /* spectrum bars, log-ish spacing so bass doesn't dominate */
  if (spec){
    const n = 56;
    for (let i=0;i<n;i++){
      const t = i/n;
      const idx = Math.floor(Math.pow(t, 1.9) * (spec.length*0.62));
      const v = spec[idx]/255;
      const bw = cv.width/n;
      const bh = v*cv.height*0.82;
      const grad = c.createLinearGradient(0, cv.height, 0, cv.height-bh);
      grad.addColorStop(0, 'rgba(255,34,51,.85)');
      grad.addColorStop(1, 'rgba(255,47,125,.95)');
      c.fillStyle = grad;
      c.fillRect(i*bw+1, cv.height-bh, bw-1.5, bh);
    }
  }
  /* waveform on top */
  if (wave){
    c.strokeStyle = 'rgba(255,255,255,.30)';
    c.lineWidth = dpr;
    c.beginPath();
    const step = Math.max(1, Math.floor(wave.length/cv.width));
    for (let x=0;x<cv.width;x++){
      const v = (wave[x*step]-128)/128;
      const y = cv.height*0.5 + v*cv.height*0.42;
      if (x===0) c.moveTo(x,y); else c.lineTo(x,y);
    }
    c.stroke();
  }
  /* beat flash edge */
  const bt = Beat.value;
  if (bt > 0.02){
    c.fillStyle = 'rgba(255,34,51,' + (bt*0.16).toFixed(3) + ')';
    c.fillRect(0,0,cv.width,cv.height);
  }
}

/* ---------------------------------------------------------- LOCK HELPERS */
function lockedFlags(){
  const out = {};
  document.querySelectorAll('[data-lock]').forEach(cb => {
    out[cb.dataset.lock] = cb.checked;
  });
  return out;
}
