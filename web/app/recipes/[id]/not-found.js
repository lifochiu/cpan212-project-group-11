import Link from "next/link";

export default function RecipeNotFound() {
  return (
    <>
      <h1>Recipe not found</h1>
      <p>This recipe does not exist or was deleted.</p>
      <Link href="/recipes">Back to recipes</Link>
    </>
  );
}
