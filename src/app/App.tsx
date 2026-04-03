import React from 'react'
import ProjectsSection from './components/ProjectsSection'

export default function App() {
  return (
    <div
      className="min-h-screen"
      style={{
        background: '#050505',
        fontFamily: 'Rajdhani, Barlow Condensed, sans-serif',
        color: '#ffffff',
      }}
    >
      <ProjectsSection id="projects" />
    </div>
  )
}