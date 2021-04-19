import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import './css/header.css';
import './css/footer.css';

import Enter from './components/Main'
import Home from './components/Home'
import Shop from './components/Shop'
import News from './components/News'
import About from './components/About'
import Buy from './components/Buy'
import Register from './components/Register'


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