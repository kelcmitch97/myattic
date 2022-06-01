import React, { useEffect } from 'react';
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavDropdown, Container } from "react-bootstrap";
import logo from '../../assets/logo2.PNG'
import { useQuery } from '@apollo/client';
import { useStoreContext } from '../../utils/GlobalState';
import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from '../../utils/actions';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import {FaBars, FaTimes, FaRegUser } from 'react-icons/fa';


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

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/orderHistory">
              Orders
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
            <Link to="/profile">
            <FaRegUser />
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/login">
            Login
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/contact">
              Contact
            </Link>
          </li>
        </ul>
      );
    }
  }

  return (
    // <header className="flex-row px-1 header">
    //   <h1 className="title">
    //     <Link to="/">
    //       <img alt="logo" src={logo} className='logo' />
    //     </Link>
    //   </h1>

    //   <nav>
    //           {/* Hamburger
    //   <div onClick={handleNavClick} className=''>
    //     <FaBars />
    //   </div> */}
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

    <Navbar collapseOnSelect expand="lg"  variant="dark" className='header'>

      <Container>
      <Navbar.Brand href="/">
        <img 
        alt='logo' 
        src={logo}
        width='50'
        height='50'
        className='d-inline-block align-top'
        /> {''}
       MyAttic
      </Navbar.Brand>
      </Container>

      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/profile">Profile</Nav.Link>
          <Nav.Link href="/login">Login</Nav.Link>
          <NavDropdown title="Categories" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#">Artwork</NavDropdown.Item>
            <NavDropdown.Item href="#">Furniture</NavDropdown.Item>
            <NavDropdown.Item href="#">Glassware</NavDropdown.Item>
            <NavDropdown.Item href="#">Housewares</NavDropdown.Item>
            <NavDropdown.Item href="#">Instruments</NavDropdown.Item>
            <NavDropdown.Item href="#">Tableware</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="/contact">Contact</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    

  );
}

export default Navigation;
