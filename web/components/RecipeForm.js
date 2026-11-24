"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const emptyIngredient = { name: "", quantity: "", unit: "" };

function FieldError({ message }) {
  if (!message) return null;
  return (
    <p className="field-error" role="alert">
      {message}
    </p>
  );
}

// "ingredients[0].name" (our validator) -> "ingredients.0.name" (Mongoose)
function normalizeDetails(details = {}) {
  const result = {};
  for (const [key, message] of Object.entries(details)) {
    result[key.replace(/\[(\d+)\]/g, ".$1")] = message;
  }
  return result;
}

export default function RecipeForm({ recipe }) {
  const router = useRouter();
  const [values, setValues] = useState({
    name: recipe?.name ?? "",
    description: recipe?.description ?? "",
    category: recipe?.category ?? "",
    servings: recipe?.servings ?? "",
    prepTimeMinutes: recipe?.prepTimeMinutes ?? "",
    cookTimeMinutes: recipe?.cookTimeMinutes ?? "",
    instructions: recipe?.instructions ?? "",
  });
  const [ingredients, setIngredients] = useState(
    recipe?.ingredients ?? [emptyIngredient],
  );
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [sending, setSending] = useState(false);

  function handleChange(event) {
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  function changeIngredient(index, field, value) {
    setIngredients(
      ingredients.map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      ),
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSending(true);
    setErrors({});
    setFormError("");

    const payload = {
      ...values,
      servings: Number(values.servings),
      prepTimeMinutes: Number(values.prepTimeMinutes),
      cookTimeMinutes: Number(values.cookTimeMinutes),
      ingredients: ingredients.map((item) => ({
        ...item,
        quantity: Number(item.quantity),
      })),
    };

    try {
      const response = await fetch(
        recipe ? `/api/recipe/${recipe.id}` : "/api/recipe",
        {
          method: recipe ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const body = await response.json();

      if (!response.ok) {
        setErrors(normalizeDetails(body.error.details));
        setFormError(body.error.message);
        setSending(false);
        return;
      }
      router.push(`/recipes/${body.data.id}`);
      router.refresh();
    } catch {
      setFormError("Could not reach the server. Please try again.");
      setSending(false);
    }
  }

  function field(name, label, type = "text") {
    return (
      <label>
        {label}
        <input
          name={name}
          type={type}
          value={values[name]}
          onChange={handleChange}
        />
        <FieldError message={errors[name]} />
      </label>
    );
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      {formError && (
        <p className="form-error" role="alert">
          {formError}
        </p>
      )}

      {field("name", "Name")}
      {field("description", "Description")}

      <label>
        Category
        <select name="category" value={values.category} onChange={handleChange}>
          <option value="">Choose one</option>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
          <option value="snack">Snack</option>
        </select>
        <FieldError message={errors.category} />
      </label>

      {field("servings", "Servings", "number")}
      {field("prepTimeMinutes", "Prep time (minutes)", "number")}
      {field("cookTimeMinutes", "Cook time (minutes)", "number")}

      <fieldset>
        <legend>Ingredients</legend>
        <FieldError message={errors.ingredients} />
        {ingredients.map((item, index) => (
          <div className="ingredient" key={index}>
            {["name", "quantity", "unit"].map((key) => (
              <label key={key}>
                {key}
                <input
                  type={key === "quantity" ? "number" : "text"}
                  value={item[key]}
                  onChange={(event) =>
                    changeIngredient(index, key, event.target.value)
                  }
                />
                <FieldError message={errors[`ingredients.${index}.${key}`]} />
              </label>
            ))}
            <button
              type="button"
              onClick={() =>
                setIngredients(ingredients.filter((_, i) => i !== index))
              }
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => setIngredients([...ingredients, emptyIngredient])}
        >
          Add ingredient
        </button>
      </fieldset>

      <label>
        Instructions
        <textarea
          name="instructions"
          rows={5}
          value={values.instructions}
          onChange={handleChange}
        />
        <FieldError message={errors.instructions} />
      </label>

      <button type="submit" disabled={sending}>
        {sending ? "Saving..." : "Save recipe"}
      </button>
    </form>
  );
}
