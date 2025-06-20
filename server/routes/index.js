const router = require("express").Router();
const authRoute = require("./auth.route");
const decisionRoomRoute = require("./decisionRoom.route");
const voteRoute = require("./vote.route");
const commentRoute = require("./comment.route");
const replyRoute = require("./reply.route");

router.use("/auth", authRoute);
router.use("/decision-room", decisionRoomRoute);
router.use("/vote", voteRoute);
router.use("/comment", commentRoute);
router.use("/reply", replyRoute);

module.exports = router;
