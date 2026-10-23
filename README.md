# TRANCE LAB

A browser-based kinetic typography and liquid-motion instrument. You type text,
the GPU melts it into liquid chrome, lava, lasers and fractal tunnels, and the
result reacts to audio, to your cursor, and to a bank of 30 presets.

No build step to run it. No backend, no accounts, no paid APIs. Open
`dist/index.html` and it works.

```
open dist/index.html
```

---

## What it actually is

Everything you see is computed per-frame on the GPU in hand-written GLSL. There
are no videos, no sprite sheets, no CSS-gradient stand-ins. The repository ships
the shader source, so you can read the maths.

The renderer is a multi-pass pipeline:

```
                    ┌──────────────┐
  text (Canvas2D) ─►│  text texture│──┐
                    └──────────────┘  │
                                      ▼
  ┌────────────┐   ┌────────────┐   ┌───────────────┐   ┌──────────┐
  │ FIELD pass │──►│ blur chain │──►│ COMPOSITE pass│──►│  scene   │
  │ metaballs  │   │ halo+bloom │   │ type+liquid   │   │   RT     │
  └────────────┘   └────────────┘   └───────────────┘   └────┬─────┘
                                                             │
  ┌────────────┐                                        ┌────▼─────┐
  │GEOMETRY    │───────────────────────────────────────►│  POST    │
  │lasers/rings│                                        │ trance   │
  └────────────┘                                        │ stack    │
                                                        └────┬─────┘
                                                    ┌────────▼───────┐
                                                    │ feedback ping- │
                                                    │ pong → screen  │
                                                    └────────────────┘
```

Passes, in order:

1. **Field** — half-resolution SDF field. Eight to twelve anisotropic metaballs
   are unioned with a polynomial smooth-minimum (`smin`), after the sample
   point has been pushed through a two-level domain warp built from FBM noise.
   Outputs `(mask, signed distance, interior detail, rim)`.
2. **Text** — the text block is rasterised by Canvas2D into an offscreen canvas,
   uploaded as a mipmapped texture. Mip levels are the blur control, so glyph
   softness costs nothing extra.
3. **Blur chain** — separable 5-tap gaussian at quarter resolution for the wide
   halo, half resolution for the medium bloom. Upscaled by the composite.
4. **Composite** — builds the liquid in three concentric zones (bleeding glow in
   black air → saturated rim → pale molten core), then lays the type over it.
   This is where the reference look lives.
5. **Geometry** — additive layer for neon beams, cathedral rings, a perspective
   wireframe grid and radial bursts.
6. **Post** — the trance stack: feedback, kaleidoscope, recursive tunnel, fractal
   contours, liquid lens, chromatic aberration, halation, colour grading.
7. **Feedback** — ping-pong float render targets. The previous frame, zoomed and
   rotated, is screen-blended under the current one.

Everything is driven by one deterministic clock. Given the same seed, loop
length and phase you get the same frame, which is what makes video export
reproducible.

---

## Features

### Typography
Multiline text with manual breaks preserved. Font size, weight, tracking,
leading, alignment, width, colour, opacity, scale, rotation, crop, auto-fit and
line justification. Six behaviours — monumental, liquid, glitch, explosive,
chrome, hypnotic — plus per-effect controls for elastic stretch, fragmentation,
perspective, spiral warp, line stagger, character animation, melt, extrusion and
neon outline. Two render modes: **clean** (crisp type over liquid) and **molten**
(type dissolving into it). Local font files can be uploaded via `FontFace`.

### Liquid engine
Domain-warped FBM feeding a metaball field, with controls for blob size, count,
smoothness, flow speed, noise scale and strength, warp amount, liquid scale,
motion amplitude and edge softness. Seamless looping is enforced by evaluating
orbital motion at integer harmonics of the loop phase, so phase 0 and phase 1
are mathematically identical.

### Trance mode
A master switch plus an intensity slider over twelve independently adjustable
effects: kaleidoscope/radial symmetry, recursive tunnels, fractal topographic
contours, GPU feedback, chromatic aberration, liquid lens (pinch/bulge), wave
interference, bloom/halation, film grain, scanlines, posterisation, colour
inversion and animated hue cycling.

