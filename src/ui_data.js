/* ============================================================================
   TRANCE LAB — PARTY PRESETS, VARIATION GENERATOR, UNDO/REDO, PERSISTENCE
   ========================================================================= */

/* Every preset is a real parameter set: palette + motion personality + a
   distinct effect graph. Nothing here is cosmetic. */
/* ------------------------------------------------------ APPLY / VARIATION */
function applyPartyPreset(id){
  const p = PARTY_PRESETS[id];
  if (!p) return;
  undoPush();
  /* run the preset through the legibility envelope before it reaches state,
     so no preset can render type that has stopped being type */
  const s2 = applyLegibilityEnvelope(Object.assign({}, p.s));
  setMany(s2);
  syncAll();
  activePreset = id;
  toast('PRESET — ' + p.name, 2600);
  Renderer.resetFeedback();
}

/* Mutate the current look while preserving whatever the user locked. */
function generateVariation(){
  const L = lockedFlags();
  const rnd = mulberry32(((state.seed + Date.now()) >>> 0));
  const pick = (a, b) => a + rnd()*(b-a);
  const out = {};

  if (!L.lockSeed) out.seed = Math.floor(rnd()*99999);
  if (!L.lockText){
    out.textX = +pick(-8, 8).toFixed(2);
    out.textY = +pick(-8, 8).toFixed(2);
    out.textScale = +pick(0.82, 1.18).toFixed(3);
    out.textRotate = +pick(-6, 6).toFixed(2);
    out.leading = +pick(0.88, 1.10).toFixed(3);
    out.tracking = +pick(-0.06, 0.02).toFixed(3);
  }
  if (!L.lockPalette){
    out.colRed = hslHex(rnd()*360, pick(0.75, 1.0), pick(0.42, 0.58));
    out.colPink = hslHex(rnd()*360, pick(0.70, 1.0), pick(0.45, 0.62));
    out.colAccent = hslHex(rnd()*360, pick(0.80, 1.0), pick(0.45, 0.62));
    out.colPale = hslHex(rnd()*360, pick(0.25, 0.65), pick(0.82, 0.94));
    out.hueShift = +pick(-1.2, 1.2).toFixed(2);
  }
  if (!L.lockGeometry){
    out.kaleido = +pick(0, 0.6).toFixed(2);
    out.kaleidoSeg = Math.round(pick(3, 16));
    out.tunnel = +pick(0, 0.7).toFixed(2);
    out.fractal = +pick(0, 0.6).toFixed(2);
    out.contourLine = +pick(0, 0.9).toFixed(2);
    out.lasers = +pick(0, 1.0).toFixed(2);
    out.laserCount = Math.round(pick(3, 18));
    out.rings = +pick(0, 1.0).toFixed(2);
    out.ringCount = Math.round(pick(3, 16));
    out.bursts = +pick(0, 1.2).toFixed(2);
    out.gridLines = +pick(0, 0.8).toFixed(2);
  }
  if (!L.lockTypo){
    const beh = ['monumental','liquid','glitch','explosive','chrome','hypnotic'];
    out.typeBehaviour = beh[Math.floor(rnd()*beh.length)];
    out.elastic = +pick(0, 0.8).toFixed(2);
    out.fragment = +pick(0, 0.6).toFixed(2);
    out.perspective = +pick(0, 0.5).toFixed(2);
    out.spiral = +pick(0, 0.5).toFixed(2);
    out.extrude = +pick(0, 0.7).toFixed(2);
    out.neonOutline = +pick(0, 0.8).toFixed(2);
    out.meltRise = +pick(0, 0.6).toFixed(2);
    out.lineStagger = +pick(0, 0.6).toFixed(2);
    out.charAnim = +pick(0, 0.6).toFixed(2);
  }
  if (!L.lockMotion){
    out.speed = +pick(0.5, 1.6).toFixed(2);
    out.loopDuration = [6, 8, 10, 12, 16][Math.floor(rnd()*5)];
    out.liquidity = +pick(0.3, 0.95).toFixed(2);
    out.distortion = +pick(0.2, 0.95).toFixed(2);
    out.geometry = +pick(0.1, 1.0).toFixed(2);
    out.feedback = +pick(0, 0.7).toFixed(2);
    out.trailLength = +pick(0.2, 0.9).toFixed(2);
    out.chromaSplit = +pick(0, 1.0).toFixed(2);
    out.halation = +pick(0, 0.9).toFixed(2);
    out.colorCycle = +pick(0, 1.2).toFixed(2);
    out.scanline = +pick(0, 0.5).toFixed(2);
    out.posterize = +pick(0, 0.4).toFixed(2);
    out.bpm = Math.round(pick(90, 160));
  }

  undoPush();
  setMany(applyLegibilityEnvelope(out));
  syncAll();
  Renderer.resetFeedback();
  toast('VARIATION GENERATED', 2000);
}

