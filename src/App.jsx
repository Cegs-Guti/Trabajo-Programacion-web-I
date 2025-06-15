import { useEffect, useState } from "react";
import PokemonCard from "./components/PokemonCard";
import "./App.css";
function App() {
  const [pokemons, setPokemons] = useState([]);

  
  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
        const data = await response.json();

        const detailedPokemons = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            return await res.json();
          })
        );

        setPokemons(detailedPokemons);
      } catch (error) {
        console.error("Error al obtener los pokemones:", error);
      }
    };

    fetchPokemons(); 
  }, []);
  
  return (
  <div className="p-4">
    <h1 className="text-3xl font-bold text-center mb-6">Pokémon Chat</h1>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {pokemons.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          name={pokemon.name}
          image={pokemon.sprites.front_default}
        />
      ))}
    </div>
  </div>
);
}

export default App;

