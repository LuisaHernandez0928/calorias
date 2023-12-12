/* eslint-disable no-unused-vars */
/*
  Añade un ingrediente a la lista de ingredientes que se le pasa. Debe retornar la lista
  de ingredientes con el nuevo ingrediente añadido.
  Un ingrediente tiene un id único (es un número entero mayor a 0), un nombre, un número
  de calorías, un número de proteinas, un número de carbohidratos, un número de grasas,
  un número de azúcares, y un número que representa el tamaño de la porción en gramos.
*/
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

/*
  Recibe la lista de ingredientes y busca en ella los ingredientes cuyo nombre hagan match
  con el nombre recibido en parámetro. Retorna una lista de ingredientes. Si no hay ninguno
  que haga match retorna una lista vacía.
*/
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

/*
  Recibe una lista de ingredientes y los ordena según el criterio recibido
  criteria es un string que puede tener los valores: 'name', 'calories', 'proteins'
  Retorna la lista de ingredientes ordenada por el criterio
*/
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

/*function findRange(arr, criteria, min, max) {
  let currentMatch = {};
  let position = -1;
  let wasInsideLoop = false;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][criteria] <= max && arr[i][criteria] >= min) {
      wasInsideLoop = true;
      currentMatch = arr[i];
      position = i;
    }
  }
  if (wasInsideLoop) return [currentMatch, position];
  return [null, position];
}*/

/*
  Recibe una lista de ingredientes y los filtra según el criterio recibido
  criteria es un string que puede tener los valores: 'calories', 'proteins'
  value es el filtro.
  Retorna la lista de ingredientes filtrada por el criterio
  Por ejemplo:
    criteria: 'calories'
    value1: 30
    value2: 50
  Debería retornar la lista de ingredientes con entre 30 y 50 calorias
*/
export const filterIngredients = (ingredients, criteria, value1, value2) => {
  const sortedArray = [];
  for (let i = 0; i < ingredients.length; i++) {
    const val = ingredients[i][criteria];
    if (val >= value1 && val <= value2) sortedArray.push(ingredients[i]);
  }
  return sortedArray;
};
/*
export const filterIngredients = (ingredients, criteria, value1, value2) => {
  const sortedArray = [];
  let copyArray = JSON.parse(JSON.stringify(ingredients));
  for (let i = 0; i < ingredients.length; i++) {
    const [min, pos] = findRange(copyArray, criteria, value1, value2);
    if (min != null) {
      sortedArray.push(min);
      copyArray = deleteAtPosition(copyArray, pos);
    }
  }
  console.log(sortedArray);
  return sortedArray;
};
*/

/**
  Añade una receta a la lista de recetas.
  Recibe la lista de recetas, la lista de ids de ingredientes que tiene la nueva receta.
  La cantidad de veces que tiene cada ingrediente, y el nombre de la receta.
  Retorna la lista de recetas con la nueva receta añadida.
  Cada receta tiene un id, un nombre, una lista de ingredientes, y una lista que 
  representa la cantidad de veces que se usa cada ingrediente
  Ejemplo:
    Puede recibir una receta con 2 ingredientes
    [20, 30]
    Y con la siguiente cantidad de ingredientes
    [2, 1]
    Esto significaría que la receta usa 2 porciones del ingrediente con id 20,
    y 1 porción del ingrediente con id 30.
 */
export const addRecipe = (recipes, name, ingredientIds, ingredientsAmount) => {
  const newRecipe = {
    id: Date.now(),
    name: name,
    ingredients: ingredientIds,
    ingredientsAmount: ingredientsAmount,
  };
  console.log(newRecipe);
  recipes.push(newRecipe);
  console.log(recipes.length);
  console.log(recipes);
  return recipes;
};

const getIngredientsId = (recipes, recipeName) => {
  let ingredientsId = [];
  for (let i = 0; i < recipes.length; i++) {
    if (recipes[i].name == recipeName) {
      ingredientsId = recipes[i].ingredients;
    }
  }
  return ingredientsId;
};

const getIngredientsAmount = (recipes, recipeName) => {
  let ingredientsAmount = [];
  for (let i = 0; i < recipes.length; i++) {
    if (recipes[i].name == recipeName) {
      ingredientsAmount = recipes[i].ingredientsAmount;
    }
  }
  return ingredientsAmount;
};

const getIngredientInfobyId = (arrId, ingredients) => {
  let i = 0;
  let j = 0;
  let ingredientsInfo = [];
  while (j < ingredients.length) {
    if (ingredients[j].id == arrId[i]) {
      ingredientsInfo.push(ingredients[j]);
      i++;
      j = 0;
      if (i == arrId.length) j = ingredients.length;
    } else j++;
  }
  return ingredientsInfo;
};

