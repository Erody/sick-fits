import PropTypes from 'prop-types';
import SingleOrder from '../../components/SingleOrder';

function SingleOrderPage({ query }) {
    return <SingleOrder id={query.id} />;
}

SingleOrderPage.propTypes = {
    query: PropTypes.object.isRequired,
};

export default SingleOrderPage;
