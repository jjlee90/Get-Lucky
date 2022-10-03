const mongoose = require("mongoose")
const { Schema } = mongoose

const playerSchema = new Schema({
  bankroll: Number,
  betAmount: Number,
  doubleDown: Number,
  cardArr: Array,
  handTotal: Number,
  aceCount: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
})

const Player = mongoose.model("Player", playerSchema)

module.exports = Player
