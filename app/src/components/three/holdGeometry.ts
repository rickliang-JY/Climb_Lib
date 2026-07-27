// Procedural geometry builders for the 16 hold types in src/data/holds.ts.
// Each builder interprets holdType.geometry.params + the deform recipe into
// one or more BufferGeometry "parts" in hold-local space:
//   - the wall is the XY plane, the hold protrudes toward +Z
//   - the back (bolt face) is flattened near z = 0
// Geometries are cached per hold-type id and shared by every instance.

import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three-stdlib';
import type { HoldType } from '@/data/holds';

const BACK_EPS = 0.012;

/** Apply fn to every vertex, then recompute smooth normals. */
function displace(geo: THREE.BufferGeometry, fn: (p: THREE.Vector3) => void): void {
  const pos = geo.attributes.position as THREE.BufferAttribute;
  const p = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    p.fromBufferAttribute(pos, i);
    fn(p);
    pos.setXYZ(i, p.x, p.y, p.z);
  }
  pos.needsUpdate = true;
  geo.computeVertexNormals();
}

/** Collapse the back pole to a flat mounting plane (bolted-to-wall look). */
function flattenBack(geo: THREE.BufferGeometry): void {
  displace(geo, (p) => {
    if (p.z < BACK_EPS) p.z = BACK_EPS;
  });
}

/** Translate so the rearmost vertex sits on the wall plane. */
function restOnWall(geo: THREE.BufferGeometry): void {
  geo.computeBoundingBox();
  const minZ = geo.boundingBox ? geo.boundingBox.min.z : 0;
  geo.translate(0, 0, BACK_EPS - minZ);
  geo.computeVertexNormals();
}

/**
 * Carve a rounded recess into the front face (pocket / hueco / jug scoop).
 * Center (cx, cy) in hold-local XY, cosine falloff profile.
 */
function dimple(geo: THREE.BufferGeometry, cx: number, cy: number, radius: number, depth: number): void {
  displace(geo, (p) => {
    if (p.z <= BACK_EPS) return;
    const d = Math.hypot(p.x - cx, p.y - cy);
    if (d < radius) {
      const fall = Math.cos((d / radius) * Math.PI * 0.5); // 1 at center -> 0 at rim
      p.z = Math.max(p.z - depth * fall, BACK_EPS * 1.5);
    }
  });
}

/** Deterministic low-frequency pseudo noise for resin/sandstone unevenness. */
function surfNoise(x: number, y: number, freq: number): number {
  return (
    Math.sin(x * freq * 3.1 + 1.7) * Math.cos(y * freq * 2.3 + 0.4) * 0.6 +
    Math.sin((x + y) * freq * 1.7 + 3.1) * 0.4
  );
}

function scaleGeo(geo: THREE.BufferGeometry, sx: number, sy: number, sz: number): void {
  displace(geo, (p) => {
    p.x *= sx;
    p.y *= sy;
    p.z *= sz;
  });
}

// ---------------------------------------------------------------------------
// Primitive builders
// ---------------------------------------------------------------------------

function buildSphereType(type: HoldType): THREE.BufferGeometry[] {
  const prm = type.geometry.params;
  const radius = prm.radius ?? 0.4;
  const geo = new THREE.SphereGeometry(
    radius,
    Math.round(prm.widthSegments ?? prm.segments ?? 32),
    Math.round(prm.heightSegments ?? 24),
  );
  scaleGeo(geo, prm.scaleX ?? 1, prm.scaleY ?? 1, prm.scaleZ ?? 1);

  switch (type.id) {
    case 'jug': {
      // Finger bucket carved into the lower-front quadrant (deform recipe).
      dimple(geo, 0, -radius * 0.28, prm.scoopRadius ?? 0.3, (prm.scoopDepth ?? 0.18) * 0.75);
      break;
    }
    case 'sloper': {
      const amp = prm.noiseAmp ?? 0.02;
      const freq = prm.noiseFreq ?? 3;
      displace(geo, (p) => {
        if (p.z > 0) p.z += amp * surfNoise(p.x, p.y, freq);
      });
      break;
    }
    case 'pocket': {
      const count = Math.round(prm.holeCount ?? 2);
      const spacing = prm.holeSpacing ?? 0.11;
      const hr = (prm.holeRadius ?? 0.07) * 1.7;
      const hd = (prm.holeDepth ?? 0.14) * 0.8;
      for (let i = 0; i < count; i++) {
        const cx = (i - (count - 1) / 2) * spacing;
        dimple(geo, cx, radius * 0.1, hr, hd);
      }
      break;
    }
    case 'foothold': {
      // Clip the top pole into a level stepping surface.
      const cap = radius * (prm.scaleY ?? 0.45) * 0.55;
      displace(geo, (p) => {
        if (p.y > cap) p.y = cap;
      });
      break;
    }
    case 'hueco': {
      const mr = prm.mouthRadius ?? 0.2;
      dimple(geo, 0, 0, mr, (prm.mouthDepth ?? 0.28) * 0.85);
      // Inflated rim around the mouth reads as an incut lip.
      const bulge = prm.rimBulge ?? 0.05;
      displace(geo, (p) => {
        const d = Math.hypot(p.x, p.y);
        if (d > mr * 0.85 && d < mr * 1.5 && p.z > 0) {
          const fall = Math.cos(((d - mr * 0.85) / (mr * 0.65)) * Math.PI * 0.5);
          p.z += bulge * Math.max(0, fall);
        }
      });
      break;
    }
    default:
      break;
  }
  flattenBack(geo);
  return [geo];
}

