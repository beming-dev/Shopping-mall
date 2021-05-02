import react from "react";
import "./style.css";

import Header from "../../components/Header/index";
import Footer from "../../components/Footer/index";
import Nav from "../../components/Nav/index";

export default function ProductRegistration() {
  return (
    <div>
      <Header />
      <Nav />
      <div className="product-registration">
        <form action="" method="post" className="register-form">
          <label htmlFor="business-number">business-number</label>
          <input id="business-number" type="text" />
          <label htmlFor="phone">phone number</label>
          <input id="phone" type="text" />
          <input type="submit" className="submit" />
        </form>
      </div>
      ;
      <Footer />
    </div>
  );
}
