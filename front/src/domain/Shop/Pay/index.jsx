import React, { useEffect, useState } from 'react'
import "./style.css"

import Postcode from './Postcode'
import Item from '../../../components/Item/index'

export default function Pay(props){
    let payData = {
        pg:'kakaopay',
        pay_method:'card',
        merchant_uid: new Date().getTime(),
        amount: 1,
        name: 'test',
        buyer_name: '',
        buyer_tel: '',
        buyer_email: '',
        buyer_addr: '',
        buyer_postcode: '',
    }

    const[basket, setBasket] = useState(false);
    const[product, setProduct] = useState([{}]);
    const[count, setCount] = useState(1);
    const[totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        fetch("https://localhost:3001/api/islogined", {
            credentials: 'include',
            method: 'post'
        })
        .then(res => res.json())
        .then(login => {
            if(!login) window.location.href = "https://localhost:3000/home"
            else{
                fetch("https://localhost:3001/api/loginInfo",{
                credentials: 'include',
                method:"post",
                })
                .then(res => res.json())
                .then(data =>{
                    payData.buyer_name = data[0].id;
                    payData.buyer_email = data[0].email;
                })
                }
            })
    }, []);

    useEffect(() =>{
        if(props.match.params.id == 'basket'){
            setBasket(true);
            fetch("https://localhost:3001/api/basket", {
                credentials: 'include',
                method:"post",
            })
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                let i=0;
                data.forEach(element => {
                    i += element.price * element.count;
                });
                setTotalPrice(i);
            })
        }
        else{
            let data = {
                id: props.match.params.id,
            }
            fetch("https://localhost:3001/api/itemInfo", {
                credentials: 'include',
                method:"post",
                headers: { "Content-Type":  "application/json" },
                body: JSON.stringify(data),	
            })
            .then(res => res.json())
            .then(data => {
                setProduct([{
                    ...data[0],
                    "count": count,
                }]);
                setTotalPrice(data[0].price);
            })
        }
    }, []);

    useEffect(() => {
        if(props.match.params.id !== "basket"){
            setProduct([{
                ...product[0],
                "count": count,
            }]);
        }
    }, [count]);

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
        
        payData.amount = totalPrice;

        fetch("https://localhost:3001/pay/process_before", {
            method:"post",
            credentials:'include',
            headers: {"Content-Type": "application/json"},
            body:JSON.stringify(payData),
        })

        const {IMP} = window;
        IMP.init('imp85727494');

        IMP.request_pay(payData, callback);

        function callback(response){
            const {
            success,
            error_msg,
            } = response;
        
            if (success) {
                alert("pay complete");
                fetch("https://localhost:3001/pay/complete", {
                    credentials: 'include',
                    method: 'post',
                    headers: {"Content-type": "application/json"},
                    body:JSON.stringify({
                        "imp_uid": response.imp_uid,
                        "merchant_uid": response.merchant_uid,
                        "merchant": product
                    })
                })
                .then(res => res.json())
                .then(result => {
                    if(result.status === "success"){
                        
                    }else{

                    }
                })
            } else {
                alert(error_msg);
            }
        }
    }

    return (
    <div className="pay">

        <div className="productInfo">
            {console.log(product)}
            {product.map((item, index) => 
                <Item 
                    itemInfo = {item}
                    key = {index}
                    setTotalPrice = {setTotalPrice}
                    basket={basket}
                    setCount={setCount}
                />
            )}
        </div>

        <div className="total-price">total amount : {totalPrice}won</div>

        <div className="payInfo" >
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
            <input type="submit" onClick={onSubmit} className="pay_submit" value="pay"/>
        </div>
    </div>
    )
}