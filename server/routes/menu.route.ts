import express from "express"
import upload from "../middlewares/multer";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { addMenu, editMenu } from "../controllers/menu.controller";

const router = express.Router();

router.post("/", isAuthenticated, upload.single("image"), addMenu);
router.put("/:id", isAuthenticated, upload.single("image"), editMenu);

export default router;


