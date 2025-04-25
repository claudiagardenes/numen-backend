import {Request, Response} from "express"; 
import { User } from "../models/User";
import axios from 'axios';




export const getAllItems=async(req:Request, res:Response)=>{
    try{
        const users=await User.find();
        res.status(200).json({users, statusCode:200, msj:'ok'})
    }catch(error){
        if(error instanceof Error){
        res.status(500).json({statusCode:500, msj:'error al solicitar usuarios -'+ error.message})}else{
            res.status(400).json({statusCode:400, msj:'error al solicitar usuarios -'})
        }
    }  
}

export const getItemById=async(req:Request, res:Response)=>{
    try{
        const user= await User.findById(req.params.id);
    if(user){
    res.status(200).json(user)
    }else{
        res.status(404).json({message: "no se encontro el usuario solicitado con el id:"+ req.params.id});
    }
    }catch(error){
        if(error instanceof Error){
            res.status(500).json({statusCode:500, msj:'error al obtener usuario -'+ error.message})}else{
                res.status(400).json({statusCode:400, msj:'error al obtener usuario -'})
            } 
    }
}

export const addUser=async(req: Request, res:Response)=>{
    try{
        const {apellido, nombre, edad, email}= req.body;
        const newUser= await User.create({apellido, nombre, edad, email});
        res.status(201).json({newUser, statusCode:201, msj:'Nuevo Usuario creado'});
        const sendConfirmationEmail = async (email: string, name: string) => {
            const apiKey = 'process.env.API_KEY'
            const apiUrl = 'https://api.brevo.com/v3/smtp/email';
            const emailData = {
              sender: { name: 'Claudia', email: 'claudiaagds47@gmail.com' },
              to: [{ email, name }],
              subject: 'Confirmación de Registro',
              htmlContent: `<html><body><h1>Hola ${name},</h1><p>Gracias por registrarte. Por favor, confirma tu registro haciendo clic en el siguiente enlace:</p><a href="https://tu_dominio.com/confirmar?email=${email}">Confirmar Registro</a></body></html>`
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
           sendConfirmationEmail(newUser.email, newUser.nombre);
        
    }catch(error){
        if(error instanceof Error){
            res.status(500).json({statusCode:500, msj:'error al crear usuario -'+ error.message})}else{
                res.status(400).json({statusCode:400, msj:'error al crear usuario -'})
            } 
    }
}

export const updateUser=async(req: Request, res: Response)=>{
    try{
        const{apellido, nombre, edad, email}= req.body;
        const usuarioActualizado=await User.findByIdAndUpdate(req.params.id, {apellido, nombre, edad, email});
        res.status(200).json({usuarioActualizado, statusCode:200, msj:'el usuario fue actualizado'})
    }catch(error){
        if(error instanceof Error){
            res.status(500).json({statusCode:500, msj:'error al editar usuario -'+ error.message})}else{
                res.status(400).json({statusCode:400, msj:'error al editar usuario -'})
            } 
    }
}

export const deleteUser=async(req:Request, res: Response)=>{
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({statusCode:200, msj:'Usuario eliminado'})
    }catch(error){
        if(error instanceof Error){
            res.status(500).json({statusCode:500, msj:'error al eliminar usuario -'+ error.message})}else{
                res.status(400).json({statusCode:400, msj:'error al eliminar usuario -'})
            } 
    }
}