import React, {useState, useEffect} from 'react'

import NavAdmin from '../../../components/NavAdmin/index'
import HeaderAdmin from '../../../components/HeaderAdmin/index'
import UserAdmin from '../../../components/UserAdmin/index'

import './style.css'

export default function Home(props){
    const [userData, setUserData] = useState([{}]);
    const [page, setPage] = useState(1);
    useEffect(() => {
        fetch("https://localhost:3001/admin/user", {
            credentials: 'include',
            method: 'post',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"page": props.match.params.page})
        })
        .then(res => res.json())
        .then(data => {
            setUserData(data);
        })
    }, []);

    return (
        <div className="admin-home">
            <HeaderAdmin />
            <NavAdmin />
            <div className="body">
                <table >
                    <tbody className="user-table">
                        {userData.map((userInfo, index) =>
                            <UserAdmin  key={index} userData={userInfo}/>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}