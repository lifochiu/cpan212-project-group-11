import { app } from "./app.js";
import mongoose from "mongoose";

const port = process.env.PORT ?? 4000;

if (!process.env.MONGODB_URI) {
  console.error("MONGODB_URI is missing.");
  process.exit(1);
}

mongoose.set("sanitizeFilter", true);
await mongoose.connect(process.env.MONGODB_URI);
console.log("Connect to MongoDB");

app.listen(port, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Running assignment project at http://localhost:${port}`);
});
