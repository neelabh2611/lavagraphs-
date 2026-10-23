/* ============================================================================
   TRANCE LAB — PRESET LIBRARY (party / hardcore techno / psychedelic)
   Each entry is a real parameter set: palette + motion personality + its own
   effect graph. Grouped for the browser filter.
   ========================================================================= */

/* small helper so preset tables stay readable */
const P_ = (group, name, sub, s) => ({ group: group, name: name, sub: sub, s: s });

const PARTY_PRESETS = {

  /* ======================= HARDCORE / TECHNO ======================= */

  'gabber-overdrive': P_('hardcore', 'GABBER OVERDRIVE',
    'monochrome · red impact · brutal rhythm', {
      party:true, trance:true, energy:0.95, chaos:0.7, beatResponse:0.9,
      liquidity:0.62, geometry:0.78, distortion:0.85, glowMacro:0.7,
      colorMadness:0.08, typeForce:1.0, feedbackMacro:0.3, depth:0.45, trailMacro:0.4,
      colRed:'#ff0015', colPink:'#ff4455', colAccent:'#ffffff',
      colPale:'#f2f2f2', colWhite:'#ffffff', bgColor:'#000000',
      textColor:'#050505', textMode:'molten',
      lasers:0.5, laserCount:6, laserWidth:0.13, laserSpeed:0.85,
      rings:0.65, ringCount:7, ringThickness:0.14, bursts:1.15,
      elastic:0.28, fragment:0.30, extrude:0.35, neonOutline:0.5,
      chromaSplit:0.30, contrast:1.55, saturation:0.05, halation:0.45,
      kaleido:0.0, tunnel:0.0, feedback:0.18,
      typeBehaviour:'monumental', speed:1.45, loopDuration:6, seed:1010,
      bpm:180, beatSub:4, rhythmMode:'manual', grain:0.20, vignette:0.30,
      glowIntensity:1.7, glowRadius:0.7,
    }),

  'industrial-machine': P_('hardcore', 'INDUSTRIAL MACHINE',
    'steel grid · mechanical rotation · analog noise', {
      party:true, trance:true, energy:0.62, chaos:0.5, beatResponse:0.55,
      liquidity:0.30, geometry:0.95, distortion:0.42, glowMacro:0.35,
      colorMadness:0.05, typeForce:0.75, feedbackMacro:0.35, depth:0.72, trailMacro:0.5,
      colRed:'#c8402a', colPink:'#8a8f96', colAccent:'#d8dde3',
      colPale:'#e6e9ec', colWhite:'#ffffff', bgColor:'#050506',
      textColor:'#0a0b0c', textMode:'molten',
      lasers:0.22, laserCount:10, laserWidth:0.06, laserSpeed:0.18,
      rings:0.72, ringCount:16, ringThickness:0.06,
      gridLines:1.15, gridScale:11, bursts:0.28,
      kaleido:0.10, kaleidoSeg:4, tunnel:0.30, tunnelSpeed:0.14,
      feedback:0.28, trailLength:0.5, scanline:0.18,
      chromaSplit:0.14, contrast:1.42, saturation:0.42, halation:0.25,
      typeBehaviour:'chrome', extrude:0.5, meltRise:0.12,
      speed:0.5, loopDuration:16, seed:2020, bpm:132, rhythmMode:'manual',
      grain:0.26, vignette:0.55, glowIntensity:0.9,
      blobCount:6, blobSize:0.7, metaballSmooth:0.42,
    }),

  'acid-pressure': P_('hardcore', 'ACID PRESSURE',
    'acid green · squelch · oscillating geometry', {
      party:true, trance:true, energy:0.82, chaos:0.68, beatResponse:0.8,
      liquidity:0.9, geometry:0.6, distortion:0.8, glowMacro:0.75,
      colorMadness:0.42, typeForce:0.8, feedbackMacro:0.45, depth:0.5, trailMacro:0.6,
      colRed:'#aaff00', colPink:'#00ff9d', colAccent:'#eaff6b',
      colPale:'#e9ffc4', colWhite:'#ffffff', bgColor:'#010400',
      textColor:'#030800', textMode:'molten',
      waveInterf:0.62, lens:0.35, lensPinch:0.62,
      rings:0.45, ringCount:9, ringThickness:0.18,
      lasers:0.3, laserCount:8, bursts:0.35,
      meltRise:0.55, elastic:0.5, spiral:0.28, charAnim:0.3,
      chromaSplit:0.4, colorCycle:0.7, saturation:1.55, contrast:1.2,
      feedback:0.32, trailLength:0.55, halation:0.5,
      typeBehaviour:'liquid', speed:0.9, loopDuration:10, seed:3030,
      bpm:142, rhythmMode:'manual', grain:0.15, vignette:0.32,
      blobSize:0.95, blobCount:9, metaballSmooth:0.34, glowIntensity:1.45,
    }),

  'dark-warehouse': P_('hardcore', 'DARK WAREHOUSE',
    'near black · fog liquid · sparse flashes', {
      party:true, trance:true, energy:0.3, chaos:0.32, beatResponse:0.45,
      liquidity:0.55, geometry:0.18, distortion:0.3, glowMacro:0.3,
      colorMadness:0.05, typeForce:0.6, feedbackMacro:0.3, depth:0.35, trailMacro:0.45,
      colRed:'#6a1410', colPink:'#3a3340', colAccent:'#b9c2cc',
      colPale:'#8f96a0', colWhite:'#e8edf2', bgColor:'#000000',
      textColor:'#020203', textMode:'molten',
      lasers:0.0, rings:0.0, bursts:0.08, gridLines:0.0,
      halation:0.22, chromaSplit:0.10, contrast:1.3, saturation:0.25,
      vignette:0.75, grain:0.30, glowIntensity:0.7, glowRadius:0.5,
      typeBehaviour:'monumental', speed:0.32, loopDuration:20, seed:4040,
      bpm:124, rhythmMode:'manual', textX:0, textY:-3,
      blobCount:5, blobSize:0.65, edgeSoftness:0.45, metaballSmooth:0.55,
    }),

  'hardstyle-impact': P_('hardcore', 'HARDSTYLE IMPACT',
    'zoom punches · radial bursts · huge type', {
      party:true, trance:true, energy:1.0, chaos:0.55, beatResponse:1.0,
      liquidity:0.7, geometry:0.85, distortion:0.62, glowMacro:0.85,
      colorMadness:0.18, typeForce:1.0, feedbackMacro:0.28, depth:0.55, trailMacro:0.45,
      colRed:'#ff1030', colPink:'#ff8ad0', colAccent:'#4de0ff',
      colPale:'#ffffff', colWhite:'#ffffff', bgColor:'#000000',
      textColor:'#04000a', textMode:'molten',
      bursts:1.5, rings:0.85, ringCount:5, ringThickness:0.22,
      lasers:0.55, laserCount:12, laserWidth:0.09,
      lens:0.4, lensPinch:0.72, halation:0.7, chromaSplit:0.45,
      extrude:0.5, neonOutline:0.6, elastic:0.35,
      typeBehaviour:'explosive', speed:1.2, loopDuration:6, seed:5050,
      bpm:150, rhythmMode:'manual', vignette:0.28, grain:0.14,
      glowIntensity:1.9, blobCount:9, blobSize:0.95,
    }),

  'noise-ritual': P_('hardcore', 'NOISE RITUAL',
    'fragmented type · feedback · dense grain', {
      party:true, trance:true, energy:0.78, chaos:0.95, beatResponse:0.7,
      liquidity:0.45, geometry:0.4, distortion:1.0, glowMacro:0.4,
      colorMadness:0.3, typeForce:1.0, feedbackMacro:0.9, depth:0.5, trailMacro:0.85,
      colRed:'#d8d0c4', colPink:'#8a7f72', colAccent:'#ff4a2b',
      colPale:'#ded6c9', colWhite:'#ffffff', bgColor:'#030303',
      textColor:'#080706', textMode:'molten',
      feedback:0.72, trailLength:0.85, feedbackZoom:0.14, feedbackRotate:-0.08,
      fragment:0.8, elastic:0.45, charAnim:0.55, lineStagger:0.5,
      scanline:0.5, grain:0.6, posterize:0.28, chromaSplit:0.65,
      contrast:1.3, saturation:0.5, halation:0.3,
      typeBehaviour:'glitch', speed:1.1, loopDuration:9, seed:6060,
      bpm:160, rhythmMode:'manual', vignette:0.62,
      blobCount:7, blobSize:0.8,
    }),

  'redline-200': P_('hardcore', 'REDLINE 200 BPM',
    'beat-driven · aggressive deformation', {
      party:true, trance:true, energy:1.0, chaos:0.72, beatResponse:1.0,
      liquidity:0.75, geometry:0.92, distortion:0.9, glowMacro:0.8,
      colorMadness:0.35, typeForce:0.95, feedbackMacro:0.5, depth:0.6, trailMacro:0.55,
      colRed:'#ff0000', colPink:'#ff2266', colAccent:'#ffcc00',
      colPale:'#ffe9e9', colWhite:'#ffffff', bgColor:'#000000',
      textColor:'#0a0000', textMode:'molten',
      lasers:0.7, laserCount:14, laserWidth:0.07, laserSpeed:1.0,
      rings:0.7, ringCount:12, ringThickness:0.1, bursts:1.2,
      gridLines:0.4, gridScale:16, kaleido:0.3, kaleidoSeg:6,
      elastic:0.62, fragment:0.42, meltRise:0.3, charAnim:0.45,
      chromaSplit:0.6, colorCycle:0.5, contrast:1.4, saturation:1.4,
      typeBehaviour:'explosive', speed:1.6, loopDuration:4, seed:7070,
      bpm:200, beatSub:4, rhythmMode:'manual', grain:0.16, vignette:0.3,
      bassAmt:1.0, beatAmt:1.0, glowIntensity:1.8,
    }),

  'blackout': P_('hardcore', 'BLACKOUT',
    'extreme negative space · sharp accents', {
      party:true, trance:true, energy:0.22, chaos:0.25, beatResponse:0.6,
      liquidity:0.35, geometry:0.12, distortion:0.22, glowMacro:0.25,
      colorMadness:0.04, typeForce:0.85, feedbackMacro:0.2, depth:0.2, trailMacro:0.3,
      colRed:'#ff2033', colPink:'#111116', colAccent:'#ffffff',
      colPale:'#d8d8e0', colWhite:'#ffffff', bgColor:'#000000',
      textColor:'#000000', textMode:'clean',
      lasers:0.0, rings:0.0, bursts:0.18, gridLines:0.0,
      halation:0.12, chromaSplit:0.08, contrast:1.7, saturation:1.0,
      vignette:0.9, grain:0.10, glowIntensity:0.55, glowRadius:0.35,
      typeBehaviour:'monumental', speed:0.4, loopDuration:18, seed:8080,
      bpm:120, rhythmMode:'manual',
      blobCount:3, blobSize:0.45, metaballSmooth:0.7, edgeSoftness:0.5,
      textScale:1.06, tracking:-0.03,
    }),

  /* ======================= PSYCHEDELIC / LIQUID ======================= */

  'molten-dimension': P_('liquid', 'MOLTEN DIMENSION',
    'interconnected liquid · recursive distortion', {
      party:true, trance:true, energy:0.6, chaos:0.55, beatResponse:0.6,
      liquidity:1.0, geometry:0.35, distortion:0.72, glowMacro:0.9,
      colorMadness:0.5, typeForce:0.8, feedbackMacro:0.4, depth:0.55, trailMacro:0.55,
      colRed:'#ff1845', colPink:'#ff3d9e', colAccent:'#ffb3e6',
      colPale:'#ffe4ea', colWhite:'#ffffff', bgColor:'#000000',
      textColor:'#06000c', textMode:'molten',
      blobSize:1.0, blobCount:10, metaballSmooth:0.28, flowSpeed:0.4,
      meltRise:0.6, elastic:0.35, spiral:0.25,
      tunnel:0.42, tunnelSpeed:0.3, tunnelWarp:0.5,
      lens:0.3, waveInterf:0.3,
      chromaSplit:0.4, halation:0.6, colorCycle:0.4, saturation:1.3,
      typeBehaviour:'liquid', speed:0.7, loopDuration:12, seed:9090,
      bpm:126, rhythmMode:'manual', glowIntensity:1.7, vignette:0.35, grain:0.13,
    }),

  'liquid-gravity': P_('liquid', 'LIQUID GRAVITY',
    'organic forms · cursor-driven · audio energy', {
      party:true, trance:true, energy:0.5, chaos:0.4, beatResponse:0.75,
      liquidity:1.0, geometry:0.2, distortion:0.5, glowMacro:0.62,
      colorMadness:0.3, typeForce:0.7, feedbackMacro:0.3, depth:0.4, trailMacro:0.5,
      colRed:'#ff2d55', colPink:'#c77dff', colAccent:'#7ee8fa',
      colPale:'#f0e6ff', colWhite:'#ffffff', bgColor:'#000000',
      textColor:'#04000a', textMode:'molten',
      blobSize:1.1, blobCount:8, metaballSmooth:0.5, motionAmp:0.8,
      cursorOn:true, cursorForce:0.8, cursorRadius:0.36, cursorLiquid:true,
      cursorGravity:true, cursorWake:true, cursorType:true, cursorGlow:0.8,
      meltRise:0.35, elastic:0.3,
      halation:0.45, chromaSplit:0.25, contrast:1.12, saturation:1.25,
      typeBehaviour:'liquid', speed:0.55, loopDuration:14, seed:9191,
      bpm:120, rhythmMode:'manual', glowIntensity:1.4, vignette:0.4, grain:0.12,
    }),

  'chrome-fever': P_('liquid', 'CHROME FEVER',
    'metallic highlights · warped text', {
      party:true, trance:true, energy:0.52, chaos:0.38, beatResponse:0.35,
      liquidity:0.85, geometry:0.3, distortion:0.6, glowMacro:0.55,
      colorMadness:0.08, typeForce:0.85, feedbackMacro:0.3, depth:0.5, trailMacro:0.45,
      colRed:'#9fb2c4', colPink:'#e8f1f8', colAccent:'#ff2d55',
      colPale:'#f7fbff', colWhite:'#ffffff', bgColor:'#000000',
      textColor:'#f2f7fc', textMode:'molten',
      extrude:0.7, neonOutline:0.25, meltRise:0.3, spiral:0.15,
      lens:0.35, lensPinch:0.7, waveInterf:0.2,
      halation:0.35, chromaSplit:0.22, contrast:1.5, saturation:0.1,
      typeBehaviour:'chrome', speed:0.6, loopDuration:12, seed:9292,
      bpm:118, rhythmMode:'manual', glowIntensity:1.0, vignette:0.5, grain:0.1,
      blobCount:7, blobSize:1.0, metaballSmooth:0.48,
    }),

  'infinite-meltdown': P_('liquid', 'INFINITE MELTDOWN',
    'recursive zoom · kaleidoscope · feedback', {
      party:true, trance:true, energy:0.78, chaos:0.6, beatResponse:0.65,
      liquidity:0.7, geometry:0.62, distortion:0.65, glowMacro:0.72,
      colorMadness:0.55, typeForce:0.7, feedbackMacro:0.75, depth:0.9, trailMacro:0.75,
      colRed:'#ff2d6f', colPink:'#00d4ff', colAccent:'#ffe66d',
      colPale:'#ffeef4', colWhite:'#ffffff', bgColor:'#000000',
      textColor:'#08000a', textMode:'molten',
      tunnel:0.78, tunnelDepth:0.85, tunnelSpeed:0.45, tunnelWarp:0.6,
      kaleido:0.45, kaleidoSeg:6,
      feedback:0.7, trailLength:0.78, feedbackZoom:0.28,
      meltRise:0.4, spiral:0.3, chromaSplit:0.5, halation:0.55,
      typeBehaviour:'hypnotic', speed:0.85, loopDuration:14, seed:9393,
      bpm:134, rhythmMode:'manual', glowIntensity:1.5, vignette:0.42, grain:0.15,
    }),

  'acid-garden': P_('liquid', 'ACID GARDEN',
    'branching organic · fractal growth', {
      party:true, trance:true, energy:0.66, chaos:0.72, beatResponse:0.6,
      liquidity:0.8, geometry:0.55, distortion:0.75, glowMacro:0.68,
      colorMadness:0.65, typeForce:0.75, feedbackMacro:0.4, depth:0.6, trailMacro:0.55,
      colRed:'#9dff00', colPink:'#ff00c8', colAccent:'#00ffd0',
      colPale:'#eaffd6', colWhite:'#ffffff', bgColor:'#010300',
      textColor:'#020800', textMode:'molten',
      fractal:0.72, contourLine:0.95, fractalScale:3.8,
      kaleido:0.32, kaleidoSeg:8, tunnel:0.25,
      rings:0.35, ringCount:10, bursts:0.25,
      meltRise:0.45, spiral:0.35, elastic:0.4,
      chromaSplit:0.55, colorCycle:0.6, saturation:1.5, contrast:1.22,
      typeBehaviour:'liquid', speed:0.75, loopDuration:12, seed:9494,
      bpm:130, rhythmMode:'manual', glowIntensity:1.5, vignette:0.35, grain:0.16,
    }),

  'portal-collapse': P_('liquid', 'PORTAL COLLAPSE',
    'centred tunnel · radial deformation', {
      party:true, trance:true, energy:0.8, chaos:0.5, beatResponse:0.85,
      liquidity:0.6, geometry:0.7, distortion:0.6, glowMacro:0.8,
      colorMadness:0.4, typeForce:0.7, feedbackMacro:0.6, depth:1.0, trailMacro:0.65,
      colRed:'#ff0a5c', colPink:'#7b2bff', colAccent:'#00e5ff',
      colPale:'#ffe8f2', colWhite:'#ffffff', bgColor:'#000000',
      textColor:'#050008', textMode:'molten',
      tunnel:0.9, tunnelDepth:0.95, tunnelSpeed:0.6, tunnelWarp:0.4,
      lens:0.5, lensPinch:0.8, waveInterf:0.4,
      feedback:0.55, trailLength:0.7, feedbackZoom:0.35,
      bursts:0.6, rings:0.5, ringCount:8,
      chromaSplit:0.55, halation:0.65, contrast:1.2, saturation:1.35,
      typeBehaviour:'hypnotic', speed:0.9, loopDuration:10, seed:9595,
      bpm:140, rhythmMode:'manual', glowIntensity:1.6, vignette:0.4, grain:0.14,
    }),

  /* ======================= NEON / CYBER ======================= */

  'cyberpunk-signal': P_('neon', 'CYBERPUNK SIGNAL',
    'cyan + magenta · RGB split · glitch grid', {
      party:true, trance:true, energy:0.85, chaos:0.88, beatResponse:0.75,
      liquidity:0.35, geometry:0.95, distortion:1.0, glowMacro:0.6,
      colorMadness:0.4, typeForce:1.0, feedbackMacro:0.55, depth:0.8, trailMacro:0.65,
      colRed:'#00e5ff', colPink:'#ff00d4', colAccent:'#7b5cff',
      colPale:'#cfe8ff', colWhite:'#ffffff', bgColor:'#000206',
      textColor:'#000206', textMode:'molten',
      gridLines:1.15, gridScale:15, lasers:0.4, laserCount:18, laserWidth:0.05,
      rings:0.3, ringCount:14, bursts:0.35,
      kaleido:0.2, kaleidoSeg:4, tunnel:0.5, tunnelSpeed:0.6,
      feedback:0.5, trailLength:0.62,
      fragment:0.65, charAnim:0.4, elastic:0.3,
      chromaSplit:1.2, scanline:0.45, posterize:0.32, contrast:1.35,
      typeBehaviour:'glitch', speed:1.15, loopDuration:6, seed:9696,
      bpm:145, rhythmMode:'manual', glowIntensity:1.3, vignette:0.22, grain:0.22,
    }),

  'laser-cathedral': P_('neon', 'LASER CATHEDRAL',
    'sweeping beams · symmetry · monumental', {
      party:true, trance:true, energy:0.7, chaos:0.3, beatResponse:0.55,
      liquidity:0.35, geometry:1.0, distortion:0.25, glowMacro:0.9,
      colorMadness:0.25, typeForce:0.9, feedbackMacro:0.3, depth:0.75, trailMacro:0.4,
      colRed:'#ff1f4a', colPink:'#ff77c8', colAccent:'#ffe08a',
      colPale:'#fff6ec', colWhite:'#ffffff', bgColor:'#000000',
      textColor:'#060002', textMode:'molten',
      lasers:1.3, laserCount:6, laserWidth:0.16, laserSpeed:0.28,
      rings:1.1, ringCount:10, ringThickness:0.16, bursts:0.22,
      kaleido:0.62, kaleidoSeg:12, kaleidoRotate:0.12,
      tunnel:0.42, tunnelSpeed:0.22, halation:0.75,
      chromaSplit:0.28, contrast:1.2, saturation:1.15,
      extrude:0.42, neonOutline:0.55,
      typeBehaviour:'monumental', speed:0.5, loopDuration:16, seed:5150,
      bpm:110, rhythmMode:'manual', vignette:0.45, grain:0.12,
      blobCount:6, blobSize:0.72, glowIntensity:1.5,
    }),

  'neon-supernova': P_('neon', 'NEON SUPERNOVA',
    'radial bursts · expanding rings · trails', {
      party:true, trance:true, energy:1.0, chaos:0.65, beatResponse:1.0,
      liquidity:0.72, geometry:0.9, distortion:0.68, glowMacro:0.95,
      colorMadness:0.5, typeForce:0.9, feedbackMacro:0.45, depth:0.6, trailMacro:0.6,
      colRed:'#ff0a44', colPink:'#ff6ec7', colAccent:'#5ce1ff',
      colPale:'#fff0f8', colWhite:'#ffffff', bgColor:'#000000',
      textColor:'#040008', textMode:'molten',
      bursts:1.6, rings:1.0, ringCount:9, ringThickness:0.14,
      lasers:0.7, laserCount:16, laserWidth:0.07, laserSpeed:0.9,
      feedback:0.42, trailLength:0.6, lens:0.3, lensPinch:0.65,
      halation:0.9, chromaSplit:0.5, colorCycle:0.4, saturation:1.4,
      neonOutline:0.7, extrude:0.3,
      typeBehaviour:'explosive', speed:1.25, loopDuration:8, seed:9797,
      bpm:150, rhythmMode:'manual', glowIntensity:2.0, vignette:0.3, grain:0.13,
    }),

  'digital-afterlife': P_('neon', 'DIGITAL AFTERLIFE',
    'temporal feedback · ghosting · pixel shift', {
      party:true, trance:true, energy:0.55, chaos:0.75, beatResponse:0.55,
      liquidity:0.5, geometry:0.35, distortion:0.85, glowMacro:0.55,
      colorMadness:0.35, typeForce:0.8, feedbackMacro:1.0, depth:0.6, trailMacro:0.95,
      colRed:'#33ffcc', colPink:'#ff4d94', colAccent:'#ffe14d',
      colPale:'#e8fff8', colWhite:'#ffffff', bgColor:'#020404',
      textColor:'#010303', textMode:'molten',
      feedback:0.9, trailLength:0.92, feedbackZoom:-0.12, feedbackRotate:0.05,
      scanline:0.55, posterize:0.35, chromaSplit:0.6, grain:0.35,
      fragment:0.35, charAnim:0.3, elastic:0.22,
      halation:0.35, contrast:1.2, saturation:0.8,
      typeBehaviour:'glitch', speed:0.6, loopDuration:16, seed:9898,
      bpm:128, rhythmMode:'manual', glowIntensity:1.15, vignette:0.5,
    }),

  /* ======================= DISCO / COLOR ======================= */

  'prism-riot': P_('disco', 'PRISM RIOT',
    'color splitting · mirrored shapes · fast palette', {
      party:true, trance:true, energy:0.9, chaos:0.68, beatResponse:0.85,
      liquidity:0.65, geometry:0.72, distortion:0.62, glowMacro:0.85,
      colorMadness:1.0, typeForce:0.85, feedbackMacro:0.4, depth:0.6, trailMacro:0.6,
      colRed:'#ff0055', colPink:'#00ffaa', colAccent:'#ffcc00',
      colPale:'#ffffff', colWhite:'#ffffff', bgColor:'#000000',
      textColor:'#050005', textMode:'molten',
      kaleido:0.72, kaleidoSeg:6, kaleidoRotate:0.5,
      chromaSplit:1.0, colorCycle:1.4, colorSpeed:0.6, hueShift:0.4,
      saturation:1.8, contrast:1.25, halation:0.7,
      mirrored:true, rings:0.45, ringCount:8, bursts:0.5,
      elastic:0.4, fragment:0.25,
      typeBehaviour:'hypnotic', speed:1.2, loopDuration:8, seed:9999,
      bpm:136, rhythmMode:'manual', glowIntensity:1.6, vignette:0.3, grain:0.15,
    }),

  'disco-collision': P_('disco', 'DISCO COLLISION',
    'rotating forms · repeated geometry · light trails', {
      party:true, trance:true, energy:0.85, chaos:0.58, beatResponse:0.9,
      liquidity:0.72, geometry:0.85, distortion:0.6, glowMacro:0.9,
      colorMadness:0.72, typeForce:0.8, feedbackMacro:0.5, depth:0.65, trailMacro:0.7,
      colRed:'#ff3d00', colPink:'#e100ff', colAccent:'#00e5ff',
      colPale:'#fff3e0', colWhite:'#ffffff', bgColor:'#000000',
      textColor:'#060004', textMode:'molten',
      rings:0.95, ringCount:12, ringThickness:0.2,
      lasers:0.6, laserCount:10, laserWidth:0.11, laserSpeed:0.7,
      bursts:0.7, kaleido:0.5, kaleidoSeg:10,
      feedback:0.45, trailLength:0.65, feedbackRotate:0.22,
      chromaSplit:0.55, colorCycle:0.8, saturation:1.5, halation:0.6,
      extrude:0.4, neonOutline:0.5,
      typeBehaviour:'monumental', speed:1.0, loopDuration:9, seed:1111,
      bpm:132, rhythmMode:'manual', glowIntensity:1.7, vignette:0.32, grain:0.14,
    }),

  'ultraviolet-fever': P_('disco', 'ULTRAVIOLET FEVER',
    'deep violet · hot pink edges · recursive', {
      party:true, trance:true, energy:0.68, chaos:0.48, beatResponse:0.6,
      liquidity:0.78, geometry:0.45, distortion:0.55, glowMacro:0.9,
      colorMadness:0.55, typeForce:0.8, feedbackMacro:0.35, depth:0.7, trailMacro:0.55,
      colRed:'#7b2bff', colPink:'#ff2fa0', colAccent:'#b06bff',
      colPale:'#f0e6ff', colWhite:'#ffffff', bgColor:'#04000a',
      textColor:'#030008', textMode:'molten',
      tunnel:0.5, tunnelSpeed:0.35, kaleido:0.28, kaleidoSeg:8,
      lens:0.3, lensPinch:0.6, waveInterf:0.25,
      halation:0.8, chromaSplit:0.45, colorCycle:0.5, saturation:1.45,
      neonOutline:0.6, meltRise:0.3,
      typeBehaviour:'liquid', speed:0.7, loopDuration:13, seed:1212,
      bpm:124, rhythmMode:'manual', glowIntensity:1.75, vignette:0.42, grain:0.13,
    }),

  'color-cannon': P_('disco', 'COLOR CANNON',
    'audio palette shifts · particle bursts', {
      party:true, trance:true, energy:1.0, chaos:0.8, beatResponse:1.0,
      liquidity:0.7, geometry:0.88, distortion:0.8, glowMacro:0.95,
      colorMadness:1.0, typeForce:0.9, feedbackMacro:0.55, depth:0.55, trailMacro:0.65,
      colRed:'#ff2200', colPink:'#ffe600', colAccent:'#00ff88',
      colPale:'#ffffff', colWhite:'#ffffff', bgColor:'#000000',
      textColor:'#040004', textMode:'molten',
      bursts:1.7, rings:0.9, ringCount:7, lasers:0.8, laserCount:20,
      lasersWidth:0.06, feedback:0.5, trailLength:0.7,
      chromaSplit:0.95, colorCycle:1.6, colorSpeed:0.75,
      saturation:1.8, contrast:1.3, halation:0.8, posterize:0.25,
      elastic:0.5, fragment:0.3,
      typeBehaviour:'explosive', speed:1.3, loopDuration:6, seed:1313,
      bpm:160, rhythmMode:'manual', glowIntensity:1.9, vignette:0.28, grain:0.15,
    }),

  /* ------------------------- CLASSIC (kept from stage 1) ---------------- */

  'goa-meltdown': P_('classic', 'GOA MELTDOWN',
    'molten lava · hot pink · hypnotic', {
      party:true, trance:true, energy:0.62, chaos:0.48, beatResponse:0.6,
      liquidity:0.98, geometry:0.30, distortion:0.7, glowMacro:0.88,
      colorMadness:0.55, typeForce:0.8, feedbackMacro:0.30, depth:0.35, trailMacro:0.5,
      colRed:'#ff1020', colPink:'#ff2f7d', colAccent:'#ff7a00',
      colPale:'#ffe4ea', colWhite:'#ffffff', bgColor:'#000000',
      blobSize:0.95, blobCount:9, metaballSmooth:0.30, flowSpeed:0.42,
      glowIntensity:1.55, glowRadius:0.85,
      kaleido:0.18, kaleidoSeg:12, lens:0.25, lensPinch:0.5, waveInterf:0.25,
      meltRise:0.55, spiral:0.22, elastic:0.30,
      chromaSplit:0.45, halation:0.55, colorCycle:0.35, colorSpeed:0.25,
      contrast:1.12, saturation:1.35,
      typeBehaviour:'liquid', speed:0.75, loopDuration:10, seed:1337,
      textMode:'molten', bpm:126, rhythmMode:'manual',
      vignette:0.35, grain:0.14,
    }),

  'liquid-chrome': P_('classic', 'LIQUID CHROME',
    'metal · displacement · deep black', {
      party:true, trance:true, energy:0.45, chaos:0.34, beatResponse:0.30,
      liquidity:0.88, geometry:0.22, distortion:0.55, glowMacro:0.62,
      colorMadness:0.12, typeForce:0.72, feedbackMacro:0.30, depth:0.5, trailMacro:0.5,
      colRed:'#8fa4b8', colPink:'#dfe9f2', colAccent:'#ffffff',
      colPale:'#f2f7fb', colWhite:'#ffffff', bgColor:'#000000',
      rings:0.22, ringCount:5, ringThickness:0.12,
      lens:0.32, lensPinch:0.68, feedback:0.34, trailLength:0.5,
      halation:0.40, chromaSplit:0.18, contrast:1.42, saturation:0.12,
      extrude:0.62, neonOutline:0.30, meltRise:0.30,
      glowIntensity:1.1, glowRadius:0.55, textColor:'#f4f8ff',
      typeBehaviour:'chrome', speed:0.55, loopDuration:12, seed:4402,
      textMode:'molten', blobCount:7, blobSize:1.05, metaballSmooth:0.5,
      bpm:90, rhythmMode:'manual', vignette:0.55, grain:0.10,
    }),

  'neon-catastrophe': P_('classic', 'NEON CATASTROPHE',
    'lasers · bloom · colour cycling', {
      party:true, trance:true, energy:0.95, chaos:0.72, beatResponse:0.85,
      liquidity:0.62, geometry:0.92, distortion:0.78, glowMacro:0.95,
      colorMadness:0.88, typeForce:0.95, feedbackMacro:0.35, depth:0.6, trailMacro:0.45,
      colRed:'#ff0033', colPink:'#ff00c8', colAccent:'#00ffe1',
      colPale:'#fff0f6', colWhite:'#ffffff', bgColor:'#000000',
      lasers:1.1, laserCount:9, laserWidth:0.28, laserSpeed:0.7,
      rings:0.55, ringCount:9, ringThickness:0.22, bursts:0.9,
      kaleido:0.28, kaleidoSeg:8, feedback:0.30, trailLength:0.55,
      halation:0.85, colorCycle:0.9, chromaSplit:0.75, scanline:0.22,
      contrast:1.25, saturation:1.45,
      extrude:0.30, neonOutline:0.85, elastic:0.42, perspective:0.18,
      glowIntensity:1.9, glowRadius:0.9, textColor:'#050008',
      typeBehaviour:'monumental', speed:1.35, loopDuration:8, seed:2201,
      textMode:'molten', blobCount:10, bpm:132, rhythmMode:'manual',
      vignette:0.30, grain:0.18,
    }),

  'cyber-psychosis': P_('classic', 'CYBER PSYCHOSIS',
    'grid · RGB ghosting · electric blue', {
      party:true, trance:true, energy:0.82, chaos:0.88, beatResponse:0.7,
      liquidity:0.35, geometry:0.9, distortion:0.95, glowMacro:0.55,
      colorMadness:0.45, typeForce:1.0, feedbackMacro:0.55, depth:0.8, trailMacro:0.65,
      colRed:'#0033ff', colPink:'#00e5ff', colAccent:'#7b5cff',
      colPale:'#cfe8ff', colWhite:'#ffffff', bgColor:'#000308',
      lasers:0.35, laserCount:16, laserWidth:0.10, laserSpeed:0.9,
      rings:0.30, ringCount:14, ringThickness:0.08,
      gridLines:0.95, gridScale:14, bursts:0.30,
      tunnel:0.55, tunnelSpeed:0.65, kaleido:0.20, kaleidoSeg:4,
      feedback:0.48, trailLength:0.62, fragment:0.62,
      chromaSplit:1.15, scanline:0.45, posterize:0.30, contrast:1.35,
      saturation:1.2,
      typeBehaviour:'glitch', speed:1.15, loopDuration:6, seed:7710,
      textColor:'#000308', textMode:'molten', distortOn:true,
      bpm:140, rhythmMode:'manual', vignette:0.20, grain:0.22,
    }),

  'infinite-rave': P_('classic', 'INFINITE RAVE',
    'endless tunnel · mirrored type · depth', {
      party:true, trance:true, energy:0.8, chaos:0.55, beatResponse:0.65,
      liquidity:0.5, geometry:0.6, distortion:0.6, glowMacro:0.75,
      colorMadness:0.6, typeForce:0.75, feedbackMacro:0.65, depth:1.0, trailMacro:0.7,
      colRed:'#ff2d55', colPink:'#00d4ff', colAccent:'#ffd400',
      colPale:'#ffeef4', colWhite:'#ffffff', bgColor:'#000000',
      tunnel:0.82, tunnelDepth:0.9, tunnelSpeed:0.55, tunnelWarp:0.55,
      kaleido:0.35, kaleidoSeg:4,
      feedback:0.72, trailLength:0.78, feedbackZoom:0.30, feedbackRotate:0.10,
      chromaSplit:0.5, halation:0.6, contrast:1.18, saturation:1.3,
      perspective:0.35, spiral:0.18,
      typeBehaviour:'hypnotic', speed:0.9, loopDuration:12, seed:8888,
      textColor:'#08000a', bpm:138, rhythmMode:'manual',
      vignette:0.4, grain:0.14,
    }),

  'chrome-explosion': P_('classic', 'CHROME EXPLOSION',
    'radial bursts · hard highlights', {
      party:true, trance:true, energy:1.0, chaos:0.62, beatResponse:0.95,
      liquidity:0.7, geometry:0.75, distortion:0.65, glowMacro:0.8,
      colorMadness:0.2, typeForce:1.0, feedbackMacro:0.35, depth:0.55, trailMacro:0.45,
      colRed:'#c9d6e2', colPink:'#ffffff', colAccent:'#ff3366',
      colPale:'#ffffff', colWhite:'#ffffff', bgColor:'#000000',
      bursts:1.4, rings:0.35, ringCount:6, ringThickness:0.2,
      lasers:0.45, laserCount:18, laserWidth:0.06,
      lens:0.35, lensPinch:0.72, halation:0.55,
      chromaSplit:0.35, contrast:1.55, saturation:0.35,
      extrude:0.75, neonOutline:0.45, elastic:0.68, fragment:0.35,
      typeBehaviour:'explosive', speed:1.4, loopDuration:6, seed:6060,
      textColor:'#ffffff', bpm:150, rhythmMode:'manual',
      vignette:0.35, grain:0.12,
    }),

  'analog-afterlife': P_('classic', 'ANALOG AFTERLIFE',
    'VHS feedback · smear · grain', {
      party:true, trance:true, energy:0.5, chaos:0.7, beatResponse:0.5,
      liquidity:0.55, geometry:0.25, distortion:0.85, glowMacro:0.6,
      colorMadness:0.4, typeForce:0.7, feedbackMacro:1.0, depth:0.55, trailMacro:1.0,
      colRed:'#ff5522', colPink:'#ff99aa', colAccent:'#33ffcc',
      colPale:'#ffeedd', colWhite:'#ffffff', bgColor:'#050302',
      feedback:0.88, trailLength:0.92, feedbackZoom:-0.16, feedbackRotate:0.04,
      scanline:0.62, chromaSplit:0.7, grain:0.42, halation:0.45,
      posterize:0.18, contrast:1.15, saturation:0.85,
      lens:0.2, waveInterf:0.3, fragment:0.35, elastic:0.25,
      typeBehaviour:'glitch', speed:0.65, loopDuration:14, seed:1994,
      textColor:'#0a0402', bpm:96, rhythmMode:'manual',
      vignette:0.55, glowIntensity:1.2,
    }),

  /* ---- dedicated strobe presets: hard cut-to-black flicker ---- */

  'whiteout-strobe': P_('hardcore', 'WHITEOUT STROBE',
    'hard white flicker · black gaps · huge type', {
      party:true, trance:true, energy:0.9, chaos:0.4, beatResponse:0.8,
      liquidity:0.5, geometry:0.3, distortion:0.45, glowMacro:0.6,
      colorMadness:0.1, typeForce:0.85, feedbackMacro:0.2, depth:0.4, trailMacro:0.35,
      colRed:'#ffffff', colPink:'#ff2233', colAccent:'#ffffff',
      colPale:'#ffffff', colWhite:'#ffffff', bgColor:'#000000',
      textColor:'#000000', textMode:'clean', contrast:1.5, saturation:0.1,
      strobe:1.0, strobeRate:12, strobeMode:'hard', strobeColor:'#ffffff',
      strobeBlack:0.92, strobeHold:0.30,
      halation:0.55, chromaSplit:0.10, vignette:0.45, grain:0.12,
      typeBehaviour:'monumental', speed:1.0, loopDuration:4, seed:3131,
      bpm:160, rhythmMode:'manual', glowIntensity:1.2,
      blobCount:4, blobSize:0.55,
    }),

  'blackout-flicker': P_('hardcore', 'BLACKOUT FLICKER',
    'mostly black · violent white cuts', {
      party:true, trance:true, energy:0.8, chaos:0.3, beatResponse:0.9,
      liquidity:0.3, geometry:0.2, distortion:0.3, glowMacro:0.4,
      colorMadness:0.05, typeForce:0.9, feedbackMacro:0.2, depth:0.3, trailMacro:0.3,
      colRed:'#ff1020', colPink:'#ffffff', colAccent:'#ffffff',
      colPale:'#ffffff', colWhite:'#ffffff', bgColor:'#000000',
      textColor:'#ffffff', textMode:'clean', contrast:1.7, saturation:0.6,
      strobe:0.95, strobeRate:16, strobeMode:'mixed', strobeColor:'#ffffff',
      strobeBlack:1.0, strobeHold:0.14,
      halation:0.3, chromaSplit:0.2, vignette:0.85, grain:0.14,
      typeBehaviour:'monumental', speed:1.1, loopDuration:3, seed:3232,
      bpm:180, rhythmMode:'manual', glowIntensity:0.9,
      blobCount:3, blobSize:0.42, edgeSoftness:0.5,
    }),

  'acid-strobe': P_('disco', 'ACID STROBE',
    'colour cycling strobe · green / magenta', {
      party:true, trance:true, energy:1.0, chaos:0.6, beatResponse:0.9,
      liquidity:0.6, geometry:0.5, distortion:0.6, glowMacro:0.8,
      colorMadness:0.7, typeForce:0.9, feedbackMacro:0.3, depth:0.5, trailMacro:0.45,
      colRed:'#aaff00', colPink:'#ff00c8', colAccent:'#00ffd0',
      colPale:'#ffffff', colWhite:'#ffffff', bgColor:'#000000',
      textColor:'#000000', textMode:'clean', contrast:1.4, saturation:1.8,
      strobe:1.0, strobeRate:14, strobeMode:'colour', strobeColor:'#aaff00',
      strobeBlack:0.85, strobeHold:0.28,
      colorCycle:1.2, chromaSplit:0.5, halation:0.7,
      typeBehaviour:'explosive', speed:1.3, loopDuration:5, seed:3333,
      bpm:170, rhythmMode:'manual', glowIntensity:1.6,
    }),

  'invert-strobe': P_('neon', 'INVERT STROBE',
    'negative flicker · monochrome cuts', {
      party:true, trance:true, energy:0.85, chaos:0.45, beatResponse:0.85,
      liquidity:0.45, geometry:0.35, distortion:0.5, glowMacro:0.5,
      colorMadness:0.03, typeForce:0.9, feedbackMacro:0.25, depth:0.4, trailMacro:0.4,
      colRed:'#ffffff', colPink:'#dddddd', colAccent:'#ffffff',
      colPale:'#ffffff', colWhite:'#ffffff', bgColor:'#000000',
      textColor:'#ffffff', textMode:'clean', contrast:1.8, saturation:0.0,
      strobe:1.0, strobeRate:10, strobeMode:'invert', strobeColor:'#ffffff',
      strobeBlack:0.6, strobeHold:0.42,
      scanline:0.3, grain:0.24, vignette:0.35,
      typeBehaviour:'monumental', speed:0.9, loopDuration:4, seed:3434,
      bpm:150, rhythmMode:'manual', glowIntensity:1.0,
      blobCount:4, blobSize:0.6,
    }),

  'synesthesia': P_('classic', 'SYNESTHESIA',
    'audio-reactive · elastic · multi-layer', {
      party:true, trance:true, energy:0.72, chaos:0.45, beatResponse:1.0,
      liquidity:0.8, geometry:0.5, distortion:0.6, glowMacro:0.7,
      colorMadness:0.75, typeForce:0.85, feedbackMacro:0.4, depth:0.5, trailMacro:0.55,
      colRed:'#ff2d6f', colPink:'#ff9e00', colAccent:'#00ffa3',
      colPale:'#fff0f6', colWhite:'#ffffff', bgColor:'#000000',
      rhythmMode:'manual', bpm:124, beatSub:4,
      audioSens:1.1, audioSmooth:0.68,
      bassAmt:0.9, midAmt:0.75, trebleAmt:0.65, beatAmt:0.95,
      elastic:0.62, meltRise:0.35, spiral:0.20, lineStagger:0.45, charAnim:0.40,
      kaleido:0.22, kaleidoSeg:8, tunnel:0.25,
      lasers:0.30, rings:0.35, bursts:0.45,
      halation:0.5, chromaSplit:0.5, colorCycle:0.45,
      contrast:1.15, saturation:1.4,
      typeBehaviour:'liquid', speed:0.85, loopDuration:10, seed:2024,
      textColor:'#04000a', vignette:0.32, grain:0.15,
    }),
};

