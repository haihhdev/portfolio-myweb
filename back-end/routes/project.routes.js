import express from "express";
import {
  getProjects,
  createProject,
  deleteProject,
  getProjectById,
} from "../controllers/project.controller.js";

const router = express.Router();

router.get("/", getProjects);
router.get("/:id", getProjectById);
router.post("/", createProject);
router.delete("/:id", deleteProject); // xóa project

export default router;
