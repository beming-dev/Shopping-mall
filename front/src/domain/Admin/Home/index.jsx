import React, {useEffect} from 'react'

import NavAdmin from '../../../components/NavAdmin/index'
import HeaderAdmin from '../../../components/HeaderAdmin/index'

export default function Home(props){
    return (
        <div className="adminHome">
            <HeaderAdmin />
            <NavAdmin />
        </div>
    )
}