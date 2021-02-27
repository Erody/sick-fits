import PropTypes from 'prop-types';
import { useState } from 'react';
import useForm from '../lib/useForm';

function CreateProduct(props) {
    const { inputs, handleChange, clearForm, resetForm } = useForm({
        name: 'Shoes',
        price: 2323,
        description: 'nice shoes',
    });
    return (
        <form>
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
                <input
                    type="text"
                    id="description"
                    name="description"
                    placeholder="description"
                    value={inputs.description}
                    onChange={handleChange}
                />
            </label>
            <button type="button" onClick={clearForm}>
                Clear Form
            </button>
            <button type="button" onClick={resetForm}>
                Reset Form
            </button>
        </form>
    );
}

CreateProduct.propTypes = {};

export default CreateProduct;
