const express = require("express")
const app = express()
const cors = require("cors")

require("dotenv").config({ path: "./config.env" })
const PORT = process.env.PORT || 3000

//get driver connection
const dbo = require("./db/conn")

const methodOverride = require("method-override")

// MIDDLEWARE
app.use(methodOverride("_method"))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/users", require("./routes/userRoutes"))
app.use("/api/cards", require("./routes/cardRoutes"))
app.use("/api/decks", require("./routes/deckRoutes"))

// app.get("/", (req, res) => {
//   res.json({ message: "hello" })
// })

app.listen(PORT, () => {
  dbo.connectToServer(function (err) {
    if (err) console.error(err)
  })
  console.log(`Server is running on port: ${PORT}`)
})
