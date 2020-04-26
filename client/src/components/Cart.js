import React, { useContext, useState, Fragment } from 'react';
import '../styles/Cart.scss';
import { ContextTotal } from './Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Register from './Register';
import Login from './Login';

const Cart = () => {

    const { cart, setCart, total, setTotal } = useContext(ContextTotal);
    const [registration, setRegistration] = useState('not registered');
    const [loginBtn, setLoginBtn] = useState(true);

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

    const removeAllItems = async () => {

        const options = {
            method: 'DELETE'
        };

        let response = await fetch('/cart/clear', options);
        let data = await response.json();
        console.log(data);

        console.log('RESPONSE FROM SERVER:', data);
        setTotal(0);
        setCart(data);
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

    const toggleButton = () => {
        setLoginBtn(!loginBtn);
    }

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

                <h4>To delivery details:</h4>
                <div className="registration">
                    <button className="active-button" className={loginBtn ? "active-button pressed-btn" : "active-button"} onClick={() => { toggleButton(); setRegistration('login') }}>LOG IN</button>
                    <button className="active-button" className={!loginBtn ? "active-button pressed-btn" : "active-button"} onClick={() => { toggleButton(); setRegistration('register') }}>REGISTER</button>
                </div>

                {
                    registration === 'register' ?
                        <Register />
                        :
                        <Login />
                }
            </section>
        </div>
    );
}

export default Cart;