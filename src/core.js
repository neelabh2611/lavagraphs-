/* ============================================================================
   LAVA TYPE — core: state, text raster, WebGL2 liquid pipeline, animation
   ========================================================================= */
"use strict";

/* ---------------------------------------------------------------- 1. STATE */
const DEFAULTS = {
  projectName: 'DARK CLOUD BREAKS',

  /* text */
  text: 'DARK\nCLOUD\nBREAKS\nHEAVY\nRAIN\nFALLS',
  fontFamily: 'Impact',
  fontLabel: 'Impact',
  fontSize: 240,
  fontWeight: 800,
  tracking: -0.035,
  leading: 0.98,
  align: 'center',
  textWidth: 94,
  textScale: 1.00,
  textRotate: 0,
  textX: 0,
  textY: -2,
  textColor: '#f4f0f6',
  textOpacity: 1,
  autoFit: true,
  packed: true,
  packedAmount: 0.10,
  justify: true,
  crop: 0.06,

  /* typography distortion */
  distortOn: true,
  textMode: 'molten',
  textWarpX: 0.42,
  textWarpY: 0.34,
  textRipple: 0.22,
  textRippleFreq: 2.6,
  textBulge: 0.14,
  textSpeed: 0.60,
  textAmp: 0.55,
  textScaleOsc: 0.10,
  textDriftX: 0.05,
  textDriftY: 0.03,
  textJitter: 0.03,
  textBlur: 0.18,
  textEcho: 0.16,
  textEchoCount: 3,
  edgeGlow: 0.95,
  textOutline: 0.55,   /* contrasting contour that keeps glyphs legible */

  /* liquid */
  blobSize: 0.84,
  blobCount: 8,
  flowSpeed: 0.34,
  noiseScale: 1.45,
  noiseStrength: 0.62,
  metaballSmooth: 0.26,
  edgeSoftness: 0.22,
  motionAmp: 0.60,
  liquidComplexity: 3,
  liquidX: 0,
  liquidY: 0,
  liquidPosY: 0,
  liquidScale: 1.0,
  warpAmount: 0.55,
  fbmOctaves: 4,

  /* glow + color */
  glowIntensity: 1.30,
  glowRadius: 0.72,
  bloomThreshold: 0.30,
  chromatic: 0.55,
  rgbSeparation: 0.010,
  redIntensity: 1.0,
  pinkIntensity: 1.0,
  whiteIntensity: 1.0,
  blackLevel: 0.0,
  colRed: '#ff1020',
  colPink: '#ff2f7d',
  colPale: '#ffe4ea',
  colWhite: '#ffffff',
  bgColor: '#000000',

  /* composition */
  aspect: '16:9',
  customW: 3,
  customH: 4,
  vignette: 0.35,
  grain: 0.14,

  /* animation */
  playing: true,
  speed: 1.0,
  loopDuration: 8,
  seed: 1337,
  glowPulse: 0.30,
  randomness: 0.72,
  globalIntensity: 1.0,
  seamless: true,

  /* ---------------- TRANCE MODE ---------------- */
  trance: false,
  tranceIntensity: 0.55,
  // kaleidoscope / symmetry
  kaleido: 0.0, kaleidoSeg: 6, kaleidoRotate: 0.25,
  // recursive tunnel
  tunnel: 0.0, tunnelDepth: 0.62, tunnelSpeed: 0.35, tunnelWarp: 0.40,
  // fractal / topographic contours
  fractal: 0.0, fractalScale: 2.6, contourLine: 0.0,
  // feedback
  feedback: 0.0, feedbackZoom: 0.12, feedbackRotate: 0.06, trailLength: 0.45,
  // optics
  lens: 0.0, lensPinch: 0.55, waveInterf: 0.0,
  chromaSplit: 0.0, hueCycle: 0.0, posterize: 0.0,
  scanline: 0.0, halation: 0.0, invert: 0,
  // psychedelic type
  psyType: 0.0, psyTypeSpiral: 0.45, meltRise: 0.0,
  // animated colour
  colorCycle: 0.0, colorSpeed: 0.30,

  /* ---------------- PARTY MODE (macros) ---------------- */
  party: false,
  energy: 0.55, chaos: 0.30, beatResponse: 0.55,
  liquidity: 0.55, geometry: 0.35, distortion: 0.45,
  glowMacro: 0.55, colorMadness: 0.35, typeForce: 0.55,
  feedbackMacro: 0.25, depth: 0.45, motionSpeed: 1.0, trailMacro: 0.40,
  // lasers + geometry layer
  lasers: 0.0, laserCount: 5, laserWidth: 0.35, laserSpeed: 0.5,
  rings: 0.0, ringCount: 7, ringThickness: 0.30,
  gridLines: 0.0, gridScale: 8.0,
  bursts: 0.0,
  // typography behaviours
  typeBehaviour: 'monumental',   // monumental | liquid | glitch | explosive | chrome | hypnotic
  extrude: 0.0, neonOutline: 0.0, lineStagger: 0.0, charAnim: 0.0,
  elastic: 0.0, fragment: 0.0, perspective: 0.0, spiral: 0.0,
  // rhythm
  audioReactive: false,
  rhythmMode: 'off',   // off | manual | audio | mic
  bpm: 128, beatSub: 4, audioSens: 0.8, audioSmooth: 0.72, audioOffset: 0,
  bassAmt: 0.7, midAmt: 0.5, trebleAmt: 0.45, beatAmt: 0.8,
  /* ---------------- CURSOR INTERACTION ---------------- */
  cursorOn: true,
  cursorPreset: 'liquid',
  cursorForce: 0.55,
  cursorRadius: 0.28,
  cursorSens: 1.0,
  cursorDecay: 0.55,
  cursorTrail: 0.55,
  cursorTrailColor: '#ff2f7d',
  cursorGlow: 0.7,
  cursorMode: 'hover',          // hover | drag | both
  cursorLiquid: true,
  cursorGravity: false,
  cursorWake: true,
  cursorBrush: false,
  cursorPortal: false,
  cursorParticles: false,
  cursorType: true,
  cursorHoverEvent: true,
  cursorHoverZoom: 0.18,
  cursorHoverBloom: 0.35,
  paintPersist: false,
  cursorPortalDepth: 0.6,
  cursorPortalRot: 0.2,
  impactStrength: 0.6,
  buildLength: 0.5,
  fallbackMotion: true,

  /* ---- STROBE / FLASH ENGINE ---- */
  strobe: 0.0,          // master amount
  strobeRate: 8,        // flashes per loop
  strobeMode: 'hard',   // hard | colour | invert | mixed
  strobeColor: '#ffffff',
  strobeBlack: 0.65,    // how far it cuts to black between flashes
  strobeHold: 0.35,     // duty cycle: fraction of each cycle spent lit

  // safety
  reducedFlash: false, reduceMotion: false,
  // colour
  palette: 'custom',
  hueShift: 0.0, saturation: 1.0, contrast: 1.0,

  /* render */
  quality: 1.0,
  zoom: 0,
  showGrid: false,
  showGuides: false,
  present: false,
};

const state = Object.assign({}, DEFAULTS);

const _subs = new Set();
const subscribe = fn => { _subs.add(fn); return () => _subs.delete(fn); };
const emit = keys => _subs.forEach(fn => fn(keys));

function set(k, v){
  if (state[k] === v) return;
  state[k] = v;
  emit([k]);
}
function setMany(o){
  const ks = [];
  for (const k in o){ if (state[k] !== o[k]){ state[k] = o[k]; ks.push(k); } }
  if (ks.length) emit(ks);
}

/* ------------------------------------------------------------- 2. HELPERS */
const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));
const clamp = (v,a,b) => v<a?a:(v>b?b:v);
const lerp = (a,b,t) => a+(b-a)*t;
const TAU = Math.PI*2;
const FONT = "var(--mono)";

function hexToRgb(hex){
  let h = String(hex||'#000000').replace('#','').trim();
  if (h.length === 3) h = h.split('').map(c=>c+c).join('');
  if (h.length !== 6 || /[^0-9a-f]/i.test(h)) h = '000000';
  return [parseInt(h.slice(0,2),16)/255, parseInt(h.slice(2,4),16)/255, parseInt(h.slice(4,6),16)/255];
}
function srgbToLin(c){ return c <= 0.04045 ? c/12.92 : Math.pow((c+0.055)/1.055, 2.4); }
function hexToLinear(hex){
  const r = hexToRgb(hex);
  return [srgbToLin(r[0]), srgbToLin(r[1]), srgbToLin(r[2])];
}
function linToSrgb(c){ return c <= 0.0031308 ? c*12.92 : 1.055*Math.pow(c,1/2.4)-0.055; }

let _toastT = 0;
function toast(msg, ms){
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('on');
  clearTimeout(_toastT);
  _toastT = setTimeout(()=>t.classList.remove('on'), ms||2400);
}

function download(blob, name){
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = name;
  document.body.appendChild(a);
  a.click();
  setTimeout(()=>{ URL.revokeObjectURL(a.href); a.remove(); }, 4000);
}

function slug(s){
  return (s||'composition').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,40) || 'composition';
}

