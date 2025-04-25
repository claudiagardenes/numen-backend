"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.addUser = exports.getItemById = exports.getAllItems = void 0;
const db_json_1 = __importDefault(require("../../data/db.json"));
const getAllItems = (req, res) => {
    res.status(200).json(db_json_1.default.items);
};
exports.getAllItems = getAllItems;
const getItemById = (req, res) => {
    const id = Number(req.params.id);
    const item = db_json_1.default.items.find(item => item.id == id);
    if (item) {
        res.status(200).json(item);
    }
    else {
        res.status(404).json({ message: "no se encontro el item solicitado" + id });
    }
};
exports.getItemById = getItemById;
const addUser = (req, res) => { };
exports.addUser = addUser;
const updateUser = (req, res) => { };
exports.updateUser = updateUser;
const deleteUser = (req, res) => { };
exports.deleteUser = deleteUser;
