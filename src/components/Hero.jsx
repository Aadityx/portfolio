import '../styles/hero.css';
import myPhoto from '../assets/pfp.JPG'; 

function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-container">
        <div className="hero-image">
          <img src={myPhoto} alt="Aadityx" />
        </div>
        <div className="hero-info">
          <h1>Hi, I'm Aaditya</h1>
          <p>
            I am an aspiring full stack developer passionate about developing modern, responsive, 
            and interactive web applications while continuously improving both frontend and backend 
            skills.
            </p>
          <a href="#projects" className="btn">See My Work</a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
