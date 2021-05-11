import React, {useState, useEffect} from 'react'
import {Route} from 'react-router-dom'

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
    }, [])

    return(
        <div className="admin">
            <Route exact path="/beming/admin" render={() => <Login setLogin={setLogin} isLogined={login}/>}/>
            <Route path="/beming/admin/home" render={() => <Home isLogined={login}/>}/>
        </div>
    )   
}

