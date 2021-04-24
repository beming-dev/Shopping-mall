import React from "react";
import "./style.css";
import { Route } from "react-router-dom";

import Header from "../../components/Header/index";
import Footer from "../../components/Footer/index";
import Nav from "../../components/Nav/index";
import MyNav from "../../components/MyNav/body";

import Order from "../../components/MyOrder/index";
// import Purchase from "../../components/MyPurchase/index";
// import Like from "../../components/MyLike/index";
// import Coupon from "../../components/MyCoupon/index";
// import Recent from "../../components/MyRecent/index";
// import Info from "../../components/MyInfo/index";

class Shop extends React.Component {
  render() {
    return (
      <div className="shop">
        <Header />
        <div className="shop-body">
          <MyNav />
          <Route path="/myPage/order" component={Order} />
          <Route path="/myPage/purchase" component={Order} />
          <Route path="/myPage/like" component={Order} />
          <Route path="/myPage/coupon" component={Order} />
          <Route path="/myPage/recent" component={Order} />
          <Route path="/myPage/info" component={Order} />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Shop;
