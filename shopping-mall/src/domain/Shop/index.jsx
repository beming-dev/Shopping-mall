import React from "react";
import {Route} from "react-router-dom"
import "./style.css";

import Header from "../../components/Header/index";
import Footer from "../../components/Footer/index";
import Nav from "../../components/Nav/index";
import Body from "../../components/Shop/body";

import Buy from "../Buy/index";
import Pay from "../Pay/index";

class Shop extends React.Component {
  render() {
    return (
      <div className="shop">
        <Header />
        <Nav />
        <Route path="/shop" component={Body} exact/>
        <Route path="/shop/buy/:id" component={Buy}/>
        <Route path="/shop/pay/:id" component={Pay}/>
        <Footer />
      </div>
    );
  }
}

export default Shop;
