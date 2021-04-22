import React from 'react';

class Header extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username:null
        };
        this.onLoginButtonClick = this.onLoginButtonClick.bind(this);
        this.onLogoutButtonClick = this.onLogoutButtonClick.bind(this);
    }

    onLoginButtonClick(){
        const loginBody = document.querySelector('.login-body');
        loginBody.style.display="flex";
    }

    onLogoutButtonClick(e){
        let loginBtn = document.querySelector('.login-box .login');
        let logoutBtn = document.querySelector('.login-box .logout');
        fetch('http://localhost:3001/process_logout',{
          method:'post',
          credentials:'include'
        }).then(data=>{
            loginBtn.style.display = "inline-block";
            logoutBtn.style.display = "none";
        })
      }

    render(){
        const {username} = this.state;
        return (
            <div className="header">
                <a href="/home" className="title">{username ? `PinkyWay ${username}` : 'PinkyWay'}</a>
                <div className="login-box">
                    <button className="login" onClick={this.onLoginButtonClick}>login</button>
                    <button className="logout" onClick={this.onLogoutButtonClick}>logout</button>
                    <button className="register" onClick={()=>{window.location.href='/register'}}>register</button>
                </div>
            </div>
        )
    }
}

export default Header