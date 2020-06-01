import React from 'react';
import PropTypes from 'prop-types';

const Login = (props) => (
    <nav className = 'login'>
        <h2>Inventory Logic</h2>
        <p>Sign in to maintain your Inventory</p>
        <button className="facebook" onClick = {() => props.authenticate('Facebook')}>
            Log In with Facebook
        </button>
    </nav>
);

Login.prototypes = {
    authenticate: PropTypes.func.isRequired
}
export default Login;