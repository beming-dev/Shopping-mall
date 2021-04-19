import React from 'react';
import '../css/buy.css';

import Header from './Header'
import Footer from './Footer'
import Nav from './Nav'
import Body from './Body_buy'

class Buy extends React.Component{
    render() { 
        return (
            <div className="buy">
                <Header/>
                <Nav/>
                <Body id={this.props.match.params.id}/>
                <Footer/>
            </div>
        )
    }
}

export default Buy;