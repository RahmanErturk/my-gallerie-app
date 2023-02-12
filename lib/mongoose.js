import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

mongoose.set("strictQuery", false);

mongoose
  .connect(
    "mongodb+srv://RahmanErtuerk:rahmanBraveCoders@cluster0.crmutip.mongodb.net/?retryWrites=true&w=majority/gallery_app"
  )
  .then(() => console.log("connected via mongoose"));

mongoose.connection.on("error", (err) => console.error(err));
