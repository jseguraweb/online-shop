import React, { useContext, useEffect } from 'react';
import { ContextTotal } from './Context';
import '../styles/Sunglasses.scss';
import { Route } from 'react-router-dom';
import Item from './Item';
import MiniCart from './MiniCart';


const Sunglasses = () => {

    const { products, setTotal, setCart, getDB } = useContext(ContextTotal);

    const addToCart = (e, item) => {
        e.preventDefault();
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

        <div className="sunglasses-bk">
            <MiniCart />
            <section className="section-sunglasses">
                {
                    products ?
                        products.filter(el => el.type === 'sun').map((el, i) => <Item key={el.type.concat(i.toString())} properties={el} addToCart={addToCart} />)
                        :
                        <p>loading</p>
                }
            </section>
            <Route path="/" />
        </div>
    );
}

export default Sunglasses;
