import React, {useEffect, useState} from 'react'

import Item from '../Shop/Item/index'

export default function Basket(){

    const [myBasket, setMyBasket] = useState({});
    
    useEffect(() => {
        fetch("https://localhost:3001/api/basket", {
            credentials: 'include',
            method: 'post',
        })
        .then(res=>res.json())
        .then(data=>{
            setMyBasket(data);
        })
    }, {});

    return (
        <div className="basket">
            
        </div>
    )
}