import { useMutation, useQuery } from '@apollo/client';
import Router from 'next/router';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import { SINGLE_ITEM_QUERY } from './SingleProduct';
import Form from './styles/Form';

const UPDATE_PRODUCT_MUTATION = gql`
    mutation UPDATE_PRODUCT_MUTATION(
        $id: ID!
        $name: String
        $description: String
        $price: Int
    ) {
        updateProduct(
            id: $id
            data: { name: $name, description: $description, price: $price }
        ) {
            id
            name
            description
            price
        }
    }
`;

function UpdateProduct({ id }) {
    const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
        variables: { id },
    });
    const { inputs, handleChange, clearForm, resetForm } = useForm(
        data?.Product
    );
    const [
        updateProduct,
        { data: updateData, error: updateError, loading: updateLoading },
    ] = useMutation(UPDATE_PRODUCT_MUTATION, {
        variables: {
            id,
            name: inputs.name,
            description: inputs.description,
            price: inputs.price,
        },
    });
    if (loading) return <p>Loading...</p>;
    return (
        <Form
            onSubmit={async (e) => {
                e.preventDefault();
                const res = await updateProduct();
                clearForm();
                // go to that product's page
                Router.push({
                    pathname: `/product/${res.data.updateProduct.id}`,
                });
            }}
        >
            <DisplayError error={error || updateError} />
            <fieldset disabled={updateLoading} aria-busy={updateLoading}>
                <label htmlFor="name">
                    Name
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Name"
                        value={inputs.name || ''}
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
                        value={inputs.price || ''}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="description">
                    Description
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Description"
                        value={inputs.description || ''}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Update Product</button>
            </fieldset>
        </Form>
    );
}

UpdateProduct.propTypes = {
    id: PropTypes.string.isRequired,
};

export default UpdateProduct;
