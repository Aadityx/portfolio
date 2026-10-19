import { useEffect, useState } from 'react';

function AmbientBackground() {
  const [mousePos, setMousePos] = useState({ x: -500, y: -500 });
  const [isTouchOrReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    const touch = 'ontouchstart' in window || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0);
    const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return Boolean(touch || reducedMotion);
  });

  useEffect(() => {
    if (isTouchOrReducedMotion) {
      return;
    }

    let rafId;
    let targetX = -500;
    let targetY = -500;
    let currentX = -500;
    let currentY = -500;

    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const updatePosition = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      setMousePos({ x: currentX, y: currentY });
      rafId = requestAnimationFrame(updatePosition);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [isTouchOrReducedMotion]);

  return (
    <>
      {/* Fixed Grid Floor Pattern */}
      <div className="bg-grid-pattern" aria-hidden="true" />

      {/* Atmospheric Ambient Glows */}
      <div className="ambient-glow ambient-glow-1" aria-hidden="true" />
      <div className="ambient-glow ambient-glow-2" aria-hidden="true" />
      <div className="ambient-glow ambient-glow-3" aria-hidden="true" />

      {/* Interactive Cursor Spotlight (Desktop only) */}
      {!isTouchOrReducedMotion && (
        <div
          aria-hidden="true"
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            transform: `translate3d(${mousePos.x - 300}px, ${mousePos.y - 300}px, 0)`,
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(56, 189, 248, 0.06), transparent 70%)',
            pointerEvents: 'none',
            zIndex: 1,
            willChange: 'transform',
          }}
        />
      )}
    </>
  );
}

export default AmbientBackground;
