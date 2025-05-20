import {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken'

export const verifyToken = (
    req: Request, res:Response, next: NextFunction)=>{
        const token = req.header ("Authorization")?.replace("Bearer ", ""); //el texto bearer es para decir que viene por el token
        if (!token){
            res.status(401).json ({statusCode: 401, error: "token no enviado"})
            return;
        }
        try{
            const decoded= jwt.verify(token,process.env.JWT_SECRET ||"secreto") ;
          //  req.user = decoded;
            next();
        }catch(error){
            res.status(401).json({statusCode:401, error: "token invalido"})
        }
    }
