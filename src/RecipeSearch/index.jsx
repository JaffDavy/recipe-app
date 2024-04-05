import React, { useState } from 'react'

const RecipeSearch = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [ingredients, setIngredients] = useState([])

  const [showIngredients, setShowIngredients] = useState(false);

  const handleSearch = async (searchTerm) => {
    try {
      if (searchTerm.trim() === '') {
        setRecipes([]); // Clear recipes if the search term is empty
        return;
      }

      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
      const data = await response.json()

      if (data.meals) {
        setRecipes(data.meals);
      } else {
        setRecipes([]);
      }
    } catch (error) {
      console.error('Error fetching recipes', error)
    }
  };

  const handleRecipeClick = async (recipeId) => {
    setSelectedRecipe(recipes)
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
      const data = await response.json()

      if (data.meals && data.meals.length > 0) {
        setSelectedRecipe(data.meals[0])

        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
          if (data.meals[0][`strIngredient${i}`]) {
            ingredients.push({
              ingredient: data.meals[0][`strIngredient${i}`],
              measure: data.meals[0][`strMeasure${i}`]
            })
          } else {
            break
          }
        }
        setIngredients(ingredients)
      }
    } catch (error) {
      console.error('Error fetching recipe details', error)
    }
  }

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value)
    handleSearch(event.target.value)
  }

  return (
    <div className='search'>
      <input id='search'
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Enter a food recipe to search"
      />
      <div className='recipe-list'>
        {recipes.map((recipe) => (
          <div key={recipe.idMeal} onClick={() => handleRecipeClick(recipe.idMeal)}>
            <h3>{recipe.strMeal}</h3>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} height={400} width={400} />
          </div>
        ))}
      </div>
      {selectedRecipe && (
        <div className='recipe-details'>
          <h2>{selectedRecipe.strMeal}</h2>
          <img id='pic' src={selectedRecipe.strMealThumb} alt={selectedRecipe.strMeal} height={400} width={400}/>
          {
            showIngredients && (
              <>
                <h3>Ingredients:</h3>
                <ul>
                  {ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient.measure} {ingredient.ingredient}</li>
                  ))}
                </ul>
              </>
            )}
            <button onClick={() => setShowIngredients(prev => !prev)}>{showIngredients ? 'Hide': 'showIngredient'}</button>
          <p>{selectedRecipe.strInstructions}</p>
        </div>
      )}
    </div>
  );
};

export default RecipeSearch;
