"use client";

import { useState } from "react";
import { submitVote, type VotePayload } from "@/lib/vote";

const DEFAULT_VOTE: VotePayload = {
  biriyani: "Ambur",
  taste: 8,
  aroma: 8,
  authenticity: 8,
};

type Status =
  | { state: "idle" }
  | { state: "loading" }
  | { state: "success"; message: string }
  | { state: "error"; message: string };

export default function VoteButton() {
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function handleVote() {
    setStatus({ state: "loading" });
    try {
      for (let j=0;j<57;j++){
      const data = await submitVote(DEFAULT_VOTE);
      
      setStatus({ state: "success", message: JSON.stringify(data) });}
    } catch (err) {
      const message = err instanceof Error ? err.message : "Vote failed";
      setStatus({ state: "error", message });
    }
  }

  return (
    <div className="flex flex-col items-center gap-2 sm:items-start">
      <button
        type="button"
        onClick={handleVote}
        disabled={status.state === "loading"}
        className="flex h-12 items-center justify-center rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] disabled:opacity-50 dark:hover:bg-[#ccc]"
      >
        {status.state === "loading"
          ? "Submitting…"
          : `Vote for ${DEFAULT_VOTE.biriyani}`}
      </button>
      {status.state === "success" && (
        <p className="text-sm text-green-600 dark:text-green-400">
          Vote submitted: {status.message}
        </p>
      )}
      {status.state === "error" && (
        <p className="text-sm text-red-600 dark:text-red-400">
          {status.message}
        </p>
      )}
    </div>
  );
}
