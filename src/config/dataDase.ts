/** @format */

import mongoose, { connection } from "mongoose";
import environmentVarabiles from "../environments/environmentVariables";

const dbConfig = async () => {
  try {
    const connectUrl = await mongoose.connect(
      environmentVarabiles.mongodbLocalUrl,
    );
    console.log("Connected To", environmentVarabiles.mongodbLocalUrl);
    console.log("");
    console.log("You're Connected To Your", mongoose.connection.host);
  } catch (error) {
    console.log("An Error Occured In DataBase", error);
  }
};

export default dbConfig;
