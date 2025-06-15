function PokemonCard({name,image}){
    return (
        <div className="border p-4 rounded-xl shadow hover:shadow-lg transition text-center">
            <img src={image} alt={name} className="w-24 h-24 mx-auto" />
            <h3 className="mt-2 font-bold capitalize">{name}</h3>
        </div>
    );
}
export default PokemonCard;