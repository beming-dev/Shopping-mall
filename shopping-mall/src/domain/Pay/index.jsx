import React, { useEffect, useState } from 'react'
import "./style.css"

export default function Pay(props){

    const[product, setProduct] = useState({});
    useEffect(() =>{
        let data = {
            id: props.match.params.id,
        }
        fetch("http://localhost:3001/api/orderList", {
            credentials: 'include',
            method:"post",
            headers: { "Content-Type":  "application/json" },
            body: JSON.stringify(data),	
        })
        .then(res => res.json())
        .then(data => {
            setProduct(data[0]);
            console.log(data[0]);
        })
    }, []);

    return (
    <div className="pay">
        <div className="productInfo">
            <img className="image" src="" alt="image"/>
            <div className="name">{product.name}</div>
            <div className="price">{product.price}won</div>
        </div>
        <form action=""></form>
    </div>
    )
}