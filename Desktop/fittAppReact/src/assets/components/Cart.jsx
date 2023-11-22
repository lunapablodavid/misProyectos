import React from 'react'
import './styles/Cart.css'
import './ProductList'


function Cart({ cart, removeProductFromCart }) {
  const getTotal = (cart) => {
    const totalPrice = cart.reduce((acum, curr) => {
      const productPrice = Number(curr.price);
      return isNaN(productPrice) ? acum : acum + productPrice;
    }, 0);
    return totalPrice.toFixed(2);
  };

  return cart.length ? (

    <div className="cartAdd">
      <ul>
        {cart.map((prod) => (
          <li key={prod.id}>
         {prod.name} x {prod.quantity} = $ {prod.totalPrice}
            <button onClick={() => removeProductFromCart(prod.id)}>
              Eliminar
            </button>
    
          </li>
         
        ))}    
      </ul>
    </div>
  ) : null;
}

export default Cart;


