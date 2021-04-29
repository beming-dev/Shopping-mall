import React from "react";
import {Link} from 'react-router-dom'
import "./style.css";

import Header from "../../../components/Header/index";
import Footer from "../../../components/Footer/index";
import Nav from "../../../components/Nav/index";

class Buy extends React.Component {
  constructor(props){
    super(props);
    this.state = {item:{
      name: '',
      price: '',
      description: ''
    }};

    this.onBasketClick = this.onBasketClick.bind(this);
  }

  componentWillMount(){
    fetch(`https://localhost:3001/shop/buy/${this.props.match.params.id}`, {
      credentials: 'include'
    })
    .then(res => res.json())
    .then(data => this.setState({item:data[0]}))
  }

  onBasketClick(){
    const data = {
      product_id: this.props.match.params.id,
    }
    fetch('https://localhost:3001/process_basket', {
      credentials: 'include',
      method: 'post',
      headers: { "Content-Type":  "application/json" },
      body: JSON.stringify(data),	
    })
    .then(res => res.json())
    .then(data=>{
      if(data.result){
        alert("장바구니에 들어갔습니다.");
      }else{
        alert("이미 장바구니에 존재하는 상품입니다.")
      }
    })
  }

  render() {
    return (
      <div className="buy">
        <div className="body">
            <div className="name">{this.state.item.name}</div>
            <div className="buy-item">
              <img src="/images/flower.jpg" alt="상품" />
              <div className="buy-box">
                <div className="price">{this.state.item.price} won</div>
                <div className="button-box">
                  <Link to={`/shop/pay/${this.props.match.params.id}`} className="button-buy">구입</Link>
                  <button className="button-bag" onClick={this.onBasketClick}>장바구니</button>
                  <Link to={`/shop/pay/${this.props.match.params.id}`} className="button-like"><i className="far fa-heart"></i></Link>
                </div>
              </div>
            </div>
            <div className="item-description">{this.state.item.description}</div>
          </div>
      </div>
    );
  }
}

export default Buy;
