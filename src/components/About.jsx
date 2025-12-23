import '../styles/about.css';

function About() {
  return (
    <section className="about" id="about">
  <div className="about-container">
    <div className="about-columns">
      <div className="about-left">
        <h2>About Me</h2>
        <p>
          Hi, I’m <strong>Aadityx</strong>, a front-end developer passionate about building modern and responsive web applications. 
          I enjoy creating interactive, visually appealing websites that provide excellent user experiences.
        </p>
      </div>
      <div className="about-right">
        <h2>Education</h2>
        <ul className="education-list">
          <li>
            <strong>Fr. Agnel Central School - Pilar, Goa</strong><br />
            Completed my basic education from this school.
          </li>
          <li>
            <strong>Marathwada Mitra Mandal Polytechnic</strong><br />
            Completed my diploma in Computer Engineering from this college.
          </li>
          <li>
            <strong>DYP DPGU School of Technology and Research</strong><br />
            Completed my B.Tech from this college.
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>

  );
}

export default About;