/* ============================================================================
   PRESET CLASSIFICATION
   Tier and flash rating are DERIVED from the parameters a preset actually sets,
   never hand-labelled — if a preset is dialled up, its rating moves with it.

     tier 1 SUBTLE     calm, minimal effect stack
     tier 2 MODERATE   clear motion, one or two effects
     tier 3 STRONG     layered and fast
     tier 4 INTENSE    most of the stack engaged
     tier 5 EXTREME    everything at once
   ========================================================================= */

const TIER_NAMES = ['', 'SUBTLE', 'MODERATE', 'STRONG', 'INTENSE', 'EXTREME'];

/* how hard a preset drives the things that can trigger photosensitivity */
function flashRating(s){
  const g = k => +s[k] || 0;
  let score = 0;
  score += Math.min(1, g('bursts') / 1.6) * 30;
  score += Math.min(1, g('lasers') / 1.4) * 14;
  score += Math.min(1, g('rings') / 1.4) * 10;
  score += Math.min(1, g('halation') / 1.4) * 12;
  score += Math.min(1, g('colorCycle') / 1.4) * 16;
  score += Math.min(1, g('scanline') / 0.8) * 8;
  score += Math.min(1, g('chromaSplit') / 1.4) * 6;
  if (s.invert) score += 18;
  /* a fast clock multiplies the perceived rate of change */
  const speed = +s.speed || 1;
  const loop = +s.loopDuration || 8;
  const rate = speed / Math.max(1, loop);
  score *= (0.55 + Math.min(1.6, rate * 7.5));
  score *= (0.75 + (+s.beatResponse || 0) * 0.55);
  return Math.round(score);
}

