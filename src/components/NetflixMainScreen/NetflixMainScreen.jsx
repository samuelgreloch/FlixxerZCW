import React, { useState, useEffect } from 'react';
import EmblaCarousel from './EmblaCarousel.tsx';
import { EmblaOptionsType } from 'embla-carousel'
import './embla.css';
import NetflixMovieScroll from './NetflixMovieScroll.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MoviePage from '../../Pages/MoviePage';


const OPTIONS: EmblaOptionsType = { dragFree: true, loop: true }
const SLIDE_COUNT = 5
const SLIDES = [
    'carousel-photos/diehardcaro.png',
    'carousel-photos/toystorycaro.png',
    'carousel-photos/interstellarcaro.png',
];


//maybe use id: instead of contentId:
const DEFAULT_MOVIES = [
  {
    contentId: 1,
    title: 'Die Hard',
    duration: '132 minutes',
    rating: 'R',
    description: 'A New York City police officer tries to save his estranged wife and several others taken hostage by terrorists during a christmas party at the Nakatomi Plaza in Los Angeles.',
    releaseDate: '1988-07-12',
    genre: ['Action'],
  },
  {
    contentId: 2,
    title: '30 Days of Night',
    duration: '114 minutes',
    rating: 'R',
    description: 'After an Alaskan town is plunged into darkness for a month, it is attacked by a bloodthirsty gang of vampires. ',
    releaseDate: '2007-10-19',
    genre: ['Horror'],
  },
  {
    contentId: 3,
    title: 'Toy Story',
    duration: '81 minutes',
    rating: 'G',
    description: 'A cowboy doll is profoundly threatened and jealous when a new spaceman action figure supplants him as the top toy in a boy’s bedroom.',
    releaseDate: '1995-11-19',
    genre: ['Animation'],
  },
  {
    contentId: 4,
    title: 'Toy Story 2',
    duration: '92 minutes',
    rating: 'G',
    description: 'When Woody is stolen by a toy collector, Buzz and his friends set out on a rescue mission to save Woody before he becomes a museum toy property with his roundup gang Jessie, Prospector, and Bullseye.',
    releaseDate: '1999-11-13',
    genre: ['Animation'],
  },
  {
    contentId: 5,
    title: 'Back to the Future',
    duration: '116 minutes',
    rating: 'PG',
    description: 'Marty Mcfly, a 17-year-old high school student, is accidentally sent 30 years into the past in a time-traveling DeLorean invented by his close friend, the maverick scientist Doc Brown.',
    releaseDate: '1985-07-03',
    genre: ['Sci-fi'],
  },
];


const NetflixMainScreen = ({onMovieSelect}) => {

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/videos')
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
        setMovies(DEFAULT_MOVIES);
        setLoading(false);
      });
  }, []); // Fixed the missing dependency array

  // Categorize movies by genre
  const comedyMovies = movies.filter(movie => movie.genres && movie.genres.some(genre => genre.title === 'Comedy'));
  const dramaMovies = movies.filter(movie => movie.genres && movie.genres.some(genre => genre.title === 'Drama'));
  const sciFiMovies = movies.filter(movie => movie.genres && movie.genres.some(genre => genre.title === 'Sci-Fi'));
  const animationMovies = movies.filter(movie => movie.genres && movie.genres.some(genre => genre.title === 'Animation'));
  const actionMovies = movies.filter(movie => movie.genres && movie.genres.some(genre => genre.title === 'Action'));

  const sortedMovies = [...movies].sort((a, b) => b.id - a.id);
    const maxMoviesToShow = 10;
    const moviesToShow = sortedMovies.slice(0, maxMoviesToShow);


    return (
        <div style={componentNetflixScreenStyle}>
            <EmblaCarousel slides={SLIDES} options={OPTIONS} />
            <NetflixMovieScroll title="Recently Added" movies={moviesToShow} loading={loading} onMovieSelect={onMovieSelect} />
            <NetflixMovieScroll title="Action Movies" movies={actionMovies} loading={loading} onMovieSelect={onMovieSelect} />
            <NetflixMovieScroll title="Comedy Movies" movies={comedyMovies} loading={loading} onMovieSelect={onMovieSelect}/>
            <NetflixMovieScroll title="Drama Movies" movies={dramaMovies} loading={loading} onMovieSelect={onMovieSelect}/>
            <NetflixMovieScroll title="Sci-Fi Movies" movies={sciFiMovies} loading={loading} onMovieSelect={onMovieSelect}/>
            <NetflixMovieScroll title="Animated Movies" movies={animationMovies} loading={loading} onMovieSelect={onMovieSelect} />
        </div>
    );

};

const componentNetflixScreenStyle = {
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

export default NetflixMainScreen;