const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")
const User = require("../models/user")

const protect = asyncHandler(async (req, res, next) => {
  let token

  // check for authorization header && its a bearer token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header and assign it to token variable
      token = req.headers.authorization.split(" ")[1]

      // Decode and verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Get user from the token
      req.user = await User.findById(decoded.id).select("-password")

      // call next middleware
      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error("Not authorized")
    }
  }
  if (!token) {
    res.status(401)
    throw new Error("Not authorized, no token")
  }
})

module.exports = { protect }
