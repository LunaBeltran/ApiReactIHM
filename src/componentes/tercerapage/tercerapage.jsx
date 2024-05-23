import axios from 'axios';
import './tercerapage.css';
import { Navbar } from "../menu/navbar";
import { Footer } from "../footer/footer";
import { useEffect, useState } from "react";

function Tercerapage() {
    const API_URL = 'https://api.themoviedb.org/3';
    const API_KEY = '4f5f43495afcc67e9553f6c684a82f84';
    const IMAGE_PATH = 'https://image.tmdb.org/t/p/original';
    const URL_IMAGE = 'https://image.tmdb.org/t/p/original';

    // Variables de estado
    const [movies, setMovies] = useState([]);
    const [searchKey, setSearchKey] = useState("");
    const [trailer, setTrailer] = useState(null);
    const [movie, setMovie] = useState(null); // Inicialmente null
    const [playing, setPlaying] = useState(false);
    const [searched, setSearched] = useState(false); // Estado para indicar si se ha realizado una búsqueda

    // Función para realizar petición por GET a la API
    const fetchMovies = async (searchKey) => {
        const type = searchKey ? "search" : "discover";
        try {
            const { data: { results } } = await axios.get(`${API_URL}/${type}/movie`, {
                params: {
                    api_key: API_KEY,
                    query: searchKey,
                },
            });

            setMovies(results);
            setMovie(null); // Resetea la película seleccionada
            setSearched(true); // Marcamos que se ha realizado una búsqueda
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };

    // Función para la petición de un solo objeto para el reproductor de video 
    const fetchMovie = async (id) => {
        try {
            const { data } = await axios.get(`${API_URL}/movie/${id}`, {
                params: {
                    api_key: API_KEY,
                    append_to_response: "videos"
                }
            });
            setMovie(data);
        } catch (error) {
            console.error("Error fetching movie:", error);
        }
    }

    const selectMovie = async (movie) => {
        fetchMovie(movie.id);
        setMovie(movie);
        window.scrollTo(0, 0);
    }

    const searchMovies = (e) => {
        e.preventDefault();
        if (searchKey.trim() !== "") { // Verificar que el término de búsqueda no esté vacío
            fetchMovies(searchKey);
        } else {
            setMovies([]);
            setMovie(null); // Resetea la película seleccionada
            setSearched(false);
        }
    }

    useEffect(() => {
        // La búsqueda inicialmente estará vacía, por lo que no se realizará ninguna búsqueda al principio
    }, []);

    return (
        <div>
            <Navbar />
            <div className="containerrmp">
                <div className="contentmp">
                    <h1 className="tituloP">Películas</h1>
                    <p className="text-center">{searched && movies.length === 0 ? "No se encontraron películas" : ""}</p>
                    <br />
                    <form className="container mb-4" onSubmit={searchMovies}>
                        <input 
                            type="text" 
                            placeholder="Buscar películas..." 
                            value={searchKey}
                            onChange={(e) => setSearchKey(e.target.value)} 
                            className="search-input"
                        />
                        <button type="submit" className="btn btn-primary search-button">Buscar</button>
                    </form>
                    <br/>
                    {/*banner e  informacion*/}
                    <div>
                        <main>
                            {movie ? (
                                <div className="banner-container" style={{ backgroundImage: `url("${IMAGE_PATH}${movie.backdrop_path}")` }}>
                                    <div className="banner-overlay">
                                        <div className="banner-content">
                                            <h1 className="text-white">{movie.title}</h1>
                                            <p className="text-white">{movie.overview}</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                searched && (
                                    <div className="containerTextP">
                                        <h1 className="textSearch">Selecciona una película</h1>
                                    </div>
                                )
                            )}
                            <br/>
                            <br/>
                        </main>
                    </div>

                    <div className="contentprin"></div>
                    <div className="containerTextP">
                        {movies && movies.length > 0 && (
                            movies.map((movie) => (
                                <div key={movie.id} className="movie-cardPeli" onClick={() => selectMovie(movie)}>
                                    <img src={`${URL_IMAGE + movie.poster_path}`} alt={movie.title} />
                                    <h4 className='textTitulo'>{movie.title}</h4>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export { Tercerapage };
