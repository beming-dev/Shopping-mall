import React from 'react';
import '@/domain/Home/style.css';

import Header from '#components/Header/index'
import Footer from '#components/Footer/index'
import Nav from '#components/Nav/index'
import Body from '#components/Home/body'

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