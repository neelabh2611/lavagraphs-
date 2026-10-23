/* ============================================================================
   TRANCE LAB — AUDIO REACTIVITY & CURSOR INTERACTION PANELS
   Audio capture (tab / mic / file), mapping editor, spectrum + waveform scope,
   and the cursor force playground.
   ========================================================================= */

/* ==================================================== AUDIO INPUT PANEL */
function buildAudioPane(){
  const frag = document.createDocumentFragment();

  let s = section('Audio Input', true);

  /* live status strip */
  const status = document.createElement('div');
  status.className = 'audioStatus';
  status.id = 'audioStatus';
  status.innerHTML = '<i></i><span id="audioStatusTxt">NO INPUT</span>';
  s.body.appendChild(status);

  /* three capture routes, each with its real permission story */
  const routes = document.createElement('div');
  routes.className = 'srcGrid';

  const mkSrc = (id, label, sub, fn) => {
    const b = document.createElement('button');
    b.className = 'srcBtn';
    b.dataset.src = id;
    b.innerHTML = '<b>' + label + '</b><s>' + sub + '</s>';
    b.addEventListener('click', fn);
    return b;
  };

  routes.append(
    mkSrc('tab', 'TAB / SYSTEM', 'share audio', () => window.__captureTabAudio()),
    mkSrc('mic', 'MICROPHONE', 'room audio', async () => {
      try {
        await Beat.useMic();
        set('audioReactive', true);
        set('rhythmMode', 'mic');
        syncModes();
        toast('MICROPHONE LIVE');
      } catch(e){
        const m = String(e && e.name || '');
        if (m === 'NotAllowedError') toast('MIC PERMISSION DENIED', 3600);
        else if (m === 'NotFoundError') toast('NO MICROPHONE FOUND', 3600);
        else toast('MIC FAILED — ' + String(e.message || m).slice(0, 38).toUpperCase(), 4000);
      }
    }),
    mkSrc('file', 'AUDIO FILE', 'drag a track', () => $q('#fileAudio').click())
  );
  s.body.appendChild(routes);

  const stopRow = document.createElement('button');
  stopRow.className = 'btn';
  stopRow.style.cssText = 'width:100%;margin-top:6px';
  stopRow.textContent = 'STOP CAPTURE';
  stopRow.addEventListener('click', () => {
    Beat.stop();
    set('rhythmMode', 'off');
    set('audioReactive', false);
    syncModes();
    toast('AUDIO RELEASED');
  });
  s.body.appendChild(stopRow);

  const perm = document.createElement('div');
  perm.className = 'note';
  perm.innerHTML =
    '<b>TAB AUDIO</b> uses the browser\'s screen-capture picker. You must tick ' +
    '<b>"Share tab audio"</b> — a page cannot silently record system-wide sound. ' +
    'Chrome and Edge support it; Firefox and Safari usually expose video only. ' +
    '<b>MIC</b> listens to room audio and works everywhere, but picks up noise.';
  s.body.appendChild(perm);

  s.body.appendChild(buildScope());
  frag.appendChild(s.sec);

  /* ---------------- live readouts ---------------- */
  s = section('Analysis', true);
  const readout = document.createElement('div');
  readout.className = 'readout';
  readout.innerHTML =
    '<div class="rio"><span>BPM EST</span><b id="rBpm">—</b></div>' +
    '<div class="rio"><span>LOUDNESS</span><b id="rLvl">0</b></div>' +
    '<div class="rio"><span>CENTROID</span><b id="rCen">0</b></div>' +
    '<div class="rio"><span>FLUX</span><b id="rFlux">0</b></div>' +
    '<div class="rio"><span>BEATS</span><b id="rBeats">0</b></div>' +
    '<div class="rio"><span>MODE</span><b id="rMode">OFF</b></div>';
  s.body.appendChild(readout);

  const meter = document.createElement('div');
  meter.className = 'meterWrap';
  meter.innerHTML =
    '<div class="mrow"><span>SUB</span><i id="mSub"></i></div>' +
    '<div class="mrow"><span>BASS</span><i id="mBass"></i></div>' +
    '<div class="mrow"><span>MID</span><i id="mMid"></i></div>' +
    '<div class="mrow"><span>HIGH</span><i id="mHigh"></i></div>' +
    '<div class="mrow"><span>BEAT</span><i id="mBeat"></i></div>';
  s.body.appendChild(meter);

  s.body.appendChild(mkSeg('Rhythm source', 'rhythmMode', [
    {value:'off', label:'OFF'}, {value:'manual', label:'MANUAL'},
    {value:'audio', label:'FILE'}, {value:'mic', label:'MIC'},
    {value:'tab', label:'TAB'},
  ]));
  s.body.appendChild(mkSlider('Sensitivity', 'audioSens', 0.1, 3, 0.01, f2));
  s.body.appendChild(mkSlider('Smoothing', 'audioSmooth', 0, 0.98, 0.01, f2));
  s.body.appendChild(mkSlider('Offset (beats)', 'audioOffset', -0.5, 0.5, 0.01, f2));
  s.body.appendChild(subLabel('MANUAL CLOCK'));
  s.body.appendChild(mkSlider('BPM override', 'bpm', 40, 220, 1, f0));
  s.body.appendChild(mkSlider('Beat subdivision', 'beatSub', 1, 8, 1, f0));
  frag.appendChild(s.sec);

  /* ---------------- mapping editor ---------------- */
  s = section('Audio Mapping', false);
  const map = document.createElement('div');
  map.className = 'mapGrid';
  [
    ['bassAmt', 'BASS → LIQUID / ZOOM'],
    ['beatAmt', 'KICK → IMPACT'],
    ['midAmt', 'MID → TYPE DEFORM'],
    ['trebleAmt', 'HIGH → GLOW / SPARKS'],
  ].forEach(function(pair){
    const row = document.createElement('div');
    row.className = 'mapRow';
    row.innerHTML = '<span>' + pair[1] + '</span>';
    const inp = document.createElement('input');
    inp.type = 'range'; inp.min = '0'; inp.max = '1'; inp.step = '0.01';
    inp.value = String(state[pair[0]]);
    inp.addEventListener('input', function(){ set(pair[0], +inp.value); });
    syncers.push(function(){ if (document.activeElement !== inp) inp.value = String(state[pair[0]]); });
    const val = document.createElement('b');
    val.textContent = Math.round(state[pair[0]]*100);
    syncers.push(function(){ val.textContent = Math.round(state[pair[0]]*100); });
    row.append(inp, val);
    map.appendChild(row);
  });
  s.body.appendChild(map);

  s.body.appendChild(subLabel('BEAT RESPONSE'));
  s.body.appendChild(mkSlider('Beat response', 'beatResponse', 0, 1, 0.01, pct));
  s.body.appendChild(mkSlider('Impact strength', 'impactStrength', 0, 1.5, 0.01, f2));
  s.body.appendChild(mkSlider('Build-up length', 'buildLength', 0, 1, 0.01, pct));
  s.body.appendChild(mkToggle('Fallback motion when quiet', 'fallbackMotion'));

  const mn = document.createElement('div');
  mn.className = 'note';
  mn.innerHTML =
    'Analysis is transient + spectral, not instrument recognition. A kick is ' +
    'a fast low-frequency onset; a hat is a fast high-frequency onset. Tune ' +
    'BPM manually if the estimate drifts.';
  s.body.appendChild(mn);
  frag.appendChild(s.sec);

  return frag;
}

