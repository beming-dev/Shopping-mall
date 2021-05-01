import React from "react";

import Login from "./Login/index";
import { Link } from "react-router-dom";
import "./style.css";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      login: null,
    };
    this.isLogined = this.isLogined.bind(this);
    this.onLoginButtonClick = this.onLoginButtonClick.bind(this);
    this.onLogoutButtonClick = this.onLogoutButtonClick.bind(this);
    this.onRegisterButtonClick = this.onRegisterButtonClick.bind(this);
    this.onMyButtonClick = this.onMyButtonClick.bind(this);
  }

  componentDidMount() {
    fetch("https://localhost:3001/api/isLogined", {
      method: "post",
      credentials: "include",
    })
      .then((data) => data.json())
      .then((login) => {
        this.setState({ login: login });
      });
  }

  isLogined(login) {
    this.setState({ login: login });
  }

  onLoginButtonClick() {
    const loginBody = document.querySelector(".login-body");
    loginBody.style.display = "flex";
  }

  onLogoutButtonClick(e) {
    fetch("https://localhost:3001/process_logout", {
      method: "post",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((login) => {
        this.setState({ login: login });
        window.location.href = "/home";
      });
  }

  onRegisterButtonClick(e) {
    window.location.href = "/register";
  }

  onMyButtonClick(e) {
    window.location.href = "/myPage";
  }

  render() {
    let log, right;
    if (this.state.login) {
      log = "logout";
      right = "MyPage";
      this.onLogButtonClick = this.onLogoutButtonClick;
      this.onRightButtonClick = this.onMyButtonClick;
    } else {
      right = "register";
      log = "login";
      this.onLogButtonClick = this.onLoginButtonClick;
      this.onRightButtonClick = this.onRegisterButtonClick;
    }
    return (
      <div className="header">
        <Link to="/home" className="title">
          PinkyWay
        </Link>
        <div className="login-box2">
          <button className="login" onClick={this.onLogButtonClick}>
            {log}
          </button>
          <button className="register" onClick={this.onRightButtonClick}>
            {right}
          </button>
        </div>
        <Login isLogined={this.isLogined} />
      </div>
    );
  }
}

export default Header;
