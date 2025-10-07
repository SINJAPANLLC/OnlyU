import express from "express";
import { getUsers, banUser, unbanUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUsers);
router.put("/:id/ban", banUser);
router.put("/:id/unban", unbanUser);

export default router;
