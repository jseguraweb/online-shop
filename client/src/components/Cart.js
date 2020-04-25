import React, { useContext, useState, Fragment } from 'react';
import '../styles/Cart.scss';
import { ContextTotal } from './Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const Cart = () => {

    const [registration, setRegistration] = useState('not registered');

    const { cart, setCart, total, setTotal } = useContext(ContextTotal);

    const removeItem = async (item) => {
        // console.log('IM PASSING THIS: ', item);
        let deletedItem = item;
        // let itemId = cart.find(el => (el.itemAddedId === item.itemAddedId)).itemAddedId;
        // console.log('ITEM_ID: ', itemId);
        console.log(deletedItem);
        // setCart(cart.filter(el => el.itemAddedId !== item.itemAddedId));
        // setTotal(total - item.itemAddedPrice.toFixed(2));

        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(deletedItem)
        };

        let response = await fetch('/cart', options);
        let data = await response.json();

        console.log('RESPONSE FROM SERVER:', data);
        let newTotal = await data.reduce((acc, el) => acc += el.price * el.quantity, 0).toFixed(2);
        await setTotal(newTotal);
        await setCart(data);
    };

    const removeAllItems = () => {

        const options = {
            method: 'DELETE'
        };

        fetch('http://localhost:4000/removeall', options)
            .then(res => res.json())
            .then(res1 => {
                const response = res1.cart;
                console.log('RESPONSE FROM SERVER:', response);
                let newTotal = response.reduce((acc, el) => acc += el.itemAddedPrice, 0).toFixed(2);
                setTotal(newTotal);
                setCart(response);
            })
    };

    const itemsInCart = cart && cart.map((el, i) => {
        return (
            <li className="item-in-cart" key={el.name.concat(i.toString())}>
                <p>{el.name} {`(${el.quantity}x)`}</p>
                <p className="underscore"></p>
                <p>{(el.quantity * el.price).toFixed(2)}€ <FontAwesomeIcon className="remove-item" icon={faTimes} onClick={() => removeItem(el)} /></p>
            </li>
        )
    });


    return (
        <div className="cart-bk">
            <section className="section-cart">
                <h4>Overview:</h4>
                <div className="overview">
                    <ul>
                        <li className="titles-cart">
                            <p>Product</p>
                            <p>Price</p>
                        </li>
                        {
                            itemsInCart
                        }
                        <li className="titles-cart total-cart">
                            <button className="active-button" onClick={removeAllItems}>REMOVE ALL <FontAwesomeIcon icon={faTrashAlt} style={{ marginLeft: '0.3rem' }} /></button>
                        </li>
                        <li className="titles-cart total-cart">
                            <p>Total: {total}€</p>
                        </li>
                    </ul>
                </div>

                {
                    registration === 'not registered' ?
                        <Fragment>
                            <h4>Payment:</h4>
                            <div className="registration">
                                <button className="active-button" onClick={() => setRegistration('login')}>LOG IN</button>
                                <button className="active-button" onClick={() => setRegistration('register')}>REGISTER</button>
                            </div>
                        </Fragment>
                        : registration === 'register' ?
                            <Fragment>
                                <h4>Register:</h4>
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
                            :
                            <Fragment>
                                <h4>Log in:</h4>
                                <form className="login-container">
                                    <label htmlFor="username" className="username">
                                        <input type="text" id="username" name="username" placeholder="username" />
                                    </label>
                                    <label htmlFor="userpassword" className="userpassword">
                                        <input type="text" id="userpassword" name="userpassword" placeholder="password" />
                                    </label>
                                    <label htmlFor="" className="submit-btn">
                                        <input type="submit" value="LOG IN" id="login-btn" className="active-button" />
                                    </label>
                                </form>
                            </Fragment>
                }
            </section>
        </div>
    );
}

export default Cart;