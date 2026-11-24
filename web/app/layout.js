import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Meal Planner",
  description: "Personal meal planner and recipe manager",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="header">
          <Link href="/recipes">Recipes</Link>
          <Link href="/recipes/new">New recipe</Link>
        </header>
        <main className="main">{children}</main>
      </body>
    </html>
  );
}
