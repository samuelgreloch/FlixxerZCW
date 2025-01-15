import React from 'react';
import { useNavigate } from 'react-router-dom';


const TVShowPage = ({ tvShows = [] }) => {
  const navigate = useNavigate();

  const categories = {
    Drama: tvShows.filter((show) => show.genre.includes('Drama')),
    Comedy: tvShows.filter((show) => show.genre.includes('Comedy')),
    'Sci-Fi': tvShows.filter((show) => show.genre.includes('Sci-Fi')),
    Fantasy: tvShows.filter((show) => show.genre.includes('Fantasy')),
    Action: tvShows.filter((show) => show.genre.includes('Action')),
    Historical: tvShows.filter((show) => show.genre.includes('Historical')),
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
    <div style={componentTVShowScreenStyle}>
      <h1 style={mainTitleStyle}>TV Shows</h1>
      {Object.entries(categories).map(([category, shows]) => (
        shows.length > 0 && (
          <div key={category} style={categoryContainerStyle}>
            <h2 style={titleStyle}>{category}</h2>
            <div style={scrollContainerStyle}>
              <button
                style={{...arrowStyle, left: 0}}
                onClick={() => handleScroll('left', `category-${category}`)}
              >
                ←
              </button>
              <div id={`category-${category}`} style={scrollableStyle}>
                {shows.map((show) => (
                  <img
                    key={show.contentId}
                    src={show.thumbnail}
                    alt={show.title}
                    style={thumbnailStyle}
                    onClick={() => navigate(`/tvshow/${show.contentId}`)}
                  />
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
const componentTVShowScreenStyle = {
  flex: '3',
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  padding: '0rem',
  border: '0px solid #ccc',
  borderRadius: '2px',
  backgroundColor: '#000',
  overflowY: 'scroll',
  scrollbarWidth: 'none',
};

const mainTitleStyle = {
  color: '#fff',
  fontSize: '2.5rem',
  marginBottom: '2rem',
  padding: '0 10px',
};

const categoryContainerStyle = {
  marginBottom: '20px',
};

const titleStyle = {
  color: '#fff',
  fontSize: '1.5rem',
  marginBottom: '10px',
  paddingLeft: '10px',
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

const containerStyle = {
  width: '100%',
  padding: '10px',
  backgroundColor: '#000',
};

export default TVShowPage;