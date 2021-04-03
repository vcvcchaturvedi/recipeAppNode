// const good = require("./good.js");
// import  good from "./good.js"; 1
// import { good } from "./good.js"; 2

import cors from "cors";
import Express from "express";
import Recipes  from "./recipes.js";
import router from "./routes/recipes.js";
import routerAuth from "./routes/auth.js";
import mongoose from "mongoose";
import {Recipe} from "./models/recipes.js";
const url="mongodb://localhost/recipesApp";
mongoose.connect(url,{useNewUrlParser: true});
const con = mongoose.connection;
con.on('open',function(){
console.log("Mongo DB connected");
});
const app = Express();
const port = 3200;
app.use(cors());
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
// const recipes={Recipes};

app.use('/recipes',router);
app.use('/auth',routerAuth);


app.get("/", async (request, response) => {
  try{
const recipes=await Recipe.find();
response.json(recipes);
  }catch(err){console.log(err);}
  response.send("Hello world4");
});

// app
//   .route("/recipes")
//   .get((request, response) => {
//     console.log(request.query);

//     const queryMatch = request.query.ings
//       ? recipes.filter(
//           (recipe) =>
//             request.query.like === `${recipe.like}` &&
//             recipe.ings.includes(request.query.ings)
//         )
//       : recipes;
//     console.log(queryMatch);
//     response.send(queryMatch);
//   })
//   .post((request, response) => {
//     console.log(request.body);
//     response.send([...recipes, request.body]);
//   });



  

// CRUD -> Create Read Update Delete

app.listen(port, () => console.log("Started"));
