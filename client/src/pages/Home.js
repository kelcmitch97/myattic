import React from "react";
import Profile from "../components/Profile";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";

const Home = () => {
  return (
    <div className="home">
      <CategoryMenu />
      <Profile />
      <Cart />
    </div>
  );
};

export default Home;
