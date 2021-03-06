import { useMutation } from '@apollo/client';
import {
    CardElement,
    Elements,
    useElements,
    useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import gql from 'graphql-tag';
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

const CREATE_ORDER_MUTATION = gql`
    mutation CREATE_ORDER_MUTATION($token: String!) {
        checkout(token: $token) {
            id
            charge
            total
            items {
                id
                name
            }
        }
    }
`;

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

function CheckoutForm() {
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const [checkout, { error: graphQLError }] = useMutation(
        CREATE_ORDER_MUTATION
    );
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
            nProgress.done();
            return; // stops checkout from happening
        }
        // send the token to our keystone server via a custom mutation
        const order = await checkout({
            variables: { token: paymentMethod.id },
        }).catch((err) => console.error(err));
        console.log(order);
        // change the page to review the order
        // close the cart

        // turn the loader off
        setLoading(false);
        nProgress.done();
    }

    return (
        <CheckoutFormStyles onSubmit={handleSubmit}>
            {error && <p style={{ fontSize: 12 }}>{error.message}</p>}
            {graphQLError && (
                <p style={{ fontSize: 12 }}>{graphQLError.message}</p>
            )}
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
