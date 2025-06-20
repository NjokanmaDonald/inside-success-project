const { validationResult } = require("express-validator");
const prisma = require("../lib/prismaClient");

const createComment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation error",
      errors: errors.array(),
    });
  }
  const { user, comment, decisionRoomId } = req.body;

  const decisionRoom = await prisma.decisionRoom.findUnique({
    where: { id: decisionRoomId },
  });

  if (!decisionRoom) {
    return res.status(400).json({
      message: "No decision room with such Id",
      code: "INVALID_ID",
    });
  }
  try {
    const newComment = await prisma.comment.create({
      data: {
        comment,
        user,
        decisionRoomId,
      },
    });

    res
      .status(201)
      .json({ message: "Comment succesfully created", data: newComment });
  } catch (err) {
    console.error("Comment creation error: ", err);
    return res.status(500).json({
      message: "Unexpected error occured",
      error: err.message | err,
    });
  }
};

const getCommentsForRoom = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation error",
      errors: errors.array(),
    });
  }
  const { decisionRoomId } = req.params;

  const decisionRoom = await prisma.decisionRoom.findUnique({
    where: { id: decisionRoomId },
  });

  if (!decisionRoom) {
    return res.status(400).json({
      message: "No decision room with such Id",
      code: "INVALID_ID",
    });
  }

  try {
    const comments = await prisma.comment.findMany({
      where: { decisionRoomId },
      include: { replies: true },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({ success: true, data: comments });
  } catch (err) {
    console.error("Comment fetch error: ", err);
    return res.status(500).json({
      message: "Unexpected error occured",
      error: err.message | err,
    });
  }
};

module.exports = { createComment, getCommentsForRoom };
