import { useEffect, useState } from "react";
import PokemonCard from "./components/PokemonCard";
import "./App.css";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [types, setTypes] = useState([]);

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

  // Obtener tipos disponibles una vez
  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/type");
        const data = await res.json();
        setTypes(data.results.map((type) => type.name));
      } catch (error) {
        console.error("Error al obtener los tipos:", error);
      }
    };

    fetchTypes();
  }, []);

  // Aplicar filtro por nombre y por tipo
  const filteredPokemons = pokemons.filter((pokemon) => {
    const matchesName = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType =
      !selectedType || pokemon.types.some((t) => t.type.name === selectedType);
    return matchesName && matchesType;
  });

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Pokedex</h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar Pokémon"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full sm:w-1/2"
        />

        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="border p-2 rounded w-full sm:w-1/2"
        >
          <option value="">Selector de Tipos</option>
          {types.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {searchTerm && filteredPokemons.length === 0 && (
        <p className="text-center text-red-500">No se encontró ningún Pokémon</p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filteredPokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            id={pokemon.id}
            name={pokemon.name}
            image={pokemon.sprites.front_default}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
