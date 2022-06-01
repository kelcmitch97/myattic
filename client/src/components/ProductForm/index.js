import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import { ADD_PRODUCT } from '../../utils/mutations';

function ProductForm(props) {
    const [formState, setFormState] = useState({ name: '', description: '', image: '', quantity: 0,  price: 0});
    const [addProduct] = useMutation(ADD_PRODUCT);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const mutationResponse = await addProduct({
          variables: {
            name: formState.name,
            description: formState.description,
            image: formState.image,
            quantity: formState.quantity,
            price: formState.price
          },
        });
      };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
          ...formState,
          [name]: value,
        });
      };

    return (
        <>
            <div className="container my-1">

      <h2>Add Product</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label htmlFor="username">Product Name:</label>
          <input
            placeholder="Product name"
            name="name"
            type="name"
            id="name"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="email">Product Description:</label>
          <input
            placeholder="Description..."
            name="description"
            type="description"
            id="description"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="email">Product Description:</label>
          <input
            placeholder="image"
            name="image"
            type="name"
            id="image"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="email">Product Description:</label>
          <input
            placeholder="Price"
            name="price"
            type="price"
            id="price"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="email">Product Description:</label>
          <input
            placeholder="Quantity"
            name="quantity"
            type="quantity"
            id="quantity"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row flex-end">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
        </>
    );
}

export default ProductForm;
