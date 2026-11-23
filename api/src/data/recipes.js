import { randomUUID } from "node:crypto";

const recipes = [
  {
    id: "recipe1",
    name: "Scrambled Eggs on Toast",
    description: "A simple breakfast with eggs and whole wheat toast.",
    servings: 1,
    prepTimeMinutes: 5,
    cookTimeMinutes: 5,
    ingredients: [
      { name: "Egg", quantity: 2, unit: "piece" },
      { name: "Whole wheat bread", quantity: 2, unit: "slice" },
      { name: "Butter", quantity: 5, unit: "g" },
      { name: "Salt", quantity: 1, unit: "pinch" },
    ],
    instructions:
      "Beat the eggs with the salt in a bowl. Melt the butter in a pan over medium-low heat. Add the eggs and stir gently until cooked. Toast the bread and serve with the scrambled eggs.",
  },
  {
    id: "recipe2",
    name: "Chicken Rice Bowl",
    description: "A rice bowl with chicken breast and broccoli.",
    servings: 2,
    prepTimeMinutes: 10,
    cookTimeMinutes: 25,
    ingredients: [
      { name: "Chicken breast", quantity: 300, unit: "g" },
      { name: "Uncooked rice", quantity: 150, unit: "g" },
      { name: "Broccoli", quantity: 200, unit: "g" },
      { name: "Olive oil", quantity: 1, unit: "tbsp" },
      { name: "Soy sauce", quantity: 1, unit: "tbsp" },
    ],
    instructions:
      "Cook the rice according to the package instructions. Cut the chicken into bite-sized pieces. Heat the olive oil in a pan and cook the chicken until fully cooked. Steam the broccoli until tender. Divide the rice, chicken, and broccoli between two bowls. Add the soy sauce and serve.",
  },
  {
    id: "recipe3",
    name: "Tomato Pasta",
    description: "An easy pasta dish with tomato sauce and garlic.",
    servings: 2,
    prepTimeMinutes: 5,
    cookTimeMinutes: 20,
    ingredients: [
      { name: "Dry pasta", quantity: 200, unit: "g" },
      { name: "Canned chopped tomatoes", quantity: 400, unit: "g" },
      { name: "Garlic", quantity: 2, unit: "clove" },
      { name: "Olive oil", quantity: 1, unit: "tbsp" },
      { name: "Salt", quantity: 0.5, unit: "tsp" },
    ],
    instructions:
      "Cook the pasta according to the package instructions. Peel and finely chop the garlic. Heat the olive oil in a pan and gently cook the garlic. Add the tomatoes and salt, then simmer for 15 minutes. Drain the pasta and mix it with the sauce.",
  },
];

export function findRecipesById(id) {
  return recipes.find((recipe) => recipe.id === id);
}

export function createRecipe(fields) {
  const recipe = {
    id: randomUUID(),
    ...fields,
    createAt: new Date().toISOString(),
  };
  recipes.push(recipe);
  return recipe;
}

export function updateRecipeById(id, changes) {
  const recipe = findRecipesById(id);
  if (recipe) {
    Object.assign(recipe, changes);
  }
  return recipe;
}

export function deleteRecipeById(id) {
  const index = recipes.findIndex((recipe) => recipe.id === id);
  if (index === -1) {
    return false;
  }
  recipes.splice(index, 1);
  return true;
}
