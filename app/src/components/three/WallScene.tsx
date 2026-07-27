import { useEffect, useMemo, useRef } from 'react';
import type { MutableRefObject } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import type { ThreeEvent } from '@react-three/fiber';
import { ContactShadows, Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { holdTypes, wallHolds, wallRoutes } from '@/data/holds';
import type { HoldType, WallHold, WallRoute } from '@/data/holds';
import HoldModel from './HoldModel';

// Wall dimensions derived from the data extent (x in [-1.75,1.75], y in [0.3,4.4]).
const WALL_W = 4.4;
const WALL_H = 5.2;
const WALL_T = 0.5;
const WALL_CY = WALL_H / 2;
const LEAN_START = 4.3; // top of the wall leans out 15 deg (overhang), above every hold
const LEAN_TAN = Math.tan(THREE.MathUtils.degToRad(15));

const DEFAULT_POS = new THREE.Vector3(4.2, 2.4, 7);
const DEFAULT_TARGET = new THREE.Vector3(0, 2.4, 0);

/**
 * The wall is modelled in metres (4.4 m wide, holds from 0.3 m to 4.4 m up).
 * The authored `size` values put a jug at roughly a metre across, which is two
 * to three times life size and made the wall read like a toy. This trims every
 * hold toward realistic proportions without re-authoring all 38 placements.
 */
const HOLD_SCALE = 0.55;

const holdTypeById: Record<string, HoldType> = Object.fromEntries(holdTypes.map((ht) => [ht.id, ht]));

export interface SceneApi {
  zoomBy: (factor: number) => void;
}

interface CameraRigProps {
  /** World-space hold position to focus, or null for the overview. */
  focus: [number, number, number] | null;
  enableZoom: boolean;
  rotateSpeed: number;
  apiRef?: MutableRefObject<SceneApi | null>;
  /** Called when the user finishes an orbit gesture (timestamp ms). */
  onInteractEnd?: (timeMs: number) => void;
}

/** Damped camera tween + OrbitControls with idle auto-rotate. */
function CameraRig({ focus, enableZoom, rotateSpeed, apiRef, onInteractEnd }: CameraRigProps) {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const { camera } = useThree();
  const anim = useRef({ active: true, interacting: false, lastInteract: 0 });

  const goal = useMemo(() => {
    if (focus) {
      const [x, y] = focus;
      return {
        pos: new THREE.Vector3(x + 0.85, y + 0.3, 2.55),
        target: new THREE.Vector3(x, y, 0.1),
      };
    }
    return { pos: DEFAULT_POS.clone(), target: DEFAULT_TARGET.clone() };
  }, [focus]);

  useEffect(() => {
    anim.current.active = true;
  }, [goal]);

  useEffect(() => {
    if (!apiRef) return;
    apiRef.current = {
      zoomBy(factor: number) {
        const c = controlsRef.current;
        if (!c) return;
        const off = camera.position.clone().sub(c.target);
        off.setLength(THREE.MathUtils.clamp(off.length() * factor, 3, 12));
        camera.position.copy(c.target).add(off);
        anim.current.active = false;
        anim.current.lastInteract = performance.now();
      },
    };
    return () => {
      apiRef.current = null;
    };
  }, [apiRef, camera]);

  useFrame((_, dt) => {
    const c = controlsRef.current;
    if (!c) return;
    const a = anim.current;
    const idle = performance.now() - a.lastInteract > 3000;
    c.autoRotate = !focus && idle && !a.interacting && !a.active;
    if (a.active && !a.interacting) {
      const k = 1 - Math.exp(-3.4 * Math.min(dt, 0.1)); // ease-out approach, ~1.2s
      camera.position.lerp(goal.pos, k);
      c.target.lerp(goal.target, k);
      if (camera.position.distanceTo(goal.pos) < 0.03 && c.target.distanceTo(goal.target) < 0.02) {
        a.active = false;
      }
    }
    c.update();
  });

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      target={DEFAULT_TARGET.toArray()}
      enableDamping
      dampingFactor={0.08}
      rotateSpeed={rotateSpeed}
      minDistance={3}
      maxDistance={12}
      maxPolarAngle={1.5}
      enablePan={false}
      enableZoom={enableZoom}
      autoRotateSpeed={1.2}
      onStart={() => {
        anim.current.interacting = true;
        anim.current.active = false;
      }}
      onEnd={() => {
        anim.current.interacting = false;
        anim.current.lastInteract = performance.now();
        onInteractEnd?.(performance.now());
      }}
    />
  );
}

