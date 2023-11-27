import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './products.interface';
import { ProductDto } from './products.dto';




@Controller('products')
export class ProductsController {
constructor(private readonly productsService: ProductsService) {


  
}
/*
@Get()
@HttpCode(203)                        
getProducts( @Query('personalTrainer')personalTrainer:string, @Query('title') title:string ): Promise<Products[]>{
  if (!personalTrainer && !title) return this.productsService.getProducts();
  if(!personalTrainer)return this.productsService.getProductsByTitle(title);
 
  if(!title) return this.productsService.getProductsByPersonalTrainer(personalTrainer)
}
*/
@Get('/:id')
  async getProductById(@Param('id', new ParseIntPipe({
    errorHttpStatusCode:HttpStatus.NOT_ACCEPTABLE,
  })) id: number): Promise<Product>{
return  this.productsService.getProductById(id);
}



  @Post()
  createProduct(@Body() productDto:ProductDto): Promise<any> {
console.log(productDto);
    return this.productsService.createProducto(productDto);
  }



  @Delete('/:id')
  deleteProductById(@Param('id') id: number): Promise<void> {
    return this.productsService.deleteProductById(id);
  }

@Put('/:id')
@HttpCode (203)
updateProduct(@Param('id') id: number, @Body() body:ProductDto): Promise<void>{
 return this.productsService.updateProductById(id, body)
}
}

