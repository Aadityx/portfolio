import '../styles/navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-logo">Aadityx</div>

      <ul className="nav-links">
        <li><a href="#about">About</a></li>
        <li><a href="#education">Education</a></li>
        <li><a href="#experience">Experience</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  )
}

export default Navbar
