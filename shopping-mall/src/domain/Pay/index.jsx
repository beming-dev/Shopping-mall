import React, { useEffect, useState } from 'react'
import "./style.css"

import Postcode from './Postcode'

export default function Pay(props){
    let payData = {
        pg:'kakaopay',
        pay_method:'card',
        merchant_uid:'merchant_' + new Date().getTime(),
        amount: 1000,
        name: 'test',
        buyer_name: '',
        buyer_tel: '',
        buyer_email: '',
        buyer_addr: '',
        buyer_postcode: '',
    }

    const[product, setProduct] = useState({});
    const[user, setUser] = useState({});

    useEffect(() => {
        fetch("http://localhost:3001/api/loginInfo",{
            credentials: 'include',
            method:"post",
        })
        .then(res => res.json())
        .then(data =>{
            setUser(data[0]);
            console.log(data);
            payData.buyer_name = data[0].id;
            payData.buyer_email = data[0].email;
        })
    }, []);

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
        })
    }, []);

    function onClick(){
        let daum = document.querySelector(".daum");

        daum.classList.toggle('invisible');
    }

    function onSubmit(){
        let buyerName = document.querySelector('#buyer_name').value;
        let buyerTel = document.querySelector('#buyer_tel').value;
        let buyerPostcode = document.querySelector('#postcode').value;
        let buyerAddress = document.querySelector('#address').value;
        let buyerAddress2 = document.querySelector('#detailAddress').value;
        payData.buyer_name = buyerName;
        payData.buyer_tel = buyerTel;
        payData.buyer_postcode = buyerPostcode;
        payData.buyer_addr = buyerAddress + buyerAddress2;

        const {IMP} = window;
        IMP.init('imp85727494');

        
        IMP.request_pay(payData, callback);

        function callback(response){
            console.log(1);
        const {
            success,
            error_msg,
            } = response;
        
            if (success) {
            alert('결제 성공');
            } else {
            alert(`결제 실패: ${error_msg}`);
            }
        }
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
            <input type="text" id="buyer_tel"/>

            <div>
                <input type="text" id="postcode" placeholder="우편번호"/>
                <input type="button" value="우편번호 찾기" id="postcode-btn" onClick={onClick}/><br/>
                <div className="daum">
                    <Postcode/>
                </div>
            </div>
            
            <input type="text" id="address" placeholder="주소"/><br/>
            <input type="text" id="detailAddress" placeholder="상세주소"/>
            <input type="submit" onClick={onSubmit}/>
        </form>
    </div>
    )
}