import api from "./api";
import type { VotePayload } from "@/app/api/vote/route";

export type { VotePayload };

/**
 * Submit a biryani vote through the app's `/api/vote` route handler,
 * which proxies the request to the One Chef Biryani Premier League endpoint.
 */
export async function submitVote(payload: VotePayload) {
  const { data } = await api.post("/vote", payload);
  return data;
}
