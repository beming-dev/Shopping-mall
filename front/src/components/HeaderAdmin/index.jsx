import {Link} from 'react-router-dom'

import './style.css'

export default function HeaderAdmin() {

    function onLogoutClick(){
        fetch("https://localhost:3001/admin/logout", {
            credentials: 'include',
            method: 'post'
        })
        .then(window.location.href="/beming/admin");
    }

    return (
        <div className="header-admin">
            <Link to="/beming/admin/home" className="title">PinkyWay admin</Link>
            <div className="log-btn">
                <input type="button" value="logout" className="logout-btn" onClick={onLogoutClick}/>
            </div>
        </div>
    )
}