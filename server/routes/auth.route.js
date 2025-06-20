const { registerUser, userLogin } = require("../controllers/auth.controller");
const {
  validateRegistrationData,
  validateLoginData,
} = require("../middlewares/validators/auth.validators");

const router = require("express").Router();

router.post("/register", validateRegistrationData, registerUser);
router.post("/login", validateLoginData, userLogin);

module.exports = router;
