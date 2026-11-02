import { Router } from "express";
import {
  getRecipes,
  createRecipes,
  updateRecipes,
  deleteRecipes,
} from "../controllers/recipeController.js";
import { validateRecipe } from "../middleware/validateRecipe.js";

export const RecipesRouter = Router();

RecipesRouter.get("/:id", getRecipes);
RecipesRouter.post("/:id", validateRecipe(), createRecipes);
RecipesRouter.patch("/:id", validateRecipe({ partial: true }), updateRecipes);
RecipesRouter.delete("/:id", deleteRecipes);
