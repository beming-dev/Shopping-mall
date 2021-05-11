import {Link} from 'react-router-dom'

import './style.css'

export default function HeaderAdmin() {

    function onLogoutClick(){
        console.log(1);
        fetch("https://localhost:3001/admin/logout", {
            credentials: 'include',
            method: 'post'
        })
    }

    return (
        <div className="header-admin">
            <Link to="/beming/admin" className="title">PinkyWay admin</Link>
            <div className="log-btn">
                <input type="button" value="logout" className="logout-btn" onClick={onLogoutClick}/>
            </div>
        </div>
    )
}