/* 0 = safe · 1 = caution · 2 = strong warning */
function flashLevel(s){
  const r = flashRating(s);
  if (r >= 95) return 2;   /* strong: rapid full-frame flashing */
  if (r >= 38) return 1;   /* caution: intermittent bright transients */
  return 0;
}

/* overall distance from a plain composition */
function presetTier(s){
  const g = k => +s[k] || 0;
  let score = 0;
  score += Math.min(1, g('kaleido')) * 14;
  score += Math.min(1, g('tunnel')) * 14;
  score += Math.min(1, g('fractal') + g('contourLine')) * 12;
  score += Math.min(1, g('feedback')) * 16;
  score += Math.min(1, g('chromaSplit') / 1.4) * 8;
  score += Math.min(1, g('halation') / 1.4) * 7;
  score += Math.min(1, g('lasers') / 1.4) * 10;
  score += Math.min(1, g('rings') / 1.4) * 7;
  score += Math.min(1, g('bursts') / 1.6) * 10;
  score += Math.min(1, g('gridLines') / 1.4) * 6;
  score += Math.min(1, g('lens')) * 6;
  score += Math.min(1, g('waveInterf')) * 5;
  score += Math.min(1, g('posterize')) * 4;
  score += Math.min(1, g('scanline')) * 4;
  score += (+s.distortion || 0) * 8;
  score += (+s.chaos || 0) * 8;
  score += (+s.elastic || 0) * 5;
  score += (+s.fragment || 0) * 6;
  score += (+s.extrude || 0) * 4;
  score += (+s.meltRise || 0) * 4;
  if (s.invert) score += 6;
  /* cut points from the measured spread of real preset scores (6..60) */
  if (score < 12) return 1;
  if (score < 26) return 2;
  if (score < 40) return 3;
  if (score < 50) return 4;
  return 5;
}