function buildBoxType(type: HoldType): THREE.BufferGeometry[] {
  const prm = type.geometry.params;
  const w = prm.width ?? 0.4;
  const h = prm.height ?? 0.1;
  const d = prm.depth ?? 0.12;
  const bevel = Math.min(prm.bevel ?? 0.02, h * 0.45, d * 0.45);
  const geo = new RoundedBoxGeometry(w, h, d, 3, bevel);

  switch (type.id) {
    case 'crimp': {
      // Taper the top edge inward to form a shallow incut lip.
      const lip = prm.lipOverhang ?? 0.015;
      displace(geo, (p) => {
        if (p.y > 0) p.z -= lip * (p.y / (h / 2)) * 2.2;
      });
      break;
    }
    case 'sidepull': {
      // Push the vertical centerline outward into one convex grip edge.
      const bulge = prm.bulgeX ?? 0.06;
      displace(geo, (p) => {
        const t = p.y / h + 0.5; // 0 bottom -> 1 top
        p.x += bulge * Math.sin(t * Math.PI) * (p.z > 0 ? 1 : 0.3);
      });
      break;
    }
    case 'edge': {
      // Incut top face + gentle sinusoidal undulation along the rail.
      const incut = Math.tan(THREE.MathUtils.degToRad(prm.incutDeg ?? 12));
      const amp = prm.waveAmp ?? 0.01;
      const freq = prm.waveFreq ?? 2;
      displace(geo, (p) => {
        if (p.y > 0) p.z -= incut * p.y * 0.9;
        p.z += amp * Math.sin((p.x / w) * Math.PI * 2 * freq) * (p.y > 0 ? 1 : 0.3);
      });
      break;
    }
    case 'chip': {
      const inset = Math.tan(THREE.MathUtils.degToRad(prm.topInsetDeg ?? 8));
      displace(geo, (p) => {
        if (p.y > 0) p.z -= inset * p.y * 0.8;
      });
      break;
    }
    case 'flake': {
      // Bend the slab along its length, taper the bottom into the wall,
      // then stand it off on two spacers leaving the finger slot open.
      const curve = prm.curveAmp ?? 0.04;
      const taper = prm.taperBottom ?? 0.5;
      const standoff = prm.standoff ?? 0.06;
      displace(geo, (p) => {
        p.x += curve * Math.sin((p.y / h + 0.5) * Math.PI);
        if (p.y < -h * 0.2) {
          const tt = THREE.MathUtils.clamp((-h * 0.2 - p.y) / (h * 0.3), 0, 1);
          p.x *= 1 - (1 - taper) * tt;
        }
      });
      geo.translate(0, 0, standoff + d / 2);
      const parts: THREE.BufferGeometry[] = [geo];
      for (const sy of [-h * 0.38, h * 0.38]) {
        const spacer = new THREE.BoxGeometry(w * 0.4, h * 0.12, standoff + BACK_EPS);
        spacer.translate(0, sy, (standoff + BACK_EPS) / 2);
        parts.push(spacer);
      }
      return parts;
    }
    default:
      break;
  }
  restOnWall(geo);
  return [geo];
}

function buildCylinderType(type: HoldType): THREE.BufferGeometry[] {
  const prm = type.geometry.params;
  if (type.id === 'tufa') {
    const height = prm.height ?? 0.7;
    const geo = new THREE.CylinderGeometry(
      prm.radiusTop ?? 0.09,
      prm.radiusBottom ?? 0.13,
      height,
      Math.round(prm.radialSegments ?? 12),
      Math.round(prm.heightSegments ?? 8),
    );
    const amp = prm.noiseAmp ?? 0.03;
    const twist = THREE.MathUtils.degToRad(prm.twistDeg ?? 25);
    const sz = prm.scaleZ ?? 0.6;
    displace(geo, (p) => {
      // Knuckly bulges along the column + top-to-bottom twist.
      const t = p.y / height + 0.5;
      const knuckle = 1 + amp * 3 * Math.sin(t * Math.PI * 5);
      p.x *= knuckle;
      p.z *= knuckle * sz;
      const a = twist * (t - 0.5);
      const cos = Math.cos(a);
      const sin = Math.sin(a);
      const nx = p.x * cos - p.z * sin;
      const nz = p.x * sin + p.z * cos;
      p.x = nx;
      p.z = nz;
    });
    restOnWall(geo);
    return [geo];
  }

  // mono: short tapered disk flush to the wall with a single finger hole.
  const geo = new THREE.CylinderGeometry(
    prm.radiusTop ?? 0.14,
    prm.radiusBottom ?? 0.17,
    prm.height ?? 0.1,
    Math.round(prm.radialSegments ?? 24),
    4,
  );
  geo.rotateX(Math.PI / 2); // disk faces +Z
  scaleGeo(geo, 1, 1, prm.scaleZ ?? 0.7);
  dimple(geo, 0, 0, (prm.holeRadius ?? 0.05) * 1.7, (prm.holeDepth ?? 0.09) * 0.9);
  restOnWall(geo);
  return [geo];
}

