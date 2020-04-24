import React, { useState, useEffect } from 'react'
import { ContextTotal } from "./Context"


export default function Container(props) {

    const [total, setTotal] = useState(null)
    // console.log('TOTAL: ', total); 
    const [cart, setCart] = useState(null);
    // console.log('CART ITEMS: ', cart);

    //glasses
    const [glasses, setGlasses] = useState(null)

    async function getDB() {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            let response = await fetch('/', options);
            let DB = await response.json();
            console.log('DB: ', DB);
            setCart(DB.cart);
            setTotal(DB.cart.reduce((acc, el) => acc += el.itemAddedPrice * el.itemAddedQuantity, 0).toFixed(2));
            setGlasses(DB.products)
            /*      console.log(sunGlasses, cart ,total) */
        } catch (err) {
            console.log('ERROR!!: ', err);
        }
    };

    useEffect(() => {
        getDB()
        /* console.log(sunGlasses, cart,setCart ,setTotal ,total,disabledButton, setDisabledButton) */
    }, []);

    return (
        <ContextTotal.Provider value={{ glasses, cart, setCart, setTotal, total }}>
            {props.children}
        </ContextTotal.Provider>
    )
}