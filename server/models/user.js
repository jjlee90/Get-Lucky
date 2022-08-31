const mongoose = require("mongoose")
const { Schema } = mongoose

const userSchema = new Schema(
  {
    // username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    // firstName: String,
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    password: { type: String, required: [true, "Please add a password"] },
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model("User", userSchema)

module.exports = User
