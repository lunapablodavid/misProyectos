import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.interface';
import { UserDto } from './users.dto';


@Controller('users')
export class UserController {
constructor(private readonly usersService: UsersService) {


  
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
  async getUserById(@Param('id', new ParseIntPipe({
    errorHttpStatusCode:HttpStatus.NOT_ACCEPTABLE,
  })) id: number): Promise<User>{
return  this.usersService.getUserById(id);
}



  @Post()
  createUser(@Body() userDto:UserDto): Promise<any> {
console.log(userDto);
    return this.usersService.createUser(userDto);
  }



  @Delete('/:id')
  deleteUserById(@Param('id') id: number): Promise<void> {
    return this.usersService.deleteUserById(id);
  }

@Put('/:id')
@HttpCode (203)
updateUser(@Param('id') id: number, @Body() body:UserDto): Promise<void>{
 return this.usersService.updateUserById(id, body)
}
}



