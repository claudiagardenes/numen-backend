//Funcion para validar las peticiones (middleware)

import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const handleValidation= (req:Request, res:Response, next:NextFunction)=>{
    const errors= validationResult(req);//arra de errores
    if(!errors.isEmpty()){
        res.status(400).json({errors:errors.array(), statusCode:400, msj:'error de validacion'})
        return;
    }
    next();
}