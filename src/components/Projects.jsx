import { useState, useRef } from 'react';
import { 
  ExternalLink, 
  ArrowUpRight, 
  Zap, 
  ShoppingBag, 
  User, 
  CheckSquare, 
  TrendingUp 
} from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import '../styles/projects.css';

// Interactive 3D Tilt Card
function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState('');
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Rotate limits
    const rotateX = -((y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`);
    setGlarePosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.15
    });
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)');
    setGlarePosition({ x: 50, y: 50, opacity: 0 });
  };

  return (
    <div
      ref={cardRef}
      className="project-card glass-panel"
      style={{ transform }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Specular glare overlay */}
      <div
        className="project-card-glare"
        style={{
          background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255, 255, 255, ${glarePosition.opacity}), transparent 60%)`,
        }}
      />

      {/* Top Meta Bar */}
      <div className="project-top-row">
        <span className="project-number">0{index + 1}</span>
        <div className="project-category-tag">
          {project.icon}
          <span>{project.tag}</span>
        </div>
      </div>

      {/* Project Title & Description */}
      <div className="project-body">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.description}</p>
      </div>

      {/* Tech Tags */}
      <div className="project-tags">
        {project.tags.map((tag, tIdx) => (
          <span className="project-tag" key={tIdx}>
            {tag}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="project-actions">
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary project-btn"
        >
          <span>View Project</span>
          <ArrowUpRight size={16} />
        </a>

        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="project-github-btn"
          aria-label={`View ${project.title} source on GitHub`}
        >
          <GithubIcon size={18} />
        </a>
      </div>
    </div>
  );
}

function Projects() {
  const projects = [
    {
      title: "EcoMeter",
      description: "An electric vehicle range estimation platform built using HTML, CSS, and JavaScript.",
      link: "https://github.com/Aadityx/EcoMeter",
      tag: "EV Platform",
      icon: <Zap size={15} className="tag-icon" />,
      tags: ["HTML", "CSS", "JavaScript", "EV Range", "Estimation"]
    },
    {
      title: "Nitroxx",
      description: "An e-commerce website designed for the biker community with a clean and responsive user interface.",
      link: "https://github.com/Aadityx/EcoMeter",
      tag: "E-Commerce",
      icon: <ShoppingBag size={15} className="tag-icon" />,
      tags: ["Responsive UI", "E-Commerce", "Biker Community", "Web Design"]
    },
    {
      title: "Personal Portfolio",
      description: "A personal portfolio website showcasing my projects, skills, and experience.",
      link: "https://github.com/Aadityx/EcoMeter",
      tag: "Portfolio",
      icon: <User size={15} className="tag-icon" />,
      tags: ["React", "UI/UX", "Modern Web", "Interactive Design"]
    },
    {
      title: "TaskTracker",
      description: "A modern, web-based Task List Management System designed to help users efficiently organize, track, and manage their daily tasks.",
      link: "https://github.com/Aadityx/TaskTracker",
      tag: "Productivity",
      icon: <CheckSquare size={15} className="tag-icon" />,
      tags: ["Task Management", "Web Application", "Productivity", "JavaScript"]
    },
    {
      title: "Expense Tracker",
      description: "A web-based application designed to help users record, monitor, and manage their daily expenses efficiently and display them using charts.",
      link: "https://github.com/Aadityx/ExpenseTracker",
      tag: "Analytics",
      icon: <TrendingUp size={15} className="tag-icon" />,
      tags: ["Expense Analytics", "Charts", "Finance Tracker", "Data Visualization"]
    }
  ];

  return (
    <section id="projects" className="section-wrapper project-section">
      <div className="container">
        <div className="section-header">
          <div className="section-kicker">05 / FEATURED WORK</div>
          <h2 className="section-title">Projects</h2>
          <div className="section-divider" />
        </div>

        <div className="project-cards-grid">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
