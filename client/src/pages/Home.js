import React from "react";
import ProductList from "../components/ProductList";
import Cart from "../components/Cart";
import Hero from "../components/Hero";
import ProductForm from "../components/ProductForm";

const Home = () => {
  return (
    <div className="home">
      <Hero />
      <ProductForm />
      <ProductList />
      <Cart />
    </div>
  );
};

export default Home;
