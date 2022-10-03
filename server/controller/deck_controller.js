const Deck = require("../models/deck")
const Card = require("../models/card")

const createDeck = async (req, res) => {
  const { deckNo } = req.body
  const deck = await Deck.create({
    deckNo,
  })
  res.status(200).json(deck)
}

// get deck by deckNo
// path api/decks/:deckNo
const getDeck = async (req, res) => {
  const deck = await Deck.find({ deckNo: req.params.deckNo }).populate({
    path: "cards",
  })
  console.log({ deck })
  res.status(200).json(deck)
}

// get deck by deckNo
// path api/decks/:deckNo
const shuffleDeck = async (req, res) => {
  const deck = await Deck.aggregate(
    [
      {
        $lookup: {
          from: "cards",
          localField: "_id",
          foreignField: "_id",
          as: "card",
        },
      },
      {
        $unwind: {
          path: "card",
        },
      },
      // {
      //   $addFields: {
      //     cardName: "$cardName",
      //   },
      // },
      // { $sample: { size: 1 } },
    ]

    // { cursor: { batchSize: 60 } }
  ).exec(function (err, data) {
    console.log(data)
    res.json(data)
  })
}

module.exports = { createDeck, getDeck, shuffleDeck }
