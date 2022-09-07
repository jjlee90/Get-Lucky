const mongoose = require("mongoose")
const { Schema } = mongoose

const deckSchema = new Schema(
  {
    deckNo: Number,
  },
  { toJSON: { virtuals: true } }
)

deckSchema.virtual("cards", {
  ref: "Card",
  localField: "_id",
  foreignField: "deck",
})

const Deck = mongoose.model("Deck", deckSchema)

module.exports = Deck
