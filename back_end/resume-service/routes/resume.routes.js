import express from "express";
import {
  getResume,
  updateResume,
  createResume,
  deleteResume,
  exportResume,
} from "../controllers/resume.controller.js";

const router = express.Router();

router.get("/", getResume);
router.get("/export", exportResume);
router.put("/", updateResume);
router.post("/", createResume);
router.delete("/:id", deleteResume);

export default router;
