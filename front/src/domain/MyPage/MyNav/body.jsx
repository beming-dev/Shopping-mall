import React from "react";
import { Link } from "react-router-dom";

class Body extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      propuctRegistration: "",
    };

    fetch("https://localhost:3001/api/loginInfo", {
      credentials: "include",
      method: "post",
    })
      .then((res) => res.json())
      .then((user) => {
        if (user[0].seller === 1) {
          this.setState({
            propuctRegistration: (
              <Link to="/product-registration">판매 상품 등록</Link>
            ),
          });
        }
      });
  }

  render() {
    return (
      <ul className="my-nav">
        <Link to="/myPage/order">주문 내역</Link>
        <Link to="/myPage/purchase">구매 내역</Link>
        <Link to="/myPage/basket">장바구니</Link>
        <Link to="/myPage/like">좋아요</Link>
        <Link to="/myPage/coupon">쿠폰</Link>
        <Link to="/myPage/recent">최근 본 상품</Link>
        <Link to="/myPage/info">회원 정보 수정</Link>
        {this.state.propuctRegistration}
      </ul>
    );
  }
}

export default Body;
