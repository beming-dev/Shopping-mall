import React from "react";
import {Link} from 'react-router-dom'
import "./style.css";
import "../../../javascript/event.js";

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        "login": '',
        "id": '',
        "pw": '',
    };
    
    this.onLoginBackClick = this.onLoginBackClick.bind(this);
    this.onLoginClick = this.onLoginClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onLoginBackClick(){
    const loginBody = document.querySelector(".login-body");
    loginBody.style.display = "none";
  };

  onChange(e){
    this.setState({
        [e.target.name]: e.target.value,
    })
  }

  onLoginClick(e){
    e.preventDefault();
    const data = {
        "id": this.state.id,
        "pw": this.state.pw
    }

    fetch('https://localhost:3001/process_login',{
        method:"post",
        credentials: 'include',
        headers: { "":  "application/json" },
        body: JSON.stringify(data),	
    })
    .then(res => res.json())
    .then(json => {
        let thisObject = document.querySelector('.login-body');
        if(json.login){
            alert(json.message);  //알람!
            this.setState({
                login: true
            });
            this.props.isLogined(this.state.login);
            thisObject.style.display = "none";
        }
        else{
            alert(json.message);
            this.setState({
                login: false
            });
        }
    });
}

  render() {
    return (
      <div className="login-body">
        <div className="login-container" onClick={this.onLoginBackClick}></div>
        <form method="post" className="login-box">
          <label htmlFor="login_id">id
            <input name="id" id="login_id" onChange={this.onChange}></input>
          </label>
          <label htmlFor="login_pw">password
            <input name="pw" id="login_pw" onChange={this.onChange}></input>
          </label>
          <input type="submit" className="login-btn" value="login" onClick={this.onLoginClick}></input>
          <Link to="/register" className="login-register">register</Link>
        </form>
      </div>
    );
  }
}

export default Login;
