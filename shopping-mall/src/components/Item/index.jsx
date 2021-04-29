import React from 'react'
import {Link} from 'react-router-dom'

class Item extends React.Component{
    constructor(props){
        super(props);
        if(this.props.basket){
            this.count = (<button>hello</button>)
        }else{
            this.count = (<div></div>)
        }
    }
    render(){
        return (
        <Link className="item" to={`/shop/buy/${this.props.itemInfo.id}`}>
            <img src="images/stock.jpg" alt="idontknow" className="image" />
            <div className="right">
                <div className="name">{this.props.itemInfo.name}</div>
                <div className="description">
                    {this.props.itemInfo.description}
                </div>
                {this.count}
                <div className="price">{this.props.itemInfo.price} won</div>
            </div>
        </Link>
        )
    }
}

export default Item