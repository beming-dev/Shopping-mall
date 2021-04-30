import React from "react";
import {Link} from 'react-router-dom'

import './style.css'

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
          <Link to="#!">Info</Link>
          <Link to="#!">Support</Link>
          <Link to="#!">Marketing</Link>
        </div>
        <div className="explain">
          <Link to="#!">Terms of Use</Link>
          <Link to="#!">Privacy Policy</Link>
        </div>
        <div className="copyright">
          <Link to="#!">ⓒ 2021 beming-dev</Link>
        </div>
      </div>
    );
  }
}

export default Footer;