(function classifyPresets(){
  for (const id in PARTY_PRESETS){
    const p = PARTY_PRESETS[id];
    p.tier = presetTier(p.s);
    p.flash = flashLevel(p.s);
    p.flashScore = flashRating(p.s);
  }
})();


/* ============================================================================
   LEGIBILITY ENVELOPE

   A preset may ask for anything, but past a certain point distortion stops
   reading as typography and becomes noise. These caps are applied when a
   preset is applied, not stored, so the table above stays easy to read and
   edit. Anything the user sets by hand afterwards is untouched.
   ========================================================================= */

/* Caps are deliberately tighter than "the glyphs are still technically
   recognisable". Past these values the type stops reading at a glance, and a
   preset that you cannot read a word from is not a typography preset. Anything
   the user drags past these limits by hand is left alone — this only governs
   what a preset is allowed to set. */
const LEGIBILITY_CAPS = {
  distortion:   0.55,   /* glyph structure starts dissolving past this */
  textWarpX:    0.42,
  textWarpY:    0.34,
  fragment:     0.38,
  chromaSplit:  0.70,
  textBlur:     0.24,
  textJitter:   0.06,
  spiral:       0.40,
  meltRise:     0.45,
  elastic:      0.55,
  perspective:  0.40,
  charAnim:     0.45,
  lineStagger:  0.45,
  feedback:     0.75,   /* feedback smears the type if it goes higher */
  scanline:     0.55,
  posterize:    0.35,
};

function clampNum(v, lo, hi){ return v < lo ? lo : v > hi ? hi : v; }

function applyLegibilityEnvelope(out){
  for (const k in LEGIBILITY_CAPS){
    if (typeof out[k] === 'number' && out[k] > LEGIBILITY_CAPS[k]){
      out[k] = LEGIBILITY_CAPS[k];
    }
  }
  /* Every preset keeps a visible contour — this is what guarantees the type
     can be read over both the black negative space and the pale liquid. */
  if (out.textOutline === undefined) out.textOutline = 0.55;
  else out.textOutline = Math.max(out.textOutline, 0.45);

  /* Keep enough tonal separation between the ink and the liquid behind it.
     A preset that drives contrast to 1.8 renders the type into mush. */
  if (typeof out.contrast === 'number') out.contrast = clampNum(out.contrast, 0.8, 1.45);
  if (typeof out.saturation === 'number') out.saturation = clampNum(out.saturation, 0, 1.6);

  /* Type opacity below ~70% stops the glyph reading as a solid form. */
  if (typeof out.textOpacity === 'number') out.textOpacity = Math.max(out.textOpacity, 0.85);

  return out;
}
