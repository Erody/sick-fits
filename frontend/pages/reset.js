import PropTypes from 'prop-types';
import Reset from '../components/Reset';

function ResetPage({ query }) {
    if (!query?.token) {
        return (
            <div>
                <p>Sorry you must supply a token</p>
            </div>
        );
    }
    return (
        <div>
            <Reset token={query.token} />
        </div>
    );
}

ResetPage.propTypes = {
    query: PropTypes.object,
};

export default ResetPage;
