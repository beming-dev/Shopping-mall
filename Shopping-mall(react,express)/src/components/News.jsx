import React from 'react'
import '../css/news.css'

import Header from './Header'
import Footer from './Footer'
import Nav from './Nav'
import Body from './Body_news'

class News extends React.Component{
    render() { 
        return (
            <div className="news">
                <Header/>
                <Nav/>
                <Body/>
                <Footer/>
            </div>
        )
    }
}

export default News