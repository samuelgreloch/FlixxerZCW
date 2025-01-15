import PostSectionDisplay from './components/Posts/Posts';
import ThreadDiscussion from './components/Posts/PostsComponent';
import React, { useState, useEffect } from 'react';
import MainHeader from './components/MainPageHeader/MainHeader';
import NetflixMainScreen from './components/NetflixMainScreen/NetflixMainScreen';
import NetflixMovieScroll from './components/NetflixMainScreen/NetflixMovieScroll';
import MoviePage from "./Pages/MoviePage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UploadMovie from "./Pages/UploadMovie";
import 'bootstrap/dist/css/bootstrap.min.css';
import Account from "./Pages/Account";
import TVShowPage from './Pages/TVShowPage';
import TVShowDetails from './Pages/TVShowDetails';
import MoviesPage from './Pages/MoviesPage';



const AppLayout = () => {
  const layoutStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100vw', // Full viewport width
    height: '100vh', // Full viewport height
    margin: 0, // Remove any default margins
    padding: 0,
    backgroundColor: '#000', // Black background
    boxSizing: 'border-box', // Include padding and border in dimensions
    overflow: 'hidden', // Prevent content overflow
  };

//DD - set the initial movieId state as empty so that we can fetch the general tweets
const [selectedMovieId, setSelectedMovieId] = useState("");


//DD - Added the function for reverse routing from video page to parent page and then to post page
  const handleMovieSelect = (movieId) => {
    setSelectedMovieId(movieId);
  };

  const contentContainer = {
    display: 'flex',
    justifyContent: 'space-between',
    width: '98%', // Slight margin inside the parent container
    height: 'calc(100% - 60px)', // Subtract header height to avoid overflow
    marginTop: '1rem',
    gap: '1rem', // Add spacing between main sections
  };

  const netflixColumn = {
    display: 'flex',
    flexDirection: 'column',
    flex: 3, // Allocate more space to Netflix section
    gap: '1rem', // Add spacing between the two Netflix components
    overflowY: 'auto',
  };

  const postsSection = {
    flex: 1, // Allocate smaller space to Twitter section
    marginLeft: '0rem', // Adds spacing between columns
   // overflowY: 'auto', // Allow scrolling if content overflows
  };


  const movies = [
            { contentId: 1,
              title: 'Die Hard',
              genre: 'Action',
              genre: 'Drama', 
              rating: 'R',
              cast: 'Bruce Willis, Alan Rickman',
              releaseYear: '1988',
              length: '132 minutes',
              description: 'A New York City police officer tries to save his estranged wife and several others taken hostage by terrorists during a christmas party at the Nakatomi Plaza in Los Angeles',
              thumbnail: '/video-thumbnails/Die Hard.png',
              videoUrl: '/Trailers/Die Hard.mp4'
            },
            { contentId: 2,
              title: '30 Days of Night',
              genre: 'Horror',
              rating: 'R',
              cast: 'Josh Hartnett, Danny Huston',
              releaseYear: '2007',
              length: '114 minutes',
              description: 'After an Alaskan town is plunged into darkness for a month, it is attacked by a bloodthirsty gang of vampires.',
              thumbnail: '/video-thumbnails/30 Days of Night.png',
              videoUrl: '/Trailers/30 Days of Night.mp4'
            },
            { contentId: 3,
              title: 'Back to the Future',
              genre: 'Sci-fi',
              rating: 'PG',
              cast: 'Michael J. Fox, Christopher Lloyd',
              releaseYear: '1985',
              length: '116 minutes',
              description: 'Marty Mcfly, a 17-year-old high school student, is accidentally sent 30 years into the past in a time-traveling DeLorean invented by his close friend, the maverick scientist Doc Brown.',
              thumbnail: '/video-thumbnails/Back to the Future.png',
              videoUrl: '/Trailers/Back to the Future.mp4'
            },
            { contentId: 4,
              title: 'the Iron Giant', 
              genre: 'Animation',
              rating: 'PG',
              cast: 'Vin Diesel, Jennifer Aniston',
              releaseDate: '1999',
              length: '87 minutes',
              description: 'A young boy befriends a giant robot from outer space that a paranoid government agent wants to destroy.  ',
              thumbnail: '/video-thumbnails/the Iron Giant.png',
              videoUrl: '/Trailers/the Iron Giant.mp4'
            },
            { contentId: 5,
              title: 'Interstellar',
              genre: 'Sci-fi',
              rating: 'PG-13',
              cast: 'Mathew McConaughey, Anne Hathaway',
              releaseYear: '2014',
              length: '169 minutes',
              description: 'When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.',
              thumbnail: '/video-thumbnails/Interstellar.png',
              videoUrl: '/Trailers/Interstellar.mp4' 
            },
            { contentId: 6,
              title: 'Toy Story',
              genre: 'Animation',
              rating: 'G',
              cast: 'Tom Hanks, Tim Allen',
              releaseYear: '1995',
              length: '81 minutes',
              description: 'A cowboy doll is profoundly threatened and jealous when a new spaceman action figure supplants him as the top toy in a boy’s bedroom.',
              thumbnail: '/video-thumbnails/Toy Story.png',
              videoUrl: '/Trailers/Toy Story.mp4'
            },
            { contentId: 7,
              title: 'Toy Story 2',
              genre: 'Animation',
              rating: 'G',
              cast: 'Tom Hanks, Tim Allen',
              releaseYear: '1999',
              length: '92 minutes',
              description: 'When Woody is stolen by a toy collector, Buzz and his friends set out on a rescue mission to save Woody before he becomes a museum toy property with his roundup gang Jessie, Prospector, and Bullseye.',
              thumbnail: '/video-thumbnails/Toy Story 2.png',
              videoUrl: '/Trailers/Toy Story 2.mp4'
            },
                  ];


