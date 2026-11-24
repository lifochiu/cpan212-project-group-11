import mongoose from "mongoose";
import { Recipe } from "./models/recipe.js";
import { MealPlan } from "./models/mealPlan.js";

// [name, category, servings, prep minutes, cook minutes, main ingredient]
const rows = [
  ["Scrambled Eggs on Toast", "breakfast", 1, 5, 5, "Egg"],
  ["Banana Oatmeal", "breakfast", 1, 5, 10, "Rolled oats"],
  ["Blueberry Pancakes", "breakfast", 4, 10, 15, "Flour"],
  ["Veggie Omelette", "breakfast", 1, 8, 7, "Egg"],
  ["French Toast", "breakfast", 2, 5, 10, "Bread"],
  ["Breakfast Burrito", "breakfast", 2, 10, 12, "Tortilla"],
  ["Baked Granola", "breakfast", 8, 10, 30, "Rolled oats"],
  ["Shakshuka", "breakfast", 2, 10, 25, "Tomato"],
  ["Chicken Rice Bowl", "lunch", 2, 10, 25, "Chicken breast"],
  ["Tuna Melt", "lunch", 1, 5, 8, "Canned tuna"],
  ["Lentil Soup", "lunch", 4, 10, 35, "Lentils"],
  ["Grilled Cheese", "lunch", 1, 3, 6, "Cheddar"],
  ["Chicken Quesadilla", "lunch", 2, 10, 10, "Chicken breast"],
  ["Vegetable Fried Rice", "lunch", 3, 10, 12, "Cooked rice"],
  ["Tomato Soup", "lunch", 4, 10, 30, "Tomato"],
  ["Falafel Wrap", "lunch", 2, 20, 15, "Chickpeas"],
  ["Tomato Pasta", "dinner", 2, 5, 20, "Dry pasta"],
  ["Beef Stir Fry", "dinner", 3, 15, 12, "Beef strips"],
  ["Baked Salmon", "dinner", 2, 10, 18, "Salmon fillet"],
  ["Vegetable Curry", "dinner", 4, 15, 30, "Potato"],
  ["Turkey Chili", "dinner", 6, 15, 45, "Ground turkey"],
  ["Roast Chicken", "dinner", 4, 15, 75, "Whole chicken"],
  ["Mushroom Risotto", "dinner", 3, 10, 35, "Arborio rice"],
  ["Shrimp Tacos", "dinner", 3, 15, 8, "Shrimp"],
  ["Tofu Noodle Soup", "dinner", 2, 10, 15, "Tofu"],
  ["Roasted Chickpeas", "snack", 4, 5, 30, "Chickpeas"],
  ["Baked Apple Slices", "snack", 2, 5, 20, "Apple"],
  ["Popcorn", "snack", 2, 1, 5, "Popcorn kernels"],
  ["Sweet Potato Fries", "snack", 3, 10, 25, "Sweet potato"],
  ["Zucchini Muffins", "snack", 12, 15, 22, "Zucchini"],
];

const recipes = rows.map(([name, category, servings, prep, cook, main]) => ({
  name,
  description: `${name}, a simple ${category} recipe made with ${main.toLowerCase()}.`,
  category,
  servings,
  prepTimeMinutes: prep,
  cookTimeMinutes: cook,
  ingredients: [
    { name: main, quantity: 100 * servings, unit: "g" },
    { name: "Olive oil", quantity: 1, unit: "tbsp" },
    { name: "Salt", quantity: 1, unit: "pinch" },
  ],
  instructions: `Prepare the ${main.toLowerCase()} for ${prep} minutes. Cook with the olive oil and salt for ${cook} minutes, then serve.`,
}));

if (!process.env.MONGODB_URI) {
  console.error("MONGODB_URI is missing.");
  process.exit(1);
}

try {
  await mongoose.connect(process.env.MONGODB_URI);

  await MealPlan.deleteMany();
  await Recipe.deleteMany();

  const saved = await Recipe.insertMany(recipes);
  const idOf = (name) => saved.find((recipe) => recipe.name === name).id;

  const plans = await MealPlan.insertMany([
    {
      name: "Monday",
      date: "2026-11-23",
      recipes: [
        idOf("Banana Oatmeal"),
        idOf("Lentil Soup"),
        idOf("Baked Salmon"),
      ],
    },
    {
      name: "Tuesday",
      date: "2026-11-24",
      recipes: [
        idOf("Veggie Omelette"),
        idOf("Tuna Melt"),
        idOf("Turkey Chili"),
      ],
    },
    {
      name: "Wednesday",
      date: "2026-11-25",
      recipes: [idOf("French Toast"), idOf("Vegetable Curry")],
    },
  ]);

  console.log(`Seeded ${saved.length} recipes and ${plans.length} meal plans.`);
} catch (error) {
  console.error("Seed failed:", error.message);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
