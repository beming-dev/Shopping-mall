import React, {useState, useEffect} from 'react'
import {Route, Redirect} from 'react-router-dom'

import Login from './Login/index'
import UserInfo from './UserInfo/index'
import OrderInfo from './OrderInfo/index'

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
            <Route exact path="/beming/admin">
                {login ? <Redirect to="/beming/admin/home" /> : <Login />}
            </Route>
            <Route path="/beming/admin/home">
                {login ? <Redirect to="/beming/admin/userInfo/1" /> : <Redirect to="/beming/admin" />}
            </Route>
            <Route path="/beming/admin/userInfo" component={UserInfo}></Route>
            <Route path="/beming/admin/orderInfo" component={OrderInfo}></Route>
        </div>
    )   
}

