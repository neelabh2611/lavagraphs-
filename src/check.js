#!/usr/bin/env node
/* ---------------------------------------------------------------------------
   Static sanity checks for the GLSL. WebGL gives no compile feedback until the
   page runs, so these catch the two mistakes that have actually broken builds:
   same-scope duplicate declarations and use-before-declaration.
   Run: node src/check.js
   ------------------------------------------------------------------------- */
const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'core.js'), 'utf8');
const SHADERS = ['FS_FIELD', 'FS_BLUR', 'FS_COPY', 'FS_COMP', 'FS_GEOM', 'FS_POST'];
const TYPE = '(?:vec2|vec3|vec4|float|int|bool|mat2|mat3|mat4)';
let problems = 0;

for (const name of SHADERS){
  const i = src.indexOf('const ' + name);
  if (i < 0){ console.log(`  ${name}: not found`); problems++; continue; }
  const j = src.indexOf('`;', i);
  const body = src.slice(i, j);
  const mainAt = body.indexOf('void main');
  if (mainAt < 0){ console.log(`  ${name}: no main()`); problems++; continue; }
  /* strip comments — prose in a comment is not an identifier use */
  let main = body.slice(mainAt)
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/[^\n]*/g, '');

  /* --- 1. duplicate declarations in the same block scope --- */
  let depth = 0;
  const seen = Object.create(null);
  const dups = new Set();
  for (const line of main.split('\n')){
    const delta = (line.match(/\{/g)||[]).length - (line.match(/\}/g)||[]).length;
    if (depth === 1){
      const m = line.match(new RegExp('^\\s*(?:const\\s+)?' + TYPE + '\\s+([A-Za-z_]\\w*)'));
      if (m){
        if (seen[m[1]] !== undefined) dups.add(m[1]);
        seen[m[1]] = 1;
      }
    }
    depth += delta;
  }

  /* --- 2. use before declaration --- */
  const declPos = Object.create(null);
  const lines = main.split('\n');
  lines.forEach((line, n) => {
    const m = line.match(new RegExp('^\\s*(?:const\\s+)?' + TYPE + '\\s+([A-Za-z_]\\w*)'));
    if (m && declPos[m[1]] === undefined) declPos[m[1]] = n;
  });
  const early = new Set();
  lines.forEach((line, n) => {
    /* only look at lines that actually READ an identifier: strip the
       declaration head, string-ish content and numeric literals first */
    let stripped = line.replace(new RegExp('^\\s*(?:const\\s+)?' + TYPE + '\\s+[A-Za-z_]\\w*'), '');
    /* a bare use inside a call argument or expression only counts when the
       identifier appears as a standalone token followed by a non-word char */
    for (const id of Object.keys(declPos)){
      if (declPos[id] <= n) continue;
      if (new RegExp('(^|[^A-Za-z0-9_.])' + id + '\\s*(?=[,;)\\]}.+\\-*/]|$)').test(stripped)) early.add(id);
    }
  });

  const bad = [...dups, ...early];
  if (bad.length){
    problems++;
    if (dups.size)  console.log(`  ${name}: duplicate declaration -> ${[...dups].join(', ')}`);
    if (early.size) console.log(`  ${name}: used before declaration -> ${[...early].join(', ')}`);
  } else {
    console.log(`  ${name}: ok`);
  }
}

console.log(problems ? `\n${problems} shader problem(s)` : '\nall shaders passed');
process.exit(problems ? 1 : 0);
