import React, { useEffect, useState } from "react";

import Order from "./Order";

function MyOrder() {
  const [orderList, setOrderList] = useState({});
  useEffect(() => {
    fetch("https://localhost:3001/api/itemInfo")
      .then({
        credentials: "include",
      })
      .then((res) => res.json())
      .then((data) => {
        setOrderList(data);
      });
  }, []);
  console.log(orderList);
  return (
    <div className="my-order">
      <div className="text">주문 내역</div>
      <ul className="order-list-box">
        <Order />
      </ul>
    </div>
  );
}

export default MyOrder;
