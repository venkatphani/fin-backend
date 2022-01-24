const express = require("express");
const db = require("../models");
const { validationLoopMiddleware } = require("../validations/middleware");
const Article = db.article;

const router = express.Router();

router.get("/all", async (req, res) => {
  try {
    const articles = await Article.findAll();
    return res.status(200).json({
      success: true,
      data: articles,
    });
  } catch (error) {
    return res.status(500).json({ error, success: false });
  }
});

router.post("/bulkcreate", validationLoopMiddleware(["userId", "id", "title", "body"], "dataToUpload"), async (req, res) => {
  try {
    const { dataToUpload } = req.body;

    const articles = await Article.bulkCreate(dataToUpload, {
      updateOnDuplicate: ["userId", "title", "body"],
    });
    return res.status(200).json({
      success: true,
      data: articles,
    });
  } catch (error) {
    return res.status(500).json({ error, success: false });
  }
});

module.exports = router;
