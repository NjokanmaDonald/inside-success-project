const { body, param } = require("express-validator");

const validateCastVoteData = [
  body("decisionRoomId")
    .isLength({ min: 1 })
    .withMessage("Decision room id cannot be empty"),
  body("votingOption")
    .optional()
    .isLength({ min: 1 })
    .withMessage("Voting option cannot be empty"),
];

const validateGetVotesStats = [
  param("decisionRoomId")
    .isLength({ min: 1 })
    .withMessage("Decision room id cannot be empty"),
];

module.exports = { validateCastVoteData, validateGetVotesStats };
