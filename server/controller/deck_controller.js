const Deck = require("../models/deck")

const createDeck = async (req, res) => {
  const { deckNo } = req.body
  const deck = await Deck.create({
    deckNo,
  })
  res.status(200).json(deck)
}

module.exports = { createDeck }
