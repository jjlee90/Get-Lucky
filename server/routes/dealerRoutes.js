const express = require("express")

const router = express.Router()

const { createDealer } = require("../controller/dealer_controller")

router.post("/", createDealer)

module.exports = router
