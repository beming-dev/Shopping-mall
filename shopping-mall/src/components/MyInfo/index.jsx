import {useEffect, useState} from 'react'
import './style.css'

export default function MyInfo() {

  const[loginInfo, setLoginInfo] = useState({});

  useEffect(() => {
    fetch("http://localhost:3001/api/loginInfo", {
      method:"post",
      credentials: "include"   })
      .then(res => res.json())
      .then(loginInfo =>{
        setLoginInfo(loginInfo[0]);
      })
  }, []);
  return <div className="myInfo">
    <form action="http://localhost:3001/process_update_info" className="field" method="post">
        <div className="explain">회원정보수정</div>
        <label htmlFor="id" className="label_id">id</label>
        <input id="id" name="id" value={loginInfo.id}></input>
        <button  className="checkID">id check</button>
        <label htmlFor="pw" className="label_pw">password</label>
        <input type="password" id="pw" name="pw" ></input>
        <label htmlFor="pwc" className="label_pwc">password check</label>
        <input type="password" id="pwc" name="pwc" ></input>
        <label htmlFor="email" className="label_email" >email</label>
        <input type="email" id="email" name="email" value={loginInfo.email}></input>
        <label htmlFor="birth">birth</label>
        <input type="date" id="birth" name="birth" value={loginInfo.date}></input>
        
        <input type="submit" className="submit"  ></input>
    </form>
  </div>;
}
