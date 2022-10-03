const mongoose = require("mongoose")

const { Schema } = mongoose

const dealerSchema = new Schema({
  dealerName: String,
  cardArr: Array,
  handTotal: Number,
  aceCount: Number,
})

const Dealer = mongoose.model("Dealer", dealerSchema)

module.exports = Dealer
