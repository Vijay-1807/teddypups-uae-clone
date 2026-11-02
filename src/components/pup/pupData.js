// Pup buddy constants, SVG paths, poses and transform calculators
// Reverse-engineered directly from original Next.js turbopack bundles

function generatePoly(cx, cy, rx, ry, points, round, rotOffset = -Math.PI / 2, tiltDeg = 0) {
  const rad = (tiltDeg * Math.PI) / 180;
  const pt = (angle, offset) => {
    const x = Math.cos(angle) * (rx + offset);
    const y = Math.sin(angle) * (ry + (ry / rx) * offset);
    return `${(cx + x * Math.cos(rad) - y * Math.sin(rad)).toFixed(1)} ${(
      cy +
      x * Math.sin(rad) +
      y * Math.cos(rad)
    ).toFixed(1)}`;
  };
  let d = '';
  for (let i = 0; i < points; i++) {
    const a1 = rotOffset + (i / points) * Math.PI * 2;
    const a2 = rotOffset + ((i + 1) / points) * Math.PI * 2;
    const mid = (a1 + a2) / 2;
    d += `${i === 0 ? `M${pt(a1, 0)}` : ''}Q${pt(mid, 2.1 * round)} ${pt(a2, 0)}`;
  }
  return `${d}Z`;
}

export const PIVOT_BODY = [196, 206];
export const PIVOT_HEAD = [212, 100];
export const PIVOT_SHOULDER_NEAR = [186, 194];
export const PIVOT_SHOULDER_FAR = [168, 192];
export const PIVOT_HIP_NEAR = [110, 194];
export const PIVOT_HIP_FAR = [94, 192];
export const PIVOT_TAIL = [84, 150];
export const PIVOT_EAR_L = [174, 82];
export const PIVOT_EAR_R = [250, 82];

export const COLORS = {
  blush: '#f9b9a6',
  collar: '#a24a1a',
  eyesY: 98,
  furPrimary: '#f2be6b',
  furLight: '#fbe3b4',
  furDark: '#e4a352',
  groundY: 228,
  ink: '#2a170e',
};

export const PUP_W = 300;
export const PUP_H = 240;

export const SHAPES = {
  body: generatePoly(140, 170, 64, 36, 15, 3.4, 0.95 * Math.PI),
  chest: generatePoly(192, 166, 30, 32, 9, 3.2, 0.6 * Math.PI),
  tail: generatePoly(70, 126, 17, 16, 9, 3.2),
  tailStem: 'M86 152 C80 146 76 140 74 136',
  haunch: generatePoly(110, 204, 30, 24, 10, 3.2, Math.PI),
  haunchPaw:
    'M112 214 C126 212 142 214 146 221 C148 226 144 229 136 229 L116 229 C108 229 104 224 106 219 Z',
  head: generatePoly(212, 100, 51, 46, 16, 3.6),
  topknot: generatePoly(212, 52, 17, 12, 8, 2.9, Math.PI),
  earL: generatePoly(170, 112, 19, 34, 10, 3.2, -Math.PI / 2, 12),
  earR: generatePoly(254, 112, 19, 34, 10, 3.2, -Math.PI / 2, -12),
  muzzle:
    'M188 120 C188 106 200 100 212 100 C224 100 236 106 236 120 C236 133 225 140 212 140 C199 140 188 133 188 120 Z',
  nose: 'M204.5 111.5 Q212 107.2 219.5 111.5 Q218.2 118.4 212 120 Q205.8 118.4 204.5 111.5 Z',
  mouth:
    'M212 120 V124.5 M212 124.5 Q207.2 129.6 202.8 125.2 M212 124.5 Q216.8 129.6 221.2 125.2',
  mouthOpen: 'M203 126 Q212 122 221 126 Q219 138 212 139 Q205 138 203 126 Z',
  tongue: 'M207.6 127.4 Q212 136.6 216.4 127.4 Z',
  collar: 'M178 146 Q212 162 246 146 L246 154 Q212 170 178 154 Z',
  tag: 'M212 160 C212 156 206 155 206 159.4 C206 163 212 166.6 212 168.4 C212 166.6 218 163 218 159.4 C218 155 212 156 212 160 Z',
  ledgePaws:
    'M175 159 C175 148 181 142 190 142 C199 142 205 148 205 159 Z M219 159 C219 148 225 142 234 142 C243 142 249 148 249 159 Z',
  ledgeToes: 'M186 153 v-4.5 M194 153 v-4.5 M230 153 v-4.5 M238 153 v-4.5',
  shadow: { cx: 150, cy: 230, rx: 92, ry: 7 },
};

