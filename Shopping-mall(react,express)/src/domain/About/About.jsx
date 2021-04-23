import React from 'react';
import '@/domain/About/style.css';

import Header from '#components/Header/index'
import Footer from '#components/Footer/index'
import Nav from '#components/Nav/index'
import Body from '#components/About/body'

class About extends React.Component{
    render() { 
        return (
            <div className="about">
                <Header/>
                <Nav/>
                <Body/>
                <Footer/>
            </div>
        )
    }
}

export default About;