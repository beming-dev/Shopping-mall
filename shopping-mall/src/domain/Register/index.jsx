import React from "react";
import "./style.css";

import Header from "../../components/Header/index";
import Footer from "../../components/Footer/index";
import Nav from "../../components/Nav/index";

class Register extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        "usingId": '',
        "id": '',
        "pw": '',
        "pwc": '',
        "email": '',
    };
    this.checkID = this.checkID.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onBlur = this.onBlur.bind(this);
}

checkID(e){
    if(this.state.id.length < 6 || this.state.id.length > 30){
        e.preventDefault();
        alert("id wrong 6~20 length");
        this.setState({
            usingId:false,
        });
    }else{
        e.preventDefault();
        const data = {
            id: this.state.id
        }

        fetch('https://localhost:3001/checkid',{ // localhost 3001번 포트 checkid라우터를 찾는다
            method:"post",
            headers: { "Content-Type":  "application/json" },
            body: JSON.stringify(data),	// json화 해버리기
        })
        .then(res => res.json())
        .then(json => {
            if(json.error){
                alert("other ID");  //알람!
                this.setState({
                    usingId: false
                })
            }
            else{
                alert("can use");
                this.setState({
                    usingId: true
                })
            }
        });
    }
}

onChange(e){
    this.setState({
        [e.target.name]: e.target.value,
    })
}

onClick(e){
    if(!this.state.id || this.state.id.length < 6 || this.state.id.length > 30){
        alert('id wrong 6~30 length');
        e.preventDefault();
        e.stopPropagation();
        return false;
    }
    else if(!this.state.pw || this.state.pw.length < 8 || this.state.pw.length > 30){
        alert('password wrong 8~30length');
        e.preventDefault();
        e.stopPropagation();
        return false;
    }
    else if(!this.state.pw){
        alert('paaword discordance');
        e.preventDefault();
        e.stopPropagation();
        return false;
    }
    else if(!this.state.email){
        alert('email plz');
        e.preventDefault();
        e.stopPropagation();
        return false;
    }

    if(!this.state.usingId){
        alert("id check plz");
        e.preventDefault();
        e.stopPropagation();
        return false;
    }
  }

  onBlur(){
      let submit = document.querySelector('.register-container .submit');
      let labelPwc = document.querySelector('.register-container .label_pwc');

      if(this.state.pw != this.state.pwc){
          submit.disabled=true;
          labelPwc.classList.add("correspond");
      }else{
          submit.disabled=false;
          labelPwc.classList.remove("correspond");
      }
}

  render() {
    return (
      <div className="register-container">
        <Header />
        <Nav />
        <div className="body">
              <form action="http://localhost:3001/process_register" className="field" method="post">
                  <label htmlFor="id" className="label_id">id</label>
                  <input id="id" name="id" onChange={this.onChange}></input>
                  <button onClick={this.checkID} className="checkID">id check</button>
                  <label htmlFor="pw" className="label_pw">password</label>
                  <input type="password" id="pw" name="pw" onChange={this.onChange} onBlur={this.onBlur}></input>
                  <label htmlFor="pwc" className="label_pwc">password check</label>
                  <input type="password" id="pwc" name="pwc" onChange={this.onChange} onBlur={this.onBlur}></input>
                  <label htmlFor="email" className="label_email" >email</label>
                  <input type="email" id="email" name="email" onChange={this.onChange}></input>
                  <label htmlFor="birth">birth</label>
                  <input type="date" id="birth" name="birth"></input>
                  
                  <input type="submit" className="submit" onClick = {this.onClick} ></input>
              </form>
          </div>
        <Footer />
      </div>
    );
  }
}

export default Register;
