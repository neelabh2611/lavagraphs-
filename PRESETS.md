# Preset gallery

Thirty presets, five groups. Every entry configures real parameters across
typography, liquid, geometry, motion, colour and post-processing — they are not
names attached to a shared effect.

Thumbnails in the app are produced by `Renderer.renderThumb()`, which runs the
actual pipeline at 108 × 108 and reads the pixels back.

---

## Hardcore / techno

| Preset | Identity |
|---|---|
| **GABBER OVERDRIVE** | Monochrome type, red impact bursts, 180 BPM manual clock, near-zero saturation with a hard contrast push. |
| **INDUSTRIAL MACHINE** | Steel wireframe grid, 16 cathedral rings, mechanical slow rotation, cold desaturated palette, heavy grain. |
| **ACID PRESSURE** | Acid-green liquid with wave interference driving the squelch, high liquidity, hue modulation from `colorCycle`. |
| **DARK WAREHOUSE** | Almost black. Three small, very soft blobs, 0.75 vignette, slow 20 s loop, sparse white accents. |
| **HARDSTYLE IMPACT** | Beat-synced zoom punches (lens pinch), 1.5 radial bursts, huge type with extrusion and neon outline. |
| **NOISE RITUAL** | Fragmented type, 0.72 feedback, 0.6 grain, 0.28 posterisation — dense and chaotic but coherent. |
| **REDLINE 200 BPM** | 200 BPM, 4 s loop, maximum beat response, aggressive deformation and 14 sweeping beams. |
| **BLACKOUT** | Three tiny blobs, 0.9 vignette, extreme negative space, clean type mode, sharp white accents. |

## Psychedelic / liquid

| Preset | Identity |
|---|---|
| **MOLTEN DIMENSION** | Interconnected liquid bodies at maximum liquidity, recursive tunnel warp, pink-white highlights. |
| **LIQUID GRAVITY** | Cursor-driven: gravity well and liquid push are on by default, so the composition responds to the pointer. |
| **CHROME FEVER** | Near-zero saturation with a 1.5 contrast push reads as metal; heavy extrusion gives the chrome body. |
| **INFINITE MELTDOWN** | 0.78 tunnel plus 0.7 feedback plus a 6-segment kaleidoscope — recursive and self-similar. |
| **ACID GARDEN** | Fractal fill at 0.72 with topographic contours at 0.95, acid-green into magenta, organic branching. |
| **PORTAL COLLAPSE** | Centred 0.9 tunnel with lens pinch and radial bursts; everything converges on the vanishing point. |

## Neon / cyber

| Preset | Identity |
|---|---|
| **CYBERPUNK SIGNAL** | Cyan/magenta, RGB split at 1.2, 1.15 wireframe grid, glitch type, scanlines and posterisation. |
| **LASER CATHEDRAL** | Six wide beams, ten rings, 12-segment symmetry, monumental type with extrusion and outline. |
| **NEON SUPERNOVA** | 1.6 bursts, 9 expanding rings, bright halation, particle trails — an explosion held in slow motion. |
| **DIGITAL AFTERLIFE** | 0.9 feedback with negative zoom, 0.92 trail, heavy scanlines — analogue decay of a digital signal. |

## Disco / colour

| Preset | Identity |
|---|---|
| **PRISM RIOT** | 6-segment kaleidoscope with fast axis rotation, 1.0 chroma split, aggressive `colorCycle` palette cycling. |
| **DISCO COLLISION** | Twelve rotating rings, 0.95 geometry, feedback rotation at 0.22, mirrored light trails. |
| **ULTRAVIOLET FEVER** | Deep violet into hot pink, 0.8 halation, recursive tunnel, smooth and slow. |
| **COLOR CANNON** | Audio-driven palette changes, 1.7 bursts, 20 beams, everything pinned to the beat. |

## Classic

The original set from the first build: **GOA MELTDOWN**, **LIQUID CHROME**,
**NEON CATASTROPHE**, **CYBER PSYCHOSIS**, **INFINITE RAVE**,
**CHROME EXPLOSION**, **ANALOG AFTERLIFE**, **SYNESTHESIA**.

---

## Variation generator

`GENERATE VARIATION` mutates the current composition while honouring six
per-category locks:

- **TEXT & LAYOUT** — position, scale, rotation, leading, tracking
- **PALETTE** — the five colour slots plus hue shift
- **SEED** — the deterministic random seed
- **GEOMETRY** — kaleidoscope, tunnel, fractal, lasers, rings, grid, bursts
- **TYPOGRAPHY** — behaviour, elasticity, fragmentation, extrusion, outline
- **MOTION** — speed, loop, liquidity, distortion, feedback, chroma, BPM

`GENERATE SOMETHING INSANE` picks a random preset as a base, pushes a dozen
parameters into extreme ranges, and still respects every lock. It never
produces a configuration outside safe rendering limits — all values are clamped
at the shader-uniform boundary.
