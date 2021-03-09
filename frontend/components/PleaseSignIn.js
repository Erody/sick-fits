import PropTypes from 'prop-types';
import { useUser } from './User';
import SignIn from './SignIn';

function PleaseSignIn({ children }) {
    const me = useUser();
    if (!me) return <SignIn />;
    return children;
}

PleaseSignIn.propTypes = {
    children: PropTypes.node.isRequired,
};

export default PleaseSignIn;
