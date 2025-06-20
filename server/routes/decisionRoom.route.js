const {
  createDecisionRoom,
  getAllDecisonRoomsForAUser,
  getOneDecisionRoom,
  getAllDecisionRoomsAUserCreated,
  joinDecisionRoom,
} = require("../controllers/decisionRoom.controller");
const authorizeUser = require("../middlewares/authorization/authorizeUser");
const {
  validateDecisionRoomCreationData,
  validateDecisionRoomFetchData,
  validateJoinDecisionRoomData,
} = require("../middlewares/validators/decisionRoom.validator");

const router = require("express").Router();

router.post(
  "/create",
  authorizeUser,
  validateDecisionRoomCreationData,
  createDecisionRoom
);

router.post("/new-member", validateJoinDecisionRoomData, joinDecisionRoom);

router.get("/get-all-for-a-user", authorizeUser, getAllDecisonRoomsForAUser);

router.get(
  "/get/:decisionRoomId",
  validateDecisionRoomFetchData,
  getOneDecisionRoom
);

router.get(
  "/get-all-user-created",
  authorizeUser,
  getAllDecisionRoomsAUserCreated
);

module.exports = router;
