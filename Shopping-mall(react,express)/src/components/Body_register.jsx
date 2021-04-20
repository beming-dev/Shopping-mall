import userEvent from '@testing-library/user-event';
import React from 'react';

class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            "usingId": '',
            "id": '',
            "pw": '',
            "email": '',
        };
        this.checkID = this.checkID.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
      }
    
      checkID(e){
        e.preventDefault();
        const data = {
            id: this.state.id
        }

        fetch('http://localhost:3001/checkid',{ // localhost 3001번 포트 checkid라우터를 찾는다
            method:"post",
            headers: { "Content-Type":  "application/json" },
            body: JSON.stringify(data),	// json화 해버리기
        })
        .then(res => res.json())
        .then(json => {
            if(json.error){
                alert("other ID");  //알람!
                this.setState({
                    usingId: true
                })
            }
            else{
                alert("can use");
                this.setState({
                    usingId: false
                })
            }
        });
    }

    onChange(e){
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    onClick(e){
        console.log(this.state.id);
        console.log(this.state.pw);
        if(!this.state.id){
            alert('id wrong');
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        else if(!this.state.pw){
            alert('password wrong');
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        else if(!this.state.pw){
            alert('paaword wrong');
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        else if(!this.state.email){
            alert('email wrong');
            e.preventDefault();
            e.stopPropagation();
            return false;
        }

        console.log(this.state.usingId);
        if(!this.state.usingId){
            alert("id check plz");
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    }

    render(){
        return(
            <div className="body">
                <form action="http://localhost:3001/process_register" className="field" method="post">
                    <label htmlFor="id" className="label_id">id</label>
                    <input id="id" name="id" onChange={this.onChange}></input>
                    <button onClick={this.checkID} className="checkID">id check</button>
                    <label htmlFor="pw" className="label_pw">password</label>
                    <input type="password" id="pw" name="pw" onChange={this.onChange}></input>
                    <label htmlFor="pwc" className="label_pwc">password check</label>
                    <input type="password" id="pwc"></input>
                    <label htmlFor="email" className="label_email" >email</label>
                    <input type="email" id="email" name="email" onChange={this.onChange}></input>
                    <label htmlFor="birth">birth</label>
                    <input type="date" id="birth" name="birth"></input>
                    
                    <input type="submit" className="submit" onClick = {this.onClick}></input>
                </form>
            </div>
        )
    }
}

export default Register