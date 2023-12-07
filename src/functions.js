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
  console.log("addIngredient");
  console.log(ingredients);
  console.log(name);
  console.log(calories);
  console.log(proteins);
  console.log(carbs);
  console.log(fats);
  console.log(sugars);
  console.log(gramsPerRation);

  const newIngredient = {
    name:name, 
    calories:calories, 
    proteins:proteins, 
    carb: carbs,
    fats:fats,
    sugars:sugars,
    gramsPerRation:gramsPerRation
    };
    ingredients.push(newIngredient);

  return ingredients;
};


/*
  Recibe la lista de ingredientes y busca en ella los ingredientes cuyo nombre hagan match
  con el nombre recibido en parámetro. Retorna una lista de ingredientes. Si no hay ninguno
  que haga match retorna una lista vacía.
*/
export const searchIngredients = (ingredients, name) => {
  console.log("searchIngredients");
  console.log(ingredients);
  console.log(name);
  return [];
};

/*
  Recibe una lista de ingredientes y los ordena según el criterio recibido
  criteria es un string que puede tener los valores: 'name', 'calories', 'proteins'
  Retorna la lista de ingredientes ordenada por el criterio
*/
export const orderIngredients = (ingredients, criteria) => {
  console.log("orderIngredients");
  console.log(ingredients);
  console.log(criteria);
  return ingredients;
};

/*
  Recibe una lista de ingredientes y los filtra según el criterio recibido
  criteria es un string que puede tener los valores: 'name', 'calories', 'proteins'
  value es el filtro.
  Retorna la lista de ingredientes filtrada por el criterio
  Por ejemplo:
    criteria: 'calories'
    value1: 30
    value2: 50
  Debería retornar la lista de ingredientes con entre 30 y 50 calorias
*/
export const filterIngredients = (ingredients, criteria, value1, value2) => {
  console.log("filterIngredients");
  console.log(ingredients);
  console.log(criteria);
  console.log(value1);
  console.log(value2);
  return [];
};

/**
  Añade una receta a la lista de recetas.
  Recibe la lista de recetas, la lista de ingredientes que tiene la nueva receta.
  La cantidad de veces que tiene cada ingrediente, y el nombre de la receta.
  Retorna la lista de recetas con la nueva receta añadida.
  Cada receta tiene un id, un nombre, una lista de ingredientes, y una lista que 
  representa la cantidad de veces que se usa cada ingrediente
  Ejemplo:
    Puede recibir una receta con 2 ingredientes
    [{name: 'huevo' ...}, {name: 'arroz' ...}]
    Y con la siguiente cantidad de ingredientes
    [2, 1]
    Esto significaría que la receta usa 2 porciones de huevo, y 1 porción de arroz.
 */
export const addRecipe = (recipes, ingredients, ingredientsAmount, name) => {
  console.log("addRecipe");
  console.log(recipes);
  console.log(ingredients);
  console.log(ingredientsAmount);
  console.log(name);
  return recipes;
};

/*
  Recibe una lista de recetas y las ordena según el criterio recibido
  criteria puede tener los valores: 'name', 'numberOfIngredients', 'calories', 'proteins'
  Retorna la lista de ingredientes ordenada por el criterio
*/
export const orderRecipes = (recipes, criteria) => {
  console.log("orderRecipes");
  console.log(recipes);
  console.log(criteria);
  return recipes;
};

/*
  Recibe una lista de recetas y las filtra según el criterio recibido
  criteria puede tener los valores: 'name', 'numberOfIngredients', 'calories', 'proteins'
  Retorna la lista de ingredientes ordenada por el criterio
*/
export const filterRecipes = (recipes, criteria, value1, value2) => {
  console.log("filterRecipes");
  console.log(recipes);
  console.log(criteria);
  console.log(value1);
  console.log(value2);
  return recipes;
};

/*
  Recibe la lista de recetas y busca en ella las recetas cuyo nombre hagan match
  con el nombre recibido en parámetro. Retorna una lista de recetas. Si no hay ninguna
  que haga match retorna una lista vacía.
*/
export const searchRecipes = (recipes, name) => {
  console.log("searchRecipes");
  console.log(recipes);
  console.log(name);
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
  console.log("countNumberOfTimesAnIngredientIsUsed");
  console.log(recipes);
  console.log(ingredients);
  console.log(ingredientName);
  return null;
};

/*
  Recibe 2 recetas y retorna la lista de ingredientes que tienen en común
*/
export const getIngredientsInCommon = (recipe1, recipe2) => {
  console.log("getIngredientsInCommon");
  console.log(recipe1);
  console.log(recipe2);
  return [];
};

/*
  Añade una comida a la lista de comidas. 
  Una comida cuenta con un id, una fecha, y una receta.
*/
export const addFood = (foods, day, recipe) => {
  console.log("addFood");
  console.log(foods);
  console.log(day);
  console.log(recipe);
  return foods;
};

/*
  Obtiene todas las comidas registradas en un día específico.
*/
export const getFoodsByDay = (foods, day) => {
  console.log("getFood");
  console.log(foods);
  console.log(day);
  return [];
};

/*
  Obtiene todas las comidas registradas en un rango de días.
*/
export const getFoodsInRange = (foods, day1, day2) => {
  console.log("getFoodsInRange");
  console.log(foods);
  console.log(day1);
  console.log(day2);
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
  console.log("calculateNutritionalInfo");
  console.log(foods);
  console.log(recipes);
  console.log(ingredients);
  return {};
};
