import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const NetflixMovieScroll = ({ title, movies, loading, onMovieSelect }) => {
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null); // Define the ref

  const handleThumbnailClick = (movieId) => {
    const selectedMovie = (movies || []).find((movie) => movie.contentId === movieId);
    navigate(`/movie/${movieId}`, { state: { movie: selectedMovie, movies } });

    if (onMovieSelect) {
      onMovieSelect(movieId); // Notify parent Page of the selected movie
    }
  };

  const getThumbnailUrl = (movieTitle) =>
    movieTitle ? `/video-thumbnails/${movieTitle}.png` : null;

  const defaultThumbnailUrl =
    'https://www.shutterstock.com/shutterstock/videos/1102576935/thumb/2.jpg?ip=x480';

  const handleScroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 220; // Adjust based on thumbnail width
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div style={containerStyle}>
      {title && <h2 style={titleStyle}>{title}</h2>}
      {loading ? (
        <p style={{ color: 'white' }}>Loading...</p>
      ) : (
        <div style={scrollContainerStyle}>
          <button
            style={{ ...arrowStyle, left: 0 }}
            onClick={() => handleScroll('left')}
          >
            ←
          </button>
          <div ref={scrollContainerRef} style={scrollableStyle}>
            {(movies || []).map((movie) => {
              const thumbnailUrl =
                getThumbnailUrl(movie?.title) || defaultThumbnailUrl;

              return (
                <img
                  key={movie?.contentId || Math.random()}
                  src={thumbnailUrl}
                  alt={movie?.title || 'Default Thumbnail'}
                  style={thumbnailStyle}
                  onClick={() => handleThumbnailClick(movie?.contentId)}
                  onError={(e) => {
                    // Set the default thumbnail if the image fails to load
                    e.target.src = defaultThumbnailUrl;
                  }}
                />
              );
            })}
          </div>
          <button
            style={{ ...arrowStyle, right: 0 }}
            onClick={() => handleScroll('right')}
          >
            →
          </button>
        </div>
      )}
    </div>
  );
};

NetflixMovieScroll.defaultProps = {
  title: 'Default Title',
  movies: [],
  loading: false,
};

const containerStyle = {
  width: '100%',
  padding: '10px',
  backgroundColor: '#000',
};

const titleStyle = {
  color: '#fff',
  fontSize: '1.5rem',
  marginBottom: '10px',
};

const scrollContainerStyle = {
  position: 'relative',
};

const scrollableStyle = {
  display: 'flex',
  overflowX: 'auto',
  gap: '10px',
  padding: '10px 0',
  alignItems: 'center',
};

const thumbnailStyle = {
  width: '220px',
  height: '121px',
  cursor: 'pointer',
  borderRadius: '5px',
  objectFit: 'cover',
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

export default NetflixMovieScroll;