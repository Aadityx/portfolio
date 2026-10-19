import { GraduationCap, MapPin, CheckCircle2, Clock } from 'lucide-react';
import '../styles/education.css';

function Education() {
  const educationData = [
    {
      institution: "DYP DPGU School of Technology & Research",
      type: "B.Tech In Computer Science & Enginnering",
      location: "Pimpri, Pune",
      status: "Currently pursuing Degree",
      isCurrent: true,
      tag: "Degree"
    },
    {
      institution: "Marathwada Mitra Mandals Polytechnic",
      type: "Diploma In Computer Enginnering",
      location: "Thergaon, Pune",
      status: "Successfully completed diploma",
      isCurrent: false,
      tag: "Diploma"
    },
    {
      institution: "Fr. Agnel Central School",
      type: "School",
      location: "Pilar, Goa",
      status: "Completed basic education",
      isCurrent: false,
      tag: "School"
    }
  ];

  return (
    <section id="education" className="section-wrapper education-section">
      <div className="container">
        <div className="section-header">
          <div className="section-kicker">02 / ACADEMIC BACKGROUND</div>
          <h2 className="section-title">Education</h2>
          <div className="section-divider" />
        </div>

        <div className="education-cards-grid">
          {educationData.map((edu, index) => (
            <div className="education-card glass-panel" key={index}>
              <div className="card-top-row">
                <div className="edu-icon-badge">
                  <GraduationCap size={20} className="edu-icon" />
                </div>
                <span className="edu-tag-pill">{edu.tag}</span>
              </div>

              <div className="edu-main-info">
                <span className="edu-type">{edu.type}</span>
                <h3 className="edu-institution">{edu.institution}</h3>
              </div>

              <div className="edu-meta-info">
                <div className="edu-location">
                  <MapPin size={14} className="meta-icon" />
                  <span>{edu.location}</span>
                </div>
                <div className={`edu-status ${edu.isCurrent ? 'status-current' : 'status-completed'}`}>
                  {edu.isCurrent ? <Clock size={14} className="status-icon" /> : <CheckCircle2 size={14} className="status-icon" />}
                  <span>{edu.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Education;
