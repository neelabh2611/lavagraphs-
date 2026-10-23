#!/usr/bin/env node
/* ---------------------------------------------------------------------------
   Build step: inline every source module into a single portable HTML file.

   Source order matters — the UI bundle is one IIFE, so declarations must exist
   before the code that calls them at load time:
     ui.js          core controls, chrome, render loop
     ui_presets.js  preset registry (P_ / PARTY_PRESETS)
     ui_data.js     variation, undo/redo, persistence
     ui_party.js    trance + party panels, preset browser
     ui_audio.js    audio analysis, spectrum, cursor panels
   These modules only *declare* functions; boot() runs last.
   ------------------------------------------------------------------------- */
const fs = require('fs');
const path = require('path');

const dir = __dirname;
const tplPath = path.join(dir, 'template.html');
const outPath = path.join(dir, 'lava-type.html');

const UI_MODULES = ['ui.js', 'ui_presets.js', 'ui_data.js', 'ui_party.js', 'ui_audio.js'];

let html = fs.readFileSync(tplPath, 'utf8');
const core = fs.readFileSync(path.join(dir, 'core.js'), 'utf8');
const ui = UI_MODULES
  .map(f => '\n/* ==== ' + f + ' ==== */\n' + fs.readFileSync(path.join(dir, f), 'utf8'))
  .join('\n');

if (!html.includes('/*~~CORE~~*/') || !html.includes('/*~~UI~~*/')){
  console.error('markers missing from template');
  process.exit(1);
}

/* The replacement functions are essential: .replace() would otherwise expand
   `$&`, `$1` etc. found inside shader and regex source. */
html = html.replace('/*~~CORE~~*/', () => '\n(function(){\n' + core + '\n})();\n');
html = html.replace('/*~~UI~~*/', () => '\n(function(){\n' + ui + '\n})();\n');

fs.writeFileSync(outPath, html);
console.log('built lava-type.html  ' + (html.length/1024).toFixed(1) + ' KB');
