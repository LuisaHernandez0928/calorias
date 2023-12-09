export const addIngredient = (
  ingredients,
  name,
  calories,
  proteins,
  carbs,
  fats,
  sugars,
  gramsPerRation
) => {
  const newIngredient = {
    id: Date.now(),
    name: name,
    calories: calories,
    proteins: proteins,
    carb: carbs,
    fats: fats,
    sugars: sugars,
    gramsPerRation: gramsPerRation,
  };

  ingredients.push(newIngredient);
  return ingredients;
};

function search(a, b) {
  const porEncontrar = b;
  const espacioBusqueda = a;

  let i = 0;
  let j = 0;

  let match = false;

  const espacioBusquedaL = espacioBusqueda.length;
  const porEncontrarL = porEncontrar.length;

  while (!(i >= espacioBusquedaL || j >= porEncontrarL)) {
    if (espacioBusqueda[i] === porEncontrar[j]) {
      j++;
      i++;
      if (j === porEncontrarL) match = true;
    } else {
      if (j === 0) i++;
      j = 0;
    }
  }
  return match;
}

export const searchIngredients = (ingredients, name) => {
  const results = [];
  for (let i = 0; i < ingredients.length; i++) {
    if (search(ingredients[i].name, name)) {
      results.push(ingredients[i]);
    }
  }
  return results;
};

function findMin(arr, criteria) {
  let currentMin = arr[0];
  let position = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i][criteria] < currentMin[criteria]) {
      currentMin = arr[i];
      position = i;
    }
  }
  return [currentMin, position];
}

function deleteAtPosition(arr, pos) {
  const newArray = [];
  for (let i = 0; i < arr.length; i++) {
    if (i != pos) newArray.push(arr[i]);
  }
  return newArray;
}

export const orderIngredients = (arr, criteria) => {
  const sortedArray = [];
  let copyArray = JSON.parse(JSON.stringify(arr));
  for (let i = 0; i < arr.length; i++) {
    const [min, pos] = findMin(copyArray, criteria);
    sortedArray.push(min);
    copyArray = deleteAtPosition(copyArray, pos);
  }
  return sortedArray;
};

export const filterIngredients = (ingredients, criteria, value1, value2) => {
  const sortedArray = [];
  for (let i = 0; i < ingredients.length; i++) {
    const val = ingredients[i][criteria];
    if (val >= value1 && val <= value2) sortedArray.push(ingredients[i]);
  }
  return sortedArray;
};

export const addRecipe = (recipes, name, ingredientIds, ingredientsAmount) => {
  const newRecipe = {
    id: Date.now(),
    name: name,
    ingredients: ingredientIds,
    ingredientsAmount: ingredientsAmount,
  };
  recipes.push(newRecipe);
  return recipes;
};

export const getIngredientsFromRecipe = (recipes, recipeName, ingredients) => {
  const ings = [];
  for (const rec in recipes) {
    if (recipes[rec].name == recipeName) {
      const ingsList = recipes[rec].ingredients;
      for (const ing in ingsList) {
        const mIngId = ingsList[ing];
        for (const mIng in ingredients) {
          if (ingredients[mIng].id == mIngId) {
            ings.push(ingredients[mIng]);
          }
        }
      }
    }
  }
  return ings;
};

export const orderRecipes = (recipes, ingredients, criteria) => {
  return recipes.sort((a, b) => {
    if (criteria == "name") return a.name > b.name ? 1 : -1;
    const mIngsA = getIngredientsFromRecipe(recipes, a.name, ingredients);
    const mIngsB = getIngredientsFromRecipe(recipes, b.name, ingredients);
    if (criteria == "numingredients") return mIngsA.length - mIngsB.length;
    const valA = mIngsA.reduce((acc, curr) => {
      const index = a.ingredients.indexOf(curr.id);
      const amount = a.ingredientsAmount[index];
      return acc + curr[criteria] * amount;
    }, 0);
    const valB = mIngsB.reduce((acc, curr) => {
      const index = b.ingredients.indexOf(curr.id);
      const amount = b.ingredientsAmount[index];
      return acc + curr[criteria] * amount;
    }, 0);
    return valA - valB;
  });
};

export const filterRecipes = (
  recipes,
  ingredients,
  criteria,
  value1,
  value2
) => {
  return recipes.filter((a) => {
    const mIngsA = getIngredientsFromRecipe(recipes, a.name, ingredients);
    const valA = mIngsA.reduce((acc, curr) => {
      const index = a.ingredients.indexOf(curr.id);
      const amount = a.ingredientsAmount[index];
      return acc + curr[criteria] * amount;
    }, 0);
    return valA >= value1 && valA <= value2;
  });
};

export const searchRecipes = (recipes, name) => {
  const results = [];
  for (let i = 0; i < recipes.length; i++) {
    if (search(recipes[i].name, name)) {
      results.push(recipes[i]);
    }
  }
  return results;
};

export const countNumberOfTimesAnIngredientIsUsed = (
  recipes,
  ingredients,
  ingredientName
) => {
  let times = 0;
  for (const rec in recipes) {
    const mRecipe = recipes[rec];
    const mIngs = getIngredientsFromRecipe(recipes, mRecipe.name, ingredients);
    mIngs.forEach((ing) => {
      if (ing.name == ingredientName) times++;
    });
  }
  return times;
};

export const addFood = (foods, day, recipe) => {
  foods.push({
    id: Date.now(),
    day,
    recipe,
  });
  return foods;
};

export const getFoodsByDay = (foods, day) => {
  return foods.filter((food) => {
    return food.day == day;
  });
};

export const getFoodsInRange = (foods, day1, day2) => {
  return foods.filter((food) => {
    const dateFood = Date.parse(food.day);
    const date1 = Date.parse(day1);
    const date2 = Date.parse(day2);
    return dateFood >= date1 && dateFood <= date2;
  });
};

const getRecipeByName = (recipes, name) => {
  let recipe = [];
  recipes.forEach((rec) => {
    if (rec.name == name) recipe = rec;
  });
  return recipe;
};

export const calculateNutritionalInfo = (foods, recipes, ingredients) => {
  let carbs = 0;
  let calories = 0;
  let sugars = 0;
  let proteins = 0;
  let fats = 0;

  for (const food in foods) {
    const mFood = foods[food];
    const rec = mFood.recipe;
    const realRecipe = getRecipeByName(recipes, rec);
    const ings = getIngredientsFromRecipe(recipes, rec, ingredients);
    for (const ing in ings) {
      const mIng = ings[ing];
      const index = realRecipe.ingredients.indexOf(mIng.id);
      const amount = realRecipe.ingredientsAmount[index];
      carbs += mIng.carbs * amount;
      calories += mIng.calories * amount;
      sugars += mIng.sugars * amount;
      proteins += mIng.proteins * amount;
      fats += mIng.fats * amount;
    }
  }

  return {
    carbs,
    calories,
    sugars,
    proteins,
    fats,
  };
};
