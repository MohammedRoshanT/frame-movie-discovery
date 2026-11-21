# FRAME — Movie Discovery

A cinematic movie discovery app built with React and Vite. Browse a curated starter collection, search OMDb, filter by genre, sort titles, and save a personal watchlist.

## Run locally

```sh
npm install
npm run dev
```

## OMDb search

The app opens with a curated preview library and does not need a key to run. To search the full OMDb catalog, choose **Connect OMDb** in the top bar, get a free API key from [omdbapi.com](https://www.omdbapi.com/apikey.aspx), then save it in the app. The key is stored in this browser's local storage.

## Build

```sh
npm run build
npm run preview
```

## Stack

- React 18 + Vite
- OMDb API for movie search and details
- Lucide icons
- Local storage for the OMDb key and watchlist
