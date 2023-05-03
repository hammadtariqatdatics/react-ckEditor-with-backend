const express = require("express");
const db = require("../../../db/models");
const { chatPrompt } = require("../../utils/helpers");
const router = express.Router();
const { Chat } = db;

// Create a chat
router.post("/chat", async (req, res) => {
  try {
    const { prompt, email } = req.body;
    const promptedResponse = await chatPrompt(prompt);
    // Save chat in the database
    const data = await Chat.create({
      prompt: prompt,
      response: promptedResponse,
      customerEmail: email,
    });
    res
      .status(200)
      .send({ message: "Chat created successfully...", data: data });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Retrieve chat details
router.get("/", async (req, res) => {
  try {
    const data = await Chat.findAll();
    if (data) {
      res.status(200).send(data);
    } else {
      res
        .status(400)
        .send({ message: "There is some error in getting chats data" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Delete chat details
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const num = await Chat.destroy({
      where: { id: id },
    });
    if (num == 1) {
      res.status(200).send({
        message: "Chat was deleted successfully!",
      });
    } else {
      res.status(400).send({
        message: `Cannot delete Chat with id=${id}. Maybe Chat was not found!`,
      });
    }
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

module.exports = router;
