import React from 'react';

import Login from './Login'

class Header extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username:null,
            login:null
        };
        this.isLogined = this.isLogined.bind(this);
        this.onLoginButtonClick = this.onLoginButtonClick.bind(this);
        this.onLogoutButtonClick = this.onLogoutButtonClick.bind(this);
    }

    componentDidMount(){
        fetch("http://localhost:3001/api/isLogined", {
          method: 'post',
          credentials: 'include'
        })
        .then(data => data.json())
        .then(login =>{
            this.setState({'login': login});
        })
      }    

    isLogined(login){
        this.setState({'login': login});
    }

    onLoginButtonClick(){
        const loginBody = document.querySelector('.login-body');
        loginBody.style.display="flex";
    }

    onLogoutButtonClick(e){
        fetch('http://localhost:3001/process_logout',{
          method:'post',
          credentials:'include'
        })
        .then(res=>res.json())
        .then(login=>{
            console.log(login);
            this.setState({'login':login});
        })
      }

    render(){
        let log;
        if(this.state.login){
            log = "logout";
            this.onLogButtonClick = this.onLogoutButtonClick;
        }else{
            log = "login";
            this.onLogButtonClick = this.onLoginButtonClick;
        }
        return (
            <div className="header">
                <a href="/home" className="title">PinkyWay</a>
                <div className="login-box2">
                    <button className="login" onClick={this.onLogButtonClick}>{log}</button>
                    <button className="register" onClick={()=>{window.location.href='/register'}}>register</button>
                </div>
                <Login isLogined={this.isLogined}/>
            </div>
        )
    }
}

export default Header