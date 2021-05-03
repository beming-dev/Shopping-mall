import React, {useState, useEffect} from 'react'
import './style.css'

function onSubmit(){

}

export default function Login(){
    const [loginInfo, setLoginInfo] = useState({'id': '', 'pw': ''});

    function onChange(e){
        let my = loginInfo;
        my[e.target.name] = e.target.value;
        setLoginInfo(my);
        console.log(my);
    }

    useEffect(() => {

    }, [loginInfo])

    return(
        <div className="admin-login">
            <form action="https://localhost:3001/admin/Login" method="post" className="login-box">
                <label htmlFor="admin-id">id</label>
                <input type="text" id="admin-id" name="id" value={loginInfo.id} onChange={onChange}/>
                <label htmlFor="admin-pw">password</label>
                <input type="text" id="admin-pw" name="pw" value={loginInfo.id} onChange={onChange}/>

                <input type="submit" className = "submit"/>
            </form>
        </div>
    )
}