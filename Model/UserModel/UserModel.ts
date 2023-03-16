/** @format */

import mongoose from "mongoose";
import { IuserData } from "../../interface/UserInterface";
import isEmail from "validator/lib/isEmail";

// creating User Model
//  👇👇
interface user extends IuserData, mongoose.Document {}

const userSchema = new mongoose.Schema<IuserData>(
  {
    name: {
      type: String,
      required: [true, "Please Provide Your Name"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is Required"],
      lowercase: true,
      trim: true,
      validate: [isEmail, "Please Provide A valid Email"],
    },
    password: {
      type: String,
      required: [true, "Please Provide Your Password"],
    },
    userName: {
      type: String,
      required: [true, "Please Provide Your Password"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      message: "You ust Either bes a user or Admin",
    },
  },
  { timestamps: true }
);

export default mongoose.model<user>("UserSchemaECharging", userSchema);
