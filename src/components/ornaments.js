/**
 * SVG Ornaments, Flap scalloped math, Wax seal SVG, Butterfly and Name Logo Lockup
 */

// Scallop path generator for 3D envelope flap
export function round4(n) {
  return Math.round(n * 10000) / 10000;
}

export function generateScallopPath(count = 9, depth = 0.028) {
  let path = "M0 0 L1 0 ";
  const addEdge = (x1, y1, x2, y2) => {
    const dist = Math.hypot(x2 - x1, y2 - y1);
    const nx = -(y2 - y1) / dist;
    const ny = (x2 - x1) / dist;
    for (let i = 0; i < count; i++) {
      const sx = x1 + (x2 - x1) * (i / count);
      const sy = y1 + (y2 - y1) * (i / count);
      const ex = x1 + (x2 - x1) * ((i + 1) / count);
      const ey = y1 + (y2 - y1) * ((i + 1) / count);
      path += `Q${round4((sx + ex) / 2 + nx * depth)} ${round4((sy + ey) / 2 + ny * depth)} ${round4(ex)} ${round4(ey)} `;
    }
  };
  addEdge(1, 0, 0.5, 1);
  addEdge(0.5, 1, 0, 0);
  return path + "Z";
}

export function generateScallopViewbox(count = 9, depth = 0.028) {
  return generateScallopPath(count, depth).replace(/-?\d*\.?\d+/g, (m) =>
    round4(parseFloat(m) * 100)
  );
}

// Scallop frame generator for photos (Couples photo scalloped frame)
export function generatePhotoScallopPath(countX = 8, countY = 10, depth = 0.02) {
  let p = "M0 0 ";
  const edge = (x1, y1, x2, y2, cnt) => {
    const dist = Math.hypot(x2 - x1, y2 - y1);
    const nx = -(y2 - y1) / dist;
    const ny = (x2 - x1) / dist;
    for (let i = 0; i < cnt; i++) {
      const sx = x1 + (x2 - x1) * (i / cnt);
      const sy = y1 + (y2 - y1) * (i / cnt);
      const ex = x1 + (x2 - x1) * ((i + 1) / cnt);
      const ey = y1 + (y2 - y1) * ((i + 1) / cnt);
      p += `Q${round4((sx + ex) / 2 + nx * depth)} ${round4((sy + ey) / 2 + ny * depth)} ${round4(ex)} ${round4(ey)} `;
    }
  };
  edge(0, 0, 1, 0, countX);
  edge(1, 0, 1, 1, countY);
  edge(1, 1, 0, 1, countX);
  edge(0, 1, 0, 0, countY);
  return p + "Z";
}

// Uneven poured wax border generator
export function generatePouredWaxPath(cx, cy, radius, seed = 3) {
  let p = "";
  const steps = 64;
  for (let i = 0; i <= steps; i++) {
    const theta = (i / steps) * Math.PI * 2;
    const wobble =
      radius *
      (1 +
        0.035 * Math.sin(theta * 7 + seed) +
        0.025 * Math.sin(theta * 13 + seed * 2) +
        0.02 * Math.cos(theta * 4 + seed));
    const x = round4(cx + Math.cos(theta) * wobble);
    const y = round4(cy + Math.sin(theta) * wobble);
    p += `${i ? "L" : "M"}${x} ${y} `;
  }
  return p + "Z";
}

