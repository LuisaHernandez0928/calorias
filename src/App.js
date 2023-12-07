import React, { useState } from 'react';

import {initialIngredients, initialIRecipes, initialFoods} from './initial';

import {
  addIngredient,
  searchIngredients,
  orderIngredients,
  filterIngredients,
  addRecipe,
  orderRecipes,
  filterRecipes,
  searchRecipes,
  countNumberOfTimesAnIngredientIsUsed,
  getIngredientsInCommon,
  addFood,
  getFoodsByDay,
  getFoodsInRange,
  calculateNutritionalInfo
} from './functions';

function App() {

  const [ingredients, setIngredients] = useState(initialIngredients);
  const [recipes, setRecipes] = useState(initialIRecipes);
  const [foods, setFoods] = useState(initialFoods);



  return (
    <div>Hola</div>
  );
}

export default App;
