import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_OPTIONS = {
  headers: {
    Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
    "Content-Type": "application/json",
  },
};

// ✅ Health check
app.get("/", (req, res) => {
  res.send("🚀 Netflix GPT Backend is running");
});

// ✅ Groq GPT route
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

    res.json({ movies: moviesText });
  } catch (err) {
    console.error("🔥 GROQ ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ TMDB routes
app.get("/tmdb/now-playing", async (req, res) => {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/now_playing?language=en-US`,
      TMDB_OPTIONS
    );
    res.json(await response.json());
  } catch (err) {
    console.error("TMDB ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/tmdb/popular", async (req, res) => {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/popular?language=en-US`,
      TMDB_OPTIONS
    );
    res.json(await response.json());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/tmdb/top-rated", async (req, res) => {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/top_rated?language=en-US`,
      TMDB_OPTIONS
    );
    res.json(await response.json());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/tmdb/upcoming", async (req, res) => {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/upcoming?language=en-US`,
      TMDB_OPTIONS
    );
    res.json(await response.json());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/tmdb/:movieId/trailer", async (req, res) => {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/${req.params.movieId}/videos?language=en-US`,
      TMDB_OPTIONS
    );
    res.json(await response.json());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/tmdb/search", async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }

    const response = await fetch(
      `${TMDB_BASE_URL}/search/movie?query=${encodeURIComponent(
        query
      )}&include_adult=false&language=en-US&page=1`,
      TMDB_OPTIONS
    );

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("TMDB SEARCH ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
