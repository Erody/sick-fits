import React from 'react';
import PropTypes from 'prop-types';
import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import { useUser } from './User';
import CartItem from './CartItem';
import formatMoney from '../lib/formatMoney';
import calcTotalPrice from '../lib/calcTotalPrice';
import { useCart } from '../lib/cartState';
import CloseButton from './styles/CloseButton';
import Checkout from './Checkout';

function Cart() {
    const me = useUser();
    const { cartOpen, closeCart } = useCart();
    if (!me) return null;
    return (
        <CartStyles open={cartOpen}>
            <header>
                <Supreme>{me.name}'s Cart</Supreme>
                <CloseButton type="button" onClick={closeCart}>
                    &times;
                </CloseButton>
            </header>
            <ul>
                {me.cart.map((cartItem) => (
                    <CartItem key={cartItem.id} cartItem={cartItem} />
                ))}
            </ul>
            <footer>
                <p>{formatMoney(calcTotalPrice(me.cart))}</p>
                <Checkout />
            </footer>
        </CartStyles>
    );
}

Cart.propTypes = {};

export default Cart;
