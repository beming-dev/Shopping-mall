import React from "react";

class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <div className="icons">
          <i className="fab fa-facebook"></i>
          <i className="fas fa-camera-retro"></i>
          <i className="fab fa-github-square"></i>
        </div>
        <div className="info">
          <a href="#!">Info</a>
          <a href="#!">Support</a>
          <a href="#!">Marketing</a>
        </div>
        <div className="explain">
          <a href="#!">Terms of Use</a>
          <a href="#!">Privacy Policy</a>
        </div>
        <div className="copyright">
          <a href="#!">ⓒ 2021 beming-dev</a>
        </div>
      </div>
    );
  }
}

export default Footer;
