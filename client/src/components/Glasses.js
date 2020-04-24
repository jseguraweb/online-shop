import React, { useContext } from 'react';
import { ContextTotal } from './Context';
import '../styles/Glasses.scss';
import { Route } from 'react-router-dom';
import Item from './Item';
import MiniCart from './MiniCart';


const Glasses = () => {

    const { setTotal, setCart, glasses } = useContext(ContextTotal);


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
        fetch('http://localhost:4000/addtocart', options)
            .then(res => res.json())
            .then(res1 => {
                const response = res1.cart;
                console.log('RESPONSE FROM SERVER:', response);
                let newTotal = response.reduce((acc, el) => acc += el.itemAddedPrice * el.itemAddedQuantity, 0).toFixed(2);
                setTotal(newTotal);
                setCart(response);
            })
    };


    const allViewglasses = glasses.filter(el => el.type === 'view').map(el => <Item key={el._id} properties={el} addToCart={addToCart} />);


    console.log('GLASSES RENDERING...', allViewglasses)

    return (

        <div className="glasses-bk">
            <MiniCart />
            <section className="section-glasses">
                {
                    allViewglasses
                }
            </section>
            <Route path="/" />
        </div>

    );
}

export default Glasses;