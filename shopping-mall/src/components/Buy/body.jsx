import React from "react";
import {Link} from 'react-router-dom'

class Buy extends React.Component{
  constructor(props){
    super(props);
    this.state = {item:null};
  }

  componentDidMount(){
    fetch(`https://localhost:3001/shop/buy/${this.props.id}`, {
      credentials: 'include'
    })
    .then(res => res.json())
    .then(data => this.setState({item:data[0]}))
  }

  render(){
    if(this.state.item){
      return (
        <div className="body">
          <div className="name">{this.state.item.name}</div>
          <div className="buy-item">
            <img src="/images/flower.jpg" alt="상품" />
            <div className="buy-box">
              <div className="price">{this.state.item.price} won</div>
              <div className="button-box">
                <Link to={`/shop/pay/${this.props.id}`} className="button-buy">구입</Link>
                <Link to={`/shop/pay/${this.props.id}`} className="button-bag">장바구니</Link>
                <Link to={`/shop/pay/${this.props.id}`} className="button-like"><i className="far fa-heart"></i></Link>
              </div>
            </div>
          </div>
          <div className="item-description">{this.state.item.description}</div>
        </div>
      );
    }else{
      return(
        <div className="body">

        </div>
      )
    }
  }
};

export default Buy;
