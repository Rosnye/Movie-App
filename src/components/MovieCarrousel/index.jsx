import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';

const MovieCarousel = () => {
    const [movies, setMovies] = useState([]);
    const omdbApiKey = import.meta.env.VITE_REACT_APP_OMDB_API_KEY; // Cambio aquí

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get('https://www.omdbapi.com/', { // Cambio aquí
                    params: {
                        apikey: omdbApiKey,
                        s: 'movie',
                        type: 'movie',
                        r: 'json'
                    }
                });

                const filteredMovies = response.data.Search.filter(movie => parseFloat(movie.imdbRating) >= 8);
                setMovies(filteredMovies.slice(0, 20));
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchMovies();
    }, []);

    return (
        <div className="flex min-h-32 min-w-32 bg-slate-200 rounded overflow-x-scroll snap-x snap-mandatory">
            {movies.map((movie, index) => (
                <div key={index} className="snap-center shrink-0 first:pl-4 last:pr-4">
                    <img src={movie.Poster} alt={movie.Title} className="w-full h-auto" />
                    <h3 className="text-center text-black text-lg">Titulo: {movie.Title}</h3>
                </div>
            ))}
        </div>
    );
};

export default MovieCarousel;
