import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Router from 'next/router';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import DisplayError from './ErrorMessage';
import { ALL_PRODUCTS_QUERY } from './Products';

const CREATE_PRODUCT_MUTATION = gql`
    mutation CREATE_PRODUCT_MUTATION(
        # which variables are getting passed, and what types are they
        $name: String!
        $description: String!
        $price: Int!
        $image: Upload
    ) {
        createProduct(
            data: {
                name: $name
                description: $description
                price: $price
                status: "AVAILABLE"
                photo: { create: { image: $image, altText: $name } }
            }
        ) {
            id
            price
            description
            name
        }
    }
`;

function CreateProduct() {
    const { inputs, handleChange, clearForm, resetForm } = useForm({
        name: 'Shoes',
        price: 2323,
        description: 'nice shoes',
    });
    const [createProduct, { data, error, loading }] = useMutation(
        CREATE_PRODUCT_MUTATION,
        {
            variables: inputs,
            refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
        }
    );
    return (
        <Form
            onSubmit={async (e) => {
                e.preventDefault();
                const res = await createProduct();
                clearForm();
                // go to that product's page
                Router.push({
                    pathname: `/product/${res.data.createProduct.id}`,
                });
            }}
        >
            <DisplayError error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
                <label htmlFor="image">
                    Image
                    <input
                        onInvalid={(e) =>
                            e.target.setCustomValidity(
                                'Please upload an image.'
                            )
                        }
                        required
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="name">
                    Name
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Name"
                        value={inputs.name}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="price">
                    Price
                    <input
                        type="number"
                        id="price"
                        name="price"
                        placeholder="Price"
                        value={inputs.price}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="description">
                    Description
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Description"
                        value={inputs.description}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">+ Add Product</button>
            </fieldset>
        </Form>
    );
}

CreateProduct.propTypes = {};

export default CreateProduct;
