import {Request, Response, NextFunction} from "express";

//Funcion para mostrar a que hora se hicieron las peticiones (log)
export const logger = (req: Request, res: Response, next: NextFunction)=>{
    console.log(`[${new Date().toISOString()} | Peticion:  ${req.method}|Endpoint: ${req.url}]`);
    next();
}

//buscar middlewares que se usan en backend