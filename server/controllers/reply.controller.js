const { validationResult } = require("express-validator");
const prisma = require("../lib/prismaClient");

const createReply = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation error",
      errors: errors.array(),
    });
  }
  const { user, reply, commentId } = req.body;

  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
  });

  if (!comment) {
    return res.status(400).json({
      message: "No comment room with such Id",
      code: "INVALID_ID",
    });
  }

  try {
    const newReply = await prisma.reply.create({
      data: {
        reply,
        user,
        commentId,
      },
    });

    res
      .status(201)
      .json({ message: "Reply created successfully", data: newReply });
  } catch (err) {
    console.error("Reply creation: ", err);
    return res.status(500).json({
      message: "Unexpected error occured",
      error: err.message | err,
    });
  }
};

module.exports = { createReply };
