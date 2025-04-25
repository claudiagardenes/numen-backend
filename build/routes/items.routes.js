"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const item_controller_1 = require("../controllers/item.controller");
const router = (0, express_1.Router)(); //hago una instancia de ruteado
router.get("/", item_controller_1.getAllItems);
router.get("/:id", item_controller_1.getItemById);
router.post("/adduser", item_controller_1.addUser);
router.put("/updateuser", item_controller_1.updateUser);
router.delete("/deleteuser", item_controller_1.deleteUser);
exports.default = router;