function buildTorusType(type: HoldType): THREE.BufferGeometry[] {
  const prm = type.geometry.params;
  const arc = prm.arc ?? 2;
  const geo = new THREE.TorusGeometry(
    prm.radius ?? 0.25,
    prm.tube ?? 0.08,
    Math.round(prm.radialSegments ?? 14),
    Math.round(prm.tubularSegments ?? 28),
    arc,
  );
  if (type.id === 'undercling') {
    // Center the ring gap at the bottom, then tilt the opening toward the wall.
    const gapCenter = (arc + Math.PI * 2) / 2;
    geo.rotateZ(-Math.PI / 2 - gapCenter);
    scaleGeo(geo, 1, 1, prm.scaleZ ?? 0.8);
    geo.rotateX(THREE.MathUtils.degToRad((prm.tiltDeg ?? 100) - 90) * 0.5);
  } else {
    // horn: sweep the ring segment out from the wall, free tip pointing up.
    geo.rotateZ(-0.5);
    geo.rotateY(Math.PI / 2);
    scaleGeo(geo, 1, 1, prm.scaleZ ?? 0.9);
    // Taper the tube toward the free tip for a horn profile.
    displace(geo, (p) => {
      const t = THREE.MathUtils.clamp((p.y + 0.05) / 0.35, 0, 1);
      const f = 1 - 0.25 * t;
      p.x *= f;
      p.z = BACK_EPS + (p.z - BACK_EPS) * f;
    });
  }
  restOnWall(geo);
  return [geo];
}

function buildCompositeType(type: HoldType): THREE.BufferGeometry[] {
  const prm = type.geometry.params;
  if (type.id === 'pinch') {
    const lobeR = prm.lobeRadius ?? 0.22;
    const offX = prm.lobeOffsetX ?? 0.16;
    const parts: THREE.BufferGeometry[] = [];
    for (const side of [-1, 1]) {
      const lobe = new THREE.SphereGeometry(lobeR, 24, 18);
      scaleGeo(lobe, 1, prm.lobeScaleY ?? 1.2, prm.lobeScaleZ ?? 0.7);
      lobe.translate(side * offX, 0, 0);
      flattenBack(lobe);
      parts.push(lobe);
    }
    const spine = new RoundedBoxGeometry(
      prm.spineWidth ?? 0.12,
      lobeR * 2 * (prm.lobeScaleY ?? 1.2) * 0.9,
      0.1,
      2,
      0.03,
    );
    restOnWall(spine);
    parts.push(spine);
    return parts;
  }

  if (type.id === 'volume') {
    const w = prm.width ?? 0.9;
    const h = prm.height ?? 0.7;
    const d = prm.depth ?? 0.35;
    const geo = new THREE.CylinderGeometry(
      (w / 2) * (prm.taperTop ?? 0.6),
      w / 2,
      d,
      Math.round(prm.sides ?? 5),
      1,
    );
    geo.rotateX(Math.PI / 2); // tapered face now fronts +Z
    scaleGeo(geo, 1, h / w, 1);
    // Slant the front face into a climbable slab.
    const tilt = Math.tan(THREE.MathUtils.degToRad(prm.faceTiltDeg ?? 18)) * 0.5;
    displace(geo, (p) => {
      p.z += p.y * tilt;
    });
    restOnWall(geo);
    return [geo];
  }

  // Unknown composite: fallback dome.
  return [new THREE.SphereGeometry(0.3, 24, 18)];
}

// ---------------------------------------------------------------------------
// Cache + public API
// ---------------------------------------------------------------------------

function buildParts(type: HoldType): THREE.BufferGeometry[] {
  switch (type.geometry.primitive) {
    case 'sphere':
      return buildSphereType(type);
    case 'box':
      return buildBoxType(type);
    case 'cylinder':
      return buildCylinderType(type);
    case 'torus':
      return buildTorusType(type);
    case 'composite':
      return buildCompositeType(type);
    default:
      return [new THREE.SphereGeometry(0.3, 24, 18)];
  }
}

const cache = new Map<string, THREE.BufferGeometry[]>();

/** Shared, cached geometry parts for a hold type (never dispose these). */
export function getHoldParts(type: HoldType): THREE.BufferGeometry[] {
  let parts = cache.get(type.id);
  if (!parts) {
    parts = buildParts(type);
    cache.set(type.id, parts);
  }
  return parts;
}
