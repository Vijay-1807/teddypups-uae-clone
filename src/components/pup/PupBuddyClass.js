import {
  COLORS,
  PUP_W,
  PUP_H,
  POSES,
  PIVOT_HEAD,
  DEFAULT_MOTION_STATE,
  lerpPose,
  computeTransforms,
} from './pupData';

const DOM_BINDINGS = [
  ['root', 'transform', 'root'],
  ['shadow', 'transform', 'shadow'],
  ['shadow', 'opacity', 'shadowOpacity'],
  ['body', 'transform', 'body'],
  ['body', 'opacity', 'side'],
  ['bf', 'transform', 'bf'],
  ['bf', 'opacity', 'backLegs'],
  ['bn', 'transform', 'bn'],
  ['bn', 'opacity', 'backLegs'],
  ['ff', 'transform', 'ff'],
  ['fn', 'transform', 'fn'],
  ['tail', 'transform', 'tail'],
  ['haunch', 'transform', 'haunch'],
  ['haunch', 'opacity', 'haunchOpacity'],
  ['head', 'transform', 'head'],
  ['earL', 'transform', 'earL'],
  ['earR', 'transform', 'earR'],
  ['eyes', 'transform', 'eyes'],
  ['open', 'opacity', 'openEyes'],
  ['blink', 'transform', 'blink'],
  ['happy', 'opacity', 'happyEyes'],
  ['shut', 'opacity', 'shutEyes'],
  ['tongue', 'opacity', 'tongue'],
  ['mouth', 'opacity', 'mouth'],
  ['ledge', 'opacity', 'ledge'],
];

const damp = (dt, tau) => 1 - Math.exp(-dt / tau);
const clamp = (val, min = -1, max = 1) => Math.max(min, Math.min(max, val));

export class PupBuddy {
  constructor(svg, initialPose = 'sit', facing = 1) {
    this.svg = svg;
    this.els = new Map();
    this.written = new Map();
    this.m = { ...DEFAULT_MOTION_STATE };
    this.strideTarget = 0;
    this.wagTarget = 0.35;
    this.gazeTarget = { x: 0, y: 0 };
    this.tilt = 0;
    this.tiltTarget = 0;
    this.earV = 0;
    this.nextBlink = 1.2;
    this.blinkAt = -1;
    this.woofUntil = 0;
    this.bounce = 0;
    this.bounceV = 0;
    this.offset = 0;
    this.offsetTarget = 0;
    this.pet = 0;
    this.petTarget = 0;
    this.turn = 0.07;
    this.lean = 0;

    svg.querySelectorAll('[data-p]').forEach((el) => {
      this.els.set(el.dataset.p, el);
    });

    const p = typeof initialPose === 'string' ? POSES[initialPose] || POSES.sit : initialPose;
    this.pose = { ...p };
    this.target = this.pose;
    const f = typeof facing === 'string' ? (facing === 'left' ? -1 : 1) : facing;
    this.facing = f;
    this.facingTarget = f;
  }

  setPose(pose) {
    this.target = typeof pose === 'string' ? POSES[pose] || POSES.sit : pose;
  }

  jump(pose, facing) {
    const p = typeof pose === 'string' ? POSES[pose] || POSES.sit : pose;
    this.pose = { ...p };
    this.target = p;
    if (facing) {
      const f = typeof facing === 'string' ? (facing === 'left' ? -1 : 1) : facing;
      this.facing = this.facingTarget = f;
    }
  }

  face(facing, turnSpeed = 0.07) {
    const f = typeof facing === 'string' ? (facing === 'left' ? -1 : 1) : facing;
    this.facingTarget = f;
    this.turn = turnSpeed;
  }

  get facingDir() {
    return this.facingTarget;
  }

  stride(val) {
    this.strideTarget = clamp(val, 0, 1);
  }

  advance(dist) {
    this.m.phase += (dist / 46) * Math.PI;
  }

  walkedTo(dist) {
    this.m.phase = (dist / 46) * Math.PI;
  }

  wag(val) {
    this.wagTarget = clamp(val, 0, 1);
  }

  cock(tiltDeg) {
    this.tiltTarget = tiltDeg;
  }

  lookAt(point) {
    if (!point) {
      this.gazeTarget = { x: 0, y: 0 };
      return;
    }
    const rect = this.svg.getBoundingClientRect();
    const pivotX = this.facingTarget > 0 ? PIVOT_HEAD[0] : PUP_W - PIVOT_HEAD[0];
    const screenPivotX = rect.left + (pivotX / PUP_W) * rect.width;
    const screenPivotY = rect.top + (COLORS.eyesY / PUP_H) * rect.height;
    const dx = point.x - screenPivotX;
    const dy = point.y - screenPivotY;
    const dist = Math.hypot(dx, dy) || 1;
    const norm = Math.min(1, dist / 160);
    this.gazeTarget = {
      x: (dx / dist) * norm * this.facingTarget,
      y: (dy / dist) * norm,
    };
  }

