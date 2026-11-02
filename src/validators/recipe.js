import { type } from "node:os";

export function validateRecipeInput(body, { partial = false } = {}) {
  if (typeof body !== "object" || body == null || Array.isArray(body))
    return {
      value: {},
      errors: { body: "Need send a JSON object" },
    };

  const value = {};
  const errors = {};
  const shouldValidate = (field) => !partial || Object.hasOwn(body, field);

  //name
  if (shouldValidate("name")) {
    if (typeof body.name !== "string" || body.name.trim() === "") {
      errors.name = "name must be a non-empty string";
    } else {
      value.name = body.name.trim();
    }
  }

  //description
  if (shouldValidate("description")) {
    if (
      typeof body.description !== "string" ||
      body.description.trim() === ""
    ) {
      errors.description = "description must be a non-empty string";
    } else {
      value.description = body.description.trim();
    }
  }

  //servings
  if (shouldValidate("servings")) {
    if (!Number.isInteger(body.servings) || body.servings < 1) {
      errors.servings = "servings must be an integer >= 1";
    } else {
      value.servings = body.servings;
    }
  }

  //prepTimeMinutes
  if (shouldValidate("prepTimeMinutes")) {
    if (!Number.isInteger(body.prepTimeMinutes) || body.prepTimeMinutes < 1) {
      errors.prepTimeMinutes = "prepTimeMinutes must be an integer >= 1";
    } else {
      value.prepTimeMinutes = body.prepTimeMinutes;
    }
  }

  //cookTimeMinutes
  if (shouldValidate("cookTimeMinutes")) {
    if (!Number.isInteger(body.cookTimeMinutes) || body.cookTimeMinutes < 1) {
      errors.cookTimeMinutes = "cookTimeMinutes must be an integer >= 1";
    } else {
      value.cookTimeMinutes = body.cookTimeMinutes;
    }
  }

  //ingredients
  if (shouldValidate("ingredients")) {
    if (!Array.isArray(body.ingredients) || body.ingredients.length === 0) {
      errors.ingredients = "ingredients must be a non-empty array";
    } else {
      const ingredients = [];
      body.ingredients.forEach((ingredient, index) => {
        const path = `ingredients[${index}]`;
        if (
          typeof ingredient !== "object" ||
          ingredient === null ||
          Array.isArray(ingredient)
        ) {
          errors[path] = "each ingredient must be an object";
          return;
        }
        //ingredient.name
        if (
          typeof ingredient.name !== "string" ||
          ingredient.name.trim() === ""
        ) {
          errors[`${path}.name`] = "name must be a non-empty string";
        }
        //ingredient.quantity
        if (!Number.isFinite(ingredient.quantity) || ingredient.quantity <= 0) {
          errors[`${path}.quantity`] = "quantity must be a number > 0";
        }
        //ingredient.unit
        if (
          typeof ingredient.unit !== "string" ||
          ingredient.unit.trim() === ""
        ) {
          errors[`${path}.unit`] = "unit must be a non-empty string";
        }

        if (
          !errors[`${path}.name`] &&
          !errors[`${path}.quantity`] &&
          !errors[`${path}.unit`]
        ) {
          ingredients.push({
            name: ingredient.name.trim(),
            quantity: ingredient.quantity,
            unit: ingredient.unit.trim(),
          });
        }
      });
      if (ingredients.length === body.ingredients.length) {
        value.ingredients = ingredients;
      }
    }
  }
  //instructions
  if (shouldValidate("instructions")) {
    if (
      typeof body.instructions !== "string" ||
      body.instructions.trim() === ""
    ) {
      errors.instructions = "instructions must be a non-empty string";
    } else {
      value.instructions = body.instructions.trim();
    }
  }
  return { value, errors };
}
