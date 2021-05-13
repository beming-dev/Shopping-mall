import React from 'react'
import {Link} from 'react-router-dom'

import './style.css'

class Item extends React.Component{
    constructor(props){
        super(props);
        this.onCountClick = this.onCountClick.bind(this);
        this.onCountBlur = this.onCountBlur.bind(this);
        this.onCountBlurOne = this.onCountBlurOne.bind(this);
        this.onCountChange = this.onCountChange.bind(this);
        this.state={
            count: this.props.itemInfo.count || 1,
        }
        if(this.props.basket){
            this.description = (<div></div>);
        }else{
            this.description = (<div className="description">{this.props.itemInfo.description}</div>);
        }
    }

    onCountClick(e){
        e.preventDefault();
        return false;
    }

    onCountBlur(e){
        if(e.target.value < 1){
            e.target.value = 1;
        }
        if(e.target.value > 10){
            e.target.value = 10;
        }
        if(this.props.itemInfo.count !== (e.target.value*1)){
            this.props.setCount(e.target.value*1);
            let data = {
                count : e.target.value,
                id: this.props.itemInfo.cart_id,
            }
            fetch("https://localhost:3001/updateCount", {
                method:"post",
                credentials:'include',
                headers: {"Content-Type": "application/json"},
                body:JSON.stringify(data),
            })
        }
    }

    onCountBlurOne(e){
        if(this.state.count < 1){
            e.target.value = 1;
            this.setState({count: 1});
        }
        if(this.state.count > 10){
            e.target.value = 10;
            this.setState({count: 10});
        }
        this.props.setCount(e.target.value*1);
        this.props.setTotalPrice(this.props.itemInfo.price * e.target.value);
    }

    onCountChange(e){
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    render(){
        if(this.props.basket){
            this.onBlur = this.onCountBlur;
        }else{
            this.onBlur = this.onCountBlurOne;
        }
        return (
        <Link to={`/shop/buy/${this.props.itemInfo.id}`} className="item">
            <img src={`images/${this.props.itemInfo.image}`} alt="idontknow" className="image" />
            <div className="right">
                <div className="name">{this.props.itemInfo.name}</div>
                {this.description}
                <input type="number" className="count" id="count-invisible" name="count" onChange={this.onCountChange} onClick={this.onCountClick} onBlur={this.onBlur} value={this.state.count}></input>
                <div className="price">{this.props.itemInfo.price} won</div>
            </div>
        </Link>
        )
    }
}

export default Item