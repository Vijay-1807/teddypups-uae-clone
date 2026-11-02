import React from 'react';
import {
  COLORS,
  PUP_W,
  PUP_H,
  SHAPES,
  LEGS,
  TOE_CUTS,
  PIVOT_BODY,
  POSES,
  computeTransforms,
  DEFAULT_MOTION_STATE,
} from './pupData';

const STROKE_COMMON = {
  stroke: COLORS.ink,
  strokeWidth: 3.4,
  strokeLinejoin: 'round',
  strokeLinecap: 'round',
};

const STROKE_NONE_FILL = {
  ...STROKE_COMMON,
  fill: 'none',
};

function LegPart({ part, d, len, fill, transform, opacity }) {
  return (
    <g data-p={part} transform={transform} opacity={opacity}>
      <path d={`${d}Z`} fill={fill} />
      <path d={d} {...STROKE_NONE_FILL} />
      <path d={TOE_CUTS(len)} {...STROKE_NONE_FILL} strokeWidth={2.4} />
    </g>
  );
}

function PupilEyes() {
  return (
    <>
      <ellipse cx={194} cy={COLORS.eyesY} rx={7.4} ry={8.6} fill={COLORS.ink} />
      <ellipse cx={230} cy={COLORS.eyesY} rx={7.4} ry={8.6} fill={COLORS.ink} />
      <circle cx={196.6} cy={COLORS.eyesY - 3.4} r={2.7} fill="#fff" />
      <circle cx={232.6} cy={COLORS.eyesY - 3.4} r={2.7} fill="#fff" />
      <circle cx={192} cy={COLORS.eyesY + 3.2} r={1.2} fill="#fff" />
      <circle cx={228} cy={COLORS.eyesY + 3.2} r={1.2} fill="#fff" />
    </>
  );
}

