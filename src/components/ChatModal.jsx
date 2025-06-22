import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyAfvwnHkWc5ElQs2IgQ-tdgyQnhL0Cceio");

function ChatModal({ pokemon, onClose }) {
  const [userInput, setUserInput] = useState("");
  const [respuesta, setRespuesta] = useState("");
  const [cargando, setCargando] = useState(false);

  const enviarPregunta = async () => {
    setCargando(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const prompt = `
Eres un experto en Pokémon. Ayuda al usuario respondiendo basándote en los siguientes datos.

📌 Nombre: ${pokemon.name}

📌 Habilidades:
${pokemon.abilities.map((a) => "- " + a.ability.name).join("\n")}

📌 Movimientos (solo primeros 10):
${pokemon.moves.slice(0, 10).map((m) => "- " + m.move.name).join("\n")}

📌 Estadísticas:
${pokemon.stats.map((s) => `- ${s.stat.name}: ${s.base_stat}`).join("\n")}

❓ Pregunta del usuario:
${userInput}
`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      setRespuesta(response.text());
    } catch (error) {
      console.error(error);
      setRespuesta("❌ Hubo un error al consultar a Gemini.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow max-w-lg w-full relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-xl">
          &times;
        </button>

        <h2 className="text-xl font-bold mb-4">Conversar sobre {pokemon.name}</h2>

        <input
          type="text"
          placeholder="Haz tu pregunta..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className="w-full border p-2 rounded mb-2"
        />

        <button
          onClick={enviarPregunta}
          disabled={cargando}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {cargando ? "Consultando..." : "Preguntar"}
        </button>

        {respuesta && (
          <div className="mt-4 p-2 border rounded bg-gray-100 whitespace-pre-wrap text-left">
            {respuesta}
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatModal;
