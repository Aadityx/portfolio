import { GraduationCap, Code2, Compass } from 'lucide-react';
import '../styles/about.css';

function About() {
  const highlights = [
    {
      icon: <GraduationCap size={22} className="about-pill-icon" />,
      title: "Academic Background",
      desc: "Computer Engineering B.Tech undergraduate with Diploma in Computer Engineering."
    },
    {
      icon: <Code2 size={22} className="about-pill-icon" />,
      title: "Full-Stack Development",
      desc: "Hands-on front-end development with deep curiosity and focus on backend architectures."
    },
    {
      icon: <Compass size={22} className="about-pill-icon" />,
      title: "Continuous Exploration",
      desc: "Active learner diving into prompt engineering, modern web tools, and full-stack engineering."
    }
  ];

  return (
    <section id="about" className="section-wrapper about-section">
      <div className="container">
        <div className="section-header">
          <div className="section-kicker">01 / IDENTITY & VISION</div>
          <h2 className="section-title">About Me</h2>
          <div className="section-divider" />
        </div>

        <div className="about-grid">
          {/* Main Story Panel */}
          <div className="about-story glass-panel">
            <div className="story-inner">
              <p className="about-main-text">
                I’m Aaditya, a Computer Engineering undergraduate pursuing a B.Tech, 
                with a Diploma in Computer Engineering. 
                I am a full-stack-oriented web developer with hands-on experience in front-end development 
                and a strong interest in backend technologies.
                I enjoy building clean, responsive, and interactive web applications 
                that focus on both visual appeal and user experience. 
                I’m continuously learning modern web technologies, 
                exploring prompt engineering, and expanding my skill set 
                to grow into a well-rounded full-stack engineer.
              </p>
            </div>
          </div>

          {/* Key Facets Grid */}
          <div className="about-pillars">
            {highlights.map((item, index) => (
              <div className="about-pillar-card glass-panel" key={index}>
                <div className="pillar-icon-box">
                  {item.icon}
                </div>
                <div className="pillar-content">
                  <h3 className="pillar-title">{item.title}</h3>
                  <p className="pillar-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
