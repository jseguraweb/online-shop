import React, { useContext, useState, useEffect } from 'react';
import { ContextTotal } from './Context';
import '../styles/Glasses.scss';
import { Route } from 'react-router-dom';
import Item from './Item';
import MiniCart from './MiniCart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';


const Glasses = () => {

    const { setTotal, setCart, products, getDB } = useContext(ContextTotal);

    const addToCart = (e, item) => {
        e.preventDefault();
        console.log('ADD TO CART IS RUNNING');
        const data = item;
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        fetch('/addtocart', options)
            .then(res => res.json())
            .then(res1 => {
                const response = res1.cart;
                console.log('RESPONSE FROM SERVER:', response);
                let newTotal = response.reduce((acc, el) => acc += el.itemAddedPrice * el.itemAddedQuantity, 0).toFixed(2);
                setTotal(newTotal);
                setCart(response);
            })
    };

    useEffect(() => {
        getDB()
    }, []);

    return (
        <div className="glasses-bk">
            <MiniCart />
            <section className="section-glasses">
                {
                    products ?
                        products.filter(el => el.type === 'view').map((el, i) => <Item key={el.type.concat(i.toString())} properties={el} addToCart={addToCart} />)
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

export default Glasses;