function makeLegPath(width, height) {
  const half = width / 2;
  return `M${-half} -14 C${-half} 4 -12 ${height - 18} -12 ${height - 9} C-12 ${
    height - 2
  } -7 ${height} 0 ${height} C9 ${height} 13 ${height - 3} 13 ${height - 9} C13 ${
    height - 18
  } ${half} 4 ${half} -14`;
}

export const LEGS = {
  front: makeLegPath(24, 228 - PIVOT_SHOULDER_NEAR[1]),
  frontFar: makeLegPath(22, 228 - PIVOT_SHOULDER_FAR[1]),
  back: makeLegPath(30, 228 - PIVOT_HIP_NEAR[1]),
  backFar: makeLegPath(28, 228 - PIVOT_HIP_FAR[1]),
};

export const TOE_CUTS = (len) => `M-3.5 ${len - 7} v5 M4.5 ${len - 7} v5`;

const BASE_POSE = {
  bodyRot: 0,
  bodyX: 0,
  bodyY: 0,
  stretch: 1,
  headX: 0,
  headY: 0,
  headRot: 0,
  earL: 0,
  earR: 0,
  tail: 0,
  fn: 0,
  ff: 0,
  bn: 0,
  bf: 0,
  sit: 0,
  eyes: 1,
  happy: 0,
  tongue: 0,
  mouth: 0,
  front: 0,
};

export const POSES = {
  stand: BASE_POSE,
  walk: { ...BASE_POSE, tail: -6, tongue: 1 },
  sit: { ...BASE_POSE, bodyRot: -24, bodyY: -2, headX: -10, headY: -6, tail: 34, sit: 1, tongue: 1 },
  peek: { ...BASE_POSE, headY: 4, earL: -6, earR: 6, tail: -20, front: 1, tongue: 1 },
  snug: { ...BASE_POSE, headY: 9, headRot: 4, earL: 3, earR: -3, tail: -20, front: 1, tongue: 0 },
  lie: { ...BASE_POSE, bodyRot: -5, bodyY: 22, headX: 12, headY: 40, headRot: 3, fn: -84, ff: -80, sit: 1, tail: 58, tongue: 0 },
  sleep: { ...BASE_POSE, bodyRot: -5, bodyY: 22, headX: 14, headY: 44, headRot: -8, fn: -84, ff: -80, sit: 1, tail: 64, eyes: 0, earL: 4, earR: -4 },
  settle: { ...BASE_POSE, bodyRot: -5, bodyY: 22, headX: 10, headY: 16, fn: -84, ff: -80, sit: 1, tail: 40, tongue: 1 },
  hop: { ...BASE_POSE, bodyRot: -9, stretch: 1.06, headY: -6, fn: -42, ff: -32, bn: 40, bf: 30, earL: -26, earR: 26, tail: -24, tongue: 1 },
  sniff: { ...BASE_POSE, bodyRot: 7, headX: 16, headY: 32, headRot: 9, tail: -14, fn: 6, ff: 4 },
  bow: { ...BASE_POSE, bodyRot: 15, bodyY: 2, headX: 14, headY: 30, fn: -58, ff: -52, tail: -32, happy: 1, tongue: 1 },
  beg: { ...BASE_POSE, bodyRot: -36, bodyY: -6, headX: -18, headY: -18, sit: 1, fn: -70, ff: -64, tail: 30, happy: 1, tongue: 1 },
};

export const POSE_KEYS = Object.keys(BASE_POSE);

export const DEFAULT_MOTION_STATE = {
  phase: 0,
  stride: 0,
  time: 0,
  wag: 0,
  gazeX: 0,
  gazeY: 0,
  blink: 0,
  ear: 0,
};

const round2 = (num) => Math.round(100 * num) / 100;
const rotStr = (deg, [px, py]) => `rotate(${round2(deg)} ${px} ${py})`;

export function lerpPose(p1, p2, alpha) {
  const res = { ...p1 };
  for (const k of POSE_KEYS) {
    res[k] = p1[k] + (p2[k] - p1[k]) * alpha;
  }
  return res;
}

