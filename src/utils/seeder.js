import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/user.model.js";

dotenv.config();

// MongoDB Connection
const mongoURI = process.env.DATABASE_URL;

// Demo users (passwords will be hashed via the pre-save hook)
const users = [
  {
    username: "user1",
    email: "user1@example.com",
    password: "password123",
    role: "user",
  },
  {
    username: "user2",
    email: "user2@example.com",
    password: "password123",
    role: "user",
  },
  {
    username: "user3",
    email: "user3@example.com",
    password: "password123",
    role: "user",
  },
  {
    username: "admin1",
    email: "admin1@example.com",
    password: "password123",
    role: "admin",
  },
  {
    username: "admin2",
    email: "admin2@example.com",
    password: "password123",
    role: "admin",
  },
];

const seedUsers = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI);
    console.log("✅ MongoDB Connected...");

    // Clear existing users
    await User.deleteMany();

    // Insert new users
    await User.insertMany(users);

    console.log("✅ Demo users added successfully!");
    mongoose.disconnect();
    console.log("🔌 MongoDB Disconnected.");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding users:", error.message);
    mongoose.disconnect();
    process.exit(1);
  }
};

seedUsers();
