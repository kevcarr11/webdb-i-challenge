const express = require('express');
const accountRouter = require("./router/account-router.js")
const server = express();

server.use(express.json());
server.use("/api/accounts", accountRouter)

server.get("/", (req, res) => {
  res.json({ message: "First Api build using knex" })
})

server.use((err, req, res, next) => {
  console.log(err)
  res.status(500).json({
    message: "Something went wrong"
  })
})


module.exports = server;