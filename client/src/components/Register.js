import React, { Fragment } from 'react';
import '../styles/Register.scss';

const Register = () => {
    return (
        <Fragment>
            <form className="registration-container">
                <label htmlFor="username" className="username">
                    <input type="text" id="username" name="username" />
                </label>
                <label htmlFor="userpassword" className="userpassword">
                    <input type="text" id="userpassword" name="userpassword" />
                </label>
            </form>
            <h4>Delivery address:</h4>
            <form>
                <label htmlFor="first-name" className="first-name">
                    <input type="text" id="first-name" name="first-name" />
                </label>
                <label htmlFor="second-name" className="second-name">
                    <input type="text" id="second-name" name="second-name" />
                </label>
                <label htmlFor="address" className="address">
                    <input type="text" id="address" name="address" />
                </label>
                <label htmlFor="" className="address-nr">
                    <input type="number" id="address-nr" name="address-nr" />
                </label>
                <label htmlFor="" className="address-post">
                    <input type="number" id="address-post" name="address-post" />
                </label>
                <label htmlFor="" className="submit-btn">
                    <input type="submit" value="PAY" id="submit-btn" className="active-button" />
                </label>

            </form>
        </Fragment>
    );
}

export default Register;
