import '../styles/education.css';

function Education() {

  return (
    <section id="education" className="education-section">
  <h2>Education</h2>

  <div className="education-cards">
    {/* School */}
    <div className="education-card">
      <h3>Fr. Agnel Central School</h3>
      <span className="edu-type">School</span>
      <p>Pilar, Goa</p>
      <p>Completed basic education</p>
    </div>

    {/* Diploma */}
    <div className="education-card">
      <h3>Marathwada Mitra Mandals Polytechnic</h3>
      <span className="edu-type">Diploma In Computer Enginnering</span>
      <p>Thergaon, Pune</p>
      <p>Successfully completed diploma</p>
    </div>

    {/* Engineering */}
    <div className="education-card">
      <h3>DYP DPGU School of Technology & Research</h3>
      <span className="edu-type">B.Tech In Computer Science & Enginnering</span>
      <p>Pimpri, Pune</p>
      <p>Currently pursuing Degree</p>
    </div>
  </div>
</section>

  );
}

export default Education;
