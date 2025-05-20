import {Request, Response} from "express"; 
import { Cat } from "../models/Cats";

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