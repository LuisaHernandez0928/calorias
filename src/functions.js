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

function findRange(arr, criteria, min, max) {
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
}

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
  return null;
};

/*
  Recibe una lista de recetas y las ordena según el criterio recibido
  criteria puede tener los valores: 'name', 'numingredients', 'calories', 'proteins'
  Retorna la lista de ingredientes ordenada por el criterio
*/
export const orderRecipes = (recipes, ingredients, criteria) => {
  return recipes;
};

/*
  Recibe una lista de recetas y las filtra según el criterio recibido
  criteria puede tener los valores: 'calories', 'proteins'
  Retorna la lista de ingredientes ordenada por el criterio
*/
export const filterRecipes = (
  recipes,
  ingredients,
  criteria,
  value1,
  value2
) => {
  return recipes;
};

/*
  Recibe la lista de recetas y busca en ella las recetas cuyo nombre hagan match
  con el nombre recibido en parámetro. Retorna una lista de recetas. Si no hay ninguna
  que haga match retorna una lista vacía.
*/
export const searchRecipes = (recipes, name) => {
  return recipes;
};

/*
  Recibe la lista de recetas y busca la cantidad recetas que usan un ingrediente especificado
  Retorna el número de veces que el ingrediente se usa en todas las recetas
*/
export const countNumberOfTimesAnIngredientIsUsed = (
  recipes,
  ingredients,
  ingredientName
) => {
  return 0;
};

/*
  Añade una comida a la lista de comidas. 
  Una comida cuenta con un id, una fecha, y una receta.
*/
export const addFood = (foods, day, recipe) => {
  return foods;
};

/*
  Obtiene todas las comidas registradas en un día específico.
*/
export const getFoodsByDay = (foods, day) => {
  return [];
};

/*
  Obtiene todas las comidas registradas en un rango de días.
*/
export const getFoodsInRange = (foods, day1, day2) => {
  return [];
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
export const calculateNutritionalInfo = (foods, recipes, ingredients) => {
  return {
    carbs: 0,
    calories: 0,
    sugars: 0,
    proteins: 0,
    fats: 0,
  };
};
