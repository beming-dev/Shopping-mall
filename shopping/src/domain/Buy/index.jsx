import React from "react";
import "./style.css";

import Header from "../../components/Header/index";
import Footer from "../../components/Footer/index";
import Nav from "../../components/Nav/index";
import Body from "../../components/Buy/body";

class Buy extends React.Component {
  render() {
    return (
      <div className="buy">
        <Header />
        <Nav />
        <Body id={this.props.match.params.id} />
        <Footer />
      </div>
    );
  }
}

export default Buy;
