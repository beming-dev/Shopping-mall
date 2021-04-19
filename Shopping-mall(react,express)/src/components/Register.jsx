import React from 'react';
import '../css/register.css'

import Header from './Header'
import Footer from './Footer'
import Nav from './Nav'
import Body from './Body_register'

class Register extends React.Component{
    render(){
        return(
            <div className="register-container">
                <Header/>
                <Nav/>
                <Body/>
                <Footer/>
            </div>
        )
    }
}

export default Register