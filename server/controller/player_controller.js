const Player = require("../models/player")

const createPlayer = async (req, res) => {
  const {
    bankroll,
    betAmount,
    doubleDown,
    cardArr,
    handTotal,
    aceCount,
    user,
  } = req.body
  const player = await Player.create({
    bankroll,
    betAmount,
    doubleDown,
    cardArr,
    handTotal,
    aceCount,
    user,
  })
  res.status(200).json(player)
}

module.exports = { createPlayer }
