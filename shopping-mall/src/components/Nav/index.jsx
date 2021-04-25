import React from "react";
import { Link } from "react-router-dom";

class Nav extends React.Component {
  render() {
    return (
      <ul className="nav">
        <Link to="/home" className="navItem">
          <li>Home</li>
        </Link>
        <Link to="/shop" className="navItem">
          <li>Shop</li>
        </Link>
        <Link to="/news" className="navItem">
          <li>news</li>
        </Link>
        <Link to="/blog" className="navItem">
          <li>Blog</li>
        </Link>
        <Link to="/about" className="navItem">
          <li>About us</li>
        </Link>
      </ul>
    );
  }
}

export default Nav;
