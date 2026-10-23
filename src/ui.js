/* ============================================================================
   LAVA TYPE — UI: controls, panels, presets, timeline, export, main loop
   ========================================================================= */
"use strict";

const { state, DEFAULTS, set, setMany, emit, subscribe,
        Renderer, TextRenderer, Animation,
        clamp, lerp, hexToRgb, hexToLinear, linToSrgb,
        aspectRatio, toast, download, slug, mulberry32, Beat, Cursor } = window.LAVA;

const $q = s => document.querySelector(s);
const syncers = [];
const syncAll = () => syncers.forEach(f => f());
let emitting = false;

/* ------------------------------------------------------------- FORMATTERS */
const f2 = v => v.toFixed(2);
const f1 = v => v.toFixed(1);
const f0 = v => String(Math.round(v));
const pct = v => Math.round(v*100)+'%';
const deg = v => Math.round(v)+'°';

/* --------------------------------------------------------- CONTROL BUILDERS */
function mkSlider(label, key, min, max, step, fmt, opts){
  opts = opts || {};
  const row = document.createElement('div');
  row.className = 'row';
  const lab = document.createElement('label');
  lab.textContent = label;
  lab.title = label + '  ·  double-click to reset';
  const sl = document.createElement('div');
  sl.className = 'slider';
  sl.innerHTML = '<div class="tk"></div><div class="fl"></div>' +
                 '<div class="dflt" style="left:' + ((DEFAULTS[key]-min)/(max-min)*100) + '%"></div>' +
                 '<div class="th"></div>';
  const nv = document.createElement('div');
  nv.className = 'nv';
  nv.title = 'Drag to scrub · double-click to reset';
  row.append(lab, sl, nv);

  const fl = sl.querySelector('.fl');
  const th = sl.querySelector('.th');
  let dragging = false;

  const toPct = v => clamp((v-min)/(max-min), 0, 1);
  const fromPct = p => {
    let v = min + p*(max-min);
    if (step) v = Math.round(v/step)*step;
    return clamp(+v.toFixed(6), min, max);
  };

  const paint = () => {
    const p = toPct(state[key]);
    fl.style.width = (p*100)+'%';
    th.style.left = (p*100)+'%';
    nv.textContent = (fmt || f2)(state[key]);
  };

  const applyFromEvent = e => {
    const r = sl.getBoundingClientRect();
    const p = clamp((e.clientX - r.left)/r.width, 0, 1);
    set(key, fromPct(p));
    paint();
  };

  sl.addEventListener('pointerdown', e => {
    dragging = true;
    sl.classList.add('drag');
    try { sl.setPointerCapture(e.pointerId); } catch(_){}
    applyFromEvent(e);
    e.preventDefault();
  });
  sl.addEventListener('pointermove', e => {
    if (!dragging) return;
    applyFromEvent(e);
  });
  const end = e => {
    if (!dragging) return;
    dragging = false;
    sl.classList.remove('drag');
    try { sl.releasePointerCapture(e.pointerId); } catch(_){}
  };
  sl.addEventListener('pointerup', end);
  sl.addEventListener('pointercancel', end);

  /* value readout: drag horizontally to scrub */
  nv.addEventListener('pointerdown', e => {
    const sx = e.clientX, sv = state[key];
    try { nv.setPointerCapture(e.pointerId); } catch(_){}
    const move = ev => {
      const dp = (ev.clientX - sx) / 200;
      let v = sv + dp*(max-min);
      if (step) v = Math.round(v/step)*step;
      set(key, clamp(+v.toFixed(6), min, max));
      paint();
    };
    const up = () => {
      nv.removeEventListener('pointermove', move);
      nv.removeEventListener('pointerup', up);
      nv.removeEventListener('pointercancel', up);
    };
    nv.addEventListener('pointermove', move);
    nv.addEventListener('pointerup', up);
    nv.addEventListener('pointercancel', up);
    e.preventDefault();
    e.stopPropagation();
  });

  row.addEventListener('dblclick', e => {
    e.preventDefault();
    set(key, DEFAULTS[key]);
    paint();
  });

  syncers.push(paint);
  paint();
  return row;
}

function mkToggle(label, key){
  const row = document.createElement('div');
  row.className = 'row';
  const lab = document.createElement('label');
  lab.textContent = label;
  const tg = document.createElement('div');
  tg.className = 'tg';
  row.append(lab, tg);
  tg.addEventListener('click', () => set(key, !state[key]));
  const paint = () => tg.classList.toggle('on', !!state[key]);
  syncers.push(paint); paint();
  return row;
}

function mkColor(label, key){
  const row = document.createElement('div');
  row.className = 'crow';
  const sp = document.createElement('span');
  sp.textContent = label;
  const sw = document.createElement('div');
  sw.className = 'sw';
  const inp = document.createElement('input');
  inp.type = 'color';
  sw.appendChild(inp);
  const hx = document.createElement('input');
  hx.className = 'hex';
  row.append(sp, sw, hx);

  inp.addEventListener('input', () => {
    set(key, inp.value);
    hx.value = inp.value.toUpperCase();
  });
  hx.addEventListener('change', () => {
    let v = hx.value.trim();
    if (!v.startsWith('#')) v = '#'+v;
    if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(v)) { set(key, v.toLowerCase()); }
    else hx.value = state[key].toUpperCase();
  });
  const paint = () => {
    if (document.activeElement !== hx) hx.value = String(state[key]).toUpperCase();
    if (document.activeElement !== inp) inp.value = state[key];
    sw.style.background = state[key];
  };
  syncers.push(paint); paint();
  return row;
}

function mkSeg(label, key, opts){
  const wrap = document.createElement('div');
  if (label){
    const l = document.createElement('div');
    l.style.cssText = 'font:400 11.5px/1 var(--mono);color:var(--dim);margin-bottom:5px;letter-spacing:.02em';
    l.textContent = label;
    wrap.appendChild(l);
  }
  const seg = document.createElement('div');
  seg.className = 'seg';
  opts.forEach(o => {
    const b = document.createElement('button');
    b.textContent = o.label;
    b.title = o.title || o.label;
    b.addEventListener('click', () => set(key, typeof DEFAULTS[key] === 'number' ? +o.value : o.value));
    b.dataset.v = String(o.value);
    seg.appendChild(b);
  });
  wrap.appendChild(seg);
  const paint = () => Array.from(seg.children).forEach(b => b.classList.toggle('on', b.dataset.v === String(state[key])));
  syncers.push(paint); paint();
  wrap.style.marginBottom = '9px';
  return wrap;
}

function mkSelect(label, key, opts){
  const row = document.createElement('div');
  row.className = 'row full';
  const l = document.createElement('label');
  l.textContent = label;
  const sel = document.createElement('select');
  sel.className = 'selin';
  opts.forEach(o => {
    const op = document.createElement('option');
    op.value = o.value; op.textContent = o.label;
    sel.appendChild(op);
  });
  sel.addEventListener('change', () => set(key, sel.value));
  row.append(l, sel);
  const paint = () => { sel.value = String(state[key]); };
  syncers.push(paint); paint();
  return row;
}

function section(title, open, count){
  const sec = document.createElement('div');
  sec.className = 'sec' + (open ? ' open' : '');
  const head = document.createElement('button');
  head.className = 'sech';
  head.innerHTML = '<span class="ch"></span><span>' + title + '</span>' +
                   (count ? '<span class="cnt">'+count+'</span>' : '');
  head.addEventListener('click', () => sec.classList.toggle('open'));
  const body = document.createElement('div');
  body.className = 'secb';
  sec.append(head, body);
  return { sec, body };
}
function subLabel(txt){
  const d = document.createElement('div');
  d.style.cssText = 'font:400 11px/1 var(--mono);letter-spacing:.16em;color:#75758a;text-transform:uppercase;margin:11px 0 7px;display:flex;align-items:center;gap:7px';
  d.innerHTML = '<span>'+txt+'</span><span style="flex:1;height:1px;background:#191920"></span>';
  return d;
}

