import React, {useState, useEffect} from 'react'
import {Route, Redirect} from 'react-router-dom'

import Login from './Login/index'
import Home from './Home/index'

import './style.css'

export default function Admin(){
    const [login, setLogin] = useState(false);
    useEffect(() => {
        fetch("https://localhost:3001/api/adminLogined", {
            credentials: "include",
            method: "post"
        })
        .then(res => res.json())
        .then(login =>{
            setLogin(login);
        })
    }, [login])

    return(
        <div className="admin">
            <Route path="/beming/admin">
                {login ? <Redirect to="/beming/admin/home" /> : <Login />}
            </Route>
            <Route path="/beming/admin/home">
                {login ? <Home /> : <Redirect to="/beming/admin" />}
            </Route>
        </div>
    )   
}

