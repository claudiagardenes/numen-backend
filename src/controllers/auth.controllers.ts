import {Request, Response} from 'express';
import { User } from '../models/User';
import axios from 'axios';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req:Request, res: Response)=>{
    try{
        const {username, email, password}= req.body;
        const usuarioNuevo = new User({username, email, password});
        await usuarioNuevo.save(); //operacion de guardado en base de datos
        res.status(201).json({statusCode:201, msj:"usuario registrado exitosamente"})
         const sendConfirmationEmail = async (email: string, usarname: string) => {
                     const apiKey = 'process.env.API_KEY || ""'
                     const apiUrl = 'https://api.brevo.com/v3/smtp/email';
                     const emailData = {
                       sender: { name: 'Claudia', email: 'claudiaagds47@gmail.com' },
                       to: [{ email, username }],
                       subject: 'Confirmación de Registro',
                       htmlContent: `<html><body><h1>Hola ${username},</h1><p>Gracias por registrarte. Por favor, confirma tu registro haciendo clic en el siguiente enlace:</p><a href="https://tu_dominio.com/confirmar?email=${email}">Confirmar Registro</a></body></html>`
                    };
                     try {
                       const response = await axios.post(apiUrl, emailData, {
                         headers: {
                           'Content-Type': 'application/json',
                           'api-key': apiKey
                         }
                       });
                       console.log('Correo enviado:', response.data);
                     } catch (error) {
                       console.error('Error al enviar el correo:', error);
                     }
                   };          
                    sendConfirmationEmail(usuarioNuevo.email, usuarioNuevo.username);
        
    }catch(error){
        res.status(500).json({statusCode: 500, msj:"error al resgistrar usuario"})
        console.log(error)
    }
}

export const login = async(req:Request, res:Response)=>{
    try{
        const {username, password}= req.body;
        const usuario= await User.findOne({username})
        if(!usuario){
        res.status(400).json({statusCode:404, msj:"usuario no encontrado"})
        return;
      }

        const passwordValido= await bcrypt.compare(password, usuario.password)
        if(!passwordValido){
          res.status(401).json({statusCode: 401, msj: "password incorrecto"});
          return;
        }
        const token= jwt.sign({id: usuario._id, email: usuario.email, role: usuario.role || "user"},
        process.env.JWT_SECRET || "secreto",
        {expiresIn:"30d"} )
        res.json({msj: "usuario logueado exitosamente ", token})
    }catch(error){
        res.status(500).json({statusCode:500, msj: "error al iniciar la sesion"})
    }
}