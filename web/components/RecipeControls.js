"use client";

import { useRouter } from "next/navigation";

export default function RecipeControls({ category, sort }) {
  const router = useRouter();

  function update(changes) {
    const next = { category, sort, ...changes };
    const query = new URLSearchParams();
    if (next.category) query.set("category", next.category);
    query.set("sort", next.sort);
    router.push(`/recipes?${query}`);
  }

  return (
    <div className="controls">
      <label>
        Category{" "}
        <select
          value={category}
          onChange={(event) => update({ category: event.target.value })}
        >
          <option value="">All</option>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
          <option value="snack">Snack</option>
        </select>
      </label>
      <label>
        Sort{" "}
        <select
          value={sort}
          onChange={(event) => update({ sort: event.target.value })}
        >
          <option value="-createdAt">Newest first</option>
          <option value="name">Name A-Z</option>
          <option value="-name">Name Z-A</option>
          <option value="cookTimeMinutes">Shortest cook time</option>
          <option value="-cookTimeMinutes">Longest cook time</option>
        </select>
      </label>
    </div>
  );
}
