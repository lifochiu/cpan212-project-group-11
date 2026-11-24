export async function getFromApi(path) {
  const response = await fetch(`${process.env.API_URL}${path}`, {
    cache: "no-store",
  });
  if (response.status === 404) return null;
  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.error?.message ?? "The API returned an error");
  }
  return body;
}
