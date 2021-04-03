import Express, { request } from "express";
// import Recipes from "../recipes.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { User } from "../models/users.js";
const routerAuth = Express.Router();
routerAuth.use((request, response, next) => {
  console.log(request.url + "--------" + Date.now());
  // console.log(request);
  next();
});
// const recipes = { Recipes };
routerAuth.route("/register").post(async (request, response) => {
  console.log(JSON.stringify(request.body) + " ----- " + Date.now());
  let user = new User({
    uid: request.body.uid,
    password: request.body.password,
  });
  try {
    const userNew = await user.save();
    response.send(userNew);
  } catch (err) {
    response.send(err);
  }
  //response.json(user);
});
routerAuth.route("/verify").post(async (request, response) => {
  let [userid, upassword] = [request.body.uid, request.body.password];
  let user = await User.find({ uid: userid });

  if (user[0].uid == userid) {
    let result = await bcrypt.compare(upassword, user[0].password);
    if (result) response.send("Login successful!");
    else response.send("Login credentials incorrect!");
  } else {
    response.send("Login ID incorrect"); //must be changed to 'Login credentials incorrect' while live
  }
});
export default routerAuth;
