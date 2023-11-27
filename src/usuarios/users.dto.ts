import { IsString, IsNumber, IsEmail } from "class-validator";

export class UserDto{
    @IsString()
    name: string;
    @IsString()
    apellido: string;
    @IsEmail()
    correo:string;
    @IsNumber()
    contraseña:string;

}