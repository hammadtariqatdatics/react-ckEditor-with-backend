const { Router } = require("express");
const articleRouter = require("./articles/article.controller");
const commentsRouter = require("./comments/comments.controller");

const router = Router();
router.use("/articles", articleRouter);
router.use("/comments", commentsRouter);

module.exports = router;
