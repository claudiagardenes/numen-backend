import {Request, Response} from "express"; 
import { Cat } from "../models/Cats";
import axios from 'axios';




export const getAllCats=async(req:Request, res:Response)=>{
    try{
        const cats=await Cat.find();
        res.status(200).json({cats, statusCode:200, msj:'ok'})
    }catch(error){
        if(error instanceof Error){
        res.status(500).json({statusCode:500, msj:'error al solicitar gatos -'+ error.message})}else{
            res.status(400).json({statusCode:400, msj:'error al solicitar gatos -'})
        }
    }  
}

export const getCatById=async(req:Request, res:Response)=>{
    try{
        const cat= await Cat.findById(req.params.id);
    if(cat){
    res.status(200).json(cat)
    }else{
        res.status(404).json({message: "no se encontro el gato solicitado con el id:"+ req.params.id});
    }
    }catch(error){
        if(error instanceof Error){
            res.status(500).json({statusCode:500, msj:'error al obtener gato -'+ error.message})}else{
                res.status(400).json({statusCode:400, msj:'error al obtener gato -'})
            } 
    }
}

export const addCat=async(req: Request, res:Response)=>{
    try{
        const {raza, tamaño, peso, caracter, clima}= req.body;
        const newCat= await Cat.create({raza, tamaño, peso, caracter, clima});
        res.status(201).json({newCat, statusCode:201, msj:'Nuevo Gato agregado'});
        // const sendConfirmationEmail = async (email: string, name: string) => {
        //     const apiKey = 'process.env.API_KEY'
        //     const apiUrl = 'https://api.brevo.com/v3/smtp/email';
        //     const emailData = {
        //       sender: { name: 'Claudia', email: 'claudiaagds47@gmail.com' },
        //       to: [{ email, name }],
        //       subject: 'Confirmación de Registro',
        //       htmlContent: `<html><body><h1>Hola ${name},</h1><p>Gracias por registrarte. Por favor, confirma tu registro haciendo clic en el siguiente enlace:</p><a href="https://tu_dominio.com/confirmar?email=${email}">Confirmar Registro</a></body></html>`
        //     };
        //     try {
        //       const response = await axios.post(apiUrl, emailData, {
        //         headers: {
        //           'Content-Type': 'application/json',
        //           'api-key': apiKey
        //         }
        //       });
        //       console.log('Correo enviado:', response.data);
        //     } catch (error) {
        //       console.error('Error al enviar el correo:', error);
        //     }
        //   };          
        //    sendConfirmationEmail(newCat.email, newCat.nombre);
        
    }catch(error){
        if(error instanceof Error){
            res.status(500).json({statusCode:500, msj:'error al agregar gato -'+ error.message})}else{
                res.status(400).json({statusCode:400, msj:'error al agregar gato -'})
            } 
    }
}

export const updateCat=async(req: Request, res: Response)=>{
    try{
        const{raza, tamaño, peso, caracter, clima}= req.body;
        const gatoActualizado=await Cat.findByIdAndUpdate(req.params.id, {raza, tamaño, peso, caracter, clima});
        res.status(200).json({gatoActualizado, statusCode:200, msj:'las caracteristicas del gato fueron actualizadas'})
    }catch(error){
        if(error instanceof Error){
            res.status(500).json({statusCode:500, msj:'error al editar gato -'+ error.message})}else{
                res.status(400).json({statusCode:400, msj:'error al editar gato -'})
            } 
    }
}

export const deleteCat=async(req:Request, res: Response)=>{
    try{
        await Cat.findByIdAndDelete(req.params.id);
        res.status(200).json({statusCode:200, msj:'gato eliminado exitosamente'})
    }catch(error){
        if(error instanceof Error){
            res.status(500).json({statusCode:500, msj:'error al eliminar gato -'+ error.message})}else{
                res.status(400).json({statusCode:400, msj:'error al eliminar gato -'})
            } 
    }
}