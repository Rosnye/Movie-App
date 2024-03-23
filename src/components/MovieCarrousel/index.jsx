import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Carousel = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(2);
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
        <div className='flex flex-col items-center bg-neutral-500 rounded-lg mx-8'>
            <div className='flex flex-row'>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    placeholder="Buscar películas por título"
                    className="m-4 p-2 border border-gray-300 rounded-md max-w-48 max-h-8"
                />
                <div className="mt-4">
                    <button
                        onClick={goToPreviousPage}
                        disabled={currentPage === 1}
                        className="m-2 px-4 py-2 bg-gray-200 rounded-md"
                    >
                        Página Anterior
                    </button>
                    <button
                        onClick={goToNextPage}
                        className="hover:scale-105 m-2 px-4 py-2 bg-gray-200 rounded-md"
                    >
                        Siguiente Página
                    </button>
                </div>
            </div>
            <div className="flex flex-wrap justify-center">
                {movies.map(movie => (
                    <a href={`https://www.google.com/search?q=${movie.Title}`} key={movie.imdbID} className="m-4 hover:scale-105 transition-transform duration-300 rounded bg-slate-400">
                        <img src={movie.Poster} alt={movie.Title} className="h-auto" />
                        <h2 className="mt-2 text-white text-center">{movie.Title}</h2>
                    </a>
                ))}
            </div>

        </div>
    );
};

export default Carousel;
