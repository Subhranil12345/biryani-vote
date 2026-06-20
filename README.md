# Biryani Vote

A small [Next.js](https://nextjs.org) (App Router) app that submits a biryani
rating to the One Chef Biryani Premier League voting endpoint.

## How it works

- **`src/app/api/vote/route.ts`** — a `POST` Route Handler at `/api/vote`. It
  validates the incoming body and proxies the vote server-side to the upstream
  endpoint (avoids browser CORS). Returns the upstream status and response.
- **`src/lib/vote.ts`** — a typed `submitVote()` helper that calls `/api/vote`
  through the shared axios instance in `src/lib/api.ts`.
- **`src/app/vote-button.tsx`** — a client component that submits a single vote
  on click and shows the result inline.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and click **Vote**.

You can also hit the route directly:

```bash
curl 'http://localhost:3000/api/vote' \
  -H 'content-type: application/json' \
  --data-raw '{"biriyani":"Ambur","taste":8,"aroma":8,"authenticity":8}'
```

## Notes

Each click casts one vote — a genuine user action. Please don't modify it to
submit votes automatically or in bulk; that abuses the contest it talks to.
