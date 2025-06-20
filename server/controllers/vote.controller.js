const { validationResult } = require("express-validator");
const prisma = require("../lib/prismaClient");

// vote for an option in a decision group
const castVote = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation error",
      errors: errors.array(),
    });
  }
  const { userId, unregisteredUserId, decisionRoomId, votingOption } = req.body;

  if (!userId && !unregisteredUserId) {
    return res.status(400).json({
      message: "One of user id or unregistered user id must be made available",
      code: "MISSING_IDs",
    });
  }

  try {
    const decisionRoom = await prisma.decisionRoom.findUnique({
      where: { id: decisionRoomId },
    });

    if (!decisionRoom) {
      return res.status(400).json({
        message: "No decision room with such ID",
        code: "INVALID_DISCOUNT_ID",
      });
    }

    const hasVotedBefore = await prisma.voteTracker.findFirst({
      where: {
        decisionRoomId,
        OR: [
          { userId: userId || undefined },
          { unregisteredUserId: unregisteredUserId || undefined },
        ],
      },
    });

    if (hasVotedBefore) {
      return res.status(400).json({
        message: "You have voted already. You cannot vote twice",
        code: "VOTED_ALREADY",
      });
    }

    const votingOptions = decisionRoom.votingOptions;

    if (!votingOptions.includes(votingOption)) {
      return res.status(400).json({
        message: "This is not a valid option",
        error: "INVALID_VOTING_OPTION",
      });
    }

    const newVote = await prisma.vote.create({
      data: {
        decisionRoomId,
        votingOption,
      },
    });

    await prisma.voteTracker.create({
      data: {
        userId: userId ?? null,
        unregisteredUserId: unregisteredUserId ?? null,
        decisionRoomId,
      },
    });

    return res.status(201).json({
      message: "Vote cast successfully",
      data: newVote,
    });
  } catch (err) {
    console.error("Voting error: ", err);
    return res.status(500).json({
      message: "Unexpected error occured",
      error: err.message | err,
    });
  }
};

// get voting status of a user
const voteStatus = async (req, res) => {
  const { userId, decisionRoomId } = req.params;

  try {
    const voteStatus = await prisma.voteTracker.findFirst({
      where: { userId, decisionRoomId },
    });

    if (voteStatus) {
      return res.status(200).json({
        message: "Voted",
      });
    } else {
      return res.status(200).json({
        message: "Not-Voted",
      });
    }
  } catch (err) {
    console.error("Voting error: ", err);
    return res.status(500).json({
      message: "Unexpected error occured",
      error: err.message | err,
    });
  }
};

// get voteCount
const getVoteStats = async (req, res) => {
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
      message: "No decision room with such id",
      code: "INVALID_ID",
    });
  }

  try {
    // Total votes
    const totalVotes = await prisma.vote.count({
      where: { decisionRoomId },
    });

    // Votes per option
    const votesPerOptionRaw = await prisma.vote.groupBy({
      by: ["votingOption"],
      where: { decisionRoomId },
      _count: {
        _all: true,
      },
    });

    const votesPerOption = votesPerOptionRaw.map((v) => ({
      votingOption: v.votingOption,
      count: v._count._all,
    }));

    return res.status(200).json({
      totalVotes,
      votesPerOption,
    });
  } catch (err) {
    console.error("Vote stats error:", err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message | err });
  }
};

module.exports = { castVote, voteStatus, getVoteStats };
