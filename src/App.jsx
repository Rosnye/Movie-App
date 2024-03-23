import React from 'react'
import './App.css'
import Nav from './components/Nav'
import Carrousel from './components/Carroussel'
import MovieCarousel from './components/MovieCarrousel'

function App() {

  return (
    <div className="min-h-screen bg-gray-800">
      <Nav/>
      <MovieCarousel/>
    </div>
  )
}

export default App
