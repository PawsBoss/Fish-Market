// Will handle Auth for firebase

import React from 'react';
import PropTypes from 'prop-types';


const Login = ({authenticate}) => (
    <nav className="login">
        <h2>Inventory Login</h2>
        <p>Sign in to manage your store's inventory</p>
        <button className="github" onClick={() => authenticate('Github')}>Log In With Github</button>
        <button className="facebook" onClick={() => authenticate('Facebook')}>Log In With Facebook</button>
        <button className="twitter" onClick={() => authenticate('Twitter')}>Log In With Twitter</button>
    </nav>
);

Login.propTypes = {
    authenticate: PropTypes.func.isRequired
};

export default Login;