### Party mode
Thirteen macro dials — energy, chaos, beat response, liquidity, geometry,
distortion, glow, colour madness, type force, feedback, depth, motion, trail —
each of which **multiplies a whole group** of low-level shader parameters. Macros
and individual sliders compose rather than fight.

### Audio reactivity
Three capture routes, each with its real permission story:

| Route | How | Caveat |
|---|---|---|
| Tab / system | `getDisplayMedia` | You must tick **"Share tab audio"**. A page cannot silently record system-wide sound. Chrome/Edge support it; Firefox/Safari usually expose video only. |
| Microphone | `getUserMedia` | Listens to room audio. Works everywhere, picks up noise. |
| Audio file | `decodeAudioData` | Loops the file through the graph. |

Analysis runs on an `AnalyserNode` with a 1024-point FFT. It extracts sub-bass,
bass, mid and treble bands, spectral centroid, spectral flux, a transient
envelope and a rolling BPM estimate from inter-onset intervals. Everything is
smoothed with an adjustable coefficient so the visuals never jitter.

Mappings are bass → liquid/zoom, kick → impact, mid → type deformation, high →
glow/sparks, beat → bursts. A manual BPM and subdivision override corrects a
drifting estimate, and a fallback motion system keeps the composition alive when
audio is quiet or absent.

All capture resources — microphone tracks, tab-capture streams, the audio
context — are released on stop and on `beforeunload`.

### Cursor playground
The pointer is a force in composition space, not a DOM overlay. Coordinates are
normalised against the canvas rect and smoothed on the animation clock, so
behaviour is identical at every zoom level and aspect ratio.

Individually toggleable behaviours: liquid displacement (push, pull and vortex
shear), gravity well, chromatic wake, warp brush, portal lens, particle
attraction and typography push. Hover in/out ramps the whole field smoothly.
Touch drag is supported as a pointer equivalent.

### Presets
Thirty-four presets across five groups — hardcore/techno, liquid, neon/cyber,
disco/colour, and the classic set. Each configures real parameters across
typography, liquid, geometry, motion, colour and post-processing, and each has
its own motion personality rather than a swapped palette.

Every preset carries a **tier** (1 SUBTLE → 5 EXTREME) and a **flash rating**,
both *derived* from the parameters it sets rather than hand-labelled — dial a
preset up and its rating moves with it. The browser groups by tier and filters
by BASIC / WILD / FLASH / SAFE, with a photosensitivity banner on the flash view.

A **legibility envelope** clamps distortion, fragmentation, chroma and blur when
a preset is applied, so no preset can render type that has stopped being type.

**Thumbnails are rendered by the actual engine.** `Renderer.renderThumb()`
temporarily overrides state, renders the real pipeline at 108 × 108, reads the
pixels back and restores state exactly. Nothing is a 2D approximation.

`GENERATE VARIATION` mutates the current look while respecting per-category
locks (text, palette, seed, geometry, typography, motion).
`GENERATE SOMETHING INSANE` combines a random preset with extreme parameter
ranges, still honouring the locks.

### Export
- **PNG** at 1000–4000 px long edge, or the current preview resolution. The
  composition is re-rendered at target size on the GPU, never upscaled.
- **Video** as WebM (VP9 → VP8 fallback) or MP4/H.264 when the browser exposes
  it. 24/30/60 fps, configurable duration, progress and cancel.
- Frames are driven from **wall-clock time against the deterministic timeline**,
  not the animation frame counter, so a slow GPU produces fewer distinct frames
  rather than a silently slow-motion clip.
- Codec availability is read from `MediaRecorder.isTypeSupported` and reported
  honestly. If a browser cannot encode a format, the UI says so.

### Persistence
Autosave to `localStorage`, JSON project import/export, and custom presets.
Imported files are validated key-by-key against the known schema with type
checks, hex validation for colours and range clamps — a hostile or corrupt file
cannot wedge the renderer.

