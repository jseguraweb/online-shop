import React, { useState, useEffect } from 'react'
import { ContextTotal } from "./Context"


export default function Container(props) {

    const [total, setTotal] = useState(null)
    // console.log('TOTAL: ', total); 
    const [cart, setCart] = useState(null);
    // console.log('CART ITEMS: ', cart);

    //glasses
    const [glasses, setGlasses] = useState(null)

    async function getdb() {
        try {
            let DB = await fetch('http://localhost:4000/getdb');
            console.log(DB);
            let DBFinal = await DB.json();
            console.log('DBFinal: ', DBFinal);
            setCart(DBFinal.Cart);
            setTotal(DBFinal.Cart.reduce((acc, el) => acc += el.itemAddedPrice * el.itemAddedQuantity, 0).toFixed(2));
            setGlasses(DBFinal.Products)
            /*      console.log(sunGlasses, cart ,total) */
        } catch (err) {
            console.log('ERROR!!: ', err);
        }
    };

    useEffect(() => {
        getdb()
        /* console.log(sunGlasses, cart,setCart ,setTotal ,total,disabledButton, setDisabledButton) */
    }, []);

    return (
        <ContextTotal.Provider value={{ glasses, cart, setCart, setTotal, total }}>
            {props.children}
        </ContextTotal.Provider>
    )
}