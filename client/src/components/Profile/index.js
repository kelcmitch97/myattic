import React, { useEffect } from 'react';
import ProductItem from '../ProductItem';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_PRODUCTS } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../../utils/queries';
import { QUERY_USER } from '../../utils/queries';
import { QUERY_ME } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';

function Profile() {

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

    const { currentCategory } = state;

    const { loading, data } = useQuery(QUERY_PRODUCTS);

    useEffect(() => {
      if (data) {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: data.products,
        });
        data.products.forEach((product) => {
          idbPromise('products', 'put', product);
        });
      } else if (!loading) {
        idbPromise('products', 'get').then((products) => {
          dispatch({
            type: UPDATE_PRODUCTS,
            products: products,
          });
        });
      }
    }, [data, loading, dispatch]);

    function filterProducts() {
      if (!currentCategory) {
        return state.products.filter(
          (product) => product.user === productUserData
        );
      }

      return state.products.filter(
        (product) => product.category._id === currentCategory
      );
    }

    return (
        <article className="container my-1">
            <h2>{productUsername}'s Products:</h2>
            {state.products.length ? (
                <div className="flex-row">
                    {filterProducts().map((product) => (
                        <ProductItem
                            key={product._id}
                            _id={product._id}
                            user={product.user}
                            image={product.image}
                            name={product.name}
                            price={product.price}
                            quantity={product.quantity}
                        />
                    ))}
                </div>
            ) : (
                <h3>You haven't added any products yet!</h3>
            )}
            {loading ? <img src={spinner} alt="loading" /> : null}
        </article>
    );
}

  export default Profile;