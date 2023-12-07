/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Tabs } from "antd";

import { initialIngredients, initialIRecipes, initialFoods } from "./initial";

import { Ingredients } from "./ingredients";
import { Foods } from "./foods";
import { Recipes } from "./recipes";

function App() {
  const [ingredients, setIngredients] = useState(initialIngredients);
  const [recipes, setRecipes] = useState(initialIRecipes);
  const [foods, setFoods] = useState(initialFoods);

  const notifyIngredientAdded = (mData) => {
    setIngredients(mData);
  };

  const notifyRecipeAdded = (mData) => {
    setRecipes(mData);
  };

  const notifyFoodAdded = (mData) => {
    setFoods(mData);
  };

  const items = [
    {
      key: "1",
      label: "Ingredients",
      children: (
        <Ingredients notifyAdded={notifyIngredientAdded} data={ingredients} />
      ),
    },
    {
      key: "2",
      label: "Recipes",
      children: (
        <Recipes
          ingredients={ingredients}
          notifyAdded={notifyRecipeAdded}
          data={recipes}
        />
      ),
    },
    {
      key: "3",
      label: "Foods",
      children: (
        <Foods
          recipes={recipes}
          ingredients={ingredients}
          notifyAdded={notifyFoodAdded}
          data={foods}
        />
      ),
    },
  ];

  return <Tabs defaultActiveKey="1" items={items} />;
}

export default App;