/* ============================================================ LEFT — TYPE */
function buildTypePane(){
  const frag = document.createDocumentFragment();

  /* --- content --- */
  let s = section('Content', true);
  const ta = document.createElement('textarea');
  ta.id = 'textin';
  ta.spellcheck = false;
  ta.value = state.text;
  ta.placeholder = 'Type your composition…';
  ta.rows = 6;
  ta.addEventListener('input', () => set('text', ta.value));
  s.body.appendChild(ta);

  const meta = document.createElement('div');
  meta.style.cssText = 'display:flex;justify-content:space-between;font:400 11px/1 var(--mono);color:#75758a;letter-spacing:.1em;margin-top:6px;text-transform:uppercase';
  meta.innerHTML = '<span id="lineCount"></span><span id="charCount"></span>';
  s.body.appendChild(meta);
  const paintMeta = () => {
    const lines = state.text.split('\n').length;
    meta.children[0].textContent = lines + (lines===1?' line':' lines');
    meta.children[1].textContent = state.text.replace(/\n/g,'').length + ' chars';
    if (ta.value !== state.text) ta.value = state.text;
  };
  syncers.push(paintMeta);

  frag.appendChild(s.sec);

  /* --- font --- */
  s = section('Typography', true);
  const fontOpts = [
    {value:'Impact', label:'Impact — condensed heavy'},
    {value:'Haettenschweiler', label:'Haettenschweiler — ultra condensed'},
    {value:'Arial Narrow', label:'Arial Narrow'},
    {value:'Franklin Gothic Heavy', label:'Franklin Gothic Heavy'},
    {value:'Arial Black', label:'Arial Black'},
    {value:'Segoe UI Black', label:'Segoe UI Black'},
    {value:'Bahnschrift', label:'Bahnschrift'},
    {value:'Georgia', label:'Georgia (serif)'},
    {value:'Courier New', label:'Courier New (mono)'},
  ];
  s.body.appendChild(mkSelect('Font family', 'fontFamily', fontOpts));
  s.body.appendChild(mkSlider('Size', 'fontSize', 24, 620, 1, f0));
  s.body.appendChild(mkSlider('Weight', 'fontWeight', 100, 900, 100, f0));
  s.body.appendChild(mkSlider('Tracking', 'tracking', -0.14, 0.34, 0.002, v => v.toFixed(3)));
  s.body.appendChild(mkSlider('Leading', 'leading', 0.30, 1.70, 0.01, f2));
  s.body.appendChild(mkSeg('Alignment', 'align', [
    {value:'left', label:'LEFT'}, {value:'center', label:'CENTER'}, {value:'right', label:'RIGHT'}
  ]));
  s.body.appendChild(mkSlider('Text width', 'textWidth', 20, 100, 1, f0, {unit:'%'}));
  s.body.appendChild(mkSlider('Opacity', 'textOpacity', 0, 1, 0.01, f2));
  s.body.appendChild(mkColor('Ink', 'textColor'));

  const fontBtn = document.createElement('label');
  fontBtn.className = 'filebtn';
  fontBtn.innerHTML = '↑ LOAD LOCAL FONT (.TTF .OTF .WOFF)';
  const finp = document.createElement('input');
  finp.type = 'file';
  finp.accept = '.ttf,.otf,.woff,.woff2';
  fontBtn.appendChild(finp);
  finp.addEventListener('change', e => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    const fam = 'UserFont_' + f.name.replace(/[^a-z0-9]/gi,'');
    const face = new FontFace(fam, 'url(' + url + ')');
    face.load().then(loaded => {
      document.fonts.add(loaded);
      const sel = s.sec.querySelector('select.selin');
      const op = document.createElement('option');
      op.value = fam; op.textContent = f.name + ' (local)';
      sel.appendChild(op);
      set('fontFamily', fam);
      sel.value = fam;
      toast('FONT LOADED — ' + f.name.toUpperCase());
    }).catch(() => toast('COULD NOT LOAD THAT FONT FILE'));
    e.target.value = '';
  });
  s.body.appendChild(fontBtn);
  frag.appendChild(s.sec);

  /* --- placement --- */
  s = section('Placement', true);
  s.body.appendChild(mkSlider('Scale', 'textScale', 0.15, 2.6, 0.01, f2));
  s.body.appendChild(mkSlider('Rotation', 'textRotate', -45, 45, 0.5, deg));
  s.body.appendChild(mkSlider('Position X', 'textX', -50, 50, 0.5, f1));
  s.body.appendChild(mkSlider('Position Y', 'textY', -50, 50, 0.5, f1));
  s.body.appendChild(mkSlider('Crop', 'crop', 0, 1, 0.01, f2));
  s.body.appendChild(mkToggle('Auto-fit to canvas', 'autoFit'));
  s.body.appendChild(mkToggle('Justify lines to width', 'justify'));
  s.body.appendChild(mkToggle('Packed / overlapping', 'packed'));
  s.body.appendChild(mkSlider('Pack amount', 'packedAmount', 0, 1, 0.01, f2));
  frag.appendChild(s.sec);

  /* --- render mode --- */
  s = section('Text Render Mode', true);
  const cards = document.createElement('div');
  cards.className = 'modecard';
  const mA = document.createElement('button');
  mA.innerHTML = '<b>CLEAN TYPE</b><i>Crisp letterforms over liquid</i>';
  const mB = document.createElement('button');
  mB.innerHTML = '<b>MOLTEN TYPE</b><i>Displaced, blurred, chromatically split</i>';
  mA.addEventListener('click', () => set('textMode','clean'));
  mB.addEventListener('click', () => set('textMode','molten'));
  cards.append(mA, mB);
  s.body.appendChild(cards);
  const paintMode = () => {
    mA.classList.toggle('on', state.textMode==='clean');
    mB.classList.toggle('on', state.textMode==='molten');
  };
  syncers.push(paintMode); paintMode();
  s.body.appendChild(mkToggle('Distortion enabled', 'distortOn'));
  frag.appendChild(s.sec);

  return frag;
}

/* ========================================================== LEFT — MOTION */
function buildMotionPane(){
  const frag = document.createDocumentFragment();

  let s = section('Animation', true);
  s.body.appendChild(mkSlider('Global speed', 'speed', 0, 3, 0.01, f2));
  s.body.appendChild(mkSlider('Loop duration', 'loopDuration', 1, 30, 0.5, v => v.toFixed(1)+'s'));
  s.body.appendChild(mkSlider('Global intensity', 'globalIntensity', 0, 2, 0.01, f2));
  s.body.appendChild(mkSlider('Randomness', 'randomness', 0, 1.5, 0.01, f2));
  s.body.appendChild(mkSlider('Glow pulse', 'glowPulse', 0, 1.5, 0.01, f2));
  s.body.appendChild(mkSlider('Seed', 'seed', 1, 9999, 1, f0));
  s.body.appendChild(mkToggle('Seamless loop', 'seamless'));
  frag.appendChild(s.sec);

  s = section('Text Motion', true);
  s.body.appendChild(mkSlider('Motion speed', 'textSpeed', 0, 3, 0.01, f2));
  s.body.appendChild(mkSlider('Motion amplitude', 'textAmp', 0, 1.5, 0.01, f2));
  s.body.appendChild(mkSlider('Scale oscillation', 'textScaleOsc', 0, 1, 0.01, f2));
  s.body.appendChild(mkSlider('Horizontal drift', 'textDriftX', 0, 1.5, 0.01, f2));
  s.body.appendChild(mkSlider('Vertical drift', 'textDriftY', 0, 1.5, 0.01, f2));
  s.body.appendChild(mkSlider('Glow pulse speed', 'glowPulse', 0, 1.5, 0.01, f2));
  frag.appendChild(s.sec);

  s = section('Typography Distortion', true);
  s.body.appendChild(mkSlider('Warp horizontal', 'textWarpX', 0, 2, 0.01, f2));
  s.body.appendChild(mkSlider('Warp vertical', 'textWarpY', 0, 2, 0.01, f2));
  s.body.appendChild(mkSlider('Ripple amount', 'textRipple', 0, 2, 0.01, f2));
  s.body.appendChild(mkSlider('Ripple frequency', 'textRippleFreq', 0.2, 8, 0.05, f2));
  s.body.appendChild(mkSlider('Bulge / compress', 'textBulge', 0, 2, 0.01, f2));
  s.body.appendChild(mkSlider('Jitter', 'textJitter', 0, 2, 0.01, f2));
  s.body.appendChild(mkSlider('Blur', 'textBlur', 0, 1, 0.01, f2));
  s.body.appendChild(mkSlider('Echo / ghosting', 'textEcho', 0, 1, 0.01, f2));
  s.body.appendChild(mkSlider('Echo layers', 'textEchoCount', 0, 4, 1, f0));
  frag.appendChild(s.sec);

  return frag;
}

