import { HttpError } from "../utils/httpError.js";
import { validateRecipeInput } from "../validators/recipe.js";
export function validateRecipe({ partial = false } = {}) {
  return (req, res, next) => {
    const { value, errors } = validateRecipeInput(req.body, { partial });
    if (Object.keys(errors).length > 0)
      throw new HttpError(400, "Validation failed", errors);

    req.body = value;
    next();
  };
}