/** Wall slab: box with a 15 deg outward lean above y=4.3 + subtle front-face grain. */
function WallMesh({ onClick }: { onClick: (e: ThreeEvent<MouseEvent>) => void }) {
  const geometry = useMemo(() => {
    const geo = new THREE.BoxGeometry(WALL_W, WALL_H, WALL_T, 4, 24, 1);
    const pos = geo.attributes.position as THREE.BufferAttribute;
    const p = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      p.fromBufferAttribute(pos, i);
      const worldY = p.y + WALL_CY;
      if (worldY > LEAN_START) {
        p.z += (worldY - LEAN_START) * LEAN_TAN;
      }
      if (p.z > 0) {
        p.z += 0.008 * (Math.sin(p.x * 9.1 + p.y * 5.3) * 0.6 + Math.sin(p.y * 13.7 + 2.1) * 0.4);
      }
      pos.setXYZ(i, p.x, p.y, p.z);
    }
    pos.needsUpdate = true;
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <mesh geometry={geometry} position={[0, WALL_CY, -WALL_T / 2]} receiveShadow onClick={onClick}>
      <meshStandardMaterial color="#B8A88F" roughness={0.95} metalness={0.02} />
    </mesh>
  );
}

/**
 * The climb line of one route, drawn through its own holds in order. This
 * replaces the two purely decorative vertical tape strips that used to run up
 * the wall: they read as "what is that stripe for?" because they had no
 * relationship to any route.
 */
function RoutePath({
  route,
  visible,
  emphasized,
}: {
  route: WallRoute;
  visible: boolean;
  emphasized: boolean;
}) {
  const geometry = useMemo(() => {
    const pts = wallHolds
      .filter((h) => h.routeTag === route.id)
      .sort((a, b) => a.position[1] - b.position[1])
      .map((h) => new THREE.Vector3(h.position[0], h.position[1], 0.035));
    if (pts.length < 2) return null;
    const curve = new THREE.CatmullRomCurve3(pts, false, 'catmullrom', 0.35);
    return new THREE.TubeGeometry(curve, pts.length * 10, 0.016, 6, false);
  }, [route.id]);

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(route.color),
        roughness: 0.7,
        transparent: true,
        opacity: 0.5,
      }),
    [route.color],
  );
  useEffect(() => () => material.dispose(), [material]);
  useEffect(() => () => geometry?.dispose(), [geometry]);

  useFrame((_, dt) => {
    const target = !visible ? 0.08 : emphasized ? 0.95 : 0.42;
    material.opacity = THREE.MathUtils.damp(material.opacity, target, 8, dt);
  });

  if (!geometry) return null;
  return <mesh geometry={geometry} material={material} />;
}

interface WallHoldMeshProps {
  hold: WallHold;
  hovered: boolean;
  selected: boolean;
  highlighted: boolean;
  dimmed: boolean;
  onSelect: (id: number) => void;
  onHover: (id: number | null) => void;
}

function WallHoldMesh({
  hold,
  hovered,
  selected,
  highlighted,
  dimmed,
  onSelect,
  onHover,
}: WallHoldMeshProps) {
  const type = holdTypeById[hold.holdTypeId];
  if (!type) return null;
  return (
    <group position={hold.position} rotation={hold.rotation}>
      <HoldModel
        type={type}
        color={hold.color}
        size={hold.size * HOLD_SCALE}
        hovered={hovered}
        selected={selected}
        highlighted={highlighted}
        dimmed={dimmed}
        onClick={(e) => {
          e.stopPropagation();
          if (e.delta > 6) return; // ignore the click that ends an orbit drag
          onSelect(hold.id);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(hold.id);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          onHover(null);
          document.body.style.cursor = '';
        }}
      />
      {hovered && (
        <Html
          center
          position={[0, 0.42 * hold.size * HOLD_SCALE + 0.13, 0.1]}
          distanceFactor={9}
          style={{ pointerEvents: 'none' }}
        >
          <div className="whitespace-nowrap rounded-full border border-chalk/30 bg-ink/85 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-chalk shadow-lg">
            {type.nameEn} #{String(hold.id).padStart(2, '0')}
          </div>
        </Html>
      )}
    </group>
  );
}

