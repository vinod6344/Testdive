import React from 'react';

const Hero = ({ movie }) => {
  if (!movie) return null;

  const truncateOverview = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  };

  return (
    <div 
      className="hero"
      style={{
        backgroundImage: `url(${movie.backdrop_path || movie.poster_path})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center'
      }}
    >
      <div className="hero-contents">
        <h1 className="hero-title">{movie.title}</h1>
        <div className="hero-buttons">
          <button className="hero-btn hero-btn-play">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
            Play
          </button>
          <button className="hero-btn hero-btn-more">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 16v-4"></path>
              <path d="M12 8h.01"></path>
            </svg>
            More Info
          </button>
        </div>
        <p className="hero-description">
          {truncateOverview(movie.overview, 150)}
        </p>
        <div className="hero-meta">
          <span className="hero-rating">⭐ {movie.vote_average?.toFixed(1)}</span>
          <span className="hero-year">{movie.release_date?.split('-')[0]}</span>
          <span className="hero-genre">{movie.genre}</span>
        </div>
      </div>
      <div className="hero-fade-bottom"></div>
    </div>
  );
};

export default Hero;
