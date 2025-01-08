import express from "express";
import bodyParser from "body-parser";
import researchRoutes from "./routes/researcherRoute.js";

const app = express();
const PORT = 5000;

app.use(bodyParser.json()); // Parse JSON bodies
app.use("/api/research", researchRoutes); // Use research routes

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the Neo4j Research API!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
