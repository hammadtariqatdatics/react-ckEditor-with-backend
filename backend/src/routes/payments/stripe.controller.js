const express = require("express");
const router = express.Router();
require("dotenv").config();
const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);

// Create a payment intent
router.post("/create-payment", async (req, res) => {
  const { id, amount } = req.body;

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Membership Payment",
      payment_method: id,
      confirm: true,
    });

    // console.log(payment);

    res.status(200).send({
      message: payment.status,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

module.exports = router;
