import RecipeSearch from './RecipeSearch'
import React from 'react'
import './App.css'

function App() {
  return (
    <div className='hero-page'>
      <div>
        <h1>WELCOME TO MY FOOD RECIPE APP</h1>
      </div>
      <div className='app'>
        <h1>Enter Your Meal Below</h1>
        <RecipeSearch />
      </div>
    </div>

  )
}

export default App