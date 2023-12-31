export const initialIngredients = [
  {
    id: 1,
    name: "egg",
    calories: 50,
    proteins: 6,
    carbs: 0,
    fats: 4,
    sugars: 0,
    gramsPerRation: 30,
  },
  {
    id: 2,
    name: "chicken breast",
    calories: 120,
    proteins: 28,
    carbs: 5,
    fats: 8,
    sugars: 0,
    gramsPerRation: 100,
  },
  {
    id: 3,
    name: "rice",
    calories: 100,
    proteins: 2,
    carbs: 120,
    fats: 2,
    sugars: 2,
    gramsPerRation: 80,
  },
];

export const initialIRecipes = [
  {
    id: 1,
    name: "Rice with chicken",
    ingredients: [3, 2],
    ingredientsAmount: [1, 1],
  },
  {
    id: 2,
    name: "Rice with eggs",
    ingredients: [3, 1],
    ingredientsAmount: [1, 2],
  },
];

export const initialFoods = [
  {
    id: 1,
    day: "2023-12-07",
    recipe: "Rice with eggs",
  },
  {
    id: 2,
    day: "2023-12-07",
    recipe: "Rice with chicken",
  },
];