/* seeded PRNG — deterministic compositions */
function mulberry32(a){
  a = a >>> 0;
  return function(){
    a = (a + 0x6D2B79F5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), 1 | t);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* aspect */
const ASPECTS = {'1:1':[1,1],'4:5':[4,5],'3:4':[3,4],'9:16':[9,16],
                 '4:3':[4,3],'16:9':[16,9],'21:9':[21,9]};
function aspectRatio(){
  if (state.aspect === 'custom')
    return [Math.max(.05, +state.customW || 1), Math.max(.05, +state.customH || 1)];
  return ASPECTS[state.aspect] || [3,4];
}

/* --------------------------------------------------- 3. TEXT RENDERER */
const TextRenderer = (() => {
  const COMP_W = 1000;               // composition space width (units)
  const SS = 1.5;                    // supersample for crispness
  const cv = document.createElement('canvas');
  const ctx = cv.getContext('2d');
  let layout = null;
  let key = '';

  function compH(){ const [aw,ah] = aspectRatio(); return Math.round(COMP_W*ah/aw); }

  function textKey(){
    return [state.text, state.fontFamily, state.fontWeight, state.fontSize, state.tracking,
      state.leading, state.align, state.textWidth, state.textScale, state.textRotate,
      state.textX, state.textY, state.textColor, state.autoFit, state.packed,
      state.packedAmount, state.justify, state.aspect, state.customW, state.customH,
      state.crop].join('|');
  }

  function measureSpaced(c, str, ls){
    let w = 0;
    for (const ch of str) w += c.measureText(ch).width + ls;
    return Math.max(0, w - ls);
  }

  function drawSpaced(c, str, x, y, ls, align){
    const total = measureSpaced(c, str, ls);
    let px = align === 'left' ? x : align === 'right' ? x - total : x - total/2;
    for (const ch of str){
      c.fillText(ch, px, y);
      px += c.measureText(ch).width + ls;
    }
    return total;
  }

  function render(){
    const W = COMP_W, H = compH();
    const cw = Math.round(W*SS), ch = Math.round(H*SS);
    cv.width = cw; cv.height = ch;
    ctx.setTransform(1,0,0,1,0,0);
    ctx.clearRect(0,0,cw,ch);

    const raw = state.text.length ? state.text : '';
    let lines = raw.split('\n');
    if (!lines.length) lines = [''];

    /* --- font sizing --- */
    let fontPx = Math.max(4, state.fontSize) * SS;
    const usableW = (state.textWidth/100) * cw;

    const fam = `"${state.fontFamily}"`;
    const mkFont = px => `${state.fontWeight} ${px}px ${fam}, Impact, "Arial Black", "Franklin Gothic Heavy", sans-serif`;

    ctx.font = mkFont(fontPx);

    if (state.autoFit){
      // find px such that widest line * tracking fits usableW
      let widest = 1;
      const probePx = 100;
      ctx.font = mkFont(probePx);
      for (const ln of lines){
        const ls = state.tracking * probePx;
        widest = Math.max(widest, measureSpaced(ctx, ln || ' ', ls));
      }
      const target = usableW / widest * probePx;
      /* Fit the block to the canvas height as well, so a landscape frame is
         filled rather than leaving the type as a thin band in the middle. */
      const nLines = Math.max(1, lines.length);
      const lead = state.leading * (state.packed ? (1 - state.packedAmount*0.52) : 1);
      /* blockH = fontPx*(lead*(n-1) + capRatio); solve for the px that fits ch
         with a margin. Getting this wrong is what cropped the last line off. */
      const capRatio = 0.72;
      /* the block is later multiplied by textScale * cropScale, so the fit has
         to account for that or the stack overflows the frame */
      const userScale = Math.max(0.15, state.textScale * (1 + state.crop*0.85));
      const maxByH = (ch * 0.86) / Math.max(0.30, lead*(nLines - 1) + capRatio) / userScale;
      fontPx = Math.max(4, Math.min(target, maxByH));
      ctx.font = mkFont(fontPx);
    }

    /* --- packing --- */
    let leading = state.leading;
    if (state.packed) leading = state.leading * (1 - state.packedAmount*0.52);
    leading = Math.max(0.28, leading);

    const ls = state.tracking * fontPx;
    const lineH = fontPx * leading;
    const capH = fontPx * 0.72;
    const blockH = lineH*(lines.length-1) + capH;

    /* --- transform --- */
    const cropScale = 1 + state.crop*0.85;
    const scale = state.textScale * cropScale;
    const rot = state.textRotate * Math.PI/180;

    ctx.save();
    ctx.translate(cw/2 + (state.textX/100)*cw, ch/2 + (state.textY/100)*ch);
    ctx.rotate(rot);
    ctx.scale(scale, scale);
    ctx.translate(-cw/2, -ch/2);

    /* Baselines run top+capH + i*lineH, so the painted band spans
       [top, top+capH+(n-1)*lineH]. Solve `top` to centre exactly that band —
       the earlier formula mis-centred and pushed the first line off the top. */
    const top = (ch - (capH + (lines.length-1)*lineH))/2;
    const ax = state.align === 'left' ? cw/2 - usableW/2
             : state.align === 'right' ? cw/2 + usableW/2
             : cw/2;

    ctx.font = mkFont(fontPx);
    ctx.fillStyle = '#ffffff';
    ctx.textBaseline = 'alphabetic';
    ctx.textAlign = 'left';

    const pos = [];
    for (let i=0;i<lines.length;i++){
      const y = top + capH + i*lineH;
      const ln = lines[i];
      // per-line justify: scale each line so it spans the column (poster look)
      let lineScale = 1;
      if (state.justify && ln.trim().length){
        const w = measureSpaced(ctx, ln, ls);
        if (w > 1) lineScale = usableW / w;
        /* Per-line stretch is what makes the stacked poster look fill its
           column, but a large factor visibly shears the glyphs. Keep it
           modest and let the auto-fit pass do the heavy lifting. */
        lineScale = Math.min(lineScale, 1.34);
      }
      if (lineScale !== 1){
        const w0 = measureSpaced(ctx, ln, ls);
        ctx.save();
        ctx.translate(ax, 0);
        ctx.scale(lineScale, 1);
        ctx.translate(-ax, 0);
        drawSpaced(ctx, ln, ax, y, ls*lineScale, state.align);
        ctx.restore();
      } else {
        drawSpaced(ctx, ln, ax, y, ls, state.align);
      }
      pos.push({ y, line: ln, scale: lineScale });
    }
    ctx.restore();

    layout = { W: cw, H: ch, compW: W, compH: H, fontPx, lineH, blockH, lines, ls, pos, scale };
    key = textKey();
    return layout;
  }

  function ensure(){
    if (!layout || key !== textKey()) render();
    return layout;
  }

  return {
    ensure,
    force(){ key=''; return render(); },
    get canvas(){ return cv; },
    get layout(){ return layout; },
    get rawKey(){ return key; },
    compH,
    COMP_W,
  };
})();

/* ---------------------------------------------- 3b. CURSOR INTERACTION
   Tracks the pointer in composition-normalised space (-1..1, aspect-corrected),
   smooths it on the animation clock and exposes a force vector. Deliberately
   keeps zero dependencies on React/DOM re-renders — the render loop reads it. */
const Cursor = (() => {
  let tx = 0, ty = 0;         // target, -1..1
  let x = 0, y = 0;           // smoothed
  let vx = 0, vy = 0;         // velocity, smoothed
  let inside = 0;             // 0..1 hover ramp
  let hasPointer = false;
  let down = false;
  let lastT = 0;
  let paintAcc = [];          // persistent brush strokes (composition space)

  function setTarget(nx, ny){
    tx = clamp(nx, -2, 2);
    ty = clamp(ny, -2, 2);
    hasPointer = true;
  }

  function enter(){ inside = 1; }
  function leave(){ inside = 0; down = false; }

  /* Called once per frame from the render loop with the frame delta. */
  function tick(dt){
    const k = clamp(dt*14 * (0.4 + state.cursorSens), 0.02, 1);
    const px = x, py = y;
    x += (tx - x) * k;
    y += (ty - y) * k;
    /* velocity in composition units/second, heavily damped */
    const nvx = (x - px) / Math.max(dt, 1e-4);
    const nvy = (y - py) / Math.max(dt, 1e-4);
    const vk = clamp(dt*10*(0.35+state.cursorDecay*1.6), 0.02, 1);
    vx += (nvx*0.045 - vx) * vk;
    vy += (nvy*0.045 - vy) * vk;

    /* hover ramp also decays so leave() feels like a slow release */
    if (!inside) {
      // nothing; inside is driven by enter/leave handlers
    }
  }

  function decayHover(dt){
    /* called separately so hover state is stable within a frame */
  }

  function paintStroke(){
    if (!state.cursorBrush) return;
    const max = 96;
    paintAcc.push({ x, y, w: state.cursorForce });
    if (paintAcc.length > max) paintAcc.shift();
  }

  return {
    tick,
    setTarget, enter, leave,
    set down(v){ down = !!v; },
    get down(){ return down; },
    get x(){ return x; },
    get y(){ return y; },
    get vx(){ return vx; },
    get vy(){ return vy; },
    get inside(){ return inside; },
    get hasPointer(){ return hasPointer; },
    get strokes(){ return paintAcc; },
    clearStrokes(){ paintAcc = []; },
    reset(){ x = y = vx = vy = 0; tx = ty = 0; inside = 0; down = false; paintAcc = []; },
  };
})();

/* ------------------------------------------ 4. WEBGL2 LIQUID PIPELINE */
const Renderer = (() => {
  const canvas = $('#gl');
  let gl = null, ok = false, useHalf = false;
  let P = {};                       // programs
  let rt = {};                      // render targets
  let texText = null;
  let compW = 0, compH = 0, halfW = 0, halfH = 0;
  let lastTextKey = '';
  let vao = null;
  let fbReady = false;
  let fbFlip = 0;               // ping-pong index
  let postOn = false;           // any post effect active this frame
  let frameCount = 0;

  const VS = `#version 300 es
in vec2 aPos;
out vec2 vUv;
void main(){ vUv = aPos*0.5+0.5; gl_Position = vec4(aPos,0.0,1.0); }`;

  /* ---------------- noise library ---------------- */
  const LIB = `
precision highp float;
#define PI  3.141592653589793
#define TAU 6.283185307179586

uniform float uPhase;   // 0..1 loop phase
uniform float uTime;    // seconds within loop
uniform float uSeed;
uniform float uSeamless; // 1 = periodic

float hash11(float p){ p = fract(p*0.1031); p *= p+33.33; p *= p+p; return fract(p); }
float hash21(vec2 p){
  vec3 p3 = fract(vec3(p.xyx)*0.1031);
  p3 += dot(p3, p3.yzx+33.33);
  return fract((p3.x+p3.y)*p3.z);
}
vec2 hash22(vec2 p){
  vec3 p3 = fract(vec3(p.xyx)*vec3(0.1031,0.1030,0.0973));
  p3 += dot(p3,p3.yzx+33.33);
  return fract((p3.xx+p3.yz)*p3.zy);
}
float gnoise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f*f*f*(f*(f*6.0-15.0)+10.0);
  float a = dot(hash22(i)*2.0-1.0, f);
  float b = dot(hash22(i+vec2(1,0))*2.0-1.0, f-vec2(1,0));
  float c = dot(hash22(i+vec2(0,1))*2.0-1.0, f-vec2(0,1));
  float d = dot(hash22(i+vec2(1,1))*2.0-1.0, f-vec2(1,1));
  return mix(mix(a,b,u.x), mix(c,d,u.x), u.y)*0.5+0.5;
}
const mat2 ROT = mat2(0.80,0.60,-0.60,0.80);
float fbm(vec2 p, int oct){
  float v=0.0, a=0.5, tot=0.0;
  for(int i=0;i<6;i++){
    if(i>=oct) break;
    v += a*gnoise(p); tot += a;
    p = ROT*p*2.03 + 17.3; a *= 0.5;
  }
  return v/max(tot,1e-4);
}
float fbmR(vec2 p, int oct){
  float v=0.0, a=0.5, tot=0.0;
  for(int i=0;i<6;i++){
    if(i>=oct) break;
    float n = 1.0-abs(gnoise(p)*2.0-1.0);
    v += a*n*n; tot += a;
    p = ROT*p*2.07 + 11.7; a *= 0.5;
  }
  return v/max(tot,1e-4);
}
float smin(float a, float b, float k){
  if(k < 1e-5) return min(a,b);
  float h = clamp(0.5 + 0.5*(b-a)/k, 0.0, 1.0);
  return mix(b,a,h) - k*h*(1.0-h);
}
/* periodic drift: a point orbiting on a circle -> perfectly seamless */
vec2 orbit(float ang, float r, float ph){ return vec2(cos(ang+ph), sin(ang+ph))*r; }
`;

  /* ---------------- FIELD PASS ---------------- */
  const FS_FIELD = `#version 300 es
${LIB}
in vec2 vUv;
out vec4 outC;

uniform vec2  uRes;
uniform float uAspect;
uniform float uBlobSize;
uniform int   uBlobCount;
uniform float uFlow;
uniform float uNoiseScale;
uniform float uNoiseStrength;
uniform float uSmoothK;
uniform float uMotionAmp;
uniform float uWarp;
uniform vec2  uLiquidOff;
uniform float uLiquidScale;
uniform int   uOct;
uniform float uRandom;
uniform float uIntensity;
uniform float uSoft;

/* one metaball: masses hug the frame edge like poured liquid, drifting slowly
   around a ring so they merge, split and rejoin without leaving the frame. */
void blob(int idx, out vec2 c, out float r){
  float i = float(idx);
  float A = uPhase*TAU;
  float Ai = uTime*uFlow;

  float h1 = hash11(i*7.13 + uSeed*0.017);
  float h2 = hash11(i*3.77 + 11.0 + uSeed*0.031);
  float h3 = hash11(i*11.3 + 23.0 + uSeed*0.059);
  float h4 = hash11(i*5.31 + 41.0 + uSeed*0.011);
  float h5 = hash11(i*2.17 + 71.0 + uSeed*0.073);

  /* base angle: golden-angle spread so blobs never clump on one side */
  float baseAng = i*2.399963 + h1*0.9 + uSeed*0.0007;

  /* slow orbital drift — integer harmonics keep the loop seamless */
  float drift;
  if(uSeamless > 0.5){
    drift = sin(A*(1.0+floor(h2*2.0)) + h3*TAU)*0.55
          + sin(A*(2.0+floor(h4*2.0)) + h5*TAU)*0.22;
    drift += sin(A + float(idx))*0.12;
  } else {
    drift = sin(Ai*(0.21+h2*0.18) + h3*TAU)*0.55
          + sin(Ai*(0.37+h4*0.22) + h5*TAU)*0.22;
  }
  float ang = baseAng + drift*uMotionAmp*0.55;

  /* ring radius: outside the frame edge so only the inner flank shows */
  float ringR = (0.88 + h2*1.02) * (0.80 + uMotionAmp*0.45);
  /* aspect-independent so tall/short canvases both read well */
  vec2 dir = vec2(cos(ang), sin(ang)/max(uAspect,0.35));
  dir = normalize(dir);
  c = dir * ringR;

  /* a couple of interior masses so the middle isn't dead */
  float inward = (h4 > 0.68) ? (h4-0.68)*1.9 : 0.0;
  c *= (1.0 - inward);

  c += vec2((h1-0.5)*0.34, (h2-0.5)*0.26) * uRandom;
  c -= uLiquidOff*0.0;

  r = uBlobSize*(0.62 + h3*0.75);
  float osc = uSeamless > 0.5
    ? sin(A*(1.0+floor(h4*2.0)) + i*1.9)*0.18
    : sin(Ai*(0.4+h4*0.4)+i*1.9)*0.18;
  r *= 1.0 + osc;
  r *= uLiquidScale;
}

float field(vec2 p){
  /* --- two-level domain warp --- */
  vec2 q, r2;
  vec2 od;
  if(uSeamless > 0.5){
    od = orbit(uPhase*TAU, 1.7, 0.0);
    vec2 od2 = orbit(uPhase*TAU, 1.3, 2.1);
    q = vec2(fbm(p*uNoiseScale + od*0.55, uOct),
             fbm(p*uNoiseScale + od2*0.55 + 5.2, uOct));
    r2 = vec2(fbm(p*uNoiseScale + q*3.4 + 3.6, uOct),
              fbm(p*uNoiseScale + q*3.4 + 9.1, uOct));
  } else {
    float T = uTime*uFlow;
    q = vec2(fbm(p*uNoiseScale + vec2(0.0, T*0.13), uOct),
             fbm(p*uNoiseScale + vec2(5.2,1.3) - vec2(T*0.11,0.0), uOct));
    r2 = vec2(fbm(p*uNoiseScale + q*3.4 + vec2(1.7,9.2) + T*0.09, uOct),
              fbm(p*uNoiseScale + q*3.4 + vec2(8.3,2.8) - T*0.10, uOct));
  }
  vec2 wp = p + (r2-0.5)*uWarp*uNoiseStrength*1.15;

  /* --- smooth-min union of metaballs --- */
  float d = 1e5;
  for(int i=0;i<12;i++){
    if(i>=uBlobCount) break;
    vec2 c; float r;
    blob(i, c, r);
    float wob = fbm(wp*(2.4+float(i)*0.20) + float(i)*13.7 + orbit(uPhase*TAU, 0.9, float(i)), 3);
    float rr = r*(0.58 + 0.92*wob);
    float ang = hash11(float(i)*2.71 + uSeed*0.02)*TAU;
    if(uSeamless > 0.5) ang += sin(uPhase*TAU + float(i))*0.35;
    else ang += uTime*uFlow*0.1;
    vec2 dv = wp - c;
    float ca = cos(ang), sa = sin(ang);
    dv = mat2(ca,-sa,sa,ca)*dv;
    dv.x *= 0.76 + 0.40*wob;
    d = smin(d, length(dv) - rr, uSmoothK);
  }

  /* --- fine surface detail --- */
  float det = fbmR(wp*uNoiseScale*3.3 + orbit(uPhase*TAU, 2.2, 4.0), 3);
  d += (det-0.5)*0.18*uNoiseStrength;
  return d;
}

void main(){
  vec2 p = (vUv-0.5);
  p.x *= uAspect;
  p *= 1.95;
  p -= uLiquidOff;

  float d = field(p);

  /* mask: 1 inside liquid */
  float mask = smoothstep(uSoft, -uSoft, d);
  /* thin rim band hugging the boundary — drives the saturated red edge */
  float rim  = 1.0 - smoothstep(0.0, uSoft*2.2 + 0.05, abs(d));
  rim = pow(rim, 0.65);

  /* interior structure: pale mottling + molten veins */
  float n1 = fbm(p*uNoiseScale*1.15 + orbit(uPhase*TAU, 1.1, 7.0), 3);
  float n2 = fbmR(p*uNoiseScale*1.9 + orbit(uPhase*TAU, 1.9, 3.0), 2);

  outC = vec4(mask, clamp(d*0.5+0.5, 0.0, 1.0), clamp(n1*0.6+n2*0.7, 0.0, 1.0), rim);
}`;

  /* ---------------- BLUR PASS ---------------- */
  const FS_BLUR = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 outC;
uniform sampler2D uTex;
uniform vec2 uDir;
void main(){
  vec4 s = texture(uTex, vUv)*0.2270270270;
  s += texture(uTex, vUv + uDir*1.3846153846)*0.3162162162;
  s += texture(uTex, vUv - uDir*1.3846153846)*0.3162162162;
  s += texture(uTex, vUv + uDir*3.2307692308)*0.0702702703;
  s += texture(uTex, vUv - uDir*3.2307692308)*0.0702702703;
  outC = s;
}`;

  /* ---------------- DOWN/TEXT COPY ---------------- */
  const FS_COPY = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 outC;
uniform sampler2D uTex;
void main(){ outC = texture(uTex, vUv); }`;

  /* ---------------- COMPOSITE ---------------- */
  const FS_COMP = `#version 300 es
${LIB}
in vec2 vUv;
out vec4 outC;

uniform sampler2D uField;
uniform sampler2D uHalo;
uniform sampler2D uMed;
uniform sampler2D uText;
uniform sampler2D uTextB;

uniform vec2  uRes;
uniform vec2  uTextRes;
uniform float uAspect;

uniform vec3  uColRed, uColPink, uColPale, uColWhite, uColText, uColBg;
uniform float uRedI, uPinkI, uWhiteI, uBlack;
uniform float uGlowI, uGlowR, uBloomT;
uniform float uChroma, uRGBSep;
uniform float uEcho, uEdgeGlow, uTextBlur, uTextOpacity;
uniform float uWarpX, uWarpY, uRipple, uRippleF, uBulge;
uniform float uTextSpeed, uTextAmp, uScaleOsc, uDriftX, uDriftY, uJitter;
uniform int   uEchoN;
uniform float uMolten, uDistortOn;
uniform float uVignette, uGrain, uPulse, uIntensity;

/* ---- PARTY typography transform uniforms ---- */
uniform float uElastic, uFragment, uPersp, uSpiral, uMelt;
uniform float uExtrude, uNeon, uLineStagger, uCharAnim;
uniform float uGlitch, uTypeForce, uHueShift, uContrast, uWaveI;
uniform float uTextOutline;
uniform vec3  uColAccent;

/* ---- CURSOR INTERACTION ---- */
uniform vec2  uCursor;        // -1..1 composition space, smoothed
uniform vec2  uCursorVel;     // velocity, for the wake
uniform float uCursorOn;      // 0/1 master
uniform float uCursorForce;
uniform float uCursorRadius;
uniform float uCursorLiquid;
uniform float uCursorGravity;
uniform float uCursorType;
uniform float uCursorPortal;
uniform float uCursorBrush;
uniform vec3  uCursorCol;
uniform float uCursorGlow;
uniform float uHoverAmt;      // 0..1 fade in/out on enter/leave
uniform float uPortalDepth;
uniform float uPortalRot;

float textAt(vec2 uv, float lod){
  if(uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) return 0.0;
  return textureLod(uText, uv, lod).a;
}
float textBlurAt(vec2 uv){
  if(uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) return 0.0;
  return texture(uTextB, uv).a;
}

void main(){
  vec2 uv = vUv;
  float A = uPhase*TAU;
  float ts = uTextSpeed;

  /* ================= CURSOR FIELD =================
     The pointer is a real force in composition space. Everything downstream
     (type warp, liquid sampling) reads from these two vectors, so the whole
     world bends around it rather than just the top layer. */
  vec2 cp = (uv-0.5); cp.x *= uAspect;
  vec2 cur = uCursor; cur.x *= uAspect;
  vec2 cToP = cp - cur;
  float cDist = length(cToP);
  vec2 cDir = cToP / max(cDist, 1e-4);
  /* smooth radial falloff, never a hard disc */
  float cFall = smoothstep(uCursorRadius, uCursorRadius*0.12, cDist) * uCursorOn * uHoverAmt;
  /* push away from the pointer, plus a small pull ring for the gravity well */
  vec2 cPush = cDir * cFall * uCursorForce * uCursorLiquid * 0.085;
  vec2 cPull = -cDir * cFall * uCursorForce * uCursorGravity * 0.075;
  /* a shallow vortex so liquid shears rather than just shoving */
  vec2 cSwirl = vec2(-cDir.y, cDir.x) * cFall * uCursorForce * uCursorLiquid * 0.045;
  vec2 cField = cPush + cPull + cSwirl;
  /* the wake: velocity trails behind the pointer, smoothed by the decay param */
  cField += uCursorVel * cFall * uCursorForce * 0.55;

  /* ================= TEXT DISPLACEMENT FIELD ================= */
  vec2 tp = (uv-0.5); tp.x *= uAspect;

  vec2 w1 = orbit(A, 0.9, 0.0);
  vec2 w2 = orbit(A, 0.7, 2.4);
  float nA = fbm(tp*1.35 + w1, 3);
  float nB = fbm(tp*1.75 + w2 + 7.3, 3);
  vec2 disp = vec2(nA-0.5, nB-0.5)*2.0;

  /* concentric ripple radiating from an orbiting point */
  vec2 rc = orbit(A, 0.42, 1.1);
  vec2 dv2 = tp - rc;
  float rd = length(dv2);
  float ripple = sin(rd*uRippleF*7.0 - A*2.0) * smoothstep(1.35, 0.05, rd);
  disp += (dv2/max(rd,1e-4)) * ripple * 0.30;

  /* breathing bulge */
  disp += tp * uBulge * 0.18 * sin(A);

  /* fine jitter */
  vec2 jit = vec2(gnoise(tp*15.0 + orbit(A,3.0,0.0)), gnoise(tp*15.0 + orbit(A,3.0,5.0)+3.1))-0.5;
  disp += jit * uJitter * 0.09;

  /* pointer pushes letterforms directly */
  disp += cField * uCursorType * 1.6;

  disp *= uDistortOn;

  /* scale oscillation + drift */
  float sc = 1.0 + sin(A)*uScaleOsc*0.16*uIntensity;
  vec2 drift = orbit(A, 1.0, 0.0) * vec2(uDriftX, uDriftY) * 0.045 * uDistortOn;

  /* ============ PARTY TYPOGRAPHY TRANSFORMS ============ */
  /* elastic stretching: a travelling squeeze that stretches letters sideways */
  float elast = sin(A*2.0 + uv.y*3.4) * uElastic;
  disp.x += elast * 0.10;
  disp.y += sin(A*3.0 + uv.x*4.1) * uElastic * 0.035;

  /* wave interference between two crossing wavefronts */
  if(uWaveI > 0.001){
    vec2 wc = (uv-0.5);
    float w1f = sin(length(wc - orbit(A,0.28,0.0))*22.0 - A*3.0);
    float w2f = sin(length(wc - orbit(A,0.34,2.6))*17.0 - A*2.0);
    disp += wc * (w1f + w2f) * uWaveI * 0.020;
  }

  vec2 tuv = uv;
  tuv = (tuv-0.5)/max(sc, 0.05) + 0.5;
  tuv += disp * vec2(uWarpX, uWarpY) * 0.085;
  tuv -= drift;

  /* perspective: vertical foreshortening (top reads closer) */
  if(uPersp > 0.001){
    float k = (tuv.y - 0.5);
    tuv.x = 0.5 + (tuv.x-0.5) * (1.0 + k*uPersp*0.85);
    tuv.y = 0.5 + k * (1.0 - uPersp*0.18);
  }

  /* spiral: rotate around centre with an angle that grows with radius */
  if(uSpiral > 0.001){
    vec2 d = tuv - 0.5; d.x *= uAspect;
    float r = length(d);
    float a = r*r*uSpiral*3.4 + A*0.6*uSpiral;
    float ca2 = cos(a), sa2 = sin(a);
    d = mat2(ca2,-sa2,sa2,ca2)*d;
    d.x /= uAspect;
    tuv = d + 0.5;
  }

  /* portal: a recursive zoom lens centred on the pointer */
  if(uCursorOn > 0.5 && uCursorPortal > 0.5){
    vec2 pv = tuv - (cur/vec2(uAspect,1.0) + 0.5);
    pv.x *= uAspect;
    float pr = length(pv);
    float prad = uCursorRadius*1.35;
    float inside = smoothstep(prad, prad*0.15, pr) * uHoverAmt;
    if(inside > 0.001){
      float zoomK = 1.0 - uPortalDepth*0.55*inside;
      float angP = uPortalRot*2.2*inside + A*0.25*inside;
      float cp2 = cos(angP), sp2 = sin(angP);
      vec2 rp = mat2(cp2,-sp2,sp2,cp2) * pv * zoomK;
      rp.x /= uAspect;
      tuv = mix(tuv, rp + (cur/vec2(uAspect,1.0) + 0.5), inside);
    }
  }

  /* melt: liquid drips pulling the bottom of each glyph downward */
  if(uMelt > 0.001){
    float m = fbm(vec2(tuv.x*9.0, tuv.y*3.2 - A*0.5), 3);
    tuv.y += (m-0.42) * uMelt * 0.075 * smoothstep(0.15,0.95,tuv.y);
  }

  /* line stagger: each text line animates on its own phase */
  if(uLineStagger > 0.001){
    float band = floor(tuv.y*7.0);
    tuv.x += sin(A*2.0 + band*1.7) * uLineStagger * 0.022;
    tuv.y += sin(A*1.5 + band*2.3) * uLineStagger * 0.012;
  }

  /* character wave: high-frequency horizontal ripple across the raster */
  if(uCharAnim > 0.001){
    tuv.x += sin(tuv.x*34.0 + A*3.0)*uCharAnim*0.0045;
    tuv.y += cos(tuv.x*21.0 - A*2.0)*uCharAnim*0.0035;
  }

  /* glitch: hard horizontal slice displacement */
  if(uGlitch > 0.001){
    float sl = floor(tuv.y*26.0);
    float hr = hash11(sl*4.7 + floor(uTime*9.0)*13.1);
    if(hr > 0.72) tuv.x += (hr-0.72)*uGlitch*0.26;
    tuv.x += (hash11(floor(uTime*14.0)+sl)-0.5)*uGlitch*0.012;
  }

  /* fragment: horizontal slices torn apart with a hard edge */
  float fragMask = 0.0;
  if(uFragment > 0.001){
    float sl = floor(tuv.y*18.0);
    float r1 = hash11(sl*7.31 + 2.0);
    if(r1 > 0.62){
      float sep = (r1-0.62)*uFragment*0.30;
      tuv.x += sep * (r1>0.81 ? 1.0 : -1.0);
      fragMask = 1.0;
    }
  }

  /* chromatic offsets in text space */
  vec2 ca = vec2(uRGBSep, uRGBSep*0.4) * (uChroma*2.4 + 0.0001);

  float lodBase = uTextBlur * mix(0.4, 4.2, uMolten);

  /* ---- text alpha with echoes ---- */
  float ta = textAt(tuv, lodBase);
  for(int i=1;i<=4;i++){
    if(i > uEchoN) break;
    float fi = float(i);
    vec2 eo = orbit(A, 1.0, 0.4) * vec2(0.020, 0.011) * fi * uEcho * 2.2;
    float ea = textAt(tuv + eo, lodBase + fi*0.85) * (uEcho/(fi*1.6));
    ta = max(ta, ea);
  }
  ta *= uTextOpacity;

  float taR = textAt(tuv + ca, lodBase);
  float taB = textAt(tuv - ca, lodBase);
  float tg  = textBlurAt(tuv);

  /* ================= LIQUID ================= */
  /* the liquid is sampled through the pointer field too */
  vec2 fuv = uv + cField * uCursorLiquid * 0.55;
  vec4 F = texture(uField, fuv);
  float mask = F.r;
  float detail = F.b;
  float rim = F.a;

  vec4 H = texture(uHalo, uv);
  vec3 halo = H.rgb;
  vec4 M = texture(uMed, uv);
  vec3 med = M.rgb;

  /* ---- build liquid color ----
     Three concentric zones, matching the reference:
       1. black air with a bleeding red glow
       2. a thick saturated red ring hugging the silhouette
       3. a pale / white molten core
  */
  vec3 col = uColBg;

  vec3 redM   = uColRed  * uRedI;
  vec3 pinkM  = uColPink * uPinkI;
  vec3 paleM  = uColPale * uWhiteI;
  vec3 whiteM = uColWhite* uWhiteI;

  float wide = clamp(halo.r*uGlowR*1.25, 0.0, 1.0);
  float mid  = clamp(med.r *uGlowR*1.35, 0.0, 1.0);

  /* --- zone weights --- */
  float air  = 1.0 - smoothstep(0.0, 0.46, mask);
  float ring = smoothstep(0.0, 0.40, mask) * (1.0 - smoothstep(0.46, 0.96, mask));
  /* break up the ring with noise so it never reads as a flat graphic slab */
  ring *= 0.45 + 0.95*detail;
  float core = smoothstep(0.48, 0.97, mask);

  /* 1. glow bleeding into black — falls off fast so corners stay pure black */
  col += redM * pow(wide, 2.2) * air * uGlowI * 2.30 * uPulse;
  col += redM * pow(mid,  1.9) * air * uGlowI * 1.15 * uPulse;

  /* 2. saturated red ring */
  col += redM  * ring * uGlowI * 1.95 * uPulse;
  col += pinkM * ring * uGlowI * 0.55;
  /* the ring's hot inner edge goes pink */
  col += pinkM * smoothstep(0.50, 0.80, mask) * (1.0-smoothstep(0.80,0.97,mask)) * 0.55;

  /* 3. pale / white molten core */
  vec3 liquidCol = mix(paleM, whiteM, smoothstep(0.22, 0.86, detail));
  /* slight red contamination at the inner lip so it doesn't look pasted on */
  liquidCol = mix(redM*1.0, liquidCol, smoothstep(0.46, 0.94, mask));
  col = mix(col, liquidCol, core);

  /* thin bright rim right on the silhouette */
  col += whiteM * smoothstep(0.86, 1.0, mask) * (1.0 - smoothstep(1.0, 1.0, mask)) * 0.0;

  /* ================= TEXT COMPOSITING ================= */
  /* glow around the letterforms (blurred text minus sharp text) */
  /* band = where the blurred type exists but the sharp type does not.
     clamp(tg - ta) guarantees it is zero inside a solid letterform. */
  float band = clamp(tg - ta, 0.0, 1.0);
  col += redM  * band * uEdgeGlow * 2.10;
  col += pinkM * band * uEdgeGlow * 0.95;

  /* chromatic fringe on letter edges */
  float fR = clamp(taR - ta, 0.0, 1.0);
  float fB = clamp(taB - ta, 0.0, 1.0);
  col += redM  * fR * uChroma * 2.6;
  col += pinkM * fB * uChroma * 2.6;

  /* ---- EXTRUSION: stacked offset copies behind the glyph ---- */
  if(uExtrude > 0.004){
    float acc = 0.0;
    for(int i=1;i<=6;i++){
      float fi = float(i);
      vec2 off = vec2(0.0075, 0.0110)*fi*uExtrude
               + vec2(sin(A*0.9+fi*0.5), cos(A*0.7+fi*0.4))*0.0022*uExtrude;
      acc = max(acc, textAt(tuv + off, lodBase + fi*0.5));
    }
    acc = clamp(acc - ta, 0.0, 1.0);
    col = mix(col, mix(uColText, uColAccent, 0.55), acc*0.72);
    col += uColAccent * acc * 0.14;
  }

  /* ---- NEON OUTLINE: bright edge ring around every glyph ---- */
  if(uNeon > 0.004){
    float o1 = textAt(tuv + vec2( 0.0026, 0.0), lodBase);
    float o2 = textAt(tuv + vec2(-0.0026, 0.0), lodBase);
    float o3 = textAt(tuv + vec2(0.0,  0.0032), lodBase);
    float o4 = textAt(tuv + vec2(0.0, -0.0032), lodBase);
    float ringT = clamp(max(max(o1,o2),max(o3,o4)) - ta, 0.0, 1.0);
    col += (uColAccent*1.5 + uColRed*0.35) * ringT * uNeon * 2.4;
  }

  /* ================= LETTERFORMS =================
     Whatever the type colour, the glyph has to separate from what is behind it.
     We build a one-pixel-ish contour by resampling the glyph field at a small
     radius: the ring is where the outline sits, ta is the solid interior.
     Light type gets a dark contour, dark type gets a bright one, so a preset
     can put type over black, over white liquid, or both at once. */
  vec3 tc = uColText;
  float lum = dot(tc, vec3(0.299,0.587,0.114));
  float isDark = step(lum, 0.42);

  float oe = 0.0014 + 0.0048*uTextBlur;
  float g1 = textAt(tuv + vec2( oe, 0.0), lodBase);
  float g2 = textAt(tuv + vec2(-oe, 0.0), lodBase);
  float g3 = textAt(tuv + vec2(0.0,  oe), lodBase);
  float g4 = textAt(tuv + vec2(0.0, -oe), lodBase);
  float ring = clamp(max(max(g1,g2),max(g3,g4)) - ta, 0.0, 1.0) * uTextOutline;

  /* the outline colour is the inverse of the type colour, so contrast is
     guaranteed rather than hoped for */
  vec3 outlineCol = mix(vec3(0.015, 0.008, 0.020), vec3(0.97), isDark);
  col = mix(col, outlineCol, clamp(ring, 0.0, 1.0)*0.92);

  if(isDark < 0.5){
    /* dark type carves into the liquid: the glyph reads as a hole punched
       through, which is the reference look, but only where liquid exists.
       Over black the outline above keeps the letterform visible. */
    vec3 hole = vec3(0.006, 0.001, 0.004);
    float deep = clamp(ta, 0.0, 1.0);
    vec3 glyph = mix(hole, outlineCol, 1.0 - smoothstep(0.0, 0.25, uTextOutline));
    col = mix(col, glyph, deep);
    col += mix(uColPale, uColAccent, 0.35) * band * uExtrude * 0.55;
  } else {
    col = mix(col, tc*(0.90 + uGlowI*0.20), clamp(ta,0.0,1.0));
  }

  /* fragmented slices get a hot leading edge so they read as torn */
  if(fragMask > 0.5){
    col += uColAccent * ta * uFragment * 0.85;
    col += uColRed * ta * uFragment * 0.35;
  }
  /* glitch rows flash the accent colour */
  if(uGlitch > 0.004){
    float sl = floor(tuv.y*26.0);
    float hr = hash11(sl*4.7 + floor(uTime*9.0)*13.1);
    if(hr > 0.86) col = mix(col, uColAccent*1.6, ta*0.55*uGlitch);
  }

  /* molten: dissolve the letter edges into the liquid */
  float moltenBand = band * uMolten * smoothstep(0.05, 0.9, mask);
  col += mix(paleM, redM, 0.30) * moltenBand * 0.42;

  /* ================= GRADE ================= */
  col = max(col - uBlack*0.22, 0.0);

  /* vignette */
  float vig = 1.0 - uVignette*pow(length((uv-0.5)*vec2(1.03,1.0))*1.44, 2.1);
  col *= clamp(vig, 0.0, 1.0);

  /* ---- CURSOR WAKE GLOW ---- */
  if(uCursorOn > 0.5 && uCursorGlow > 0.001){
    float wd = length(cp - cur);
    float core = exp(-wd*wd/max(uCursorRadius*uCursorRadius*0.22, 1e-4));
    float halo = exp(-wd/max(uCursorRadius*1.1, 1e-4));
    float pulseAmt = 0.65 + 0.35*sin(A*3.0);
    col += uCursorCol * (core*1.25 + halo*0.30) * uCursorGlow * cFall * pulseAmt;
  }

  /* grain */
  float g = hash21(uv*uRes + vec2(uTime*137.0, uTime*61.0)) - 0.5;
  col += g * uGrain * 0.18;

  /* contrast + hue rotation */
  col = (col - 0.5)*uContrast + 0.5;
  if(abs(uHueShift) > 0.0005){
    const vec3 k = vec3(0.57735);
    float ca3 = cos(uHueShift), sa3 = sin(uHueShift);
    col = col*ca3 + cross(k, col)*sa3 + k*dot(k, col)*(1.0-ca3);
  }

  col = clamp(col, 0.0, 1.0);
  outC = vec4(col, 1.0);
}`;


  /* ---------------- GEOMETRY / LASER LAYER ----------------
     Rendered additively on top of the composite. Radial beams, concentric
     rings, wireframe grid and explosive spokes — all coherent with one
     shared angular clock so nothing feels random. */
  const FS_GEOM = `#version 300 es
${LIB}
in vec2 vUv;
out vec4 outC;

uniform vec2  uRes;
uniform float uAspect;
uniform float uLasers, uLaserCount, uLaserWidth, uLaserSpeed;
uniform float uRings, uRingCount, uRingThick;
uniform float uGrid, uGridScale;
uniform float uBursts;
uniform vec3  uColAccent, uColRed, uColPink;
uniform float uEnergy, uChaos, uIntensity;
uniform vec2  uFocus;

float spokes(vec2 d, float n, float w){
  float a = atan(d.y, d.x);
  float k = abs(sin(a*n*0.5));
  return pow(k, mix(22.0, 2.4, w));
}

void main(){
  vec2 uv = vUv;
  vec2 d = uv - 0.5;
  d.x *= uAspect;
  vec2 rel = d - uFocus;
  float r = length(rel);
  float A = uPhase*TAU;
  vec3 col = vec3(0.0);

  /* ---- neon beams sweeping from the focus ---- */
  if(uLasers > 0.001){
    float n = max(2.0, uLaserCount);
    float a = atan(rel.y, rel.x);
    float swing = sin(A*0.7 + 1.3)*0.55*uEnergy;
    float beam = spokes(rel, n, uLaserWidth);
    float aa = abs(sin((a + swing)*n*0.5));
    beam = pow(clamp(aa,0.0,1.0), mix(90.0, 2.0, uLaserWidth*2.6));
    /* pulses travelling outward along each beam */
    float flow = 0.55 + 0.45*sin(r*10.0 - A*(2.0+uLaserSpeed*6.0)*3.0);
    float fall = exp(-r*1.55);
    vec3 lc = mix(uColAccent, uColPink, 0.5+0.5*sin(a*3.0+A));
    col += lc * beam * fall * flow * uLasers * 2.4 * uIntensity;
    /* a tight hot core right at the focus */
    col += uColRed * exp(-r*22.0) * uLasers * 1.4;
  }

  /* ---- concentric rings / rotating cathedral ---- */
  if(uRings > 0.001){
    float rc = max(1.0, uRingCount);
    float phaseR = r*rc*1.55 - A*0.55*uEnergy;
    float ringv = abs(fract(phaseR)-0.5)*2.0;
    float thick = mix(0.90, 0.02, clamp(uRingThick,0.0,1.0));
    float ringm = 1.0 - smoothstep(0.0, thick, ringv);
    /* elliptical squash that slowly rotates for an impossible-perspective feel */
    float sq = 0.45 + 0.55*abs(sin(A*0.35));
    vec2 rd = vec2(rel.x, rel.y/max(sq,0.15));
    float pr = length(rd)*rc*1.55 - A*0.55*uEnergy;
    float pv = abs(fract(pr)-0.5)*2.0;
    float pm = 1.0 - smoothstep(0.0, thick, pv);
    ringm = max(ringm*0.55, pm);
    float fade = exp(-r*1.05);
    col += mix(uColAccent, uColRed, 0.35) * ringm * fade * uRings * 2.0 * uIntensity;
  }

  /* ---- wireframe grid in perspective ---- */
  if(uGrid > 0.001){
    vec2 gp = rel;
    /* fake perspective: divide by depth so lines converge */
    float depth = 1.0 + 0.55*(0.5 - uv.y);
    gp /= max(depth, 0.25);
    gp *= uGridScale;
    gp += vec2(A*0.35*uEnergy, A*0.22*uEnergy);
    vec2 gl2 = abs(fract(gp)-0.5);
    float lw = 0.028;
    float gx = 1.0 - smoothstep(0.0, lw, gl2.x);
    float gy = 1.0 - smoothstep(0.0, lw, gl2.y);
    float gm = max(gx, gy);
    float gfade = exp(-r*1.9) * (0.5 + 0.5*sin(A*2.0));
    col += uColAccent * gm * gfade * uGrid * 1.7 * uIntensity;
  }

  /* ---- explosive radial bursts ---- */
  if(uBursts > 0.001){
    /* sharp attack: a burst fires twice per loop, seamlessly */
    float fire = pow(max(0.0, sin(A*2.0)), 8.0);
    float shell = exp(-pow((r - fire*1.35)*7.0, 2.0));
    float ang = atan(rel.y, rel.x);
    float rays = pow(abs(sin(ang*14.0 + A*2.0)), 6.0);
    col += mix(uColPink, uColAccent, fire) * shell * (0.35+rays) * uBursts * 3.0 * uIntensity;
    col += uColRed * exp(-r*9.0) * fire * uBursts * 2.0;
  }

  col = clamp(col, 0.0, 1.0);
  outC = vec4(col, clamp(max(max(col.r,col.g),col.b)*1.35, 0.0, 1.0));
}`;

  /* ---------------- TRANCE POST ----------------
     Consumes the composite (and the previous frame for feedback) and applies
     the psychedelic stack: feedback -> kaleidoscope -> tunnel -> fractal
     contours -> lens -> chroma -> colour -> finish. */
  const FS_POST = `#version 300 es
${LIB}
in vec2 vUv;
out vec4 outC;

uniform sampler2D uScene;
uniform sampler2D uPrev;
uniform sampler2D uGeom;
uniform vec2  uRes;
uniform float uAspect;

uniform float uTrance, uTranceI;
uniform float uKaleido, uKaleidoSeg, uKaleidoRot;
uniform float uTunnel, uTunnelDepth, uTunnelSpeed, uTunnelWarp;
uniform float uFractal, uFractalScale, uContour;
uniform float uFeedback, uFbZoom, uFbRotate, uTrail;
uniform float uLens, uPinch, uWaveI;
uniform float uChroma, uPoster, uScan, uHalation, uInvert;
uniform float uHue, uSat, uContrast, uGrain;
uniform float uGeomOn;
uniform vec3  uColRed, uColPink, uColAccent;
uniform float uFlash;   /* reduced-flash damping, 0..1 */
uniform float uStrobe, uStrobeRate, uStrobeBlack, uStrobeHold;
uniform float uStrobeMode;   /* 0 hard · 1 colour · 2 invert · 3 mixed */
uniform vec3  uStrobeCol;

vec3 sampleScene(vec2 uv){
  if(uv.x<0.0||uv.x>1.0||uv.y<0.0||uv.y>1.0) return vec3(0.0);
  return texture(uScene, uv).rgb;
}

void main(){
  vec2 uv = vUv;
  float A = uPhase*TAU;
  float on = uTrance;
  float I  = uTranceI;

  /* ================= 1. FEEDBACK (temporal echo) ================= */
  /* Sample the previous frame in aspect-corrected space, zoomed and rotated,
     then screen-blend it under the new frame. This is real GPU feedback:
     the trail compounds frame over frame instead of being a static smear. */
  vec3 base = texture(uScene, uv).rgb;

  if(uFeedback > 0.002){
    vec2 d = uv - 0.5; d.x *= uAspect;
    float zoomK = 1.0 - uFbZoom*0.055*uFeedback;
    float angK  = uFbRotate*0.055*uFeedback;
    d *= zoomK;
    float cak = cos(angK), sak = sin(angK);
    d = mat2(cak,-sak,sak,cak)*d;
    d.x /= uAspect;
    vec3 prev = texture(uPrev, clamp(d+0.5, vec2(0.001), vec2(0.999))).rgb;

    float keep = clamp(uTrail, 0.0, 1.0)*0.955;
    vec3 fb = 1.0 - (1.0-prev*keep)*(1.0-base*(1.0-keep*0.35));
    float amt = uFeedback*(0.35+0.65*clamp(uTrail+0.25,0.0,1.0));
    base = mix(base, fb, clamp(amt, 0.0, 0.965));

    /* per-generation hue drift -> analog colour smear */
    vec3 kk = vec3(0.57735);
    float hh = 0.030*uFeedback*keep;
    float chh = cos(hh), shh = sin(hh);
    base = base*chh + cross(kk,base)*shh + kk*dot(kk,base)*(1.0-chh);
  }

  vec2 suv = uv;

  /* ================= 2. KALEIDOSCOPE / RADIAL SYMMETRY ================= */
  if(uKaleido > 0.002){
    vec2 d = suv - 0.5; d.x *= uAspect;
    float r = length(d);
    float a = atan(d.y, d.x) + A*uKaleidoRot*0.35;
    float seg = max(2.0, uKaleidoSeg);
    float sector = TAU/seg;
    a = mod(a, sector);
    a = abs(a - sector*0.5);
    /* mirror + slow breathing of the mirror axis */
    a += sin(A*0.8)*0.18*uKaleido;
    vec2 kd = vec2(cos(a), sin(a))*r;
    kd.x /= uAspect;
    vec3 kc = texture(uScene, kd+0.5).rgb;
    /* keep a little of the unmirrored frame so it isn't a perfect mandala */
    base = mix(base, kc, clamp(uKaleido*on, 0.0, 1.0));
  }

  /* ================= 3. RECURSIVE TUNNEL ================= */
  if(uTunnel > 0.002){
    vec2 d = suv - 0.5; d.x *= uAspect;
    vec3 acc = vec3(0.0);
    float wsum = 0.0;
    for(int i=0;i<5;i++){
      float fi = float(i);
      float scale = pow(0.72, fi);
      float spin = A*(0.15+uTunnelSpeed*0.5) + fi*0.42;
      float cs = cos(spin), ss = sin(spin);
      vec2 rd = mat2(cs,-ss,ss,cs)*d*scale + vec2(0.0, fi*0.06);
      /* domain warp inside the recursion for a liquid portal */
      float wr = fbm(rd*uFractalScale*1.4 + orbit(A,0.6,fi), 3)-0.5;
      rd += rd*wr*uTunnelWarp*0.35;
      float depthFade = pow(0.80, fi);
      vec3 s2 = texture(uScene, rd+0.5).rgb;
      acc += s2*depthFade;
      wsum += depthFade;
    }
    acc /= max(wsum, 1e-3);
    base = mix(base, acc, clamp(uTunnel*on, 0.0, 0.96));
    /* radial darkening towards the vanishing point */
    float rr = length(d);
    base *= 1.0 - 0.25*uTunnel*smoothstep(0.9,0.0,rr);
  }

  /* ================= 4. FRACTAL / TOPOGRAPHIC CONTOURS ================= */
  if(uFractal > 0.002 || uContour > 0.002){
    vec2 fp = (suv-0.5); fp.x *= uAspect;
    fp *= uFractalScale;
    vec2 q = vec2(fbm(fp + orbit(A,0.8,0.0), 4), fbm(fp + vec2(5.2,1.3) + orbit(A,0.7,2.0), 4));
    float f = fbm(fp + q*2.2 + orbit(A,0.5,4.0), 4);
    /* topographic lines: strong contour banding of the fractal field */
    float bands = abs(fract(f*uContour*14.0 - A*0.4)-0.5)*2.0;
    float lines = 1.0 - smoothstep(0.0, 0.16, bands);
    vec3 tint = mix(uColAccent, uColPink, f);
    base += tint * lines * uContour * 1.5 * on;
    base = mix(base, tint*f*1.5, clamp(uFractal*on*0.55, 0.0, 1.0));
  }

  /* ================= 5. LIQUID LENS / PINCH + WAVE INTERFERENCE ================= */
  if(uLens > 0.002 || uWaveI > 0.002){
    vec2 d = suv - 0.5; d.x *= uAspect;
    float r = length(d);
    /* pinch/bulge: radial power curve, seamless because it's static in shape */
    float k = r * pow(r, mix(1.0, 3.2, uPinch)) * uLens * 0.55;
    d -= normalize(d + 1e-5) * k;
    /* wave interference between two off-centre emitters */
    if(uWaveI > 0.002){
      float a1 = length(d - orbit(A,0.30,0.0))*26.0 - A*3.0;
      float a2 = length(d - orbit(A,0.26,2.9))*21.0 - A*2.0;
      d += normalize(d+1e-5) * sin(a1)*sin(a2) * uWaveI * 0.030;
    }
    d.x /= uAspect;
    vec3 lc = sampleScene(d+0.5);
    base = mix(base, lc, clamp(max(uLens,uWaveI), 0.0, 1.0));
  }

  /* ================= 6. CHROMATIC ABERRATION ================= */
  if(uChroma > 0.002){
    vec2 d = suv-0.5; d.x *= uAspect;
    float r = length(d);
    float amt = uChroma*0.014*(0.35+r*1.6);
    vec2 dir = normalize(d+1e-5);
    vec3 cc;
    cc.r = sampleScene(suv + dir*amt/vec2(uAspect,1.0)).r;
    cc.g = base.g;
    cc.b = sampleScene(suv - dir*amt/vec2(uAspect,1.0)).b;
    base = cc;
  }

  /* ================= 7. GEOMETRY LAYER (additive) ================= */
  if(uGeomOn > 0.002){
    vec4 g = texture(uGeom, suv);
    base += g.rgb * uGeomOn;
  }

  /* ================= 8. BLOOM / HALATION ================= */
  if(uHalation > 0.002){
    vec3 bl = vec3(0.0);
    float rad = 0.004 + 0.020*uHalation;
    for(int i=0;i<8;i++){
      float a2 = float(i)*0.7853981634 + A*0.05;
      vec2 o = vec2(cos(a2), sin(a2))*rad;
      bl += sampleScene(suv + o).rgb;
      bl += sampleScene(suv + o*2.1).rgb*0.55;
    }
    bl /= 8.0*1.55;
    vec3 hot = max(bl - 0.42, 0.0);
    base += hot * uHalation * 1.7;
  }

  /* ================= 9. COLOUR: hue cycle, saturation, contrast ================= */
  if(abs(uHue) > 0.0005){
    vec3 kk = vec3(0.57735);
    float ch2 = cos(uHue), sh2 = sin(uHue);
    base = base*ch2 + cross(kk,base)*sh2 + kk*dot(kk,base)*(1.0-ch2);
  }
  if(abs(uSat-1.0) > 0.002){
    float l = dot(base, vec3(0.299,0.587,0.114));
    base = mix(vec3(l), base, uSat);
  }
  base = (base-0.5)*uContrast + 0.5;

  /* ================= 10. FINISH ================= */
  if(uScan > 0.002){
    float s = 0.5 + 0.5*sin(suv.y*uRes.y*1.15 - uTime*7.0);
    base *= 1.0 - uScan*0.55*s;
    /* slow rolling bright bar */
    float bar = smoothstep(0.0, 0.06, abs(fract(suv.y - uTime*0.22)-0.5)-0.44);
    base += uColAccent * bar * uScan * 0.30;
  }
  if(uPoster > 0.002){
    float lv = mix(32.0, 3.0, uPoster);
    base = floor(base*lv + 0.5)/lv;
  }
  if(uInvert > 0.002) base = mix(base, 1.0-base, uInvert);

  /* grain last so it lives on top of every effect */
  float g2 = hash21(suv*uRes + vec2(uTime*211.0, uTime*97.0)) - 0.5;
  base += g2 * uGrain * 0.15;

  /* ================= STROBE / FLASH ENGINE =================
     A hard gate on the whole frame. The phase advances at an integer multiple
     of the loop so the strobe stays seamless, and the duty cycle sets how long
     each flash is held. Everything here is derived from uPhase, so exported
     frames strobe identically to the preview. */
  if(uStrobe > 0.002){
    float rate = max(1.0, floor(uStrobeRate + 0.5));
    float cyc = fract(uPhase*rate);
    /* sharp attack, short hold, fast decay — a real strobe, not a sine fade */
    float lit = smoothstep(uStrobeHold, uStrobeHold*0.55, cyc);
    float amt = uStrobe * lit;

    int mode = int(uStrobeMode + 0.5);
    if(mode == 0){                       /* hard white hit */
      base = mix(base, uStrobeCol, amt);
    } else if(mode == 1){                /* colour wash */
      base = mix(base, uStrobeCol*1.15, amt*0.92);
      base += uStrobeCol * amt * 0.25;
    } else if(mode == 2){                /* invert */
      base = mix(base, 1.0 - base, amt);
    } else {                             /* mixed: colour on even, invert on odd */
      float flip = mod(floor(uPhase*rate), 2.0);
      vec3 v = (flip > 0.5) ? (1.0 - base) : uStrobeCol;
      base = mix(base, v, amt);
    }

    /* the black gap between flashes */
    float dark = (1.0 - lit) * uStrobeBlack * uStrobe;
    base *= (1.0 - dark);
    /* hard threshold gives the flicker a digital, cut-to-black edge */
    base = mix(base, floor(base*6.0)/6.0, uStrobe*0.35);
  }

  /* reduced-flash soft-clips highlights and tames strobe depth. Safety always
     wins over the effect, even when a preset asks for the maximum. */
  if(uFlash > 0.001){
    base = base/(1.0 + uFlash*max(base-0.72,0.0)*1.6);
    base = mix(base, uStrobeCol*(1.0-uStrobeBlack), uStrobe*uFlash*0.55);
  }
  base = clamp(base, 0.0, 1.0);

  outC = vec4(base, 1.0);
}`;

  /* ---------------- helpers ---------------- */
  function compile(type, src, name){
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)){
      const log = gl.getShaderInfoLog(s);
      const numbered = src.split('\n').map((l,i)=>String(i+1).padStart(3)+'| '+l).join('\n');
      console.error('['+name+'] compile failed:\n'+log+'\n'+numbered);
      throw new Error(name+': '+log);
    }
    return s;
  }
  function program(name, fs){
    const p = gl.createProgram();
    gl.attachShader(p, compile(gl.VERTEX_SHADER, VS, name+'.vs'));
    gl.attachShader(p, compile(gl.FRAGMENT_SHADER, fs, name+'.fs'));
    gl.bindAttribLocation(p, 0, 'aPos');
    gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)){
      const log = gl.getProgramInfoLog(p);
      console.error('['+name+'] link failed: '+log);
      throw new Error(name+' link: '+log);
    }
    const loc = {};
    const n = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS);
    for (let i=0;i<n;i++){
      const info = gl.getActiveUniform(p, i);
      loc[info.name.replace(/\[0\]$/,'')] = gl.getUniformLocation(p, info.name);
    }
    return { p, loc, name };
  }
  const U = (prog, n) => prog.loc[n] || null;

  function makeRT(w, h, float, mip){
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    if (float){
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA16F, w, h, 0, gl.RGBA, gl.HALF_FLOAT, null);
    } else {
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    }
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    const fbo = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
    const st = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    if (st !== gl.FRAMEBUFFER_COMPLETE) console.warn('FBO incomplete 0x'+st.toString(16), w, h);
    return { tex, fbo, w, h };
  }
  function killRT(t){ if (t){ gl.deleteTexture(t.tex); gl.deleteFramebuffer(t.fbo); } }

  function init(){
    try {
      gl = canvas.getContext('webgl2', {
        alpha:false, depth:false, stencil:false, antialias:false,
        premultipliedAlpha:false, preserveDrawingBuffer:true,
        powerPreference:'high-performance', desynchronized:false
      });
    } catch(e){ gl = null; }
    if (!gl) return false;

    const f16 = gl.getExtension('EXT_color_buffer_float') || gl.getExtension('EXT_color_buffer_half_float');
    useHalf = !!f16;

    try {
      P.field = program('field', FS_FIELD);
      P.blur  = program('blur', FS_BLUR);
      P.copy  = program('copy', FS_COPY);
      P.comp  = program('composite', FS_COMP);
      P.geom  = program('geometry', FS_GEOM);
      P.post  = program('post', FS_POST);
    } catch(e){ return false; }

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 3,-1, -1,3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.BLEND);
    gl.disable(gl.CULL_FACE);

    texText = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texText);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    ok = true;
    return true;
  }

  function resize(w, h){
    if (!ok) return;
    w = Math.max(8, Math.round(w));
    h = Math.max(8, Math.round(h));
    if (w === compW && h === compH) return;
    compW = w; compH = h;
    canvas.width = w; canvas.height = h;

    const hw = Math.max(8, Math.round(w*0.5));
    const hh = Math.max(8, Math.round(h*0.5));
    const qw = Math.max(8, Math.round(w*0.25));
    const qh = Math.max(8, Math.round(h*0.25));

    if (halfW === hw && halfH === hh) return;
    halfW = hw; halfH = hh;

    ['field','haloA','haloB','medA','medB','txtA','txtB','haloQ','medQ']
      .forEach(k => { killRT(rt[k]); rt[k] = null; });

    rt.field = makeRT(hw, hh, true);
    rt.haloA = makeRT(qw, qh, true);
    rt.haloB = makeRT(qw, qh, true);
    rt.haloQ = makeRT(qw, qh, true);
    rt.medA  = makeRT(hw, hh, true);
    rt.medB  = makeRT(hw, hh, true);
    rt.medQ  = makeRT(qw, qh, true);
    rt.txtA  = makeRT(hw, hh, false);
    rt.txtB  = makeRT(hw, hh, false);

    /* --- party pipeline targets (full res) --- */
    rt.scene = makeRT(w, h, true);
    rt.geomT = makeRT(w, h, true);
    rt.fbA   = makeRT(w, h, true);
    rt.fbB   = makeRT(w, h, true);
    fbReady = false;
    /* feedback targets must start black or the first frames smear garbage */
    [rt.fbA, rt.fbB, rt.geomT, rt.scene].forEach(t => {
      gl.bindFramebuffer(gl.FRAMEBUFFER, t.fbo);
      gl.viewport(0,0,t.w,t.h);
      gl.clearColor(0,0,0,0);
      gl.clear(gl.COLOR_BUFFER_BIT);
    });
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  }

  function bindTex(unit, tex){
    gl.activeTexture(gl.TEXTURE0 + unit);
    gl.bindTexture(gl.TEXTURE_2D, tex);
  }

  function blurPass(srcTex, dstRT, dx, dy){
    gl.bindFramebuffer(gl.FRAMEBUFFER, dstRT.fbo);
    gl.viewport(0,0,dstRT.w,dstRT.h);
    gl.useProgram(P.blur.p);
    bindTex(0, srcTex);
    gl.uniform1i(P.blur.loc.uTex, 0);
    gl.uniform2f(P.blur.loc.uDir, dx/dstRT.w, dy/dstRT.h);
    gl.drawArrays(gl.TRIANGLES,0,3);
  }

  function copyTo(srcTex, dstRT){
    gl.bindFramebuffer(gl.FRAMEBUFFER, dstRT.fbo);
    gl.viewport(0,0,dstRT.w,dstRT.h);
    gl.useProgram(P.copy.p);
    bindTex(0, srcTex);
    gl.uniform1i(P.copy.loc.uTex, 0);
    gl.drawArrays(gl.TRIANGLES,0,3);
  }

  function uploadText(){
    const layout = TextRenderer.layout;
    if (!layout) return;
    const src = TextRenderer.canvas;
    gl.bindTexture(gl.TEXTURE_2D, texText);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, src);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    lastTextKey = layout.W+'x'+layout.H+'|'+TextRenderer.rawKey;
  }

  /* ------------------------------------------------ MACRO LAYER
     PARTY MODE exposes twelve high-level controls. Each one multiplies a
     *group* of low-level parameters, so the macro and the individual slider
     compose instead of fighting. When party mode is off every factor is 1. */
  function macros(){
    if (!state.party) return {
      energy:1, chaos:1, liquidity:1, geometry:1, distortion:1, glow:1,
      color:1, type:1, feedback:1, depth:1, trail:1, motion:1, beat:0,
    };
    const P = state;
    const e = P.energy, c = P.chaos, l = P.liquidity, g = P.geometry,
          d = P.distortion, gl = P.glowMacro, cm = P.colorMadness,
          tf = P.typeForce, fb = P.feedbackMacro, dp = P.depth,
          tr = P.trailMacro, ms = P.motionSpeed;
    return {
      energy:     0.45 + e*1.55,
      chaos:      0.55 + c*1.85,
      liquidity:  0.55 + l*1.05,
      geometry:   0.35 + g*1.85,
      distortion: 0.45 + d*1.85,
      glow:       0.45 + gl*1.55,
      color:      0.30 + cm*2.20,
      type:       0.45 + tf*1.55,
      feedback:   0.25 + fb*2.20,
      depth:      0.30 + dp*1.85,
      trail:      0.35 + tr*1.55,
      motion:     0.40 + ms*1.45,
      beat:       state.beatResponse,
    };
  }

  function commonUniforms(prog, phase, time){
    gl.uniform1f(U(prog,'uPhase'), phase);
    gl.uniform1f(U(prog,'uTime'), time);
    gl.uniform1f(U(prog,'uSeed'), state.seed*0.013);
    gl.uniform1f(U(prog,'uSeamless'), state.seamless ? 1 : 0);
  }

  function draw(phase, time){
    if (!ok) return;

    /* Decide once per frame whether the trance stack has any work to do. */
    postOn = !!(state.trance && (
      state.kaleido > 0.002 || state.tunnel > 0.002 || state.fractal > 0.002 ||
      state.contourLine > 0.002 || state.feedback > 0.002 || state.lens > 0.002 ||
      state.waveInterf > 0.002 || state.chromaSplit > 0.002 || state.posterize > 0.002 ||
      state.scanline > 0.002 || state.halation > 0.002 || state.invert ||
      state.colorCycle > 0.002 || state.lasers > 0.002 || state.rings > 0.002 ||
      state.strobe > 0.002 ||
      state.gridLines > 0.002 || state.bursts > 0.002
    ));
    /* geometry also works without trance mode, but then needs a compositor path */
    if (!postOn && (state.lasers+state.rings+state.gridLines+state.bursts) > 0.002) postOn = true;

    /* ---- PASS 1 : liquid field (half res) ---- */
    gl.bindFramebuffer(gl.FRAMEBUFFER, rt.field.fbo);
    gl.viewport(0,0,rt.field.w, rt.field.h);
    gl.useProgram(P.field.p);
    commonUniforms(P.field, phase, time);
    const [aw,ah] = aspectRatio();
    const aspect = aw/ah;
    gl.uniform2f(U(P.field,'uRes'), rt.field.w, rt.field.h);
    gl.uniform1f(U(P.field,'uAspect'), aspect);
    const MX = macros();
    const bk = 1 + MX.beat*state.bassAmt*Beat.value*0.55;
    gl.uniform1f(U(P.field,'uBlobSize'), state.blobSize*0.62*MX.liquidity*(1+MX.beat*state.bassAmt*Beat.value*0.16));
    gl.uniform1i(U(P.field,'uBlobCount'), Math.round(clamp(state.blobCount + (MX.geometry-1)*2.0,1,12)));
    gl.uniform1f(U(P.field,'uFlow'), state.flowSpeed*1.35*MX.motion);
    gl.uniform1f(U(P.field,'uNoiseScale'), state.noiseScale*1.15*(0.85+MX.chaos*0.30));
    gl.uniform1f(U(P.field,'uNoiseStrength'), state.noiseStrength*MX.chaos);
    gl.uniform1f(U(P.field,'uSmoothK'), state.metaballSmooth*0.22*MX.liquidity);
    gl.uniform1f(U(P.field,'uMotionAmp'), state.motionAmp*(0.35+state.globalIntensity*0.75)*MX.energy);
    gl.uniform1f(U(P.field,'uWarp'), state.warpAmount*1.25*MX.distortion);
    gl.uniform2f(U(P.field,'uLiquidOff'), state.liquidX*0.9, -state.liquidY*0.9 - state.liquidPosY*0.9);
    gl.uniform1f(U(P.field,'uLiquidScale'), state.liquidScale);
    gl.uniform1i(U(P.field,'uOct'), Math.round(clamp(state.fbmOctaves + (state.liquidComplexity-3)*0.7, 1, 6)));
    gl.uniform1f(U(P.field,'uRandom'), state.randomness);
    gl.uniform1f(U(P.field,'uIntensity'), state.globalIntensity);
    gl.uniform1f(U(P.field,'uSoft'), 0.004 + state.edgeSoftness*0.19);
    gl.drawArrays(gl.TRIANGLES,0,3);

    /* ---- PASS 2 : text copy + blur (for glow band) ---- */
    copyTo(texText, rt.txtA);
    const tb = 0.5 + state.textBlur*2.2;
    blurPass(rt.txtA.tex, rt.txtB, tb*1.9, 0);
    blurPass(rt.txtB.tex, rt.txtA, 0, tb*1.9);
    blurPass(rt.txtA.tex, rt.txtB, tb*1.9, 0);
    blurPass(rt.txtB.tex, rt.txtA, 0, tb*1.9);

    /* ---- PASS 3 : halo blur chain (down to quarter res, growing radius) ---- */
    const gr = 0.6 + state.glowRadius*3.0;

    // medium glow: from field at half res
    blurPass(rt.field.tex, rt.medA, gr*1.2, 0);
    blurPass(rt.medA.tex, rt.medB, 0, gr*1.2);
    blurPass(rt.medB.tex, rt.medA, gr*2.4, 0);
    blurPass(rt.medA.tex, rt.medB, 0, gr*2.4);

    // wide halo: downsample to quarter then blur hard
    copyTo(rt.field.tex, rt.haloA);
    blurPass(rt.haloA.tex, rt.haloB, gr*1.6, 0);
    blurPass(rt.haloB.tex, rt.haloA, 0, gr*1.6);
    blurPass(rt.haloA.tex, rt.haloB, gr*3.2, 0);
    blurPass(rt.haloB.tex, rt.haloA, 0, gr*3.2);
    blurPass(rt.haloA.tex, rt.haloB, gr*6.4, 0);
    blurPass(rt.haloB.tex, rt.haloA, 0, gr*6.4);
    blurPass(rt.haloA.tex, rt.haloB, gr*11.0, 0);
    blurPass(rt.haloB.tex, rt.haloA, 0, gr*11.0);

    /* ---- PASS 4 : composite into the scene target ---- */
    gl.bindFramebuffer(gl.FRAMEBUFFER, rt.scene.fbo);
    gl.viewport(0,0,rt.scene.w, rt.scene.h);
    gl.useProgram(P.comp.p);
    commonUniforms(P.comp, phase, time);
    const C = P.comp.loc;

    bindTex(0, rt.field.tex);  gl.uniform1i(C.uField, 0);
    bindTex(1, rt.haloA.tex);  gl.uniform1i(C.uHalo, 1);
    bindTex(2, rt.medB.tex);   gl.uniform1i(C.uMed, 2);
    bindTex(3, texText);       gl.uniform1i(C.uText, 3);
    bindTex(4, rt.txtA.tex);   gl.uniform1i(C.uTextB, 4);

    const red = hexToLinear(state.colRed);
    const pink = hexToLinear(state.colPink);
    const pale = hexToLinear(state.colPale);
    const wht = hexToLinear(state.colWhite);
    const txt = hexToLinear(state.textColor);

    gl.uniform2f(C.uRes, compW, compH);
    gl.uniform2f(C.uTextRes, TextRenderer.layout ? TextRenderer.layout.W : 1,
                          TextRenderer.layout ? TextRenderer.layout.H : 1);
    gl.uniform1f(C.uAspect, aspect);
    gl.uniform3fv(C.uColRed, red);
    gl.uniform3fv(C.uColPink, pink);
    gl.uniform3fv(C.uColPale, pale);
    gl.uniform3fv(C.uColWhite, wht);
    gl.uniform3fv(C.uColText, txt);
    gl.uniform3fv(C.uColBg, hexToLinear(state.bgColor));
    gl.uniform1f(C.uRedI, state.redIntensity);
    gl.uniform1f(C.uPinkI, state.pinkIntensity);
    gl.uniform1f(C.uWhiteI, state.whiteIntensity);
    gl.uniform1f(C.uBlack, state.blackLevel);
    gl.uniform1f(C.uGlowI, state.glowIntensity*MX.glow*(1.0+Beat.treble*state.trebleAmt*0.7));
    gl.uniform1f(C.uGlowR, state.glowRadius);
    gl.uniform1f(C.uBloomT, state.bloomThreshold);
    gl.uniform1f(C.uChroma, state.chromatic);
    gl.uniform1f(C.uRGBSep, state.rgbSeparation*0.02);
    gl.uniform1f(C.uEcho, state.textEcho);
    gl.uniform1i(C.uEchoN, state.textEcho > 0.004 ? Math.round(state.textEchoCount) : 0);
    gl.uniform1f(C.uEdgeGlow, state.edgeGlow);
    gl.uniform1f(C.uTextBlur, state.textBlur);
    gl.uniform1f(C.uTextOpacity, state.textOpacity);
    gl.uniform1f(C.uWarpX, state.textWarpX*MX.distortion*MX.type);
    gl.uniform1f(C.uWarpY, state.textWarpY*MX.distortion*MX.type);
    gl.uniform1f(C.uRipple, state.textRipple);
    gl.uniform1f(C.uRippleF, state.textRippleFreq);
    gl.uniform1f(C.uBulge, state.textBulge);
    gl.uniform1f(C.uTextSpeed, state.textSpeed);
    gl.uniform1f(C.uTextAmp, state.textAmp*MX.energy);
    gl.uniform1f(C.uScaleOsc, state.textScaleOsc*MX.energy);
    gl.uniform1f(C.uDriftX, state.textDriftX);
    gl.uniform1f(C.uDriftY, state.textDriftY);
    gl.uniform1f(C.uJitter, state.textJitter);
    gl.uniform1f(C.uMolten, state.textMode === 'molten' ? 1 : 0);
    gl.uniform1f(C.uDistortOn, state.distortOn ? 1 : 0);
    gl.uniform1f(C.uVignette, state.vignette);
    gl.uniform1f(C.uGrain, state.grain);
    gl.uniform1f(C.uIntensity, state.globalIntensity);
    const pulse = 1.0 + Math.sin(phase*TAU)*0.30*state.glowPulse;
    gl.uniform1f(C.uPulse, pulse);

    /* ---- PARTY typography uniforms ---- */
    const accent = hexToLinear(state.colAccent || state.colPink);
    const beat = Beat.value;                     // 0..1 transient envelope
    const tf = state.typeForce;
    gl.uniform3fv(C.uColAccent, accent);
    gl.uniform1f(C.uElastic,    state.elastic  * (1.0 + beat*state.beatResponse*0.8));
    gl.uniform1f(C.uFragment,   state.fragment * (0.55 + tf*0.9));
    gl.uniform1f(C.uPersp,      state.perspective);
    gl.uniform1f(C.uSpiral,     state.spiral + state.psyType*state.psyTypeSpiral);
    gl.uniform1f(C.uMelt,       state.meltRise * (0.5 + tf));
    gl.uniform1f(C.uExtrude,    state.extrude);
    gl.uniform1f(C.uNeon,       state.neonOutline);
    gl.uniform1f(C.uLineStagger,state.lineStagger);
    gl.uniform1f(C.uCharAnim,   state.charAnim);
    gl.uniform1f(C.uGlitch,     state.typeBehaviour === 'glitch' ? 0.35 + state.chaos*0.9 : state.chaos*0.18);
    gl.uniform1f(C.uTypeForce,  tf * (0.5 + state.psyType*1.2));
    gl.uniform1f(C.uHueShift,   state.hueShift);
    gl.uniform1f(C.uContrast,   state.contrast);
    gl.uniform1f(C.uTextOutline, state.textOutline);
    gl.uniform1f(C.uWaveI,      postOn ? state.waveInterf : 0.0);

    /* ---- CURSOR INTERACTION uniforms ---- */
    const cCol = hexToLinear(state.cursorTrailColor);
    const hoverAmt = state.cursorOn
      ? (state.cursorMode === 'drag' ? (Cursor.down ? Cursor.inside : 0.06) : Cursor.inside)
      : 0;
    gl.uniform2f(C.uCursor, Cursor.x, Cursor.y);
    gl.uniform2f(C.uCursorVel, Cursor.vx, Cursor.vy);
    gl.uniform1f(C.uCursorOn, state.cursorOn ? 1 : 0);
    gl.uniform1f(C.uCursorForce, state.cursorForce * (0.4 + hoverAmt*0.9));
    gl.uniform1f(C.uCursorRadius, state.cursorRadius*1.6);
    gl.uniform1f(C.uCursorLiquid, state.cursorLiquid ? 1 : 0);
    gl.uniform1f(C.uCursorGravity, state.cursorGravity ? 1 : 0);
    gl.uniform1f(C.uCursorType, state.cursorType ? 1 : 0);
    gl.uniform1f(C.uCursorPortal, (state.cursorPortal || state.cursorBrush) ? 1 : 0);
    gl.uniform1f(C.uCursorBrush, state.cursorBrush ? 1 : 0);
    gl.uniform3fv(C.uCursorCol, cCol);
    gl.uniform1f(C.uCursorGlow, state.cursorGlow);
    gl.uniform1f(C.uHoverAmt, hoverAmt);
    gl.uniform1f(C.uPortalDepth, state.cursorPortalDepth);
    gl.uniform1f(C.uPortalRot, state.cursorPortalRot);
    gl.drawArrays(gl.TRIANGLES,0,3);

    /* ================= PASS 5 : geometry / laser layer ================= */
    const geomAmt = clamp(state.lasers + state.rings + state.gridLines + state.bursts, 0, 1);
    if (geomAmt > 0.002){
      gl.bindFramebuffer(gl.FRAMEBUFFER, rt.geomT.fbo);
      gl.viewport(0,0,rt.geomT.w, rt.geomT.h);
      gl.clearColor(0,0,0,0); gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(P.geom.p);
      commonUniforms(P.geom, phase, time);
      const G = P.geom.loc;
      gl.uniform2f(G.uRes, rt.geomT.w, rt.geomT.h);
      gl.uniform1f(G.uAspect, aspect);
      const GM = macros();
      gl.uniform1f(G.uLasers, clamp(state.lasers*GM.geometry, 0, 1.6));
      gl.uniform1f(G.uLaserCount, state.laserCount);
      gl.uniform1f(G.uLaserWidth, state.laserWidth);
      gl.uniform1f(G.uLaserSpeed, state.laserSpeed);
      gl.uniform1f(G.uRings, clamp(state.rings*GM.geometry, 0, 1.6));
      gl.uniform1f(G.uRingCount, state.ringCount);
      gl.uniform1f(G.uRingThick, state.ringThickness);
      gl.uniform1f(G.uGrid, clamp(state.gridLines*GM.geometry, 0, 1.6));
      gl.uniform1f(G.uGridScale, state.gridScale);
      gl.uniform1f(G.uBursts, clamp(state.bursts*(GM.geometry + GM.beat*state.beatAmt*Beat.value*state.impactStrength), 0, 1.8) * (1.0 - state.buildLength*0.25));
      gl.uniform3fv(G.uColAccent, accent);
      gl.uniform3fv(G.uColRed, red);
      gl.uniform3fv(G.uColPink, pink);
      gl.uniform1f(G.uEnergy, state.energy*(1.0 + Beat.value*state.beatResponse*0.55)*(1.0+Beat.mid*state.midAmt*0.6)*GM.energy/1.2);
      gl.uniform1f(G.uChaos, state.chaos);
      gl.uniform1f(G.uIntensity, state.globalIntensity);
      gl.uniform2f(G.uFocus, state.liquidX*0.20, -state.liquidY*0.20);
      gl.drawArrays(gl.TRIANGLES,0,3);
    }

    /* ================= PASS 6 : trance post ================= */
    /* postOn is computed from the trance/party flag + the actual amounts so
       the extra passes are skipped entirely when nothing is dialled in. */
    if (postOn){
      const srcRT = rt.scene;
      const prevRT = fbFlip ? rt.fbB : rt.fbA;
      const dstRT  = fbFlip ? rt.fbA : rt.fbB;
      gl.bindFramebuffer(gl.FRAMEBUFFER, dstRT.fbo);
      gl.viewport(0,0,dstRT.w, dstRT.h);
      gl.useProgram(P.post.p);
      commonUniforms(P.post, phase, time);
      const Q = P.post.loc;

      bindTex(0, srcRT.tex); gl.uniform1i(Q.uScene, 0);
      bindTex(1, prevRT.tex); gl.uniform1i(Q.uPrev, 1);
      bindTex(2, rt.geomT.tex); gl.uniform1i(Q.uGeom, 2);

      gl.uniform2f(Q.uRes, dstRT.w, dstRT.h);
      gl.uniform1f(Q.uAspect, aspect);
      gl.uniform1f(Q.uTrance, state.trance ? 1 : 0);
      gl.uniform1f(Q.uTranceI, state.tranceIntensity);
      const postMul = macros();
      const beatP = Beat.value;
      const bAmt = state.beatResponse;

      gl.uniform1f(Q.uKaleido, clamp(state.kaleido*postMul.geometry + beatP*bAmt*state.bassAmt*0.18, 0, 1));
      gl.uniform1f(Q.uKaleidoSeg, state.kaleidoSeg);
      gl.uniform1f(Q.uKaleidoRot, state.kaleidoRotate);
      gl.uniform1f(Q.uTunnel, clamp(state.tunnel*postMul.depth, 0, 0.96));
      gl.uniform1f(Q.uTunnelDepth, state.tunnelDepth);
      gl.uniform1f(Q.uTunnelSpeed, state.tunnelSpeed);
      gl.uniform1f(Q.uTunnelWarp, state.tunnelWarp);
      gl.uniform1f(Q.uFractal, clamp(state.fractal*postMul.chaos, 0, 1));
      gl.uniform1f(Q.uFractalScale, state.fractalScale);
      gl.uniform1f(Q.uContour, clamp(state.contourLine*postMul.geometry, 0, 1.5));
      gl.uniform1f(Q.uFeedback, clamp(state.feedback*postMul.feedback, 0, 1));
      gl.uniform1f(Q.uFbZoom, state.feedbackZoom);
      gl.uniform1f(Q.uFbRotate, state.feedbackRotate);
      gl.uniform1f(Q.uTrail, clamp(state.trailLength*postMul.trail, 0, 1));
      gl.uniform1f(Q.uLens, clamp(state.lens*postMul.distortion, 0, 1));
      gl.uniform1f(Q.uPinch, state.lensPinch);
      gl.uniform1f(Q.uWaveI, clamp(state.waveInterf*postMul.distortion, 0, 1));
      gl.uniform1f(Q.uChroma, clamp(state.chromaSplit*postMul.color, 0, 2.5));
      gl.uniform1f(Q.uPoster, state.posterize);
      gl.uniform1f(Q.uScan, state.scanline);
      gl.uniform1f(Q.uHalation, clamp(state.halation*postMul.glow, 0, 1.6));
      gl.uniform1f(Q.uInvert, state.invert ? 1 : 0);
      gl.uniform1f(Q.uHue, state.hueShift + (state.hueCycle*TAU*phase + state.colorCycle*TAU*phase*(0.4+state.colorSpeed*1.6))*postMul.color);
      gl.uniform1f(Q.uSat, clamp(state.saturation*(0.75+postMul.color*0.55), 0, 3));
      gl.uniform1f(Q.uContrast, state.contrast);
      gl.uniform1f(Q.uGrain, state.grain);
      gl.uniform1f(Q.uGeomOn, geomAmt);
      gl.uniform3fv(Q.uColRed, red);
      gl.uniform3fv(Q.uColPink, pink);
      gl.uniform3fv(Q.uColAccent, accent);
      gl.uniform1f(Q.uFlash, state.reducedFlash ? 1 : 0);
      /* reduced-flash caps the strobe rather than letting a preset override it */
      const strobeCap = state.reducedFlash ? 0.22 : 1;
      gl.uniform1f(Q.uStrobe, clamp(state.strobe*strobeCap, 0, 1));
      gl.uniform1f(Q.uStrobeRate, state.strobeRate);
      gl.uniform1f(Q.uStrobeBlack, state.strobeBlack);
      gl.uniform1f(Q.uStrobeHold, clamp(state.strobeHold, 0.04, 0.95));
      gl.uniform1f(Q.uStrobeMode,
        state.strobeMode === 'colour' ? 1 : state.strobeMode === 'invert' ? 2
        : state.strobeMode === 'mixed' ? 3 : 0);
      gl.uniform3fv(Q.uStrobeCol, hexToLinear(state.strobeColor));
      gl.drawArrays(gl.TRIANGLES,0,3);

      // blit the result to the visible canvas
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0,0,compW,compH);
      gl.useProgram(P.copy.p);
      bindTex(0, dstRT.tex); gl.uniform1i(P.copy.loc.uTex, 0);
      gl.drawArrays(gl.TRIANGLES,0,3);

      if (state.feedback > 0.002) fbReady = true;
      fbFlip ^= 1;
    } else {
      /* no post: present the scene target directly */
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0,0,compW,compH);
      gl.useProgram(P.copy.p);
      bindTex(0, rt.scene.tex); gl.uniform1i(P.copy.loc.uTex, 0);
      gl.drawArrays(gl.TRIANGLES,0,3);
      fbReady = false;
    }
    frameCount++;
  }

  function resetFeedback(){
    fbReady = false;
    fbFlip = 0;
    if (!ok) return;
    [rt.fbA, rt.fbB, rt.scene, rt.geomT].forEach(t => {
      if (!t) return;
      gl.bindFramebuffer(gl.FRAMEBUFFER, t.fbo);
      gl.viewport(0,0,t.w,t.h);
      gl.clearColor(0,0,0,1);
      gl.clear(gl.COLOR_BUFFER_BIT);
    });
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  }

  /* ---------------------------------------------------- THUMBNAILS
     Renders the *actual* pipeline at a small size and reads the pixels back,
     so preset thumbnails are the real engine output, not a 2D approximation.
     The state is temporarily overridden, then restored exactly. */
  const thumbBuf = { w: 0, h: 0, px: null };
  function renderThumb(w, h, override, phaseAt){
    if (!ok) return null;
    w = Math.round(w); h = Math.round(h);
    const prevW = compW, prevH = compH;
    const saved = {};
    for (const k in override) { saved[k] = state[k]; state[k] = override[k]; }

    /* the text raster is resolution-dependent; keep whatever is loaded so the
       thumbnail still shows type, but never block on a re-raster */
    try {
      resize(w, h);
      fbReady = false;
      const ph = phaseAt === undefined ? 0.32 : phaseAt;
      draw(ph, ph*Math.max(0.5, +state.loopDuration || 8));
      const px = new Uint8Array(w*h*4);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.readPixels(0, 0, w, h, gl.RGBA, gl.UNSIGNED_BYTE, px);
      thumbBuf.w = w; thumbBuf.h = h; thumbBuf.px = px;
      return px;
    } catch(e){
      console.warn('thumbnail render failed', e);
      return null;
    } finally {
      for (const k in saved) state[k] = saved[k];
      resize(prevW, prevH);
      fbReady = false;
    }
  }

  return {
    init, resize, draw, uploadText, killRT, resetFeedback, renderThumb,
    get gl(){ return gl; },
    get ok(){ return ok; },
    get canvas(){ return canvas; },
    get compW(){ return compW; },
    get compH(){ return compH; },
    get textKey(){ return lastTextKey; },
  };
})();

