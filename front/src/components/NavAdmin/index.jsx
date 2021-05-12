import './style.css'
import {Link} from 'react-router-dom'

export default function NavAdmin(props){
    return(
        <ul className="nav-admin">
            <Link to="/beming/admin/userInfo">회원정보관리</Link>
            <Link to="/beming/admin/orderInfo">주문관리</Link>
            <Link to="#!">공지사항</Link>
        </ul>
    )
}