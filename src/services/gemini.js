// services/gemini.js

const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function obtenerRespuestaDeGemini(pokemon) {
  const prompt = `
Simula un experto en Pokémon y responde preguntas sobre el siguiente Pokémon:

📌 Nombre: ${pokemon.name}
📌 Habilidades:
${pokemon.abilities.map(a => `- ${a.ability.name}`).join('\n')}

📌 Movimientos:
${pokemon.moves.slice(0, 10).map(m => `- ${m.move.name}`).join('\n')}

📌 Estadísticas:
${pokemon.stats.map(s => `- ${s.stat.name}: ${s.base_stat}`).join('\n')}

El usuario te hará preguntas sobre este Pokémon. Responde de forma clara, precisa y español.
  `;

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

module.exports = { obtenerRespuestaDeGemini };
