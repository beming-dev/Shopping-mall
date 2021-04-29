import React from 'react'
import {Link} from 'react-router-dom'

class Item extends React.Component{
    render(){
        return (
        <Link className="item" to={`/shop/buy/${this.props.itemInfo.id}`}>
            <img src="images/stock.jpg" alt="" className="image" />
            <div className="right">
                <div className="name">{this.props.itemInfo.name}</div>
                <div className="description">
                    {this.props.itemInfo.description}
                </div>
                <div className="price">{this.props.itemInfo.price} won</div>
            </div>
        </Link>
        )
    }
}

export default Item