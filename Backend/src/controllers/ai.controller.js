const aiService = require("../services/ai.service"); //generateContent

module.exports.getReview = async (req, res) => {
  const code = req.body.code;
  if (!code) {
    res.status(400).send("Prompt is required");
    return;
  }

  const response = await aiService(code);

  res.send(response);
};
