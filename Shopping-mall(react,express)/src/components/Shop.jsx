import React from 'react';
import '../css/shop.css';

import Header from './Header'
import Footer from './Footer'
import Nav from './Nav'
import Body from './Body_shop'

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