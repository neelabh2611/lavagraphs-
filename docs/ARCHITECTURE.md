# Architecture

## Module map

| File | Responsibility |
|---|---|
| `src/template.html` | Markup and all CSS. Two script markers: `/*~~CORE~~*/` and `/*~~UI~~*/`. |
| `src/core.js` | State store, text rasteriser, WebGL2 renderer, cursor field, beat engine, animation clock. Exports `window.LAVA`. |
| `src/ui.js` | Control builders (slider, toggle, colour, segmented, select), type/motion/liquid/colour/comp/out panels, timeline, chrome wiring, export, boot. |
| `src/ui_presets.js` | `PARTY_PRESETS` registry. |
| `src/ui_data.js` | Variation generator, undo/redo, autosave, project validation. |
| `src/ui_party.js` | Trance panel, party panel, macro dials, preset browser, spectrum scope. |
| `src/ui_audio.js` | Audio input panel, analysis readouts, mapping editor, cursor panel. |
| `src/build.js` | Inlines everything into `dist/index.html`. |

The UI modules are concatenated into a **single IIFE** in the order listed by
`build.js`. They only declare; `boot()` runs at the end.

`core.js` is wrapped in its own IIFE because both bundles would otherwise
declare `const state` at global scope.

## State

One flat object, `window.LAVA.state`, seeded from `DEFAULTS`. `set(key, value)`
mutates and emits; `subscribe(fn)` receives the changed keys. Every control
writes through `set`, and `syncers` (§ below) re-reads state to repaint.

This is deliberate: a flat object means a slider, a preset, an undo step and a
loaded JSON file all take exactly the same path into the renderer.

## Controls

`mkSlider` / `mkToggle` / `mkColor` / `mkSeg` / `mkSelect` each register a
`paint` function with `syncers`. `syncAll()` runs them all; `subscribe()` calls
`syncChrome()` which calls `Stage.relayout()`.

Sliders support pointer-capture dragging, drag-to-scrub on the numeric readout,
double-click reset to default and a default-position tick mark.

## Render pipeline

See the README for the pass diagram. Key implementation points:

- Programs compile once in `Renderer.init()`. Sliders only write uniforms.
- `Renderer.resize(w, h)` reallocates render targets; it early-returns when the
  half-resolution size is unchanged, so resizing the window mid-animation does
  not thrash GPU memory.
- `postOn` is computed once per frame from the trance flags **and** the actual
  amounts, so the entire post stack is skipped when nothing is dialled in.
- `Renderer.resetFeedback()` clears the ping-pong targets.

## Determinism

`Animation.tick(now)` advances `rawTime` by `dt · speed`, then derives `phase`
from `rawTime % loopLen`. Shaders receive `phase` and `time` explicitly, so
`Renderer.draw(phase, time)` is a pure function of its arguments.

Export calls `Renderer.draw(phase, phase · loopLen())` per frame rather than
letting the loop decide, which is what makes the output reproducible.

Seamless looping is enforced in the shaders by evaluating orbital motion at
integer harmonics of `phase`.

## Audio

`Beat` owns the `AudioContext`, `AnalyserNode` and any live capture stream.

```
source ──► AnalyserNode ──► GainNode ──► destination
                │
                └──► getByteFrequencyData / getByteTimeDomainData
```

`Beat.tick(now, phase, playing)` runs once per frame from `Animation.tick` and
updates smoothed band values, the transient envelope and the BPM estimate. It
also synthesises a beat clock in `manual` mode from BPM and subdivision, so the
visuals stay rhythmic with no audio at all.

Capture resources are released in `stopSource()`, which is called on stop, on
source switch and from `beforeunload`.

## Cursor

`Cursor` holds target and smoothed positions in composition space, plus a
velocity vector. `Cursor.tick(dt)` does the smoothing — it is driven by the
animation clock, not by pointer events, so a fast mouse cannot outrun the frame
rate and a stalled tab cannot accumulate a huge delta.

Pointer handlers only call `Cursor.setTarget()`. No DOM writes per move event.

The composite shader converts the cursor into a displacement field (`cField`)
that feeds both the type warp and the liquid sample position, so the whole
composition bends rather than just one layer.

## Performance

- Half-resolution field pass; quarter-resolution wide halo.
- Mip-mapped text texture — blur is a `textureLod` level, not extra passes.
- Render targets reused across frames; no per-frame allocation.
- Thumbnails render at 108 × 108 and restore state in a `finally` block.
- Preview quality selector scales the backing store (0.5×–1.5×) with a 2200 px
  cap.
