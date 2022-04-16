import express from "express";
import upload from "./uploadRoutes.js";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";
import {
  getItemTypes,
  searchItems,
  askItem,
} from "../controllers/itemController.js";

router.get("/itemTypes", getItemTypes);
router.post("/askItem", protect, askItem);
router.post("/searchItems", searchItems);

export default router;
