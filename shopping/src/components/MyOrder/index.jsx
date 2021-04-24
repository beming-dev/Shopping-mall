import React from "react";

import Order from "./Order";

function MyOrder() {
  return (
    <div className="my-order">
      <div>주문 내역</div>
      <ul className="order-list-box">
        <Order />
      </ul>
    </div>
  );
}

export default MyOrder;
