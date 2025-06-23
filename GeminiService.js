import axios from "axios";

export async function consultarConGemini(prompt) {
  const apiKey = process.env.GEMINI_API_KEY;

  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",
      {
        contents: [{ parts: [{ text: prompt }] }]
      },
      {
        params: { key: apiKey },
        headers: { "Content-Type": "application/json" }
      }
    );

    const mensaje = response.data.candidates[0]?.content?.parts[0]?.text || "No hubo respuesta";
    return mensaje;

  } catch (error) {
    console.error("Error consultando a Gemini:", error.message);
    return "Ocurrió un error al conectar con Gemini";
  }
}
