import React, { Fragment } from 'react';
import '../styles/Register.scss';

const Register = () => {
    return (
        <Fragment>
            <h4 className="delivery-address">Delivery address:</h4>
            <form className="data-container">
                <label htmlFor="firstName" className="first-name">
                    <input type="text" id="first-name" name="firstName" required />
                </label>
                <label htmlFor="lastName" className="second-name">
                    <input type="text" id="second-name" name="lastName" required />
                </label>
                <label htmlFor="address" className="address">
                    <input type="text" id="address" name="address" required />
                </label>
                <label htmlFor="addressNr" className="address-nr">
                    <input type="number" id="address-nr" name="addressNr" required />
                </label>
                <label htmlFor="postCode" className="address-post">
                    <input type="number" id="address-post" name="postCode" required />
                </label>
                <label htmlFor="city" className="city">
                    <input type="text" id="city" name="city" required />
                </label>
                <label htmlFor="country" className="country">
                    <input type="text" id="country" name="country" required />
                </label>
                <label htmlFor="username" className="username">
                    <input type="text" id="username" name="username" required />
                </label>
                <label htmlFor="password" className="userpassword">
                    <input type="text" id="userpassword" name="password" required />
                </label>
                <label htmlFor="" className="submit-btn">
                    <input type="submit" value="PAY" id="submit-btn" className="active-button" />
                </label>
            </form>
        </Fragment>
    );
}

export default Register;
