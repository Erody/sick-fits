import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import Head from 'next/head';
import formatMoney from '../lib/formatMoney';
import DisplayError from './ErrorMessage';
import OrderStyles from './styles/OrderStyles';

const SINGLE_ORDER_QUERY = gql`
    query SINGLE_ORDER_QUERY($id: ID!) {
        Order(where: { id: $id }) {
            charge
            total
            id
            user {
                id
            }
            items {
                quantity
                id
                description
                name
                price
                photo {
                    image {
                        publicUrlTransformed
                    }
                }
            }
        }
    }
`;

function SingleOrder({ id }) {
    const { data, error, loading } = useQuery(SINGLE_ORDER_QUERY, {
        variables: { id },
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <DisplayError />;
    const { items } = data?.Order;
    const order = data.Order;
    return (
        <OrderStyles>
            <Head>
                <title>Sick Fits = {order.id}</title>
            </Head>
            <p>
                <span>Order Id:</span>
                <span>{order.id}</span>
            </p>
            <p>
                <span>Charge:</span>
                <span>{order.charge}</span>
            </p>
            <p>
                <span>Order total:</span>
                <span>{formatMoney(order.total)}</span>
            </p>
            <p>
                <span>Item count:</span>
                <span>{items.length}</span>
            </p>
            <div className="items">
                {items.map((item) => (
                    <div className="order-item" key={item.id}>
                        <img
                            src={item.photo.image.publicUrlTransformed}
                            alt={item.name}
                        />
                        <div className="item-details">
                            <h2>{item.name}</h2>
                            <p>Qty: {item.quantity}</p>
                            <p>Each: {formatMoney(item.price)}</p>
                            <p>
                                Sub Total:{' '}
                                {formatMoney(item.price * item.quantity)}
                            </p>
                            <p>{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </OrderStyles>
    );
}

SingleOrder.propTypes = {
    id: PropTypes.string.isRequired,
};

export default SingleOrder;
