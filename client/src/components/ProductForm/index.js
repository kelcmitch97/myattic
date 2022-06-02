import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import { ADD_PRODUCT } from '../../utils/mutations';

function ProductForm(props) {
    const [formState, setFormState] = useState({ name: '', description: '', image: '', quantity: 0,  price: 0.00});
    const [addProduct, { error }] = useMutation(ADD_PRODUCT);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {

      const { data } = await addProduct({
          variables: {
            userId: "6297ac07464edc29b66fa63c",
            productData: {
                name: formState.name,
                description: formState.description,
                image: formState.image,
                quantity: formState.quantity,
                price: formState.price,
                user: "6297ac07464edc29b66fa63c"
            }
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
            <article className="container my-1">
                <h2>Add Product</h2>
                <form onSubmit={handleFormSubmit}>
                    <section className="flex-row space-between my-2">
                        <label htmlFor="name">Product Name:</label>
                        <input
                            placeholder="Product name"
                            name="name"
                            type="name"
                            id="name"
                            onChange={handleChange}
                        />
                    </section>
                    <section className="flex-row space-between my-2">
                        <label htmlFor="description">Product Description:</label>
                        <input
                            placeholder="Description..."
                            name="description"
                            type="text"
                            id="description"
                            onChange={handleChange}
                        />
                    </section>
                    <section className="flex-row space-between my-2">
                        <label htmlFor="image">Product Image:</label>
                        <input
                            placeholder="image"
                            name="image"
                            type="text"
                            id="image"
                            onChange={handleChange}
                        />
                    </section>
                    <section className="flex-row space-between my-2">
                        <label htmlFor="price">Product Price:</label>
                        <input
                            placeholder="Price"
                            name="price"
                            type="decimal"
                            id="price"
                            onChange={handleChange}
                        />
                    </section>
                    <section className="flex-row space-between my-2">
                        <label htmlFor="quantity">Product Quantity:</label>
                        <input
                            placeholder="Quantity"
                            name="quantity"
                            type="number"
                            id="quantity"
                            onChange={handleChange}
                        />
                    </section>
                    <section className="flex-row flex-end">
                        <button type="submit">Submit</button>
                    </section>
                </form>
            </article>
        </>
    );
}

export default ProductForm;
