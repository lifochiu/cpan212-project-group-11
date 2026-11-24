import { Schema, model } from "mongoose";

const ingredientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    quantity: {
      type: Number,
      required: true,
      min: [0.01, "quantity must be > 0"],
    },
    unit: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20,
    },
  },
  { _id: false },
);

const recipeScheme = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: [true, "description is required"],
      trim: true,
      maxlength: 500,
    },
    category: {
      type: String,
      required: true,
      enum: ["breakfast", "lunch", "dinner", "snack"],
    },
    servings: {
      type: Number,
      required: true,
      min: 1,
      max: 50,
    },
    prepTimeMinutes: {
      type: Number,
      required: true,
      min: 1,
      max: 1440,
    },
    cookTimeMinutes: {
      type: Number,
      required: true,
      min: 1,
      max: 1440,
    },
    ingredients: {
      type: [ingredientSchema],
      validate: {
        validator: (list) => list.length > 0,
        message: "at least one ingredient is required",
      },
    },
    instructions: {
      type: String,
      required: true,
      trim: true,
      maxlength: 5000,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (doc, ret) => {
        delete ret._id;
      },
    },
  },
);
export const Recipe = model("Recipe", recipeScheme);
