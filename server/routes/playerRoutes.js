const express = require("express")
const router = express.Router()

const { createPlayer } = require("../controller/player_controller")

router.post("/", createPlayer)

module.exports = router
