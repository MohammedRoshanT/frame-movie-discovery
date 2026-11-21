const OMDB_URL = 'https://www.omdbapi.com/';
const fallbackPoster = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=500&q=80';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const query = typeof req.query?.q === 'string' ? req.query.q.trim().slice(0, 100) : '';
  if (!query) return res.status(400).json({ error: 'Enter a movie title to search.' });

  const apiKey = process.env.OMDB_API_KEY;
  if (!apiKey) return res.status(503).json({ error: 'Movie search is not configured yet. Add OMDB_API_KEY in your Vercel project settings.' });

  try {
    const searchUrl = new URL(OMDB_URL);
    searchUrl.search = new URLSearchParams({ apikey: apiKey, s: query, type: 'movie' });
    const searchResponse = await fetch(searchUrl);
    if (!searchResponse.ok) throw new Error('OMDb search request failed.');
    const searchData = await searchResponse.json();
    if (searchData.Response !== 'True') {
      return res.status(200).json({ movies: [], message: searchData.Error || 'No matching films found. Try another title.' });
    }

    const movies = await Promise.all(searchData.Search.slice(0, 12).map(async (movie) => {
      const detailUrl = new URL(OMDB_URL);
      detailUrl.search = new URLSearchParams({ apikey: apiKey, i: movie.imdbID, plot: 'short' });
      const response = await fetch(detailUrl);
      if (!response.ok) return null;
      const detail = await response.json();
      if (detail.Response !== 'True') return null;
      return {
        id: movie.imdbID,
        title: movie.Title,
        year: movie.Year?.slice(0, 4) || '—',
        genre: detail.Genre?.split(',')[0]?.trim() || 'Movie',
        rating: detail.imdbRating && detail.imdbRating !== 'N/A' ? detail.imdbRating : '—',
        runtime: detail.Runtime || '—',
        director: detail.Director || '—',
        poster: movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : fallbackPoster,
        blurb: detail.Plot && detail.Plot !== 'N/A' ? detail.Plot : 'A title waiting to be discovered.',
      };
    }));

    return res.status(200).json({ movies: movies.filter(Boolean) });
  } catch (error) {
    console.error('OMDb proxy error:', error.message);
    return res.status(502).json({ error: 'Could not reach OMDb right now. Please try again.' });
  }
}
