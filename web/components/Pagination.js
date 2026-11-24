import Link from "next/link";

export default function Pagination({ category, sort, page, pages, total }) {
  function hrefFor(target) {
    const query = new URLSearchParams();
    if (category) query.set("category", category);
    query.set("sort", sort);
    query.set("page", String(target));
    return `/recipes?${query}`;
  }

  return (
    <nav className="pagination">
      {page > 1 ? (
        <Link href={hrefFor(page - 1)}>Previous</Link>
      ) : (
        <span>Previous</span>
      )}
      <span>
        Page {page} of {Math.max(pages, 1)} ({total} recipes)
      </span>
      {page < pages ? (
        <Link href={hrefFor(page + 1)}>Next</Link>
      ) : (
        <span>Next</span>
      )}
    </nav>
  );
}
