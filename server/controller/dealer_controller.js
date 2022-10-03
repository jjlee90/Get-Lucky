const Dealer = require("../models/dealer")

const createDealer = async (req, res) => {
  const { dealerName, cardArr, handTotal, aceCount } = req.body
  const dealer = await Dealer.create({
    dealerName,
    cardArr,
    handTotal,
    aceCount,
  })
  res.status(200).json(dealer)
}

module.exports = { createDealer }
