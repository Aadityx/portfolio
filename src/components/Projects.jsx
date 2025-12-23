import '../styles/projects.css';

function Projects() {
  const projects = [
    {
      title: "EcoMeter",
      description: "An electric vehicle range estimation platform built with HTML, CSS, JS.",
      link: "https://github.com/Aadityx/EcoMeter"
    },
    {
      title: "Nitroxx - Ecommerce Website",
      description: "An electric vehicle range estimation platform built with HTML, CSS, JS.",
      link: "https://github.com/Aadityx/Nitroxx"
    },
    {
      title: "Portfolio Website",
      description: "My personal portfolio website showcasing projects and skills.",
      link: "https://github.com/Aadityx/Portfolio"
    },
    {
      title: "Task Manager",
      description: "A web app for managing daily tasks with CRUD functionality.",
      link: "https://github.com/Aadityx"
    },
    {
      title: "Weather App",
      description: "Fetches real-time weather data using API and displays it.",
      link: "https://github.com/Aadityx"
    },
    {
      title: "Blog Platform",
      description: "A simple blogging platform with authentication and posts.",
      link: "https://github.com/Aadityx"
    }
  ];

  return (
    <section className="projects" id="projects">
      <div className="projects-container">
        <h2>My Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div className="project-card" key={index}>
              <div className="project-image"> {/* Placeholder */}
                <p>Image</p>
              </div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <a href={project.link} className="btn" target="_blank" rel="noopener noreferrer">
                View Project
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
