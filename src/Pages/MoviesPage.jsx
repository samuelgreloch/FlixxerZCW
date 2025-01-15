import React from 'react';
import { useNavigate } from 'react-router-dom';

const MoviesPage = ({ movies }) => {
  const navigate = useNavigate();

  const categories = {
    Action: movies.filter((movie) => movie.genre?.includes('Action')),
    Comedy: movies.filter((movie) => movie.genre?.includes('Comedy')),
    Drama: movies.filter((movie) => movie.genre?.includes('Drama')),
    SciFi: movies.filter((movie) => movie.genre?.includes('Sci-Fi')),
    Animation: movies.filter((movie) => movie.genre?.includes('Animation')),
    Horror: movies.filter((movie) => movie.genre?.includes('Horror')),
  };

//   const handleMovieClick = (movieId) => {
//     navigate(`/movie/${movieId}`);
//   };

  const handleMovieClick = (movieId) => {
    const selectedMovie = movies.find((movie) => movie.contentId === movieId);
    navigate(`/movie/${movieId}`, { state: { movie: selectedMovie } });
  };

  const handleScroll = (direction, categoryId) => {
    const container = document.getElementById(categoryId);
    if (container) {
      const scrollAmount = 220; // Adjust this value based on your thumbnail width
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Movies</h1>
      {Object.entries(categories).map(([category, categoryMovies]) => (
        categoryMovies.length > 0 && (
          <div key={category} style={categoryStyle}>
            <h2 style={categoryTitleStyle}>{category}</h2>
            <div style={scrollContainerStyle}>
              <button
                style={{...arrowStyle, left: 0}}
                onClick={() => handleScroll('left', `category-${category}`)}
              >
                ←
              </button>
              <div id={`category-${category}`} style={scrollableStyle}>
                {categoryMovies.map((movie) => (
                  <div
                    key={movie.contentId}
                    style={movieCardStyle}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                    onClick={() => handleMovieClick(movie.contentId)}
                  >
                    <img
                      src={movie.thumbnail}
                      alt={movie.title}
                      style={thumbnailStyle}
                    />
                    <div style={movieTitleStyle}>{movie.title}</div>
                  </div>
                ))}
              </div>
              <button
                style={{...arrowStyle, right: 0}}
                onClick={() => handleScroll('right', `category-${category}`)}
              >
                →
              </button>
            </div>
          </div>
        )
      ))}
    </div>
  );
};

// Styles
const containerStyle = {
  width: '100%',
  padding: '10px',
  backgroundColor: '#000',
  color: '#fff',
};

const categoryStyle = {
  marginBottom: '2rem',
};

const categoryTitleStyle = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  marginBottom: '1rem',
  color: '#e5e5e5',
};

const scrollContainerStyle = {
  position: 'relative',
};

const scrollableStyle = {
  display: 'flex',
  overflowX: 'auto',
  gap: '10px',
  padding: '10px 40px',
  alignItems: 'center',
  scrollbarWidth: 'none',
  '-ms-overflow-style': 'none',
  '&::-webkit-scrollbar': {
    display: 'none'
  },
};

const movieCardStyle = {
  position: 'relative',
  transition: 'transform 0.3s ease',
  cursor: 'pointer',
  flexShrink: 0,
  width: '200px',
};

const thumbnailStyle = {
  width: '100%',
  aspectRatio: '16/9',
  objectFit: 'cover',
  borderRadius: '4px',
};

const movieTitleStyle = {
  marginTop: '0.5rem',
  fontSize: '0.9rem',
  textAlign: 'center',
};

const arrowStyle = {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  background: 'rgba(0, 0, 0, 0.5)',
  color: '#fff',
  border: 'none',
  borderRadius: '50%',
  width: '40px',
  height: '40px',
  fontSize: '20px',
  cursor: 'pointer',
  zIndex: 1,
};


export default MoviesPage;

