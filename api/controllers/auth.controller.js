
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utilis/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res,next) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req,res,next) =>{
const { email, password } = req.body;
try{
const vaildUser = await User.findOne({ email });
if(!vaildUser) {
  return next(errorHandler(404, "User not found"));
}
const isPasswordValid = await bcrypt.compare(password, vaildUser.password);
if (!isPasswordValid) {
  return next(errorHandler(401, "Invalid password"));
}
const token = jwt.sign({
  id : vaildUser._id
}, process.env.JWT_SECRET, {
  expiresIn: "24h"
})
res.cookie('access_token', token, {httpOnly :true, secure: true, sameSite: 'strict'}).status(200).json({
  message: "Login successful",
  user: {
    id: vaildUser._id,
    username: vaildUser.username,
    email: vaildUser.email,
  },
});
}
catch (error) {
  next(error);
}
};