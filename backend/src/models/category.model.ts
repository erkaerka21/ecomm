import { model, Model, Schema } from "mongoose";

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
export const Category = model<PCategory>("Category", categorySchema);
