import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const REMOVE_FROM_CART_MUTATION = gql`
    mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
        deleteCartItem(id: $id) {
            id
        }
    }
`;

const BigButton = styled.button`
    font-size: 3rem;
    background: none;
    border: 0;
    &:hover {
        color: red;
        cursor: pointer;
    }
`;

function update(cache, payload) {
    cache.evict(cache.identify(payload.data.deleteCartItem));
}

function RemoveFromCart({ id }) {
    const [removeFromCart, { loading }] = useMutation(
        REMOVE_FROM_CART_MUTATION,
        { variables: { id }, update }
    );
    return (
        <BigButton
            title="Remove this item from cart"
            disabled={loading}
            onClick={removeFromCart}
            type="button"
        >
            &times;
        </BigButton>
    );
}

RemoveFromCart.propTypes = {
    id: PropTypes.string.isRequired,
};

export default RemoveFromCart;
