"use client";

import { useEffect, useState } from "react";
import { getVoteResults } from "@/app/lib/apiCalls/vote";

type Props = {
  roomId: string;
};

type VoteOptionResult = {
  votingOption: string;
  count: number;
};

export default function VoteResults({ roomId }: Props) {
  const [results, setResults] = useState<{
    totalVotes: number;
    votesPerOption: VoteOptionResult[];
  } | null>(null);

  useEffect(() => {
    getVoteResults(roomId).then(setResults);
  }, [roomId]);

  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold">Vote Results</h2>
      {results?.votesPerOption.map((option) => (
        <li key={option.votingOption}>
          The Option of &apos;{option.votingOption}&apos; has {option.count}{" "}
          votes
        </li>
      ))}
    </div>
  );
}
