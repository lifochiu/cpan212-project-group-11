import path from "node:path";
import express from "express";
import { requestLogger } from "./middleware/request-looger.js";
import { RecipesRouter } from "./routers/recipeRouter.js";
import { notFound } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { getFoods } from "./controllers/foodController.js";

export const app = express();

app.use(requestLogger);
app.use(express.json());
app.use(express.static(path.join(import.meta.dirname, "..", "public")));
app.use("/api/recipe", RecipesRouter);
app.get("/api/foods/search", getFoods);
app.use(notFound);
app.use(errorHandler);
