import React from 'react';
import PropTypes from 'prop-types';
import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import { useUser } from './User';
import CartItem from './CartItem';
import formatMoney from '../lib/formatMoney';
import calcTotalPrice from '../lib/calcTotalPrice';

function Cart(props) {
    const me = useUser();
    if (!me) return null;
    return (
        <CartStyles open>
            <header>
                <Supreme>{me.name}'s Cart</Supreme>
            </header>
            <ul>
                {me.cart.map((cartItem) => (
                    <CartItem key={cartItem.id} cartItem={cartItem} />
                ))}
            </ul>
            <footer>
                <p>{formatMoney(calcTotalPrice(me.cart))}</p>
            </footer>
        </CartStyles>
    );
}

Cart.propTypes = {};

export default Cart;
