const express = require('express')
const db = require('../data/dbConfig');

const router = express.Router()

router.get("/", async (req, res, next) => {
  const { limit, sortby, sortdir } = req.query

  if (!req.query.limit && !req.query.sortby && !req.query.sortdir) {
    return res.json(await db("accounts")
      .select())
  }

  try {
    res.json(await db("accounts")
      .limit(limit)
      .orderBy(sortby, sortdir)
      .select())
  } catch (err) {
    next(err)
  }
})

router.get("/:id", validateAccountId, async (req, res, next) => {
  try {
    const post = await db("accounts")
      .where("id", req.params.id)
      .first()
    res.json(post)
  } catch (err) {
    next(err)
  }
})

router.post("/", validateAccountData, async (req, res, next) => {

  try {
    const payload = {
      name: req.body.name,
      budget: req.body.budget
    }

    const [id] = await db("accounts")
      .insert(payload)
    res.json(await db("accounts")
      .where("id", id)
      .first())
  } catch (err) {
    next(err)
  }
})

router.put("/:id", validateAccountData, validateAccountId, async (req, res, next) => {
  try {
    const payload = {
      name: req.body.name,
      budget: req.body.budget
    }

    await db("accounts")
      .where('id', req.params.id)
      .update(payload)
    res.json(await db("accounts")
      .where("id", req.params.id)
      .first())
  } catch (err) {
    next(err)
  }
})

router.delete("/:id", validateAccountId, async (req, res, next) => {
  try {
    await db("accounts")
      .where("id", req.params.id)
      .del()
    res.status(204)
      .end()
  } catch (err) {
    next(err)
  }
})

async function validateAccountId(req, res, next) {
  try {
    const account = await db("accounts")
      .where("id", req.params.id)
      .first()
    if (account) {
      next()
    } else {
      res.status(404).json({ message: "Account not found" })
    }
  } catch (err) {
    next(err)
  }
}

function validateAccountData(req, res, next) {
  const acctData = req.body
  if (!acctData.name || !acctData.budget) {
    return res.status(400).json({ errorMessage: "Please provide name and budget for the account." })
  }
  next()
}

module.exports = router