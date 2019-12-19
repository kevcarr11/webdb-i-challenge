const express = require('express')
const db = require('../data/dbConfig');

const router = express.Router()

router.get("/", async (req, res, next) => {
  try {
    res.json(await db("accounts").select())
  } catch (err) {
    next(err)
  }
})

router.get("/:id", async (req, res, next) => {
  try {
    const post = await db("accounts").where("id", req.params.id).first()
    res.json(post)
  } catch (err) {
    next(err)
  }
})

router.post("/", async (req, res, next) => {
  try {
     const payload = {
       name: req.body.name,
       budget: req.body.budget
     }

     const [id] = await db("accounts").insert(payload)
     res.json(await db("accounts").where("id", id).first())
  } catch (err) {
    next(err)
  }
})

router.put("/:id", async (req, res, next) => {
  try {

  } catch (err) {
    next(err)
  }
})

router.delete("/:id", async (req, res, next) => {
  try {

  } catch (err) {
    next(err)
  }
})

module.exports = router