import {useEffect, useState} from 'react'
import './style.css'

export default function MyInfo() {

  let[loginInfo, setLoginInfo] = useState({});
  let[submit, setSubmit] = useState(false);
  
  function onClick(e){
    let pw = document.querySelector('.myInfo #pw');
    if(!submit){
      alert('password diff');
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
    
    if(pw.value.length < 6 || pw.value.length > 30){
      alert('password wrong 8~30length');
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }

  function onBlur(){
    let pw = document.querySelector('.myInfo #pw');
    let pwc = document.querySelector('.myInfo #pwc');
    let labelPwc = document.querySelector('.myInfo .label_pwc');

    if(pw.value != pwc.value){
      labelPwc.classList.add('correspond');
      setSubmit(false);
    }else{
      labelPwc.classList.remove('correspond');
      setSubmit(true);
      console.log(submit);
    }
  }

  useEffect(() => {
    fetch("https://localhost:3001/api/loginInfo", {
      method:"post",
      credentials: "include"   })
      .then(res => res.json())
      .then(loginInfo =>{
        setLoginInfo(loginInfo[0]);
        console.log(loginInfo[0]);
      })
  }, []);
  return <div className="myInfo">
    <form action="http://localhost:3001/process_update_info" className="field" method="post">
        <div className="explain">회원정보수정</div>
        <label htmlFor="id" className="label_id">id</label>
        <input id="id" name="id" value={loginInfo.id} disabled></input>
        <label htmlFor="pw" className="label_pw">password</label>
        <input type="password" id="pw" name="pw" onBlur={onBlur}></input>
        <label htmlFor="pwc" className="label_pwc">password check</label>
        <input type="password" id="pwc" name="pwc" onBlur={onBlur}></input>
        <label htmlFor="email" className="label_email" >email</label>
        <input type="email" id="email" name="email" value={loginInfo.email} disabled></input>
        <label htmlFor="birth">birth</label>
        <input type="date" id="birth" name="birth" value={loginInfo.date} disabled></input>
        
        <input type="submit" className="submit"  onClick={onClick}></input>
    </form>
  </div>;
}
