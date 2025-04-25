import {Router} from "express";
import { getAllItems, getItemById, addUser, updateUser, deleteUser } from "../controllers/user.controller";

import { handleValidation } from "../middlewares/handleValidation";
import { validateUser } from "../middlewares/valideteUser";



const router= Router();//hago una instancia de ruteado

router.get("/", getAllItems);
router.get("/:id", getItemById);
router.post("/", validateUser,handleValidation, addUser);
router.put("/:id", validateUser, handleValidation, updateUser);
router.delete("/:id", deleteUser);

export default router;