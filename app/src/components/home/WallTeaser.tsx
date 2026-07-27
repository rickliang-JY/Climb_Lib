import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import HoldModel from '@/components/three/HoldModel';
import { holdTypes } from '@/data/holds';

const WALL_W = 3.2;
const WALL_H = 2.2;
const WALL_T = 0.2;
/** Front face of the slab; holds are authored with a flat bolt-on back at z=0. */
const WALL_FRONT = -0.12 + WALL_T / 2;

const holdTypeById = Object.fromEntries(holdTypes.map((ht) => [ht.id, ht]));

/**
 * A short route across the teaser slab, using the same hold geometry and route
 * palette as /wall-3d so the home page previews the real thing rather than a
 * handful of loose primitives.
 */
const TEASER_HOLDS: {
  typeId: string;
  pos: [number, number];
  size: number;
  color: string;
  delay: number;
}[] = [
  { typeId: 'jug', pos: [-1.05, -0.72], size: 0.62, color: '#7CB342', delay: 0 },
  { typeId: 'foothold', pos: [-0.42, -0.86], size: 0.5, color: '#7CB342', delay: 0.08 },
  { typeId: 'edge', pos: [-0.72, -0.16], size: 0.5, color: '#7CB342', delay: 0.16 },
  { typeId: 'sloper', pos: [-0.05, 0.2], size: 0.58, color: '#42A5F5', delay: 0.24 },
  { typeId: 'crimp', pos: [0.62, -0.34], size: 0.46, color: '#EF5350', delay: 0.32 },
  { typeId: 'pinch', pos: [0.82, 0.34], size: 0.5, color: '#EF5350', delay: 0.4 },
  { typeId: 'jug', pos: [0.12, 0.78], size: 0.6, color: '#42A5F5', delay: 0.48 },
  { typeId: 'pocket', pos: [1.18, 0.82], size: 0.5, color: '#AB47BC', delay: 0.56 },
];

/** T-nut grid drilled into the slab, the detail that reads as "climbing wall". */
function TNutGrid() {
  const holes = useMemo(() => {
    const out: [number, number][] = [];
    for (let ix = -4; ix <= 4; ix++) {
      for (let iy = -2; iy <= 2; iy++) {
        out.push([ix * 0.34, iy * 0.44]);
      }
    }
    return out;
  }, []);
  return (
    <group>
      {holes.map(([x, y], i) => (
        <mesh key={i} position={[x, y, WALL_FRONT + 0.001]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.022, 0.022, 0.01, 10]} />
          <meshStandardMaterial color="#6B6355" roughness={0.7} metalness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

/** A single procedural hold that pops out of the wall with a spring-ish ease. */
function PopHold({
  position,
  delay,
  children,
}: {
  position: [number, number, number];
  delay: number;
  children: ReactNode;
}) {
  const group = useRef<THREE.Group>(null);
  const start = useRef<number | null>(null);
  useFrame(({ clock }) => {
    if (!group.current) return;
    if (start.current === null) start.current = clock.elapsedTime;
    const t = Math.max(0, clock.elapsedTime - start.current - delay);
    // spring-like overshoot: 1 - e^-4t * cos(6t)
    const s = t <= 0 ? 0 : Math.min(1.15, 1 - Math.exp(-4 * t) * Math.cos(6 * t));
    group.current.scale.setScalar(Math.max(0.0001, s));
  });
  return (
    <group ref={group} position={position} scale={0.0001}>
      {children}
    </group>
  );
}

function TeaserScene() {
  return (
    <group rotation={[0.08, -0.32, 0]}>
      {/* wall slab */}
      <mesh position={[0, 0, -0.12]} receiveShadow>
        <boxGeometry args={[WALL_W, WALL_H, WALL_T]} />
        <meshStandardMaterial color="#B8A88F" roughness={0.95} metalness={0.02} />
      </mesh>
      <TNutGrid />
      {/* route-setting tape, matching the wall page */}
      <mesh position={[-1.32, 0, WALL_FRONT + 0.002]}>
        <boxGeometry args={[0.035, WALL_H * 0.9, 0.008]} />
        <meshStandardMaterial color="#C96F4A" roughness={0.7} transparent opacity={0.55} />
      </mesh>

      {TEASER_HOLDS.map((h, i) => {
        const type = holdTypeById[h.typeId];
        if (!type) return null;
        return (
          <PopHold key={i} position={[h.pos[0], h.pos[1], WALL_FRONT]} delay={h.delay}>
            <HoldModel type={type} color={h.color} size={h.size} />
          </PopHold>
        );
      })}
    </group>
  );
}

/**
 * Home S5 — live 3D wall teaser. R3F tree only (no Framer Motion inside).
 * Canvas mounts lazily when scrolled into view.
 */
export default function WallTeaser() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: '200px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={hostRef}
      className="relative h-[40vh] min-h-[320px] w-full overflow-hidden border border-stone bg-paper-warm transition-opacity duration-700"
      style={{ opacity: visible ? 1 : 0 }}
    >
      {visible && (
        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{ position: [0, 0.3, 3.9], fov: 42 }}
          style={{ width: '100%', height: '100%' }}
        >
          <ambientLight intensity={0.62} color="#F4EFE6" />
          <directionalLight position={[4, 6, 5]} intensity={1.4} color="#FFE3C2" castShadow />
          <directionalLight position={[-4, 2, 3]} intensity={0.35} color="#D9CBB5" />
          <Suspense fallback={null}>
            <TeaserScene />
            <ContactShadows position={[0, -1.35, 0]} opacity={0.35} scale={8} blur={2.4} color="#2B2620" />
          </Suspense>
          <OrbitControls autoRotate autoRotateSpeed={1.6} enableZoom={false} enablePan={false} />
        </Canvas>
      )}
      <span className="absolute bottom-3 left-3 rounded bg-paper/80 px-2 py-1 font-mono type-caption uppercase text-ink-soft backdrop-blur-sm">
        LIVE 3D — DRAG TO ROTATE
      </span>
    </div>
  );
}
