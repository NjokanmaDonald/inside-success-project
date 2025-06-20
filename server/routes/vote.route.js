const {
  castVote,
  voteStatus,
  getVoteStats,
} = require("../controllers/vote.controller");
const {
  validateCastVoteData,
  validateGetVotesStats,
} = require("../middlewares/validators/vote.validators");

const router = require("express").Router();

router.post("/create", validateCastVoteData, castVote);
router.get("/status/:userId/:decisionRoomId", voteStatus);
router.get("/stats/:decisionRoomId", validateGetVotesStats, getVoteStats);

module.exports = router;
