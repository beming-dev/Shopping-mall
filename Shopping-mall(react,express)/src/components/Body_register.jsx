import userEvent from '@testing-library/user-event';
import React from 'react';

class Register extends React.Component{
    render(){
        return(
            <div className="body">
                <form action="http://localhost:3001/process_register" className="field" method="post">
                    <label htmlFor="id" className="label_id">id</label>
                    <input id="id" name="id"></input>
                    <label htmlFor="pw" className="label_pw">password</label>
                    <input type="password" id="pw" name="pw"></input>
                    <label htmlFor="pwc" className="label_pwc">password check</label>
                    <input type="password" id="pwc"></input>
                    <label htmlFor="email" className="label_email">email</label>
                    <input type="email" id="email" name="email"></input>
                    <label htmlFor="birth">birth</label>
                    <input type="date" id="birth" name="birth"></input>
                    
                    <input type="submit" className="submit"></input>
                </form>
            </div>
        )
    }
}

export default Register