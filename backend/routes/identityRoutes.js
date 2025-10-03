import express from "express";
import { getIdentities, updateIdentityStatus } from "../controllers/identityController.js";

const router = express.Router();

router.get("/", getIdentities);
router.put("/:id/status", updateIdentityStatus);

export default router;
