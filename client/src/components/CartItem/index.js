import React from 'react';
import { useStoreContext } from "../../utils/GlobalState";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import './style.css';

const CartItem = ({ item }) => {

  const [, dispatch] = useStoreContext();

  const removeFromCart = item => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id
    });
    idbPromise('cart', 'delete', { ...item });

  };

  const onChange = (e) => {
    const value = e.target.value;
    if (value === '0') {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: item._id
      });
      idbPromise('cart', 'delete', { ...item });

    } else {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: item._id,
        purchaseQuantity: parseInt(value)
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(value) });

    }
  }

  return (
    <article className="CartItem flex-row">
        <section className='ImageContainer'>
            <img src={`/images/${item.image}`} alt={`${item.image}`}/>
        </section>
      <section className='InfoContainer'>
            <h2>{item.name}</h2>
            <p>${item.price}</p>
            <aside>
                <p>Qty:</p>
                <input
                    type="number"
                    placeholder="1"
                    value={item.purchaseQuantity}
                    onChange={onChange}
                />
            </aside>
            <div
                className='trash'
                role="img"
                aria-label="trash"
                onClick={() => removeFromCart(item)}
            >
            🗑️
            </div>
        </section>
    </article>
  );
}

export default CartItem;