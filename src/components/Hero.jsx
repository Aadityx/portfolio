import { lazy, Suspense } from 'react';
import { ArrowDownRight, Sparkles, Send, Code, Layers } from 'lucide-react';
import '../styles/hero.css';
import myPhoto from '../assets/pfp.jpeg';

const Hero3DCanvas = lazy(() => import('./Hero3DCanvas'));

function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-background-fx">
        <div className="hero-grid-radial" />
        <div className="hero-glow-blob" />
      </div>

      <div className="container hero-container">
        {/* Left Column: Clean Editorial Introduction & CTAs */}
        <div className="hero-info">
          {/* Author Badge & Status */}
          <div className="hero-author-pill">
            <div className="author-avatar-wrap">
              <img src={myPhoto} alt="Aaditya" className="author-avatar" />
              <span className="author-pulse-dot" />
            </div>
            <div className="author-meta">
              <span className="author-name">Aaditya</span>
              <span className="author-sep">•</span>
              <span className="author-status">Open to opportunities</span>
            </div>
          </div>

          <div className="hero-heading-group">
            <span className="hero-subheading">Full-Stack Web Developer</span>
            <h1 className="hero-title">
              Hi, I'm <span className="gradient-text">Aaditya</span>
            </h1>
          </div>

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

          {/* Specialization Highlights */}
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

        {/* Right Column: Unobstructed 3D Globe Centerpiece */}
        <div className="hero-visual">
          <div className="hero-globe-aura" />
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
        </div>
      </div>
    </section>
  );
}

export default Hero;
