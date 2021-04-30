import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'

import Item from '../../../components/Item/index'

import './style.css'

export default function Basket(){

    const [myBasket, setMyBasket] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    
    useEffect(() => {
        fetch("https://localhost:3001/api/basket", {
            credentials: 'include',
            method: 'post',
        })
        .then(res=>res.json())
        .then(data=>{
            setMyBasket(data);
        })
    }, []);

    // why
    useEffect(() => {
        let i=0;
        myBasket.forEach((item, ii) =>{
            i+= item.price * item.count;
        });
        setTotalPrice(i);
    }, [myBasket]);

    return (
        <div className="basket">
            {myBasket.map(basketItem => 
            <Item 
            key={basketItem.cart_id}
            itemInfo={basketItem} 
            basket={true}
            />)}

            <div className="totalPrice">
                total price: {totalPrice} won
            </div>
            <Link to="/shop/pay/basket" className="pay-btn">결제하기</Link>
        </div>
    )
}