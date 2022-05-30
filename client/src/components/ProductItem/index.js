import React from "react";
import { Link } from "react-router-dom";
import "./style.css"

function ProductItem(item) {

  const {
    image,
    name,
    _id,
    price,
  } = item;

  return (
    <>
        <article className = "container">
            <div className = "card">
                <div className = "image">
                    <img alt={name} src ={`/images/${image}`}/>
                </div>
                <div className = "content">
                    <h3>{name}</h3>
                    <p>{price}</p>
                    <Link to={`/products/${_id}`}>
                        <button>Details</button>
                    </Link>
                </div>
            </div>
        </article>
    </>
  );
}

export default ProductItem;