/* --------------------------------------------- 5. RHYTHM / BEAT ENGINE
   One shared source of truth for "where are we in the beat". Three modes:
     manual  -> derived from BPM, no permissions needed
     audio   -> uploaded file through an AnalyserNode
     mic     -> live input
   All values are smoothed so nothing jitters. Everything is 0..1. */
const Beat = (() => {
  let ctx = null, analyser = null, srcNode = null, gainNode = null;
  let freq = null, timeData = null;
  let mode = 'off';
  let playing = false;

  let bass = 0, mid = 0, treble = 0, level = 0;
  let bassS = 0, midS = 0, trebleS = 0, levelS = 0;
  let env = 0;              // beat envelope, decays after each hit
  let lastBeat = 0;
  let beatCount = 0;
  let manualPhase = 0;
  let el = null;            // <audio> element for file playback
  let micStream = null;     // live capture stream, released on stop
  let spectrum = new Uint8Array(128);
  let bpmEst = 0;
  let onsets = [];

  const now = () => (typeof performance !== 'undefined' ? performance.now() : Date.now());

  function ensureCtx(){
    if (ctx) return ctx;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    analyser = ctx.createAnalyser();
    analyser.fftSize = 1024;
    analyser.smoothingTimeConstant = 0.72;
    freq = new Uint8Array(analyser.frequencyBinCount);
    timeData = new Uint8Array(analyser.fftSize);
    gainNode = ctx.createGain();
    gainNode.gain.value = 1;
    return ctx;
  }

  function connect(node){
    const c = ensureCtx();
    if (!c) throw new Error('Web Audio is not available in this browser');
    node.connect(analyser);
    analyser.connect(gainNode);
    gainNode.connect(c.destination);
    srcNode = node;
  }

  function stopSource(){
    if (srcNode){ try { srcNode.disconnect(); } catch(e){} srcNode = null; }
    if (el){ try { el.pause(); } catch(e){} }
    /* release the microphone / tab-capture hardware */
    if (micStream){
      try { micStream.getTracks().forEach(t => t.stop()); } catch(e){}
      micStream = null;
    }
  }

  async function loadFile(file){
    const c = ensureCtx();
    if (!c) throw new Error('Web Audio unavailable');
    await c.resume();
    stopSource();
    const buf = await file.arrayBuffer();
    const audio = await c.decodeAudioData(buf);
    const src = c.createBufferSource();
    src.buffer = audio;
    src.loop = true;
    connect(src);
    src.start(0);
    mode = 'audio';
    playing = true;
    return audio.duration;
  }

  async function useMic(){
    const c = ensureCtx();
    if (!c) throw new Error('Web Audio unavailable');
    await c.resume();
    stopSource();
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false }
    });
    micStream = stream;
    const src = c.createMediaStreamSource(stream);
    connect(src);
    mode = 'mic';
    playing = true;
  }

  /* Used by tab/system capture: a MediaStream carrying only an audio track. */
  async function useStream(stream){
    const c = ensureCtx();
    if (!c) throw new Error('Web Audio unavailable');
    await c.resume();
    stopSource();
    micStream = stream;
    const src = c.createMediaStreamSource(stream);
    connect(src);
    mode = 'tab';
    playing = true;
  }

  function stop(){
    stopSource();
    playing = false;
    if (mode !== 'manual') mode = 'off';
  }

  const bandAvg = (lo, hi) => {
    if (!freq) return 0;
    analyser.getByteFrequencyData(freq);
    const n = freq.length;
    const a = Math.floor(lo*n), b = Math.max(a+1, Math.floor(hi*n));
    let sum = 0;
    for (let i=a;i<b;i++) sum += freq[i];
    return sum/((b-a)*255);
  };

  /* Read the analyser. Also does simple transient detection for "beat". */
  function analyse(t){
    if (!analyser || !playing){ bass = mid = treble = level = 0; return; }

    const rawBass = bandAvg(0.0, 0.09);
    const rawMid  = bandAvg(0.09, 0.42);
    const rawTre = bandAvg(0.42, 1.0);
    const rawLvl  = (rawBass*0.5 + rawMid*0.35 + rawTre*0.15);

    /* smoothing: exponential, stronger when the user asks for it */
    const k = clamp(1 - state.audioSmooth, 0.04, 1);
    bass   += (rawBass - bass)   * k;
    mid    += (rawMid  - mid)    * k;
    treble += (rawTre  - treble) * k;
    level  += (rawLvl  - level)  * k;

    /* spectral centroid + flux, for fine detail reactions */
    analyser.getByteFrequencyData(freq);
    spectrum = freq;
    let num = 0, den = 0, flux = 0;
    for (let i=0;i<freq.length;i++){
      const v = freq[i]/255;
      num += v*i; den += v;
      flux += Math.abs(v - (prevSpec[i]||0));
      prevSpec[i] = v;
    }
    centroid += ((den > 0.001 ? (num/den)/freq.length : 0) - centroid)*0.25;
    fluxV += (clamp(flux/freq.length*7.5, 0, 1) - fluxV)*0.35;

    /* transient: bass energy jumping above its own running average */
    if (bass > bassAvg*1.26 && bass > 0.14 && t - lastBeat > 110){
      const gap = t - lastBeat;
      lastBeat = t; beatCount++;
      env = 1.0;
      /* rolling BPM estimate from the inter-beat interval */
      if (gap > 180 && gap < 1400){
        const inst = 60000/gap;
        bpmEst = bpmEst ? bpmEst*0.82 + inst*0.18 : inst;
      }
    }
    bassAvg += (bass - bassAvg)*0.045;
  }

  let centroid = 0, fluxV = 0, prevSpec = new Float32Array(512);

  let bassAvg = 0.2;

  function tick(t, phase, playing_){
    /* master switch: no audio influence at all when it is off */
    if (!state.audioReactive){
      env = 0; bass = mid = treble = level = 0;
      bassS = midS = trebleS = levelS = 0;
      return;
    }
    if (mode === 'manual' || mode === 'off'){
      /* derive a beat clock from BPM so visuals still pulse without audio */
      const bpm = Math.max(30, +state.bpm || 128);
      const sub = Math.max(1, +state.beatSub || 4);
      const beatsPerLoop = (bpm/60) * Math.max(0.5, +state.loopDuration || 8);
      manualPhase = (phase * beatsPerLoop * sub) % 1;
      /* sharp attack, exponential decay */
      env = Math.pow(1 - manualPhase, 3.2);
      const wob = 0.55 + 0.45*Math.sin(phase*TAU*2.0);
      bass = 0.35 + 0.45*env;
      mid  = 0.30 + 0.30*wob;
      treble = 0.22 + 0.20*(1-env);
      level = 0.30 + 0.50*env;
      bassS = bass; midS = mid; trebleS = treble; levelS = level;
      return;
    }

    analyse(t);
    const off = +state.audioOffset || 0;
    const ph = (phase + off) % 1;
    /* keep the envelope alive between transients so motion stays coherent */
    const decay = Math.pow(0.86, 1);
    env = env*(mode === 'mic' ? 0.90 : 0.93) + (bass > 0.35 ? bass*0.05 : 0);
    bassS   += (clamp(bass  *state.audioSens, 0, 1.6) - bassS)  *0.35;
    midS    += (clamp(mid   *state.audioSens, 0, 1.6) - midS)   *0.30;
    trebleS += (clamp(treble*state.audioSens, 0, 1.6) - trebleS)*0.28;
    levelS  += (clamp(level *state.audioSens, 0, 1.6) - levelS) *0.25;
    env = Math.max(env, Math.pow(1 - ((ph*(state.bpm/60)*4) % 1), 4.0)*0.55);
  }

  return {
    tick,
    loadFile, useMic, useStream, stop, ensureCtx,
    get mode(){ return mode; },
    set mode(v){ mode = v; },
    get value(){ return clamp(env, 0, 1); },
    get bass(){ return clamp(bassS, 0, 1.6); },
    get mid(){ return clamp(midS, 0, 1.6); },
    get treble(){ return clamp(trebleS, 0, 1.6); },
    get level(){ return clamp(levelS, 0, 1.6); },
    get beatCount(){ return beatCount; },
    get ready(){ return !!analyser; },
    get bpm(){ return bpmEst; },
    get centroid(){ return clamp(centroid, 0, 1); },
    get flux(){ return clamp(fluxV, 0, 1); },
    get spectrum(){ return analyser ? (analyser.getByteFrequencyData(freq), freq) : null; },
    get wave(){
      if (!analyser) return null;
      analyser.getByteTimeDomainData(timeData);
      return timeData;
    },
    useStream,
  };
})();