export interface WallSceneProps {
  selectedId: number | null;
  hoveredId: number | null;
  /** Active route filter (route id) or null. */
  routeFilter: string | null;
  /** Active hold-type focus (?focus= / legend tour) or null. */
  typeFocus: string | null;
  /** Hold id the camera should fly to (selected or tour stop). */
  focusHoldId: number | null;
  enableZoom: boolean;
  rotateSpeed: number;
  dpr: [number, number];
  apiRef?: MutableRefObject<SceneApi | null>;
  onSelect: (id: number | null) => void;
  onHover: (id: number | null) => void;
}

/** Full R3F canvas for /wall-3d. Mount lazily (viewport) via the page. */
export default function WallScene({
  selectedId,
  hoveredId,
  routeFilter,
  typeFocus,
  focusHoldId,
  enableZoom,
  rotateSpeed,
  dpr,
  apiRef,
  onSelect,
  onHover,
}: WallSceneProps) {
  const filterActive = routeFilter !== null || typeFocus !== null;
  const focusHold = focusHoldId !== null ? wallHolds.find((h) => h.id === focusHoldId) : undefined;
  // Suppress click-deselect right after an orbit drag (pointerup lands on the wall).
  const lastOrbitEnd = useRef(0);
  const deselectIfClick = (delta: number) => {
    if (delta <= 6 && performance.now() - lastOrbitEnd.current > 250) onSelect(null);
  };

  return (
    <Canvas
      shadows
      dpr={dpr}
      camera={{ position: DEFAULT_POS.toArray(), fov: 45, near: 0.1, far: 60 }}
      gl={{ alpha: true, antialias: true }}
      style={{ width: '100%', height: '100%' }}
      onPointerMissed={() => {
        if (performance.now() - lastOrbitEnd.current > 250) onSelect(null);
      }}
    >
      {/* Museum lighting: warm key from upper-left, clay fill, hemisphere base */}
      <ambientLight intensity={0.4} color="#FFF3E8" />
      <hemisphereLight intensity={0.35} color="#F4EFE6" groundColor="#2B2620" />
      <directionalLight
        position={[-4, 7, 6]}
        intensity={1.2}
        color="#FFE8D6"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-4}
        shadow-camera-right={4}
        shadow-camera-top={6}
        shadow-camera-bottom={-2}
      />
      <directionalLight position={[4, 1, 4]} intensity={0.3} color="#C96F4A" />

      <WallMesh onClick={(e) => deselectIfClick(e.delta)} />

      {/* Base platform */}
      <mesh position={[0, -0.09, 0.8]} receiveShadow onClick={(e) => deselectIfClick(e.delta)}>
        <boxGeometry args={[6.4, 0.18, 3]} />
        <meshStandardMaterial color="#D9CBB5" roughness={0.9} />
      </mesh>

      {/* Route paths: the actual line each route takes up the wall. */}
      {wallRoutes.map((route) => (
        <RoutePath
          key={route.id}
          route={route}
          visible={routeFilter === null || routeFilter === route.id}
          emphasized={routeFilter === route.id}
        />
      ))}

      {wallHolds.map((hold) => {
        const onRoute = routeFilter !== null && hold.routeTag === routeFilter;
        const onType = typeFocus !== null && hold.holdTypeId === typeFocus;
        const lit = onRoute || onType;
        return (
          <WallHoldMesh
            key={hold.id}
            hold={hold}
            hovered={hoveredId === hold.id}
            selected={selectedId === hold.id}
            highlighted={filterActive && lit}
            dimmed={filterActive && !lit}
            onSelect={onSelect}
            onHover={onHover}
          />
        );
      })}

      <ContactShadows position={[0, 0.005, 0.6]} opacity={0.45} scale={9} blur={2.4} far={5} color="#2B2620" />

      <CameraRig
        focus={focusHold ? focusHold.position : null}
        enableZoom={enableZoom}
        rotateSpeed={rotateSpeed}
        apiRef={apiRef}
        onInteractEnd={(ms) => {
          lastOrbitEnd.current = ms;
        }}
      />
    </Canvas>
  );
}
