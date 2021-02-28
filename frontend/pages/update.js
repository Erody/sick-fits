import PropTypes from 'prop-types';
import UpdateProduct from '../components/UpdateProduct';

function UpdatePage({ query }) {
    return (
        <div>
            <UpdateProduct id={query.id} />
        </div>
    );
}

UpdatePage.propTypes = {
    query: PropTypes.object.isRequired,
};

export default UpdatePage;
