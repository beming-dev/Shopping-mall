import './style.css'

export default function ItemAdmin(props) {
return (
    <div className="item-admin">
        <div className="item-num">
            {props.payData.pay_id}
        </div>
        <img src={`/images/${props.payData.image}`} alt="hello" className="item-img"/>
        <a href={`https://localhost:3000/shop/buy/${props.payData.id}`} className="item-name">
            {props.payData.name}
        </a>
        <div className="item-price">
            {props.payData.price}
        </div>
    </div>
)
}