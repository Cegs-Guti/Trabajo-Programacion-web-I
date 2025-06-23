import axios from "axios";
export const getPokemonList = async (limit = 20, offset = 0) => {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}';
    const response = await axios.get(url);
    return response.data.results;
}; 
export const getPokemonDetails = async (url) => {
    const response = await axios.get(url);
    return response.data;
} 