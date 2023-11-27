import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
const baseUrl =" http://localhost:3030/users/"
import { User } from './users.interface';
import { UserDto } from './users.dto';



@Injectable()
export class UsersService {
async getUsers(): Promise <User[]> {
const res = await fetch(baseUrl);
if(!res.ok) throw new NotFoundException();
const parsed= res.json();
return parsed
    }



    async getUserById(id:number): Promise<User>{
      const res = await fetch(baseUrl + id);
        const parsed = await res.json();
        //USer existe: lo retornamos al controller
        if (Object.keys(parsed).length) return parsed;
        throw new NotFoundException(`El producto con el id ${id} no existe`);
    } 

async createUser(user: UserDto) {
    const id = await this.setId();
    const newUser = {...user, id};
    //console.log(newUser);
    const res = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
 body: JSON.stringify(newUser),
    });
    const parsed = res.json();
    return parsed;
  }

private async setId(): Promise<number>{
const users = await this.getUsers();
const id=users.pop().id + 1;
return id;
}

async updateUserById(id: number, body:UserDto){
  const isUser= await this.getUserById(id);
if(!Object.keys(isUser).length) return
const updateUser = {
  name: body.name,
  apellido: body.apellido,
  correo: body.correo,
  contraseña: body.contraseña,

};
const res= await fetch(baseUrl + id,{
method: 'PUT',
headers: {
  'content-type': 'application/json'
},
body: JSON.stringify(updateUser)

})
const parsed= res.json();
return parsed;

}
async deleteUserById(id: number) {
    const res = await fetch(baseUrl + id, {
      method: 'DELETE',
    });
    const parsed = await res.json();
    return parsed;
  }
}