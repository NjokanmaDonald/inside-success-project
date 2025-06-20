const { body } = require("express-validator");

const validateCreateReplyData = [
  body("user").notEmpty().withMessage("User is required"),
  body("reply").notEmpty().withMessage("Text is required"),
  body("commentId").notEmpty().withMessage("Comment ID is required"),
];

module.exports = { validateCreateReplyData };
