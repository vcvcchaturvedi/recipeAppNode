import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userScema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
userScema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
    console.log(this.uid, this.password);
  } catch (err) {
    console.log(err);
  }
});
//   .post("save", async function (next) {
//     try {
//       console.log("Post Save");
//     } catch (err) {
//       console.logg(err);
//     }
//   });
export const User = mongoose.model("User", userScema);
