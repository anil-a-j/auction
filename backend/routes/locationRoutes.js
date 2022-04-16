import express from "express";
const router = express.Router();
import { countries, states } from "../controllers/locationController.js";

router.get("/countries", countries);
router.get("/states/:id", states);

export default router;
