import PropTypes from 'prop-types';
import SingleProduct from '../../components/SingleProduct';

function SingleProductPage({ query }) {
    return <SingleProduct id={query.id} />;
}

SingleProductPage.propTypes = {
    query: PropTypes.object,
};

export default SingleProductPage;
