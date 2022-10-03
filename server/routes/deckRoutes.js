const express = require("express")
const router = express.Router()

const {
  createDeck,
  getDeck,
  shuffleDeck,
} = require("../controller/deck_controller")

router.post("/", createDeck)
router.get("/deck/shuffle", shuffleDeck)
router.get("/:deckNo", getDeck)

module.exports = router
