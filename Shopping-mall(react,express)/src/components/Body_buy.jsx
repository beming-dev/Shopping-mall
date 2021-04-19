import React from "react";

class Buy extends React.Component{
  constructor(props){
    super(props);
    this.state = {item:null};
  }

  componentDidMount(){
    fetch(`http://localhost:3001/shop/buy/${this.props.id}`)
    .then(res => res.json())
    .then(data => this.setState({item:data[0]}))
  }

  render(){
    if(this.state.item){
      return (
        <div className="body">
          <div className="name">{this.state.item.name}</div>
          <div className="item">
            <img src="/images/flower.jpg" alt="상품" />
            <div className="buy-box">
              <div className="price">{this.state.item.price} won</div>
              <div className="button-box">
                <button className="button-buy">구입</button>
                <button className="button-bag">장바구니</button>
                <button className="button-like"><i className="far fa-heart"></i></button>
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
