import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
});

const DB = mongoose.model("DB");

export default DB;
