import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Carousel = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('brooklyn');
    const [currentPage, setCurrentPage] = useState(1);
    const omdbApiKey = import.meta.env.VITE_REACT_APP_OMDB_API_KEY;

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get('https://www.omdbapi.com/?', {
                    params: {   // Aqui se agregan los parametros para hacer la peticion a la api
                        apikey: omdbApiKey, // Api key
                        s: searchTerm.trim(),   // Aqui se indica el titulo de la api
                        type: 'movie',  // Tipo de valor
                        page: currentPage,
                    },
                    
                });
                if (response.data.Search) {
                    setMovies(response.data.Search); // Extraer la lista de películas y asignarla a movies
                } else {
                    console.log('No se encontraron películas con el término de búsqueda especificado');
                }
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };
        
        fetchMovies();
    }, [searchTerm,currentPage]);

    const handleInputChange = event => {
        setSearchTerm(event.target.value);
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    return (
        <div className='flex flex-col items-center bg-neutral-500 bg-opacity-30 rounded-lg m-8'>
            <div className='flex flex-col md:flex-row items-center'>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    placeholder="Buscar películas por título"
                    className="m-4 p-2 bg-Red text-White font-semibold rounded-md max-w-48 max-h-8"
                />
                <div className="flex items-center">
                    <button
                        onClick={goToPreviousPage}
                        disabled={currentPage === 1}
                        className="hover:scale-105 duration-200 transition-transform m-2 px-4 py-2 bg-Purple text-White font-semibold rounded-md"
                    >
                        Anterior
                    </button>
                    <h2 className='text-White bg-Purple flex items-center rounded px-2 h-8 underline underline-offset-2'>Pagina: {currentPage}</h2>
                    <button
                        onClick={goToNextPage}
                        className="hover:scale-105 duration-200 transition-transform m-2 px-4 py-2 bg-Purple text-White font-semibold rounded-md"
                    >
                        Siguiente
                    </button>
                </div>
            </div>
            <div className="flex flex-wrap justify-center w-full 2xl:w-4/6">
                {movies.map(movie => (
                    <a href={`https://www.google.com/search?q=${movie.Title}+movie`} key={movie.imdbID} className="rounded-md m-4 w-64
                        hover:scale-105 transition-transform duration-300 flex flex-col items-center bg-gradient-to-t from-Red to-Gold to-30%">
                        
                        <div className='flex items-center w-64 h-5/6 top-0 static rounded-lg'>
                            {movie.Poster === "N/A" ? (
                                // Si la respuesta de la API es "N/A", muestra la imagen por defecto
                                <div className='flex flex-col items-center font-semibold'>
                                    <img src="./assets/cinema-default.svg" alt="Imagen por defecto" />
                                    <h3>*Poster no disponible*</h3>
                                </div>
                            ) : (
                                // Si la respuesta de la API no es "N/A", muestra la imagen recibida
                                <img src={movie.Poster} alt={`${movie.Title} Poster`} className='rounded-t'/>
                            )}
                        </div>
                        <h2 className="pt-2 flex justify-center h-1/6 items-center text-black text-xl font-semibold text-center w-full">{movie.Title}</h2>
                    </a>
                ))}
            </div>

        </div>
    );
};

export default Carousel;
