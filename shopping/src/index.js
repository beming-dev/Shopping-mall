import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';

import Enter from './domain/Main/index'
import Home from './domain/Home/Home'
import Shop from './domain/Shop/Shop'
import News from './domain/News/News'
import About from './domain/About/About'
import Buy from './domain/Buy/Buy'
import Register from './domain/Register/Register'


class Index extends React.Component{
    render(){
        return(
            <BrowserRouter>
                <Route path="/" component={Enter} exact/>
                <Route path="/home" component={Home} exact/>
                <Route path="/shop" component={Shop} exact/>
                <Route path="/news" component={News} exact/>
                <Route path="/blog" component={About} exact/>
                <Route path="/about" component={About} exact/>
                <Route path="/shop/buy/:id" component={Buy} exact/>
                <Route path="/register" component={Register} exact/>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(
    <Index/>,
    document.getElementById('root') 
);