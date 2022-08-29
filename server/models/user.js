const mongoose = require("mongoose")
const { Schema } = mongoose

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },

    firstName: String,
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

userSchema.virtual("players", {
  ref: "Player",
  localField: "_id",
  foreignField: "user",
})

const User = mongoose.model("User", userSchema)

module.exports = User
