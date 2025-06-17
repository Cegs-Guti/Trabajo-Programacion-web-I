import { useEffect, useState } from "react";

function PokemonCard({ name, image, id }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const likes = JSON.parse(localStorage.getItem("likedPokemons")) || {};
    setLiked(likes[id] === true); 
  }, [id]);

  const toggleLike = () => {
    const likes = JSON.parse(localStorage.getItem("likedPokemons")) || {};
    const updatedLiked = !liked;
    likes[id] = updatedLiked;
    localStorage.setItem("likedPokemons", JSON.stringify(likes));
    setLiked(updatedLiked);
  };

  return (
    <div className="border p-4 rounded-xl shadow hover:shadow-lg transition text-center relative">
      <button
        onClick={toggleLike}
        className="absolute top-2 right-2"
        style={{ border: "none", background: "transparent" }}
      >
        <img
          src={
            liked
              ? "/assets/pokeball-colored.png"
              : "/assets/pokeball-outline.png"
          }
          alt={liked ? "Liked" : "Not liked"}
          className="w-6 h-6"
        />
      </button>
      <img src={image} alt={name} className="w-24 h-24 mx-auto" />
      <h3 className="mt-2 font-bold capitalize">{name}</h3>
    </div>
  );
}

export default PokemonCard;