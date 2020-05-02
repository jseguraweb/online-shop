import React, { useContext, useEffect } from 'react';
import { ContextTotal } from './Context';
import '../styles/Sunglasses.scss';
import { Route } from 'react-router-dom';
import Item from './Item';
import MiniCart from './MiniCart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faGlasses } from '@fortawesome/free-solid-svg-icons';

const Sunglasses = () => {

    const { products, total, setTotal, setCart, getDB } = useContext(ContextTotal);

    const addToCart = async (e, item) => {
        e.preventDefault();
        const data = item;
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        try {

            let response = await fetch('/cart', options);
            let data = await response.json();
            console.log('RESPONSE FROM SERVER:', data);
            console.log('TOTAL: ', total);

            let newTotal = await data.reduce((acc, el) => acc += el.price * el.quantity, 0).toFixed(2);
            console.log('NEW-TOTAL: ', newTotal);
            await setTotal(newTotal);
            await setCart(data);

        } catch (error) {
            console.log('ERROR in addToCart: ', error);
        }
    };

    useEffect(() => {
        getDB();
    }, []);

    return (

        <div className="sunglasses-bk">
            <a className="active-button small-link-btn" href="/eyeglasses">watch <FontAwesomeIcon icon={faGlasses} /> viewglasses</a>
            <MiniCart />
            <section className="section-sunglasses">
                {
                    products ?
                        products.filter(el => el.type === 'sun').map((el, i) => <Item key={el.type.concat(i.toString())} properties={el} addToCart={addToCart} />)
                        :
                        <div className="loading-message">
                            <p><FontAwesomeIcon icon={faSpinner} spin style={{ color: "rgb(7, 104, 104)" }} /> Loading...</p>
                        </div>
                }
            </section>
            <Route path="/" />
        </div>
    );
}

export default Sunglasses;
