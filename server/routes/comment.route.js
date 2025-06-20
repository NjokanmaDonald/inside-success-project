const {
  createComment,
  getCommentsForRoom,
} = require("../controllers/comment.controller");
const {
  validateCreateCommentData,
  validateGetCommentsForRoomData,
} = require("../middlewares/validators/comment.validators");

const router = require("express").Router();

router.post("/create", validateCreateCommentData, createComment);
router.get(
  "/get/:decisionRoomId",
  validateGetCommentsForRoomData,
  getCommentsForRoom
);

module.exports = router;