/* ========================================================= LEFT — PRESETS */
let activePreset = null;
let presetsGridEl = null;
function buildPresetsPane(){
  return buildPresetBrowser();
}

function buildLiquidPane(){
  const frag = document.createDocumentFragment();

  let s = section('Metaball Field', true);
  s.body.appendChild(mkSlider('Blob size', 'blobSize', 0.1, 1.6, 0.01, f2));
  s.body.appendChild(mkSlider('Blob count', 'blobCount', 1, 12, 1, f0));
  s.body.appendChild(mkSlider('Metaball smoothness', 'metaballSmooth', 0, 1.5, 0.01, f2));
  s.body.appendChild(mkSlider('Edge softness', 'edgeSoftness', 0, 1, 0.01, f2));
  s.body.appendChild(mkSlider('Motion amplitude', 'motionAmp', 0, 1.6, 0.01, f2));
  s.body.appendChild(mkSlider('Flow speed', 'flowSpeed', 0, 2, 0.01, f2));
  s.body.appendChild(mkSlider('Liquid scale', 'liquidScale', 0.3, 2.2, 0.01, f2));
  frag.appendChild(s.sec);

  s = section('Noise & Warping', true);
  s.body.appendChild(mkSlider('Noise scale', 'noiseScale', 0.2, 4.5, 0.01, f2));
  s.body.appendChild(mkSlider('Noise strength', 'noiseStrength', 0, 1.5, 0.01, f2));
  s.body.appendChild(mkSlider('Domain warp', 'warpAmount', 0, 2, 0.01, f2));
  s.body.appendChild(mkSlider('Complexity (octaves)', 'fbmOctaves', 1, 6, 1, f0));
  s.body.appendChild(mkSlider('Shape variation', 'randomness', 0, 1.5, 0.01, f2));
  frag.appendChild(s.sec);

  s = section('Liquid Position', false);
  s.body.appendChild(mkSlider('Liquid X', 'liquidX', -1.5, 1.5, 0.01, f2));
  s.body.appendChild(mkSlider('Liquid Y', 'liquidY', -1.5, 1.5, 0.01, f2));
  s.body.appendChild(mkSlider('Vertical offset', 'liquidPosY', -1.5, 1.5, 0.01, f2));
  frag.appendChild(s.sec);

  return frag;
}

/* ========================================================== RIGHT — COLOR */
function buildColorPane(){
  const frag = document.createDocumentFragment();

  let s = section('Palette', true);
  s.body.appendChild(mkColor('Background', 'bgColor'));
  s.body.appendChild(mkColor('Glow red', 'colRed'));
  s.body.appendChild(mkColor('Glow pink', 'colPink'));
  s.body.appendChild(mkColor('Liquid pale', 'colPale'));
  s.body.appendChild(mkColor('Liquid highlight', 'colWhite'));
  s.body.appendChild(mkColor('Typography', 'textColor'));

  const palRow = document.createElement('div');
  palRow.style.cssText = 'display:flex;gap:5px;margin-top:11px';
  const savePal = document.createElement('button');
  savePal.className = 'btn'; savePal.style.flex = '1'; savePal.style.padding = '6px 4px';
  savePal.textContent = 'SAVE PALETTE';
  const saved = document.createElement('div');
  saved.style.cssText = 'display:flex;gap:4px;flex-wrap:wrap;margin-top:7px';
  savePal.addEventListener('click', () => {
    const pal = {
      colRed: state.colRed, colPink: state.colPink,
      colPale: state.colPale, colWhite: state.colWhite,
      bgColor: state.bgColor, textColor: state.textColor
    };
    const chip = document.createElement('button');
    chip.title = 'Click to apply · right-click to remove';
    chip.style.cssText = 'width:22px;height:16px;border:1px solid #34343e;cursor:pointer;padding:0;background:linear-gradient(135deg,'+pal.colRed+','+pal.colPink+' 55%,'+pal.colWhite+')';
    chip.addEventListener('click', () => { setMany(pal); syncAll(); toast('PALETTE APPLIED'); });
    chip.addEventListener('contextmenu', e => { e.preventDefault(); chip.remove(); });
    saved.appendChild(chip);
    toast('PALETTE SAVED');
  });
  palRow.appendChild(savePal);
  s.body.appendChild(palRow);
  s.body.appendChild(saved);
  frag.appendChild(s.sec);

  s = section('Glow', true);
  s.body.appendChild(mkSlider('Glow intensity', 'glowIntensity', 0, 3, 0.01, f2));
  s.body.appendChild(mkSlider('Glow radius', 'glowRadius', 0, 1.6, 0.01, f2));
  s.body.appendChild(mkSlider('Bloom threshold', 'bloomThreshold', 0, 1, 0.01, f2));
  s.body.appendChild(mkSlider('Red intensity', 'redIntensity', 0, 2, 0.01, f2));
  s.body.appendChild(mkSlider('Pink intensity', 'pinkIntensity', 0, 2, 0.01, f2));
  s.body.appendChild(mkSlider('White intensity', 'whiteIntensity', 0, 2, 0.01, f2));
  s.body.appendChild(mkSlider('Black level', 'blackLevel', 0, 1, 0.01, f2));
  frag.appendChild(s.sec);

  s = section('Chromatic', true);
  s.body.appendChild(mkSlider('Chromatic aberration', 'chromatic', 0, 2.5, 0.01, f2));
  s.body.appendChild(mkSlider('RGB separation', 'rgbSeparation', 0, 0.05, 0.0005, v => v.toFixed(4)));
  s.body.appendChild(mkSlider('Edge glow', 'edgeGlow', 0, 2.5, 0.01, f2));
  frag.appendChild(s.sec);

  return frag;
}

/* =========================================================== RIGHT — COMP */
function buildCompPane(){
  const frag = document.createDocumentFragment();

  let s = section('Canvas', true);
  s.body.appendChild(mkSeg('Landscape', 'aspect', [
    {value:'1:1', label:'1:1'}, {value:'4:3', label:'4:3'},
    {value:'16:9', label:'16:9'}, {value:'21:9', label:'21:9'},
  ]));
  s.body.appendChild(mkSeg('Portrait', 'aspect', [
    {value:'4:5', label:'4:5'}, {value:'3:4', label:'3:4'}, {value:'9:16', label:'9:16'},
  ]));
  const customRow = document.createElement('div');
  customRow.className = 'row';
  customRow.innerHTML = '<label>Custom ratio</label>';
  const cw = document.createElement('input'); cw.className = 'num'; cw.type='number'; cw.min='0.2'; cw.max='5'; cw.step='0.05'; cw.value = state.customW; cw.style.width='42px';
  const x = document.createElement('span'); x.textContent=':'; x.style.cssText='color:#75758a;font:400 12px var(--mono)';
  const chh = document.createElement('input'); chh.className='num'; chh.type='number'; chh.min='0.2'; chh.max='5'; chh.step='0.05'; chh.value = state.customH; chh.style.width='42px';
  const ap = document.createElement('button'); ap.className='btn'; ap.style.cssText='padding:3px 7px;font-size:11px'; ap.textContent='APPLY';
  ap.addEventListener('click', () => {
    setMany({ customW: clamp(+cw.value||3,0.2,5), customH: clamp(+chh.value||4,0.2,5), aspect:'custom' });
    syncAll();
  });
  customRow.append(cw, x, chh, ap);
  s.body.appendChild(customRow);

  const paintCustom = () => {
    cw.value = state.customW; chh.value = state.customH;
    cw.disabled = chh.disabled = false;
  };
  syncers.push(paintCustom);

  s.body.appendChild(mkSlider('Liquid X', 'liquidX', -1.5, 1.5, 0.01, f2));
  s.body.appendChild(mkSlider('Liquid Y', 'liquidY', -1.5, 1.5, 0.01, f2));
  frag.appendChild(s.sec);

  s = section('Finish', true);
  s.body.appendChild(mkSlider('Vignette', 'vignette', 0, 1.2, 0.01, f2));
  s.body.appendChild(mkSlider('Grain', 'grain', 0, 1, 0.01, f2));
  s.body.appendChild(mkToggle('Grid', 'showGrid'));
  s.body.appendChild(mkToggle('Safe guides', 'showGuides'));
  frag.appendChild(s.sec);

  s = section('Playback', false);
  s.body.appendChild(mkSlider('Playback speed', 'speed', 0, 3, 0.01, f2));
  s.body.appendChild(mkSlider('Loop duration', 'loopDuration', 1, 30, 0.5, v=>v.toFixed(1)+'s'));
  s.body.appendChild(mkSlider('Seed', 'seed', 1, 9999, 1, f0));
  s.body.appendChild(mkToggle('Seamless loop', 'seamless'));
  frag.appendChild(s.sec);

  return frag;
}

