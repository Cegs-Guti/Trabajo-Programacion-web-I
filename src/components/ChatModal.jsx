import React, { useState } from "react";

function ChatModal({ pokemon, onClose }) {
  const [pregunta, setPregunta] = useState("");
  const [respuesta, setRespuesta] = useState("");
  const [cargando, setCargando] = useState(false);

  const enviarPregunta = async () => {
    if (!pregunta) return;
    setCargando(true);
    setRespuesta("");

    try {
      const res = await fetch("http://localhost:3001/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt: `Actúa como un experto en Pokémon. Con base en la siguiente información, responde: 
Nombre: ${pokemon.name}
📌 Habilidades: ${pokemon.abilities.map(a => a.ability.name).join(", ")}
📌 Movimientos: ${pokemon.moves.slice(0, 10).map(m => m.move.name).join(", ")}
📌 Estadísticas: ${pokemon.stats.map(s => `${s.stat.name}: ${s.base_stat}`).join(", ")}.

Pregunta: ${pregunta}`
        })
      });

      const data = await res.json();
      setRespuesta(data.respuesta || "No se obtuvo una respuesta.");
    } catch (error) {
      setRespuesta("Hubo un error al conectar con Gemini.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 text-black dark:text-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-xl font-bold mb-4 capitalize">{pokemon.name}</h2>

        <textarea
          value={pregunta}
          onChange={(e) => setPregunta(e.target.value)}
          placeholder="Haz una pregunta sobre este Pokémon"
          className="w-full p-2 border rounded text-black dark:text-white dark:bg-gray-800"
        />

        <div className="mt-4 flex justify-between">
          <button
            onClick={enviarPregunta}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={cargando}
          >
            {cargando ? "Consultando..." : "Preguntar"}
          </button>
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Cerrar
          </button>
        </div>

        {respuesta && (
          <div className="mt-4 p-3 border-t text-sm whitespace-pre-line">
            {respuesta}
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatModal;
