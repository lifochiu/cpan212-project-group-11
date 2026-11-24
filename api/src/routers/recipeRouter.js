import { Router } from "express";
import {
  getRecipes,
  createRecipes,
  updateRecipes,
  deleteRecipes,
  listRecipes,
} from "../controllers/recipeController.js";
import { validateRecipe } from "../middleware/validateRecipe.js";
import mongoose from "mongoose";
import { HttpError } from "../utils/httpError.js";

export const RecipesRouter = Router();

RecipesRouter.param("id", (req, res, next, id) => {
  if (!mongoose.isValidObjectId(id)) {
    throw new HttpError(404, "Recipe not found");
  }
  next();
});

RecipesRouter.get("/", listRecipes);
RecipesRouter.get("/:id", getRecipes);
RecipesRouter.post("/", validateRecipe(), createRecipes);
RecipesRouter.patch("/:id", validateRecipe({ partial: true }), updateRecipes);
RecipesRouter.delete("/:id", deleteRecipes);
