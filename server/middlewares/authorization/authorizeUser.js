const jwt = require("jsonwebtoken");
const prisma = require("../../lib/prismaClient");

const authorizeUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Token not provided",
      code: "INVALID_AUTH_HEADER",
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Auth token is required",
      code: "MISSING_TOKEN",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      return res.status(401).json({
        message: "This user does not exist",
        code: "USER_NOT_FOUND",
      });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Unexpected error",
      error: err,
    });
  }
};

module.exports = authorizeUser;