const tvShows = [
  { 
    contentId: 1,
    title: 'Breaking Bad', 
    genre: 'Drama', 
    rating: 'TV-MA',
    cast: 'Bryan Cranston, Aaron Paul',
    releaseYear: '2008',
    seasons: '5',
    thumbnail: '/video-thumbnails/Breaking Bad.png',
    videoUrl: '/Trailers/Breaking Bad.mp4',
    description: 'A high school chemistry teacher turned methamphetamine manufacturer partners with a former student to secure his family\'s financial future as he battles terminal lung cancer.'
  },
  { 
    contentId: 2,
    title: 'YellowStone', 
    genre: 'Drama', 
    rating: 'TV-MA',
    cast: 'Kevin Costner, Luke Grimes',
    releaseYear: '2018',
    seasons: '5',
    thumbnail: '/video-thumbnails/YellowStone.png', 
    videoUrl: '/Trailers/YellowStone.mp4',
    description: 'A ranching family in Montana faces off against others encroaching on their land. '
  },
  { 
    contentId: 3,
    title: 'The Office', 
    genre: 'Comedy', 
    rating: 'TV-14',
    cast: 'Steve Carell, Rainn Wilson',
    releaseYear: '2005',
    seasons: '9',
    thumbnail: '/video-thumbnails/The Office.png',
    videoUrl: '/Trailers/The Office.mp4',
    description: 'A mockumentary on a group of typical office workers, where the workday consists of ego clashes, inappropriate behavior, and tedium.'
  },
  { 
    contentId: 4,
    title: 'The Sopranos', 
    genre: 'Drama', 
    rating: 'TV-MA',
    cast: 'James Gandolfini, Lorraine Bracco',
    releaseYear: '1999',
    seasons: '6',
    thumbnail: '/video-thumbnails/The Sopranos.png',
    videoUrl: '/Trailers/The Sopranos.mp4',
    description: 'New Jersey mob boss Tony Soprano deals with personal and professional issues in his home and business life that affect his mental state, leading him to seek professional psychiatric counseling. '
  },
  { 
    contentId: 5,
    title: 'Friends', 
    genre: 'Comedy', 
    rating: 'TV-14',
    cast: 'Jennifer Anistion, Courteney Cox',
    releaseYear: '2008',
    seasons: '10',
    thumbnail: '/video-thumbnails/Friends.png', 
    videoUrl: '/Trailers/Friends.mp4',
    description: 'Follows the personal and professional lives of six twenty to thirty year-old friends living in the Manhattan borough of New York City'
  },
  { 
    contentId: 6,
    title: 'Law and Order', 
    genre: 'Drama', 
    rating: 'TV-14',
    cast: 'Sam Waterston, Jerry Orbach',
    releaseYear: '1990',
    seasons: '24',
    thumbnail: '/video-thumbnails/Law and Order.png',
    videoUrl: '/Trailers/',
    description: 'Two part drama which focuses on the New York criminal justice system showing a violent crime investigated by the police detectives and then the trial of the accused in court by the prosecutors. '
  },
  { 
    contentId: 7,
    title: 'Band of Brothers', 
    genre: 'Drama', 
    rating: 'TV-MA',
    cast: 'Scott Grimes, Damian Lewis',
    releaseYear: '2001',
    seasons: '1',
    thumbnail: '/video-thumbnails/Band of Brothers.png',
    videoUrl: '/Trailers/',
    description: 'The story of Easy Company of the U.S Army 101st Airborne Division and their mission in World War 2 Europe, from Operation Overlord to V-J Day.'
  },
  { 
    contentId: 8,
    title: 'Chernobyl', 
    genre: 'Drama', 
    rating: 'TV-MA',
    cast: 'Jessie Buckley, Jared Harris',
    releaseYear: '2019',
    seasons: '1',
    thumbnail: '/video-thumbnails/Chernobyl.png', 
    videoUrl: '/Trailers/Chernobyl.mp4',
    description: 'In April 1986, the city of Chernobyl in the Soviet Union suffers one of the worst nuclear disasters in the history of mankind. Consequently, many heroes put their lives on the line in the following days, weeks and months.'
  },
 
];

  return (
    <Router>
    <div style={layoutStyle}>
      <MainHeader onMovieSelect={handleMovieSelect}/>
        <div style={contentContainer}>
          {/* Netflix Column */}
          <div style={netflixColumn}>
            <Routes>
              {/* Netflix Main Screen */}
              <Route path="/" element={<NetflixMainScreen onMovieSelect={handleMovieSelect}/>} />
              {/* Movie Page */}
              <Route path="/movie/:id" element={<MoviePage movies={movies} />} />
              <Route path="/upload-movie" element={<UploadMovie />} />
              <Route path="/my-profile" element={<Account />} />
              <Route path="/tvshows" element={<TVShowPage tvShows={tvShows} />} />
              <Route path="/tvshow/:id" element={<TVShowDetails tvShows={tvShows} />} />
              <Route path="/movies" element={<MoviesPage movies={movies} />} />
          </Routes>
        </div>
        <div style={postsSection}>
          <PostSectionDisplay movieId={selectedMovieId} />
        </div>
      </div>
    </div>
  </Router>
);
};

export default AppLayout;