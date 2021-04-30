import React from "react";
import "./style.css";

import Header from "../../components/Header/index";
import Footer from "../../components/Footer/index";
import Nav from "../../components/Nav/index";

class About extends React.Component {
  render() {
    return (
      <div className="about">
        <Header />
        <Nav />
        <div className="body">
        <div className="about">
          <div className="contact">Contact: pinyway@gmail.com</div>
          <div className="phone">Phone number: 02-XXXX-XXXX</div>
        </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default About;
