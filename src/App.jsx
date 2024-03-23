import React from 'react'
import './App.css'
import Nav from './components/Nav'
import Carrousel from './components/Carroussel'
import Carousel from './components/MovieCarrousel'

function App() {

  return (
    <div className="min-h-screen pb-8 bg-gray-800">
      <Nav/>
      <Carousel/>
    </div>
  )
}

export default App
