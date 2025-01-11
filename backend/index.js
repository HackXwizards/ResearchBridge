import express from "express";
import bodyParser from "body-parser";
import researchRoutes from "./routes/researcherRoute.js";
import cors from 'cors';
import authRoutes from "./routes/authRoutes.js";

const app = express();
const PORT = 5000;

// CORS configuration should come before routes
app.use(cors({
  origin: 'http://localhost:5173', // Remove trailing slash
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
}));

app.use(bodyParser.json());
app.use("/api/auth", authRoutes);
app.use("/api/research", researchRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
  