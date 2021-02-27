import PropTypes from 'prop-types';
import { useState } from 'react';
import useForm from '../lib/useForm';
import Form from './styles/Form';

function CreateProduct(props) {
    const { inputs, handleChange, clearForm, resetForm } = useForm({
        name: 'Shoes',
        price: 2323,
        description: 'nice shoes',
    });
    return (
        <Form
            onSubmit={(e) => {
                e.preventDefault();
                console.log(inputs);
            }}
        >
            <fieldset>
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
