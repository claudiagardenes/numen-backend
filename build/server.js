"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const items_routes_1 = __importDefault(require("./routes/items.routes"));
const database_1 = require("./utils/database");
//defino servidor
const app = (0, express_1.default)();
//defino puerto
const port = 8080;
//funcion de conexion con base de datos
(0, database_1.connectDB)();
//Middlewares de la aplicacion(globales)
app.use(express_1.default.json()); //habilita el parseo de archivos json
//Rutas
app.use("/items", items_routes_1.default);
//Llamo al puerto
app.listen(port, () => {
    console.log("Servidor corriendo en http://localhost:" + port);
});
exports.default = app;
