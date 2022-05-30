import React from "react";
import { Link } from "react-router-dom";
import './style.css';

function ProductItem(item) {

  const {
    image,
    name,
    _id,
    price,
  } = item;


//   const addToCart = () => {
//     const itemInCart = cart.find((cartItem) => cartItem._id === _id)
//     if (itemInCart) {
//       dispatch({
//         type: UPDATE_CART_QUANTITY,
//         _id: _id,
//         purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
//       });
//       idbPromise('cart', 'put', {
//         ...itemInCart,
//         purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
//       });
//     } else {
//       dispatch({
//         type: ADD_TO_CART,
//         product: { ...item, purchaseQuantity: 1 }
//       });
//       idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
//     }
//   }

  return (
      <>
    <article className= "container">
        <div className = "card">
            <div className = "image">
                <img src={`/images/${image}`} alt={name}/>
            </div>
            <div className = "content">
                <h3>{name}</h3>
                <p>${price}</p>
                <Link to={`/products/${_id}`}>
                    <button id="first-click">Details</button>
                </Link>
            </div>
        </div>
    </article>
    <script src="modal.js"></script>
</>
  );
}

export default ProductItem;
