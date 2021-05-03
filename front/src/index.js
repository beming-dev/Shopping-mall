import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

import Enter from "./domain/Main/index";
import Home from "./domain/Home/index";
import Shop from "./domain/Shop/index";
import News from "./domain/News/index";
import About from "./domain/About/index";
import Register from "./domain/Register/index";
import MyPage from "./domain/MyPage/index";
import Seller from "./domain/Seller/index";
import ProductRegistration from "./domain/ProductRegistration/index";
import Admin from "./domain/Admin/index";

class Index extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/" component={Enter} exact />
        <Route path="/home" component={Home} exact />
        <Route path="/shop" component={Shop} />
        <Route path="/news" component={News} />
        <Route path="/blog" component={About} />
        <Route path="/about" component={About} />
        <Route path="/register" component={Register} />
        <Route path="/myPage" component={MyPage} />
        <Route path="/seller-registration" component={Seller} />
        <Route path="/product-registration" component={ProductRegistration} />
        <Route path="/beming/admin" component={Admin} />
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById("root"));
