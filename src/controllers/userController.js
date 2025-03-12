import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import {
  loginValidationSchema,
  registerValidationSchema,
} from "../validators/auth.js";

// Generate Auth token
const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });
};

/* @description Register User
 * @route POST /api/users/Register
 * @access Public
 */
const register = async (req, res) => {
  const validatedData = await registerValidationSchema.validateAsync(req.body);

  const { name, email, password } = validatedData;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({ name, email, password });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
};

/* @description Login User
 * @route POST /api/users/login
 * @access Public
 */
const login = async (req, res) => {
  const validatedData = await loginValidationSchema.validateAsync(req.body);

  const { email, password } = validatedData;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
};

/* @description Logout User
 * @route POST /api/users/logout
 * @access Private
 */
const logout = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "logged out successfully" });
};

export { register, login, logout };
