import React, { useState, useEffect } from "react";

function PokemonCard({ name, image, id, types, onLikeChange, onTalk, pokemonData }) {
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
    <div className="border p-4 rounded-xl shadow hover:shadow-lg transition text-center relative">
      {/* Botón de Me gusta */}
      <button
        onClick={toggleLike}
        className="absolute top-2 right-2"
        title="Me gusta"
      >
        <img
          src={liked ? "/pokeball-filled.png" : "/pokeball-outline.png"}
          alt="like"
          className="w-6 h-6"
        />
      </button>

      {/* Botón de "Hablemos" */}
      <button
        onClick={() => onTalk(pokemonData)}
        className="absolute top-2 left-2 text-white bg-blue-500 px-2 py-1 rounded text-sm hover:bg-blue-600"
      >
        Hazme una pregunta
      </button>

      {/* Imagen y nombre */}
      <img src={image} alt={name} className="w-24 h-24 mx-auto" />
      <h3 className="mt-2 font-bold capitalize">{name}</h3>

      {/* Tipos */}
      <div className="mt-2 flex flex-wrap justify-center gap-1">
        {types.map((t) => (
          <span
            key={t.type.name}
            className="text-xs px-2 py-1 bg-gray-200 rounded-full capitalize"
          >
            {t.type.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default PokemonCard;
