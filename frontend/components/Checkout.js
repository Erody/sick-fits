import {
    CardElement,
    Elements,
    useElements,
    useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import nProgress from 'nprogress';
import { useState } from 'react';
import styled from 'styled-components';
import SickButton from './styles/SickButton';

const CheckoutFormStyles = styled.form`
    box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
    border: 1px solid rgba(0, 0, 0, 0.06);
    border-radius: 5px;
    padding: 1rem;
    display: grid;
    grid-gap: 1rem;
`;

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

function CheckoutForm() {
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    async function handleSubmit(e) {
        // stop the form from submitting, start the loader
        e.preventDefault();
        setLoading(true);
        // start the page transition
        nProgress.start();
        // create the payment method via stripe (returns token if succesful)
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });
        console.log(paymentMethod);
        // handle any errors from stripe
        if (error) {
            setError(error);
            console.log(error);
        }
        // send the token to our keystone server via a custom mutation
        // change the page to review the order
        // close the cart

        // turn the loader off
        setLoading(false);
        nProgress.done();
    }

    return (
        <CheckoutFormStyles onSubmit={handleSubmit}>
            {error && <p style={{ fontSize: 12 }}>{error.message}</p>}
            <CardElement />
            <SickButton>Check out now</SickButton>
        </CheckoutFormStyles>
    );
}

export default function Checkout() {
    return (
        <Elements stripe={stripeLib}>
            <CheckoutForm />
        </Elements>
    );
}
