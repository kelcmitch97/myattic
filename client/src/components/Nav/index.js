import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import logo from '../../assets/icons8-roofing-80.png';
import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useStoreContext } from '../../utils/GlobalState';
import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from '../../utils/actions';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';

function Nav() {

    const [state, dispatch] = useStoreContext();

    const { categories } = state;

    const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

    useEffect(() => {
      if (categoryData) {
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: categoryData.categories,
        });
        categoryData.categories.forEach((category) => {
          idbPromise('categories', 'put', category);
        });
      } else if (!loading) {
        idbPromise('categories', 'get').then((categories) => {
          dispatch({
            type: UPDATE_CATEGORIES,
            categories: categories,
          });
        });
      }
    }, [categoryData, loading, dispatch]);

    const handleClick = (id) => {
      dispatch({
        type: UPDATE_CURRENT_CATEGORY,
        currentCategory: id,
      });
    };

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/orderHistory">
              Order History
            </Link>
          </li>
          <li className="mx-1">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/signup">
              Account
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/login">
              Login
            </Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <header className="header">
        <img src={logo} className="logo" alt="logo" />
      <h1 className="title">

            <Link to="/">
            My Attic
            </Link>
      </h1>

      <nav>
        {showNavigation()}
        <li className="mx-1 menu">
            <Link to="/">
            Categories
            </Link>
            <ul className="dropdown">
        {categories.map((item) => (

                <li
                key={item._id}
                onClick={() => {
                    handleClick(item._id);
                }}
                >
                {item.name}
                </li>

      ))}

      </ul>
      </li>
      </nav>
    </header>
  );
}

export default Nav;
