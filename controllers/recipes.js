const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verify-token");

const Recipe = require("../models/recipe");

/*-------------------- Routes ----------------------*/

// Create a recipe (Protected route) (Aqeela)
router.post("/create", verifyToken, async (req, res) => {
  try {
    // Validate required fields
    if (!req.body.recipeName) {
      return res.status(400).json({ error: "Recipe name is required" });
    }

    req.body.owner = req.user._id;
    const recipe = await Recipe.create(req.body);
    recipe._doc.owner = req.user;
    res.status(201).json(recipe);
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(401)
        .json({ error: "Duplicate key error: Recipe name must be unique" });
    }
    res.status(500).json({ error: error.message });
  }
});

// Get all recipies (Kawlaa)
router.get("/", async (req, res) => {
    try {
        const recipes = await Recipe.find({})
            .populate("owner")
            .sort({ createdAt: "desc" });
        res.status(200).json(recipes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a recipie by id (kawlaa)
router.get("/:recipeId", async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.recipeId).populate("owner");
        if (!recipe) {
            return res.status(404).json({ error: "Recipe not found" });
        }
        res.status(200).json(recipe);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get user's recipies (Protected route) (Kawlaa)
router.get("/user/:userId", verifyToken, async (req, res) => {
    try {
        const userRecipes = await Recipe.find({ owner: req.params.userId })
            .populate("owner")
            // .sort({ createdAt: "desc" });
        res.status(200).json(userRecipes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a recipie by id (Protected route) (Aqeela)
router.put("/:recipeId", verifyToken, async (req, res) => {
  try {
    req.body.owner = req.user._id;

    const recipe = await Recipe.findById(req.params.recipeId);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    if (recipe.owner.toString() !== req.user._id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.recipeId,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedRecipe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a recipie by id (Protected route) (Ahmed)
router.delete("/:recipeId", verifyToken, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    if (recipe.owner.toString() !== req.user._id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await Recipe.findByIdAndDelete(req.params.recipeId);
    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