/* ============================================================ RIGHT — OUT */
function buildOutPane(){
  const frag = document.createDocumentFragment();

  let s = section('Preview', true);
  s.body.appendChild(mkSeg('Render quality', 'quality', [
    {value:0.5, label:'½'}, {value:0.75, label:'¾'}, {value:1, label:'1×'}, {value:1.5, label:'1.5×'}
  ]));
  const info = document.createElement('div');
  info.className = 'note';
  info.id = 'outInfo';
  info.textContent = '—';
  s.body.appendChild(info);
  const paintInfo = () => {
    const c = Renderer.compW || 0, h = Renderer.compH || 0;
    info.innerHTML = '<b>CANVAS</b> ' + c + '×' + h + ' px &nbsp; <b>FIELD</b> ' +
      Math.round(c*0.5) + '×' + Math.round(h*0.5) + '<br><b>ASPECT</b> ' +
      (state.aspect === 'custom' ? state.customW+':'+state.customH : state.aspect);
  };
  syncers.push(paintInfo);
  frag.appendChild(s.sec);

  s = section('Export', true);
  const mkBtn = (label, fn, pri) => {
    const b = document.createElement('button');
    b.className = 'btn' + (pri?' pri':'');
    b.style.cssText = 'width:100%;margin-bottom:6px';
    b.textContent = label;
    b.addEventListener('click', fn);
    return b;
  };
  s.body.appendChild(mkBtn('EXPORT PNG…', () => openExport('png')));
  s.body.appendChild(mkBtn('EXPORT VIDEO…', () => openExport('video'), true));
  const caps = document.createElement('div');
  caps.className = 'note';
  const mp4ok = MediaRecorder.isTypeSupported('video/mp4;codecs=avc1.42E01E');
  const webmOk = MediaRecorder.isTypeSupported('video/webm;codecs=vp9') || MediaRecorder.isTypeSupported('video/webm');
  caps.innerHTML = '<b>CODEC SUPPORT</b><br>WEBM ' + (webmOk?'✓ available':'✕ unavailable') +
                   '<br>MP4/H.264 ' + (mp4ok?'✓ available':'✕ not in this browser') +
                   '<br>WEBCODECS ' + (typeof VideoEncoder !== 'undefined' ? '✓ available' : '✕ unavailable');
  s.body.appendChild(caps);
  frag.appendChild(s.sec);

  s = section('Composition File', false);
  s.body.appendChild(mkBtn('SAVE .JSON', saveJSON));
  s.body.appendChild(mkBtn('LOAD .JSON', () => $q('#fileJson').click()));
  frag.appendChild(s.sec);

  return frag;
}

/* ============================================================ PANEL SETUP */
function buildPanels(){
  const leftBody = $q('#leftBody');
  leftBody.innerHTML = '';
  const typePane = document.createElement('div'); typePane.className='pane on'; typePane.dataset.tab='type'; typePane.appendChild(buildTypePane());
  const motionPane = document.createElement('div'); motionPane.className='pane'; motionPane.dataset.tab='motion'; motionPane.appendChild(buildMotionPane());
  const presetPane = document.createElement('div'); presetPane.className='pane'; presetPane.dataset.tab='presets'; presetPane.appendChild(buildPresetsPane());
  leftBody.append(typePane, motionPane, presetPane);

  const rightBody = $q('#rightBody');
  rightBody.innerHTML = '';
  const liq = document.createElement('div'); liq.className='pane on'; liq.dataset.tab='liquid'; liq.appendChild(buildLiquidPane());
  const curPane = document.createElement('div'); curPane.className='pane'; curPane.dataset.tab='cursor'; curPane.appendChild(buildCursorPane());
  const col = document.createElement('div'); col.className='pane'; col.dataset.tab='color'; col.appendChild(buildColorPane());
  const comp = document.createElement('div'); comp.className='pane'; comp.dataset.tab='comp'; comp.appendChild(buildCompPane());
  const out = document.createElement('div'); out.className='pane'; out.dataset.tab='out'; out.appendChild(buildOutPane());
  rightBody.append(liq, col, comp, out);

  setupTabs('#leftTabs', leftBody);
  setupTabs('#rightTabs', rightBody);
  /* preset cards render through the live engine, so wait for the panels */
  setTimeout(renderPresetCards, 120);
}

function setupTabs(tabsSel, bodySel){
  const tabs = document.querySelector(tabsSel);
  tabs.addEventListener('click', e => {
    const b = e.target.closest('.ptab');
    if (!b) return;
    tabs.querySelectorAll('.ptab').forEach(t => t.classList.toggle('on', t===b));
    bodySel.querySelectorAll('.pane').forEach(p => p.classList.toggle('on', p.dataset.tab === b.dataset.tab));
    bodySel.scrollTop = 0;
  });
}

/* ================================================================ TIMELINE */
function buildTimeline(){
  const track = $q('#tlTrack');
  const ticks = $q('#tlTicks');
  let dragging = false;

  function redrawTicks(){
    const L = Animation.loopLen();
    const n = Math.max(4, Math.min(24, Math.round(L)));
    ticks.innerHTML = '';
    for (let i=0;i<=n;i++){
      const t = document.createElement('i');
      t.style.left = (i/n*100)+'%';
      if (i % Math.max(1, Math.round(n/4)) === 0) t.className = 'maj';
      ticks.appendChild(t);
    }
    $q('#tlDur').textContent = L.toFixed(2);
  }

  const seek = e => {
    const r = track.getBoundingClientRect();
    Animation.scrub(clamp((e.clientX-r.left)/r.width, 0, 1));
    paintTimeline();
  };
  track.addEventListener('pointerdown', e => { dragging=true; track.setPointerCapture(e.pointerId); seek(e); });
  track.addEventListener('pointermove', e => { if(dragging) seek(e); });
  track.addEventListener('pointerup', e => { dragging=false; });
  track.addEventListener('pointercancel', () => dragging=false);

  $q('#loopDur').addEventListener('change', e => {
    set('loopDuration', clamp(+e.target.value||8, 1, 60));
    redrawTicks(); syncAll();
  });
  $q('#playSpeed').addEventListener('change', e => {
    set('speed', clamp(+e.target.value||1, 0.05, 4));
    syncAll();
  });

  redrawTicks();
  buildTimeline.redrawTicks = redrawTicks;
  return redrawTicks;
}

let _lastPaintP = -1;
function paintTimeline(){
  const p = Animation.phase;
  $q('#tlProg').style.width = (p*100)+'%';
  $q('#tlHead').style.left = (p*100)+'%';
  if (Math.abs(p-_lastPaintP) > 0.0004 || p === 0){
    $q('#tlNow').textContent = Animation.time.toFixed(2);
    _lastPaintP = p;
  }
}

/* ================================================================== EXPORT */
let exporting = false;

/* modal-only field builders (NOT bound to global state) */
function mField(label, control){
  const row = document.createElement('div');
  row.className = 'row';
  const l = document.createElement('label');
  l.textContent = label;
  row.append(l, control);
  return row;
}
function mSelect(opts){
  const sel = document.createElement('select');
  sel.className = 'selin';
  sel.style.flex = '1';
  sel.style.width = 'auto';
  opts.forEach(o => {
    const op = document.createElement('option');
    op.value = o.value; op.textContent = o.label;
    sel.appendChild(op);
  });
  return sel;
}
function mCheck(label, checked){
  const wrap = document.createElement('label');
  wrap.style.cssText = 'display:flex;align-items:center;gap:6px;font:400 11.5px/1 var(--mono);color:var(--dim);margin:4px 0 2px;cursor:pointer';
  const cb = document.createElement('input');
  cb.type = 'checkbox'; cb.checked = !!checked;
  cb.style.accentColor = '#ff2233';
  wrap.append(cb, document.createTextNode(label));
  wrap._cb = cb;
  return wrap;
}

