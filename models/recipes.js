import mongoose from "mongoose";

const recipeScema = new mongoose.Schema({
imag: {
    type: String,
    required: true
},
title: {
    type: String,
    required: true
},
time: {
    type: String,
    default: "25",
    required: false
},
serves: {
    type: String,
    default: "2",
    required: false
},
difficulty: {
    type: String,
    default: "Medium",
    required: false
},
subtitle: {
    type: String,
    required: true
},
ingredients: [{type: String, required: true}],
steps: [{type: String, required: true}]
});


export const Recipe=mongoose.model('Recipe',recipeScema);
