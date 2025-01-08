import express from "express";
import { getResearchOverview, getResearchDetails, createResearch, searchResearch } from "../controllers/researcherController.js";
const router = express.Router();

router.get("/", getResearchOverview); // Existing: Get all research
router.get("/search", searchResearch); // New: Search and filter research
router.get("/:id", getResearchDetails); // Existing: Get research details by ID
router.post("/", createResearch); // Existing: Add new research

export default router;
