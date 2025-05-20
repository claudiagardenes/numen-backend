import {Router} from "express";
import { getAllCats, getCatById, addCat, updateCat, deleteCat } from "../controllers/cat.controller";

import { handleValidation } from "../middlewares/handleValidation";
import { validateCat } from "../middlewares/validateCat";
import { verifyToken } from "../middlewares/authMiddlewares";



const router= Router();//hago una instancia de ruteado

router.get("/", verifyToken, getAllCats);
router.get("/:id", getCatById);
router.post("/", validateCat,handleValidation, addCat);
router.put("/:id", validateCat, handleValidation, updateCat);
router.delete("/:id", deleteCat);

export default router;