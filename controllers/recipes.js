const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verify-token");

const User = require("../models/recipe");
const Recipe = require("../models/recipe");

/*-------------------- Routes ----------------------*/

// Create a recipie (Protected route)

router.post('/create',verifyToken,async(req,res)=>{
    try {
        req.body.owner = req.user._id
        //const ingredients = req.body.ingredients
        const recipe = await Recipe. create(req.body)
        recipe._doc.owner = req.user 
        res.status(201).json(recipe)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

router.put('/:recipeId',verifyToken,async(req,res)=>{
    try {
        req.body.owner= req.user._id
        const ingredients = [{
            "ingredientName": "Tomato",
            "amount": "2 cups",
            "alternatives": "Canned tomato"
        },
        {
            "ingredientName": "Beef",
            "amount": "200g",
            "alternatives": "Chicken"
        }]
        const recipe =await Recipe.findById(req.params.recipeId).populate('owner')
        
        req.body.ingredients=ingredients
        const newRecipe = await Recipe.findByIdAndUpdate(recipe,req.body)
        

        console.log(req.params.recipeId)
        res.status(201).json(recipe)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
    console.log()

})


// Get all recipies

// Get a recipie by id

// Get user's recipies (Protected route)

// Update a recipie by id (Protected route)


// Delete a recipie by id (Protected route)

module.exports = router;
