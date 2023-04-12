const express = require("express");
const router = express.Router();
const db = require("../../../db/models");
const { Article } = db;

// Retrieve an article
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Article.findByPk(id);

    if (data) {
      res.status(200).send(data);
    } else {
      res.status(400).send({
        message: `Cannot find Article with id=${id}.`,
      });
    }
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

// Create a new article
router.post("/publish", async (req, res) => {
  try {
    const { title, content } = req.body;
    // Save article in the database
    const data = await Article.create({
      title: title,
      content: content,
    });
    res
      .status(200)
      .send({ message: "Article created successfully...", data: data });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
