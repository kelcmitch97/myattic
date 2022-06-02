import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import { useQuery } from '@apollo/client';
import { ADD_PRODUCT } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';

function ProductForm(props) {
    const [formState, setFormState] = useState({ name: '', description: '', image: '', quantity: 1,  price: 0.00});
    const [addProduct, { error }] = useMutation(ADD_PRODUCT);

    var productUserId = useQuery(QUERY_ME);

  if (productUserId) {
        let pUser = productUserId.data
        
        if (pUser) {

        let me = pUser.me

        if (me) {

            productUserId = me._id

        }

        }

    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {

        await addProduct({
          variables: {
            userId: productUserId,
            productData: {
                name: formState.name,
                description: formState.description,
                image: formState.image,
                quantity: parseInt(formState.quantity),
                price: parseFloat(formState.price),
                user: productUserId
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
                        {/* <input type="file" id="image" name="image" accept="images/*" /> */}
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