/* The big red button: changes the look wholesale, keeps the text. */
function generateInsane(){
  const L = lockedFlags();
  const rnd = mulberry32(((state.seed*7 + Date.now()) >>> 0));
  const pick = (a, b) => a + rnd()*(b-a);
  const keys = Object.keys(PARTY_PRESETS);
  const baseId = keys[Math.floor(rnd()*keys.length)];
  const base = Object.assign({}, PARTY_PRESETS[baseId].s);

  if (!state.party) base.party = true;
  base.trance = true;

  if (L.lockText){
    ['textX','textY','textScale','textRotate','leading','tracking','text',
     'fontFamily','fontWeight','align','textWidth'].forEach(k => delete base[k]);
  }
  if (L.lockPalette){
    ['colRed','colPink','colAccent','colPale','colWhite','bgColor',
     'hueShift','saturation'].forEach(k => delete base[k]);
  }
  if (L.lockSeed) delete base.seed;

  /* push a few parameters past the preset into genuinely extreme territory */
  const r = () => rnd();
  base.chaos = +pick(0.45, 0.98).toFixed(2);
  base.energy = +pick(0.6, 1.0).toFixed(2);
  base.kaleido = +pick(0, 0.75).toFixed(2);
  base.kaleidoSeg = Math.round(pick(3, 20));
  base.tunnel = +pick(0, 0.85).toFixed(2);
  base.fractal = +pick(0, 0.7).toFixed(2);
  base.contourLine = +pick(0, 1.1).toFixed(2);
  base.feedback = +pick(0, 0.75).toFixed(2);
  base.lasers = +pick(0, 1.3).toFixed(2);
  base.rings = +pick(0, 1.2).toFixed(2);
  base.bursts = +pick(0, 1.4).toFixed(2);
  base.elastic = +pick(0, 0.9).toFixed(2);
  base.meltRise = +pick(0, 0.7).toFixed(2);
  base.chromaSplit = +pick(0, 1.3).toFixed(2);
  base.colorCycle = +pick(0, 1.6).toFixed(2);
  base.halation = +pick(0, 1.1).toFixed(2);
  base.scanline = +pick(0, 0.55).toFixed(2);
  base.posterize = +pick(0, 0.45).toFixed(2);
  base.speed = +pick(0.6, 1.7).toFixed(2);
  if (r() > 0.6) base.invert = 1; else base.invert = 0;

  undoPush();
  setMany(applyLegibilityEnvelope(base));
  syncAll();
  Renderer.resetFeedback();
  toast('SOMETHING INSANE — ' + PARTY_PRESETS[baseId].name, 3000);
}

function hslHex(h, s, l){
  h = ((h % 360) + 360) % 360 / 360;
  const q = l < 0.5 ? l*(1+s) : l+s-l*s;
  const p = 2*l - q;
  const f = t => {
    t = (t + 1) % 1;
    if (t < 1/6) return p + (q-p)*6*t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q-p)*(2/3-t)*6;
    return p;
  };
  const to = v => Math.round(clamp(v,0,1)*255).toString(16).padStart(2,'0');
  return '#' + to(f(h+1/3)) + to(f(h)) + to(f(h-1/3));
}

