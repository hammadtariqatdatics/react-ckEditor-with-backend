const db = require("../../db/models");
const { Payment } = db;

// middleware for checking email
const emailHandler = async (req, res, next) => {
  try {
    const emailCheck = await Payment.findOne({
      where: {
        customerEmail: req.body.email,
      },
    });
    if (emailCheck) {
      res.status(400).send({
        message:
          "Sorry, this user has already purchased the membership... Try new one.",
      });
      return;
    }
    next();
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};

module.exports = emailHandler;
