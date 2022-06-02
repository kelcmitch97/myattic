import React from "react";
import Cart from "../components/Cart";
import Hero from "../components/Hero";


const Home = () => {
  return (
    <div className="home">
      <Hero />
      {/* <ProductList /> */}
      <Cart />
    </div>
  );
};

export default Home;
