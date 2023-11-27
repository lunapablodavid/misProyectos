import { useEffect, useState } from 'react';
import ProductList from './assets/components/ProductList';
import  Contacto  from './assets/components/Contacto';
import React from 'react';
import Cart from './assets/components/Cart';
import Login from './assets/components/Login';
import SignUp from './assets/components/SignUp';
import Home from './assets/components/Home';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './assets/components/styles/Nav.css'; 
import LoadProduct from './assets/components/LoadPRoduct';




function App() {
const [baseUrl, setBaseUrl]=useState('http://localhost:3030/')
const [products, setProducts]= useState([])
const [error, setError]= useState("")
const [cart, setCart]=useState([])


const addCart=(product)=>{
setCart((prev)=>[...prev, product])
console.log(cart.length, product.id + product.title)
}



const removeProductFromCart = (productId) => {
  const updatedCart = cart.filter((product) => product.id !== productId);
  setCart(updatedCart);
  console.log("Se ha eliminado un producto del carrito");
};

 
  

 


 const getDerivedCart = () => {
  const derivedCart = [];

  cart.forEach((item) => {
    const existingItem = derivedCart.find((dItem) => dItem.id === item.id);

    if (existingItem) {
      // Si el producto ya existe en el carrito, acumula la cantidad
      existingItem.quantity += 1;
      existingItem.totalPrice += Number(item.price);
    } else {
      // Si el producto no existe en el carrito, agrégalo con cantidad inicial 1
      derivedCart.push({
        id: item.id,
        name: item.title,
        quantity: 1,
        totalPrice: Number(item.price),
      });
    }
  });

  return derivedCart;
};


 /*Peticion fetch */
 useEffect(()=>{
  fetch(baseUrl + 'products')
  .then(res=>{
    if(!res.ok) throw new Error(`${res.status}.${res.statusText}`);
    setError("");
    return res.json();
  })
  .then(data =>setProducts(data))
  .catch(error=>setError(error.toString()));
  },[]);
  
if(!products.length && !error)return <h2>Loading...</h2>
if(error) return (
<h2>{error}</h2>
);  

return (

    <>

<BrowserRouter>
     <nav>
        <Link to="/">Home</Link>
        
        <Link to="/ProductList">Productos</Link>

        <Link to="/Contacto">Contacto</Link>
        
        <Link to="/Cart">Carro</Link>

        <Link to="/Login">Sesion</Link>
  
        <Link to="/LoadProduct">Menu</Link>
     </nav>

     
     <Routes>
         <Route path="/" element={<Home />}/>

         <Route path="/ProductList" element={<ProductList products={products} addCart={addCart} removeProductFromCart={removeProductFromCart} />}/>

         <Route path="/Contacto" element={<Contacto />}/>

         <Route path="/Cart" element={<Cart cart={getDerivedCart()} removeProductFromCart={removeProductFromCart}  />} />

         <Route path="/Login" element={<Login/>}/> 
         
         <Route path="/signup" element={<SignUp/>} />
     
         <Route path="/LoadProduct" element={<LoadProduct/>}/> 
     </Routes>

</BrowserRouter>




 
    </>
  
  )

}
export default App
