import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utilis/error.js";
import jwt from "jsonwebtoken";

// Signup
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!email || !password || !username) {
    return next(errorHandler(400, "All fields are required"));
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    next(error);
  }
};

// Signin
export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found"));

    const isPasswordValid = await bcrypt.compare(password, validUser.password);
    if (!isPasswordValid) return next(errorHandler(401, "Invalid password"));

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, { expiresIn: "24h" });
    res
      .cookie("access_token", token, { httpOnly: true, secure: true, sameSite: "strict" })
      .status(200)
      .json({ message: "Login successful", user: validUser });
  } catch (error) {
    next(error);
  }
};

// Google OAuth
export const google = async (req, res, next) => {
  const { username, email, photo } = req.body;

  if (!email) {
    return next(errorHandler(400, "Email is required from Google OAuth"));
  }

  try {
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ username, email, photo, password: "" });
      await user.save();
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "24h" });

    res
      .cookie("access_token", token, { httpOnly: true, secure: true, sameSite: "strict" })
      .status(user.isNew ? 201 : 200)
      .json({ message: user.isNew ? "User created successfully" : "Login successful", user });
  } catch (error) {
    next(error);
  }
};

export const signout = (req, res) => {
  try{
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    }).status(200).json({ message: "User signed out successfully" });
  }
  catch(err){
    next(err);
  }
}
