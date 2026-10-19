import { Briefcase, Calendar, Building2, ExternalLink } from 'lucide-react';
import '../styles/experience.css';

function Experience() {
  const experiences = [
    {
      role: "Web Developer Volunteer",
      org: "Jan Kalyan Trust",
      duration: "April 2026 – Jul 2026",
      isCurrent: true,
      link: "https://jankalyantrustmahad.org/",
      description: "Developed a 10-page responsive website for Jan Kalyan Trust, a non-profit organization, to enhance its digital presence and accessibility. Designed user-friendly interfaces and implemented responsive layouts to ensure a seamless browsing experience across devices. Currently contributing to ongoing website maintenance and updates.",
      skills: ["HTML", "CSS", "JavaScript", "UI Optimization"]
    },
    {
      role: "Full-Stack Web Developer",
      org: "Spark IIT",
      duration: "Oct 2024 – Jan 2026",
      isCurrent: false,
      description: "Deep dived into web development by learning modern technologies such as React.js, JavaScript, Node.js, and MongoDB. Worked extensively on personal projects to implement these concepts, improve problem-solving skills, and build responsive, user-friendly web applications.",
      skills: ["React.js", "JavaScript", "Node.js", "MongoDB", "Web Development"]
    },
    {
      role: "Front-End Web Developer",
      org: "Nitroxxion GLobal Private Limited",
      duration: "June 2024 – Sept 2024",
      isCurrent: false,
      description: "Worked on building responsive and user-friendly web interfaces using HTML, CSS, JavaScript, and React. Collaborated with the team to improve UI consistency and performance.",
      skills: ["HTML", "CSS", "JavaScript", "React", "UI Optimization"]
    }
  ];

  return (
    <section id="experience" className="section-wrapper experience-section">
      <div className="container">
        <div className="section-header">
          <div className="section-kicker">03 / EXPERIENCE & INTERNSHIPS</div>
          <h2 className="section-title">Experience</h2>
          <div className="section-divider" />
        </div>

        <div className="experience-timeline">
          <div className="timeline-spine" />

          {experiences.map((exp, index) => (
            <div className={`experience-timeline-item ${exp.isCurrent ? 'current-item' : ''}`} key={index}>
              <div className="timeline-node">
                <div className="node-dot" />
              </div>

              <div className="experience-card glass-panel">
                <div className="exp-header-row">
                  <div className="exp-title-group">
                    <h3 className="exp-role">{exp.role}</h3>
                    <div className="exp-org-wrap">
                      <Building2 size={16} className="exp-icon" />
                      {exp.link ? (
                        <a
                          href={exp.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="experience-org experience-org-link"
                          title={`Visit ${exp.org} website`}
                        >
                          <span>{exp.org}</span>
                          <ExternalLink size={13} style={{ marginLeft: 4, display: 'inline-block' }} />
                        </a>
                      ) : (
                        <span className="experience-org">{exp.org}</span>
                      )}
                    </div>
                  </div>

                  <div className="exp-duration-badge">
                    <Calendar size={14} className="exp-icon" />
                    <span className="experience-duration">{exp.duration}</span>
                  </div>
                </div>

                <p className="exp-description">{exp.description}</p>

                <div className="exp-tags-row">
                  {exp.skills.map((skill, sIdx) => (
                    <span className="exp-tech-tag" key={sIdx}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