/* ------------------------------------------------- 5. ANIMATION ENGINE */
const Animation = (() => {
  let rawTime = 0;
  let phase = 0;
  let time = 0;
  let last = 0;
  let paused = false;
  let fixedPhase = null;

  function loopLen(){ return Math.max(0.5, +state.loopDuration || 8); }

  function advance(dt){
    if (paused) return;
    /* reduce-motion is a global damper, not a per-effect setting */
    const rm = state.reduceMotion ? 0.25 : 1;
    rawTime += dt * state.speed * rm;
  }

  function sync(){
    const L = loopLen();
    if (state.seamless){
      let p = (rawTime % L) / L;
      if (p < 0) p += 1;
      phase = p;
      time = p*L;
    } else {
      phase = (rawTime % L)/L;
      time = rawTime;
    }
  }

  return {
    tick(now){
      const dt = last ? Math.min(0.12, (now-last)/1000) : 0;
      last = now;
      advance(dt);
      sync();
      Cursor.tick(dt);
      Beat.tick(now, phase, !paused);
    },
    get phase(){ return phase; },
    get time(){ return time; },
    get raw(){ return rawTime; },
    get paused(){ return paused; },
    set paused(v){ paused = !!v; if (state.playing === paused) set('playing', !paused); },
    toggle(){ paused = !paused; set('playing', !paused); return paused; },
    restart(){ rawTime = 0; sync(); },
    scrub(p){ rawTime = p*loopLen(); sync(); },
    seekPhase(p){ rawTime = p*loopLen(); sync(); },
    loopLen,
    /** deterministic evaluation at an arbitrary phase, used by export */
    atPhase(p){
      return { phase: p, time: p*loopLen() };
    },
  };
})();

/* expose */
window.LAVA = {
  state, DEFAULTS, set, setMany, emit, subscribe,
  Renderer, TextRenderer, Animation, Beat, Cursor,
  $, $$, el: null, clamp, lerp, hexToRgb, hexToLinear, linToSrgb,
  aspectRatio, toast, download, slug, mulberry32, subscribeFn: subscribe,
};
