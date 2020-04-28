import React, { useState, useContext } from 'react';
import '../styles/Payment.scss';
import { ContextTotal } from './Context';

const Payment = ({ userInformation }) => {

    const [method, setMethod] = useState('paypal');
    const { cart, total } = useContext(ContextTotal);

    const togglePayment = (e) => {
        console.log(e);
        switch (e) {
            case 'paypal':
                setMethod('paypal');
                break;
            case 'credit-card':
                setMethod('credit-card');
                break;
            case 'cash':
                setMethod('cash');
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (e, method) => {
        e.preventDefault();
        if (method === 'paypal') {
            // alert('PAYPAL PAYMENT DONE');
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({ cart: cart, total: total })
            };
            const response = await fetch('/payment/paypal', options);
            const data = await response.json();
            console.log('PAYPAL RESPONSE: ', data);
            await window.location.assign(data);
        } else {
            alert('PAYMENT DONE');
        }
    }

    return (
        <div className="payment-container">
            <p className="total-payment">TOTAL: {total}€</p>
            <h4>Please select the payment method: (no data will be saved)</h4>
            <div className="payment-methods">

                <button className={method === 'paypal' ? "active-button pressed-btn" : "active-button"} onClick={() => { togglePayment('paypal') }}>PAYPAL</button>
                <button className={method === 'credit-card' ? "active-button pressed-btn" : "active-button"} onClick={() => { togglePayment('credit-card') }}>CREDIT CARD</button>
                <button className={method === 'cash' ? "active-button pressed-btn" : "active-button"} onClick={() => { togglePayment('cash') }}>CASH ON DELIVERY</button>

            </div>
            <div className="payment-details">
                {
                    method === 'paypal' ?
                        <div className="paypal-container">
                            <p>PayPal Payment</p>
                            <input className="active-button payment-btn" type="submit" onClick={(e) => handleSubmit(e, 'paypal')} value="PAY" />
                        </div>

                        : method === 'credit-card' ?

                            <form className="credit-card-container">
                                <label htmlFor="cardholder" className="cardholder">
                                    <input type="text" name="cardholder" />
                                </label>
                                <label htmlFor="cardnumber" className="cardnumber">
                                    <input type="tel" maxLength="16" name="cardnumber" />
                                </label>
                                <label htmlFor="month" className="month">
                                    <input type="number" min="01" max="12" name="month" list="month" />
                                    <datalist id="month">
                                        <option value="01"></option>
                                        <option value="02"></option>
                                        <option value="03"></option>
                                        <option value="04"></option>
                                        <option value="05"></option>
                                        <option value="06"></option>
                                        <option value="07"></option>
                                        <option value="08"></option>
                                        <option value="09"></option>
                                        <option value="10"></option>
                                        <option value="11"></option>
                                        <option value="12"></option>
                                    </datalist>
                                </label>
                                <label htmlFor="year" className="year">
                                    <input type="number" min="2020" max="2030" name="year" list="year" />
                                    <datalist id="year">
                                        <option value="2020"></option>
                                        <option value="2021"></option>
                                        <option value="2022"></option>
                                        <option value="2023"></option>
                                        <option value="2024"></option>
                                        <option value="2025"></option>
                                        <option value="2026"></option>
                                        <option value="2027"></option>
                                        <option value="2028"></option>
                                        <option value="2029"></option>
                                        <option value="2030"></option>
                                    </datalist>
                                </label>
                                <label htmlFor="cvv" className="cvv">
                                    <input type="number" min="001" max="999" name="cvv" />
                                </label>
                                <input className="active-button payment-btn" type="submit" onClick={(e) => handleSubmit(e)} value="PAY" />
                            </form>

                            :

                            <div className="cash-container">
                                <h5>IMPORTANT INFORMATION</h5>
                                <p>In the next 24 hours we will send you an invoice to <strong>{userInformation.data.email}</strong></p>
                                <p>We will also send you an email with the delivery details and a return form as soon as the package leaves our warehouse.</p>
                                <p>Please proceed with the payment once you've received your order.</p>
                                <p>You will have 14 days after the delivery to complete the payment.</p>

                                <input className="active-button payment-btn" type="submit" onClick={(e) => handleSubmit(e)} value="PAY" />
                            </div>
                }
            </div>
        </div>
    );
}

export default Payment;
