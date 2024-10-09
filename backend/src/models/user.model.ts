import { model, Schema } from "mongoose";
//new gdg ni baiguulagch function yum
import { NextFunction } from "express";
import bcrypt from "bcrypt";

interface IUser {
  _id: Schema.Types.ObjectId;
  firstname: String;
  lastname: String;
  email: String;
  password: String;
  phoneNumber: String;
  role: String;
  profile_image: String;
  address: String;
  randomOTPcode: String;
  passwordResetToken: String;
  passwordResetTokenExp: Date;
  updated_at: Date;
  created_at: Date;
}

const userSchema = new Schema<IUser>({
  firstname: {
    type: String,
    required: [true, "Хэрэглэгчийн овгийг заавал оруулнав"],
  },
  lastname: {
    type: String,
    required: [true, "Хэрэглэгчийн нэрийг заавал оруулнав"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Хэрэглэгчийн цахим шуудангийн хаягийг заавал оруулнав"],
  },
  password: {
    type: String,
    minlength: [
      8,
      "Хэрэглэгчийн нууц үг хамгийн багадаа 8 тэмдэгт байх ёстой.",
    ],
    required: [true, "Хэрэглэгчийн нууц үгийг заавал оруулна."],
  },
  phoneNumber: String,
  role: { type: String, enum: ["admin", "user"], default: "user" },
  profile_image: {
    type: String,
    default: "https://i.ibb.co/4pDNDk1/avatar.png",
  },
  address: String,
  randomOTPcode: { type: String, default: "" },
  passwordResetToken: { type: String, default: "" },
  passwordResetTokenExp: { type: Date, default: undefined },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  } else {
    const hashedPassword = bcrypt.hashSync(this.password.toString(), 10);
    this.password = hashedPassword;
    next();
  }
});
const User = model<IUser>("User", userSchema);

export default User;
