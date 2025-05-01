import express, {Express, Request, Response} from "express";
import catRouter from "./routes/cats.routes";

import { connectDB } from "./utils/database";
import { logger } from "./middlewares/logger";


//defino servidor
const app= express();
//defino puerto
const port= 8080;

//funcion de conexion con base de datos
connectDB();

//Middlewares de la aplicacion(globales)
app.use(express.json());//habilita el parseo de archivos json
app.use(logger)
//Rutas
app.use("/cats", catRouter);

//Llamo al puerto
app.listen(port, ()=>{
    console.log("Servidor corriendo en http://localhost:"+port)
})
export default app

//Crear carpeta services para traer la API externa
//Usar API de Brevo para enviar correo de confirmacion
