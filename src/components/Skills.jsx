import { useState } from 'react';
import { 
  Code, 
  FileCode2, 
  FileJson, 
  Atom, 
  Server, 
  GitBranch, 
  Palette, 
  Cpu,
  Database,
  Send,
  Network,
  Triangle,
  Cloud,
  Layers,
  Wrench
} from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import '../styles/skills.css';

function Skills() {
  const [activeTab, setActiveTab] = useState('all');
  const [hoveredKey, setHoveredKey] = useState(null);

  const coreStack = [
    {
      name: "JavaScript (ES6+)",
      category: "Core Language",
      icon: <FileJson size={26} className="skill-icon" />,
      color: "#f7df1e",
      group: "core"
    },
    {
      name: "React.js",
      category: "Frontend UI Library",
      icon: <Atom size={26} className="skill-icon" />,
      color: "#61dafb",
      group: "core"
    },
    {
      name: "Node.js",
      category: "Backend Runtime",
      icon: <Server size={26} className="skill-icon" />,
      color: "#68a063",
      group: "core"
    },
    {
      name: "Express.js",
      category: "Backend Framework",
      icon: <Cpu size={26} className="skill-icon" />,
      color: "#e2e8f0",
      group: "core"
    },
    {
      name: "MongoDB",
      category: "NoSQL Database",
      icon: <Database size={26} className="skill-icon" />,
      color: "#47a248",
      group: "core"
    },
    {
      name: "HTML5",
      category: "Markup & Semantics",
      icon: <Code size={26} className="skill-icon" />,
      color: "#e34f26",
      group: "core"
    },
    {
      name: "CSS3",
      category: "Modern Styling",
      icon: <Palette size={26} className="skill-icon" />,
      color: "#1572b6",
      group: "core"
    },
    {
      name: "Tailwind CSS",
      category: "Utility CSS Framework",
      icon: <FileCode2 size={26} className="skill-icon" />,
      color: "#06b6d4",
      group: "core"
    }
  ];

  const toolsTechnologies = [
    {
      name: "Git",
      category: "Version Control",
      icon: <GitBranch size={26} className="skill-icon" />,
      color: "#f05032",
      group: "tools"
    },
    {
      name: "GitHub",
      category: "Collaboration & Repos",
      icon: <GithubIcon size={26} className="skill-icon" />,
      color: "#a855f7",
      group: "tools"
    },
    {
      name: "Postman",
      category: "API Testing & Dev",
      icon: <Send size={26} className="skill-icon" />,
      color: "#ff6c37",
      group: "tools"
    },
    {
      name: "REST APIs",
      category: "Architecture & Integration",
      icon: <Network size={26} className="skill-icon" />,
      color: "#38bdf8",
      group: "tools"
    },
    {
      name: "Vercel",
      category: "Deployment & Hosting",
      icon: <Triangle size={26} className="skill-icon" />,
      color: "#ffffff",
      group: "tools"
    },
    {
      name: "Netlify",
      category: "Hosting & Serverless",
      icon: <Cloud size={26} className="skill-icon" />,
      color: "#00c7b7",
      group: "tools"
    }
  ];

  const renderSkillCard = (skill, uniqueKey) => (
    <div
      className={`skill-card glass-panel ${hoveredKey === uniqueKey ? 'card-hovered' : ''}`}
      key={uniqueKey}
      onMouseEnter={() => setHoveredKey(uniqueKey)}
      onMouseLeave={() => setHoveredKey(null)}
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
  );

  return (
    <section className="section-wrapper skills" id="skills">
      <div className="container skills-container">
        <div className="section-header">
          <div className="section-kicker">04 / TECHNICAL TOOLKIT</div>
          <h2 className="section-title">My Skills</h2>
          <div className="section-divider" />
        </div>

        {/* Category Filter Tabs */}
        <div className="skills-filter-tabs">
          <button
            type="button"
            className={`skills-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            <span>All Stack</span>
            <span className="tab-count">{coreStack.length + toolsTechnologies.length}</span>
          </button>
          <button
            type="button"
            className={`skills-tab-btn ${activeTab === 'core' ? 'active' : ''}`}
            onClick={() => setActiveTab('core')}
          >
            <Layers size={14} className="tab-icon" />
            <span>Core Stack</span>
            <span className="tab-count">{coreStack.length}</span>
          </button>
          <button
            type="button"
            className={`skills-tab-btn ${activeTab === 'tools' ? 'active' : ''}`}
            onClick={() => setActiveTab('tools')}
          >
            <Wrench size={14} className="tab-icon" />
            <span>Tools & Technologies</span>
            <span className="tab-count">{toolsTechnologies.length}</span>
          </button>
        </div>

        {/* Core Stack Cluster */}
        {(activeTab === 'all' || activeTab === 'core') && (
          <div className="skills-group-section">
            <div className="skills-group-header">
              <div className="group-title-wrap">
                <Layers size={18} className="group-icon" />
                <h3 className="skills-group-title">Core Stack</h3>
              </div>
              <span className="skills-group-badge">{coreStack.length} Technologies</span>
            </div>
            <div className="skills-grid">
              {coreStack.map((skill, idx) => renderSkillCard(skill, `core-${idx}`))}
            </div>
          </div>
        )}

        {/* Tools & Technologies Cluster */}
        {(activeTab === 'all' || activeTab === 'tools') && (
          <div className="skills-group-section">
            <div className="skills-group-header">
              <div className="group-title-wrap">
                <Wrench size={18} className="group-icon" />
                <h3 className="skills-group-title">Tools & Technologies</h3>
              </div>
              <span className="skills-group-badge">{toolsTechnologies.length} Tools</span>
            </div>
            <div className="skills-grid">
              {toolsTechnologies.map((skill, idx) => renderSkillCard(skill, `tool-${idx}`))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Skills;
