import React from 'react';
import './style.css';

import Header from '../../components/Header/index'
import Footer from '../../components/Footer/index'
import Nav from '../../components/Nav/index'
import Body from '../../components/My/body'

class Shop extends React.Component{
    render() { 
        return (
            <div className="shop">
                <Header/>
                <Nav/>
                <Body/>
                <Footer/>
            </div>
        )
    }
}

export default Shop;