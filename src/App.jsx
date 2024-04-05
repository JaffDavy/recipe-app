import RecipeSearch from './RecipeSearch'
import React from 'react'
import './App.css'

function App() {
  return (
    <div className='hero-page'>
      <div>
        <h1>MY FOOD RECIPE APP</h1>
      </div>
      <div className='app'>
        <h1>Food Recipe</h1>
        <RecipeSearch />
      </div>
    </div>

  )
}

export default App