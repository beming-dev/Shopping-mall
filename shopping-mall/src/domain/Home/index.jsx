import React from "react";
import "./style.css";

import Header from "../../components/Header/index";
import Footer from "../../components/Footer/index";
import Nav from "../../components/Nav/index";

class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <Header />
        <Nav />
        <div className="body">
              <div className="part part1">
                  <img src='/images/workplace.jpg' alt="" className="image image1"/>
                  <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus placeat doloribus quod culpa vel magni sint accusamus. Quidem aspernatur nemo voluptates recusandae unde itaque ea quo voluptas cum ex. Pariatur.</p>
              </div>
              <div className="part part2">
                  <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus placeat doloribus quod culpa vel magni sint accusamus. Quidem aspernatur nemo voluptates recusandae unde itaque ea quo voluptas cum ex. Pariatur.</p>
                  <img src="/images/flower.jpg" alt="" className="image image2"/>
              </div>
              <div className="part part3">
                  <img src="/images/workplace.jpg" alt="" className="image image3"/>
                  <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus placeat doloribus quod culpa vel magni sint accusamus. Quidem aspernatur nemo voluptates recusandae unde itaque ea quo voluptas cum ex. Pariatur.</p>
              </div>
          </div>
        <Footer />
      </div>
    );
  }
}

export default Home;
