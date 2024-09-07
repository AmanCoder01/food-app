import express from "express"
import upload from "../middlewares/multer";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { createRestaurant, getRestaurant, getRestaurantOrder, getSingleRestaurant, searchRestaurant, updateOrderStatus, updateRestaurant } from "../controllers/restaurant.controller";

const router = express.Router();

router.post("/", isAuthenticated, upload.single("imageFile"), createRestaurant); //Create Restaurant
router.get("/", isAuthenticated, getRestaurant);
router.put("/", isAuthenticated, upload.single("imageFile"), updateRestaurant);
router.get("/order", isAuthenticated, getRestaurantOrder);
router.put("/order/:orderId/status", isAuthenticated, updateOrderStatus);
router.get("/search/:searchText", isAuthenticated, searchRestaurant);
router.get("/:id", isAuthenticated, getSingleRestaurant);

export default router;


