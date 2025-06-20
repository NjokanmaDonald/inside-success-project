const { validationResult } = require("express-validator");
const prisma = require("../lib/prismaClient");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// register user
const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation error",
      errors: errors.array(),
    });
  }
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({
      message: "Passwords do not match",
      code: "MISMATCHED_PASSWORDS",
    });
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.json({
        message: "User already existing",
        code: "USER_ALREADY_EXISTS",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });

    const { password: removedPassword, ...userWithoutPassword } = newUser;

    return res.status(201).json({
      message: "User created succesfully",
      data: userWithoutPassword,
    });
  } catch (err) {
    console.error("User Registration error:", err);

    return res.status(500).json({
      message: "An unexpected error occured",
      error: err.message || err,
    });
  }
};

const userLogin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation error",
      errors: errors.array(),
    });
  }

  const { email, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      return res.status(400).json({
        message: "No user with this email exists",
        code: "USER_NOT_FOUND",
      });
    }

    const isPasswordMatched = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordMatched) {
      return res.status(400).json({
        message: "Incorrect password. Please input the correct password",
        code: "INCORRECT_PASSWORD",
      });
    }

    const { password: removedPassword, ...userWithoutPassword } = existingUser;

    const token = jwt.sign(
      { id: existingUser.id, email: existingUser.email },
      process.env.JWT_KEY,
      {
        expiresIn: "24h",
      }
    );

    return res.status(200).json({
      message: "User login successful",
      data: { ...userWithoutPassword, token },
    });
  } catch (err) {
    console.error("Sign In error: ", err);

    return res.status(500).json({
      message: "Unexpected error occured",
      error: err.message | err,
    });
  }
};

module.exports = { registerUser, userLogin };