export default function PupBuddySVG({
  pose = 'sit',
  facing = 'right',
  className = '',
  label,
  style,
  asStop = false,
}) {
  const p = typeof pose === 'string' ? POSES[pose] || POSES.sit : pose;
  const f = computeTransforms(p, DEFAULT_MOTION_STATE);
  const rootTransform = facing === 'left' || facing === -1 ? `translate(${PUP_W} 0) scale(-1 1)` : undefined;

  return (
    <svg
      viewBox={`0 0 ${PUP_W} ${PUP_H}`}
      className={className}
      style={{ overflow: 'visible', ...style }}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={!label || undefined}
      focusable="false"
    >
      <g data-p="root" transform={rootTransform}>
        <ellipse
          data-p="shadow"
          cx={SHAPES.shadow.cx}
          cy={SHAPES.shadow.cy}
          rx={SHAPES.shadow.rx}
          ry={SHAPES.shadow.ry}
          fill={COLORS.ink}
          opacity={f.shadowOpacity}
          transform={f.shadow}
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        />
        <g data-p="body" transform={f.body} opacity={f.side}>
          <LegPart
            part="bf"
            d={LEGS.backFar}
            len={COLORS.groundY - 192}
            fill={COLORS.furDark}
            transform={f.bf}
            opacity={f.backLegs}
          />
          <LegPart
            part="ff"
            d={LEGS.frontFar}
            len={COLORS.groundY - 192}
            fill={COLORS.furDark}
            transform={f.ff}
          />
          <g data-p="tail" transform={f.tail}>
            <path d={SHAPES.tailStem} {...STROKE_NONE_FILL} strokeWidth={9} />
            <path
              d={SHAPES.tailStem}
              stroke={COLORS.furPrimary}
              strokeWidth={4}
              fill="none"
              strokeLinecap="round"
            />
            <path d={SHAPES.tail} fill={COLORS.furPrimary} {...STROKE_COMMON} />
          </g>
          <LegPart
            part="bn"
            d={LEGS.back}
            len={COLORS.groundY - 194}
            fill={COLORS.furPrimary}
            transform={f.bn}
            opacity={f.backLegs}
          />
          <path d={SHAPES.body} fill={COLORS.furPrimary} {...STROKE_COMMON} />
          <path d={SHAPES.chest} fill={COLORS.furPrimary} {...STROKE_COMMON} />
          <LegPart
            part="fn"
            d={LEGS.front}
            len={COLORS.groundY - 194}
            fill={COLORS.furPrimary}
            transform={f.fn}
          />
        </g>
        <g data-p="haunch" opacity={f.haunchOpacity} transform={f.haunch}>
          <path d={SHAPES.haunch} fill={COLORS.furPrimary} {...STROKE_COMMON} />
          <path d={SHAPES.haunchPaw} fill={COLORS.furPrimary} {...STROKE_COMMON} />
          <path d="M132 222v5M139 222v5" {...STROKE_NONE_FILL} strokeWidth={2.4} />
        </g>
        <g data-p="head" transform={f.head}>
          <path d={SHAPES.collar} fill={COLORS.collar} {...STROKE_COMMON} strokeWidth={3} />
          <path d={SHAPES.tag} fill={COLORS.furLight} {...STROKE_COMMON} strokeWidth={2.4} />
          <path
            data-p="earL"
            d={SHAPES.earL}
            fill={COLORS.furDark}
            {...STROKE_COMMON}
            transform={f.earL}
          />
          <path
            data-p="earR"
            d={SHAPES.earR}
            fill={COLORS.furDark}
            {...STROKE_COMMON}
            transform={f.earR}
          />
          <path d={SHAPES.head} fill={COLORS.furPrimary} {...STROKE_COMMON} />
          <path d={SHAPES.topknot} fill={COLORS.furPrimary} {...STROKE_COMMON} strokeWidth={3} />
          <path d={SHAPES.muzzle} fill={COLORS.furLight} />
          <circle cx={181} cy={116} r={7} fill={COLORS.blush} opacity={0.85} />
          <circle cx={243} cy={116} r={7} fill={COLORS.blush} opacity={0.85} />
          <g data-p="eyes" transform={f.eyes}>
            <g data-p="open" opacity={f.openEyes}>
              <g data-p="blink" transform={f.blink}>
                <PupilEyes />
              </g>
            </g>
          </g>
          <path
            data-p="happy"
            d="M186.5 101 Q194 91.5 201.5 101 M222.5 101 Q230 91.5 237.5 101"
            {...STROKE_NONE_FILL}
            opacity={f.happyEyes}
          />
          <path
            data-p="shut"
            d="M186.5 97 Q194 103.5 201.5 97 M222.5 97 Q230 103.5 237.5 97"
            {...STROKE_NONE_FILL}
            opacity={f.shutEyes}
          />
          <path d={SHAPES.nose} fill={COLORS.ink} />
          <path d={SHAPES.mouth} {...STROKE_NONE_FILL} strokeWidth={3} />
          <path
            data-p="tongue"
            d={SHAPES.tongue}
            fill="#e98c8c"
            stroke={COLORS.ink}
            strokeWidth={2.2}
            strokeLinejoin="round"
            opacity={f.tongue}
          />
          <g data-p="mouth" opacity={f.mouth}>
            <path d={SHAPES.mouthOpen} fill="#6b2a1c" {...STROKE_COMMON} strokeWidth={2.6} />
            <path
              d="M206.5 133.5 Q212 130 217.5 133.5 Q215 138 212 138 Q209 138 206.5 133.5 Z"
              fill="#e98c8c"
            />
          </g>
        </g>
        <g data-p="ledge" opacity={f.ledge}>
          <path d={SHAPES.ledgePaws} fill={COLORS.furPrimary} {...STROKE_COMMON} />
          <path d={SHAPES.ledgeToes} {...STROKE_NONE_FILL} strokeWidth={2.4} />
        </g>
      </g>
    </svg>
  );
}

