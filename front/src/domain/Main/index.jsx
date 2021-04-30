import React from 'react'
import {Link} from 'react-router-dom'
import './style.css'

class Enter extends React.Component{
    render(){
        return (
            <div className="gradient">
                <Link to="/home" className="enter">Welcome</Link>
            </div>
        )
    }
}

export default Enter