// Butterfly SVG
export function createButterflySvg(extraClass = "") {
  return `
<svg class="butterfly ${extraClass}" viewBox="0 0 100 84" aria-hidden="true" fill="none">
  <defs>
    <linearGradient id="bf-grad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#fbefc0"/>
      <stop offset="45%" stop-color="#d9b15a"/>
      <stop offset="100%" stop-color="#9c7124"/>
    </linearGradient>
  </defs>
  <g class="wing-l">
    <g transform="translate(100 0) scale(-1 1)">
      <!-- Wing Shape -->
      <path d="M50 42 C54 26 70 8 92 12 C98 22 96 38 82 48 C72 54 62 50 50 46 C48 56 64 74 76 76 C78 80 66 82 58 76 C48 68 48 54 50 42 Z" fill="url(#bf-grad)" opacity="0.95"/>
      <path d="M54 38 C64 24 76 18 86 22 M56 44 C66 38 78 36 84 42 M54 52 C62 62 68 70 72 74" stroke="#fbefc0" stroke-width="1.1" stroke-linecap="round" opacity="0.6"/>
    </g>
  </g>
  <g class="wing-r">
    <path d="M50 42 C54 26 70 8 92 12 C98 22 96 38 82 48 C72 54 62 50 50 46 C48 56 64 74 76 76 C78 80 66 82 58 76 C48 68 48 54 50 42 Z" fill="url(#bf-grad)" opacity="0.95"/>
    <path d="M54 38 C64 24 76 18 86 22 M56 44 C66 38 78 36 84 42 M54 52 C62 62 68 70 72 74" stroke="#fbefc0" stroke-width="1.1" stroke-linecap="round" opacity="0.6"/>
  </g>
  <!-- Body -->
  <ellipse cx="50" cy="48" rx="2.4" ry="14" fill="url(#bf-grad)"/>
  <path d="M49 35 C46 25 42 18 36 12 M51 35 C54 25 58 18 64 12" fill="none" stroke="url(#bf-grad)" stroke-width="1.3" stroke-linecap="round"/>
  <circle cx="36" cy="12" r="1.6" fill="#fbefc0"/>
  <circle cx="64" cy="12" r="1.6" fill="#fbefc0"/>
</svg>`;
}

// Realistic Wax Seal with Specular Lighting & Press Deboss
export function createWaxSealSvg() {
  const outerWax = generatePouredWaxPath(70, 70, 60, 5);
  const shadowWax = generatePouredWaxPath(70, 72, 60, 5);
  return `
<svg viewBox="0 0 140 140" aria-hidden="true">
  <defs>
    <radialGradient id="wax-fill" cx="38%" cy="32%" r="75%">
      <stop offset="0%" stop-color="#fbefc0"/>
      <stop offset="28%" stop-color="#dfb962"/>
      <stop offset="65%" stop-color="#a47726"/>
      <stop offset="100%" stop-color="#6e4c14"/>
    </radialGradient>
    <filter id="wax-specular" x="-25%" y="-25%" width="150%" height="150%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="2.4" result="blur"/>
      <feSpecularLighting in="blur" surfaceScale="4.5" specularConstant="0.95" specularExponent="24" lighting-color="#fff8e4" result="spec">
        <fePointLight x="24" y="-12" z="85"/>
      </feSpecularLighting>
      <feComposite in="spec" in2="SourceAlpha" operator="in" result="spec2"/>
      <feComposite in="SourceGraphic" in2="spec2" operator="arithmetic" k1="0" k2="1" k3="0.8" k4="0"/>
    </filter>
    <filter id="wax-press" x="-30%" y="-30%" width="160%" height="160%">
      <feOffset dx="-1.2" dy="-1.2" in="SourceAlpha" result="hi"/>
      <feFlood flood-color="#3b2706" flood-opacity="0.8"/>
      <feComposite in2="hi" operator="in" result="dark"/>
      <feOffset dx="1.2" dy="1.4" in="SourceAlpha" result="lo"/>
      <feFlood flood-color="#fff3cf" flood-opacity="0.75"/>
      <feComposite in2="lo" operator="in" result="light"/>
      <feMerge>
        <feMergeNode in="light"/>
        <feMergeNode in="dark"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <!-- Poured drop shadow -->
  <path d="${shadowWax}" fill="#000" opacity="0.38" transform="translate(2 5)" style="filter:blur(3.5px)"/>

  <!-- Poured edge with specular sheen -->
  <g filter="url(#wax-specular)">
    <path d="${outerWax}" fill="url(#wax-fill)"/>
    <circle cx="70" cy="70" r="43" fill="#b98c35"/>
  </g>

  <!-- Inner rings -->
  <circle cx="70" cy="70" r="43" fill="none" stroke="#5e400f" stroke-opacity="0.6" stroke-width="1.5"/>
  <circle cx="70" cy="70" r="38" fill="none" stroke="#fef0cd" stroke-opacity="0.45" stroke-width="0.9" stroke-dasharray="1.8 3"/>

  <!-- Pressed crest inside wax -->
  <g filter="url(#wax-press)" transform="translate(70 70)">
    <g transform="translate(-24 -24) scale(0.35)">
      <!-- Classical Fan Crest Monogram in Wax -->
      <path d="M68 20 C68 48 84 66 112 68 C84 70 68 88 68 116 C68 88 52 70 24 68 C52 66 68 48 68 20 Z" fill="#755018"/>
      <circle cx="68" cy="68" r="8" fill="#e7c97a"/>
      <path d="M68 36 C50 50 50 86 68 100 C86 86 86 50 68 36 Z" fill="none" stroke="#755018" stroke-width="3"/>
    </g>
  </g>
</svg>`;
}

