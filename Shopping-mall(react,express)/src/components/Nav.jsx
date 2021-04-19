import React from 'react';

class Nav extends React.Component{
    render(){
        return (
            <ul className="nav">
                <a href="/home" className="navItem"><li >Home</li></a>
                <a href="/shop" className="navItem"><li >Shop</li></a>
                <a href="/news" className="navItem"><li >news</li></a>
                <a href="/blog" className="navItem"><li >Blog</li></a>
                <a href="/about" className="navItem"><li >About us</li></a>
            </ul>
        )
    }
}

export default Nav