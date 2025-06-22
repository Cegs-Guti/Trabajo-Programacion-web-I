import { useEffect, useState } from "react";
import PokemonCard from "./components/PokemonCard";
import ChatModal from "./components/ChatModal";
import "./App.css";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [pokemonSeleccionado, setPokemonSeleccionado] = useState(null);

  const manejarConversacion = (pokemon) => {
    setPokemonSeleccionado(pokemon);
  };

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
        contarFavoritos();
      } catch (error) {
        console.error("Error al obtener los pokemones:", error);
      }
    };
    fetchPokemons();
  }, []);

  const contarFavoritos = () => {
    const likes = JSON.parse(localStorage.getItem("likedPokemons")) || {};
    const cantidad = Object.values(likes).filter(Boolean).length;
    setFavoriteCount(cantidad);
  };

  const filteredPokemons = pokemons.filter((pokemon) => {
    const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
    const likes = JSON.parse(localStorage.getItem("likedPokemons")) || {};
    const isLiked = !!likes[pokemon.id];
    const matchesType = selectedType
      ? pokemon.types.some((t) => t.type.name === selectedType)
      : true;
    return matchesSearch && (!showOnlyFavorites || isLiked) && matchesType;
  });

  const tiposDisponibles = [...new Set(pokemons.flatMap(p => p.types.map(t => t.type.name)))];

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        Pokedex <span className="text-red-500">(Favoritos: {favoriteCount})</span>
      </h1>

      <input
        type="text"
        placeholder="Buscar Pokémon"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />

      <div className="flex gap-4 mb-6 flex-wrap justify-center">
        <button
          onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {showOnlyFavorites ? "Ver Todos" : "Ver Favoritos"}
        </button>

        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="border px-4 py-2 rounded"
        >
          <option value="">Todos los tipos</option>
          {tiposDisponibles.map((tipo) => (
            <option key={tipo} value={tipo}>
              {tipo}
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
            types={pokemon.types}
            onLikeChange={contarFavoritos}
            onTalk={() => manejarConversacion(pokemon)}
            pokemonData={pokemon}
          />
        ))}
      </div>

      {pokemonSeleccionado && (
        <ChatModal
          pokemon={pokemonSeleccionado}
          onClose={() => setPokemonSeleccionado(null)}
        />
      )}
    </div>
  );
}

export default App;
