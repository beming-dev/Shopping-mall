import React, { useEffect, useState } from 'react'
import "./style.css"

import Postcode from './Postcode'

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

    function onClick(){
        let daum = document.querySelector(".daum");

        daum.classList.toggle('invisible');
    }
    

    return (
    <div className="pay">
        <div className="productInfo">
            <img className="image" src="" alt="image"/>
            <div className="name">{product.name}</div>
            <div className="price">{product.price}won</div>
        </div>
        <form action="" className="payInfo">
            <label htmlFor="buyer_name">name</label>
            <input type="text" id="buyer_name"/>
            <label htmlFor="buyer_tel">tel</label>
            <input type="text" id="buyer_addr"/>

            <div>
                <input type="text" id="postcode" placeholder="우편번호"/>
                <input type="button" value="우편번호 찾기" id="postcode-btn" onClick={onClick}/><br/>
                <div className="daum">
                    <Postcode/>
                </div>
            </div>
            
            <input type="text" id="address" placeholder="주소"/><br/>
            <input type="text" id="detailAddress" placeholder="상세주소"/>
        </form>
    </div>
    )
}