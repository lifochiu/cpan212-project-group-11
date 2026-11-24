import { Schema, model } from "mongoose";

const mealPlanSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
      maxlength: 100,
    },
    date: {
      type: Date,
      required: [true, "date is required"],
    },
    recipes: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Recipe",
        },
      ],
      validate: {
        validator: (list) => list?.length > 0,
        message: "at least one recipe is required",
      },
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

export const MealPlan = model("MealPlan", mealPlanSchema);
