import React, {useState, useEffect} from 'react'
import {Route} from 'react-router-dom'

import Login from './Login/index'
import Home from './Home/index'

import './style.css'

export default function Admin(){
    const [login, setLogin] = useState(false);

    return(
        <div className="admin">
            <Route exact path="/beming/admin" render={() => <Login setLogin={setLogin}/>}/>
            <Route path="/beming/admin/home" component={Home}/>
        </div>
    )   
}

