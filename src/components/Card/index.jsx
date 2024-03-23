import { useEffect,useState } from "react";
import React from "react";


const Card = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
            .then((response) => response.json())
            .then((json) => {
                // Mapea y realiza una solicitud para cada Pokémon para obtener su tipo y descripción
                const promises = json.results.map((pokemon) => {
                    return fetch(pokemon.url)
                        .then((response) => response.json())
                        .then((details) => {
                            // Obtiene la URL del recurso de la especie para la descripción
                            return fetch(details.species.url)
                                .then((response) => response.json())
                                .then((speciesDetails) => {
                                    // Encuentra la descripción en español
                                    const description = speciesDetails.flavor_text_entries.find((entry) => entry.language.name === 'es').flavor_text;
                                    return { ...pokemon, type: details.types.map((t) => t.type.name).join(', '), description };
                                });
                        });
                });
                Promise.all(promises).then((results) => setData(results));
            });
    }, []);

    // Función para capitalizar la primera letra de una cadena
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return (
        <div className="bg-slate-500 rounded justify-evenlyeve flex flex-col">
            <h1 className="text-xl p-4 text-white">Pokemon</h1>
            <div>
                <ul className="text-white flex flex-wrap">
                    {data.map((poke, index) => (
                        <li className="m-4 max-w-48 rounded p-4 bg-lime-600 hover:scale-105 transition-transform duration-40" key={poke.name}>
                            <h2 className="p-1 rounded bg-slate-200 text-black">{capitalizeFirstLetter(poke.name)}</h2>
                            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`} />
                            <h2 className="bg-gray-200 rounded p-1 text-black">{capitalizeFirstLetter(poke.type)}</h2>
                            <p className="pt-2">{poke.description}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};




export default Card;