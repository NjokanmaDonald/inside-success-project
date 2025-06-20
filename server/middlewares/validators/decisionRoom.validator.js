const { body, param } = require("express-validator");

const validateDecisionRoomCreationData = [
  body("title").isLength({ min: 1 }).withMessage("Title field cannot be empty"),
  body("description")
    .isLength({ min: 1 })
    .withMessage("Description field cannot be empty"),
  body("votingOptions")
    .isArray({ min: 2 })
    .withMessage("There must be at least 2 options"),
  body("deadline").isISO8601().withMessage("Provide valide date and time"),
];

const validateJoinDecisionRoomData = [
  body("userId")
    .isLength({ min: 1 })
    .withMessage(" User id field cannot be empty"),
  ,
  body("decisionRoomId")
    .isLength({ min: 1 })
    .withMessage("Decision room id field cannot be empty"),
  ,
];

const validateDecisionRoomFetchData = [
  param("decisionRoomId")
    .isLength({ min: 1 })
    .withMessage("Id field cannot be empty"),
];

module.exports = {
  validateDecisionRoomCreationData,
  validateJoinDecisionRoomData,
  validateDecisionRoomFetchData,
};
