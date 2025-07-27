import mongoose, { Schema } from "mongoose";

const dbUrlSchema = new Schema({
  username: {
    type: String,
    required: [true, "DB User Name is Required"],
  },
  password: {
    type: String,
    required: [true, "DB User Password is Required"],
  },
  dbName: {
    type: String,
    required: [true, "DB User Name is Required"],
  },
  domainName: {
    type: String,
    required: [true, "Domain Name is Required"],
  },
});

const DB = mongoose.model("Db", dbUrlSchema);

export default DB;