// Ornate Corner SVG (Mirrorable via inner <g>, avoids GSAP flip bugs)
export function createCornerSvg(corner = "tl") {
  const transformMap = {
    tl: "",
    tr: "translate(100 0) scale(-1 1)",
    bl: "translate(0 100) scale(1 -1)",
    br: "translate(100 100) scale(-1 -1)"
  };
  return `
<svg class="kbach-corner kb-${corner}" viewBox="0 0 100 100" aria-hidden="true" fill="none">
  <g transform="${transformMap[corner] || ''}">
    <g class="kb-sway">
      <path class="kb-line" d="M6 6 C40 10 70 12 94 6" stroke="url(#g-foil)" stroke-width="1.8" stroke-linecap="round"/>
      <path class="kb-line" d="M6 6 C10 40 12 70 6 94" stroke="url(#g-foil)" stroke-width="1.8" stroke-linecap="round"/>
      <path class="kb-fill" d="M6 6 C28 18 36 34 24 46 C16 38 18 24 6 6 Z" fill="url(#g-foil)"/>
      <path class="kb-line" d="M18 18 C38 32 46 54 42 76" stroke="url(#g-foil)" stroke-width="1.4" stroke-linecap="round"/>
      <path class="kb-line" d="M18 18 C32 38 54 46 76 42" stroke="url(#g-foil)" stroke-width="1.4" stroke-linecap="round"/>
      <!-- Soft Leaf scrolls -->
      <path class="kb-fill" d="M38 14 C48 8 62 10 68 18 C60 22 48 20 38 14 Z" fill="url(#g-foil)"/>
      <path class="kb-fill" d="M14 38 C8 48 10 62 18 68 C22 60 20 48 14 38 Z" fill="url(#g-foil)"/>
      <circle cx="28" cy="28" r="3" fill="url(#g-foil)"/>
    </g>
  </g>
</svg>`;
}

// Fan-shaped decorative crest
export function createCrestSvg(extraClass = "") {
  return `
<svg class="kbach-crest ${extraClass}" viewBox="0 0 160 90" aria-hidden="true" fill="none">
  <!-- Central fan arch -->
  <g stroke="url(#g-foil)" stroke-linecap="round">
    <path class="kb-line" d="M80 82 C55 82 25 74 12 50 C32 46 58 54 80 70 C102 54 128 46 148 50 C135 74 105 82 80 82 Z" stroke-width="1.6" fill="url(#g-foil)" fill-opacity="0.15"/>
    <path class="kb-line" d="M80 70 C80 35 80 16 80 8" stroke-width="2.2"/>
    <path class="kb-line" d="M80 70 C65 42 48 24 32 16" stroke-width="1.6"/>
    <path class="kb-line" d="M80 70 C95 42 112 24 128 16" stroke-width="1.6"/>
    <path class="kb-line" d="M80 70 C52 52 32 38 18 32" stroke-width="1.4"/>
    <path class="kb-line" d="M80 70 C108 52 128 38 142 32" stroke-width="1.4"/>
    <!-- Crest crown florets -->
    <circle cx="80" cy="8" r="3.5" fill="url(#g-foil)"/>
    <circle cx="32" cy="16" r="2.8" fill="url(#g-foil)"/>
    <circle cx="128" cy="16" r="2.8" fill="url(#g-foil)"/>
    <circle cx="18" cy="32" r="2.2" fill="url(#g-foil)"/>
    <circle cx="142" cy="32" r="2.2" fill="url(#g-foil)"/>
  </g>
</svg>`;
}

