import mongoose, { Schema } from "mongoose";

export const blogSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is Required"],
  },
  description: {
    type: String,
    required: [true, "Email is Required"],
  },
  //   tenantId: {
  //     type: Schema.ObjectId,
  //     required: [true, "Tenant Id is Required"],
  //   },
});
