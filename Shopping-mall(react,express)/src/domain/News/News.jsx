import React from 'react'
import '@/domain/News/style.css'

import Header from '#components/Header/index'
import Footer from '#components/Footer/index'
import Nav from '#components/Nav/index'
import Body from '#components/News/body'

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