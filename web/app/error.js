"use client";

export default function ErrorPage({ retry }) {
  return (
    <>
      <h1>Something went wrong</h1>
      <p>The data could not be loaded. Please try again.</p>
      <button onClick={() => retry()}>Try again</button>
    </>
  );
}
