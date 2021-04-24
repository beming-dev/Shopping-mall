import React from "react";
import { Link } from "react-router-dom";

class Body extends React.Component {
  render() {
    return (
      <div className="mypage">
        <ul className="my-nav">
          <Link to={`${this.props.match.url}/buy`}>주문 내역</Link>
          <Link to="#!">구매 내역</Link>
          <Link to="#!">좋아요</Link>
          <Link to="#!">쿠폰</Link>
          <Link to="#!">최근 본 상품</Link>
          <Link to="#!">회원 정보 수정</Link>
        </ul>
        <div>hello</div>
      </div>
    );
  }
}

export default Body;
