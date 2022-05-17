import express from "express";
import upload from "./uploadRoutes.js";
const router = express.Router();
import {
  registerUser,
  logInUser,
  loadUserInfo,
  userLogOut,
  updateUser,
  deleteUserImage,
  deleteUser,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/registerUser").post(registerUser);
router.post("/logIn", logInUser);
router
  .route("/userInfo")
  .get(protect, loadUserInfo)
  .put(protect, upload.single("userImage"), updateUser)
  .delete(protect, deleteUser);
router.get("/logout", protect, userLogOut);
router.delete("/userImage", protect, deleteUserImage);

export default router;
