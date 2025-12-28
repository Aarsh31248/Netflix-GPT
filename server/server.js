import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/movies", async (req, res) => {
  try {
    const { query } = req.body;

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            {
              role: "user",
              content: `Give exactly 5 movie names for "${query}". Only movie names, comma separated.`,
            },
          ],
        }),
      }
    );

    const data = await response.json();

    const moviesText = data.choices[0].message.content;

    res.json({
      movies: moviesText,
    });
  } catch (err) {
    console.error("🔥 SERVER CRASH:", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});
