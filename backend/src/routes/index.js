const { Router } = require("express");
const articlesRouter = require("./articles/article.controller");
const commentsRouter = require("./comments/comments.controller");
const paymentsRouter = require("./payments/stripe.controller");
const supportsRouter = require("./supports/chat.controller");

const router = Router();
router.use("/articles", articlesRouter);
router.use("/payments", paymentsRouter);
router.use("/comments", commentsRouter);
router.use("/supports", supportsRouter);

module.exports = router;
