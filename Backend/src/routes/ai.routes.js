const express = require("express");
const aiController = require("../controllers/ai.controller");
const app = express();
const port = 3000;

const router = express.Router();

// CONTROLLER
router.post("/get-review", aiController.getReview);

module.exports = router;
