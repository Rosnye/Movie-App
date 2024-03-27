import React from 'react'
import './App.css'
import Nav from './components/Nav'
import Carrousel from './components/Carroussel'
import Carousel from './components/MovieCarrousel'

function App() {

  return (
    <div className="min-h-screen min-w-96 pb-8 bg-Squares">
      <Nav/>
      <Carousel/>
    </div>
  )
}

export default App
