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

    if (Auth.loggedIn()) {
      return (

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
        <Nav.Link href="/productlist">Products</Nav.Link>
          <Nav.Link href="/profile">Profile</Nav.Link>
        
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
          <Nav.Link href="/" onClick={() => Auth.logout()}>Logout</Nav.Link>
        </Nav>

    </Navbar>
    

  )
      } else {

        return (
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
        <Nav.Link href="/productlist">Products</Nav.Link>
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
        )

      }
}

export default Navigation;
