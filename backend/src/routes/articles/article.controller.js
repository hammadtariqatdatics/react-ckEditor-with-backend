const express = require("express");
const router = express.Router();
const db = require("../../../db/models");
const { summerizePrompt, translatePrompt } = require("../../utils/helpers");
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

// update an article
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { translateVal } = req.body;
  try {
    const { content } = await Article.findByPk(id);
    const translatedContent = await translatePrompt(content, translateVal);
    console.log(translatedContent);
    const translatedSummerizeContent = await summerizePrompt(translatedContent);
    const updatedArticle = {
      content: translatedContent,
      contentSummery: translatedSummerizeContent,
    };
    const num = await Article.update(updatedArticle, {
      where: { id: id },
    });

    if (num == 1) {
      res.status(200).send({
        message: "Article was updated successfully.",
      });
    } else {
      res.status(400).send({
        message: `Cannot update Article with id=${id}. Maybe Article was not found or req.body is empty!`,
      });
    }
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

// Delete a Article with id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const num = await Article.destroy({
      where: { id: id },
    });
    if (num == 1) {
      res.status(200).send({
        message: "Article was deleted successfully!",
      });
    } else {
      res.status(400).send({
        message: `Cannot delete Article with id=${id}. Maybe Article was not found!`,
      });
    }
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

// Delete all Articles
router.delete("/", async (req, res) => {
  try {
    const nums = await Article.destroy({
      where: {},
      truncate: false,
    });
    res
      .status(200)
      .send({ message: `${nums} Articles were deleted successfully!` });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Create a new article
router.post("/publish", async (req, res) => {
  try {
    const { title, content } = req.body;
    const summerizeText = await summerizePrompt(content);
    // Save article in the database
    const data = await Article.create({
      title: title,
      content: content,
      contentSummery: summerizeText,
    });
    res
      .status(200)
      .send({ message: "Article created successfully...", data: data });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
