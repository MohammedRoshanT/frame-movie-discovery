# FRAME — Movie Discovery

A cinematic movie discovery app built with React and Vite. Browse a curated starter collection, search OMDb, filter by genre, sort titles, and save a personal watchlist.

## Run locally

```sh
npm install
npx vercel login
npx vercel link
npx vercel env pull .env.local
npx vercel dev
```

Vercel's local development server runs the `/api/movies` function alongside the Vite frontend. `npm run dev` alone only serves the frontend, so movie search will not work through that command.

## Configure OMDb on Vercel

1. Get a free API key from [omdbapi.com](https://www.omdbapi.com/apikey.aspx).
2. Open the Vercel project settings and add an environment variable named `OMDB_API_KEY` (without a `VITE_` prefix).
3. Enable it for Production and Preview as needed, then redeploy.

The Vercel Function at `/api/movies` reads this variable on the server and proxies movie search and detail requests. The key is never sent to the browser. For local development, `vercel env pull .env.local` fetches the project's development variables into an ignored local file.

## Build

```sh
npm run build
npm run preview
```

## Stack

- React 18 + Vite
- OMDb API via a server-side Vercel Function
- Lucide icons
- Local storage for the OMDb key and watchlist
