const express = require("express")
const cors = require("cors")

const server = express()

server.use(cors({
  origin: "*",
  methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"]
}))

server.all("/", (req, res) => {
  res.send("Bot is now running!")
})

function keepAlive() {
  server.listen(3000, () => {
    console.log("Server is ready.")
  })
}

module.exports = keepAlive