import '../styles/hero.css';
import myPhoto from '../assets/pfp.jpg'; 

function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-container">
        <div className="hero-image">
          <img src={myPhoto} alt="Aadityx" />
        </div>
        <div className="hero-info">
          <h1>Hi, I'm Aadityx</h1>
          <p>
            I am a front-end developer passionate about creating modern, responsive, and interactive websites.
          </p>
          <a href="#projects" className="btn">See My Work</a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
