const express = require("express");
const router = express.Router();
const db = require("../../../db/models");
const { commentPrompt } = require("../../utils/helpers");
const { Comment } = db;

// Retrieve a comment
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Comment.findByPk(id);

    if (data) {
      res.status(200).send(data);
    } else {
      res.status(400).send({
        message: `Cannot find Comment with id=${id}.`,
      });
    }
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

// Delete a Comment with id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const num = await Comment.destroy({
      where: { id: id },
    });
    if (num == 1) {
      res.status(200).send({
        message: "Comment was deleted successfully!",
      });
    } else {
      res.status(400).send({
        message: `Cannot delete Comment with id=${id}. Maybe Comment was not found!`,
      });
    }
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

// Delete all Comments
router.delete("/", async (req, res) => {
  try {
    const nums = await Comment.destroy({
      where: {},
      truncate: false,
    });
    res
      .status(200)
      .send({ message: `${nums} Comments were deleted successfully!` });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Create a new comment
router.post("/create/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;
    const sentiment = await commentPrompt(comment);
    // Save comment in the database
    const data = await Comment.create({
      comment: comment,
      ArticleId: id,
      sentiment: sentiment,
    });
    res.status(200).send({
      message: "Comment created successfully...",
      data: data,
    });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
