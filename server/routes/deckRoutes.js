const express = require("express")
const router = express.Router()

const { createDeck } = require("../controller/deck_controller")

router.post("/", createDeck)

module.exports = router
