import React, { useState } from 'react';

const MovieCard = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="movie-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img 
        src={movie.poster_path || 'https://via.placeholder.com/300x450?text=No+Image'} 
        alt={movie.title}
        className="movie-card-img"
      />
      {isHovered && (
        <div className="movie-card-hover">
          <div className="movie-card-video">
            <img 
              src={movie.backdrop_path || movie.poster_path} 
              alt={movie.title}
              className="movie-card-backdrop"
            />
            <div className="movie-card-overlay">
              <h3 className="movie-card-title">{movie.title}</h3>
              <div className="movie-card-actions">
                <button className="action-btn play-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                </button>
                <button className="action-btn add-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5v14M5 12h14"></path>
                  </svg>
                </button>
                <button className="action-btn like-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 10v12M7 10a5 5 0 0 1 5-5h.5A5.5 5.5 0 0 1 18 10.5V12a2 2 0 0 0 2 2v8a2 2 0 0 1-2 2h-2c-1.1 0-2.9-.7-4-2l-1-1.5c-1.1-1.3-1.9-2-3-2H7z"></path>
                  </svg>
                </button>
                <button className="action-btn more-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
              </div>
              <div className="movie-card-info">
                <span className="match-score">{Math.round(movie.vote_average * 10)}% Match</span>
                <span className="age-rating">13+</span>
                <span className="duration">2h 15m</span>
              </div>
              <div className="movie-card-genres">
                <span>{movie.genre}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