// Elegant Divider SVG with central bloom
export function createDividerSvg(extraClass = "") {
  return `
<svg class="kbach-divider ${extraClass}" viewBox="0 0 420 28" aria-hidden="true" fill="none">
  <path class="draw" d="M10 14 H165 M255 14 H410" stroke="url(#g-foil)" stroke-width="1.2" stroke-linecap="round"/>
  <circle cx="80" cy="14" r="2" fill="url(#g-foil)"/>
  <circle cx="340" cy="14" r="2" fill="url(#g-foil)"/>
  <!-- Center Bloom & Scrolls -->
  <g transform="translate(210 14)">
    <path d="M0 -9 C6 -3 10 0 16 0 C10 0 6 3 0 9 C-6 3 -10 0 -16 0 C-10 0 -6 -3 0 -9 Z" fill="url(#g-foil)"/>
    <circle cx="0" cy="0" r="3" fill="#fff6dc"/>
    <path d="M-28 0 C-22 -8 -16 -4 -12 0 M28 0 C22 -8 16 -4 12 0" stroke="url(#g-foil)" stroke-width="1.4" stroke-linecap="round"/>
  </g>
</svg>`;
}

// Couple Name Logo Lockup (ឡូហ្គោឈ្មោះ)
// Groom's short name top-left, Bride's bottom-right in Moulpali gold foil,
// joined by a flourish line, heart and butterfly under a small crest
export function createNameLogoLockup({
  groom = "សុធា",
  bride = "វិច្ឆិកា",
  cls = "",
  crest = true
} = {}) {
  return `
<div class="lockup ${cls}" role="img" aria-label="${groom} & ${bride}">
  <svg class="lk-orn" viewBox="0 0 600 470" aria-hidden="true">
    ${crest ? `<g class="lk-crest" transform="translate(300 55) scale(0.65)">${createCrestSvg()}</g>` : ""}
    <!-- Flourish swash lines -->
    <path class="lk-swash" d="M40 292 C110 318 170 314 206 296 C236 280 238 254 220 250 C202 246 196 272 214 284 C240 302 262 294 272 284"/>
    <path class="lk-swash lk-swash2" d="M318 446 C392 460 476 456 566 438"/>
    <!-- Small heart -->
    <path class="lk-heart" d="M266 316 C259 304 244 308 246 321 C248 332 266 341 266 348 C266 341 284 332 286 321 C288 308 273 304 266 316 Z"/>
  </svg>
  <!-- HTML Khmer Text with extra top/bottom padding to preserve vowel marks & subscripts -->
  <span class="lk-name lk-groom" aria-hidden="true">${groom}</span>
  <span class="lk-name lk-bride" aria-hidden="true">${bride}</span>
  <div class="lk-butterfly" aria-hidden="true">${createButterflySvg("is-resting")}</div>
</div>`;
}

