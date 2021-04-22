import React from 'react';
import '../css/home.css';

import Header from './Header'
import Footer from './Footer'
import Nav from './Nav'
import Body from './Body_home'

class Home extends React.Component{
    render() { 
        return (
            <div className="home">
                <Header/>
                <Nav/>
                <Body/>
                <Footer/>
            </div>
        )
    }
}

export default Home;