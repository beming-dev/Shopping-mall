import React from "react";
import { Link } from "react-router-dom";

class Body extends React.Component {
  render() {
    return (
      <ul className="my-nav">
        <Link to="/myPage/order">주문 내역</Link>
        <Link to="/myPage/purchase">구매 내역</Link>
        <Link to="/myPage/like">좋아요</Link>
        <Link to="/myPage/coupon">쿠폰</Link>
        <Link to="/myPage/recent">최근 본 상품</Link>
        <Link to="/myPage/info">회원 정보 수정</Link>
      </ul>
    );
  }
}

export default Body;
