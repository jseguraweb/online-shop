import React, { Fragment, useState, useContext } from 'react';
import '../styles/Register.scss';
import { ContextRegistration } from './Context';

const Register = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [addressNr, setAddressNr] = useState('');
    const [postCode, setPostCode] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { toDelivery, setToDelivery, userInformation, setUserInformation } = useContext(ContextRegistration);

    const handleSubmit = async () => {
        const userData = {
            firstName: firstName,
            lastName: lastName,
            address: address,
            addressNr: addressNr,
            postCode: postCode,
            city: city,
            country: country,
            username: username,
            password: password
        };
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        };
        const response = await fetch('/cart/register', options);
        const data = await response.json();
        console.log('RESPONSE DATA: ', data);
        if (data.status === 'New user successfully registered') {
            setUserInformation(data);
            setToDelivery(true);
        } else {
            alert(data.status);
            setToDelivery(false);
        }
    }

    return (
        <Fragment>
            <h4 className="info-title">Please insert your information:</h4>
            <form className="data-container">
                <label htmlFor="firstName" className="first-name">
                    <input type="text" id="first-name" name="firstName" onChange={(e) => setFirstName(e.target.value)} required />
                </label>
                <label htmlFor="lastName" className="second-name">
                    <input type="text" id="second-name" name="lastName" onChange={(e) => setLastName(e.target.value)} required />
                </label>
                <label htmlFor="address" className="address">
                    <input type="text" id="address" name="address" onChange={(e) => setAddress(e.target.value)} required />
                </label>
                <label htmlFor="addressNr" className="address-nr">
                    <input type="number" id="address-nr" name="addressNr" onChange={(e) => setAddressNr(e.target.value)} required />
                </label>
                <label htmlFor="postCode" className="address-post">
                    <input type="text" id="address-post" name="postCode" onChange={(e) => setPostCode(e.target.value)} required />
                </label>
                <label htmlFor="city" className="city">
                    <input type="text" id="city" name="city" onChange={(e) => setCity(e.target.value)} required />
                </label>
                <label htmlFor="country" className="country">
                    <input type="text" id="country" name="country" onChange={(e) => setCountry(e.target.value)} required />
                </label>
                <label htmlFor="username" className="username">
                    <input type="text" id="username" name="username" onChange={(e) => setUsername(e.target.value)} required />
                </label>
                <label htmlFor="password" className="userpassword">
                    <input type="text" id="userpassword" name="password" onChange={(e) => setPassword(e.target.value)} required />
                </label>
                <label htmlFor="" className="register-btn">
                    <input type="submit" value="REGISTER" id="register-btn" className="active-button" onClick={(e) => { e.preventDefault(); handleSubmit() }} />
                </label>
            </form>
        </Fragment>
    );
}

export default Register;
