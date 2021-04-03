import Express from "express";
// import Recipes from "../recipes.js";
import mongoose from "mongoose";
import { Recipe } from "../models/recipes.js";
const router = Express.Router();
router.use((request, response, next) => {
  console.log(request.url + "--------" + Date.now());
  // console.log(request);
  next();
});
// const recipes = { Recipes };
router
  .route("/")
  .get(async (request, response) => {
    
    let filter={};
    
      if(request.query.serves)
      {
      console.log(request.query.serves);
      filter.serves=request.query.serves;   
      }
      if(request.query.difficulty)
      {
        console.log(request.query.difficulty);
        filter.difficulty=new RegExp(request.query.difficulty,'i');
      }
      if(request.query.title)
      {
        console.log(request.query.title);
        filter.title=request.query.title;
      }
      
    
   
    try {
      const recipes = await Recipe.find(filter);
      response.json(recipes);
    } catch (err) {
      response.send(err);
    }
  
   
  })

  .post(async (request, response) => {
    console.log("New Post ---- "+JSON.stringify(request.body));
    const recipe = new Recipe({
      imag: request.body.imag,
      title: request.body.title,
      time: request.body.time,
      serves: request.body.serves,
      difficulty: request.body.difficulty,
      subtitle: request.body.subtitle,
      ingredients: request.body.ingredients,
      steps: request.body.steps,
    });
    try {
      const newRecipe = await recipe.save();
      response.send(newRecipe);
    } catch (err) {
      console.log(err);
    }
    // response.send([...recipes, request.body]);
  })
  .patch(async (request, response) => {
    
    const id=request.body._id;
    console.log("New Post ---- "+JSON.stringify(request.body._id));
    let update=request.body;
    try {
      const newRecipe = await Recipe.findOneAndUpdate({_id: id},update,{new: true});
      response.send(newRecipe);
    } catch (err) {
      console.log(err);
    }
    // response.send([...recipes, request.body]);
  })
  
router.route("/:id").get(async (request, response) => {
  console.log("HI2"+request.params.id);
  // const searchRecipe = recipes.find(
  //   (recipe) => recipe.title === request.params.title
  // // );
  // const searchFilterRecipe = recipes.filter(
  //   (recipe) => recipe.title === request.params.title
  // );
  const searchRecipe = await Recipe.find({_id: request.params.id});
    
  // console.log(searchRecipe, searchFilterRecipe);
  response.send(searchRecipe);
  // response.send(searchFilterRecipe);
}).delete(async (request,response)=>{
  console.log("Deleting "+request.params.id+" at "+request.params.time);
  try{
    const deletedRecipe=await Recipe.findById(request.params.id).remove();
    response.json(deletedRecipe);
  }catch(err){response.send(err);}
});

export default router;