### Strobe
A real hard-cut flash engine in the post pass: integer-rate gate on the loop
phase, duty-cycle hold, black gap, and four modes (white / colour / invert /
mixed). Derived from `uPhase`, so exported frames strobe identically to the
preview.

### Safety
Reduced-flashing mode soft-clips bright transients and **caps strobe depth**
regardless of what a preset asks for. Reduce-motion damps animated
bands. `Shift+P` or `Esc` freezes immediately.

---

## Keyboard

| Key | Action |
|---|---|
| `Space` | Play / pause |
| `R` | Restart loop |
| `Shift+P` | Immediate freeze |
| `G` | Grid |
| `'` | Safe guides |
| `H` | Presentation mode |
| `F` | Fullscreen + presentation mode |
| `E` | Export |
| `←` `→` | Scrub timeline |
| `Ctrl/Cmd+Z` | Undo |
| `Ctrl/Cmd+Shift+Z` | Redo |
| `T` `Y` `U` | Trance / Party / Audio |
| `Esc` | Close modal · exit presentation |

---

## Repository layout

```
lavagraphs-/
├── dist/
│   └── index.html        ← built, self-contained, open this
├── src/
│   ├── template.html     HTML shell + all CSS
│   ├── core.js           state, text raster, WebGL2 pipeline, animation, beat
│   ├── ui.js             control builders, chrome, render loop, export
│   ├── ui_presets.js     preset registry
│   ├── ui_data.js        variation generator, undo/redo, persistence
│   ├── ui_party.js       trance + party panels, preset browser, scope
│   ├── ui_audio.js       audio analysis panel, cursor panel
│   └── build.js          inlines src/* into dist/index.html
├── docs/
├── LICENSE
└── README.md
```

### Building

```bash
cd src
node build.js
```

`build.js` inlines `core.js` and the five UI modules into `template.html` at the
`/*~~CORE~~*/` and `/*~~UI~~*/` markers and writes `dist/index.html`. The two
scripts are wrapped in separate IIFEs because both would otherwise declare
`const state` at global scope.

There is no bundler and no dependency tree — the app is deliberately
zero-dependency so it runs from `file://` without a server.

---

## Technical notes

**Why no Three.js.** The suggested stack was React + TypeScript + Vite +
Three.js. This implementation is a single-file WebGL2 app instead. The renderer
is entirely custom fragment shaders, so a scene-graph library would only add
size; and a zero-dependency build means the file opens directly from disk with
no toolchain, which matters more for a tool you want to hand to someone.

**Float render targets.** Half-float (`RGBA16F`) targets are required for the
halo and feedback chains to hold values above 1.0. The renderer requests
`EXT_color_buffer_float` / `EXT_color_buffer_half_float` and falls back to 8-bit
if neither is present.

**Uniform updates, never recompiles.** All four programs compile once at init.
Slider changes only write uniforms. There is no path that recompiles a shader.

**Seamless looping.** Motion that must loop is evaluated as `sin(A*k + φ)` where
`k` is an integer and `A = phase · 2π`. At `phase = 1` the argument has advanced
by a whole number of turns, so it equals `phase = 0` exactly. A `uSeamless`
uniform switches to free-running time-based motion when looping is off.

**Composition coordinate system.** The layout is expressed in 1000 fixed
composition units and the projection is derived from the aspect ratio, so
changing the viewport does not reflow the design.

**Determinism.** `Animation.atPhase(p)` and `Renderer.draw(phase, time)` take
explicit time, and the seeded PRNG (`mulberry32`) drives all randomness. Export
replays the same timeline the preview uses.

---

## Browser support

Requires WebGL2 with float render targets — Chrome, Edge and Firefox on a
machine with hardware acceleration. Safari 15+ generally works. Without WebGL2
the app shows an explicit diagnostic overlay rather than failing silently.

Video export depends on `MediaRecorder` codec support, which varies by browser
and is reported in the UI.

---

## License

MIT — see [LICENSE](LICENSE).
