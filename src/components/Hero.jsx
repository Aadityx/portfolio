import { useState, useRef, lazy, Suspense } from 'react';
import { ArrowDownRight, Sparkles, Send, Code, Layers } from 'lucide-react';
import '../styles/hero.css';
import myPhoto from '../assets/pfp.JPG';

const Hero3DCanvas = lazy(() => import('./Hero3DCanvas'));

function Hero() {
  const [cardTransform, setCardTransform] = useState('');
  const photoCardRef = useRef(null);

  // Subtle 3D tilt interaction for the profile card
  const handleMouseMove = (e) => {
    if (!photoCardRef.current) return;
    const rect = photoCardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / rect.height) * 15;
    const rotateY = (x / rect.width) * 15;
    setCardTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
  };

  const handleMouseLeave = () => {
    setCardTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  return (
    <section className="hero" id="hero">
      <div className="hero-background-fx">
        <div className="hero-grid-radial" />
        <div className="hero-glow-blob" />
      </div>

      <div className="container hero-container">
        {/* Left Column: Editorial Introduction & CTAs */}
        <div className="hero-info">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            <Sparkles size={13} className="hero-badge-icon" />
            <span>Aspiring Full Stack Developer</span>
          </div>

          <h1 className="hero-title">
            Hi, I'm <span className="gradient-text">Aaditya</span>
          </h1>

          <p className="hero-description">
            I am an aspiring full stack developer passionate about developing modern, responsive, 
            and interactive web applications while continuously improving both frontend and backend 
            skills.
          </p>

          <div className="hero-actions">
            <a href="#projects" className="btn-primary">
              <span>See My Work</span>
              <ArrowDownRight size={18} />
            </a>
            <a href="#contact" className="btn-secondary">
              <span>Get In Touch</span>
              <Send size={16} />
            </a>
          </div>

          {/* Quick Specialization Highlights */}
          <div className="hero-highlights">
            <div className="highlight-item">
              <Code size={16} className="highlight-icon" />
              <span>Full-Stack Development</span>
            </div>
            <div className="highlight-item">
              <Layers size={16} className="highlight-icon" />
              <span>Modern Web Experiences</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive 3D Showcase & Profile Image */}
        <div className="hero-visual">
          <div className="hero-3d-wrapper">
            <Suspense fallback={
              <div className="hero-3d-fallback">
                <div className="fallback-orb-1" />
                <div className="fallback-orb-2" />
              </div>
            }>
              <Hero3DCanvas />
            </Suspense>
          </div>

          {/* Luxury Profile Capsule */}
          <div
            ref={photoCardRef}
            className="hero-profile-card glass-panel"
            style={{ transform: cardTransform }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="hero-image">
              <img src={myPhoto} alt="Aadityx" />
              <div className="image-specular-glare" />
            </div>

            <div className="profile-tag">
              <span className="profile-name">Aadityx</span>
              <span className="profile-role">Web Developer</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
