import Link from "next/link";
import { notFound } from "next/navigation";
import { getFromApi } from "@/lib/api";

export default async function RecipePage({ params }) {
  const { id } = await params;
  const result = await getFromApi(`/api/recipe/${encodeURIComponent(id)}`);
  if (!result) notFound();

  const recipe = result.data;
  return (
    <>
      <h1>{recipe.name}</h1>
      <p>{recipe.description}</p>
      <p>
        {recipe.category}, serves {recipe.servings}, prep{" "}
        {recipe.prepTimeMinutes} min, cook {recipe.cookTimeMinutes} min
      </p>
      <h2>Ingredients</h2>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient.quantity} {ingredient.unit} {ingredient.name}
          </li>
        ))}
      </ul>
      <h2>Instructions</h2>
      <p>{recipe.instructions}</p>
      <Link href={`/recipes/${recipe.id}/edit`}>Edit recipe</Link>
    </>
  );
}
