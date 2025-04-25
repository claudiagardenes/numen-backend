import { body } from "express-validator";
import { User } from "../models/User";

export const validateUser=[
    body("apellido").notEmpty().withMessage("el apellido es obligatorio").isString().withMessage("el apellido debe tener un formato de cadena de texto"),
    body("nombre").notEmpty().withMessage("el nombre del usuario es obligatorio").isString().withMessage("el nombre debe ser en formato cadena de texto"),
    body("edad").notEmpty().withMessage("la edad del usuario es obligatoria").isFloat({min:18}).withMessage("para registrarse debe ser mayor de edad ").isInt().withMessage("ingrese un numero entero"),
    body("email").notEmpty().withMessage("el mail es obligatorio").isString().withMessage("debe tener formato de texto e incluir caracteres como @").custom(async(email)=>{
        const existingUser= await User.findOne({email}
        );
        if(existingUser){
            throw new Error('este email ya esta en uso')
        }
        
    })
 
]