/* ============================================================= UNDO / REDO */
const undoStack = [];
const redoStack = [];
let undoLast = 0;

function undoSnapshot(){
  const snap = {};
  Object.keys(DEFAULTS).forEach(k => { snap[k] = state[k]; });
  return snap;
}

function undoPush(){
  const now = Date.now();
  /* coalesce rapid slider drags into one history entry */
  if (now - undoLast < 320 && undoStack.length){ undoLast = now; return; }
  undoLast = now;
  undoStack.push(undoSnapshot());
  if (undoStack.length > 80) undoStack.shift();
  redoStack.length = 0;
  paintUndo();
}

function undo(){
  if (!undoStack.length){ toast('NOTHING TO UNDO'); return; }
  redoStack.push(undoSnapshot());
  const s2 = undoStack.pop();
  setMany(s2);
  syncAll();
  paintUndo();
  toast('UNDO');
}

function redo(){
  if (!redoStack.length){ toast('NOTHING TO REDO'); return; }
  undoStack.push(undoSnapshot());
  const s2 = redoStack.pop();
  setMany(s2);
  syncAll();
  paintUndo();
  toast('REDO');
}

function paintUndo(){
  const u = document.getElementById('btnUndo');
  const r = document.getElementById('btnRedo');
  if (u) u.classList.toggle('dim', !undoStack.length);
  if (r) r.classList.toggle('dim', !redoStack.length);
}

/* ======================================================= LOCAL PERSISTENCE */
const AUTOSAVE_KEY = 'trancelab.autosave.v1';
let autosaveT = 0;

function autosave(force){
  clearTimeout(autosaveT);
  autosaveT = setTimeout(() => {
    try {
      const snap = {};
      Object.keys(DEFAULTS).forEach(k => { snap[k] = state[k]; });
      localStorage.setItem(AUTOSAVE_KEY, JSON.stringify({ v: 1, t: Date.now(), s: snap }));
    } catch(e){ /* storage may be full or blocked — never fatal */ }
  }, force ? 0 : 700);
}

function restoreAutosave(){
  try {
    const raw = localStorage.getItem(AUTOSAVE_KEY);
    if (!raw) return false;
    const o = JSON.parse(raw);
    if (!o || !o.s) return false;
    setMany(validateProject(o.s));
    syncAll();
    return true;
  } catch(e){ return false; }
}

/* Imported JSON is untrusted: only accept known keys with the right types. */
function validateProject(o){
  const clean = {};
  for (const k of Object.keys(DEFAULTS)){
    if (!(k in o)) continue;
    const def = DEFAULTS[k];
    const v = o[k];
    const t = typeof def;
    if (t === 'number' && typeof v === 'number' && isFinite(v)){
      clean[k] = v;
    } else if (t === 'boolean' && typeof v === 'boolean'){
      clean[k] = v;
    } else if (t === 'string' && typeof v === 'string'){
      /* colour keys must be valid hex */
      if (/^(col|bg)/.test(k)){
        if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(v.trim())) clean[k] = v.trim().toLowerCase();
      } else {
        clean[k] = v.slice(0, 4000);
      }
    }
  }
  /* clamp numeric ranges so a hostile file cannot wedge the renderer */
  if ('blobCount' in clean) clean.blobCount = clamp(clean.blobCount, 1, 12);
  if ('kaleidoSeg' in clean) clean.kaleidoSeg = clamp(clean.kaleidoSeg, 2, 24);
  if ('laserCount' in clean) clean.laserCount = clamp(clean.laserCount, 2, 24);
  if ('ringCount' in clean) clean.ringCount = clamp(clean.ringCount, 1, 24);
  if ('loopDuration' in clean) clean.loopDuration = clamp(clean.loopDuration, 0.5, 60);
  if ('speed' in clean) clean.speed = clamp(clean.speed, 0.05, 6);
  if ('bpm' in clean) clean.bpm = clamp(clean.bpm, 30, 260);
  if ('quality' in clean) clean.quality = clamp(clean.quality, 0.25, 2);
  return clean;
}
