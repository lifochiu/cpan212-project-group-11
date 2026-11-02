import { HttpError } from "../utils/httpError.js";
import {
  findRecipesById,
  createRecipe,
  updateRecipeById,
  deleteRecipeById,
} from "../data/recipes.js";

export function getRecipes(req, res) {
  const recipe = findRecipesById(req.params.id);
  if (!recipe) throw new HttpError(404, "Recipe not found");
  res.json({ data: recipe });
}
export function createRecipes(req, res) {
  const recipe = createRecipe(req.body);
  res.location(`/api/recipe/${recipe.id}`).status(201).json({ data: recipe });
}
export function updateRecipes(req, res) {
  const recipe = updateRecipeById(req.params.id, req.body);
  if (!recipe) throw new HttpError(404, "Recipe not found");
  res.json({ data: recipe });
}
export function deleteRecipes(req, res) {
  if (!deleteRecipeById(req.params.id))
    throw new HttpError(404, "Recipe not found");
  res.status(204).end();
}
