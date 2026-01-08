import "../styles/projects.css";

function Projects() {
  return (
    <section id="projects" className="project-section">
      <h2>Projects</h2>

      <div className="project-cards">
        <div className="project-card">
          <h3>EcoMeter</h3>
          <p>
            An electric vehicle range estimation platform built using HTML, CSS,
            and JavaScript.
          </p>
          <a href="https://github.com/Aadityx/EcoMeter" className="btn">View Project</a>
        </div>

        <div className="project-card">
          <h3>Nitroxx</h3>
          <p>
            An e-commerce website designed for the biker community with a clean
            and responsive user interface.
          </p>
          <a href="https://github.com/Aadityx/EcoMeter" className="btn">View Project</a>
        </div>

        <div className="project-card">
          <h3>Personal Portfolio</h3>
          <p>
            A personal portfolio website showcasing my projects, skills, and
            experience.
          </p>
          <a href="https://github.com/Aadityx/EcoMeter" className="btn">View Project</a>
        </div>

        <div className="project-card">
          <h3>TaskTracker</h3>
          <p>
            A modern, web-based Task List Management System designed to help users efficiently organize, track, and manage their daily tasks. 
          </p>
          <a href="https://github.com/Aadityx/TaskTracker" className="btn">View Project</a>
        </div>

        <div className="project-card">
          <h3>Expense Tracker</h3>
          <p>
            A web-based application designed to help users record, monitor, and manage their daily expenses efficiently and display them using charts.
            </p>
          <a href="https://github.com/Aadityx/ExpenseTracker" className="btn">View Project</a>
        </div>

      </div>
    </section>
  );
}

export default Projects;
