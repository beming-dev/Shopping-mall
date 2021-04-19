import React from 'react';
import '../css/about.css';

import Header from './Header'
import Footer from './Footer'
import Nav from './Nav'
import Body from './Body_about'

class About extends React.Component{
    render() { 
        return (
            <div className="blog">
                <Header/>
                <Nav/>
                <Body/>
                <Footer/>
            </div>
        )
    }
}

export default About;