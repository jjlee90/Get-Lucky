const express = require("express")
const router = express.Router()

const {
  createCard,
  seedCards,
  getCard,
  shuffleCards,
} = require("../controller/card_controller")

router.get("/seedcard", seedCards)
router.get("/getcard", getCard)
router.get("/shufflecards", shuffleCards)
router.post("/", createCard)

module.exports = router
