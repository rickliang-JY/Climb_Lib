import { useEffect, useMemo, useRef } from 'react';
import type { MutableRefObject } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import type { HoldType } from '@/data/holds';
import HoldModel from './HoldModel';
import { categoryColorOf } from './holdMeta';
import type { SceneApi } from './WallScene';

/** Mounting panel: a cut-out square of climbing wall the specimen is bolted to. */
const PANEL_W = 2.9;
const PANEL_H = 2.5;
const PANEL_T = 0.16;
const PANEL_CY = 1.45; // panel center height; bottom sits on the pedestal top
const TARGET = new THREE.Vector3(0, PANEL_CY, 0.15);

/** T-nut grid drilled into the panel, the detail that reads as "climbing wall". */
function TNutGrid() {
  const holes = useMemo(() => {
    const out: [number, number][] = [];
    const stepX = 0.58;
    const stepY = 0.58;
    for (let ix = -2; ix <= 2; ix++) {
      for (let iy = -1; iy <= 1; iy++) {
        // Leave the middle clear so the grid never fights the specimen.
        if (Math.abs(ix) <= 1 && iy === 0) continue;
        out.push([ix * stepX, iy * stepY]);
      }
    }
    return out;
  }, []);

  return (
    <group>
      {holes.map(([x, y], i) => (
        <mesh key={i} position={[x, y, PANEL_T / 2 + 0.001]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.035, 0.035, 0.012, 12]} />
          <meshStandardMaterial color="#4A443B" roughness={0.6} metalness={0.35} />
        </mesh>
      ))}
    </group>
  );
}

/**
 * The specimen assembly: a wall panel with the hold bolted onto its front face.
 * Both spin together so you can read how far the hold protrudes and how its
 * back face meets the wall - the hold geometry is authored with a flat bolt-on
 * back at z=0, so showing it unmounted made it look like it was floating.
 */
function SpinSpecimen({ type }: { type: HoldType }) {
  const group = useRef<THREE.Group>(null);
  const displayScale = 1.1 + (1 - type.sizeHint) * 3.2;
  const color = categoryColorOf(type.category);

  useFrame((_, dt) => {
    const g = group.current;
    if (!g) return;
    g.rotation.y += dt * 0.42;
    g.scale.setScalar(THREE.MathUtils.damp(g.scale.x, 1, 5, dt));
  });

  return (
    <group ref={group} scale={0.85} position={[0, PANEL_CY, 0]} rotation={[0, -0.55, 0]}>
      {/* Panel slab, front face at z = PANEL_T/2 */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[PANEL_W, PANEL_H, PANEL_T]} />
        <meshStandardMaterial color="#9E8E76" roughness={0.96} metalness={0.02} />
      </mesh>
      <TNutGrid />
      {/* Hold bolted to the panel front */}
      <group position={[0, 0, PANEL_T / 2]}>
        <HoldModel type={type} color={color} size={displayScale} />
      </group>
    </group>
  );
}

function SpecimenControls({
  enableZoom,
  rotateSpeed,
  apiRef,
}: {
  enableZoom: boolean;
  rotateSpeed: number;
  apiRef?: MutableRefObject<SceneApi | null>;
}) {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const { camera } = useThree();

  useEffect(() => {
    if (!apiRef) return;
    apiRef.current = {
      zoomBy(factor: number) {
        const c = controlsRef.current;
        if (!c) return;
        const off = camera.position.clone().sub(c.target);
        off.setLength(THREE.MathUtils.clamp(off.length() * factor, 2.6, 9));
        camera.position.copy(c.target).add(off);
      },
    };
    return () => {
      apiRef.current = null;
    };
  }, [apiRef, camera]);

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      target={TARGET.toArray()}
      enableDamping
      dampingFactor={0.08}
      rotateSpeed={rotateSpeed}
      minDistance={2.6}
      maxDistance={9}
      maxPolarAngle={1.62}
      enablePan={false}
      enableZoom={enableZoom}
    />
  );
}

export interface SpecimenSceneProps {
  type: HoldType;
  enableZoom: boolean;
  rotateSpeed: number;
  dpr: [number, number];
  apiRef?: MutableRefObject<SceneApi | null>;
}

/** Single-model museum pedestal stage for /holds. Mount lazily via the page. */
export default function SpecimenScene({ type, enableZoom, rotateSpeed, dpr, apiRef }: SpecimenSceneProps) {
  return (
    <Canvas
      shadows
      dpr={dpr}
      camera={{ position: [3.1, 2.3, 4.2], fov: 40, near: 0.1, far: 40 }}
      gl={{ alpha: true, antialias: true }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.42} color="#FFEFE0" />
      <hemisphereLight intensity={0.3} color="#F4EFE6" groundColor="#2B2620" />
      <directionalLight position={[3, 5, 4]} intensity={1.25} color="#FFE8D6" castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[-3, 1, 2]} intensity={0.35} color="#D9CBB5" />
      {/* clay rim light from behind to outline the silhouette */}
      <directionalLight position={[0, 2.5, -4]} intensity={0.7} color="#C96F4A" />

      {/* Pedestal + engraved clay ring */}
      <mesh position={[0, 0.1, 0]} receiveShadow>
        <cylinderGeometry args={[1.6, 1.7, 0.2, 48]} />
        <meshStandardMaterial color="#B8A88F" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.202, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.42, 0.008, 8, 72]} />
        <meshStandardMaterial color="#C96F4A" roughness={0.6} emissive="#C96F4A" emissiveIntensity={0.25} />
      </mesh>

      <SpinSpecimen key={type.id} type={type} />

      <ContactShadows position={[0, 0.21, 0]} opacity={0.45} scale={6} blur={2.2} far={3} color="#2B2620" />

      <SpecimenControls enableZoom={enableZoom} rotateSpeed={rotateSpeed} apiRef={apiRef} />
    </Canvas>
  );
}
