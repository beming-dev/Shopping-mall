import React, {useEffect} from 'react'


export default function Home(props){
    useEffect(() => {
        if(!props.isLogined){
            window.location.href = "https://localhost:3001/beming/admin";
        }
    });

    return (
        <div className="adminHome">
            <li>회원정보관리</li>
            <li>주문관리</li>
            <li>공지사항</li>
        </div>
    )
}