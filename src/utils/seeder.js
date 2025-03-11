import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/userModel.js";
import Event from "../models/eventModel.js";

dotenv.config();

// MongoDB Connection
const mongoURI = process.env.DATABASE_URL;

// Demo users (passwords will be hashed via the pre-save hook)
const users = [
  {
    name: "user1",
    email: "user1@example.com",
    password: "password123",
    role: "user",
  },
  {
    name: "user2",
    email: "user2@example.com",
    password: "password123",
    role: "user",
  },
  {
    name: "user3",
    email: "user3@example.com",
    password: "password123",
    role: "user",
  },
  {
    name: "admin1",
    email: "admin1@example.com",
    password: "password123",
    role: "admin",
  },
  {
    name: "admin2",
    email: "admin2@example.com",
    password: "password123",
    role: "admin",
  },
];

const events = [
  {
    eventName: "Champions League Final",
    eventType: "sports",
    odds: { yes: 1.5, no: 2.5 },
    status: "upcoming",
    result: "pending",
    startTime: new Date("2025-05-10T20:00:00Z"),
    endTime: new Date("2025-05-10T22:00:00Z"),
  },
  {
    eventName: "General Election Results",
    eventType: "politics",
    odds: { yes: 1.8, no: 2.0 },
    status: "upcoming",
    result: "pending",
    startTime: new Date("2025-04-20T09:00:00Z"),
    endTime: new Date("2025-04-20T18:00:00Z"),
  },
  {
    eventName: "Oscars Best Picture Announcement",
    eventType: "entertainment",
    odds: { yes: 1.7, no: 2.3 },
    status: "live",
    result: "pending",
    startTime: new Date("2025-03-11T02:00:00Z"),
    endTime: new Date("2025-03-11T04:00:00Z"),
  },
  {
    eventName: "Super Bowl LVIII",
    eventType: "sports",
    odds: { yes: 1.6, no: 2.4 },
    status: "completed",
    result: "yes",
    startTime: new Date("2025-02-10T23:30:00Z"),
    endTime: new Date("2025-02-11T02:00:00Z"),
  },
  {
    eventName: "Prime Minister Confidence Vote",
    eventType: "politics",
    odds: { yes: 2.0, no: 1.5 },
    status: "completed",
    result: "no",
    startTime: new Date("2025-01-05T10:00:00Z"),
    endTime: new Date("2025-01-05T12:00:00Z"),
  },
];

const seedUsers = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI);
    console.log("✅ MongoDB Connected...");

    // Clear existing users
    await User.deleteMany();
    await Event.deleteMany();

    // Insert new users
    await User.insertMany(users);
    await Event.insertMany(events);

    console.log("✅ DB seeded successfully!");
    mongoose.disconnect();
    console.log("🔌 MongoDB Disconnected.");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding:", error.message);
    mongoose.disconnect();
    process.exit(1);
  }
};

seedUsers();
