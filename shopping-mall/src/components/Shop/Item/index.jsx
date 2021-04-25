import React from 'react'

class Item extends React.Component{
    render(){
        return (
        <a className="item" href={`/shop/buy/${this.props.id}`}>
            <img src="images/stock.jpg" alt="" className="image" />
            <div className="right">
                <div className="name">{this.props.name}</div>
                <div className="description">
                    {this.props.description}
                </div>
                <div className="price">{this.props.price} won</div>
            </div>
        </a>
        )
    }
}

export default Item