import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

function checkWebGl() {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

function Hero3DCanvas() {
  const containerRef = useRef(null);
  const [webGlSupported] = useState(checkWebGl);

  useEffect(() => {
    if (!webGlSupported) return;
    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.z = 6;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
      container.appendChild(renderer.domElement);
    } catch {
      return;
    }

    // Main 3D Object Group
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Core Faceted Geometric Shape (Icosahedron with metallic reflection)
    const coreGeometry = new THREE.IcosahedronGeometry(1.6, 1);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x111622,
      metalness: 0.92,
      roughness: 0.18,
      wireframe: false,
      flatShading: true,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    mainGroup.add(coreMesh);

    // 2. Wireframe Cage with Cyan Accent
    const wireframeGeometry = new THREE.IcosahedronGeometry(1.62, 1);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const wireframeMesh = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    mainGroup.add(wireframeMesh);

    // 3. Orbiting Rings
    const ringGroup = new THREE.Group();
    mainGroup.add(ringGroup);

    const ringMaterial1 = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const ringGeom1 = new THREE.TorusGeometry(2.3, 0.02, 16, 100);
    const ring1 = new THREE.Mesh(ringGeom1, ringMaterial1);
    ring1.rotation.x = Math.PI / 3;
    ringGroup.add(ring1);

    const ringMaterial2 = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const ringGeom2 = new THREE.TorusGeometry(2.7, 0.015, 16, 100);
    const ring2 = new THREE.Mesh(ringGeom2, ringMaterial2);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    ringGroup.add(ring2);

    // 4. Floating Micro-particle Cloud
    const particleCount = 200;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 8;
      particlePositions[i + 1] = (Math.random() - 0.5) * 8;
      particlePositions[i + 2] = (Math.random() - 0.5) * 6;
    }

    particleGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(particlePositions, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.04,
      color: 0x67e8f9,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Lighting Setup
    const ambientLight = new THREE.AmbientLight(0x0a101d, 2.5);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.5);
    keyLight.position.set(5, 5, 5);
    scene.add(keyLight);

    const blueLight = new THREE.DirectionalLight(0x38bdf8, 2.8);
    blueLight.position.set(-5, -3, 3);
    scene.add(blueLight);

    // Interactive pointer-following Point Light
    const cursorLight = new THREE.PointLight(0x67e8f9, 4, 8);
    cursorLight.position.set(0, 0, 3);
    scene.add(cursorLight);

    // Pointer coordinates & Lerp interpolation
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.targetX = Math.max(-1, Math.min(1, x));
      mouse.targetY = Math.max(-1, Math.min(1, y));
    };

    window.addEventListener('pointermove', handlePointerMove);

    // Responsive Resize Handler
    const handleResize = () => {
      if (!container || !renderer) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Visibility & Scroll Observer to pause render when not in view
    let isVisible = true;
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    intersectionObserver.observe(container);

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const delta = clock.getDelta();

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Update cursor light position in 3D
      cursorLight.position.x = mouse.x * 3.5;
      cursorLight.position.y = mouse.y * 3.5;

      if (!prefersReducedMotion) {
        // Base rotations
        coreMesh.rotation.y += delta * 0.25;
        coreMesh.rotation.x += delta * 0.15;
        wireframeMesh.rotation.y += delta * 0.25;
        wireframeMesh.rotation.x += delta * 0.15;

        ring1.rotation.z += delta * 0.35;
        ring2.rotation.z -= delta * 0.25;
        particles.rotation.y += delta * 0.05;

        // Interactive tilt based on pointer
        mainGroup.rotation.y = mouse.x * 0.6;
        mainGroup.rotation.x = -mouse.y * 0.6;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup function
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Dispose geometries & materials
      coreGeometry.dispose();
      coreMaterial.dispose();
      wireframeGeometry.dispose();
      wireframeMaterial.dispose();
      ringGeom1.dispose();
      ringMaterial1.dispose();
      ringGeom2.dispose();
      ringMaterial2.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, [webGlSupported]);

  if (!webGlSupported) {
    return (
      <div className="hero-3d-fallback">
        <div className="fallback-orb-1" />
        <div className="fallback-orb-2" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="hero-3d-canvas-container"
      aria-label="Interactive 3D geometric visual representation"
    />
  );
}

export default Hero3DCanvas;
