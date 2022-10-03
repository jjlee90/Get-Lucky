const Card = require("../models/card")
const Deck = require("../models/deck")
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

// find all cards
const getCard = async (req, res) => {
  const card = await Card.find({})

  res.status(200).json(card)
}

const shuffleCards = async (req, res) => {
  const card = await Card.aggregate([{ $sample: { size: 52 } }])
  console.log(card)
  res.status(200).json(card)
}
module.exports = { createCard, seedCards, getCard, shuffleCards }
