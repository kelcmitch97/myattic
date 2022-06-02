import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

function ProductItem(item) {

    const [state, dispatch] = useStoreContext();

  const {
    image,
    name,
    _id,
    user,
    price,
  } = item;

  const { cart } = state

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id)
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 }
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    }
  }

  return (
    <>
        <article className = "itemContainer">
            <section className = "card">
                <div className = "image">
                    <img alt={name} src ={`/images/${image}`}/>
                </div>
                <section className = "content">
                    <h3>{name}</h3>
                    <p>${price}</p>
                    <Link to={`/products/${_id}`}>
                        <button>Details</button>
                    </Link>
                    <button onClick={addToCart}>Add to cart</button>
                </section>
            </section>
        </article>
    </>
  );
}

export default ProductItem;