export function computeTransforms(pose, m = DEFAULT_MOTION_STATE) {
  const sinPhase = Math.sin(m.phase);
  const sinPhasePi = Math.sin(m.phase + Math.PI);
  const strideSwing = 20 + 10 * m.stride;
  const bobFactor = (1 - Math.cos(2 * m.phase)) / 2;
  const isWalking = +(m.stride > 0.01);
  const breath = Math.sin(2.4 * m.time) * (1 - isWalking);

  const bodyY = pose.bodyY - bobFactor * (2.5 + 4 * m.stride) * isWalking + 0.6 * breath;
  const bodyRot = pose.bodyRot + 1.6 * Math.sin(m.phase) * isWalking;
  const negBodyRot = -pose.bodyRot;

  const wagAmp = 5 + 17 * m.wag;
  const wagSpeed = 1.2 + 2.6 * m.wag;
  const tailRot = pose.tail + Math.sin(m.time * wagSpeed * Math.PI * 2) * wagAmp;

  const headBob = -((1 - Math.cos(2 * m.phase - 0.7)) / 2) * (2 + 3 * m.stride) * isWalking + 0.9 * breath;

  return {
    body: `translate(${round2(pose.bodyX)} ${round2(bodyY)}) ${rotStr(
      bodyRot,
      PIVOT_BODY
    )} translate(${PIVOT_BODY[0]} 0) scale(${round2(pose.stretch)} 1) translate(${-PIVOT_BODY[0]} 0)`,
    fn: `translate(${PIVOT_SHOULDER_NEAR[0]} ${PIVOT_SHOULDER_NEAR[1]}) rotate(${round2(
      pose.fn + negBodyRot + sinPhase * strideSwing * isWalking
    )})`,
    ff: `translate(${PIVOT_SHOULDER_FAR[0]} ${PIVOT_SHOULDER_FAR[1]}) rotate(${round2(
      pose.ff + negBodyRot + sinPhasePi * strideSwing * isWalking
    )})`,
    bn: `translate(${PIVOT_HIP_NEAR[0]} ${PIVOT_HIP_NEAR[1]}) rotate(${round2(
      pose.bn + sinPhasePi * strideSwing * isWalking
    )})`,
    bf: `translate(${PIVOT_HIP_FAR[0]} ${PIVOT_HIP_FAR[1]}) rotate(${round2(
      pose.bf + sinPhase * strideSwing * isWalking
    )})`,
    tail: rotStr(tailRot, PIVOT_TAIL),
    haunch: `translate(0 ${round2(-0.06 * pose.bodyRot)})`,
    head: `translate(${round2(pose.headX)} ${round2(pose.headY + headBob)}) ${rotStr(
      pose.headRot + 1.4 * Math.sin(m.phase) * isWalking,
      PIVOT_HEAD
    )}`,
    earL: rotStr(pose.earL + m.ear + 4 * Math.sin(2 * m.phase) * isWalking, PIVOT_EAR_L),
    earR: rotStr(pose.earR - m.ear - 4 * Math.sin(2 * m.phase) * isWalking, PIVOT_EAR_R),
    eyes: `translate(${round2(3.4 * m.gazeX)} ${round2(2.6 * m.gazeY)})`,
    blink: `translate(0 ${round2(98 * m.blink * 0.92)}) scale(1 ${round2(1 - 0.92 * m.blink)})`,
    openEyes: round2(Math.max(0, pose.eyes - pose.happy)),
    happyEyes: round2(Math.min(pose.happy, pose.eyes)),
    shutEyes: round2(1 - pose.eyes),
    tongue: round2(pose.tongue * (1 - pose.mouth)),
    mouth: round2(pose.mouth),
    backLegs: round2(1 - pose.sit),
    haunchOpacity: round2(pose.sit * (1 - pose.front)),
    side: round2(1 - pose.front),
    ledge: round2(pose.front),
    shadow: `translate(${round2(0.6 * pose.bodyX)} 0) scale(${round2(1 - 0.05 * bobFactor * isWalking)} 1)`,
    shadowOpacity: round2(0.12 * (1 - pose.front)),
  };
}

// Paw print path
function makePawOval(cx, cy, rx, ry, deg) {
  const rad = (deg * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  const pt = (x, y) => `${(cx + x * cos - y * sin).toFixed(2)} ${(cy + x * sin + y * cos).toFixed(2)}`;
  return `M${pt(rx, 0)}C${pt(rx, 0.5523 * ry)} ${pt(0.5523 * rx, ry)} ${pt(0, ry)}C${pt(
    -(0.5523 * rx),
    ry
  )} ${pt(-rx, 0.5523 * ry)} ${pt(-rx, 0)}C${pt(-rx, -(0.5523 * ry))} ${pt(
    -(0.5523 * rx),
    -ry
  )} ${pt(0, -ry)}C${pt(0.5523 * rx, -ry)} ${pt(rx, -(0.5523 * ry))} ${pt(rx, 0)}Z`;
}

export const PAW_PRINT_PATH =
  'M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5z' +
  makePawOval(14.6, 29.2, 5.3, 6.9, -28) +
  makePawOval(24.2, 16.6, 5.5, 7.3, -10) +
  makePawOval(39.8, 16.6, 5.5, 7.3, 10) +
  makePawOval(49.4, 29.2, 5.3, 6.9, 28);

