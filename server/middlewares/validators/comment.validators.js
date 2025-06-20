const { body, param } = require("express-validator");

const validateCreateCommentData = [
  body("user").notEmpty().withMessage("User is required"),
  body("comment").notEmpty().withMessage("Text is required"),
  body("decisionRoomId").notEmpty().withMessage("Decision Room ID is required"),
];

const validateGetCommentsForRoomData = [
  param("decisionRoomId")
    .notEmpty()
    .withMessage("Decision Room ID is required"),
];

module.exports = { validateCreateCommentData, validateGetCommentsForRoomData };
