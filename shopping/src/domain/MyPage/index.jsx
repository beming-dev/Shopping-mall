import React from 'react';
import './style.css';
import {Route} from 'react-router-dom'

import Header from '../../components/Header/index'
import Footer from '../../components/Footer/index'
import Nav from '../../components/Nav/index'
import Body from '../../components/My/body'

import Home from './home'

class Shop extends React.Component{
    render() { 
        return (
            <div className="shop">
                <Header/>
                <Body/>
                <Footer/>
                <Route path="/myPage/buy" component={Home} />
            </div>
        )
    }
}

export default Shop;