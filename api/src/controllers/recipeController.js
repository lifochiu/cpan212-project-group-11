import { HttpError } from "../utils/httpError.js";

import { Recipe } from "../models/recipe.js";

const SORT_FIELDS = ["name", "cookTimeMinutes", "createdAt"];
const MAX_LIMIT = 50;

function positiveInt(value, fallback, name) {
  if (value === undefined) return fallback;
  if (typeof value !== "string" || !/^[1-9]\d{0,5}$/.test(value)) {
    throw new HttpError(400, "Invalid query", {
      [name]: `${name} must be a positive integer`,
    });
  }
  return Number(value);
}

export async function listRecipes(req, res) {
  const { category, q, sort = "-createdAt" } = req.query;
  const page = positiveInt(req.query.page, 1, "page");
  const limit = Math.min(positiveInt(req.query.limit, 10, "limit"), MAX_LIMIT);
  const desc = String(sort).startsWith("-");
  const field = desc ? String(sort).slice(1) : sort;
  if (!SORT_FIELDS.includes(field)) {
    throw new HttpError(400, "Invalid query", {
      sort: `sort must be one of: ${SORT_FIELDS.join(",")}`,
    });
  }
  const filter = {};
  if (category) {
    if (!Recipe.schema.path("category").enumValues.includes(category)) {
      throw new HttpError(400, "Invalid query", {
        category: "unknown category",
      });
    }
    filter.category = category;
  }
  if (typeof q === "string" && q.trim()) {
    filter.name = new RegExp(RegExp.escape(q.trim()), "i");
  }
  const [data, total] = await Promise.all([
    Recipe.find(filter)
      .sort({ [field]: desc ? -1 : 1, _id: 1 })
      .skip((page - 1) * limit)
      .limit(limit),
    Recipe.countDocuments(filter),
  ]);

  res.json({ data, total, page, limit, pages: Math.ceil(total / limit) });
}

export async function getRecipes(req, res) {
  const recipe = await Recipe.findById(req.params.id);
  if (!recipe) throw new HttpError(404, "Recipe not found");
  res.json({ data: recipe });
}

export async function createRecipes(req, res) {
  const recipe = await Recipe.create(req.body);
  res.location(`/api/recipe/${recipe.id}`).status(201).json({ data: recipe });
}

export async function updateRecipes(req, res) {
  const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
    returnDocument: "after",
    runValidators: true,
  });
  if (!recipe) throw new HttpError(404, "Recipe not found");
  res.json({ data: recipe });
}

export async function deleteRecipes(req, res) {
  const recipe = await Recipe.findByIdAndDelete(req.params.id);
  if (!recipe) throw new HttpError(404, "Recipe not found");
  res.status(204).end();
}