/*
  Retorna un objeto con dos propiedades: ingredients y amounts, cada uno es un array
  Por ejemplo:
  {
    ingredients: [
      {
        ...
      },
      {
        ...
      }
    ],
    amounts: [1, 3]
  }
  Esto significa que la receta tiene 2 ingredientes,
  del primero se usa 1 porción, del segundo se usan 3 porciones
*/
export const getIngredientsFromRecipe = (recipes, recipeName, ingredients) => {
  const results = {
    ingredients: getIngredientInfobyId(
      getIngredientsId(recipes, recipeName),
      ingredients
    ),

    amounts: getIngredientsAmount(recipes, recipeName),
  };

  return results;
};

function getCaloriesOfIngredientOfRecipe(recipe, ingId, ings) {
  let ing;
  for (let i = 0; i < ings.length; i++) {
    if (ings[i].id === ingId) ing = ings[i];
  }
  let position;
  for (let i = 0; i < recipe.ingredients.length; i++) {
    if (recipe.ingredients[i] == ingId) position = i;
  }

  let amount = recipe.ingredientsAmount[position];
  return ing.calories * amount;
}

function findCaloriesOfRecipe(recipe, ings) {
  // dada una receta, encuentra el total de calorias
  let calories = 0;
  let ingRp = recipe.ingredients;
  for (let i = 0; i < recipe.ingredients.length; i++) {
    calories += getCaloriesOfIngredientOfRecipe(recipe, ingRp[i], ings);
  }
  return calories;
}

function findMinRecipes(initialRecipes, initialIngredients) {
  let position = 0;
  let minCaloriesRecipe = initialRecipes[position];
  let currentMin = findCaloriesOfRecipe(minCaloriesRecipe, initialIngredients);
  for (let i = 1; i < initialRecipes.length; i++) {
    const calories = findCaloriesOfRecipe(
      initialRecipes[i],
      initialIngredients
    );
    if (calories < currentMin) {
      currentMin = calories;
      minCaloriesRecipe = initialIngredients[i];
      position = i;
    }
  }
  return [minCaloriesRecipe, position];
}
/*
  Recibe una lista de recetas y las ordena según el criterio recibido
  criteria puede tener los valores: 'name', 'numingredients', 'calories', 'proteins'
  Retorna la lista de recetas ordenada por el criterio
*/
export const orderRecipes = (recipes, ingredients, criteria) => {
  //Queda  pendiente ordenar por nombre y numero de ingredientes
  const sortedRecipes = [];
  let copyArray = JSON.parse(JSON.stringify(recipes));
  for (let i = 0; i < recipes.length; i++) {
    const [min, pos] = findMinRecipes(copyArray, ingredients);
    sortedRecipes.push(min);
    copyArray = deleteAtPosition(copyArray, pos);
  }
  return sortedRecipes;
};

const findCriteriaByIngredint = (recipe, idIngr, listIngr, criteria) => {
  let ingrMatched;
  //Encontrar los datos del ingredeinte que hacen match con el Id
  for (let i = 0; i < listIngr.length; i++) {
    if (listIngr[i].id == idIngr) ingrMatched = listIngr[i];
  }
  let position;
  //Encontrar la cantidad de 1 ingrediente en la receta
  for (let i = 0; i < recipe.ingredients.length; i++) {
    if (recipe.ingredients[i] == idIngr) position = i;
  }
  let criteriaByIngr =
    ingrMatched[criteria] * recipe.ingredientsAmount[position];
  return criteriaByIngr;
};

const findCriteriaByRecipe = (recipe, ingr, criteria) => {
  let criteriaAggregated = 0;
  if (recipe) {
    for (let i = 0; i < recipe.ingredients.length; i++) {
      criteriaAggregated += findCriteriaByIngredint(
        recipe,
        recipe.ingredients[i],
        ingr,
        criteria
      );
    }
    return criteriaAggregated;
  }
};

/*
  Recibe una lista de recetas y las filtra según el criterio recibido
  criteria puede tener los valores: 'calories', 'proteins'
  Retorna la lista de recetas filtradas por el criterio
*/
export const filterRecipes = (
  recipeList,
  ingredients,
  criteria,
  value1,
  value2
) => {
  let recipes = [];
  for (let i = 0; i < recipeList.length; i++) {
    const current = findCriteriaByRecipe(recipeList[i], ingredients, criteria);
    if (current >= value1 && current <= value2) {
      recipes.push(recipeList[i]);
    }
  }
  return recipes;
};

