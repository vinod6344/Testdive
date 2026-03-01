import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import MovieRow from './MovieRow';
import { testdiveApi, mockMovies, groupMoviesByGenre, getFeaturedMovie } from '../services/testdive';

const NetflixApp = () => {
  const [movies, setMovies] = useState([]);
  const [groupedMovies, setGroupedMovies] = useState({});
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usingMockData, setUsingMockData] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Fetching movies from backend...');
        
        // Fetch from our backend
        const movieData = await testdiveApi.fetchMovies();
        
        console.log('Received movies:', movieData);

        // Ensure we have an array
        if (!Array.isArray(movieData) || movieData.length === 0) {
          console.warn('Invalid data format or empty, using mock data');
          setMovies(mockMovies);
          setGroupedMovies(groupMoviesByGenre(mockMovies));
          setFeaturedMovie(getFeaturedMovie(mockMovies));
          setUsingMockData(true);
        } else {
          setMovies(movieData);
          
          // Group movies by genre
          const grouped = groupMoviesByGenre(movieData);
          setGroupedMovies(grouped);
          
          // Set featured movie (highest rated)
          const featured = getFeaturedMovie(movieData);
          setFeaturedMovie(featured);
          
          // Check if we're using mock data from backend
          if (movieData === mockMovies) {
            setUsingMockData(true);
          }
        }
        
      } catch (err) {
        console.error('Error in fetchMovies:', err);
        setError('Failed to load movies. Please try again later.');
        // Fallback to mock data
        setMovies(mockMovies);
        setGroupedMovies(groupMoviesByGenre(mockMovies));
        setFeaturedMovie(getFeaturedMovie(mockMovies));
        setUsingMockData(true);
      } finally {
        // Add a small delay to ensure smooth loading
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="netflix-app">
        <div className="loading-screen">
          <div className="netflix-spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error && movies.length === 0) {
    return (
      <div className="netflix-app">
        <div className="error-screen">
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="retry-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="netflix-app">
      <Navbar />
      
      {usingMockData && (
        <div className="api-notice">
          <span>⚠️ Using demo data. TestDive API connection unavailable.</span>
        </div>
      )}
      
      <Hero movie={featuredMovie} />
      
      <div className="movie-rows-container">
        {/* Trending Now - All movies */}
        <MovieRow title="Trending Now" movies={movies} />
        
        {/* Movies grouped by genre */}
        {Object.entries(groupedMovies).map(([genre, genreMovies]) => (
          <MovieRow 
            key={genre} 
            title={`${genre} Movies`} 
            movies={genreMovies} 
          />
        ))}
        
        {/* Top Rated */}
        <MovieRow 
          title="Top Rated" 
          movies={[...movies].sort((a, b) => b.vote_average - a.vote_average).slice(0, 10)} 
        />
        
        {/* New Releases (sorted by date) */}
        <MovieRow 
          title="New Releases" 
          movies={[...movies].sort((a, b) => new Date(b.release_date) - new Date(a.release_date))} 
        />
      </div>
      
      <footer className="netflix-footer">
        <div className="footer-content">
          <div className="footer-links">
            <a href="#">Audio Description</a>
            <a href="#">Help Center</a>
            <a href="#">Gift Cards</a>
            <a href="#">Media Center</a>
            <a href="#">Investor Relations</a>
            <a href="#">Jobs</a>
            <a href="#">Terms of Use</a>
            <a href="#">Privacy</a>
            <a href="#">Legal Notices</a>
            <a href="#">Cookie Preferences</a>
            <a href="#">Corporate Information</a>
            <a href="#">Contact Us</a>
          </div>
          <div className="footer-copyright">
            <p>&copy; 2024 TestDive Movie App. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NetflixApp;
