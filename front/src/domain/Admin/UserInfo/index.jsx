import React, {useState, useEffect} from 'react'

import NavAdmin from '../../../components/NavAdmin/index'
import HeaderAdmin from '../../../components/HeaderAdmin/index'
import UserAdmin from '../../../components/UserAdmin/index'

import './style.css'

export default function Home(props){
    const [userData, setUserData] = useState([{}]);
    const [paging, setPaging] = useState([]);
    const [page, setPage] = useState(1);
    const [checkedUser, setCheckedUser] = useState(new Set());

    useEffect(() => {
        let p = paging;
        fetch("https://localhost:3001/admin/userCount", {
            credentials: 'include',
            method: 'post'
        })
        .then(res => res.json())
        .then(count => {
            for(let i=1; i<=(count.count/10 + 1); i++){
                p.push(i);
                setPaging([...p]);
            }
        })
        return ()=>setPage([]) 
    }, []);

    useEffect(() => {
        fetch("https://localhost:3001/admin/user", {
            credentials: 'include',
            method: 'post',
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({"page": page})
        })
        .then(res => res.json())
        .then(data => {
            setUserData(data);
        })
    }, [page]);

    function onPagingClick(e){
        setPage(e.target.innerText*1);
    }

    function onWithdrawalClick(){
        console.log(checkedUser);
        fetch("https://localhost:3001/admin/user/withdrawal", {
            credentials: 'include',
            method: 'post',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"checkedUser":Array.from(checkedUser)})
        })
        .then(res => res.json())
        .then(result => {
            if(result){
                window.location.reload();
            }
        });
    }

    function onSendMainClick(){
        fetch("https://localhost:3001/admin/user/sendMail", {
            credentials: 'include',
            method: 'post',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"checkedUser":checkedUser})
        })
        .then(res => res.json())
        .then(data => {

        });
    }

    return (
        <div className="user-info">
            <HeaderAdmin />
            <NavAdmin />
            <div className="body">
                <div className="buttons">
                    <button onClick={onWithdrawalClick}>탈퇴</button>
                    <button onClick={onSendMainClick}>메일보내기</button>
                </div>
                <table >
                    <tbody className="user-table">
                        {userData.map((userInfo, index) =>
                            <UserAdmin  key={index} userData={userInfo} setCheckedUser={setCheckedUser} checkedUser={checkedUser}/>
                        )}
                    </tbody>
                </table>
                <div className="paging">
                    {paging.map((i)=>
                        <div key={i} onClick={onPagingClick}>{i}</div>
                    )}
                </div>
            </div>
        </div>
    )
}