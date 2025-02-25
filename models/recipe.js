const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
  ingredientName: { type: String, required: true },
  amount: { type: String, required: true },
  alternatives: [{ type: String, required: true }],
});

const recipeSchema = new mongoose.Schema(
  {
    recipeName: { type: String, required: true },
    ingredients: [ingredientSchema],
    instructions: { type: String, required: true },
    level: {
      type: String,
      required: true,
      enum: ["beginner", "intermediate", "professional"],
    },
    cuisine: {
      type: String,
      required: true,
      enum: [
        "Italian",
        "Mediterranean",
        "Chinese",
        "Mexican",
        "Indian",
        "Thai",
        "American",
        "French",
        "Japanese",
      ],
    },
    tools: [
      {
        type: String,
        required: true,
        enum: ["Pan", "Spoon", "Whisk", "Mixer"],
      },
    ],
    image: { type: String, required: true },
    serves: { type: Number, required: true },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
