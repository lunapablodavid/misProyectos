import { IsString, IsNumber } from "class-validator";

export class ProductDto{
    @IsString()
    title: string;
    @IsString()
    description: string;
    @IsNumber()
    price: number;
    @IsString()
    image: string;
   
}