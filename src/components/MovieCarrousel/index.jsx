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
                    params: {
                        apikey: omdbApiKey,
                        s: searchTerm.trim(), // Aquí puedes poner tu término de búsqueda
                        type: 'movie',
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
        <div className='flex flex-col items-center bg-neutral-500 rounded-lg m-8'>
            <div className='flex items-center'>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    placeholder="Buscar películas por título"
                    className="m-4 p-2 border border-gray-300 rounded-md max-w-48 max-h-8"
                />
                <div className="flex items-center">
                    <button
                        onClick={goToPreviousPage}
                        disabled={currentPage === 1}
                        className="m-2 hover:scale-105 transition-transform duration-200 px-4 py-2 hover:bg-teal-200 bg-teal-400 rounded-md"
                    >
                        Página Anterior
                    </button>
                    <h2 className='text-white bg-slate-700 flex items-center rounded px-2 h-8 underline underline-offset-2'>Pagina: {currentPage}</h2>
                    <button
                        onClick={goToNextPage}
                        className="hover:scale-105 duration-200 transition-transform hover:bg-teal-200 m-2 px-4 py-2 bg-teal-400 rounded-md"
                    >
                        Siguiente Página
                    </button>
                </div>
            </div>
            <div className="flex flex-wrap justify-center">
                {movies.map(movie => (
                    <a href={`https://www.google.com/search?q=${movie.Title}+movie`} key={movie.imdbID} className="m-4 w-64
                        hover:scale-105 transition-transform duration-300 rounded flex flex-col items-center bg-slate-400">
                        
                        <div className='bg-gray-800 w-full'>
                            {movie.Poster === "N/A" ? (
                                // Si la respuesta de la API es "N/A", muestra la imagen por defecto
                                <img src="./assets/cinema-default.svg" alt="Imagen por defecto" />
                            ) : (
                                // Si la respuesta de la API no es "N/A", muestra la imagen recibida
                                <img src={movie.Poster} alt={`${movie.Title} Poster`} />
                            )}
                        </div>
                        <h2 className="p-2 flex items-center text-black text-xl font-mono text-center bg-white rounded-b">{movie.Title}</h2>
                    </a>
                ))}
            </div>

        </div>
    );
};

export default Carousel;
