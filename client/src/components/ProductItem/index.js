import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import { QUERY_ME } from '../../utils/queries';
import { useQuery, useMutation } from '@apollo/client';
import { REMOVE_PRODUCT } from '../../utils/mutations';

function ProductItem(item) {

  const [removeProduct, { error }] = useMutation(REMOVE_PRODUCT);

  var productUserData = useQuery(QUERY_ME);
  var productUsername;

  if (productUserData) {
    let pUser = productUserData.data

    if (pUser) {

      let me = pUser.me

      if (me) {

        productUserData = me._id
        productUsername = me.username

      }

    }

  }

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

  const deleteProduct = async (deleteId) => {
    try {
      await removeProduct({
        variables: { productId: deleteId },
      });

    } catch (err) {
      console.error(err);
    }

    window.location.reload();

  }

  return (
    <>
        <article className = "itemContainer">
            <section className = "card">
                <div className = "image">
                    <img alt={name} src ={`/images/${image}`}/>
                </div>
                <section className = "content">
                {(() => {
                  if (user === productUserData) {
                    return (
                      <div className="delete-button" onClick={() => deleteProduct(_id)}><ion-icon name="close-circle-outline"></ion-icon></div>
                    )
                  }
                })()}
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
