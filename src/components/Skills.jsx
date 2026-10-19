import { useState } from 'react';
import { 
  Code, 
  FileCode2, 
  FileJson, 
  Atom, 
  Server, 
  GitBranch, 
  Palette, 
  LayoutGrid,
  Layers
} from 'lucide-react';
import '../styles/skills.css';

function Skills() {
  // Preserve exact original skill names
  const skillsData = [
    {
      name: "HTML",
      category: "Frontend Core",
      icon: <Code size={26} className="skill-icon" />,
      color: "#e34f26"
    },
    {
      name: "CSS",
      category: "Frontend Core",
      icon: <Palette size={26} className="skill-icon" />,
      color: "#1572b6"
    },
    {
      name: "JavaScript",
      category: "Core Language",
      icon: <FileJson size={26} className="skill-icon" />,
      color: "#f7df1e"
    },
    {
      name: "React",
      category: "UI Framework",
      icon: <Atom size={26} className="skill-icon" />,
      color: "#61dafb"
    },
    {
      name: "Node.js",
      category: "Runtime & Backend",
      icon: <Server size={26} className="skill-icon" />,
      color: "#339933"
    },
    {
      name: "Git",
      category: "Version Control",
      icon: <GitBranch size={26} className="skill-icon" />,
      color: "#f05032"
    },
    {
      name: "Tailwind CSS",
      category: "Modern Utility Styling",
      icon: <FileCode2 size={26} className="skill-icon" />,
      color: "#06b6d4"
    },
    {
      name: "Bootstrap",
      category: "CSS Framework",
      icon: <LayoutGrid size={26} className="skill-icon" />,
      color: "#7952b3"
    }
  ];

  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="section-wrapper skills" id="skills">
      <div className="container skills-container">
        <div className="section-header">
          <div className="section-kicker">04 / TECHNICAL EXPERTISE</div>
          <h2 className="section-title">My Skills</h2>
          <div className="section-divider" />
        </div>

        <div className="skills-grid">
          {skillsData.map((skill, index) => (
            <div
              className={`skill-card glass-panel ${hoveredIndex === index ? 'card-hovered' : ''}`}
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="skill-card-inner">
                <div className="skill-icon-wrapper" style={{ '--skill-color': skill.color }}>
                  {skill.icon}
                  <div className="icon-glow" />
                </div>

                <div className="skill-info">
                  <h3 className="skill-name">{skill.name}</h3>
                  <span className="skill-category">{skill.category}</span>
                </div>

                <div className="skill-card-edge-light" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
