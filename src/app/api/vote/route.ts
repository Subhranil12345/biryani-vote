import { NextRequest, NextResponse } from "next/server";

const UPSTREAM_URL =
  "https://www.onechefbiryanipremierleague.com/functions.php?action=submit_vote";

export interface VotePayload {
  biriyani: string;
  taste: number;
  aroma: number;
  authenticity: number;
}

function isValidPayload(value: unknown): value is VotePayload {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.biriyani === "string" &&
    typeof v.taste === "number" &&
    typeof v.aroma === "number" &&
    typeof v.authenticity === "number"
  );
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!isValidPayload(body)) {
    return NextResponse.json(
      {
        error:
          "Expected { biriyani: string, taste: number, aroma: number, authenticity: number }",
      },
      { status: 400 }
    );
  }

  const upstream = await fetch(UPSTREAM_URL, {
    method: "POST",
    headers: {
      accept: "*/*",
      "content-type": "application/json",
      origin: "https://www.onechefbiryanipremierleague.com",
      referer: "https://www.onechefbiryanipremierleague.com/",
      "user-agent":
        "Mozilla/5.0 (Linux; Android 15; Pixel 9) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const text = await upstream.text();
  let data: unknown = text;
  try {
    data = JSON.parse(text);
  } catch {
    // upstream returned non-JSON; pass the raw text through
  }

  return NextResponse.json(data, { status: upstream.status });
}
