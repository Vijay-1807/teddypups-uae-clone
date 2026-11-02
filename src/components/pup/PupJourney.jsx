import React, { useEffect, useRef } from 'react';
import PupBuddySVG from './PupBuddySVG';
import { PupBuddy } from './PupBuddyClass';
import { POSES, PUP_W, PAW_PRINT_PATH } from './pupData';
import { TRICK_ROUTINES, getNextTrick, spawnHearts } from './pupTricks';

const ANCHOR = { x: 150, y: 228 };
const DEFAULT_BOX = [48, 30, 288, 236];
const clamp01 = (v) => Math.min(1, Math.max(0, v));
const smoothstep = (v) => v * v * (3 - 2 * v);
const smoothRange = (min, max, v) => (max === min ? +(v >= max) : smoothstep(clamp01((v - min) / (max - min))));
const lerp = (a, b, t) => a + (b - a) * t;

function getStopPoint(stop, scrollY) {
  const track = stop.track;
  let trackY;
  if (track.kind === 'page') {
    trackY = track.top - scrollY;
  } else if (track.kind === 'screen') {
    trackY = track.top;
  } else {
    // pin
    if (scrollY < track.from) {
      trackY = track.top - (scrollY - track.from);
    } else if (scrollY > track.to) {
      trackY = track.top - (scrollY - track.to);
    } else {
      trackY = track.top;
    }
  }
  return {
    x: stop.x + ANCHOR.x * stop.s,
    y: trackY + ANCHOR.y * stop.s,
  };
}

function findInterval(holds, scrollY) {
  if (!holds.length || scrollY <= holds[0][1]) return { k: 0, t: 0 };
  for (let i = 0; i < holds.length - 1; i++) {
    const endCurrent = holds[i][1];
    const startNext = holds[i + 1][0];
    if (scrollY < startNext) {
      return { k: i, t: clamp01((scrollY - endCurrent) / Math.max(1, startNext - endCurrent)) };
    }
    if (scrollY <= holds[i + 1][1]) {
      return { k: i + 1, t: 0 };
    }
  }
  return { k: holds.length - 1, t: 0 };
}

const softMax = (val, bound, radius) => {
  const diff = (val - bound) / radius;
  return diff > 20 ? val : bound + radius * Math.log1p(Math.exp(diff));
};
const softMin = (val, bound, radius) => -softMax(-val, -bound, radius);

function constrainSafe(x, y, scale, box, safeArea, radius = 8) {
  const leftMargin = (ANCHOR.x - box[0]) * scale;
  const rightMargin = (box[2] - ANCHOR.x) * scale;
  const topMargin = (ANCHOR.y - box[1]) * scale;
  const bottomMargin = (box[3] - ANCHOR.y) * scale;

  let safeX;
  if (safeArea.right - safeArea.left > leftMargin + rightMargin) {
    safeX = softMin(softMax(x, safeArea.left + leftMargin, radius), safeArea.right - rightMargin, radius);
  } else {
    safeX = (safeArea.left + safeArea.right) / 2 - (rightMargin - leftMargin) / 2;
  }

  let safeY;
  if (safeArea.bottom - safeArea.top > topMargin + bottomMargin) {
    safeY = softMin(softMax(y, safeArea.top + topMargin, radius), safeArea.bottom - bottomMargin, radius);
  } else {
    safeY = safeArea.bottom - bottomMargin;
  }

  return { x: safeX, y: safeY };
}

function lerpBox(b1, b2, t) {
  return [
    lerp(b1[0], b2[0], t),
    lerp(b1[1], b2[1], t),
    lerp(b1[2], b2[2], t),
    lerp(b1[3], b2[3], t),
  ];
}

function cubicBezier(p0, c1, c2, p1, t) {
  const inv = 1 - t;
  const inv3 = inv * inv * inv;
  const c1f = 3 * inv * inv * t;
  const c2f = 3 * inv * t * t;
  const t3 = t * t * t;
  return {
    x: inv3 * p0.x + c1f * c1.x + c2f * c2.x + t3 * p1.x,
    y: inv3 * p0.y + c1f * c1.y + c2f * c2.y + t3 * p1.y,
  };
}

