import '../styles/experience.css';

function Experience() {

  return (
    <section id="experience" className="experience-section">
  <h2>Experience</h2>

  <div className="experience-cards">
   <div className="experience-card">
  <h3>Front-End Web Developer</h3>
  <span className="experience-org">Nitroxxion GLobal Private Limited</span>
  <span className="experience-duration">June 2024 – Sept 2024</span>

  <p>
    Worked on building responsive and user-friendly web interfaces using 
    HTML, CSS, JavaScript, and React. Collaborated with the team to improve
    UI consistency and performance.
  </p>
</div>

<div className="experience-card">
  <h3>Full-Stack Web Developer</h3>
  <span className="experience-org">Spark IIT</span>
  <span className="experience-duration">Sept 2024 – Present</span>

  <p>
    Deep dived into web development by learning modern technologies such as 
    React.js, JavaScript, Node.js, and MongoDB. Worked extensively on personal 
    projects to implement these concepts, improve problem-solving skills, and 
    build responsive, user-friendly web applications.
  </p>
</div>

  </div>
</section>

  );
}

export default Experience;
