const express = require("express");
const db = require("../../../db/models");
const emailHandler = require("../../middleware/emailHandler");
const router = express.Router();
require("dotenv").config();
const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);
const { Payment } = db;

// Create a payment intent
router.post("/create-payment", emailHandler, async (req, res) => {
  const { id, amount, name, email, phone } = req.body;

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Membership Payment",
      payment_method: id,
      metadata: {
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
      },
      confirm: true,
    });

    const data = await Payment.create({
      type: payment.description,
      amount: amount,
      customerEmail: email,
      customerName: name,
      customerPhone: phone,
    });

    // console.log(payment);

    res.status(200).send({
      message: payment.status,
      data: data,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

// Retrieve payments details
router.get("/", async (req, res) => {
  try {
    const data = await Payment.findAll();
    if (data) {
      res.status(200).send(data);
    } else {
      res
        .status(400)
        .send({ message: "There is some error in getting payments data" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Delete payments details
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const num = await Payment.destroy({
      where: { id: id },
    });
    if (num == 1) {
      res.status(200).send({
        message: "payment was deleted successfully!",
      });
    } else {
      res.status(400).send({
        message: `Cannot delete payment with id=${id}. Maybe Payment was not found!`,
      });
    }
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

module.exports = router;
