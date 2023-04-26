const { Router } = require("express");
const articlesRouter = require("./articles/article.controller");
const commentsRouter = require("./comments/comments.controller");
const paymentsRouter = require("./payments/stripe.controller");

const router = Router();
router.use("/payments", paymentsRouter);
router.use("/articles", articlesRouter);
router.use("/comments", commentsRouter);

module.exports = router;
