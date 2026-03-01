const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// TestDive API client - connects to our backend
export const testdiveApi = {
  // Fetch all movies
  fetchMovies: async () => {
    try {
      // If no backend URL is set (production), use mock data directly
      if (!import.meta.env.VITE_API_URL) {
        console.log('No API URL set, using mock data');
        return mockMovies;
      }
      
      const response = await fetch(`${API_BASE_URL}/movies`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.movies || data;
    } catch (error) {
      console.error('Error fetching movies:', error);
      // Return mock data if backend is not available
      return mockMovies;
    }
  },

  // Fetch movie by ID
  fetchMovieById: async (movieId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/movies/${movieId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.movie || data;
    } catch (error) {
      console.error('Error fetching movie:', error);
      // Find in mock data
      return mockMovies.find(m => m.id === parseInt(movieId)) || null;
    }
  },

  // Search movies
  searchMovies: async (query) => {
    try {
      const response = await fetch(`${API_BASE_URL}/search?query=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.results || data;
    } catch (error) {
      console.error('Error searching movies:', error);
      // Search in mock data
      return mockMovies.filter(m => 
        m.title.toLowerCase().includes(query.toLowerCase())
      );
    }
  },

  // Fetch movies by category/genre
  fetchMoviesByCategory: async (category) => {
    try {
      const response = await fetch(`${API_BASE_URL}/movies/genre/${encodeURIComponent(category)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.movies || data;
    } catch (error) {
      console.error('Error fetching movies by category:', error);
      // Filter mock data
      return mockMovies.filter(m => m.genre.toLowerCase() === category.toLowerCase());
    }
  }
};

// Mock data for testing (in case API is not available)
export const mockMovies = [
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
  }
];

// Helper function to group movies by genre
export const groupMoviesByGenre = (movies) => {
  const grouped = {};
  movies.forEach(movie => {
    const genre = movie.genre || 'Other';
    if (!grouped[genre]) {
      grouped[genre] = [];
    }
    grouped[genre].push(movie);
  });
  return grouped;
};

// Helper function to get featured movie (highest rated)
export const getFeaturedMovie = (movies) => {
  if (!movies || movies.length === 0) return null;
  return movies.reduce((prev, current) => 
    (prev.vote_average > current.vote_average) ? prev : current
  );
};
