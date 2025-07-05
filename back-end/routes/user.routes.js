import express from "express";
import {
  getUser,
  updateUser,
  createUser,
  deleteUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getUser);
router.put("/", updateUser); // cập nhật user
router.post("/", createUser); // tạo user
router.delete("/:id", deleteUser); // xóa user
export default router;
