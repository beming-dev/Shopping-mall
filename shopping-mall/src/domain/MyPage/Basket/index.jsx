import React, {useEffect, useState} from 'react'

import Item from '../../../components/Item/index'

import './style.css'

export default function Basket(){

    const [myBasket, setMyBasket] = useState([]);
    
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

    console.log(myBasket);
    return (
        <div className="basket">
            {myBasket.map(basketItem => <Item key={basketItem.cart_id} itemInfo={basketItem} basket={true}/>)}
        </div>
    )
}