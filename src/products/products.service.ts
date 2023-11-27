
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
const baseUrl =" http://localhost:3030/products/"
import { Product } from './products.interface';
import { ProductDto } from './products.dto';



@Injectable()
export class ProductsService {
async getProducts(): Promise <Product[]> {
const res = await fetch(baseUrl);
if(!res.ok) throw new NotFoundException();
const parsed= res.json();
return parsed
    }


async getProductById(id:number): Promise<Product>{
  const res = await fetch(baseUrl + id);
    const parsed = await res.json();
    //producto existe: lo retornamos al controller
    if (Object.keys(parsed).length) return parsed;
    throw new NotFoundException(`El producto con el id ${id} no existe`);
}   

async getProductsByTitle(title: string): Promise<any>{
const  allProductsByTitle = await this.getProducts();
const filterByTitle = allProductsByTitle.filter((ttle: Product) => ttle.title.toLocaleLowerCase().includes(title.toLocaleLowerCase()));
if(!filterByTitle.length) throw new NotFoundException(`No se encontro el producto: ${title}`) 
return filterByTitle;
}
/*
async getRutinasByPersonalTrainer(personalTrainer: string): Promise<any>{
  const  allRutinasByPersonalTrainer = await this.getRutinas();
  const filterByPersonalTrainer = allRutinasByPersonalTrainer.filter((pTrainer: Rutina) => pTrainer.personalTrainer.toLocaleLowerCase().includes(personalTrainer.toLocaleLowerCase()));
  if(!filterByPersonalTrainer.length) throw new NotFoundException(`No se encontro al personalTrainer: ${personalTrainer}`)
  return filterByPersonalTrainer
  }
*/

async createProducto(product: ProductDto) {
    const id = await this.setId();
    const newProduct = {...product, id};
    //console.log(newTrack);
    const res = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
 body: JSON.stringify(newProduct),
    });
    const parsed = res.json();
    return parsed;
  }

private async setId(): Promise<number>{
const products = await this.getProducts();
const id=products.pop().id + 1;
return id;
}

async updateProductById(id: number, body:ProductDto){
  const isProduct= await this.getProductById(id);
if(!Object.keys(isProduct).length) return
const updateProduct = {
  title: body.title,
  description: body.description,
  price: body.price,
  image:body.image,
};
const res= await fetch(baseUrl + id,{
method: 'PUT',
headers: {
  'content-type': 'application/json'
},
body: JSON.stringify(updateProduct)

})
const parsed= res.json();
return parsed;

}
async deleteProductById(id: number) {
    const res = await fetch(baseUrl + id, {
      method: 'DELETE',
    });
    const parsed = await res.json();
    return parsed;
  }
}