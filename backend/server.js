import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import https from 'https';

const app = express();
const PORT = process.env.PORT || 3001;

// Create HTTPS agent that accepts self-signed certificates
const httpsAgent = new https.Agent({
  rejectUnauthorized: false
});

// Middleware
app.use(cors());
app.use(express.json());

// TestDive API configuration
const TESTDIVE_API_KEY = '1069506-Vinodkum-1FBD0DA4';
const TESTDIVE_BASE_URL = 'https://testdive.com/api/v1';

// Mock movie data (fallback)
const mockMovies = [
  {
    id: 1,
    title: "The Dark Knight",
    overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    poster_path: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/hd1TvTUGjkoYoqvX9icSLV55ke9.jpg",
    vote_average: 8.5,
    release_date: "2008-07-18",
    genre: "Action"
  },
  {
    id: 2,
    title: "Inception",
    overview: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    poster_path: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
    vote_average: 8.4,
    release_date: "2010-07-16",
    genre: "Sci-Fi"
  },
  {
    id: 3,
    title: "Interstellar",
    overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    poster_path: "https://image.tmdb.org/t/p/w500/gEU2QniL6C8z19uVOtYnZ5UYj52.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
    vote_average: 8.3,
    release_date: "2014-11-07",
    genre: "Sci-Fi"
  },
  {
    id: 4,
    title: "The Shawshank Redemption",
    overview: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    poster_path: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/kXfqCquMf3Xb5w5Zz8y9uW7y8.jpg",
    vote_average: 8.7,
    release_date: "1994-09-23",
    genre: "Drama"
  },
  {
    id: 5,
    title: "Pulp Fiction",
    overview: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    poster_path: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/suaEOtk1N1sgg2MTM7oZd2cfVp3.jpg",
    vote_average: 8.5,
    release_date: "1994-10-14",
    genre: "Crime"
  },
  {
    id: 6,
    title: "The Matrix",
    overview: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    poster_path: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/fNG7i7RqMErkyqhGHQjOiqITda3.jpg",
    vote_average: 8.2,
    release_date: "1999-03-31",
    genre: "Sci-Fi"
  },
  {
    id: 7,
    title: "Forrest Gump",
    overview: "The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate and other historical events unfold from the perspective of an Alabama man with an IQ of 75.",
    poster_path: "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/3h1JZGDhZ8nzxdgVnHWPN0SJUEND.jpg",
    vote_average: 8.5,
    release_date: "1994-07-06",
    genre: "Drama"
  },
  {
    id: 8,
    title: "The Godfather",
    overview: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    poster_path: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/rSPw7tgCH9c6NqICZef4kZjFOQ5.jpg",
    vote_average: 8.7,
    release_date: "1972-03-24",
    genre: "Crime"
  },
  {
    id: 9,
    title: "Fight Club",
    overview: "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into much more.",
    poster_path: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/hZkgoQYus5vegHoetLkCJzb17zJ.jpg",
    vote_average: 8.4,
    release_date: "1999-10-15",
    genre: "Drama"
  },
  {
    id: 10,
    title: "Avengers: Endgame",
    overview: "After the devastating events of Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions.",
    poster_path: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
    vote_average: 8.3,
    release_date: "2019-04-26",
    genre: "Action"
  },
  {
    id: 11,
    title: "Parasite",
    overview: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    poster_path: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/TU9NIjwzjoKPwQHoHshkFcQUCG.jpg",
    vote_average: 8.5,
    release_date: "2019-11-01",
    genre: "Thriller"
  },
  {
    id: 12,
    title: "Spider-Man: Into the Spider-Verse",
    overview: "Teen Miles Morales becomes the Spider-Man of his universe, and must join with five spider-powered individuals from other dimensions to stop a threat for all realities.",
    poster_path: "https://image.tmdb.org/t/p/w500/iiZZdoQBEYBv3id8X7YOZB9tlSE.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/7VdKpiRNnXve7ynj0OqX5w1J1g6.jpg",
    vote_average: 8.4,
    release_date: "2018-12-14",
    genre: "Animation"
  },
  {
    id: 13,
    title: "The Lion King",
    overview: "Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself.",
    poster_path: "https://image.tmdb.org/t/p/w500/sKCr78MXSLixwmZ8DyJLrpMsd15.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/wXsQvli6tWqja51pYxXNG1LFIGV.jpg",
    vote_average: 8.0,
    release_date: "1994-06-24",
    genre: "Animation"
  },
  {
    id: 14,
    title: "Gladiator",
    overview: "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.",
    poster_path: "https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/hND7xA3vRkzCGa9r5Zg8D4lQ6l8.jpg",
    vote_average: 8.1,
    release_date: "2000-05-05",
    genre: "Action"
  },
  {
    id: 15,
    title: "The Silence of the Lambs",
    overview: "A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.",
    poster_path: "https://image.tmdb.org/t/p/w500/rplLJ2hPcOQmkFhTqUte0MkEaO2.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/mfwq2yWBjQLy7JY3XqlN2g7tZ4K.jpg",
    vote_average: 8.3,
    release_date: "1991-02-14",
    genre: "Thriller"
  }
];

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Get all movies
app.get('/api/movies', async (req, res) => {
  try {
    // Try to fetch from TestDive API first
    try {
      const response = await fetch(`${TESTDIVE_BASE_URL}/movies?api_key=${TESTDIVE_API_KEY}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        agent: httpsAgent,
        timeout: 5000
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched from TestDive API:', data);
        return res.json({ 
          success: true, 
          source: 'testdive',
          movies: data.movies || data.data || data 
        });
      }
    } catch (apiError) {
      console.log('TestDive API not available, using mock data:', apiError.message);
    }
    
    // Return mock data if API fails
    res.json({ 
      success: true, 
      source: 'mock',
      movies: mockMovies 
    });
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch movies',
      movies: mockMovies 
    });
  }
});

// Get movie by ID
app.get('/api/movies/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    // Try TestDive API first
    try {
      const response = await fetch(`${TESTDIVE_BASE_URL}/movies/${id}?api_key=${TESTDIVE_API_KEY}`, {
        agent: httpsAgent,
        timeout: 5000
      });
      
      if (response.ok) {
        const data = await response.json();
        return res.json({ success: true, movie: data });
      }
    } catch (apiError) {
      console.log('TestDive API not available, using mock data');
    }
    
    // Find in mock data
    const movie = mockMovies.find(m => m.id === parseInt(id));
    if (movie) {
      return res.json({ success: true, source: 'mock', movie });
    }
    
    res.status(404).json({ success: false, error: 'Movie not found' });
  } catch (error) {
    console.error('Error fetching movie:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch movie' });
  }
});

// Search movies
app.get('/api/search', async (req, res) => {
  const { query } = req.query;
  
  try {
    // Try TestDive API first
    try {
      const response = await fetch(
        `${TESTDIVE_BASE_URL}/search?api_key=${TESTDIVE_API_KEY}&query=${encodeURIComponent(query)}`,
        { agent: httpsAgent, timeout: 5000 }
      );
      
      if (response.ok) {
        const data = await response.json();
        return res.json({ success: true, results: data });
      }
    } catch (apiError) {
      console.log('TestDive API not available, using mock data');
    }
    
    // Search in mock data
    const results = mockMovies.filter(m => 
      m.title.toLowerCase().includes(query.toLowerCase()) ||
      m.overview.toLowerCase().includes(query.toLowerCase())
    );
    
    res.json({ success: true, source: 'mock', results });
  } catch (error) {
    console.error('Error searching movies:', error);
    res.status(500).json({ success: false, error: 'Failed to search movies' });
  }
});

// Get movies by genre
app.get('/api/movies/genre/:genre', (req, res) => {
  const { genre } = req.params;
  const filtered = mockMovies.filter(m => 
    m.genre.toLowerCase() === genre.toLowerCase()
  );
  res.json({ success: true, genre, movies: filtered });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📽️  TestDive API Key: ${TESTDIVE_API_KEY}`);
});
