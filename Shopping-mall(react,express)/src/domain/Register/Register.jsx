import React from 'react';
import '@/domain/Register/style.css'

import Header from '#components/Header/index'
import Footer from '#components/Footer/index'
import Nav from '#components/Nav/index'
import Body from '#components/Register/body'

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