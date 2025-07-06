import express from "express";
import {
  getAbout,
  updateAbout,
  createAbout,
  deleteAbout,
} from "../controllers/about.controller.js";

const router = express.Router();

router.get("/", getAbout);
router.put("/", updateAbout);
router.post("/", createAbout);
router.delete("/:id", deleteAbout);

export default router;
