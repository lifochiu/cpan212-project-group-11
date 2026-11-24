import Link from "next/link";
import { getFromApi } from "@/lib/api";
import RecipeControls from "@/components/RecipeControls";
import Pagination from "@/components/Pagination";

export default async function RecipeListPage({ searchParams }) {
  const { category = "", sort = "-createdAt", page = "1" } = await searchParams;
  const query = new URLSearchParams({ sort, page, limit: "10" });
  if (category) query.set("category", category);
  const result = await getFromApi(`/api/recipe?${query}`);

  return (
    <>
      <h1>Recipes</h1>
      <RecipeControls category={category} sort={sort} />
      {result.data.length === 0 ? (
        <p>No recipe found.</p>
      ) : (
        <ul className="list">
          {result.data.map((recipe) => (
            <li key={recipe.id}>
              <Link href={`/recipes/${recipe.id}`}>{recipe.name}</Link>
              <span>
                {recipe.category},{recipe.cookTimeMinutes}
              </span>
            </li>
          ))}
        </ul>
      )}
      <Pagination
        category={category}
        sort={sort}
        page={result.page}
        pages={result.pages}
        total={result.total}
      />
    </>
  );
}
