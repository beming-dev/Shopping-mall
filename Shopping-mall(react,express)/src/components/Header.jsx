import React from 'react';

function onLoginButtonClick(){
    const loginBody = document.querySelector('.login-body');
    loginBody.style.display="flex";

}

class Header extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username:null
        };
    }

    componentDidMount(){
        fetch('http://localhost:3001/api')
        .then(res=>res.json())
        .then(data=>this.setState({username:data.username}));
    }

    render(){
        const {username} = this.state;
        return (
            <div className="header">
                <a href="/home" className="title">{username ? `PinkyWay ${username}` : 'PinkyWay'}</a>
                <div className="login-box">
                    <button className="login" onClick={onLoginButtonClick}>login</button>
                    <button className="register" onClick={()=>{window.location.href='/register'}}>register</button>
                </div>
            </div>
        )
    }
}

export default Header