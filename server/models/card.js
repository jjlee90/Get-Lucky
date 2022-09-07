const mongoose = require("mongoose")
const { Schema } = mongoose

const cardSchema = new Schema({
  cardName: String,
  cardSuit: String,
  cardValue: Number,
  image: {
    type: String,
    default:
      "https://pixabay.com/vectors/ten-hearts-playing-cards-poker-28348/",
  },
  deck: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Deck",
  },
})

const Card = mongoose.model("Card", cardSchema)

module.exports = Card
