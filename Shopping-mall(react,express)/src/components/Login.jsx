import React from "react";
import "../css/login.css";
import "../javascript/event.js";

const onLoginBackClick = () => {
  const loginBody = document.querySelector(".login-body");
  loginBody.style.display = "none";
};

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        "login": '',
        "id": '',
        "pw": '',
    };
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e){
    this.setState({
        [e.target.name]: e.target.value,
    })
  }

  onClick(e){
    e.preventDefault();
    const data = {
        "id": this.state.id,
        "pw": this.state.pw
    }

    fetch('http://localhost:3001/process_login',{ // localhost 3001번 포트 checkid라우터를 찾는다
        method:"post",
        headers: { "Content-Type":  "application/json" },
        body: JSON.stringify(data),	// json화 해버리기
    })
    .then(res => res.json())
    .then(json => {
        if(json.login){
            alert(json.message);  //알람!
            this.setState({
                login: false
            })
        }
        else{
            alert(json.message);
            this.setState({
                login: true
            })
        }
    });
}

  render() {
    return (
      <div className="login-body">
        <div className="login-container" onClick={onLoginBackClick}></div>
        <form action="/process_login" method="post" className="login-box">
          <label htmlFor="login_id">id
            <input name="id" id="login_id" onChange={this.onChange}></input>
          </label>
          <label htmlFor="login_pw">password
            <input name="pw" id="login_pw" onChange={this.onChange}></input>
          </label>
          <input type="submit" className="login_btn" value="login" onClick={this.onClick}></input>
          <a href="/register" className="login_register">register</a>
        </form>
      </div>
    );
  }
}

export default Login;
