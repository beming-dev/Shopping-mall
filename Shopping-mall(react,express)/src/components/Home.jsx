import React from 'react';
import '../css/home.css';

import Header from './Header'
import Footer from './Footer'
import Nav from './Nav'
import Body from './Body_home'
import Login from './Login'

class Home extends React.Component{
    render() { 
        return (
            <div className="home">
                <Header/>
                <Nav/>
                <Body/>
                <Footer/>
                <Login/>
            </div>
        )
    }
}

export default Home;