// Ceremony Ritual Icons for Schedule (រូបតំណាងពិធីការ)
export function createCeremonyIconSvg(type) {
  switch (type) {
    case 'parade': // Procession / Hae Chamnoun
      return `<svg viewBox="0 0 48 48" class="ico-rit" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M24 10 C14 10 8 18 8 26 H40 C40 18 34 10 24 10 Z"/><path d="M24 6 V10 M24 26 V38 C24 41 21 42 19 40"/><path d="M14 26 C16 28 20 28 24 26 C28 28 32 28 34 26" stroke-linecap="round"/></svg>`;
    case 'breakfast': // Morning breakfast / tea
      return `<svg viewBox="0 0 48 48" class="ico-rit" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M10 18 H34 V30 C34 35 30 38 22 38 C14 38 10 35 10 30 Z"/><path d="M34 22 H39 C41 22 42 24 41 27 C40 29 38 30 34 30"/><line x1="8" y1="42" x2="36" y2="42" stroke-linecap="round"/><path d="M16 10 Q18 14 16 16 M22 8 Q24 12 22 15 M28 10 Q30 14 28 16" stroke-linecap="round"/></svg>`;
    case 'ring': // Rings exchange
      return `<svg viewBox="0 0 48 48" class="ico-rit" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="18" cy="26" r="11"/><circle cx="30" cy="22" r="11"/><path d="M30 8 L32 11 L35 11 L33 13 L34 16 L30 14 L26 16 L27 13 L25 11 L28 11 Z" fill="currentColor"/></svg>`;
    case 'haircut': // Kat Sak ceremony
      return `<svg viewBox="0 0 48 48" class="ico-rit" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="14" cy="36" r="6"/><circle cx="34" cy="36" r="6"/><path d="M18 32 L36 12 M30 32 L12 12" stroke-linecap="round"/><circle cx="24" cy="22" r="2.5" fill="currentColor"/></svg>`;
    case 'ancestors': // Sen Daun Ta
      return `<svg viewBox="0 0 48 48" class="ico-rit" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 26 H36 V32 C36 36 32 38 24 38 C16 38 12 36 12 32 Z"/><path d="M16 38 L14 42 M32 38 L34 42"/><path d="M20 26 V12 M24 26 V8 M28 26 V12" stroke-linecap="round"/><circle cx="20" cy="10" r="1.5" fill="#ffb85d"/><circle cx="24" cy="6" r="1.5" fill="#ffb85d"/><circle cx="28" cy="10" r="1.5" fill="#ffb85d"/></svg>`;
    case 'blessing': // Sampeah Ptem & Popil
      return `<svg viewBox="0 0 48 48" class="ico-rit" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M16 28 C16 20 32 20 32 28 C32 36 16 36 16 28 Z"/><path d="M24 16 C22 13 22 9 24 6 C26 9 26 13 24 16 Z" fill="#ffb85d" stroke="none"/><path d="M12 26 C8 24 6 28 10 32 M36 26 C40 24 42 28 38 32" stroke-linecap="round"/></svg>`;
    case 'lunch': // Banquet lunch
      return `<svg viewBox="0 0 48 48" class="ico-rit" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M8 32 C8 20 40 20 40 32 Z"/><line x1="6" y1="36" x2="42" y2="36" stroke-linecap="round"/><circle cx="24" cy="18" r="2.5" fill="currentColor"/><path d="M14 36 V40 M34 36 V40"/></svg>`;
    case 'reception': // Grand Dinner reception
    default:
      return `<svg viewBox="0 0 48 48" class="ico-rit" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 12 L20 24 V36 H14 M20 36 H26 M20 24 L28 12 H12 Z"/><path d="M28 16 L34 25 V36 H30 M34 36 H38 M34 25 L40 16 H28 Z"/><line x1="14" y1="36" x2="26" y2="36" stroke-linecap="round"/><line x1="30" y1="36" x2="38" y2="36" stroke-linecap="round"/></svg>`;
  }
}

// Glowing Lotus Lantern for Candlelight Section
export function createLotusLanternSvg() {
  return `
<svg class="lotus-lantern" viewBox="0 0 100 80" aria-hidden="true" fill="none">
  <!-- Lotus Petals (Deep Lotus Pink & Gold) -->
  <g class="petals">
    <path d="M50 38 C35 22 20 28 16 46 C28 54 42 50 50 48 C58 50 72 54 84 46 C80 28 65 22 50 38 Z" fill="#a82354" opacity="0.85"/>
    <path d="M50 48 C28 36 12 50 8 62 C26 70 42 66 50 62 C58 66 74 70 92 62 C88 50 72 36 50 48 Z" fill="#c72c6a" opacity="0.95"/>
    <path d="M50 56 C34 46 22 58 18 68 C32 74 44 70 50 68 C56 70 68 74 82 68 C78 58 66 46 50 56 Z" fill="#e04a88"/>
    <ellipse cx="50" cy="64" rx="20" ry="7" fill="#8f1943"/>
    <ellipse cx="50" cy="63" rx="16" ry="5" fill="#ffd47d"/>
  </g>
  <!-- Glowing Candle Wick and Flame -->
  <g class="lantern-flame">
    <line x1="50" y1="62" x2="50" y2="52" stroke="#4a2800" stroke-width="2"/>
    <path class="flame-halo" d="M50 50 C44 44 43 36 50 24 C57 36 56 44 50 50 Z" fill="#ff9900" opacity="0.8"/>
    <path class="flame-core" d="M50 49 C46 44 46 38 50 30 C54 38 54 44 50 49 Z" fill="#fff7d6"/>
  </g>
</svg>`;
}
