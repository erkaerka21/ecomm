import { model, Model, Schema } from "mongoose";
import React from "react";

interface PCategory {
  name: string;
  description: string;
}

const categorySchema = new Schema<PCategory>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);
export const Category = model("Category", categorySchema);
