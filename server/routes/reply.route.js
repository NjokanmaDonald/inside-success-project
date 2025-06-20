const { createReply } = require("../controllers/reply.controller");
const {
  validateCreateReplyData,
} = require("../middlewares/validators/reply.validators");

const router = require("express").Router();

router.post("/create", validateCreateReplyData, createReply);

module.exports = router;
