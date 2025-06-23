const API_KEY = "TU_API_KEY_DE_GEMINI"; // Reemplázalo por tu API real

export async function generarRespuestaGemini(prompt) {
  const endpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

  const response = await fetch(`${endpoint}?key=${API_KEY}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    })
  });

  const data = await response.json();
  const texto = data.candidates?.[0]?.content?.parts?.[0]?.text;
  return texto || "No se pudo obtener una respuesta del modelo.";
}
