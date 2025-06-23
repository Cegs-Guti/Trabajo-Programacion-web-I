import React, { useState, useEffect } from "react";

function PokemonCard({ name, image, id, types, onLikeChange, onTalk, pokemonData, darkMode }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const likes = JSON.parse(localStorage.getItem("likedPokemons")) || {};
    setLiked(!!likes[id]);
  }, [id]);

  const toggleLike = () => {
    const likes = JSON.parse(localStorage.getItem("likedPokemons")) || {};
    likes[id] = !likes[id];
    localStorage.setItem("likedPokemons", JSON.stringify(likes));
    setLiked(!liked);
    if (onLikeChange) onLikeChange();
  };

  return (
    <div className={`border p-4 rounded-xl shadow hover:shadow-lg transition text-center relative ${
      darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
    }`}>
      
      <button
        onClick={toggleLike}
        className="absolute top-2 right-2 text-2xl"
        title="Me gusta"
      >
        <img
          src={liked ? "/assets/pokeball-filled.png" : "/assets/pokeball-outline.png"}
          alt="like"
          className="w-6 h-6"
        />
      </button>

      
      <button
        onClick={() => onTalk(pokemonData)}
        className="absolute top-2 left-2 text-white bg-blue-500 px-2 py-1 rounded text-sm hover:bg-blue-600"
      >
        Hablemos
      </button>

      <img src={image} alt={name} className="w-24 h-24 mx-auto" />
      <h3 className="mt-2 font-bold capitalize">{name}</h3>

      <div className="mt-2 flex flex-wrap justify-center gap-1">
        {types.map((t) => (
          <span
            key={t.type.name}
            className={`text-xs px-2 py-1 rounded-full capitalize ${
              darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-800"
            }`}
          >
            {t.type.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default PokemonCard;
