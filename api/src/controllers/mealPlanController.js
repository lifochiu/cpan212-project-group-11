import { MealPlan } from "../models/mealPlan.js";
import { HttpError } from "../utils/httpError.js";

const FIELDS = ["name", "date", "recipes"];

function pickFields(body) {
  const value = {};
  for (const field of FIELDS) {
    if (body?.[field] !== undefined) value[field] = body[field];
  }
  return value;
}

export async function listMealPlans(req, res) {
  const plans = await MealPlan.find().sort({ date: 1, _id: 1 });
  res.json({ data: plans });
}

export async function getMealPlan(req, res) {
  const plan = await MealPlan.findById(req.params.id).populate("recipes");
  if (!plan) throw new HttpError(404, "Meal plan not found");
  res.json({ data: plan });
}

export async function createMealPlan(req, res) {
  const plan = await MealPlan.create(pickFields(req.body));
  res.location(`/api/meal-plans/${plan.id}`).status(201).json({ data: plan });
}

export async function updateMealPlan(req, res) {
  const plan = await MealPlan.findByIdAndUpdate(
    req.params.id,
    pickFields(req.body),
    { returnDocument: "after", runValidators: true },
  );
  if (!plan) throw new HttpError(404, "Meal plan not found");
  res.json({ data: plan });
}

export async function deleteMealPlan(req, res) {
  const plan = await MealPlan.findByIdAndDelete(req.params.id);
  if (!plan) throw new HttpError(404, "Meal plan not found");
  res.status(204).end();
}
