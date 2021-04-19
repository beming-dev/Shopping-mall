import React from "react";
import "../css/login.css";
import "../javascript/event.js";

const onLoginBackClick = () => {
  const loginBody = document.querySelector(".login-body");
  loginBody.style.display = "none";
};

class Login extends React.Component {
  render() {
    return (
      <div className="login-body">
        <div className="login-container" onClick={onLoginBackClick}></div>
        <form action="/process_login" method="post" className="login-box">
          <label htmlFor="login_id">id
            <input id="login_id"></input>
          </label>
          <label htmlFor="login_pw">password
            <input id="login_pw"></input>
          </label>
          <input type="submit" className="login_btn" value="login"></input>
          <a href="/register" className="login_register">register</a>
        </form>
      </div>
    );
  }
}

export default Login;
