import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
const baseUrl ="http://localhost:3030/contacto"
import { Contact } from './contactos.interface';
import { ContactDto } from './contactos.dto';



@Injectable()
export class ContactsService {
async getContacts(): Promise <Contact[]> {
const res = await fetch(baseUrl);
if(!res.ok) throw new NotFoundException();
const parsed= res.json();
return parsed
    }


async getContactById(id:number): Promise<Contact>{
  const res = await fetch(baseUrl + id);
    const parsed = await res.json();
    //contacto existe: lo retornamos al controller
    if (Object.keys(parsed).length) return parsed;
    throw new NotFoundException(`El contacto con el id ${id} no existe`);
}   

async getContactsByCorreo(correo: string): Promise<any>{
const  allContactsByCorreo = await this.getContacts();
const filterByCorreo = allContactsByCorreo.filter((crreo: Contact) => crreo.correo.toLocaleLowerCase().includes(correo.toLocaleLowerCase()));
if(!filterByCorreo.length) throw new NotFoundException(`No se encontro el correo: ${correo}`) 
return filterByCorreo;
}
/*
async getRutinasByPersonalTrainer(personalTrainer: string): Promise<any>{
  const  allRutinasByPersonalTrainer = await this.getRutinas();
  const filterByPersonalTrainer = allRutinasByPersonalTrainer.filter((pTrainer: Rutina) => pTrainer.personalTrainer.toLocaleLowerCase().includes(personalTrainer.toLocaleLowerCase()));
  if(!filterByPersonalTrainer.length) throw new NotFoundException(`No se encontro al personalTrainer: ${personalTrainer}`)
  return filterByPersonalTrainer
  }
*/

async createContact(contact: ContactDto) {
    const id = await this.setId();
    const newContact = {...contact, id};
    //console.log(newContact);
    const res = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
 body: JSON.stringify(newContact),
    });
    const parsed = res.json();
    return parsed;
  }

private async setId(): Promise<number>{
const contacts = await this.getContacts();
const id=contacts.pop().id + 1;
return id;
}

async updateContactById(id: number, body:ContactDto){
  const isContact= await this.getContactById(id);
if(!Object.keys(isContact).length) return
const updateContact = {
  name: body.name,
  correo: body.correo,
  message: body.message,
};
const res= await fetch(baseUrl + id,{
method: 'PUT',
headers: {
  'content-type': 'application/json'
},
body: JSON.stringify(updateContact),

})
const parsed= res.json();
return parsed;

}
async deleteContactById(id: number) {
    const res = await fetch(baseUrl + id, {
      method: 'DELETE',
    });
    const parsed = await res.json();
    return parsed;
  }
}