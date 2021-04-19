import React from 'react';

class Register extends React.Component{
    render(){
        return(
            <div className="body">
                <form className="field">
                    <label for="id">id</label>
                    <input id="id"></input>
                    <label for="pw">password</label>
                    <input type="password" id="pw"></input>
                    <label for="pwc">password check</label>
                    <input type="password" id="pwc"></input>
                    <label for="email">email</label>
                    <input type="email" id="email"></input>
                    <label for="birth">birth</label>
                    <input type="date" id="birth"></input>
                    
                    <input type="submit" class="submit">
                        
                    </input>
                </form>
            </div>
        )
    }
}

export default Register