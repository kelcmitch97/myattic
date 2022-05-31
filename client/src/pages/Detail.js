import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import "./style.css";
import Cart from '../components/Cart';
import { useStoreContext } from '../utils/GlobalState';
import {
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
            <div>
                <h3>Stock</h3>
                <span>#</span>
                <button className="buy--btn">ADD TO CART</button>
            </div>
        </div>
      </section>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Cart />

    </>
  );
}

export default Detail;
