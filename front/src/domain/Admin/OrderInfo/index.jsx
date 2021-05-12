import React, {useState, useEffect} from 'react'

import NavAdmin from '../../../components/NavAdmin/index'
import HeaderAdmin from '../../../components/HeaderAdmin/index'
import ItemAdmin from '../../../components/ItemAdmin/index'

import './style.css'

export default function Home(props){
    const [payData, setPayData] = useState([{}]);
    const [paging, setPaging] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        let p = paging;
        fetch("https://localhost:3001/admin/payCount", {
            credentials: 'include',
            method: 'post'
        })
        .then(res => res.json())
        .then(count => {
            for(let i=1; i<=(count.count/10 + 1); i++){
                p.push(i);
                setPaging([...p]);
            }
        })
        return ()=>setPage([]) 
    }, []);

    useEffect(() => { 
        fetch("https://localhost:3001/admin/pay", {
            credentials: 'include',
            method: 'post',
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({"page": page})
        })
        .then(res => res.json())
        .then(data => {
            setPayData(data);
        })
    }, []);

    function onPagingClick(e){
        setPage(e.target.innerText*1);
    }

    return (
        <div className="admin-home">
            <HeaderAdmin />
            <NavAdmin />
            <div className="body">
                {payData.map(payInfo =>
                    <ItemAdmin payData={payInfo}/>
                )}
                <div className="paging">
                    {console.log(paging)}
                    {paging.map((i)=>
                        <div onClick={onPagingClick}>{i}</div>
                    )}
                </div>
            </div>
        </div>
    )
}