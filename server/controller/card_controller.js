const Card = require("../models/card")
const cardSeedData = require("./card_seed")

const seedCards = async (req, res) => {
  await Card.insertMany(cardSeedData)
}

const createCard = async (req, res) => {
  const { cardName, cardSuit, cardValue, image } = req.body
  const card = await Card.create({
    cardName,
    cardSuit,
    cardValue,
    image,
  })
  res.status(200).json(card)
}

module.exports = { createCard, seedCards }