function openExport(mode){
  const m = $q('#modal');
  m.classList.add('on');
  const body = $q('#mBody'), foot = $q('#mFoot');
  $q('#mTitle').textContent = mode === 'png' ? 'Export Image' : 'Export Video';
  body.innerHTML = ''; foot.innerHTML = '';

  const close = () => { m.classList.remove('on'); };
  $q('#mX').onclick = close;

  if (mode === 'png'){
    const [aw,ah] = aspectRatio();
    const sizes = [1000,1500,2000,3000,4000];
    const sel = mSelect(sizes.map(w => ({value:w, label: w+' px  ·  '+w+'×'+Math.round(w*ah/aw)})));
    sel.value = '2000';
    body.appendChild(mField('Resolution', sel));

    const curChk = mCheck('Use current preview resolution', false);
    body.appendChild(curChk);

    const note = document.createElement('div');
    note.className = 'note';
    note.innerHTML = 'Renders the <b>current frame</b> at true GPU resolution — the composition is re-rendered at the target size, not upscaled from a screen grab. Very large sizes may exceed GPU texture limits.';
    body.appendChild(note);

    const info = document.createElement('div');
    info.className = 'pinfo';
    info.style.marginTop = '10px';
    body.appendChild(info);

    const target = () => {
      if (curChk._cb.checked) return { w: Renderer.compW, h: Renderer.compH, preview: true };
      const le = +sel.value;
      return aw >= ah
        ? { w: le, h: Math.round(le*ah/aw), preview: false }
        : { w: Math.round(le*aw/ah), h: le, preview: false };
    };
    const upd = () => {
      const t = target();
      info.innerHTML = '<span>' + t.w + ' × ' + t.h + ' px</span><span>' + (t.preview?'preview':'full render') + '</span>';
    };
    sel.addEventListener('change', upd);
    curChk._cb.addEventListener('change', upd);
    upd();

    const b = document.createElement('button');
    b.className = 'btn pri';
    b.textContent = 'RENDER PNG';
    b.onclick = async () => {
      b.disabled = true; b.textContent = 'RENDERING…';
      await new Promise(r => setTimeout(r, 40));
      try {
        const t = target();
        await exportPNG(t.w, t.h);
        close();
      } catch(err){
        console.error(err);
        toast('PNG EXPORT FAILED — ' + String(err.message||'').slice(0,44).toUpperCase(), 4000);
      }
      b.disabled = false; b.textContent = 'RENDER PNG';
    };
    const c = document.createElement('button');
    c.className = 'btn'; c.textContent = 'CLOSE'; c.onclick = close;
    foot.append(c, b);
  } else {
    /* ------------- video ------------- */
    const mp4ok = MediaRecorder.isTypeSupported('video/mp4;codecs=avc1.42E01E') ||
                  MediaRecorder.isTypeSupported('video/mp4');
    const webmok = MediaRecorder.isTypeSupported('video/webm;codecs=vp9') ||
                   MediaRecorder.isTypeSupported('video/webm;codecs=vp8') ||
                   MediaRecorder.isTypeSupported('video/webm');

    const fmts = [];
    if (webmok) fmts.push({value:'webm', label:'WebM · browser native'});
    if (mp4ok)  fmts.push({value:'mp4',  label:'MP4 / H.264'});
    if (!fmts.length) fmts.push({value:'none', label:'No supported encoder'});

    const fmtSel = mSelect(fmts);
    body.appendChild(mField('Format', fmtSel));
    const fpsSel = mSelect([{value:24,label:'24 fps'},{value:30,label:'30 fps'},{value:60,label:'60 fps'}]);
    fpsSel.value = '30';
    body.appendChild(mField('Frame rate', fpsSel));
    const resSel = mSelect([{value:720,label:'720 px (fast)'},{value:1080,label:'1080 px'},{value:1440,label:'1440 px'}]);
    resSel.value = '1080';
    body.appendChild(mField('Long edge', resSel));

    const durIn = document.createElement('input');
    durIn.className = 'num'; durIn.type = 'number'; durIn.style.width = '66px';
    durIn.min = '0.5'; durIn.max = '30'; durIn.step = '0.5';
    durIn.value = state.loopDuration;
    body.appendChild(mField('Duration (s)', durIn));

    const loopChk = mCheck('Match loop length exactly', true);
    loopChk.style.marginBottom = '8px';
    body.appendChild(loopChk);
    const syncDur = () => { if (loopChk._cb.checked) durIn.value = Animation.loopLen(); };
    loopChk._cb.addEventListener('change', syncDur);
    syncDur();

    const note = document.createElement('div');
    note.className = 'note';
    note.innerHTML = 'Each frame is rendered from the <b>deterministic timeline</b> at its exact loop phase, then encoded live. Capture runs at 1× real time, so a 8 s clip takes ~8 s. Keep this tab focused for best results.';
    body.appendChild(note);

    if (!webmok && !mp4ok){
      const w = document.createElement('div');
      w.className = 'note warn';
      w.innerHTML = 'This browser exposes <b>no usable MediaRecorder video codec</b>. Use PNG export, or try Chrome / Edge / Firefox.';
      body.appendChild(w);
    }

    const progWrap = document.createElement('div');
    progWrap.innerHTML = '<div class="prog"><i id="vProg"></i></div>' +
      '<div class="pinfo"><span id="vStage">READY</span><span id="vPct">0%</span></div>';
    progWrap.style.display = 'none';
    body.appendChild(progWrap);

    const startBtn = document.createElement('button');
    startBtn.className = 'btn pri'; startBtn.textContent = 'RENDER VIDEO';
    const closeBtn = document.createElement('button');
    closeBtn.className = 'btn'; closeBtn.textContent = 'CLOSE'; closeBtn.onclick = close;
    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'btn'; cancelBtn.textContent = 'CANCEL'; cancelBtn.style.display = 'none';

    startBtn.onclick = async () => {
      const fmt = fmtSel.value;
      if (fmt === 'none'){ toast('THIS BROWSER CANNOT ENCODE VIDEO'); return; }
      let dur = clamp(+durIn.value || state.loopDuration, 0.5, 30);
      if (loopChk._cb.checked) dur = Animation.loopLen();

      startBtn.disabled = true;
      [fmtSel, fpsSel, resSel, durIn].forEach(x => x.disabled = true);
      progWrap.style.display = 'block';
      closeBtn.style.display = 'none';
      cancelBtn.style.display = '';
      exporting = true;

      try {
        await exportVideo({
          fmt, fps: +fpsSel.value, dur, longEdge: +resSel.value,
          onProgress: (p, stage) => {
            const pr = $q('#vProg'), pc = $q('#vPct'), st = $q('#vStage');
            if (pr) pr.style.width = (p*100)+'%';
            if (pc) pc.textContent = Math.round(p*100)+'%';
            if (st) st.textContent = stage;
          },
          shouldCancel: () => !exporting
        });
        close();
      } catch(err){
        console.error(err);
        const st = $q('#vStage');
        if (st) st.textContent = 'FAILED';
        toast('VIDEO EXPORT FAILED — ' + String(err.message||err).slice(0,44).toUpperCase(), 4500);
      }
      exporting = false;
      startBtn.disabled = false;
      [fmtSel, fpsSel, resSel, durIn].forEach(x => x.disabled = false);
      closeBtn.style.display = '';
      cancelBtn.style.display = 'none';
    };
    cancelBtn.onclick = () => { exporting = false; const st = $q('#vStage'); if (st) st.textContent = 'CANCELLING…'; };

    foot.append(cancelBtn, closeBtn, startBtn);
  }
}
/* ---- PNG ---- */
async function exportPNG(W, H){
  const gl = Renderer.gl;
  const maxTex = gl.getParameter(gl.MAX_TEXTURE_SIZE);
  W = Math.round(W); H = Math.round(H);
  if (W > maxTex || H > maxTex)
    throw new Error('Exceeds GPU max texture size of ' + maxTex + 'px');

  const phase = Animation.phase;
  const time = Animation.time;
  const prevW = Renderer.compW, prevH = Renderer.compH;
  const prevCSS = [Renderer.canvas.style.width, Renderer.canvas.style.height];

  Stage.lock(true);
  Stage.suspend(true);
  try {
    Renderer.resize(W, H);
    Renderer.canvas.style.width = '1px';
    Renderer.canvas.style.height = '1px';
    // re-rasterise the type against the new canvas resolution before drawing
    TextRenderer.ensure();
    Renderer.uploadText();
    Renderer.draw(phase, time);
    const blob = await new Promise(res => Renderer.canvas.toBlob(res, 'image/png'));
    if (!blob) throw new Error('Canvas produced no image');
    download(blob, slug(state.projectName) + '_' + Date.now() + '.png');
    toast('PNG EXPORTED — ' + W + '×' + H);
    return blob;
  } finally {
    Renderer.resize(prevW, prevH);
    Renderer.canvas.style.width = prevCSS[0];
    Renderer.canvas.style.height = prevCSS[1];
    Stage.lock(false);
    Stage.suspend(false);
    Stage.relayout();
  }
}