  woof(time) {
    this.woofUntil = time + 0.34;
    this.bounceV = -150;
    this.earV += 260;
  }

  jolt(scale = 1) {
    this.earV += 220 * scale;
  }

  hop(scale = 1) {
    this.bounceV = -230 * scale;
    this.earV += 200 * scale;
  }

  yawn(time, duration = 0.9) {
    this.woofUntil = time + duration;
  }

  dash(offset) {
    this.offsetTarget = offset;
  }

  petting(isPetting) {
    this.petTarget = +!!isPetting;
  }

  reset() {
    this.offsetTarget = 0;
    this.tiltTarget = 0;
    this.petTarget = 0;
  }

  tick(dt, time) {
    dt = Math.min(dt, 0.05);
    const m = this.m;
    m.time = time;

    this.pose = lerpPose(this.pose, this.target, damp(dt, 0.16));
    this.facing += (this.facingTarget - this.facing) * damp(dt, this.turn);

    m.stride += (this.strideTarget - m.stride) * damp(dt, 0.12);
    if (m.stride < 0.012 && this.strideTarget === 0) m.stride = 0;

    m.wag += (this.wagTarget - m.wag) * damp(dt, 0.4);
    m.gazeX += (this.gazeTarget.x - m.gazeX) * damp(dt, 0.07);
    m.gazeY += (this.gazeTarget.y - m.gazeY) * damp(dt, 0.07);

    this.tilt += (this.tiltTarget + 3 * m.gazeX - this.tilt) * damp(dt, 0.18);
    this.earV += (-150 * m.ear - 10 * this.earV) * dt;
    m.ear = clamp(m.ear + this.earV * dt, -28, 28);

    this.bounceV += (-260 * this.bounce - 16 * this.bounceV) * dt;
    this.bounce += this.bounceV * dt;

    const prevOffset = this.offset;
    this.offset += (this.offsetTarget - this.offset) * damp(dt, 0.2);
    if (Math.abs(this.offsetTarget - this.offset) < 0.05) {
      this.offset = this.offsetTarget;
    }
    const deltaOffset = Math.abs(this.offset - prevOffset);
    if (deltaOffset) this.advance(deltaOffset);
    const strideFromOffset = dt > 0 ? Math.min(1, deltaOffset / dt / 180) : 0;

    this.pet += (this.petTarget - this.pet) * damp(dt, 0.15);

    if (time > this.nextBlink && this.pose.eyes > 0.6) {
      this.blinkAt = time;
      this.nextBlink = time + 2.2 + 3.8 * Math.random();
      if (Math.random() < 0.18) this.nextBlink = time + 0.32;
    }
    const blinkPhase = (time - this.blinkAt) / 0.15;
    m.blink = blinkPhase >= 0 && blinkPhase <= 1 ? Math.sin(blinkPhase * Math.PI) : 0;

    const combinedPose = {
      ...this.pose,
      headRot: this.pose.headRot + this.tilt,
      bodyRot: this.pose.bodyRot + this.lean,
      bodyY: this.pose.bodyY + this.bounce,
      headY: this.pose.headY + 1.15 * this.bounce,
      mouth: time < this.woofUntil ? 1 : this.pose.mouth,
      happy: Math.max(this.pose.happy, this.pet),
    };

    const transforms = computeTransforms(
      combinedPose,
      strideFromOffset > m.stride ? { ...m, stride: strideFromOffset } : m
    );

    const safeFacing =
      Math.abs(this.facing) < 0.02 ? 0.02 * Math.sign(this.facing || 1) : this.facing;

    const rootTransform = `translate(${this.offset.toFixed(1)} 0) translate(${PUP_W / 2} 0) scale(${safeFacing.toFixed(
      3
    )} 1) translate(${-PUP_W / 2} 0)`;

    for (const [part, attr, key] of DOM_BINDINGS) {
      const el = this.els.get(part);
      if (!el) continue;
      const val = key === 'root' ? rootTransform : String(transforms[key]);
      const cacheKey = `${part}:${attr}`;
      if (this.written.get(cacheKey) !== val) {
        el.setAttribute(attr, val);
        this.written.set(cacheKey, val);
      }
    }
  }
}
