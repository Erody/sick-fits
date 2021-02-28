import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

const DELETE_PRODUCT_MUTATION = gql`
    mutation DELETE_PRODUCT_MUTATION($id: ID!) {
        deleteProduct(id: $id) {
            id
            name
        }
    }
`;

function update(cache, payload) {
    cache.evict(cache.identify(payload.data.deleteProduct));
}

function DeleteProduct({ id, children }) {
    const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT_MUTATION, {
        variables: { id },
        update,
    });
    return (
        <button
            type="button"
            disabled={loading}
            onClick={() => {
                // eslint-disable-next-line no-restricted-globals
                if (confirm('Are you sure you want to delete this item?')) {
                    deleteProduct().catch((err) => alert(err.message));
                }
            }}
        >
            {children}
        </button>
    );
}

DeleteProduct.propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default DeleteProduct;
