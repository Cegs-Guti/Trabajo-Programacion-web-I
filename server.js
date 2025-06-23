import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { consultarConGemini } from "./GeminiService.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/gemini", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt requerido" });
  }

  const respuesta = await consultarConGemini(prompt);
  res.json({ respuesta });
});

app.listen(3001, () => {
  console.log("Servidor corriendo en http://localhost:3001/api/gemini");
});
