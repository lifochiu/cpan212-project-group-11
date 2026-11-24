import { Router } from "express";
import mongoose from "mongoose";
import {
  listMealPlans,
  getMealPlan,
  createMealPlan,
  updateMealPlan,
  deleteMealPlan,
} from "../controllers/mealPlanController.js";
import { HttpError } from "../utils/httpError.js";

export const MealPlansRouter = Router();

MealPlansRouter.param("id", (req, res, next, id) => {
  if (!mongoose.isValidObjectId(id)) {
    throw new HttpError(404, "Meal plan not found");
  }
  next();
});

MealPlansRouter.get("/", listMealPlans);
MealPlansRouter.get("/:id", getMealPlan);
MealPlansRouter.post("/", createMealPlan);
MealPlansRouter.patch("/:id", updateMealPlan);
MealPlansRouter.delete("/:id", deleteMealPlan);
