import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    // Search functionality can be implemented here
    console.log('Searching for:', searchQuery);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-left">
        <a href="/" className="navbar-logo">
          <span className="logo-text">TESTDIVE</span>
        </a>
        <ul className="navbar-links">
          <li><a href="#" className="active">Home</a></li>
          <li><a href="#">TV Shows</a></li>
          <li><a href="#">Movies</a></li>
          <li><a href="#">New & Popular</a></li>
          <li><a href="#">My List</a></li>
        </ul>
      </div>
      <div className="navbar-right">
        <form onSubmit={handleSearch} className="search-container">
          <input
            type="text"
            placeholder="Titles, people, genres"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
          </button>
        </form>
        <button className="navbar-btn notification-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
          </svg>
        </button>
        <div className="profile-dropdown">
          <img 
            src="https://occ-0-1190-2774.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABY20DrC9-11ewwAs6nfEgb1vrORxRPP9IGmlW1WtKuaLIz8VxCx5NryzDK3xezN2AO1fOEgHOnSlAoZt0jLxt4I0gHk1.png?r=fcc" 
            alt="Profile" 
            className="profile-avatar"
          />
          <span className="dropdown-arrow">▼</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
