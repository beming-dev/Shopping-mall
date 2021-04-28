import React from "react";

import Item from './Item/index'

class Body extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        items:null
    };
  }

  componentDidMount(){
    fetch('https://localhost:3001/shop', {
      credentials: 'include'
    })
    .then(res => res.json())
    .then(product => this.setState({items: product}));
  }

  render() {
    if(this.state.items){
      console.log(this.state.items);
      return (
        <div className="body">
          {this.state.items.map(item =>
            <Item 
            key={item.id}
            id={item.id}
            price={item.price}
            description={item.description}
            name={item.name}
            image={item.image}
            />
          )}
        </div>
      );
    }
    else{
      return (
        <div className="body">
        </div>
      )
    }
  }
}

export default Body;
