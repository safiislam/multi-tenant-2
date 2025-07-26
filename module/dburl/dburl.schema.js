import mongoose, { Schema } from "mongoose";

const dbUrlSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
});

const DB = mongoose.model("DB", dbUrlSchema);

export default DB;