const BOX_MAP = {
  sit: [50, 26, 284, 234],
  peek: [148, 34, 280, 163],
  snug: [148, 40, 280, 163],
  bow: [58, 56, 292, 236],
};
const getBox = (pose) => BOX_MAP[pose] || DEFAULT_BOX;
const setDataset = (el, key, val) => {
  if (el && el.dataset[key] !== val) {
    el.dataset[key] = val;
  }
};

let activeCleanup = null;

export default function PupJourney() {
  const layerRef = useRef(null);
  const actorRef = useRef(null);
  const bodyRef = useRef(null);
  const bubbleRef = useRef(null);
  const bubbleAtRef = useRef(null);
  const printsRef = useRef(null);
  const probeRef = useRef(null);

  useEffect(() => {
    if (activeCleanup) {
      activeCleanup();
      activeCleanup = null;
    }

    const layerEl = layerRef.current;
    const actorEl = actorRef.current;
    const bodyEl = bodyRef.current;
    const bubbleEl = bubbleRef.current;
    const bubbleAtEl = bubbleAtRef.current;
    const printsEl = printsRef.current;
    const probeEl = probeRef.current;

    if (!layerEl || !actorEl || !bodyEl || !bubbleEl || !bubbleAtEl || !printsEl) return;

    const svg = bodyEl.querySelector('svg');
    const docRoot = document.documentElement;
    const printsList = [...printsEl.children];

    let journeyData = null;
    let pupInstance = null;
    let isActive = false;
    let printIndex = 0;
    let bubbleUntil = 0;

    const showBubble = (msg, now, duration = 1.4) => {
      bubbleEl.textContent = msg;
      bubbleEl.dataset.show = 'true';
      bubbleUntil = now + duration;
    };

    let mousePos = null;
    let lookTarget = null;

    const onPointerMove = (e) => {
      if (e.pointerType === 'mouse') {
        mousePos = { x: e.clientX, y: e.clientY, t: performance.now() / 1e3 };
      }
    };

    const onCuePup = (e) => {
      const detail = e.detail;
      const now = performance.now() / 1e3;
      if (detail.look) {
        lookTarget = { el: detail.look, until: now + (detail.secs ?? 1.6) };
      }
      if (detail.say) {
        showBubble(detail.say, now);
      }
    };

    const onFocusIn = (e) => {
      const target = e.target;
      if (target instanceof HTMLElement && target.matches('a, button, input, textarea, select, summary')) {
        lookTarget = { el: target, until: performance.now() / 1e3 + 1.4 };
      }
    };

    let prevTime = performance.now() / 1e3;
    let prevScrollY = window.scrollY;
    let prevPos = null;
    let currentInterp = null;
    const smoothOffset = { x: 0, y: 0, s: 0 };
    let currentStopIdx = -1;
    let actionQueue = [];
    let lastScrollTime = performance.now() / 1e3;
    let scrollDir = 1;
    let isTreadmill = false;
    let lanePos = null;
    let lastLaneY = 0;
    let baseOffset = 0;
    let lastWalkedStep = 0;
    let lastWalkedStop = -1;

    const getBottomSafeY = () => {
      const bar = document.querySelector('[data-whatsapp-bar]');
      const rect = bar?.getClientRects().length ? bar.getBoundingClientRect() : null;
      return rect && rect.height ? rect.top : window.innerHeight - 6;
    };

    const calculateStops = () => {
      const isMobile = window.matchMedia('(max-width: 767px), (pointer: coarse) and (max-height: 519px)').matches;
      const clientWidth = docRoot.clientWidth;
      const mainEl = document.getElementById('main') || document.body;
      const headerH = document.getElementById('site-header')?.offsetHeight ?? 76;
      const bar = document.querySelector('[data-whatsapp-bar]');
      const barH = bar?.getClientRects().length ? bar.getBoundingClientRect().height : 0;
      const safeArea = {
        left: 10,
        top: headerH + 10,
        right: clientWidth - 10,
        bottom: window.innerHeight - 10 - barH,
      };

      const stopEls = [...document.querySelectorAll('[data-pup-stop]')].filter((el) => el.getClientRects().length);
      if (stopEls.length < 2) return null;

      const stops = [];
      const meta = [];
      const holds = [];

      stopEls.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const pose = el.dataset.pose || 'sit';
        const act = el.dataset.act ?? '';
        const scale = rect.width / 300;
        const finalScale = act === 'basket' || isMobile ? scale : 1.12 * scale;
        const pivot = pose === 'peek' ? { x: ANCHOR.x, y: 159 } : ANCHOR;

        // Determine if inside sticky or pinned parent
        let trackKind = 'page';
        let trackTop = rect.top + window.scrollY;
        let pinFrom = 0;
        let pinTo = 0;

        let stickyParent = null;
        for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
          if (window.getComputedStyle(p).position === 'sticky') {
            stickyParent = p;
            break;
          }
        }

        if (stickyParent) {
          const stickyTop = parseFloat(window.getComputedStyle(stickyParent).top) || 0;
          const offsetInsideSticky = rect.top - stickyParent.getBoundingClientRect().top;
          const origPos = stickyParent.style.position;
          stickyParent.style.position = 'relative';
          const stickyRect = stickyParent.getBoundingClientRect();
          const parentOfSticky = stickyParent.parentElement;
          const bottomLimit =
            parentOfSticky.getBoundingClientRect().bottom -
            (parseFloat(window.getComputedStyle(parentOfSticky).paddingBottom) || 0);
          stickyParent.style.position = origPos;

          const pFrom = stickyRect.top + window.scrollY - stickyTop;
          const pTo = bottomLimit + window.scrollY - stickyRect.height - stickyTop;
          if (pTo > pFrom) {
            trackKind = 'pin';
            trackTop = stickyTop + offsetInsideSticky;
            pinFrom = pFrom;
            pinTo = pTo;
          }
        }

        trackTop += pivot.y * (scale - finalScale);

        const stopObj = {
          x: rect.left + pivot.x * (scale - finalScale),
          track:
            trackKind === 'pin'
              ? { kind: 'pin', top: trackTop, from: pinFrom, to: pinTo }
              : { kind: 'page', top: trackTop },
          s: finalScale,
          behind: el.dataset.behind === 'true',
          sink: 0,
          box: getBox(pose),
        };

        const scene = el.closest('[data-pup-scene]');
        stops.push(stopObj);
        meta.push({
          scene,
          pose,
          facing: el.dataset.facing === 'left' ? -1 : 1,
          act,
          track: act === 'treadmill' ? scene?.querySelector('[data-treadmill]') ?? null : null,
        });

        // Compute hold range
        let holdRange;
        if (stopObj.track.kind === 'pin') {
          holdRange = [stopObj.track.from, stopObj.track.to];
        } else {
          const sTop = stopObj.track.top;
          const n = sTop + stopObj.box[1] * stopObj.s;
          const l = sTop + stopObj.box[3] * stopObj.s;
          const mid = (n + l) / 2;
          const h = safeArea.bottom - safeArea.top;
          const ratio = isMobile ? [0.6, 0.86] : [0.42, 0.78];
          let o = mid - (safeArea.top + ratio[1] * h);
          let d = mid - (safeArea.top + ratio[0] * h);
          if (o > d) {
            o = d = mid - (safeArea.top + h / 2);
          }
          holdRange = [o, d];
        }

        if (!isMobile && scene && stopObj.track.kind === 'page' && act !== 'basket' && act !== 'peekaboo') {
          const safeH = safeArea.bottom - safeArea.top;
          const sceneTop = scene.getBoundingClientRect().top + window.scrollY - safeArea.top + 0.08 * safeH;
          const dogBottom = stopObj.track.top + stopObj.box[3] * stopObj.s - safeArea.bottom;
          if (holdRange[1] > sceneTop) {
            const adjusted = Math.max(sceneTop, dogBottom + 0.12 * safeH);
            holdRange = [Math.max(dogBottom, adjusted - Math.max(holdRange[1] - holdRange[0], 0.2 * safeH)), adjusted];
          }
        }
        holds.push(holdRange);
      });

      // Normalize holds
      for (let i = 0; i < holds.length; i++) {
        if (holds[i][0] > holds[i][1]) {
          const avg = (holds[i][0] + holds[i][1]) / 2;
          holds[i] = [avg, avg];
        }
      }
      holds[0][0] = -Infinity;
      holds[holds.length - 1][1] = Infinity;

      for (let i = 0; i < holds.length - 1; i++) {
        if (holds[i + 1][0] < holds[i][1]) {
          const mid = (holds[i][1] + holds[i + 1][0]) / 2;
          holds[i][1] = mid;
          holds[i + 1][0] = mid;
        }
      }

      return {
        lane: isMobile,
        stops,
        meta,
        holds,
        mainTop: mainEl.getBoundingClientRect().top + window.scrollY,
      };
    };

    const interpolateJourney = (journey, scrollY) => {
      const { stops, holds } = journey;
      const { k, t } = findInterval(holds, scrollY);
      const safeArea = {
        left: 10,
        top: (document.getElementById('site-header')?.offsetHeight ?? 76) + 10,
        right: docRoot.clientWidth - 10,
        bottom: getBottomSafeY() - 10,
      };

      if (t <= 0 || k >= stops.length - 1) {
        const stop = stops[k];
        const pt = getStopPoint(stop, scrollY);
        const safe = constrainSafe(pt.x, pt.y, stop.s, stop.box, safeArea);
        return {
          x: safe.x,
          y: safe.y,
          s: stop.s,
          front: !stop.behind,
          airborne: false,
          k,
          t: 0,
          walked: 0,
        };
      }

      const pStart = stops[k];
      const pEnd = stops[k + 1];
      const tStart = holds[k][1];
      const tEnd = holds[k + 1][0];
      const holdDist = Math.max(1, tEnd - tStart);
      const progress = clamp01((scrollY - tStart) / holdDist);

      const ptStart = getStopPoint(pStart, tStart);
      const ptEnd = getStopPoint(pEnd, tEnd);

      const dx = ptEnd.x - ptStart.x;
      const lead = Math.max(0.45 * Math.abs(dx), 0);
      const dir = dx >= 0 ? 1 : -1;
      let c1 = { x: ptStart.x + dir * lead, y: ptStart.y };
      let c2 = { x: ptEnd.x - dir * lead, y: ptEnd.y };

      const minArc = 0.14 * (safeArea.right - safeArea.left);
      if (Math.abs(dx) < minArc) {
        const side = (ptStart.x + ptEnd.x) / 2 < (safeArea.left + safeArea.right) / 2 ? 1 : -1;
        const extra = side * (minArc - Math.abs(dx)) * 0.9;
        c1 = { x: c1.x + extra, y: lerp(ptStart.y, ptEnd.y, 0.2) };
        c2 = { x: c2.x + extra, y: lerp(ptStart.y, ptEnd.y, 0.8) };
      }

      const easeT = progress * progress * progress * (progress * (6 * progress - 15) + 10);
      const curvePt = cubicBezier(ptStart, c1, c2, ptEnd, easeT);
      const scale = lerp(pStart.s, pEnd.s, smoothstep(clamp01(progress / 0.65)));

      const blendRange = Math.min(0.3, Math.max(0.06, 120 / holdDist));
      const blendStart = 1 - smoothRange(0, blendRange, progress);
      const blendEnd = smoothRange(1 - blendRange, 1, progress);

      const startY = getStopPoint(pStart, scrollY).y;
      const endY = getStopPoint(pEnd, scrollY).y;
      let finalY = curvePt.y + blendStart * (startY - ptStart.y) + blendEnd * (endY - ptEnd.y);

      let isAirborne = false;
      if (pStart.behind && progress < 0.36) {
        finalY -= Math.sin((progress / 0.36) * Math.PI) * Math.min(64 * pStart.s, 72);
        isAirborne = progress < 0.32;
      }
      if (pEnd.behind && progress > 0.68) {
        finalY -= Math.sin(((progress - 0.68) / 0.32) * Math.PI) * Math.min(56 * pEnd.s, 60);
        isAirborne = true;
      }

      const isFront = !(pStart.behind && progress < 0.12 || pEnd.behind && progress > 0.92);
      const curBox = progress < 0.5
        ? lerpBox(pStart.box, DEFAULT_BOX, smoothRange(0, 0.06, progress))
        : lerpBox(DEFAULT_BOX, pEnd.box, smoothRange(0.94, 1, progress));

      const safe = constrainSafe(curvePt.x, finalY, scale, curBox, safeArea);

      // Walked distance along bezier
      let walked = 0;
      let prevSample = ptStart;
      const samples = Math.max(1, Math.ceil(32 * clamp01(easeT)));
      for (let s = 1; s <= samples; s++) {
        const curSample = cubicBezier(ptStart, c1, c2, ptEnd, (s / samples) * easeT);
        walked += Math.hypot(curSample.x - prevSample.x, curSample.y - prevSample.y);
        prevSample = curSample;
      }

      return {
        x: safe.x,
        y: safe.y,
        s: scale,
        front: isFront,
        airborne: isAirborne,
        k,
        t: progress,
        walked,
      };
    };

    const trickContext = (metaObj) => ({
      d: pupInstance,
      rest: POSES[metaObj.pose] || POSES.sit,
      facing: metaObj.facing,
      say: (msg, dur) => showBubble(msg, performance.now() / 1e3, dur),
      hearts: () => {
        if (currentInterp) {
          const hX = currentInterp.x - ANCHOR.x * currentInterp.s + (pupInstance.facingDir > 0 ? 212 : PUP_W - 212) * currentInterp.s;
          const hY = currentInterp.y - (ANCHOR.y - 40) * currentInterp.s - baseOffset;
          spawnHearts(layerEl, hX, hY);
        }
      },
    });

    let clickCount = 0;
    let lastClickTime = 0;
    let currentTrick = null;

    const onActorClick = () => {
      if (!pupInstance || !journeyData) return;
      const now = performance.now() / 1e3;
      clickCount = now - lastClickTime < 0.7 ? clickCount + 1 : 1;
      lastClickTime = now;

      if (currentStopIdx < 0) {
        // Dog is walking
        const trick = getNextTrick(currentTrick, clickCount);
        currentTrick = trick;
        const metaObj = journeyData.meta[Math.max(0, currentInterp?.k ?? 0)];
        const ctx = trickContext(metaObj);
        pupInstance.reset();
        actionQueue = TRICK_ROUTINES[trick] ? TRICK_ROUTINES[trick](ctx, now) : [];
        return;
      }

      const metaObj = journeyData.meta[currentStopIdx];
      let trick = getNextTrick(currentTrick, clickCount);
      if (metaObj.track) trick = 'woof';
      currentTrick = trick;
      pupInstance.reset();
      actionQueue = TRICK_ROUTINES[trick] ? TRICK_ROUTINES[trick](trickContext(metaObj), now) : [];
    };

    const onActorPointerEnter = (e) => {
      if (e.pointerType === 'mouse' && pupInstance && currentStopIdx >= 0) {
        pupInstance.petting(true);
        pupInstance.wag(1);
      }
    };

    const onActorPointerLeave = () => {
      if (pupInstance) {
        pupInstance.petting(false);
        if (currentStopIdx >= 0) {
          const act = journeyData?.meta[currentStopIdx]?.act;
          pupInstance.wag(act === 'basket' ? 0.3 : 0.7);
        }
      }
    };

    let rafId = null;

    const onFrame = () => {
      if (!journeyData || !pupInstance) {
        rafId = requestAnimationFrame(onFrame);
        return;
      }

      const now = performance.now() / 1e3;
      const dt = Math.min(0.05, now - prevTime);
      prevTime = now;

      const curScrollY = window.scrollY;
      const scrollDelta = curScrollY - prevScrollY;
      prevScrollY = curScrollY;

      if (Math.abs(scrollDelta) > 0.5) {
        lastScrollTime = now;
        scrollDir = scrollDelta > 0 ? 1 : -1;
      }

      // Execute queued action steps
      while (actionQueue.length && actionQueue[0][0] <= now) {
        const step = actionQueue.shift();
        step[1](now);
      }

      const interp = interpolateJourney(journeyData, curScrollY);
      
      

      currentInterp = interp;

      // Dampen smooth offsets
      const decay = Math.exp(-dt / 0.28);
      smoothOffset.x *= decay;
      smoothOffset.y *= decay;
      smoothOffset.s *= decay;
      if (Math.abs(smoothOffset.x) < 0.05) smoothOffset.x = 0;
      if (Math.abs(smoothOffset.y) < 0.05) smoothOffset.y = 0;

      const finalScale = interp.s + smoothOffset.s;
      const finalX = interp.x + smoothOffset.x;
      const finalY = interp.y + smoothOffset.y;

      const isHolding = interp.t === 0;
      const activeIdx = interp.k;

      if (isHolding) {
        if (currentStopIdx !== activeIdx) {
          currentStopIdx = activeIdx;
          const metaObj = journeyData.meta[activeIdx];
          actionQueue = [];
          lookTarget = null;
          pupInstance.reset();
          pupInstance.setPose(metaObj.pose);
          pupInstance.face(metaObj.facing, 0.14);
          pupInstance.stride(0);
          pupInstance.wag(metaObj.act === 'basket' ? 0.3 : 0.7);
          pupInstance.jolt(0.4);

          // Handle treadmill walking
          if (metaObj.track) {
            isTreadmill = true;
          } else {
            isTreadmill = false;
          }
        }
      } else {
        // Dog is walking between stops
        currentStopIdx = -1;
        isTreadmill = false;
        pupInstance.setPose('walk');
        pupInstance.stride(Math.min(1, Math.abs(scrollDelta) / (dt * 120) || 0.8));
        pupInstance.wag(0.9);
        pupInstance.walkedTo(interp.walked);

        if (prevPos) {
          const moveDir = finalX - prevPos.x;
          if (Math.abs(moveDir) > 0.5) {
            pupInstance.face(moveDir > 0 ? 1 : -1, 0.16);
          }
        }

        // Drop paw prints
        if (!journeyData.lane) {
          const printStep = Math.floor(interp.walked / (34 * finalScale));
          if (lastWalkedStop === activeIdx && printStep !== lastWalkedStep && !interp.airborne && prevPos) {
            const isLeft = printStep % 2 === 1;
            const toeOffset = isLeft ? 186 : 110;
            const rootX = finalX - ANCHOR.x * finalScale;
            const rootY = finalY - ANCHOR.y * finalScale;
            const pawX = rootX + (pupInstance.facingDir > 0 ? toeOffset : PUP_W - toeOffset) * finalScale;
            const pawY = rootY + 226 * finalScale + curScrollY - journeyData.mainTop + (isLeft ? -4 : 4) * finalScale;
            const angle = Math.atan2(finalY - prevPos.y + scrollDelta, finalX - prevPos.x) + Math.PI / 2;
            const size = 14 * Math.max(0.75, 1.5 * finalScale);

            const printEl = printsList[printIndex++ % printsList.length];
            if (printEl) {
              printEl.style.transform = `translate(${(pawX - size / 2).toFixed(1)}px, ${(pawY - size / 2).toFixed(1)}px) rotate(${angle.toFixed(3)}rad)`;
              printEl.style.width = printEl.style.height = `${size.toFixed(1)}px`;
              printEl.animate(
                [
                  { opacity: 0 },
                  { opacity: 0.45, offset: 0.08 },
                  { opacity: 0.45, offset: 0.5 },
                  { opacity: 0 },
                ],
                { duration: 2600, easing: 'ease-out' }
              );
            }
          }
          lastWalkedStop = activeIdx;
          lastWalkedStep = printStep;
        }
      }

      prevPos = { x: finalX, y: finalY };

      // Update scene datasets (here / visited)
      journeyData.meta.forEach((metaObj, idx) => {
        if (metaObj.scene) {
          setDataset(metaObj.scene, 'here', String(isHolding && idx === activeIdx));
          setDataset(metaObj.scene, 'visited', String(idx <= activeIdx || (idx === activeIdx + 1 && interp.t > 0.92)));
        }
      });

      // LookAt updates
      if (lookTarget && lookTarget.until > now) {
        const rect = lookTarget.el.getBoundingClientRect();
        pupInstance.lookAt({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
      } else if (mousePos && now - mousePos.t < 2.5) {
        pupInstance.lookAt(mousePos);
      } else {
        pupInstance.lookAt(null);
      }

      // Position actor
      actorEl.style.transform = `translate3d(${(finalX - ANCHOR.x * finalScale).toFixed(2)}px, ${(finalY - ANCHOR.y * finalScale - baseOffset).toFixed(2)}px, 0)`;
      bodyEl.style.transform = `scale(${finalScale.toFixed(4)})`;

      setDataset(layerEl, 'front', String(interp.front));
      setDataset(actorEl, 'holding', String(isHolding));

      // Bubble position
      if (bubbleEl.dataset.show === 'true') {
        if (now > bubbleUntil) {
          bubbleEl.dataset.show = 'false';
        }
        const bubbleX = (pupInstance.facingDir > 0 ? 214 : PUP_W - 214) * finalScale;
        bubbleAtEl.style.transform = `translate(${bubbleX.toFixed(1)}px, ${(30 * finalScale).toFixed(1)}px)`;
      }

      pupInstance.tick(dt, now);
      rafId = requestAnimationFrame(onFrame);
    };

    let initAttempts = 0;
    let timer = null;

    const initEngine = () => {
      const data = calculateStops();
      if (!data) {
        if (++initAttempts < 40) {
          timer = setTimeout(initEngine, 50);
        }
        return;
      }
      

      journeyData = data;
      window.__pupJourney = data;
      isActive = true;
      docRoot.dataset.pup = data.lane ? 'lane' : 'live';
      layerEl.hidden = false;

      const firstStop = data.meta[0];
      pupInstance = new PupBuddy(svg, firstStop.pose, firstStop.facing);
      prevScrollY = window.scrollY;
      prevTime = performance.now() / 1e3;

      window.addEventListener('pointermove', onPointerMove, { passive: true });
      window.addEventListener('pup:cue', onCuePup);
      window.addEventListener('focusin', onFocusIn);
      actorEl.addEventListener('click', onActorClick);
      actorEl.addEventListener('pointerenter', onActorPointerEnter);
      actorEl.addEventListener('pointerleave', onActorPointerLeave);

      rafId = requestAnimationFrame(onFrame);
    };

    const cleanup = () => {
      if (rafId) cancelAnimationFrame(rafId);
      delete docRoot.dataset.pup;
      layerEl.hidden = true;
      journeyData?.meta.forEach((m) => {
        if (m.scene) {
          delete m.scene.dataset.here;
          delete m.scene.dataset.visited;
        }
      });
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pup:cue', onCuePup);
      window.removeEventListener('focusin', onFocusIn);
      actorEl.removeEventListener('click', onActorClick);
      actorEl.removeEventListener('pointerenter', onActorPointerEnter);
      actorEl.removeEventListener('pointerleave', onActorPointerLeave);
    };

    activeCleanup = cleanup;

    // Small delay to let page mount and fonts render
    timer = setTimeout(initEngine, 80);

    const onResize = () => {
      const newData = calculateStops();
      if (newData) journeyData = newData;
    };
    window.addEventListener('resize', onResize);

    return () => {
      clearTimeout(timer);
      cleanup();
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <>
      <div ref={probeRef} aria-hidden="true" className="pup-probe" />
      <div ref={printsRef} aria-hidden="true" className="pup-prints">
        {Array.from({ length: 24 }, (_, i) => (
          <svg key={i} viewBox="0 0 64 64">
            <path d={PAW_PRINT_PATH} />
          </svg>
        ))}
      </div>
      <div ref={layerRef} aria-hidden="true" className="pup-layer" hidden data-front="true">
        <div ref={actorRef} className="pup-actor">
          <div ref={bodyRef} className="pup-actor__body">
            <PupBuddySVG pose="peek" />
          </div>
          <span ref={bubbleAtRef} className="pup-bubble-at">
            <span ref={bubbleRef} className="pup-bubble" data-show="false" />
          </span>
        </div>
      </div>
    </>
  );
}
