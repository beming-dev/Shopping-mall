import {react} from 'react'
import {Route} from 'react-router-dom'

import Login from './Login/index'

import './style.css'

export default function Admin(){
    return(
        <div className="admin">
            <Route path="/" component={Login}/>
        </div>
    )   
}

