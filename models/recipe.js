const mongoose = require("mongoose");
const User = require('./user')


const ingredient = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    amount: { type: String, required: true, unique: true },
    alternatives: [{ type: String, required: true, unique: true }],
})


const recipeSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }, 
    ingredients: [ingredient],required:true,
    instructions: [{ type: String, required: true, unique: true }],
    level: { type: String, required: true, unique: true, enum: ['beginner', 'intermediate', 'professional'],},
    cuisine: { type: String, required: true, unique: true, enum: ['Italian', 'Mediterranean', 'Chinese', 'Mexican', 'Indian', 'Thai', 'American', 'French', 'Japanese'],},
    tools: [{ type: String, required: true, unique: true,enum: ['Pan', 'Spoon','Whisk','Mixer'], }],
    image: [{ type: String, required: true, unique: true,}],
    serves: [{ type: Number, required: true, unique: true,}],
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }},
    { timestamps: true }
)

const Recipe = mongoose.model(recipeSchema, "Recipe")

module.exports = Recipe;