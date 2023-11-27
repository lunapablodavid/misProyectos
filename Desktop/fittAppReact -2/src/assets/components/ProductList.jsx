import React from "react";
import Product from "./Product";
import './styles/ProductList.css'
import './styles/Media.css'

const ProductList=({products, addCart, removeProductFromCart})=>{

return(
    
  <> <div className='productlist-container'>
  <div className="tituloContainer"> 
        <h2>Lista de productos</h2>
  </div>
 
      <section>
      {products.map((prod)=> <Product key={prod.id} product={prod}  addCart={addCart} removeProductFromCart={removeProductFromCart} />)} 
      </section>
  </div>


   </>  
);
}
export default ProductList;