/* ---- VIDEO ---- */
async function exportVideo(opt){
  const { fmt, fps, dur, longEdge, onProgress, shouldCancel } = opt;
  const [aw, ah] = aspectRatio();
  let W, H;
  if (aw >= ah){ W = Math.round(longEdge); H = Math.round(longEdge*ah/aw); }
  else { H = Math.round(longEdge); W = Math.round(longEdge*aw/ah); }
  // encoders require even dimensions
  W = Math.max(2, Math.floor(W/2)*2); H = Math.max(2, Math.floor(H/2)*2);
  const maxTex = Renderer.gl.getParameter(Renderer.gl.MAX_TEXTURE_SIZE);
  if (W > maxTex || H > maxTex)
    throw new Error('Exceeds GPU max texture size of ' + maxTex + 'px');

  const prevW = Renderer.compW, prevH = Renderer.compH;
  const prevCSS = [Renderer.canvas.style.width, Renderer.canvas.style.height];

  Stage.lock(true);
  Stage.suspend(true);
  let stream = null, track = null, rec = null;
  try {
    Renderer.resize(W, H);
    Renderer.canvas.style.width = W + 'px';
    Renderer.canvas.style.height = H + 'px';
    TextRenderer.ensure();
    Renderer.uploadText();

    const mime = fmt === 'mp4'
      ? (MediaRecorder.isTypeSupported('video/mp4;codecs=avc1.42E01E') ? 'video/mp4;codecs=avc1.42E01E' : 'video/mp4')
      : (MediaRecorder.isTypeSupported('video/webm;codecs=vp9') ? 'video/webm;codecs=vp9'
        : MediaRecorder.isTypeSupported('video/webm;codecs=vp8') ? 'video/webm;codecs=vp8' : 'video/webm');

    let rec;
    try {
      stream = Renderer.canvas.captureStream(0);
      track = stream.getVideoTracks()[0];
      rec = new MediaRecorder(stream, { mimeType: mime, videoBitsPerSecond: 16000000 });
    } catch(e){
      throw new Error('This browser rejected ' + mime);
    }

    const chunks = [];
    rec.ondataavailable = e => { if (e.data && e.data.size) chunks.push(e.data); };
    const stopped = new Promise(res => { rec.onstop = res; });
    rec.start(100);

    /* Drive the animation from wall-clock time rather than frame index: if the
       GPU cannot keep up, the clip still plays at the right speed (fewer distinct
       frames) instead of silently running in slow motion. */
    const durMs = dur*1000;
    const frameMs = 1000/fps;
    const loopLen = Animation.loopLen();
    const t0 = performance.now();
    let n = 0, cancelled = false;

    while (true){
      const el = performance.now() - t0;
      if (el >= durMs) break;
      if (shouldCancel && shouldCancel()){ cancelled = true; break; }
      const ph = (el/1000/dur) % 1;
      Renderer.draw(ph, ph*loopLen);
      if (track.requestFrame) track.requestFrame();
      n++;
      onProgress(Math.min(0.97, (el/durMs)*0.97), 'RENDERING ' + n + ' FRAMES');
      const target = t0 + n*frameMs;
      const wait = target - performance.now();
      await new Promise(r => setTimeout(r, wait > 2 ? wait : 0));
    }

    onProgress(0.985, cancelled ? 'CANCELLING' : 'FINALISING');
    rec.stop();
    await stopped;
    if (cancelled) throw new Error('Cancelled');

    if (!chunks.length) throw new Error('No video data was captured');
    const mimeOut = chunks[0].type || mime;
    const blob = new Blob(chunks, { type: mimeOut });
    const ext = mimeOut.includes('mp4') ? 'mp4' : 'webm';
    download(blob, slug(state.projectName) + '_' + Date.now() + '.' + ext);
    onProgress(1, 'DONE');
    toast('VIDEO EXPORTED — ' + (blob.size/1048576).toFixed(1) + ' MB · ' + ext.toUpperCase() + ' · ' + n + ' FRAMES');
    return blob;
  } finally {
    if (rec && rec.state !== 'inactive'){ try { rec.stop(); } catch(e){} }
    if (stream) try { stream.getTracks().forEach(t => t.stop()); } catch(e){}
    Renderer.resize(prevW, prevH);
    Renderer.canvas.style.width = prevCSS[0];
    Renderer.canvas.style.height = prevCSS[1];
    Stage.lock(false);
    Stage.suspend(false);
    Stage.relayout();
  }
}

/* ------------------------------------------------------------ SAVE / LOAD */
function saveJSON(){
  const snap = { _app: 'lava-type', _version: 1, ...state };
  delete snap.playing; delete snap.zoom;
  const blob = new Blob([JSON.stringify(snap, null, 2)], { type: 'application/json' });
  download(blob, slug(state.projectName) + '.json');
  toast('COMPOSITION SAVED');
}

function loadJSON(file){
  const fr = new FileReader();
  fr.onload = () => {
    try {
      const o = JSON.parse(fr.result);
      const clean = {};
      Object.keys(DEFAULTS).forEach(k => { if (k in o) clean[k] = o[k]; });
      setMany(clean);
      if (clean.projectName) $q('#projName').value = clean.projectName;
      syncAll();
      toast('COMPOSITION LOADED');
    } catch(e){
      toast('INVALID JSON FILE');
    }
  };
  fr.readAsText(file);
}

/* ================================================================= MAIN LOOP */
const Stage = (() => {
  let cssW = 0, cssH = 0;
  let locked = false;
  let suspended = false;   /* export owns the canvas while true */
  let zoomFactor = 0;     // 0 = fit
  let fpsAcc = 0, fpsN = 0, fpsT = 0;
  let lastTextStamp = null;

  function wrapSize(){
    const w = $q('#wrap');
    return { w: w.clientWidth, h: w.clientHeight };
  }

  function layout(){
    if (locked) return;
    const { w: aw, h: ah } = wrapSize();
    if (aw < 4 || ah < 4) return;
    const [caw, cah] = aspectRatio();
    const pad = 34;
    const availW = Math.max(40, aw - pad*2);
    const availH = Math.max(40, ah - pad*2);
    let scale = Math.min(availW/caw, availH/cah);
    if (zoomFactor > 0) scale = Math.min(availW/caw, availH/cah) * zoomFactor;
    const w = Math.max(32, Math.round(caw*scale));
    const h = Math.max(32, Math.round(cah*scale));
    if (w === cssW && h === cssH) return;
    cssW = w; cssH = h;

    const cv = Renderer.canvas;
    cv.style.width = w+'px';
    cv.style.height = h+'px';

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const q = state.quality;
    let bw = w*dpr*q, bh = h*dpr*q;
    const maxDim = 2200;
    if (Math.max(bw,bh) > maxDim){
      const k = maxDim/Math.max(bw,bh);
      bw *= k; bh *= k;
    }
    Renderer.resize(bw, bh);

    const g = $q('#guides');
    g.style.width = w+'px'; g.style.height = h+'px';
    $q('#resv').textContent = Renderer.compW + '×' + Renderer.compH;
    const zv = $q('#zVal');
    zv.textContent = zoomFactor > 0 ? Math.round(zoomFactor*100)+'%' : 'FIT';
  }

  function frame(now){
    requestAnimationFrame(frame);
    if (suspended){ fpsT = now; return; }
    Animation.tick(now);
    layout();

    // re-rasterise type when needed
    const lay = TextRenderer.ensure();
    if (lay !== lastTextStamp){
      Renderer.uploadText();
      lastTextStamp = lay;
    }

    Renderer.draw(Animation.phase, Animation.time);
    paintTimeline();
    paintAudioUI(now);

    /* fps */
    fpsAcc += 1; fpsN++;
    if (now - fpsT > 420){
      const fps = fpsN*1000/(now-fpsT);
      fpsAcc = 0; fpsN = 0; fpsT = now;
      $q('#fpsv').textContent = Math.round(fps);
      const bars = $q('#meters').children;
      const lit = Math.round(clamp(fps/60,0,1)*bars.length);
      for (let i=0;i<bars.length;i++)
        bars[i].style.height = (i < lit ? 3 + i*1.05 : 2) + 'px';
    }
  }

  return {
    start(){ requestAnimationFrame(frame); },
    suspend(v){
      suspended = !!v;
      if (!v) fpsT = performance.now();
    },
    relayout(){ cssW = 0; cssH = 0; if (!locked) layout(); },
    lock(v){ locked = !!v; },
    get zoom(){ return zoomFactor; },
    set zoom(v){ zoomFactor = clamp(v, 0, 4); cssW = 0; },
  };
})();

