import React from "react";
import Nevbar from './Nev'

const Layout= (props:any)=>{
    return (
        <div>
            <Nevbar/>
            {props.children}
        </div>
    )
}
export default Layout