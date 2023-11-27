import { IsString } from "class-validator";

export class ContactDto{
    @IsString()
    name: string;
    @IsString()
    correo: string;
    @IsString()
    message: string;
   
}