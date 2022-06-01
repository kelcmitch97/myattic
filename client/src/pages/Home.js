import React from "react";
import ProductList from "../components/ProductList";
import Cart from "../components/Cart";
import ProductForm from "../components/ProductForm";

const Home = () => {
  return (
    <div className="home">
      <ProductForm />
      <ProductList />
      <Cart />
    </div>
  );
};

export default Home;
