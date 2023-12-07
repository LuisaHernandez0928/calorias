export const initialIngredients = [
  {
    id: 1,
    name: 'egg',
    calories: 50,
    proteins: 6,
    carbs: 0,
    fats: 4,
    sugars: 0,
    gramsPerRation: 30
  },
  {
    id: 2,
    name: 'rice',
    calories: 100,
    proteins: 2,
    carbs: 120,
    fats: 2,
    sugars: 2,
    gramsPerRation: 80
  },
  {
    id: 3,
    name: 'chicken breast',
    calories: 120,
    proteins: 28,
    carbs: 5,
    fats: 8,
    sugars: 0,
    gramsPerRation: 100
  }
];

export const initialIRecipes = [
  {
    id: 1,
    name: 'Rice with chicken',
    ingredients: [
      'rice',
      'chicken breast'
    ],
    ingredientsAmount: [1, 1]
  },
  {
    id: 2,
    name: 'Rice with eggs',
    ingredients: [
      'rice',
      'egg'
    ],
    ingredientsAmount: [1, 2]
  }
];

export const initialFoods = [
  {
    id: 1,
    day: '07/12/2023',
    recipe: 'Rice with eggs'
  },
  {
    id: 2,
    day: '07/12/2023',
    recipe: 'Rice with chicken'
  },
];