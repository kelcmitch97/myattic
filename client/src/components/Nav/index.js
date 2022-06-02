import React, { useEffect } from 'react';
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import logo from '../../assets/logo2.PNG'
import { useQuery } from '@apollo/client';
import { useStoreContext } from '../../utils/GlobalState';
import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from '../../utils/actions';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';


function Navigation() {
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


  return (
    // <header className="flex-row px-1 header">
    //   <h1 className="title">
    //     <Link to="/">
    //       <img alt="logo" src={logo} className='logo' />
    //     </Link>
    //   </h1>

    //   <nav>

    //     {showNavigation()}

    //     {/* <li className="mx-1 menu">
    //             <Link to="/">
    //             Categories
    //             </Link>
    //             <ul>
    //                 {categories.map((item) => (
    //                     <li
    //                     key={item._id}
    //                     onClick={() => {
    //                         handleClick(item._id);
    //                     }}
    //                     >
    //                     {item.name}
    //                     </li>
    //                 ))}
    //             </ul>
    //         </li> */}

    //   </nav>
    // </header>

    <Navbar collapseOnSelect expand="lg" className='header'>
      <Navbar.Brand href="/">
        <img 
        alt='logo' 
        src={logo}
        width='80'
        height='80'
        /> {''}
       MyAttic
      </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/profile">Profile</Nav.Link>
          <Nav.Link href="/login">Login</Nav.Link>
        
          <NavDropdown title="Categories" id="collasible-nav-dropdown" >
            <NavDropdown.Item href="#">Artwork</NavDropdown.Item>
            <NavDropdown.Item href="#">Furniture</NavDropdown.Item>
            <NavDropdown.Item href="#">Glassware</NavDropdown.Item>
            <NavDropdown.Item href="#">Housewares</NavDropdown.Item>
            <NavDropdown.Item href="#">Instruments</NavDropdown.Item>
            <NavDropdown.Item href="#">Tableware</NavDropdown.Item>
          </NavDropdown>
          
          <Nav.Link href="/contact">Contact</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
        </Nav>

    </Navbar>
    

  );
}

export default Navigation;
