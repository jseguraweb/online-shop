import React, { useState, useContext } from 'react';
import '../styles/Payment.scss';
import { ContextTotal } from './Context';

const Payment = () => {

    const [method, setMethod] = useState('paypal');
    const { total } = useContext(ContextTotal);

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
                        <p>PayPal Payment</p>

                        : method === 'credit-card' ?

                            <div className="credit-card-container">
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
                            </div>

                            :

                            <p>Cash on delivery payment</p>
                }
            </div>
        </div>
    );
}

export default Payment;
