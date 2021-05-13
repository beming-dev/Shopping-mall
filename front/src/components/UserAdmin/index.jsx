import './style.css'

export default function UserAdmin(props){
    let cd = new Set(props.checkedUser);
    function onCheck(e){
        if(e.target.checked){
            cd.add(e.target.name*1);
            props.setCheckedUser(cd);
        }else{
            cd.delete(e.target.name*1);
            props.setCheckedUser(cd);
        }
    }
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
            <td className="user-check item">
                <input type="checkbox" name={`${props.userData.num}`} onClick={onCheck}/>
            </td>
        </tr>
    )
}