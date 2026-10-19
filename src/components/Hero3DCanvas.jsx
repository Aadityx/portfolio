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
    camera.position.z = 6.2;

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
      renderer.toneMappingExposure = 1.25;
      container.appendChild(renderer.domElement);
    } catch {
      return;
    }

    // Main 3D Globe Root Group
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // 1. Dark Lustrous Core Sphere
    const coreRadius = 1.85;
    const coreGeometry = new THREE.SphereGeometry(coreRadius, 48, 48);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x07090e,
      metalness: 0.88,
      roughness: 0.22,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    globeGroup.add(coreMesh);

    // 2. Cybernetic Latitude & Longitude Wireframe Grid
    const gridGeometry = new THREE.SphereGeometry(coreRadius + 0.02, 32, 16);
    const gridMaterial = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const gridMesh = new THREE.Mesh(gridGeometry, gridMaterial);
    globeGroup.add(gridMesh);

    // 3. Fibonacci Spherical Node Points (Digital Surface Constellation)
    const nodeCount = 550;
    const nodeGeometry = new THREE.BufferGeometry();
    const nodePositions = new Float32Array(nodeCount * 3);
    const nodeColors = new Float32Array(nodeCount * 3);

    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle
    const primaryColor = new THREE.Color(0x38bdf8);
    const accentColor = new THREE.Color(0x818cf8);
    const highlightColor = new THREE.Color(0xffffff);

    for (let i = 0; i < nodeCount; i++) {
      const y = 1 - (i / (nodeCount - 1)) * 2; // -1 to 1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const r = coreRadius + 0.04;
      const x = Math.cos(theta) * radiusAtY * r;
      const z = Math.sin(theta) * radiusAtY * r;
      const py = y * r;

      nodePositions[i * 3] = x;
      nodePositions[i * 3 + 1] = py;
      nodePositions[i * 3 + 2] = z;

      // Color variation across nodes
      let c;
      const rand = Math.random();
      if (rand > 0.85) c = highlightColor;
      else if (rand > 0.45) c = primaryColor;
      else c = accentColor;

      nodeColors[i * 3] = c.r;
      nodeColors[i * 3 + 1] = c.g;
      nodeColors[i * 3 + 2] = c.b;
    }

    nodeGeometry.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));
    nodeGeometry.setAttribute('color', new THREE.BufferAttribute(nodeColors, 3));

    const nodeMaterial = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const nodePoints = new THREE.Points(nodeGeometry, nodeMaterial);
    globeGroup.add(nodePoints);

    // 4. Subtle Outer Atmosphere Fresnel Glow Ring
    const haloGeometry = new THREE.SphereGeometry(coreRadius + 0.12, 32, 32);
    const haloMaterial = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.06,
      side: THREE.BackSide,
    });
    const haloMesh = new THREE.Mesh(haloGeometry, haloMaterial);
    globeGroup.add(haloMesh);

    // 5. Elegant Orbital Rings
    const ringGroup = new THREE.Group();
    globeGroup.add(ringGroup);

    // Ring 1: Primary Celestial Ring
    const ringGeom1 = new THREE.TorusGeometry(2.55, 0.015, 16, 120);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.4,
    });
    const ring1 = new THREE.Mesh(ringGeom1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    ringGroup.add(ring1);

    // Ring 2: Secondary Elliptical Ring
    const ringGeom2 = new THREE.TorusGeometry(2.9, 0.01, 16, 120);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      transparent: true,
      opacity: 0.25,
    });
    const ring2 = new THREE.Mesh(ringGeom2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 5;
    ringGroup.add(ring2);

    // Ring 3: Satellite Beacon
    const beaconGeometry = new THREE.SphereGeometry(0.045, 16, 16);
    const beaconMaterial = new THREE.MeshBasicMaterial({
      color: 0x7dd3fc,
    });
    const beaconMesh = new THREE.Mesh(beaconGeometry, beaconMaterial);
    globeGroup.add(beaconMesh);

    // 6. Ambient Micro-Starfield in Depth
    const starCount = 220;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 11;
      starPositions[i + 1] = (Math.random() - 0.5) * 10;
      starPositions[i + 2] = (Math.random() - 0.5) * 8 - 1;
    }
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 0.03,
      color: 0x94a3b8,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Lighting Design
    const ambientLight = new THREE.AmbientLight(0x0a101d, 2.2);
    scene.add(ambientLight);

    // Key directional light (crisp upper-right)
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
    keyLight.position.set(6, 6, 5);
    scene.add(keyLight);

    // Rim light (cool electric blue from lower-left edge)
    const rimLight = new THREE.DirectionalLight(0x38bdf8, 3.0);
    rimLight.position.set(-6, -4, -1);
    scene.add(rimLight);

    // Subtle fill light
    const fillLight = new THREE.DirectionalLight(0x818cf8, 1.4);
    fillLight.position.set(0, -5, 4);
    scene.add(fillLight);

    // Interactive pointer-following Point Light
    const cursorLight = new THREE.PointLight(0x67e8f9, 3.5, 9);
    cursorLight.position.set(0, 0, 3.5);
    scene.add(cursorLight);

    // Pointer, Lerp & Scroll Handlers
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let scrollOffset = 0;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.targetX = Math.max(-1, Math.min(1, x));
      mouse.targetY = Math.max(-1, Math.min(1, y));
    };

    const handleScroll = () => {
      scrollOffset = window.scrollY * 0.0008;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

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

    // Visibility Observer to pause render when offscreen
    let isVisible = true;
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();
    let beaconAngle = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const delta = clock.getDelta();

      // Smooth mouse coordinates lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Update cursor point light in 3D space
      cursorLight.position.x = mouse.x * 4;
      cursorLight.position.y = mouse.y * 3.5;

      // Satellite beacon orbit along Ring 1
      beaconAngle += delta * 0.8;
      const orbitR = 2.55;
      const bx = Math.cos(beaconAngle) * orbitR;
      const bz = Math.sin(beaconAngle) * orbitR;
      beaconMesh.position.set(
        bx,
        bz * Math.sin(Math.PI / 3),
        bz * Math.cos(Math.PI / 3)
      );

      if (!prefersReducedMotion) {
        // Continuous smooth axial rotation
        globeGroup.rotation.y += delta * 0.18;
        gridMesh.rotation.y += delta * 0.05;
        nodePoints.rotation.y += delta * 0.18;

        // Differential orbital ring speeds
        ring1.rotation.z += delta * 0.15;
        ring2.rotation.z -= delta * 0.12;

        // Subtle background stars drift
        stars.rotation.y += delta * 0.02;

        // Pointer-based interactive tilt with inertia
        const targetRotX = -mouse.y * 0.45 + scrollOffset;
        const targetRotZ = mouse.x * 0.2;
        globeGroup.rotation.x += (targetRotX - globeGroup.rotation.x) * 0.06;
        globeGroup.rotation.z += (targetRotZ - globeGroup.rotation.z) * 0.06;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup function
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Dispose resources
      coreGeometry.dispose();
      coreMaterial.dispose();
      gridGeometry.dispose();
      gridMaterial.dispose();
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      haloGeometry.dispose();
      haloMaterial.dispose();
      ringGeom1.dispose();
      ringMat1.dispose();
      ringGeom2.dispose();
      ringMat2.dispose();
      beaconGeometry.dispose();
      beaconMaterial.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
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
      aria-label="Interactive 3D digital globe visual experience"
    />
  );
}

export default Hero3DCanvas;
