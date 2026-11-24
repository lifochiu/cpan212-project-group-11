import { notFound } from "next/navigation";
import { getFromApi } from "@/lib/api";
import RecipeForm from "@/components/RecipeForm";

export default async function EditRecipePage({ params }) {
  const { id } = await params;
  const result = await getFromApi(`/api/recipe/${encodeURIComponent(id)}`);
  if (!result) notFound();

  return (
    <>
      <h1>Edit recipe</h1>
      <RecipeForm recipe={result.data} />
    </>
  );
}
