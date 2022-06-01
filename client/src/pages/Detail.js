import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import "./style.css";
import Cart from '../components/Cart';
import { useStoreContext } from '../utils/GlobalState';
import {
    UPDATE_CART_QUANTITY,
    ADD_TO_CART,
    UPDATE_PRODUCTS,
  } from '../utils/actions';
import { QUERY_PRODUCTS } from '../utils/queries';
import { idbPromise } from '../utils/helpers';
import spinner from '../assets/spinner.gif';

    function Detail() {
        const [state, dispatch] = useStoreContext();
        const { id } = useParams();

        const [currentProduct, setCurrentProduct] = useState({});

        const { loading, data } = useQuery(QUERY_PRODUCTS);

        const { products, cart } = state;

        useEffect(() => {
          // already in global store
          if (products.length) {
            setCurrentProduct(products.find((product) => product._id === id));
          }
          // retrieved from server
          else if (data) {
            dispatch({
              type: UPDATE_PRODUCTS,
              products: data.products,
            });

            data.products.forEach((product) => {
              idbPromise('products', 'put', product);
            });
          }
          // get cache from idb
          else if (!loading) {
            idbPromise('products', 'get').then((indexedProducts) => {
              dispatch({
                type: UPDATE_PRODUCTS,
                products: indexedProducts,
              });
            });
          }
        }, [products, data, loading, dispatch, id]);

        const addToCart = () => {
          const itemInCart = cart.find((cartItem) => cartItem._id === id);
          if (itemInCart) {
            dispatch({
              type: UPDATE_CART_QUANTITY,
              _id: id,
              purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
            });
            idbPromise('cart', 'put', {
              ...itemInCart,
              purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
            });
          } else {
            dispatch({
              type: ADD_TO_CART,
              product: { ...currentProduct, purchaseQuantity: 1 },
            });
            idbPromise('cart', 'put', { ...currentProduct, purchaseQuantity: 1 });
          }
        };

  return (
    <>
      {currentProduct && cart ? (
        <section className='product'>
        <div className="product__photo">
            <div className="photo-container">
                <div className="photo-main">
                    <img src={`/images/${currentProduct.image}`} alt={currentProduct.name}/>
                </div>
            </div>
        </div>
        <div className="product__info">
            <div className="title">
                <h1>{currentProduct.name}</h1>
            </div>
            <div className="price"><span>${currentProduct.price}</span></div>
            <div className="description">
                <h3>Description</h3>
                <span>{currentProduct.description}</span>
            </div>
            <div className='stock'>
                <h3>Stock</h3>
                <span>#</span>
            </div>
            <section className='bottomSection'>
                <button onClick={addToCart} className="buy--btn">ADD TO CART</button>
                <form>
                    <div className="value-button" id="decrease"
                        onClick={() => {
                            var value = parseInt(document.getElementById('number').value, 10);
                            value = isNaN(value) ? 0 : value;
                            if (value < 1 ? value = 1 : '');
                            value--;
                            document.getElementById('number').value = value;
                        }}
                        value="Decrease Value">-</div>
                    <input type="number" id="number" value="0" />
                    <div className="value-button" id="increase" onClick={() => {
                            var value = parseInt(document.getElementById('number').value, 10);
                            value = isNaN(value) ? 0 : value;
                            value++;
                            document.getElementById('number').value = value;
                        }} value="Increase Value">+</div>
                </form>
            </section>
        </div>
      </section>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Cart />

    </>
  );
}

export default Detail;
