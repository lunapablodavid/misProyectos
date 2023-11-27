import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query} from '@nestjs/common';
import { ContactsService } from './contactos.service';
import { Contact } from './contactos.interface';
import { ContactDto } from './contactos.dto';




@Controller('contactos')
export class ContactsController {
constructor(private readonly contactsService: ContactsService) {


  
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
  async getContactById(@Param('id', new ParseIntPipe({
    errorHttpStatusCode:HttpStatus.NOT_ACCEPTABLE,
  })) id: number): Promise<Contact>{
return  this.contactsService.getContactById(id);
}



  @Post()
  createContact(@Body() contactDto:ContactDto): Promise<any> {
console.log(ContactDto);
    return this.contactsService.createContact(contactDto);
  }



  @Delete('/:id')
  deleteContactById(@Param('id') id: number): Promise<void> {
    return this.contactsService.deleteContactById(id);
  }

@Put('/:id')
@HttpCode (203)
updateContact(@Param('id') id: number, @Body() body:ContactDto): Promise<void>{
 return this.contactsService.updateContactById(id, body)
}
}

