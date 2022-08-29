const express = require("express")
const user = express.Router()
const User = require("../models/user")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const asyncHandler = require("express-async-handler")
const { protect } = require("../middleware/authMiddleware")

// Register new user
// @route POST /user
// @access Public
user.post(
  "/",
  asyncHandler(async (req, res) => {
    const { username, firstName, email, password } = req.body

    if (!firstName || !email || !password) {
      res.status(400)
      throw new Error("Please add all fields")
    }

    // Check if user exists
    const userExists = await User.findOne({ email })

    if (userExists) {
      res.status(400)
      throw new Error("User already exists")
    }
    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
      username,
      firstName,
      email,
      password: hashedPassword,
    })

    if (user) {
      res.status(201).json({
        _id: user.id,
        username: user.username,
        firstName: user.firstName,
        email: user.email,
        token: generateToken(user._id),
      })
    } else {
      res.status(400)
      throw new Error("Invalid user data")
    }
  })
)

// Authenticate a user
// @route POST /user/login
// @access Public
user.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body

    // Check for user email
    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      })
    } else {
      res.status(400)
      throw new Error("Invalid credentials ")
    }
  })
)

// Get user data
// GET /user/me
// @access Private
user.get(
  "/me",
  protect,
  asyncHandler(async (req, res) => {
    const { _id, username, email } = await User.findById(req.user.id)

    res.status(200).json({
      id: _id,

      username,
      email,
    })
  })
)

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  })
}

// get user @ "/user/username"
// query for user by username. Returns user and all exercises related to user
user.get("/:username", async (req, res) => {
  const user = await User.find({ username: req.params.username }).populate({
    path: "exercises",
  })

  res.status(200).json(user)
})

// create user @route "/user"
user.post("/new", async (req, res) => {
  const user = await User.create(req.body)
  res.status(200).json(user)
})

// update user @route "/user"
user.put("/:id", async (req, res) => {
  const user = await User.findById(req.params.id)
  if (!user) {
    res.status(400)
    throw new Error("User not found")
  }
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
  res.status(200).json(updatedUser)
})

// delete user @route "/user"
user.delete("/:id", async (req, res) => {
  const user = await User.findById(req.params.id)
  if (!user) {
    res.status(400)
    throw new Error("User not found")
  }
  await user.remove()
  res.status(200).json({ id: req.params.id })
})

module.exports = user
