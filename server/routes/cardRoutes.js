const express = require("express")
const router = express.Router()

const { createCard, seedCards } = require("../controller/card_controller")

router.get("/seedcard", seedCards)
router.post("/", createCard)

module.exports = router