/* ================================================================ CHROME */
/* The three master switches live in the topbar so they are always reachable.
   Each one has a real rendering consequence:
     TRANCE  -> gates the post-processing stack (postOn)
     PARTY   -> enables the macro multipliers on every low-level parameter
     AUDIO   -> enables the audio->visual modulation and starts capture       */
function syncModes(){
  const tr = document.getElementById('mTrance');
  const pa = document.getElementById('mParty');
  const au = document.getElementById('mAudio');
  if (tr) tr.classList.toggle('on', !!state.trance);
  if (pa) pa.classList.toggle('on', !!state.party);
  if (au){
    const live = state.audioReactive && Beat.mode !== 'off';
    au.classList.toggle('on', !!state.audioReactive);
    au.classList.toggle('listening', live);
    const label = au.querySelector('span');
    if (label){
      label.textContent = state.audioReactive
        ? (Beat.mode === 'mic' ? 'MIC LIVE'
          : Beat.mode === 'tab' ? 'TAB LIVE'
          : Beat.mode === 'audio' ? 'FILE LIVE'
          : 'AUDIO ON')
        : 'AUDIO';
    }
  }
}

function syncChrome(){
  const playing = !Animation.paused;
  const icon = playing
    ? '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>'
    : '<path d="M6 3l15 9-15 9z"/>';
  $q('#icoPlay').outerHTML = '<svg viewBox="0 0 24 24" class="fill" id="icoPlay">'+icon+'</svg>';
  $q('#tlIco').outerHTML = '<svg viewBox="0 0 24 24" id="tlIco">'+icon+'</svg>';

  $q('#btnGrid').classList.toggle('on', state.showGrid);
  $q('#btnGuides').classList.toggle('on', state.showGuides);
  $q('#btnPresent').classList.toggle('on', state.present);
  $q('#stage').classList.toggle('grid', state.showGrid);
  $q('#guides').classList.toggle('on', state.showGuides);
  document.body.classList.toggle('present', state.present);

  syncModes();

  $q('#qualitySel').value = String(state.quality);
  $q('#loopDur').value = state.loopDuration;
  $q('#playSpeed').value = state.speed;
  $q('#seedv').textContent = state.seed;
  Stage.relayout();
}

function togglePlay(){
  Animation.toggle();
  syncChrome();
}