/* ================================================= CURSOR INTERACTION PANEL */
function buildCursorPane(){
  const frag = document.createDocumentFragment();

  let s = section('Cursor Interaction', true);
  const mast = document.createElement('div');
  mast.className = 'mast';
  mast.innerHTML =
    '<div class="mastrow"><span>CURSOR FORCE FIELD</span><div class="tg" id="cursorTg"></div></div>' +
    '<div class="mastsub" id="cursorSub">OFF</div>';
  s.body.appendChild(mast);
  const tg = mast.querySelector('#cursorTg');
  const paintTg = () => {
    tg.classList.toggle('on', !!state.cursorOn);
    mast.classList.toggle('live', !!state.cursorOn);
    const sub = mast.querySelector('#cursorSub');
    if (sub) sub.textContent = state.cursorOn
      ? cursorEffectList()
      : 'DISABLED · POINTER IGNORED';
  };
  tg.addEventListener('click', () => { set('cursorOn', !state.cursorOn); paintTg(); });
  syncers.push(paintTg); paintTg();

  s.body.appendChild(mkSlider('Force', 'cursorForce', 0, 1.5, 0.01, f2));
  s.body.appendChild(mkSlider('Radius', 'cursorRadius', 0.04, 0.8, 0.01, f2));
  s.body.appendChild(mkSlider('Sensitivity', 'cursorSens', 0, 2, 0.01, f2));
  s.body.appendChild(mkSlider('Decay', 'cursorDecay', 0, 1, 0.01, pct));
  s.body.appendChild(mkSeg('Trigger', 'cursorMode', [
    {value:'hover', label:'HOVER'}, {value:'drag', label:'DRAG'}, {value:'both', label:'BOTH'},
  ]));
  frag.appendChild(s.sec);

  s = section('Forces', true);
  s.body.appendChild(mkToggle('Liquid displacement', 'cursorLiquid'));
  s.body.appendChild(mkToggle('Gravity well', 'cursorGravity'));
  s.body.appendChild(mkToggle('Chromatic wake', 'cursorWake'));
  s.body.appendChild(mkToggle('Warp brush', 'cursorBrush'));
  s.body.appendChild(mkToggle('Portal lens', 'cursorPortal'));
  s.body.appendChild(mkToggle('Particle attraction', 'cursorParticles'));
  s.body.appendChild(mkToggle('Typography push', 'cursorType'));
  s.body.appendChild(subLabel('WAKE'));
  s.body.appendChild(mkSlider('Trail persistence', 'cursorTrail', 0, 1, 0.01, pct));
  s.body.appendChild(mkSlider('Glow', 'cursorGlow', 0, 1.5, 0.01, f2));
  s.body.appendChild(mkColor('Wake color', 'cursorTrailColor'));
  frag.appendChild(s.sec);

  s = section('Portal & Hover', false);
  s.body.appendChild(mkSlider('Portal depth', 'cursorPortalDepth', 0, 1, 0.01, pct));
  s.body.appendChild(mkSlider('Portal rotation', 'cursorPortalRot', -1, 1, 0.01, f2));
  s.body.appendChild(mkToggle('Hover event', 'cursorHoverEvent'));
  s.body.appendChild(mkSlider('Hover zoom', 'cursorHoverZoom', 0, 0.6, 0.01, f2));
  s.body.appendChild(mkSlider('Hover bloom', 'cursorHoverBloom', 0, 1, 0.01, pct));
  frag.appendChild(s.sec);

  s = section('Reset', false);
  const row = document.createElement('div');
  row.style.cssText = 'display:flex;gap:5px';
  const mkB = (l, fn) => {
    const b = document.createElement('button');
    b.className = 'btn'; b.style.flex = '1'; b.textContent = l;
    b.addEventListener('click', fn);
    return b;
  };
  row.append(
    mkB('CLEAR TRAILS', () => {
      Cursor.clearStrokes();
      Renderer.resetFeedback();
      toast('TRAILS CLEARED');
    }),
    mkB('RESET STATE', () => {
      Cursor.reset();
      Renderer.resetFeedback();
      toast('INTERACTION RESET');
    })
  );
  s.body.appendChild(row);
  const note = document.createElement('div');
  note.className = 'note';
  note.innerHTML =
    'The pointer is tracked in composition space and smoothed on the animation ' +
    'clock, so it behaves identically at every zoom level and aspect ratio. ' +
    'Exports ignore live pointer input — enable <b>Bake cursor</b> to record a path.';
  s.body.appendChild(note);
  frag.appendChild(s.sec);

  return frag;
}

