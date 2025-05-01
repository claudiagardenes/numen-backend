import mongoose, {Schema} from "mongoose";

export interface ICat{
    raza: string;
    tamaño:string;
    peso: number;
    caracter: string;
    clima: string;
    alta: boolean;
    proveedor?:String;
}

const catSchema= new Schema<ICat>(
    {
        raza: {type: String, required: true, unique:true},
        tamaño: {type: String, required:true},
        peso: {type: Number, required: true},
        caracter: {type: String, required: true},
        clima:{type:String, required:true},
        alta: {type: Boolean, default: true},
        proveedor: {type: String}

    },
    {timestamps: true}//me indica fecha y hora de ultima actualizacion de la prenda
)

export const Cat = mongoose.model("Cat", catSchema);