import React from "react";
import "../About/index";

import Header from "../../components/Header/index";
import Footer from "../../components/Footer/index";
import Nav from "../../components/Nav/index";

class About extends React.Component {
  render() {
    return (
      <div className="blog">
        <Header />
        <Nav />
        <Footer />
      </div>
    );
  }
}

export default About;
