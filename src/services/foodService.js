import { HttpError } from "../utils/httpError.js";
import { TtlCache } from "../lib/cache.js";
import { error } from "node:console";

const foodCache = new TtlCache(60);
const nutrientNumbers = ["203", "204", "205", "208"];

export async function searchFoods(query) {
  const cacheKey = query.trim().toLowerCase();
  const cached = foodCache.get(cacheKey);

  if (cached !== undefined) {
    console.log(`[cache hit] food search: ${cacheKey}`);
    return cached;
  }
  const apiKey = process.env.USDA_API_KEY;

  if (!apiKey) throw new HttpError(500, "USDA API key is not configured");

  const url = new URL("https://api.nal.usda.gov/fdc/v1/foods/search");
  url.searchParams.set("api_key", apiKey);
  url.searchParams.set("query", cacheKey);
  url.searchParams.set("pageSize", "1");

  const signal = AbortSignal.timeout(5000);
  try {
    const respone = await fetch(url, { signal });
    if (!respone.ok)
      throw new HttpError(502, "External food API returned an error");

    const externalData = await respone.json();
    if (!Array.isArray(externalData.foods))
      throw new HttpError(502, "External food API returned invalid data");

    const foods = externalData.foods.map((food) => ({
      id: food.fdcId,
      name: food.description,

      nutrients: (food.foodNutrients ?? [])
        .filter((nutrient) =>
          nutrientNumbers.includes(String(nutrient.nutrientNumber)),
        )
        .map((nutrient) => ({
          number: String(nutrient.nutrientNumber),
          name: nutrient.nutrientName,
          value: nutrient.value,
          unit: nutrient.unitName,
        })),
    }));

    foodCache.set(cacheKey, foods);
    return foods;
  } catch (error) {
    if (error instanceof HttpError) throw error;

    if (signal.aborted) throw new HttpError(504, "External food API timed out");

    throw new HttpError(502, "Unable to retrieve food data");
  }
}
