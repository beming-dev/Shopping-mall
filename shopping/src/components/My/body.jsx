import React from 'react';

class Body extends React.Component{
    render(){
        return (
            <div className="mypage">
                <ul className="my-nav">
                    <a href="/myPage/buy">주문 내역</a>
                    <a href="#!">구매 내역</a>
                    <a href="#!">좋아요</a>
                    <a href="#!">쿠폰</a>
                    <a href="#!">최근 본 상품</a>
                    <a href="#!">회원 정보 수정</a>
                </ul>
                <div>
                    hello
                </div>
            </div>
        )
    }
}

export default Body