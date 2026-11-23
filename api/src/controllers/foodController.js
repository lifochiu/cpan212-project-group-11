import { searchFoods } from "../services/foodService.js";
import { HttpError } from "../utils/httpError.js";

export async function getFoods(req, res) {
  const query = req.query.q;

  if (typeof query !== "string" || !query.trim()) {
    throw new HttpError(400, "Query parameter q is required");
  }

  const foods = await searchFoods(query);

  res.json({
    data: foods,
  });
}
