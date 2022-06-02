import React from "react";
import ProductList from "../components/ProductList";
import Cart from "../components/Cart";
import ProductForm from "../components/ProductForm";

const Home = () => {
  return (
    <main className="home">
      <ProductForm />
      <ProductList />
      <Cart />
    </main>
  );
};

export default Home;