function cursorEffectList(){
  const on = [];
  if (state.cursorLiquid) on.push('LIQUID');
  if (state.cursorGravity) on.push('GRAVITY');
  if (state.cursorWake) on.push('WAKE');
  if (state.cursorBrush) on.push('BRUSH');
  if (state.cursorPortal) on.push('PORTAL');
  if (state.cursorParticles) on.push('PARTICLES');
  if (state.cursorType) on.push('TYPE');
  return on.length ? on.join(' · ') : 'NO FORCES ENABLED';
}

/* --------------------------------------------------- LIVE PANEL REFRESH */
let lastPanelPaint = 0;
function paintAudioUI(now){
  if (now - lastPanelPaint < 60) return;
  lastPanelPaint = now;

  const spec = Beat.spectrum;
  const setBar = (id, v) => {
    const e = document.getElementById(id);
    if (e) e.style.width = Math.round(clamp(v, 0, 1)*100) + '%';
  };

  const lvl = clamp(Beat.level, 0, 1);
  setBar('mSub', clamp(Beat.bass*0.85, 0, 1));
  setBar('mBass', Beat.bass);
  setBar('mMid', Beat.mid);
  setBar('mHigh', Beat.treble);
  setBar('mBeat', Beat.value);

  const st = document.getElementById('audioStatus');
  if (st){
    const live = Beat.mode === 'audio' || Beat.mode === 'mic' || Beat.mode === 'tab';
    st.classList.toggle('live', live);
    const txt = document.getElementById('audioStatusTxt');
    if (txt){
      const label = Beat.mode === 'audio' ? 'FILE PLAYING'
        : Beat.mode === 'mic' ? 'MICROPHONE LIVE'
        : Beat.mode === 'tab' ? 'TAB AUDIO LIVE'
        : Beat.mode === 'manual' ? 'MANUAL CLOCK'
        : 'NO INPUT';
      txt.textContent = label;
    }
  }

  const put = (id, v) => { const e = document.getElementById(id); if (e) e.textContent = v; };
  put('rBpm', Beat.bpm > 30 ? String(Math.round(Beat.bpm)) : (state.rhythmMode === 'manual' ? state.bpm + ' (set)' : '—'));
  put('rLvl', String(Math.round(lvl*100)));
  put('rCen', String(Math.round(Beat.centroid*100)));
  put('rFlux', String(Math.round(Beat.flux*100)));
  put('rBeats', String(Beat.beatCount));
  put('rMode', (Beat.mode || 'off').toUpperCase());

  paintScope();
  paintMeters();
  syncModes();
}
