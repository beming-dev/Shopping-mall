import React, {useState, useEffect} from 'react'
import './style.css'

function onSubmit(){

}

export default function Login(props){
    const [loginInfo, setLoginInfo] = useState({'id': '', 'pw': ''});

    function onChange(e){
        setLoginInfo({
            ...loginInfo,
            [e.target.name]:e.target.value
        });
    }

    function onSubmit(e){
        e.preventDefault();

        const data = loginInfo;
        fetch("https://localhost:3001/admin/Login", {
            credentials: 'include',
            method: 'post',
            headers: {"Content-Type": "application/json"},
            body:JSON.stringify(data)
        })
        .then(res => res.json())
        .then(result => {
            if(result.login){
                props.setLogin(true);
                alert("login success");
            }else{
                alert("login false");
            }
        })
    }

    return(
        <div className="admin-login">
            <form onSubmit = {onSubmit} className="login-box">
                <label htmlFor="admin-id">id</label>
                <input type="text" id="admin-id" name="id" value={loginInfo.id} onChange={onChange}/>
                <label htmlFor="admin-pw">password</label>
                <input type="password" id="admin-pw" name="pw" value={loginInfo.pw} onChange={onChange}/>

                <input type="submit" className = "submit"/>
            </form>
        </div>
    )
}