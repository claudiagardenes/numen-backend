import { body } from "express-validator";


export const validateCat=[
    body("raza").notEmpty().withMessage("la raza es obligatoria").isString().withMessage("la raza debe tener un formato de cadena de texto"),
    body("tamaño").notEmpty().withMessage("el tamaño del gato es obligatorio").isString().withMessage("el tamaño debe ser en formato cadena de texto, debe indicar si es chico, mediano o grande"),
    body("peso").notEmpty().withMessage("el peso del gato debe ser obligatorio").isFloat({min:1}).withMessage("debe tener un minimo de 1 kg ").isInt().withMessage("ingrese un numero entero"),
    body("caracter").notEmpty().withMessage("el caracter es obligatorio").isString().withMessage("el caracter debe tener formato de cadena de texto"),
    body("clima").notEmpty().withMessage("el clima es obligatorio").isString().withMessage("el clima debe  tener un formato de cadena de texto"),
    // body("email").notEmpty().withMessage("el mail es obligatorio").isString().withMessage("debe tener formato de texto e incluir caracteres como @").custom(async(email)=>{
    //     const existingUser= await User.findOne({email}
    //     );
    //     if(existingUser){
    //         throw new Error('este email ya esta en uso')
    //     }
        
    // })
 
]