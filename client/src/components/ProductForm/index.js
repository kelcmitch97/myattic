import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import { ADD_PRODUCT } from '../../utils/mutations';

function ProductForm(props) {
    const [formState, setFormState] = useState({ name: '', description: '', image: '', quantity: 0,  price: 0});
    const [addProduct, { error }] = useMutation(ADD_PRODUCT);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {

      const { data } = await addProduct({
          variables: {
            userId: "6296ab84c6478fa1ff5cb2f6",
            // productData: {
            //     name: formState.name,
            //     description: formState.description,
            //     image: formState.image,
            //     quantity: formState.quantity,
            //     price: formState.price,
            //     user: "6296ab84c6478fa1ff5cb2f6"
            // }
          },
        })

        } catch (e) {
        console.log(e);
      }

    }

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
          <label htmlFor="name">Product Name:</label>
          <input
            placeholder="Product name"
            name="name"
            type="name"
            id="name"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="description">Product Description:</label>
          <input
            placeholder="Description..."
            name="description"
            type="text"
            id="description"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="image">Product Image:</label>
          <input
            placeholder="image"
            name="image"
            type="text"
            id="image"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="price">Product Price:</label>
          <input
            placeholder="Price"
            name="price"
            type="decimal"
            id="price"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="quantity">Product Quantity:</label>
          <input
            placeholder="Quantity"
            name="quantity"
            type="number"
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