function wireChrome(){
  $q('#projName').addEventListener('input', e => {
    state.projectName = e.target.value;
    document.title = (e.target.value || 'Untitled') + ' — LAVA TYPE';
  });

  /* ---------- master mode switches ---------- */
  $q('#mTrance').addEventListener('click', () => {
    set('trance', !state.trance);
    syncModes();
    toast(state.trance ? 'TRANCE MODE ON — ' + tranceActiveCount() + ' EFFECTS' : 'TRANCE MODE OFF');
  });

  $q('#mParty').addEventListener('click', () => {
    set('party', !state.party);
    syncModes();
    toast(state.party
      ? 'PARTY MODE ON — MACROS LIVE'
      : 'PARTY MODE OFF — RAW PARAMETERS');
  });

  $q('#mAudio').addEventListener('click', async () => {
    if (state.audioReactive){
      set('audioReactive', false);
      Beat.stop();
      set('rhythmMode', 'off');
      syncModes();
      toast('AUDIO REACTIVITY OFF');
      return;
    }
    set('audioReactive', true);
    /* if no source is running yet, start the manual clock immediately so the
       switch does something visible without demanding a permission prompt */
    if (Beat.mode === 'off'){
      set('rhythmMode', 'manual');
      toast('AUDIO REACTIVITY ON — MANUAL CLOCK · CHOOSE AN INPUT IN THE AUDIO TAB', 3600);
    } else {
      toast('AUDIO REACTIVITY ON');
    }
    syncModes();
  });

  $q('#btnPlay').addEventListener('click', togglePlay);
  $q('#tlPlay').addEventListener('click', togglePlay);

  const restart = () => { Animation.restart(); paintTimeline(); };
  $q('#btnRestart').addEventListener('click', restart);

  $q('#qualitySel').addEventListener('change', e => {
    set('quality', +e.target.value);
    Stage.relayout();
  });

  $q('#btnGrid').addEventListener('click', () => { set('showGrid', !state.showGrid); });
  $q('#btnGuides').addEventListener('click', () => { set('showGuides', !state.showGuides); });

  $q('#btnPresent').addEventListener('click', () => {
    set('present', !state.present);
    setTimeout(() => Stage.relayout(), 60);
  });

  $q('#btnFull').addEventListener('click', async () => {
    /* Fullscreen the whole document and enter presentation mode, so the canvas
       fills the screen. Fullscreening #stage alone kept the grid rows around it
       and left the composition boxed in at its preview size. */
    try {
      if (!document.fullscreenElement){
        const el = document.documentElement;
        const req = el.requestFullscreen || el.webkitRequestFullscreen || el.msRequestFullscreen;
        if (req) await req.call(el);
        if (!state.present) set('present', true);
      } else {
        const exit = document.exitFullscreen || document.webkitExitFullscreen;
        if (exit) await exit.call(document);
      }
    } catch(e){
      set('present', !state.present);
      toast('FULLSCREEN BLOCKED — PRESENTATION MODE TOGGLED', 3200);
    }
    setTimeout(() => Stage.relayout(), 90);
  });

  document.addEventListener('fullscreenchange', () => setTimeout(() => Stage.relayout(), 90));

  $q('#exitPresent').addEventListener('click', () => {
    set('present', false);
    if (document.fullscreenElement) document.exitFullscreen();
    setTimeout(() => Stage.relayout(), 90);
  });

  $q('#btnReset').addEventListener('click', () => {
    const keepName = state.projectName;
    setMany(Object.assign({}, DEFAULTS));
    state.projectName = keepName;
    activePreset = null;
    syncAll();
    document.querySelectorAll('.preset').forEach(b => b.classList.remove('on'));
    Animation.restart();
    Stage.relayout();
    toast('COMPOSITION RESET');
  });

  $q('#btnPng').addEventListener('click', async e => {
    e.currentTarget.disabled = true;
    const [aw, ah] = aspectRatio();
    const le = 2000;
    const w = aw >= ah ? le : Math.round(le*aw/ah);
    const h = aw >= ah ? Math.round(le*ah/aw) : le;
    try { await exportPNG(w, h); } catch(err){ console.error(err); toast('PNG FAILED — ' + String(err.message||'').slice(0,40).toUpperCase()); }
    e.currentTarget.disabled = false;
  });

  $q('#btnExport').addEventListener('click', () => openExport('png'));
  $q('#btnSave').addEventListener('click', saveJSON);
  $q('#btnLoad').addEventListener('click', () => $q('#fileJson').click());
  $q('#fileJson').addEventListener('change', e => {
    const f = e.target.files[0];
    if (f) loadJSON(f);
    e.target.value = '';
  });

  /* zoom */
  $q('#zIn').addEventListener('click', () => {
    const z = Stage.zoom > 0 ? Stage.zoom*1.25 : 1.25;
    Stage.zoom = Math.min(z, 4); Stage.relayout();
  });
  $q('#zOut').addEventListener('click', () => {
    const z = Stage.zoom > 0 ? Stage.zoom/1.25 : 0.8;
    Stage.zoom = z < 0.3 ? 0 : z; Stage.relayout();
  });
  $q('#zFit').addEventListener('click', () => { Stage.zoom = 0; Stage.relayout(); });
  $q('#zVal').addEventListener('click', () => { Stage.zoom = 0; Stage.relayout(); });

  /* drawers */
  $q('#dtL').addEventListener('click', () => $q('#left').classList.toggle('open'));
  $q('#dtR').addEventListener('click', () => $q('#right').classList.toggle('open'));

  /* modal background */
  $q('#modal').addEventListener('click', e => {
    if (e.target.id === 'modal' && !exporting) $q('#modal').classList.remove('on');
  });

  /* keyboard */
  window.addEventListener('keydown', e => {
    if (e.target.matches('input,textarea,select')) {
      if (e.key === 'Escape') e.target.blur();
      return;
    }
    const k = e.key.toLowerCase();
    if ((e.ctrlKey || e.metaKey) && k === 'z'){
      e.preventDefault();
      if (e.shiftKey) redo(); else undo();
      return;
    }
    if (k === ' ') { e.preventDefault(); togglePlay(); }
    else if (k === 'p' && e.shiftKey) { Animation.paused = true; syncChrome(); toast('FROZEN'); }
    else if (k === 'r') { Animation.restart(); paintTimeline(); }
    else if (k === 't') { $q('#mTrance').click(); }
    else if (k === 'y') { $q('#mParty').click(); }
    else if (k === 'u') { $q('#mAudio').click(); }
    else if (k === 'g') { set('showGrid', !state.showGrid); }
    else if (k === "'") { set('showGuides', !state.showGuides); }
    else if (k === 'h') { set('present', !state.present); setTimeout(()=>Stage.relayout(),60); }
    else if (k === 'f') { $q('#btnFull').click(); }
    else if (k === 'e') { openExport('png'); }
    else if (k === 'escape') {
      if (document.getElementById('modal').classList.contains('on')){
        $q('#modal').classList.remove('on');
      } else if (state.present){
        $q('#exitPresent').click();
      } else if (document.fullscreenElement){
        document.exitFullscreen();
      }
    }
    else if (k === 'arrowright') { Animation.scrub(Math.min(1, Animation.phase + 0.02)); paintTimeline(); }
    else if (k === 'arrowleft') { Animation.scrub(Math.max(0, Animation.phase - 0.02)); paintTimeline(); }
  });

  window.addEventListener('resize', () => Stage.relayout());

  /* ---------------- CURSOR INTERACTION ---------------- */
  const glc = $q('#gl');
  const toComp = e => {
    const r = glc.getBoundingClientRect();
    if (!r.width || !r.height) return null;
    /* normalise to -1..1 in CSS pixels, then let the shader aspect-correct */
    const nx = ((e.clientX - r.left)/r.width) * 2 - 1;
    const ny = -(((e.clientY - r.top)/r.height) * 2 - 1);
    return { nx, ny };
  };

  const onMove = e => {
    if (!state.cursorOn) return;
    const p = toComp(e);
    if (!p) return;
    Cursor.setTarget(p.nx*0.5, p.ny*0.5);
    if (state.cursorMode === 'drag' && !Cursor.down) return;
  };
  glc.addEventListener('pointerenter', () => { Cursor.enter(); });
  glc.addEventListener('pointerleave', () => { Cursor.leave(); });
  glc.addEventListener('pointerdown', e => {
    Cursor.down = true;
    try { glc.setPointerCapture(e.pointerId); } catch(_){}
    const p = toComp(e);
    if (p) Cursor.setTarget(p.nx*0.5, p.ny*0.5);
    if (state.cursorBrush) Cursor.clearStrokes();
  });
  glc.addEventListener('pointerup', e => {
    Cursor.down = false;
    try { glc.releasePointerCapture(e.pointerId); } catch(_){}
  });
  glc.addEventListener('pointercancel', () => { Cursor.down = false; });
  glc.addEventListener('pointermove', onMove, { passive: true });

  /* touch parity: a touch drag behaves like a held pointer */
  glc.addEventListener('touchmove', e => {
    if (!state.cursorOn || !e.touches.length) return;
    const t = e.touches[0];
    const p = toComp({ clientX: t.clientX, clientY: t.clientY });
    if (p) Cursor.setTarget(p.nx*0.5, p.ny*0.5);
    e.preventDefault();
  }, { passive: false });

  /* ---------------- UNDO / REDO ---------------- */
  const guard = fn => () => { if (!exporting) fn(); };
  $q('#btnUndo').addEventListener('click', guard(undo));
  $q('#btnRedo').addEventListener('click', guard(redo));
  paintUndo();

  /* snapshot before any control change so undo has somewhere to go */
  let snapTimer = 0;
  subscribe(() => {
    autosave();
    clearTimeout(snapTimer);
    snapTimer = setTimeout(() => {
      if (!emitting && !exporting) undoPush();
    }, 340);
  });

  /* ---------------- AUDIO FILE ---------------- */
  $q('#fileAudio').addEventListener('change', async e => {
    const f = e.target.files[0];
    e.target.value = '';
    if (!f) return;
    try {
      const dur = await Beat.loadFile(f);
      set('audioReactive', true);
      set('rhythmMode', 'audio');
      syncModes();
      set('loopDuration', Math.max(2, Math.min(30, Math.round(dur))));
      toast('AUDIO LOADED — ' + dur.toFixed(1) + 's · ANALYSING', 3000);
    } catch(err){
      console.error(err);
      toast('AUDIO DECODE FAILED — ' + String(err.message||'').slice(0,38).toUpperCase(), 4000);
    }
  });

  /* system / tab audio capture, where the browser exposes it */
  window.__captureTabAudio = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true, audio: { echoCancellation: false, noiseSuppression: false }
      });
      const audioTrack = stream.getAudioTracks()[0];
      if (!audioTrack){
        stream.getTracks().forEach(t => t.stop());
        throw new Error('no audio track — enable "share tab audio"');
      }
      /* video track is only there because getDisplayMedia requires it */
      stream.getVideoTracks().forEach(t => t.stop());
      await Beat.useStream(new MediaStream([audioTrack]));
      set('audioReactive', true);
      set('rhythmMode', 'tab');
      syncModes();
      toast('TAB AUDIO CAPTURED', 3000);
    } catch(err){
      toast('CAPTURE FAILED — ' + String(err.message||'').slice(0,42).toUpperCase(), 4200);
    }
  };

  window.addEventListener('beforeunload', () => { Beat.stop(); });

  /* keep chrome in sync with state */
  subscribe(keys => {
    syncChrome();
  });
}

/* ==================================================================== BOOT */
function boot(){
  const ok = Renderer.init();
  if (!ok){
    $q('#nodraw').classList.add('show');
    $q('#gl').style.display = 'none';
    console.warn('WebGL2 pipeline failed to initialise');
  } else {
    const gl = Renderer.gl;
    const dbg = gl.getExtension('WEBGL_debug_renderer_info');
    const name = dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER);
    $q('#gpuv').textContent = String(name).replace(/ANGLE \(|\)/g,'').split(',')[0].slice(0,26);
  }

  buildPanels();
  buildTimeline();
  wireChrome();
  syncAll();
  syncChrome();
  Animation.restart();
  Stage.relayout();
  Stage.start();

  loadCustomPresets();

  // restore the last session, then make sure the UI matches
  const restored = restoreAutosave();
  if (restored){ syncAll(); paintUndo(); }

  // first paint
  setTimeout(() => {
    syncAll();
    Stage.relayout();
    if (restored) toast('SESSION RESTORED', 1800);
  }, 60);
}

if (document.readyState === 'loading')
  document.addEventListener('DOMContentLoaded', boot);
else boot();
