import mongoose, {Schema} from "mongoose";

export interface IUser{
    apellido: string;
    nombre: string;
    edad: number;
    email: string;
    alta: boolean;
    proveedor?:String;
}

const UserSchema= new Schema<IUser>(
    {
        apellido: {type: String, required: true, unique:true},
        nombre: {type: String, required:true},
        edad: {type: Number, required: true},
        email: {type: String, required: true, unique:true},
        alta: {type: Boolean, default: true},
        proveedor: {type: String}

    },
    {timestamps: true}//me indica fecha y hora de ultima actualizacion de la prenda
)

export const User = mongoose.model("User", UserSchema);