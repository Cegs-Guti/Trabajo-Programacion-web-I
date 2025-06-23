import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

// Cargar variables del entorno
dotenv.config();

const app = express();
const PORT = 3001;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

app.use(cors());
app.use(express.json());

app.post("/api/gemini", async (req, res) => {
  const prompt = req.body.prompt;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.0-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const respuesta = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    res.json({ respuesta });
  } catch (error) {
    console.error("❌ Error al consultar con Gemini:", error.response?.data || error.message);
    res.status(500).json({ error: "Error al consultar con Gemini" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend corriendo en http://localhost:${PORT}`);
});
