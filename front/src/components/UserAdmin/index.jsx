import './style.css'

export default function UserAdmin(props){
    return (
        <tr className="user-admin">
            <td className="user-num item">
                {props.userData.num}
            </td>
            <td className="user-email item">
            {props.userData.email}
            </td>
            <td className="user-birth item">
            {props.userData.birth}
            </td>
        </tr>
    )
}