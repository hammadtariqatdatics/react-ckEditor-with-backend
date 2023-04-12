const { Router } = require("express");
const articleRouter = require("./articles/article.controller");

const router = Router();
router.use("/articles", articleRouter);

module.exports = router;
