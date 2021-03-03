import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import PropTypes from 'prop-types';

import Form from './styles/Form';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';

const PASSWORD_RESET_MUTATION = gql`
    mutation PASSWORD_RESET_MUTATION(
        $email: String!
        $token: String!
        $password: String!
    ) {
        redeemUserPasswordResetToken(
            email: $email
            token: $token
            password: $password
        ) {
            code
            message
        }
    }
`;

function Reset({ token }) {
    const { inputs, handleChange, resetForm } = useForm({
        email: '',
        password: '',
    });
    const [resetPassword, { data, loading, error }] = useMutation(
        PASSWORD_RESET_MUTATION,
        {
            variables: { ...inputs, token },
        }
    );
    async function handleSubmit(e) {
        e.preventDefault();
        const res = await resetPassword().catch(console.error);
        resetForm();
        console.log(res);
    }
    const successfulError = data?.redeemUserPasswordResetToken?.code
        ? data?.redeemUserPasswordResetToken
        : undefined;
    if (loading) return <p>Loading...</p>;

    return (
        <Form method="POST" onSubmit={handleSubmit}>
            <h2>Reset your password</h2>
            <DisplayError error={error || successfulError} />
            <fieldset>
                {data?.redeemUserPasswordResetToken === null && (
                    <p>Success! You can now sign in!</p>
                )}
                <label htmlFor="email">
                    Email
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email Address"
                        autoComplete="email"
                        value={inputs.email}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="password">
                    Password
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        autoComplete="password"
                        value={inputs.password}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Request reset</button>
            </fieldset>
        </Form>
    );
}

Reset.propTypes = {
    token: PropTypes.string,
};

export default Reset;
