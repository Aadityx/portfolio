import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'

function App() {
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '80px' }}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </div>
    </>
  )
}

export default App

