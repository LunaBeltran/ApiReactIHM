import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './cuartopage.css';
import { Navbar } from '../menu/navbar';
import { Footer } from '../footer/footer';
import '@fortawesome/fontawesome-free/css/all.min.css';

const API_KEY = '4f5f43495afcc67e9553f6c684a82f84';
const URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=es-ES&page=1`;

function Cuartopage() {
  const [movies, setMovies] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(URL);
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching the movies', error);
      }
    };

    fetchData();
  }, []);

  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <div className="slick-arrow slick-next" onClick={onClick}>
        <i className="fas fa-chevron-right"></i>
      </div>
    );
  };

  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <div className="slick-arrow slick-prev" onClick={onClick}>
        <i className="fas fa-chevron-left"></i>
      </div>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const slideNext = () => {
    sliderRef.current.slickNext();
  };

  const slidePrev = () => {
    sliderRef.current.slickPrev();
  };

  return (
    <div className="CuartoPage">
      <Navbar />
      <div className="containerrmp">
            <div className="contentmp">
                <div className="Cartelera">
                    <h1 className='tituloCuartoP'>Cartelera de Estrenos</h1>
                    <Slider ref={sliderRef} {...settings}>
                    {movies.map(movie => (
                        <div key={movie.id} className="movie-cardCart">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                        />
                        <h3 className='tituloCart'>{movie.title}</h3>
                        <p className='fechaCart'>{movie.release_date}</p>
                        </div>
                    ))}
                    </Slider>
                </div>
            </div>
        </div>
      <Footer />
    </div>
  );
}

export { Cuartopage };
