import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { ThreeEvent } from '@react-three/fiber';
import type { HoldType } from '@/data/holds';
import { getHoldParts } from './holdGeometry';

interface HoldModelProps {
  type: HoldType;
  /** Base color override (wall holds use their route color). */
  color?: string;
  /** Uniform scale (wall: hold.size 0.7-1.3; specimen: display scale). */
  size?: number;
  hovered?: boolean;
  selected?: boolean;
  /** Soft glow for holds matching the active route/type filter. */
  highlighted?: boolean;
  /** Darken + desaturate when another route/type filter is active. */
  dimmed?: boolean;
  onClick?: (e: ThreeEvent<MouseEvent>) => void;
  onPointerOver?: (e: ThreeEvent<PointerEvent>) => void;
  onPointerOut?: (e: ThreeEvent<PointerEvent>) => void;
}

/**
 * One procedural climbing hold: cached shared geometry parts + one
 * MeshStandardMaterial instance. All hover/select/dim transitions are
 * damped per-frame (no React re-renders).
 */
export default function HoldModel({
  type,
  color,
  size = 1,
  hovered = false,
  selected = false,
  highlighted = false,
  dimmed = false,
  onClick,
  onPointerOver,
  onPointerOut,
}: HoldModelProps) {
  const group = useRef<THREE.Group>(null);
  const parts = getHoldParts(type);

  const baseColor = useMemo(() => new THREE.Color(color ?? type.color), [color, type.color]);
  // Filtered-out holds recede toward the wall tone and go translucent rather
  // than darkening: dark holds on a lit wall read as "burnt", which made the
  // whole scene look duller than the unfiltered view.
  const dimColor = useMemo(
    () => baseColor.clone().lerp(new THREE.Color('#B0A28C'), 0.78),
    [baseColor],
  );
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: baseColor.clone(),
        roughness: 0.8,
        metalness: 0.04,
        emissive: baseColor.clone(),
        emissiveIntensity: 0,
        // Declared up front so toggling a filter never recompiles the shader.
        transparent: true,
        opacity: 1,
      }),
    [baseColor],
  );
  useEffect(() => () => material.dispose(), [material]);

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    const clock = state.clock.elapsedTime;
    // Hover spring (scale 1 -> 1.08)
    const targetScale = size * (hovered ? 1.08 : 1);
    g.scale.setScalar(THREE.MathUtils.damp(g.scale.x, targetScale, 12, dt));
    // Emissive: hover glow / selected breathing pulse / route highlight
    const targetEmissive = selected
      ? 0.3 + 0.12 * Math.sin(clock * 3)
      : hovered
        ? 0.35
        : highlighted
          ? 0.16
          : 0;
    material.emissiveIntensity = THREE.MathUtils.damp(
      material.emissiveIntensity,
      targetEmissive,
      10,
      dt,
    );
    // Route/type filter dimming
    const k = 1 - Math.exp(-8 * dt);
    material.color.lerp(dimmed ? dimColor : baseColor, k);
    material.opacity = THREE.MathUtils.damp(material.opacity, dimmed ? 0.4 : 1, 8, dt);
  });

  return (
    <group
      ref={group}
      scale={size}
      onClick={onClick}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
      {parts.map((geo, i) => (
        <mesh key={i} geometry={geo} material={material} castShadow receiveShadow />
      ))}
    </group>
  );
}
