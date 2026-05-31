import React, { useRef, useState, Suspense, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

/* ── Constants ──────────────────────────────────────────── */
const MODEL_PATH = '/assets/models/scene.glb';
const BRAND_BLUE = new THREE.Color('#0052FF');

// Stretch limits
const SQUISH_MIN  = 0.15;   // min Y scale (max compression)
const STRETCH_MAX = 2.5;    // max X/Z scale when fully squished
const LERP_SPEED  = 0.06;   // animation smoothness

// Auto rotation
const AUTO_ROTATE = 0.2;

/* ── Scroll progress store (no re-renders) ─────────────── */
const scrollState = { progress: 0 };

/* ══════════════════════════════════════════════════════════
   ScrollSquishModel
   ──────────────────────────────────────────────────────────
   As user scrolls down, the model gets squished between
   the navbar (top) and the bottom edge of the Hero section.
   Y-axis compresses, X/Z axes stretch to compensate.
   ══════════════════════════════════════════════════════════ */
function ScrollSquishModel() {
  const { scene } = useGLTF(MODEL_PATH, '/draco/');
  const groupRef = useRef();
  const angle = useRef(0);
  const smooth = useRef({ sx: 1, sy: 1, sz: 1 });

  // Mesh cache for glow
  const meshes = useMemo(() => {
    const list = [];
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        list.push({
          mesh: child,
          origEm: child.material.emissive?.clone() || new THREE.Color(0, 0, 0),
          origIn: child.material.emissiveIntensity || 0,
        });
      }
    });
    return list;
  }, [scene]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const g = groupRef.current;
    const dt = Math.min(delta, 0.05);

    // ── Scroll-based compression ──
    // progress: 0 = top (no squish), 1 = fully scrolled past hero (max squish)
    const p = scrollState.progress;

    // Use an eased curve for more dramatic feel
    const t = p * p; // quadratic ease-in

    // Scale targets
    const targetSY = THREE.MathUtils.lerp(1, SQUISH_MIN, t);
    const targetSX = THREE.MathUtils.lerp(1, STRETCH_MAX, t);
    const targetSZ = THREE.MathUtils.lerp(1, 1 + t * 1.2, t);

    // Smooth lerp
    const s = smooth.current;
    s.sx += (targetSX - s.sx) * LERP_SPEED * dt * 60;
    s.sy += (targetSY - s.sy) * LERP_SPEED * dt * 60;
    s.sz += (targetSZ - s.sz) * LERP_SPEED * dt * 60;

    g.scale.set(s.sx, s.sy, s.sz);

    // Auto rotate (slower when squished)
    angle.current += dt * AUTO_ROTATE * (1 - t * 0.7);
    g.rotation.y = angle.current;

    // ── Glow intensifies with compression ──
    for (let i = 0; i < meshes.length; i++) {
      const { mesh, origEm, origIn } = meshes[i];
      const mat = mesh.material;
      if (!mat.emissive) continue;
      mat.emissive.lerp(t > 0.1 ? BRAND_BLUE : origEm, 0.04);
      mat.emissiveIntensity = THREE.MathUtils.lerp(
        mat.emissiveIntensity,
        t > 0.1 ? origIn + t * 0.6 : origIn,
        0.04
      );
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
}

/* ── Loading ───────────────────────────────────────────── */
function LoadingFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-4 h-4 rounded-full bg-accentBlue animate-pulse"
           style={{ boxShadow: '0 0 30px rgba(0,82,255,0.6)' }} />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   HeroModel — scroll-driven elastic 3D model
   ══════════════════════════════════════════════════════════ */
export default function HeroModel() {
  const containerRef = useRef(null);
  const [inView, setInView] = useState(false);

  // Lazy load
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Scroll tracking: measure how much of the Hero section has been scrolled past
  useEffect(() => {
    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;

      // Find the parent Hero section
      const hero = el.closest('section');
      if (!hero) return;

      const rect = hero.getBoundingClientRect();
      const heroHeight = rect.height;
      const navbarHeight = 80; // approximate navbar height

      // How much of the hero has scrolled above the viewport
      // 0 = hero fully visible, 1 = hero fully scrolled away
      const scrolled = -rect.top;
      const available = heroHeight - navbarHeight;
      const progress = THREE.MathUtils.clamp(scrolled / available, 0, 1);

      scrollState.progress = progress;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initial
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-10">
      {inView ? (
        <Suspense fallback={<LoadingFallback />}>
          <Canvas
            camera={{ position: [0, 0, 5], fov: 45 }}
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            style={{ background: 'transparent' }}
          >
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1.2} />
            <ScrollSquishModel />
          </Canvas>
        </Suspense>
      ) : (
        <LoadingFallback />
      )}
    </div>
  );
}

useGLTF.preload(MODEL_PATH, '/draco/');
