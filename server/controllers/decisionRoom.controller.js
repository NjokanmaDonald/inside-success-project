const { validationResult } = require("express-validator");
const prisma = require("../lib/prismaClient");

// create new decisionRoom
const createDecisionRoom = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation error",
      errors: errors.array(),
    });
  }

  const user = req.user;

  const { title, description, votingOptions, deadline } = req.body;

  try {
    const newDecisionRoom = await prisma.decisionRoom.create({
      data: {
        title,
        description,
        votingOptions,
        deadline,
        createdById: user.id,
        roomMembership: {
          create: {
            userId: user.id,
          },
        },
      },
    });

    await prisma.decisionRoom.update({
      where: { id: newDecisionRoom.id },
      data: {
        roomUrl: `https://inside-success-project.vercel.app/rooms/${newDecisionRoom.id}`,
      },
    });

    return res.status(201).json({
      message: "Decision Room created successfully",
      data: newDecisionRoom,
    });
  } catch (err) {
    console.error("Decison room creation error:", err);

    res.status(500).json({
      message: "Unexpected error occured",
      error: err.message | err,
    });
  }
};

// join decisionRoom
const joinDecisionRoom = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation error",
      errors: errors.array(),
    });
  }

  const { userId, decisionRoomId } = req.body;

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return res.status(400).json({
      message: "This user does not exist",
      code: "INVALID_ID",
    });
  }

  const decisionRoom = await prisma.decisionRoom.findUnique({
    where: { id: decisionRoomId },
  });

  if (!decisionRoom) {
    return res.status(400).json({
      message: "This decision room does not exist",
      code: "INVALID_ID",
    });
  }

  try {
    const newRoomMembership = await prisma.roomMembership.create({
      data: {
        userId,
        decisionRoomId,
      },
    });

    return res.status(201).json({
      message: "New room membership created",
      data: newRoomMembership,
    });
  } catch (err) {
    console.error("Room membership creation error: ", err);

    res.status(500).json({
      message: "Unexpected error occurred",
      error: err.message || err,
    });
  }
};

// get all decision rooms a user belongs to
const getAllDecisonRoomsForAUser = async (req, res) => {
  const user = req.user;
  try {
    const rooms = await prisma.roomMembership.findMany({
      where: {
        userId: user.id,
      },
      include: {
        decisionRoom: true,
      },
    });

    return res.status(200).json({
      message: "Decision rooms fetched successfully",
      data: rooms,
    });
  } catch (err) {
    console.error("Decison room fetch error: ", err);
    res.status(500).json({
      message: "Unexpected error occured",
      error: err.message | err,
    });
  }
};

// get one decision room
const getOneDecisionRoom = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation error",
      errors: errors.array(),
    });
  }

  const { decisionRoomId } = req.params;

  try {
    const room = await prisma.decisionRoom.findUnique({
      where: { id: decisionRoomId },
      include: {
        roomMembership: true,
      },
    });

    return res.status(200).json({
      message: "Decision Room fetched successfully",
      data: room,
    });
  } catch (err) {
    console.error("Decison room fetch error: ", err);
    res.status(500).json({
      message: "Unexpected error occured",
      error: err.message | err,
    });
  }
};

// get all decision rooms that a user created
const getAllDecisionRoomsAUserCreated = async (req, res) => {
  const user = req.user;
  try {
    const rooms = await prisma.decisionRoom.findMany({
      where: {
        createdById: user.id,
      },
    });

    return res.status(200).json({
      message: "Created Decision rooms fetched successfully",
      data: rooms,
    });
  } catch (err) {
    console.error("Decison room fetch error: ", err);
    res.status(500).json({
      message: "Unexpected error occured",
      error: err.message | err,
    });
  }
};

module.exports = {
  createDecisionRoom,
  joinDecisionRoom,
  getAllDecisonRoomsForAUser,
  getOneDecisionRoom,
  getAllDecisionRoomsAUserCreated,
};