/*
  Recibe la lista de recetas y busca en ella las recetas cuyo nombre hagan match
  con el nombre recibido en parámetro. Retorna una lista de recetas. Si no hay ninguna
  que haga match retorna una lista vacía.
*/
export const searchRecipes = (recipes, name) => {
  const results = [];
  for (let i = 0; i < recipes.length; i++) {
    if (search(recipes[i].name, name)) {
      results.push(recipes[i]);
    }
  }
  return results;
};

/*
  Recibe la lista de recetas y busca la cantidad recetas que usan un ingrediente especificado
  Retorna el número de veces que el ingrediente se usa en todas las recetas
*/
const findIdByName = (ingredients, name) => {
  let id;
  ingredients.forEach((elem) => (elem.name == name ? (id = elem.id) : id));
  return id;
};

export const countNumberOfTimesAnIngredientIsUsed = (
  recipes,
  ingredients,
  ingredientName
) => {
  let count = 0;
  recipes.forEach((elem) => {
    elem.ingredients.forEach((x) => {
      if (x == findIdByName(ingredients, ingredientName)) {
        count++;
      }
    });
  });
  return count;
};

/*
  Añade una comida a la lista de comidas. 
  Una comida cuenta con un id, una fecha, y una receta.
*/
export const addFood = (foods, day, recipe) => {
  const newFood = {
    id: Date.now(),
    day: day,
    recipe: recipe,
  };

  foods.push(newFood);
  return foods;
};

/*
  Obtiene todas las comidas registradas en un día específico.
*/
export const getFoodsByDay = (foods, day) => {
  let foodsByDay = [];
  foods.forEach((food) => {
    if (food.date == day) {
      foodsByDay.push(food);
    }
  });
  return foodsByDay;
};

/*
  Obtiene todas las comidas registradas en un rango de días.
*/
export const getFoodsInRange = (foods, day1, day2) => {
  let foodsInRange = [];
  let date1 = new Date(day1).getTime();
  let date2 = new Date(day2).getTime();
  foods.forEach((food) => {
    let dateFood = new Date(food.day).getTime();
    if (dateFood > date1 && dateFood < date2) {
      foodsInRange.push(food);
    }
  });
  return foodsInRange;
};

/*
  Recibe una lista de comidas y debe retornar la cantidad de calorías, proteinas,
  carbs, grasas, y azúcares que hay en total en esa lista de comidas.
  Ejemplo de respuesta:
  {
    sugars: 20,
    carbs: 150,
    fats: 10,
    calories: 700,
    proteins: 40
  }
*/
const findRecipeByName = (name, recipes) => {
  let recipe = {};
  recipes.forEach((elem) => {
    if (elem.name === name) recipe = elem;
  });
  return recipe;
};
export const calculateNutritionalInfoByFood = (foods, recipes, ingredients) => {
  const nutritionalInfo = {
    carbs: findCriteriaByRecipe(
      findRecipeByName(foods.recipe, recipes),
      ingredients,
      "carbs"
    ),
    calories: findCriteriaByRecipe(
      findRecipeByName(foods.recipe, recipes),
      ingredients,
      "calories"
    ),
    sugars: findCriteriaByRecipe(
      findRecipeByName(foods.recipe, recipes),
      ingredients,
      "sugars"
    ),
    proteins: findCriteriaByRecipe(
      findRecipeByName(foods.recipe, recipes),
      ingredients,
      "proteins"
    ),
    fats: findCriteriaByRecipe(
      findRecipeByName(foods.recipe, recipes),
      ingredients,
      "fats"
    ),
  };
  return nutritionalInfo;
};

export const calculateNutritionalInfo = (foods, recipes, ingredients) => {
  let carbsAll = 0;
  let caloriesAll = 0;
  let sugarAll = 0;
  let proteinsAll = 0;
  let fatsAll = 0;

  foods.forEach((food) => {
    carbsAll += findCriteriaByRecipe(
      findRecipeByName(food.recipe, recipes),
      ingredients,
      "carbs"
    );
    caloriesAll += findCriteriaByRecipe(
      findRecipeByName(food.recipe, recipes),
      ingredients,
      "calories"
    );
    proteinsAll += findCriteriaByRecipe(
      findRecipeByName(food.recipe, recipes),
      ingredients,
      "proteins"
    );
    sugarAll += findCriteriaByRecipe(
      findRecipeByName(food.recipe, recipes),
      ingredients,
      "sugars"
    );
    fatsAll += findCriteriaByRecipe(
      findRecipeByName(food.recipe, recipes),
      ingredients,
      "fats"
    );
  });

  const nutritionInfo = {
    sugars: sugarAll,
    carbs: carbsAll,
    fats: fatsAll,
    calories: caloriesAll,
    proteins: proteinsAll,
  };

  return nutritionInfo;
};
